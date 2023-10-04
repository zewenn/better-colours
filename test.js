const bc = require("./index.js");

const myLogTag = bc.createLogTag("???", "ANYAD EGY KURVAAA", "magenta")

bc.emptyConsole();

console.log(bc.logTags.success);

bc.log("asd");

bc.log("asd", myLogTag)