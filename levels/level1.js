Game.Level.Level1 = function() {
	Game.Level.call(this);

	this._lighting.setOptions({range:8});
	this._playerLight = [30, 30, 30];
	
	this._gates = [];
	this._guards = [];
  this._jester = null;
	this._sekr = null;
	this._gardener = null;
	this._rats = [];
}
Game.Level.Level1.extend(Game.Level);

Game.Level.Level1.prototype.fromTemplate = function(map, def) {
	Game.Level.prototype.fromTemplate.call(this, map, def);
	
	for (var key in this.cells) {
		var cell = this.cells[key];
		if (cell.getType() == "gate") { this._gates.push(cell); }
	}

	for (var key in this.beings) {
		var being = this.beings[key];
		if (being.getType() == "guard") { this._guards.push(being); }
		if (being.getType() == "jester") { this._jester = being; }
		if (being.getType() == "rat") { this._rats.push(being); }
    if (being.getType() == "gardener") { this._gardener = being; }
		if (being.getType() == "SEKR") { this._sekr = being; }
	}

	this._initStory();
	return this;
}

Game.Level.Level1.prototype._initStory = function() {
  this._addRule(function() {
    return true;
  }, function() {
    Game.story.newChapter("Argh, der er fulde russer ud over det hele...");
    return true; /* remove from rule list */
  });

  this._addRule(function() {
    return this._sekr.chattedWith();
  }, function() {
    Game.story.newChapter("KA$$ opførte sig tilsyneladende endnu mere mærkeligt end hun plejer, og nu er hun forsvundet. Jeg må finde hende.");
    Game.story.setTask("Gå ned i kælderen under fysik.");
    Game.storyFlags.wantsFlower = 1;
    return true;
  });
}

Game.Level.Level1.prototype._welcomeBeing = function(being) {
	Game.Level.prototype._welcomeBeing.call(this, being);
	if (being == Game.player) { being.setLight(this._playerLight); }
}
