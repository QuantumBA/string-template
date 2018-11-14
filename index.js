var nargs = /\{([0-9a-zA-Z\.]+)\}/g
var slice = Array.prototype.slice
var getProp = require('./getProp')
var scapeInit = "{"
var scapeEnd = "}"

module.exports = template

function template(string) {
    var args

    if (arguments.length === 5 && typeof arguments[1] === "object") {
        args = arguments[1]
        nargs = arguments[2]
        scapeInit = arguments[3]
        scapeEnd = arguments[4]
    }
    else if (arguments.length === 4 && typeof arguments[1] === "object") {
        args = arguments[1]
        nargs = arguments[2]
        scapeInit = arguments[3]
    }
    else if (arguments.length === 3 && typeof arguments[1] === "object") {
        args = arguments[1]
        nargs = arguments[2]
    } else if (arguments.length === 2 && typeof arguments[1] === "object") {
        args = arguments[1]
    } else {
        args = slice.call(arguments, 1)
    }

    if (!args) {
        args = {}
    }

    return string.replace(nargs, function replaceArg(match, i, index) {
        // Escaped brackets
        if (string[index - 1] === scapeInit &&
            string[index + match.length] === scapeEnd) {
            return i
        }

        // Replaced values
        const result = getProp(args, i)
        if (result == null) {
            return match
        }

        return result
    })
}
