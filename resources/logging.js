
var debugging_enabled = true;

/*----------------------------------------- START SECTION ------------------------------------ */
exports.startSection = function(section) {
    if(debugging_enabled) {
        console.log("=============   " + section + "   ==============");
    }
};

/*----------------------------------------- REQUEST SECTION ------------------------------------ */
exports.logRequest = function(request) {
    if(debugging_enabled) {
        console.log("REQUEST: " + JSON.stringify(request.body));
    }
};

/*----------------------------------------- RESPONSE SECTION ------------------------------------ */
exports.logResponse = function(response) {
    if(debugging_enabled) {
        console.log("RESPONSE: " + JSON.stringify(response, undefined, 2));
    }
};

/*----------------------------------------- LOGGING DATABASE QUERY ERROR ------------------------------------ */
exports.logDatabaseQueryError = function (eventFired, error, result) {
    if(debugging_enabled) {
        process.stderr.write("Event: " + eventFired);
        process.stderr.write("\tError: " + JSON.stringify(error));
        process.stderr.write("\tResult: " + JSON.stringify(result));
    }
};

