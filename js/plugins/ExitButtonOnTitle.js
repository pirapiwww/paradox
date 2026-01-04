/*:
 * @plugindesc Adds a safe "Exit Game" option to the title screen without overwriting anything important.
 * @author Kamu
 */

(function() {

  const _makeCommandList = Window_TitleCommand.prototype.makeCommandList;
  Window_TitleCommand.prototype.makeCommandList = function() {
      _makeCommandList.call(this);
      this.addCommand("Exit Game", 'exit', true);
  };

  const _createCommandWindow = Scene_Title.prototype.createCommandWindow;
  Scene_Title.prototype.createCommandWindow = function() {
      _createCommandWindow.call(this);
      this._commandWindow.setHandler('exit', this.commandExit.bind(this));
  };

  Scene_Title.prototype.commandExit = function() {
      SoundManager.playCancel();
      SceneManager.exit();
  };

})();
