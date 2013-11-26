Game.Cell = function(type) {
	Game.Entity.call(this, type);
	
	this._blocksLight = false;
	this._blocksMovement = false;

	this._totalLight = null; /* computed light */
	this._portal = null;

	this._bumpedInto = false;
	this._bumpingInto = false;
}
Game.Cell.extend(Game.Entity);

Game.Cell.prototype.fromTemplate = function(template) {
	Game.Entity.prototype.fromTemplate.call(this, template);
	if ("blocksLight" in template) { this._blocksLight = template.blocksLight; }
	if ("blocksMovement" in template) { this._blocksMovement = template.blocksMovement; }
	return this;
}

/**
 * Total amount of light at this cell
 */
Game.Cell.prototype.getTotalLight = function() {
	return this._totalLight;
}

Game.Cell.prototype.setTotalLight = function(light) {
	this._totalLight = light;
	return this;
};

Game.Cell.prototype.bumpInto = function(being) {
	this._bumpingInto = false;
	if (being == Game.player) {
		this._bumpedInto = true;
		this._bumpingInto = true;
		Game.status.show("%A blokerer vejen.", this); 
	}
};

Game.Cell.prototype.bumpedInto = function() {
	return this._bumpedInto;
};

Game.Cell.prototype.bumpingInto = function() {
	return this._bumpingInto;
};

Game.Cell.prototype.blocksLight = function() {
	return this._blocksLight;
}

Game.Cell.prototype.blocksMovement = function() {
	return this._blocksMovement;
}
