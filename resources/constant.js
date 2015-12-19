function define(obj, name, value) {
    Object.defineProperty(obj, name, {
        value:        value,
        enumerable:   true,
        writable:     false,
        configurable: false
    });
}

exports.responseMessages = {};
define(exports.responseMessages, 'SOMETHING_WENT_WRONG',                  'Something went wrong.');
define(exports.responseMessages, 'ERROR_IN_EXECUTION',                    'Error in execution.');
define(exports.responseMessages, 'INVALID_ACCESS_TOKEN',                  'Invalid access token.');
define(exports.responseMessages, 'PARAMETER_MISSING',                     'Some parameter missing.');
define(exports.responseMessages, 'ACTION_COMPLETE',                       'Action complete.');
define(exports.responseMessages, 'REGISTER_SUCCESSFULLY',                 'Registered successfully.');
define(exports.responseMessages, 'FINAL_RESULT_ERROR',                    'Final result error.');
define(exports.responseMessages, 'ACTION_COMPLETE',                       'Action complete.');
define(exports.responseMessages, 'LOGIN_SUCCESSFULLY',                     'Login successfully.');
define(exports.responseMessages, 'LOGIN_FAILED',                            'Login failed.');
define(exports.responseMessages, 'ALL_READY_AN_USER_EXITS_WITH_SAME_NAME',   'Username all ready  exists');
define(exports.responseMessages, 'PROFILE_GET_SUCCESSFULLY',                'Profile get successfully.');
define(exports.responseMessages, 'PROFILE_EDIT_SUCCESSFULLY',                'Profile edit successfully.');
define(exports.responseMessages, 'LOGOUT_SUCCESSFULLY',                      'Logout successfully');
define(exports.responseMessages, 'GET_ACCESS_TOKEN_SUCCESSFULLY',            'Access token get successfully');
define(exports.responseMessages, 'ACCESS_TOKEN_NOT_EXISTS',                  'Invalid access token.');
define(exports.responseMessages, 'DATA_NOT_EXISTS',                           'Invalid id.');
define(exports.responseMessages, 'ACTION_FAILED',                             'No result.');



exports.responseStatus = {};
define(exports.responseStatus, 'SOMETHING_WENT_WRONG',                  400);
define(exports.responseStatus, 'ERROR_IN_EXECUTION',                    404);
define(exports.responseStatus, 'INVALID_ACCESS_TOKEN',                  204);
define(exports.responseStatus, 'PARAMETER_MISSING',                     100);
define(exports.responseStatus, 'ACTION_COMPLETE',                       200);
define(exports.responseStatus, 'REGISTER_SUCCESSFULLY',                 200);
define(exports.responseStatus, 'FINAL_RESULT_ERROR',                    400);
define(exports.responseStatus, 'ACTION_COMPLETE',                       200);
define(exports.responseStatus, 'LOGIN_SUCCESSFULLY',                    200);
define(exports.responseStatus, 'LOGIN_FAILED',                          400);
define(exports.responseStatus, 'ALL_READY_AN_USER_EXITS_WITH_SAME_NAME', 400);
define(exports.responseStatus, 'PROFILE_GET_SUCCESSFULLY',              200);
define(exports.responseStatus, 'PROFILE_EDIT_SUCCESSFULLY',             200);
define(exports.responseStatus, 'LOGOUT_SUCCESSFULLY',                   200);
define(exports.responseStatus, 'GET_ACCESS_TOKEN_SUCCESSFULLY',         200);
define(exports.responseStatus, 'ACCESS_TOKEN_NOT_EXISTS',               400);
define(exports.responseStatus, 'DATA_NOT_EXISTS',                       400);
define(exports.responseStatus, 'ACTION_FAILED',                         400);






exports.user = {};
define(exports.user, "USER_COMPLETION_STATUS", 1);
define(exports.user, "USER_ACTIVE_STATUS", 0);
define(exports.user, "USER_APPROVAL_STATUS", 1);
define(exports.user, "USER_DELETE_STATUS", 1);





