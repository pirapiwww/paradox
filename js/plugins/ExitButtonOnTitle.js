/*:
 * @plugindesc Adds an "Exit Game" option to the title screen.
 * @author Kamu
 */

(function() {

  // 🔹 1. Tambahkan perintah baru ke window title
  const _Window_TitleCommand_makeCommandList = Window_TitleCommand.prototype.makeCommandList;
  Window_TitleCommand.prototype.makeCommandList = function() {
    _Window_TitleCommand_makeCommandList.call(this);
    this.addCommand("Exit Game", 'exit'); // Tambah tombol baru
  };

  // 🔹 2. Tangani aksi saat tombol dipilih
  const _Scene_Title_createCommandWindow = Scene_Title.prototype.createCommandWindow;
  Scene_Title.prototype.createCommandWindow = function() {
    _Scene_Title_createCommandWindow.call(this);
    this._commandWindow.setHandler('exit', this.commandExit.bind(this));
  };

  Scene_Title.prototype.commandExit = function() {
    // 🔹 3. Bunyi konfirmasi & keluar game
    SoundManager.playCancel();
    SceneManager.exit();
  };

})();