Game.Item.HealingPotion = function(type) {
	Game.Item.call(this, type);
}
Game.Item.HealingPotion.extend(Game.Item);

Game.Item.HealingPotion.prototype.drink = function(being) {
	/* FIXME cheating, shall format properly */
	Game.status.show("Du drikker %the.", this);
	if (being.getHP() == being.getMaxHP()) { 
		Game.status.show("Der sker ikke noget.");
	} else {
		being.adjustHP(4);
		if (being.getHP() == being.getMaxHP()) {
			Game.status.show("Du er ved fuldt helbred.");
		} else {
			Game.status.show("Du er bedre helbred.");
		}
	}
}
