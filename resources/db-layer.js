var responses = require('./responses');

exports.registerUser = function (res, user, cb) {
    var sqlInsertUser = "INSERT INTO `user`(`access_token`,`full_name`, `user_name`, `password`, `gender`) VALUES (?,?,?,?,?)";
    var bindParameter = [user.access_token, user.name, user.user_name, user.password, user.gender];
    connection.query(sqlInsertUser, bindParameter, function (error, result) {
        if (error) {
            responses.executionError(res, []);
        } else {
            cb(null, result);
        }
    });
};

exports.getUserName = function (res, user_name, cb) {
    var sqlSelectUserName = "SELECT `user_name` From `user` where `user_name` = ? LIMIT 1";

    var bindParameter = [user_name];

    connection.query(sqlSelectUserName, bindParameter, function (error, result) {
        if (error) {
            responses.executionError(res, []);
        } else {
            cb(null, result);
        }
    });
};

exports.getAccessToken = function (res, access_token, cb) {
    var sqlSelectAccessToken = "SELECT `access_token`, `full_name`, `user_name`, `gender`, `id` From `user` where `access_token` = ? LIMIT 1";

    var bindParameter = [access_token];

    connection.query(sqlSelectAccessToken, bindParameter, function (error, result) {
        if (error) {
            responses.executionError(res, []);
        } else {
            cb(null, result);

        }
    });
};

exports.loginUser = function (res, userLogin, cb) {

    var sqlSelectUser = "SELECT `user_name`, `password` FROM `user` where `user_name` = ? AND `password` = ?";
    var loginParameter = [userLogin.user_name, userLogin.password];
    connection.query(sqlSelectUser, loginParameter, function (error, result) {

        if (error) {
            responses.executionError(res, []);
        } else {
            cb(null, result);
        }
    });
};

//exports.getProfileInfo = function(res,access_token, cb){
//
//    console.log("userppppLogin +++++++++", access_token);
//
//
//    var sqlEditUserProfile = "SELECT `full_name`, `user_name`, `gender` FROM `user` where `access_token` = ?";
//    var profileParameter = [access_token];
//    connection.query(sqlEditUserProfile, profileParameter, function(error, result){
//
//        console.log("profile", result);
//
//        if (error) {
//            responses.executionError(res, []);
//        } else {
//            cb(null, result);
//        }
//    });
//};

exports.profileEdit = function (res, editUser, cb) {

    var sqlEditUserProfile = "UPDATE user SET `full_name`=? where `access_token` = ? LIMIT 1";

    var profileParameter = [editUser.name, editUser.access_token];

    connection.query(sqlEditUserProfile, profileParameter, function (error, result) {

        if (error) {
            responses.executionError(res, []);
        } else {
            cb(null, []);
        }
    });
};

exports.logOut = function (res, User, cb) {

    var sqlLogOutUser = "UPDATE user SET `isOnline`=? where `access_token` = ? LIMIT 1";

    var profileParameter = [0, User.access_token];

    connection.query(sqlLogOutUser, profileParameter, function (error, result) {

        if (error) {
            responses.executionError(res, []);
        } else {
            cb(null, []);
        }
    });
};

exports.getDashboardUsers = function (res, cb) {

    var sqlSelectDashboardUsers = "SELECT COUNT(*) as `total_user` FROM `game_assignment`";
    var profileParameter = [];
    connection.query(sqlSelectDashboardUsers, profileParameter, function (error, result) {

        if (error) {
            responses.executionError(res, []);
        } else {
            cb(null, result);
        }
    });
};

exports.getWinCount = function (res, id, cb) {

    var sqlSelectUserWins = "SELECT COUNT(*) as `user_win` FROM `game_assignment` where (`first_user_id` = ? OR `second_user_id` =?) AND `result` =? AND `status` = ?";
    var winParameter = [id, id, 1, 1];
    connection.query(sqlSelectUserWins, winParameter, function (error, result) {

        if (error) {
            responses.executionError(res, []);
        } else {
            cb(null, result);
        }
    });
};

exports.getLossCount = function (res, id, cb) {


    var sqlSelectUserWins = "SELECT COUNT(*) as `user_loss` FROM `game_assignment` where (`first_user_id` = ? OR `second_user_id` =?) AND `result` =? AND `status` = ?";
    var winParameter = [id, id, 0, 1];
    connection.query(sqlSelectUserWins, winParameter, function (error, result) {

        if (error) {
            responses.executionError(res, []);
        } else {
            cb(null, result);
        }
    });
};
exports.getTotalCompletedAttempt = function (res, id, cb) {

    var sqlSelectUserWins = "SELECT COUNT(*) as `total_attempt` FROM `game_assignment` where (`first_user_id` = ? OR `second_user_id` =?) AND `status` = ?";
    var winParameter = [id, id, 1];
    connection.query(sqlSelectUserWins, winParameter, function (error, result) {

        if (error) {
            responses.executionError(res, []);
        } else {
            cb(null, result);
        }
    });
};

exports.getAllUserId = function (res, cb) {

    var sqlSelectAllUserId = "SELECT `id` as `user_id` FROM `user`";
    var blindParameter = [];
    connection.query(sqlSelectAllUserId, blindParameter, function (error, result) {

        if (error) {
            responses.executionError(res, []);
        } else {
            cb(null, result);
        }
    });
};