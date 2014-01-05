Game.Cells = new Game.Repository(Game.Cell);

/* wall blocks */

Game.Cells.define("item", {
  blocksMovement: 1,
  color: [80, 80, 80],
  colorVariation: 10,
  name: "???"
});

Game.Cells.define("wall", {
	blocksMovement: 1,
	blocksLight: 1,
	"char": "#",
	//color: [80, 80, 80],
  color: [150, 110, 20],
	colorVariation: 10,
	name: "mur"
});

Game.Cells.define("window", {
	blocksMovement: 1,
	blocksLight: 0,
	"char": "=",
	color: [80, 80, 80],
	name: "vindue",
  wordEnding: "et"
});

/* floor blocks */

Game.Cells.define("floor", {
	"char": ".",
	color: [40, 40, 40],
	name: "gulv",
  wordEnding: "et"
});

Game.Cells.define("ground", {
	"char": ".",
	color: [150, 100, 50],
	name: "plain ground"
});

Game.Cells.define("path", {
	extend: "ground",
	name: "path"
});

Game.Cells.define("pier", {
	"char": "#",
	color: [130, 90, 30],
	name: "wooden pier"
});

/* nature blocks */

Game.Cells.define("water", {
	"char": "≈",
	name: "water",
	countable: 0,
	blocksMovement: 1,
	color: [50, 50, 240],
	colorVariation: 20
});

Game.Cells.define("grass", {
	"char": ".",
	color: [100, 150, 50],
	name: "grassy ground"
});

Game.Cells.define("highgrass", {
	"char": ['"', '"', '"', "'"],
	color: [150, 220, 50],
	colorVariation: [30, 30, 10],
	name: "high grass"
});

Game.Cells.define("tree", {
	"char": ["♠", "♣"],
	color: [50, 220, 20],
	colorVariation: 20,
	blocksMovement: 1,
	blocksLight: 1,
	name: "tree"
});

/* features */

Game.Cells.define("staircase-up", {
	"char": "<",
	name: "trappe up"
});

Game.Cells.define("staircase-down", {
	"char": ">",
	name: "trappe ned"
});

Game.Cells.define("well", {
	"char": "O",
	name: "well",
	blocksMovement: 1,
	color: [120, 120, 120]
});

Game.Cells.define("tombstone", {
	"char": "+",
	name: "tombstone",
	blocksMovement: 1,
	color: [120, 120, 120]
});

Game.Cells.define("statue", {
	"char": "Y",
	name: "status",
	blocksMovement: 1,
	color: [100, 100, 100]
});

Game.Cells.define("bench", {
	"char": "|",
	name: "bench",
	color: [150, 100, 50]
});

Game.Cells.define("altar", {
	"char": "±",
	name: "altar",
	blocksMovement: 1,
	color: [200, 200, 200]
});

Game.Cells.define("door", {
	ctor: Game.Cell.Door,
	color: [153, 102, 51]
});

Game.Cells.define("torch",  {
	"char": "^",
	name: "torch",
	light: [240, 240, 30],
	color: [240, 240, 30]
});
