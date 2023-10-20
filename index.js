
const ColorCodeDictionary = {
    Reset: '\x1b[0m',
    Bright: '\x1b[1m',
    Dim: '\x1b[2m',
    Underscore: '\x1b[4m',
    Blink: '\x1b[5m',
    Reverse: '\x1b[7m',
    Hidden: '\x1b[8m',
    FgBlack: '\x1b[30m',
    FgRed: '\x1b[31m',
    FgGreen: '\x1b[32m',
    FgYellow: '\x1b[33m',
    FgBlue: '\x1b[34m',
    FgMagenta: '\x1b[35m',
    FgCyan: '\x1b[36m',
    FgWhite: '\x1b[37m',
    BgBlack: '\x1b[40m',
    BgRed: '\x1b[41m',
    BgGreen: '\x1b[42m',
    BgYellow: '\x1b[43m',
    BgBlue: '\x1b[44m',
    BgMagenta: '\x1b[45m',
    BgCyan: '\x1b[46m',
    BgWhite: '\x1b[47m'
};

/**
 * @typedef {
 *  color?: "black" | "green" | "yellow" | "magenta" | "blue" | "cyan" | "white",
 *  colour? "black" | "green" | "yellow" | "magenta" | "blue" | "cyan" | "white",
 *  bgColor?: "black" | "green" | "yellow" | "magenta" | "blue" | "cyan" | "white",
 *  bgColour?: "black" | "green" | "yellow" | "magenta" | "blue" | "cyan" | "white",
 *  dimness?: "dim" | "bright",
 *  hidden?: boolean,
 *  blink?: boolean,
 *  reverse?: boolean
 * } settingsObj
 */

/**
 * Changes the text's appearance to match the settings
 * @param {string} text 
 * @param {settingsObj} settings 
*/
function setText(text, settings) {
    const textTransformList = [];

    /**
     * Pushes the text transform to textTransformList
     * @param {keyof thc} key 
     */
    function inThcPush(key) {
        if (ColorCodeDictionary[key]) {
            textTransformList.push(ColorCodeDictionary[key]);
        }
    }


    if (settings.color) {
        const key = `Fg${settings.color[0].toUpperCase()}${settings.color.slice(1, settings.color.length)}`;
        inThcPush(key);
    }
    if (settings.colour) {
        const key = `Fg${settings.colour[0].toUpperCase()}${settings.colour.slice(1, settings.colour.length)}`;
        inThcPush(key);
    }
    if (settings.bgColor) {
        const key = `Bg${settings.bgColor[0].toUpperCase()}${settings.bgColor.slice(1, settings.bgColor.length)}`;
        inThcPush(key);
    }
    if (settings.bgColour) {
        const key = `Bg${settings.bgColour[0].toUpperCase()}${settings.bgColour.slice(1, settings.bgColour.length)}`;
        inThcPush(key);
    }
    if (settings.dimness) {
        const key = settings.dimness === "dim" ? "Dim" : "Bright";
        inThcPush(key);
    }
    if (settings.hidden) {
        inThcPush("Hidden");
    }
    if (settings.reverse) {
        inThcPush("Reverse");
    }
    if (settings.blink) {
        inThcPush("Blink");
    }

    return `${textTransformList.join("")}${text}${ColorCodeDictionary.Reset}`;
}

const logTags = {
    success: `${setText("✔", { colour: "green" })} ${setText(" SUCCESS ", { bgColour: "green", colour: "black" })}`,
    fail: `${setText("✘", { colour: "red" })} ${setText(" FAIL ", { bgColour: "red", colour: "white" })}`,
    building: `${setText("⚒", { color: "yellow" })} ${setText(" BUILDING ", { bgColour: "yellow", colour: "white" })}`,
    compiling: `${setText("⚒", { color: "yellow" })} ${setText(" COMPILING ", { bgColour: "yellow", colour: "white" })}`,
    executing: `${setText("⚡", { color: "yellow" })} ${setText(" EXECUTING ", { bgColour: "yellow", colour: "white" })}`,
    building_executing: `${setText("⚡", { color: "yellow" })} ${setText(" BUILDING & EXECUTING ", { bgColor: "yellow", color: "white" })}`,
    testing: `${setText("🧪", { colour: "blue" })} ${setText(" TESTING ", { bgColour: "blue", colour: "white" })}`
}

/**
 * Returns the string representing the logtag
 * @param {string} symbol 
 * @param {string} text 
 * @param {"black" | "green" | "yellow" | "magenta" | "blue" | "cyan" | "white"} accentColour 
 */
function createLogTag(symbol, text, accentColour, textColour = null) {
    let tag = `${setText(symbol, { colour: accentColour })} ${setText(" " + text + " ", { bgColour: accentColour })}`;
    
    if (textColour) {
        tag = `${setText(symbol, { colour: accentColour })} ${setText(" " + text + " ", { bgColour: accentColour, colour: textColour })}`
    };

    return tag;
}

/**
 * 
 * @param {any} value 
 * @param {string | null} logtag 
 */
function log(value, logtag) {
    console.log(`${logtag ? logtag + " " : ""}${value}`)
}

/**
 * Scrolls away in the console by spamming new lines
 * @param {number} scrollAmount 
 */
function emptyConsole(scrollAmount) {
    let scroll = scrollAmount ? scrollAmount : 120;
    for (let i = 0; i < scroll; i++) {
        console.log("\n");
    }
}

module.exports = { setText, logTags, createLogTag, log, emptyConsole };