Game.Level.Level1 = function() {
	Game.Level.call(this);

	this._lighting.setOptions({range:8});
	this._playerLight = [30, 30, 30];
	
	this._gates = [];
  this._SEKR = null;
	this._NF = null;
  this._FORM = null;
  this._FORMCabinet = null;
  this._FORMAppearsCell = null;
  this._moveHereWhenFORMAppearsCell = null;
  this._TKEntranceCell = null;
};
Game.Level.Level1.extend(Game.Level);

Game.Level.Level1.prototype.fromTemplate = function(map, def) {
	Game.Level.prototype.fromTemplate.call(this, map, def);
	
	for (var cellKey in this.cells) {
		var cell = this.cells[cellKey];
    //console.log(cell.getId());
    if (cell.getType() == "gate") { this._gates.push(cell); }
    if (cell.getId() == "form-skab") { this._FORMCabinet = cell; }
    if (cell.getId() == "form-appears") { this._FORMAppearsCell = cell; }
    if (cell.getId() == "move-here-when-form-appears") { this._moveHereWhenFORMAppearsCell = cell; }
		if (cell.getId() == "tk-entrance") { this._TKEntranceCell = cell; }
	}

	for (var beingKey in this.beings) {
		var being = this.beings[beingKey];
    if (being.getType() == "SEKR") { this._SEKR = being; }
    if (being.getType() == "NF") { this._NF = being; }
	}

	this._initStory();
	return this;
};

Game.Level.Level1.prototype._initStory = function() {
  this._addRule(function() {
    return true;
  }, function() {
    Game.story.newChapter("TÅGEKAMMERET holder fest og der er fulde russer ud over det hele.");
    return true;
  });

  this._addRule(function() {
    return this._SEKR.chattedWith();
  }, function() {
    Game.story.newChapter("KA$$ opfører sig tilsyneladende endnu mere mærkeligt end sædvanligt.<br/><br/>Jeg har lovet SEKR at undersøge hvor hun er blevet af...");
    Game.story.setTask("Gå ned i kælderen under fysik.");
    Game.storyFlags.talkedToSEKR = 1;
    this._SEKR.setChats(['Pleeeease find KA$$! Jeg er så dårlig til at lave regnskaber...', 'Har du fundet hende endnu?']);
    return true;
  });

  this._addRule(function() {
    return Game.storyFlags.findFORM && Game.player.isAtPosition(this._TKEntranceCell.getPosition());
  }, function() {
    Game.status.show('fOrm siger: "<i>Hallå</i>! Ka\' du hør\' mig? Herovre, i skabet!"');
    return false;
  });

  this._addRule(function() {
    return Game.storyFlags.findFORM && this._FORMCabinet.bumpedInto() && !Game.storyFlags.releaseFORM;
  }, function() {
    Game.status.show('fOrm siger: "Jeg ved ik\' hvo\'rn, men jeg har fået låst mig selv inde i skabet. Få fat i reservenøglen - NF har\'en - og kom å luk mig ud!"');

    Game.story.addChapter("Dumme fOrm har låst sig selv inde i skabet... <i>suk</i>");
    Game.story.setTask("Find NF og få reservenøglen til fOrm-skabet");
    Game.storyFlags.findFORM = 0;
    this._FORMCabinet._bumpedInto = false;
    Game.storyFlags.findNF = 1;
    return true;
  });

  this._addRule(function() {
    return Game.storyFlags.findNF && this._NF.chattedWith();
  }, function() {
    Game.status.show('... "Årh, har fOrm nu låst sig inde i skabet <i>igen</i>? Jeg tror, at VC har reservenøglen...<br/><br/>... nej vent, den er lige her! Vær\'sgo"');
    Game.story.addChapter("Jeg har reservenøglen til fOrm-skabet!");
    Game.story.setTask("Befri fOrm");
    delete Game.storyFlags.findNF;
    Game.storyFlags.releaseFORM = 1;
    return true;
  });

  this._addRule(function() {
    return Game.storyFlags.releaseFORM && this._FORMCabinet.bumpedInto();
  }, function() {
    Game.story.addChapter("fOrm er kommet ud af skabet!");
    var moveHerePos = this._moveHereWhenFORMAppearsCell.getPosition();
    this.setBeing(Game.player, moveHerePos[0], moveHerePos[1]);

    this._FORM = Game.Beings.create('FORM');
    var FORMAppearsCellPos = this._FORMAppearsCell.getPosition();
    this.setBeing(this._FORM, FORMAppearsCellPos[0], FORMAppearsCellPos[1]);
    Game.scheduler.add(this._FORM, true);

    Game.status.show('Dumme fOrm siger: "<i>Jæs</i>!, endelig er jeg kommet ud af skabet!"');

    delete Game.storyFlags.releaseFORM;
    Game.storyFlags.formReleased = 1;
    return true;
  });

  this._addRule(function() {
    return Game.storyFlags.formReleased && this._FORM.chattedWith();
  }, function() {
    Game.status.show('Dumme fOrm siger: "Tak fordi du lukkede mig ud. Her er nøglen til kælderen under fysik. Pas på du ikke kommer til at låse dig selv inde dernede."');
    Game.story.setTask("Gå ned i kælderen under fysik");
    Game.storyFlags.goToCellar = 1;
    return true;
  });
};

Game.Level.Level1.prototype._welcomeBeing = function(being) {
	Game.Level.prototype._welcomeBeing.call(this, being);
	if (being == Game.player) { being.setLight(this._playerLight); }
};
