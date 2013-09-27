Game.Level.Castle = function() {
	Game.Level.call(this);

	this._lighting.setOptions({range:8});
	this._playerLight = [30, 30, 30];
	
	this._gates = [];
	this._guards = [];
	this._jester = null;
	this._gardener = null;
	this._rats = [];
}
Game.Level.Castle.extend(Game.Level);

Game.Level.Castle.prototype.fromTemplate = function(map, def) {
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
	}

	this._initStory();
	return this;
}

Game.Level.Castle.prototype._initStory = function() {
  this._addRule(function() {
    return true;
  }, function() {
    Game.story.newChapter("");
    Game.story.setTask("Talk to a gate guard.");
    return true; /* remove from rule list */
  });
}

Game.Level.Castle.prototype._welcomeBeing = function(being) {
	Game.Level.prototype._welcomeBeing.call(this, being);
	if (being == Game.player) { being.setLight(this._playerLight); }
}
