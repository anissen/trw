Game.Stats = function(node) {
	this._node = node;
}

Game.Stats.prototype.update = function(weapon, armor, hp, maxhp) {
	var parts = [];
	if (weapon) { parts.push("Du er bevæbnet med %a.".format(weapon)); }
	if (armor) { parts.push("Du er iført %a.".format(armor)); }
	
	var className = (hp <= maxhp/3 ? "crit" : "");
	parts.push("Liv: <span class='%s'>%s</span>/%s".format(className, hp, maxhp));
	
	this._node.innerHTML = parts.join("<br/>");
}
