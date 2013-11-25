
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

Game.Beings.define("KA$$", {
	extend: "humanoid",
	name: "KA$$",
  wordEnding: "",
	sex: 2,
	hp: 3,
	speed: 115,
	damage: 3,
	chats: ['Død ved kølle!'],
	color: [100, 240, 100],
}, {
	weight: 0
});

Game.Beings.define("FORM", {
  extend: "humanoid",
  tasks: ["slowwander"],
  chats: ["På Tavlen!"],
  name: "fOrm",
  wordEnding: "dumme",
  sex: [1],
  color: [100, 240, 100]
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
  chats: ["Der stod " + (Math.floor(Math.random() * 20)) + " GD på det bord...", "Hvorfor er der så mange russer?", "Tak for sidst", "Det sagde hun også i går!", "Skal du med i baren og ha' shots?"],
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
  wordEnding: "",
  sex: [1],
  color: [40, 150, 200],
  colorVariation: [30, 30, 30]
}, {
  weight: 0
});

Game.Beings.define("CERM", {
  extend: "humanoid",
  tasks: ["slowwander"],
  chats: ["Hvad synes du om bandet?"],
  name: "CERM",
  wordEnding: "",
  sex: [2],
  color: [140, 50, 200],
  colorVariation: [30, 30, 30]
}, {
  weight: 0
});

Game.Beings.define("SEKR", {
	extend: "humanoid",
	tasks: ["talkToPlayer"],
	chats: ["Du må hjælpe os, den er helt gal med KA$$!<br/><br/>Hun vrøvlede om en portal til en anden dimension og om en hær af onde FU'er. Så grinede hun hysterisk og løb ned i kælderen under fysik.<br/><br/>Og hun virkede næsten <i>ædru</i>!"],
	sex: 2,
	name: "SEKR",
  wordEnding: "",
	color: [200, 30, 200]
}, {
	weight: 0
});
