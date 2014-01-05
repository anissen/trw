Game.Player = function(type) {
	this._ended = false;
//	this._debug = true;
	Game.Being.call(this, type);
	
	this._light = [30, 30, 30]; 
	this._name = "dig";
	
	this._secretGold = 0;
	this._gold = 0;
	this._gems = 0;
	this._turns = 0;

	this._knownTypes = [];

	this._directionKeys = {};
	this._directionKeys[ROT.VK_K] = 0;
	this._directionKeys[ROT.VK_UP] = 0;
	this._directionKeys[ROT.VK_NUMPAD8] = 0;
	this._directionKeys[ROT.VK_U] = 1;
	this._directionKeys[ROT.VK_NUMPAD9] = 1;
	this._directionKeys[ROT.VK_L] = 2;
	this._directionKeys[ROT.VK_RIGHT] = 2;
	this._directionKeys[ROT.VK_NUMPAD6] = 2;
	this._directionKeys[ROT.VK_N] = 3;
	this._directionKeys[ROT.VK_NUMPAD3] = 3;
	this._directionKeys[ROT.VK_J] = 4;
	this._directionKeys[ROT.VK_DOWN] = 4;
	this._directionKeys[ROT.VK_NUMPAD2] = 4;
	this._directionKeys[ROT.VK_B] = 5;
	this._directionKeys[ROT.VK_NUMPAD1] = 5;
	this._directionKeys[ROT.VK_H] = 6;
	this._directionKeys[ROT.VK_LEFT] = 6;
	this._directionKeys[ROT.VK_NUMPAD4] = 6;
	this._directionKeys[ROT.VK_Y] = 7;
	this._directionKeys[ROT.VK_NUMPAD7] = 7;

	this._directionKeys[ROT.VK_PERIOD] = -1;
	this._directionKeys[ROT.VK_CLEAR] = -1;
	this._directionKeys[ROT.VK_NUMPAD5] = -1;
}
Game.Player.extend(Game.Being);

Game.Player.prototype.act = function() {
	this._turns++;
	this._level.updateLighting(); /* FIXME urco? */
	Game.legend.update(this._position[0], this._position[1]);
	Game.engine.lock();
	window.addEventListener("keydown", this);
}

Game.Player.prototype.handleEvent = function(e) {
	var code = e.keyCode;

	var keyHandled = this._handleKey(e.keyCode);

	if (keyHandled) {
		window.removeEventListener("keydown", this);
		this._level.checkRules();
		Game.engine.unlock();
	}
}

Game.Player.prototype._handleKey = function(code) {
	if (this._ended) {
		this._endGame();
		return false;
	}

	if (code in this._directionKeys) {
		Game.status.clear();

		var direction = this._directionKeys[code];
		if (direction == -1) { /* noop */
			Game.status.show("Du venter.");
			return true;
		}

		var dir = ROT.DIRS[8][direction];
		var x = this._position[0] + dir[0];
		var y = this._position[1] + dir[1];		
		return this._tryMovingTo(x, y);
	}

	return false; /* unknown key */
}

Game.Player.prototype.setPosition = function(x, y, level) {
	Game.Being.prototype.setPosition.call(this, x, y, level);
	
	if (x !== null) { this.updateVisibility(); }
	
	return this;
}

Game.Player.prototype.updateVisibility = function() {
	var visibility = this._getVisibleArea();
	this._level.setVisibility(this._debug || visibility);
}

Game.Player.prototype._getVisibleArea = function() {
	var RANGE = this._sightRange;
	var result = {};
	var level = this._level;
	var pos = this._position;

	var lightPasses = function(x, y) {
		var cell = level.cells[x+","+y];
		return (cell && !cell.blocksLight());
	}

	var callback = function(x, y, R, amount) {
		var dx = x-pos[0]; 
		var dy = y-pos[1]; 
		if (dx*dx+dy*dy*Math.sqrt(3) > RANGE*RANGE) { return; }
		result[x+","+y] = amount;
	}

	var fov = new ROT.FOV.PreciseShadowcasting(lightPasses);
	fov.compute(pos[0], pos[1], RANGE, callback);
	return result;
}

Game.Player.prototype._tryMovingTo = function(x, y) {
	var key = x+","+y;
	var being = this._level.beings[key];
	
	if (being) { /* being - chat or fight */
		if (being.isHostile()) {
			this.attack(being);
		} else if (being.getType() == "bride" && Game.storyFlags.gardenerDead) {
			this._victory();
		} else {
			this._chat(being);
		}
		return true;
	}
	
	var cell = this._level.cells[key];
	if (cell) {
		if (cell.blocksMovement()) {
			cell.bumpInto(this);
		} else {
			this._level.setBeing(this, x, y);
			var item = this._level.items[key];
			if (item) { this._pickItem(x, y); }
		}
		return true;
	}
	
	return false; /* non-existant cell */
}

Game.Player.prototype._chat = function(being) {
	Game.status.show("Du taler til %a.", being);
	being.chat(this);
}

Game.Player.prototype._pickItem = function(x, y) {
	var item = this._level.items[x+","+y];
	var type = item.getType();

	if (type == "secret-gold") {
		this._level.removeItem(item);
		this._secretGold++;
		Game.status.show("Du samler %a op.", item);
		return;
	} 

	if (type == "gold") {
		this._level.removeItem(item);
		this._gold++;
		Game.status.show("Du samler %a op.", item);
		return;
	} 

	if (Game.Items.is(type, "potion")) {
		this._level.removeItem(item);
		item.drink(this);
		return;
	} 

	if (Game.Items.is(type, "food")) {
		this._level.removeItem(item);
		item.eat(this);
		return;
	} 

	if (Game.Items.is(type, "gem")) {
		this._level.removeItem(item);
		this._gems++;
		Game.status.show("Du samler %a op.", item);
		return;
	} 

	if (Game.Items.is(type, "weapon") && (type != "flower" || Game.storyFlags.wantsFlower)) {
		this._level.removeItem(item);

		if (this._weapon) {
			this._level.setItem(this._weapon, x, y);
			Game.status.show("Du smider %a og samler %a op.", this._weapon, item);
		} else {
			Game.status.show("Du samler %a op.", item);
		}
		this._weapon = item;
		var description = item.getDescription();
		if (this._knownTypes.indexOf(type) == -1 && description) {
			this._knownTypes.push(type);
			Game.status.show("%The er %s våben.".format(item, description));
		}
		
		this._updateStats();
		return;
	}

	if (Game.Items.is(type, "armor")) {
		this._level.removeItem(item);

		if (this._armor) {
			this._level.setItem(this._armor, x, y);
			Game.status.show("Du smider %a og samler en %a op.", this._armor, item);
		} else {
			Game.status.show("Du samler %a op.", item);
		}
		this._armor = item;
		var description = item.getDescription();
		if (this._knownTypes.indexOf(type) == -1 && description) {
			this._knownTypes.push(type);
			Game.status.show("%The er %s beskyttelse.".format(item, description));
		}

		this._updateStats();
		return;
	}
	
	Game.status.show("Her ligger %a.".format(item));
}

Game.Player.prototype._updateStats = function() {
	Game.stats.update(this._weapon, this._armor, this._hp, this._maxHP);
}

Game.Player.prototype.adjustHP = function(diff) {
	Game.Being.prototype.adjustHP.call(this, diff);
	this._updateStats();
}

Game.Player.prototype.die = function() {
	Game.Being.prototype.die.call(this);
	this._char = "☠";
	this._color = [255, 155, 155];
	Game.story.newChapter("Jeg døde :(");
	Game.story.setTask("Genindlæs siden for at prøve igen...");
	Game.over();
}

Game.Player.prototype.describeVerb = function(verb) {
	return verb;
}

Game.Player.prototype.describeA = function() {
	return this.describe();
}

Game.Player.prototype.describeThe = function() {
	return this.describe();
}

Game.Player.prototype.describeHe = function() {
	return "du";
}

Game.Player.prototype.describeHim = function() {
	return "dig";
}

Game.Player.prototype._victory = function() {
	Game.status.show("Hurra!");
	Game.status.show("<br/><br/>");
	Game.status.show("KA$$ er besejret!");

	Game.Being.prototype.die.call(this);
	this._char = "✓";
	this._color = [155, 255, 155];

	Game.over();
	
	this._ended = true;
}

Game.Player.prototype._endGame = function() {
	Game.engine.lock();
	
	Game.story.newChapter("Slut!");
	
	Game.status.clear();
	Game.status.show("Bedrifter:<br/><br/>");
	Game.status.show(this._gold + " guld fundet<br/>");
	Game.status.show(this._gems + " ædelsten fundet<br/>");
	Game.status.show(this._kills + " fjender dræbt<br/>");
	Game.status.show(this._turns + " ture spillet");
	
}
