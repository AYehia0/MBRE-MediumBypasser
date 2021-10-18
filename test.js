const childProcess = require("child_process")
const fs = require("fs")

// where the files exists
const SRC_LOCATION = "src"

// the -q for muting
const createZIPCommand = `zip -r -q extention_build.zip ${SRC_LOCATION}`

childProcess.execSync(createZIPCommand)
