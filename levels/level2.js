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
    // Game.story.addChapter("Snakkede med Hahn. Det blev jeg ikke meget klogere af...");
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
    Game.story.addChapter("CERM siger at fOrm har nøglen!");
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
};

Game.Level.Level2.prototype._welcomeBeing = function(being) {
	Game.Level.prototype._welcomeBeing.call(this, being);
	if (being == Game.player) { being.setLight(this._playerLight); }
}
