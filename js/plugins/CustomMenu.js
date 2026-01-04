/*:
 * @plugindesc Custom In-Game Menu (Icons Same Size as Background)
 */

(function() {

// ==========================================
//  REPLACE DEFAULT MENU
// ==========================================

Scene_Map.prototype.callMenu = function() {
    SceneManager.push(Scene_Menu);
};


// ==========================================
//  CUSTOM SCENE MENU
// ==========================================

function Scene_Menu() {
    this.initialize.apply(this, arguments);
}

Scene_Menu.prototype = Object.create(Scene_MenuBase.prototype);
Scene_Menu.prototype.constructor = Scene_Menu;

Scene_Menu.prototype.initialize = function() {
    Scene_MenuBase.prototype.initialize.call(this);
    this._index = 0;
};

Scene_Menu.prototype.create = function() {
    Scene_MenuBase.prototype.create.call(this);

    // --------------------------------------
    // BACKGROUND FULLSCREEN
    // --------------------------------------
    this._bg = new Sprite(ImageManager.loadPicture("Menu_July2039"));
    this._bg.x = 85;
    this._bg.y = 115;
    this.addChild(this._bg);

    // --------------------------------------
    // QUEST PROLOG
    // --------------------------------------

    // Quest Mandi
    if($gameSwitches.value(2) === false){
        this._quest1 = new Sprite(ImageManager.loadPicture("prolog_questShower"));
        this._quest1.x = 85;
        this._quest1.y = 115;
        this.addChild(this._quest1);

    // Quest Makan
    } else if($gameSwitches.value(2) === true && $gameSwitches.value(4) === false){
        this._quest2 = new Sprite(ImageManager.loadPicture("prolog_questEat"));
        this._quest2.x = 85;
        this._quest2.y = 115;
        this.addChild(this._quest2);

    // Quest Main
    } else if($gameSwitches.value(4) === true){
        this._quest3 = new Sprite(ImageManager.loadPicture("prolog_questPlay"));
        this._quest3.x = 85;
        this._quest3.y = 115;
        this.addChild(this._quest3);
    }

    // --------------------------------------
    // ICONS (SEUKURAN BACKGROUND)
    // --------------------------------------
    this._icon1 = new Sprite(ImageManager.loadPicture("item_icon"));
    this._icon1.x = 85;
    this._icon1.y = 115;
    this.addChild(this._icon1);

    this._icon2 = new Sprite(ImageManager.loadPicture("save_icon"));
    this._icon2.x = 85;
    this._icon2.y = 115;
    this.addChild(this._icon2);

    this._icon3 = new Sprite(ImageManager.loadPicture("options_icon"));
    this._icon3.x = 85;
    this._icon3.y = 115;
    this.addChild(this._icon3);

    this._icon4 = new Sprite(ImageManager.loadPicture("exit_icon"));
    this._icon4.x = 85;
    this._icon4.y = 115;
    this.addChild(this._icon4);

    this.updateHighlight();

    // Suara saat membuka custom menu
    AudioManager.playSe({name: "Cursor1", volume: 90, pitch: 100, pan: 0});

};


// ==========================================
//  UPDATE (NAVIGASI, CANCEL, OK)
// ==========================================

Scene_Menu.prototype.update = function() {
    Scene_MenuBase.prototype.update.call(this);

    // Cancel → kembali ke Map
    if (Input.isTriggered('cancel')) {
        AudioManager.playSe({name: "Cancel2", volume: 90, pitch: 100, pan: 0});
        SceneManager.pop();
        return;
    }

    // Navigasi grid (0–3 → 1 2 / 3 4)
    if (Input.isTriggered('right')) {
        let prev = this._index;
        if (this._index === 0) this._index = 1;
        else if (this._index === 2) this._index = 3;
        if (prev !== this._index) {
            AudioManager.playSe({name: "Cursor1", volume: 90, pitch: 100, pan: 0});
            this.updateHighlight();
        }
    }

    if (Input.isTriggered('left')) {
        let prev = this._index;
        if (this._index === 1) this._index = 0;
        else if (this._index === 3) this._index = 2;
        if (prev !== this._index) {
            AudioManager.playSe({name: "Cursor1", volume: 90, pitch: 100, pan: 0});
            this.updateHighlight();
        }
    }

    if (Input.isTriggered('down')) {
        let prev = this._index;
        if (this._index === 0) this._index = 2;
        else if (this._index === 1) this._index = 3;
        if (prev !== this._index) {
            AudioManager.playSe({name: "Cursor1", volume: 90, pitch: 100, pan: 0});
            this.updateHighlight();
        }
    }

    if (Input.isTriggered('up')) {
        let prev = this._index;
        if (this._index === 2) this._index = 0;
        else if (this._index === 3) this._index = 1;
        if (prev !== this._index) {
            AudioManager.playSe({name: "Cursor1", volume: 90, pitch: 100, pan: 0});
            this.updateHighlight();
        }
    }

    // OK → buka scene
    if (Input.isTriggered('ok')) {
        AudioManager.playSe({name: "Decision2", volume: 90, pitch: 100, pan: 0});
        this.onSelect();
    }
};


// ==========================================
//  HIGHLIGHT ICON
// ==========================================

Scene_Menu.prototype.updateHighlight = function() {

    const off = [0,0,0,0];      // normal
    const on  = [80,80,80,0];   // highlight

    this._icon1.setColorTone(off);
    this._icon2.setColorTone(off);
    this._icon3.setColorTone(off);
    this._icon4.setColorTone(off);

    if (this._index === 0) this._icon1.setColorTone(on);
    if (this._index === 1) this._icon2.setColorTone(on);
    if (this._index === 2) this._icon3.setColorTone(on);
    if (this._index === 3) this._icon4.setColorTone(on);
};


// ==========================================
// SELECTED ICON ACTION
// ==========================================

Scene_Menu.prototype.onSelect = function() {
    if (this._index === 0) SceneManager.push(Scene_Item);
    if (this._index === 1) SceneManager.push(Scene_Save);
    if (this._index === 2) SceneManager.push(Scene_Options);
    if (this._index === 3) SceneManager.push(Scene_GameEnd);
};

// ==== Simplify Item Menu: hanya Item & Key Item ====
Window_ItemCategory.prototype.makeCommandList = function() {
    this.addCommand("Item", 'item');
    this.addCommand("Key Item", 'keyItem');
};


})();
