var Game = {
	engine: null,
  scheduler: null,
	player: null,
	level: null,
	story: null,
	storyFlags: {
		wantsFlower: false,
		groomDead: false,
		nightEnded: false,
		gardenerDead: false
	},
	
	init: function() {
    this.scheduler = new ROT.Scheduler.Simple();
    this.engine = new ROT.Engine(this.scheduler);
    this.engine.start();
		window.addEventListener("load", this);
	},

	handleEvent: function(e) {
		switch (e.type) {
			case "load":
				window.removeEventListener("load", this);
				this._load();
			break;

			case "resize":
				this._resize();
			break;
		}
	},
	
	over: function() {
		this.engine.lock();

		var floor = Game.Cells.create("floor").setId("start");
		var level = new Game.Level().setSize(3, 3);
		level.setCell(floor, 1, 1);
		level.setBeing(this.player, 1, 1);
		Game.switchLevel(level, null, "fade");
	},

	switchLevel: function(newLevel, cell, direction) {
		var oldLevel = this.level;
		this.level = null;
		if (oldLevel) { this.engine.lock(); }

		var position = newLevel.getCellById(cell || "start").getPosition();
	
		if (oldLevel) { /* clear the old level */
			oldLevel.removeBeing(this.player);
			this.scheduler.clear();
		}

		this.level = newLevel;

		/* welcome the new level */
		newLevel.setBeing(this.player, position[0], position[1]);
		for (var p in newLevel.beings) {
			this.scheduler.add(newLevel.beings[p], true);
		}

		this.level.checkRules();

		this._resize();
		this._transitionLevel(newLevel, oldLevel, direction);

		this.engine.unlock();
	},

	_transitionLevel: function(newLevel, oldLevel, direction) {
		var oppositeMap = {
			north: "south",
			south: "north",
			east: "west",
			west: "east",
			fade: "fade"
		};

		var newNode = newLevel.getContainer();
		if (direction) { newNode.className = direction; }
		document.querySelector("#level").appendChild(newNode);

		document.body.offsetWidth; /* FIXME hack */

		if (oldLevel && oppositeMap[direction]) { oldLevel.getContainer().className = oppositeMap[direction]; }
		newNode.className = "";
	},

	_load: function(e) {
		this.story = new Game.Story(document.querySelector("#story"));
		this.status = new Game.Status(document.querySelector("#status"));
		this.stats = new Game.Stats(document.querySelector("#stats"));
		this.legend = new Game.Legend(document.querySelector("#legend"));

		this.player = Game.Beings.create("player");

    // intro sequence
		new Game.Intro().then(this._start.bind(this));
	},

	_start: function(e) {
		window.addEventListener("resize", this);
/*
		this.storyFlags.nightEnded = 1;
		this.storyFlags.gardenerDead = 1;
*/		
		// this.storyFlags.goToCellar = 1;
    Game.LevelManager.get("level1").then(function(level) {
			this.switchLevel(level);
		}.bind(this));
/*
		var d = new Game.Level.Dungeon(1);
		this.switchLevel(d, "start", "fade");
*/
	},
	
	_resize: function() {
		if (!this.level) { return; }
		var parent = document.querySelector("#level");
		this.level.resize(parent.offsetWidth, parent.offsetHeight);
		var position = this.player.getPosition();
		Game.legend.update(position[0], position[1]);
	}
}

Game.init();
