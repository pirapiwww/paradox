/*:
 * @plugindesc Adds a "Gallery" command to the Title Screen that opens the default Item menu (Item + Key Item only). MV compatible.
 * @author Kamu
 *
 * @help
 * "Gallery" will appear under Continue and above Options.
 * When selected, it opens the default Item menu.
 * Weapons & Armors are removed from the category list.
 */

(function() {

    // ==================================================================
    // 1. Insert "Gallery" under Continue & above Options
    // ==================================================================
    const _makeCommandList = Window_TitleCommand.prototype.makeCommandList;
    Window_TitleCommand.prototype.makeCommandList = function() {
        _makeCommandList.call(this);

        // Find index of Continue
        let continueIndex = this._list.findIndex(cmd => cmd.symbol === "continue");

        if (continueIndex < 0) continueIndex = 0;

        // Insert Gallery after Continue
        this._list.splice(continueIndex + 1, 0, {
            name: "Gallery",
            symbol: "gallery",
            enabled: true,
            ext: null
        });
    };

    // ==================================================================
    // 2. Add handler for "Gallery"
    // ==================================================================
    const _createCommandWindow = Scene_Title.prototype.createCommandWindow;
    Scene_Title.prototype.createCommandWindow = function() {
        _createCommandWindow.call(this);

        // Handler → open Item scene
        this._commandWindow.setHandler("gallery", () => {
            SceneManager.push(Scene_Item);
        });
    };

    // ==================================================================
    // 3. LIMIT Item Categories → ONLY "Item" & "Key Item"
    // ==================================================================
    Window_ItemCategory.prototype.makeCommandList = function() {
        this.addCommand(TextManager.item,  'item');
        this.addCommand(TextManager.keyItem, 'keyItem');
    };

})();
