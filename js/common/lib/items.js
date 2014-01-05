Game.Items = new Game.Repository(Game.Item);

Game.Items.define("gold", {
	"char": "$",
	color: [255, 255, 30],
	name: "20'er"
});

Game.Items.define("corpse", {
	"char": "%",
	wordEnding: "et"
}, {
	weight: 0
});

/* WEAPONS */

Game.Items.define("weapon", {
	"char": "(",
	ctor: Game.Item.Weapon,
	color: [100, 100, 100],
}, {
	weight: 0
});

Game.Items.define("dagger", {
	extend: "weapon",
	name: "daggert",
	description: "et let og hurtigt",
	color: [150, 80, 80],
	speed: 160,
	damage: 3
});

Game.Items.define("sword", {
	extend: "weapon",
	name: "sværd",
	wordEnding: "et",
	description: "et all-round",
	color: [150, 150, 150],
	speed: 130,
	damage: 4
});

Game.Items.define("axe", {
	extend: "weapon",
	name: "økse",
	description: "et langsomt men hårdt-slående",
	color: [150, 150, 100],
	speed: 100,
	damage: 5
});

/* ARMOR */

Game.Items.define("armor", {
	"char": "[",
	ctor: Game.Item.Armor,
	color: [100, 100, 100],
}, {
	weight: 0
});

Game.Items.define("leather-armor", {
	extend: "armor",
	name: "læderjakke",
	description: "en basal og let (og moderigtig)",
	color: [150, 80, 30],
	speed: 100,
	pv: 1
});

Game.Items.define("chain-mail", {
	extend: "armor",
	name: "ringbrynje",
	description: "holdbart og til at bære",
	color: [150, 150, 150],
	speed: 80,
	pv: 2
});

Game.Items.define("plate-mail", {
	extend: "armor",
	name: "pladerustning",
	description: "en meget tung men resistent",
	color: [180, 180, 200],
	speed: 50,
	pv: 3
});

/* GEMS */

Game.Items.define("gem", {
	"char": "*"
}, {
	weight: 0
});

Game.Items.define("ruby", {
	extend: "gem",
	name: "rubin",
	color: [255, 30, 30]
});

Game.Items.define("sapphire", {
	extend: "gem",
	name: "safir",
	color: [30, 30, 255]
});

Game.Items.define("diamond", {
	extend: "gem",
	name: "diamand",
	color: [255, 255, 255]
});

Game.Items.define("opal", {
	extend: "gem",
	name: "opal",
	color: [255, 30, 255]
});

Game.Items.define("turquoise", {
	extend: "gem",
	name: "smaragd",
	color: [50, 200, 200]
});

/* POTIONS */

Game.Items.define("potion", {
	"char": "!"
}, {
	weight: 0
});

Game.Items.define("healing-potion", {
	extend: "potion",
	ctor: Game.Item.HealingPotion,
	color: [240, 30, 30],
	name: "Ceres Top"
});

/* FOOD */

Game.Items.define("food", {
	"char": "%",
	ctor: Game.Item.Food
}, {
	weight: 0
});

Game.Items.define("apple", {
	extend: "food",
	color: [80, 240, 30],
	name: "trøffel"
});

Game.Items.define("iron-ration", {
	extend: "food",
	color: [180, 100, 30],
	name: "Snickers"
});

Game.Items.define("lutefisk", {
	extend: "food",
	color: [160, 160, 220],
	name: "Mat.Kant.-delle"
});
