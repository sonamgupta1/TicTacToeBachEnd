var constants = require('./constant'),
    responses = require('./responses');
    db_layer  = require('./db-layer');

function checkBlank(arr) {
    var arrlength = arr.length;
    for (var i = 0; i < arrlength; i++) {
        if (arr[i] === undefined) {
            arr[i] = "";
        } else {
            arr[i] = arr[i];
        }
        arr[i] = arr[i];
        if (arr[i] === '' || arr[i] === "" || arr[i] == undefined) {
            return 1;
            break;
        }
    }
    return 0;
};

exports.checkBlank = function (res, blankData, cb) {
    var checkBlankData = checkBlank(blankData);
    if (checkBlankData) {
        responses.parameterMissingResponse(res, []);
    } else {
        cb(null, blankData);
    }
};

exports.checkAccessToken = function(res, access_token, callback){

    db_layer.getAccessToken(res, access_token, function(error, result) {

        var countResult = result.length;
        if(countResult === 0) {
           responses.accessTokenInfoFailed(res,[]);
        } else {
            callback(null, result);
        }
    });
};

//exports.userDashboardInfo = function(res,id,cb){
//    db_layer.getDashboardInfo(res,id,function(error, result){
//
//        var countResultId = result.length;
//        if(countResult === 0){
//            responses.DashboardInfoFailed(res, []);
//
//        }
//        else{
//            cb(null,result);
//        }
//    })
//}