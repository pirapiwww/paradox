/*:
 * @plugindesc Quick Playtest from a specific map (RPG Maker MV)
 * @author Rafi
 * @help
 * Start the game directly from a given map ID without title screen.
 * 
 * Change QUICK_PLAY_MAP_ID to the map you want.
 */

(() => {
    const QUICK_PLAY_MAP_ID = 1; // 🔧 Ganti ID map kamu

    const _Scene_Boot_start = Scene_Boot.prototype.start;
    Scene_Boot.prototype.start = function() {
        _Scene_Boot_start.call(this);

        // Jalankan new game manual
        if (DataManager._quickPlayDone === undefined) {
            DataManager.setupNewGame();
            $gamePlayer.reserveTransfer(QUICK_PLAY_MAP_ID, 0, 2, 2, 0);
            SceneManager.goto(Scene_Map);
            DataManager._quickPlayDone = true; // supaya gak looping
        }
    };
})();
