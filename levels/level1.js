Game.Level.Level1 = function() {
	Game.Level.call(this);

	this._lighting.setOptions({range:8});
	this._playerLight = [30, 30, 30];
	
	this._gates = [];
	this._sekr = null;
};
Game.Level.Level1.extend(Game.Level);

Game.Level.Level1.prototype.fromTemplate = function(map, def) {
	Game.Level.prototype.fromTemplate.call(this, map, def);
	
	for (var cellKey in this.cells) {
		var cell = this.cells[cellKey];
		if (cell.getType() == "gate") { this._gates.push(cell); }
	}

	for (var beingKey in this.beings) {
		var being = this.beings[beingKey];
		if (being.getType() == "SEKR") { this._sekr = being; }
	}

	this._initStory();
	return this;
};

Game.Level.Level1.prototype._initStory = function() {
  this._addRule(function() {
    return true;
  }, function() {
    Game.story.newChapter("TÅGEKAMMERET holder fest og der er fulde russer ud over det hele.");
    return true; /* remove from rule list */
  });

  this._addRule(function() {
    return this._sekr.chattedWith();
  }, function() {
    Game.story.newChapter("KA$$ opfører sig tilsyneladende endnu mere mærkeligt end sædvanligt.<br/><br/>Jeg har lovet SEKR at undersøge hvor hun er blevet af...");
    Game.story.setTask("Gå ned i kælderen under fysik.");
    Game.storyFlags.wantsFlower = 1;
    return true;
  });
};

Game.Level.Level1.prototype._welcomeBeing = function(being) {
	Game.Level.prototype._welcomeBeing.call(this, being);
	if (being == Game.player) { being.setLight(this._playerLight); }
};
