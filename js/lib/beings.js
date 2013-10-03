
Game.Beings.define("player", {
	extend: "humanoid",
	pv: 2,
	hp: 20,
	damage: 2,
	ctor: Game.Player,
	color: [200, 200, 200]
}, {
	weight: 0
});

Game.Beings.define("guard", {
	extend: "humanoid",
	name: "guard",
	speed: 110,
	damage: 2.5,
	hp: 3,
	sex: 1,
	tasks: [],
	color: [220, 140, 140]
}, {
	weight: 0
});

Game.Beings.define("jester", {
	extend: "humanoid",
	chats: ["There is a secret passage to the kitchen, hidden in the throne room. But only the King shall know about it!"],
	name: "jester",
	sex: 1,
	color: [240, 100, 100]
}, {
	weight: 0
});

Game.Beings.define("gardener", {
	extend: "humanoid",
	name: "gardener",
	sex: 1,
	hp: 3,
	speed: 115,
	damage: 3,
	chats: ["Good day to you, sir!", "Watch these flowers blossom!", "This garden needs my attention."],
	color: [100, 240, 100],
}, {
	weight: 0
});

Game.Beings.define("bride", {
	extend: "humanoid",
	ctor: Game.Being.Bride,
	sex: 2,
	tasks: [],
	name: "bride",
	color: [255, 255, 255]
}, {
	weight: 0
});

Game.Beings.define("groom", {
	extend: "humanoid",
	tasks: [],
	name: "groom",
	color: [80, 80, 80]
}, {
	weight: 0
});

Game.Beings.define("guest", {
	extend: "humanoid",
	tasks: ["slowwander"],
	chats: ["What a wonderful wedding!", "You should definitely see the bride and the groom.", "Nice weather, isn't it?", "Most delighted by meeting you."],
	name: "wedding guest",
	sex: [1, 2],
	color: [140, 140, 140],
	colorVariation: [30, 30, 30]
}, {
	weight: 0
});

Game.Beings.define("rus", {
  extend: "humanoid",
  tasks: ["slowwander"],
  chats: ["Puh, jeg er ikke vant til at drikke så meget", "Kan du ikke ringe efter en taxa?", "Hvorfor er der så mange af dig?", "Tror du der er fest på medicin?", "Min tutor er vildt sej - han kunne bunde en HEL øl!", "dIntProg er svært", "Jeg vil være tutor når jeg bliver stor", "Jeg overvejer at droppe ud og blive humanist", "Hvor er pigerne henne?", "Hvorfor har de ikke Skinny Bitch i baren?", "Gider du ikke lige tørre bræk op på pigetoilettet?", "Jeg skulle aldrig ha' spillet Prügl med Cramer", "Ska' vi snave?"],
  name: "rus",
  sex: [1, 2],
  color: [140, 140, 140],
  colorVariation: [100, 100, 100]
}, {
  weight: 0
});

Game.Beings.define("hænger", {
  extend: "humanoid",
  tasks: ["slowwander"],
  chats: ["Der stod " + (Math.floor(Math.random() * 40)) + " GD på det bord...", "Hvorfor er der så mange russer?", "Tak for sidst", "Det sagde hun også i går!", "Skal du med i baren og ha' shots?"],
  name: "Hænger",
  sex: [1, 2],
  color: [140, 140, 140],
  colorVariation: [30, 30, 30]
}, {
  weight: 0
});

Game.Beings.define("hahn", {
  extend: "humanoid",
  tasks: ["slowwander"],
  chats: ["Mmmm vi mmmmm en øl mm mm mmmmm en øl?", "Mmmm vi lege mmmm eller mmmmm?", "Mmmm eller mmmmm?", "Mmmm mm mmm mm tre-bombe?"],
  name: "Hahn",
  sex: [1],
  color: [40, 150, 200],
  colorVariation: [30, 30, 30]
}, {
  weight: 0
});

Game.Beings.define("priest", {
  extend: "humanoid",
  tasks: [],
  chats: ["You want to talk to the bride - and you brought her nothing? Shame on you!"],
  sex: 1,
  name: "priest",
  color: [200, 30, 200]
}, {
  weight: 0
});

Game.Beings.define("SEKR", {
	extend: "humanoid",
	tasks: ["talkToPlayer"],
	chats: ["Du må hjælpe os - KA$$ er forsvundet! Sidst jeg så hende, snakkede hun om et forsøg i kælderen under fysik. Hun mumlede noget om overmenneskelig styrke, grinede hysterisk og løb sin vej."],
	sex: 2,
	name: "SEKR",
	color: [200, 30, 200]
}, {
	weight: 0
});
