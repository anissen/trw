Game.Item.Food = function(type) {
	Game.Item.call(this, type);
}
Game.Item.Food.extend(Game.Item);

Game.Item.Food.prototype.eat = function(being) {
	/* FIXME cheating, shall format properly */
	Game.status.show("Du spiser %the.", this);
	if (being.getHP() == being.getMaxHP()) { 
		Game.status.show("Mmm!");
	} else {
		being.adjustHP(2);
		if (being.getHP() == being.getMaxHP()) {
			Game.status.show("Det smager meget godt: Du er ved fuldt helbred.");
		} else {
			Game.status.show("Det smager godt: Du er ved bedre helbred.");
		}
	}
}

