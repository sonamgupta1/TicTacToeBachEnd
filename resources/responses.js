var constants = require('./constant'),
    logging   = require('./logging');

exports.executionError = function(res, data) {
    var response = {
        "message": constants.responseMessages.ERROR_IN_EXECUTION,
        "status":  constants.responseStatus.ERROR_IN_EXECUTION,
        "data": data
    };
    res.jsonp(response);
};

exports.parameterMissingResponse = function(res, data) {
    var response = {
        "message": constants.responseMessages.PARAMETER_MISSING,
        "status":  constants.responseStatus.PARAMETER_MISSING,
        "data": data
    };
    res.jsonp(response);
};

exports.successRegister = function(res, data) {
    var response = {
        "message": constants.responseMessages.REGISTER_SUCCESSFULLY,
        "status":  constants.responseStatus.REGISTER_SUCCESSFULLY,
        "data": data
    };
    res.jsonp(response);
};

exports.finalResultError = function(res, data) {
    var response = {
        "message": constants.responseMessages.FINAL_RESULT_ERROR,
        "status":  constants.responseStatus.FINAL_RESULT_ERROR,
        "data": data
    };
    res.jsonp(response);
};


exports.userNameInfo = function(res, data) {
    var response = {
        "message": constants.responseMessages.ACTION_COMPLETE,
        "status":  constants.responseStatus.ACTION_COMPLETE,
        "data": data
    };
    res.jsonp(response);
};
exports.successLogin = function(res, data) {
    var response = {
        "message": constants.responseMessages.LOGIN_SUCCESSFULLY,
        "status":  constants.responseStatus.LOGIN_SUCCESSFULLY,
        "data": data
    };
    res.jsonp(response);
};
exports.failedLogin = function(res, data) {
    var response = {
        "message": constants.responseMessages.LOGIN_FAILED,
        "status":  constants.responseStatus.LOGIN_FAILED,
        "data": data
    };
    res.jsonp(response);
};
exports.allReadyExist= function(res, data) {
    var response = {
        "message": constants.responseMessages.ALL_READY_AN_USER_EXITS_WITH_SAME_NAME,
        "status":  constants.responseStatus.ALL_READY_AN_USER_EXITS_WITH_SAME_NAME,
        "data": data
    };
    res.jsonp(response);
};

exports.successUserProfile = function(res, data) {
    var response = {
        "message": constants.responseMessages.PROFILE_GET_SUCCESSFULLY,
        "status":  constants.responseStatus.PROFILE_GET_SUCCESSFULLY,
        "data": data
    };
    res.jsonp(response);
};
exports.successUserEditProfile = function(res, data) {
    var response = {
        "message": constants.responseMessages.PROFILE_EDIT_SUCCESSFULLY,
        "status":  constants.responseStatus.PROFILE_EDIT_SUCCESSFULLY,
        "data": data
    };
    res.jsonp(response);
};

exports.LogOut = function(res, data) {
    var response = {
        "message": constants.responseMessages.LOGOUT_SUCCESSFULLY,
        "status":  constants.responseStatus.LOGOUT_SUCCESSFULLY,
        "data": data
    };
    res.jsonp(response);
};


exports.accessTokenInfo = function(res, data) {
    var response = {
        "message": constants.responseMessages.GET_ACCESS_TOKEN_SUCCESSFULLY,
        "status":  constants.responseStatus.GET_ACCESS_TOKEN_SUCCESSFULLY,
        "data": data
    };
    res.jsonp(response);
};
exports.accessTokenInfoFailed = function(res, data) {
    var response = {
        "message": constants.responseMessages.ACCESS_TOKEN_NOT_EXISTS,
        "status":  constants.responseStatus.ACCESS_TOKEN_NOT_EXISTS,
        "data": data
    };
    res.jsonp(response);
};

exports.DashboardInfoFailed = function(res, data) {
    var response = {
        "message": constants.responseMessages.DATA_NOT_EXISTS,
        "status":  constants.responseStatus.DATA_NOT_EXISTS,
        "data": data
    };
    res.jsonp(response);
};
exports.actionComplete = function(res, data) {
    var response = {
        "message": constants.responseMessages.ACTION_COMPLETE,
        "status":  constants.responseStatus.ACTION_COMPLETE,
        "data": data
    };
    res.jsonp(response);
};
exports.actionFailed = function(res, data) {
    var response = {
        "message": constants.responseMessages.ACTION_FAILED,
        "status":  constants.responseStatus.ACTION_FAILED,
        "data": data
    };
    res.jsonp(response);
};