/*:
 * @plugindesc Auto HP & Stamina Bar + Safe Game Over Switch (No Freeze)
 * @author You
 */

(function() {
  const HP_VAR = 1;
  const STA_VAR = 2;
  const SHOW_SWITCH = 40;

  const HP_PIC_ID = 1;
  const STA_PIC_ID = 2;

  const UI_X = 0;
  const UI_Y = 0;

  const SPRINT_SPEED = 4;
  const NORMAL_SPEED = 3;
  const STA_DRAIN = 1;
  const STA_REGEN = 1;
  const MAX_STA = 100;

  const GAMEOVER_SWITCH = 99; // switch untuk game over

  function clamp(v, min, max) { return Math.max(min, Math.min(max, v)); }
  function round5(v) { return Math.floor(clamp(v, 0, 100)/5)*5; }

  const _Scene_Map_update = Scene_Map.prototype.update;
  Scene_Map.prototype.update = function() {
    _Scene_Map_update.call(this);
    if (!$gameSwitches.value(SHOW_SWITCH)) return;

    this.updateSprintSpeed();
    this.updateStamina();
    this.updateStatusBar();
    this.checkGameOver();
  };

  Scene_Map.prototype.updateStamina = function() {
    let sta = $gameVariables.value(STA_VAR);
    const sprintKey = Input.isPressed('shift');
    const moving = $gamePlayer.isMoving();

    if (sprintKey && moving && sta > 0) sta -= STA_DRAIN;
    else if (!sprintKey && sta < MAX_STA) sta += STA_REGEN;

    $gameVariables.setValue(STA_VAR, clamp(sta, 0, MAX_STA));
  };

  Scene_Map.prototype.updateSprintSpeed = function() {
    const sta = $gameVariables.value(STA_VAR);
    const sprintKey = Input.isPressed('shift');
    if (sprintKey && $gamePlayer.isMoving() && sta > 0)
      $gamePlayer.setMoveSpeed(SPRINT_SPEED);
    else
      $gamePlayer.setMoveSpeed(NORMAL_SPEED);
  };

  Scene_Map.prototype.updateStatusBar = function() {
    const hp = round5($gameVariables.value(HP_VAR));
    const sta = round5($gameVariables.value(STA_VAR));

    $gameScreen.showPicture(HP_PIC_ID, "HP_" + hp, 0, UI_X, UI_Y, 100, 100, 255, 0);
    $gameScreen.showPicture(STA_PIC_ID, "STA_" + sta, 0, UI_X, UI_Y, 100, 100, 255, 0);
  };

  Scene_Map.prototype.checkGameOver = function() {
    if ($gameVariables.value(HP_VAR) <= 0) {
      $gameSwitches.setValue(GAMEOVER_SWITCH, true);
    }
  };
})();
