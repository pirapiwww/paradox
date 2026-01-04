/*:
 * @plugindesc Custom Options: Dash + Master Volume + Back (Safe Version)
 * @author Kamu
 */

(function() {

// ===============================================================
// 1. Replace Make Command List (Tanpa panggil bawaan)
// ===============================================================
Window_Options.prototype.makeCommandList = function() {

    this.addCommand("Always Dash", "alwaysDash");

    this.addCommand("Master Volume", "masterVolume");

    this.addCommand("Back", "backCommand");
};


// ===============================================================
// 2. ConfigManager tambahan untuk master volume
// ===============================================================
ConfigManager.masterVolume = 100;

const _ConfigManager_makeData = ConfigManager.makeData;
ConfigManager.makeData = function() {
    const config = _ConfigManager_makeData.call(this);
    config.masterVolume = this.masterVolume;
    return config;
};

const _ConfigManager_applyData = ConfigManager.applyData;
ConfigManager.applyData = function(config) {
    _ConfigManager_applyData.call(this, config);
    this.masterVolume = this.readVolume(config, "masterVolume");
};


// ===============================================================
// 3. Get/Set Option Values (Tanpa override bawaan)
// ===============================================================
Window_Options.prototype.getConfigValue = function(symbol) {

    if (symbol === "masterVolume") {
        return ConfigManager.masterVolume;
    }
    if (symbol === "backCommand") {
        return 0; // dummy
    }

    return ConfigManager[symbol];
};


Window_Options.prototype.setConfigValue = function(symbol, value) {

    if (symbol === "masterVolume") {
        ConfigManager.masterVolume = value;
        AudioManager.masterVolume = value / 100;
        return;
    }

    ConfigManager[symbol] = value;
};


// ===============================================================
// 4. Tekan OK di "Back" → keluar options
// ===============================================================
Window_Options.prototype.processOk = function() {
    const symbol = this.commandSymbol(this.index());

    if (symbol === "backCommand") {
        this.callHandler("cancel");
        return;
    }

    Window_Command.prototype.processOk.call(this);
};


// ===============================================================
// 5. Status Text untuk bar volume
// ===============================================================
Window_Options.prototype.statusText = function(index) {
    const symbol = this.commandSymbol(index);

    if (symbol === "masterVolume") {
        return this.volumeStatusText(ConfigManager.masterVolume);
    }

    if (symbol === "backCommand") {
        return ""; // Tidak ada status
    }

    return this.booleanStatusText(this.getConfigValue(symbol));
};

})();
