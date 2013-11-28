Game.Level.Level2 = function() {
	Game.Level.call(this);

	this._lighting.setOptions({range:8});
	this._playerLight = [30, 30, 30];

  this._hahn = null;
  this._CERM = null;
  this._doorToDungeon = null;
};
Game.Level.Level2.extend(Game.Level);

Game.Level.Level2.prototype.fromTemplate = function(map, def) {
	Game.Level.prototype.fromTemplate.call(this, map, def);

  for (var key in this.cells) {
    var cell = this.cells[key];
    if (cell.getId() === 'door-to-dungeon') this._doorToDungeon = cell;
  }
	
	for (var key in this.beings) {
		var being = this.beings[key];
    if (being.getType() === 'hahn') this._hahn = being;
    if (being.getType() === 'CERM') this._CERM = being;
	}

  var dungeon = new Game.Level.Dungeon(1, this, "from-dungeon");
  
  this._portals["dungeon"] = {
    level: dungeon,
    direction: "north"
  };
	
	this._initStory();
	return this;
};

Game.Level.Level2.prototype._initStory = function() {
  this._addRule(function() {
    return Game.storyFlags.findKey && !Game.storyFlags.findFORM && this._hahn.chattedWith();
  }, function() {
    Game.story.addChapter("* Snakkede med Hahn. Det blev jeg ikke meget klogere af...");
    Game.story.setTask("Få fat i nøglen til kælderen under fysik. Start med at finde en person der IKKE mumler!");
    return true;
  });

  this._addRule(function() {
    return Game.storyFlags.talkedToSEKR && this._doorToDungeon.bumpedInto();
  }, function() {
    Game.story.newChapter("Døren til kælderen under fysik er låst. Jeg må finde en måde at komme igennem.");
    Game.story.setTask("Få fat i nøglen til kælderen under fysik");
    Game.storyFlags.findKey = 1;
    this._CERM.setChats(["Nølgen til kælderen under fysik? Den har fOrm. Jeg så ham sidst på kammeret."]);
    this._doorToDungeon._bumpedInto = false; // HACK
    this._hahn._chattedWith = false; // HACK
    this._CERM._chattedWith = false; // HACK
    return true;
  });

  this._addRule(function() {
    return Game.storyFlags.findKey && this._CERM.chattedWith();
  }, function() {
    Game.story.addChapter("* CERM siger at fOrm har nøglen!");
    Game.story.setTask("Led efter fOrm på kammeret");

    this._doorToDungeon._bumpedInto = false; // HACK

    delete Game.storyFlags.findKey;
    Game.storyFlags.findFORM = 1;
    return true;
  });

  this._addRule(function() {
    return Game.storyFlags.goToCellar && this._doorToDungeon.bumpedInto();
  }, function() {
    Game.status.show("Det var den rigtige nøgle. <i>Endelig</i>!");
    this._doorToDungeon.unlock();
    return true;
  });

  /*
	this._addRule(function() {
		return this._priest.chattedWith();
	}, function() {
		Game.story.addChapter("Indeed, it would be polite to bring some gift to the bride. I was in a hurry, so I brought nothing. Fortunately, I noticed some beautifully blossoming flowers in the castle garden.");
		Game.story.setTask("Get back to castle garden and bring a flower.");
		Game.storyFlags.wantsFlower = 1;
		return true;
	});

	this._addRule(function() {
		var weapon = Game.player.getWeapon();
		return (weapon && weapon.getType() == "flower");
	}, function() {
		this._murderGroom();
		Game.story.newChapter("I hear some unusual voices and screams from the Level2. What the hell is happening in there? I should investigate.");
		return true;
	});

	this._addRule(function() {
		return (Game.storyFlags.groomDead && this._priest.chattedWith());
	}, function() {
		Game.story.addChapter("I was away for only a few moments - and there was a crime committed, right next to the altar! The groom lies dead in a pool of blood; the assassin seems to have left the Level2 through the window. I shall follow him.");
		Game.story.setTask("Follow the murderer.");
		return true;
	});

	this._addRule(function() {
		return Game.storyFlags.gardenerDead;
	}, function() {
		for (var key in this.cells) {
			var cell = this.cells[key];
			if (cell.getType() != "tombstone" || ROT.RNG.getUniform() > 0.3) { continue; }
			var undead = Game.Beings.createRandom({include:"undead"}).setHostile(true);
			var dir = Math.floor(ROT.RNG.getUniform()*8);
			var x = cell.getPosition()[0] + ROT.DIRS[8][dir][0];
			var y = cell.getPosition()[1] + ROT.DIRS[8][dir][1];
			this.setBeing(undead, x, y);
			Game.engine.addActor(undead);
		}
		this._priest.setChats(["You are looking for the bride? She went back to the castle. She was apparently in a hurry, strange."]);
		
		Game.engine.removeActor(this._bride);
		this.removeBeing(this._bride);
		return true;
	});
*/
};

Game.Level.Level2.prototype._welcomeBeing = function(being) {
	Game.Level.prototype._welcomeBeing.call(this, being);
	if (being == Game.player) { being.setLight(this._playerLight); }
}
