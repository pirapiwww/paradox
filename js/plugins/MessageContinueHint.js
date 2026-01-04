/*:
 * @plugindesc Simple blinking hint under Show Text messages.
 * @author Kamu
 */

(function() {

let hintSprite = null;
let blink = 0;

// CREATE HINT SPRITE IN SCENE MAP
const _Scene_Map_createAllWindows = Scene_Map.prototype.createAllWindows;
Scene_Map.prototype.createAllWindows = function() {
    _Scene_Map_createAllWindows.call(this);

    hintSprite = new Sprite(new Bitmap(500, 40));
    hintSprite.bitmap.fontSize = 20;
    hintSprite.visible = false;
    this.addChild(hintSprite);
};

// POSITION UPDATE
function updateHintPos() {
    const msg = SceneManager._scene._messageWindow;
    if (!msg) return;

    hintSprite.x = msg.x + (msg.width - hintSprite.bitmap.width) / 2;
    hintSprite.y = msg.y + msg.height - 10;
}

// SHOW WHEN TEXT STARTS
const _Window_Message_startMessage = Window_Message.prototype.startMessage;
Window_Message.prototype.startMessage = function() {
    _Window_Message_startMessage.call(this);

    hintSprite.bitmap.clear();
    hintSprite.bitmap.drawText("Press Z / Enter to continue", 0, 0, 500, 40, "center");
    hintSprite.visible = true;
    hintSprite.opacity = 255;
    blink = 0;
    updateHintPos();
};

// HIDE WHEN FINISHED
const _Window_Message_terminateMessage = Window_Message.prototype.terminateMessage;
Window_Message.prototype.terminateMessage = function() {
    _Window_Message_terminateMessage.call(this);
    hintSprite.visible = false;
};

// BLINK UPDATE
const _Scene_Map_update = Scene_Map.prototype.update;
Scene_Map.prototype.update = function() {
    _Scene_Map_update.call(this);

    if (hintSprite && hintSprite.visible) {
        blink++;
        hintSprite.opacity = 150 + Math.sin(blink / 20) * 100;
        updateHintPos();
    }
};

})();
