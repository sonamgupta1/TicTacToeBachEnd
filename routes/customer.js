var async = require('async'),
    common_function = require('../resources/common-function'),
    constant = require('../resources/constant'),
    auth_layer = require('../resources/auth-layer'),
    db_layer = require('../resources/db-layer'),
    responses = require('../resources/responses'),
    logging = require('../resources/logging'),
    md5 = require('MD5'),
    _ = require('underscore');


exports.signup = function (req, res) {
    logging.startSection("signup");
    logging.logRequest(req);

    var name = req.body.name,
        user_name = req.body.user_name,
        password = req.body.password,
        gender = req.body.gender,
        all_value = [name, user_name, password, gender];

    var user = {};
    user.access_token = md5(name + new Date());
    user.name = name;
    user.user_name = user_name;
    user.password = md5(password);
    user.gender = gender;

    async.waterfall([
            function (cb) {
                auth_layer.checkBlank(res, all_value, cb);
            },
            function (data, cb) {
                db_layer.getUserName(res, user_name, cb);

            },
            function (data, cb) {
                if (data.length === 0) {
                    db_layer.registerUser(res, user, cb);
                } else {
                    responses.allReadyExist(res, []);
                }

            },
            function (registerData, cb) {
                cb(null, registerData);
            }
        ],
        function (error, result) {
            if (error) {
                responses.finalResultError(res, []);
            } else {
                responses.successRegister(res, []);
            }
        });
};


//
//exports.demoPut = function(req, res) {
//
//    console.log("Hi---")
//    logging.startSection("signup");
//    logging.logRequest(req.param);
//    res.send(JSON.stringify("just demo"));
//
//};


exports.getUserName = function (req, res) {
    logging.startSection("getUserName");
    logging.logRequest(req);

    var user_name = req.query.user_name;

    var allValues = [user_name];

    async.waterfall([
            function (cb) {
                auth_layer.checkBlank(res, allValues, cb);
            },
            function (data, cb) {
                db_layer.getUserName(res, user_name, cb);
            },
            function (registerData, cb) {
                if (registerData.length === 0) {
                    cb(null, 0);
                } else {
                    cb(null, 1);
                }
            }
        ],
        function (error, result) {
            console.log("result", result);
            if (error) {
                responses.finalResultError(res, []);
            } else {
                responses.userNameInfo(res, result);
            }
        });
};


exports.getAccessToken = function (req, res) {
    logging.startSection("getAccessToken");
    logging.logRequest(req);

    var access_token = req.query.access_token;

    var allValues = [access_token];

    async.waterfall([
            function (cb) {
                auth_layer.checkBlank(res, allValues, cb);
            },
            function (data, cb) {
                db_layer.getAccessToken(res, access_token, cb);
            },
            function (registerData, cb) {
                if (registerData.length === 0) {
                    responses.accessTokenInfoFailed(res, []);
                } else {
                    cb(null, access_token);
                }
            }
        ],
        function (error, result) {
            console.log("result", result);
            if (error) {
                responses.finalResultError(res, []);
            } else {
                responses.accessTokenInfo(res, []);
            }
        });
};


exports.login = function (req, res) {
    logging.startSection("login");
    logging.logRequest(req);

    var user_name = req.query.user_name,
        password = req.query.password,
        all_value = [user_name, password];

    var userLogin = {};
    userLogin.user_name = user_name;
    userLogin.password = (md5(password));


    async.waterfall([
            function (cb) {
                auth_layer.checkBlank(res, all_value, cb);
            },
            function (data, cb) {
                db_layer.loginUser(res, userLogin, cb);
            },
            function (loginData, cb) {
                var countLoginData = loginData.length;


                if (countLoginData === 0) {
                    responses.failedLogin(res, []);
                }
                else {
                    cb(null, loginData);
                }
            }
        ],
        function (error, result) {
            if (error) {
                responses.finalResultError(res, []);
            } else {
                responses.successLogin(res, []);
            }
        });
};

exports.profile = function (req, res) {
    logging.startSection("profile");
    logging.logRequest(req);

    var access_token = req.query.access_token;
    all_value = [access_token];

    async.waterfall([
            function (cb) {
                auth_layer.checkBlank(res, all_value, cb);
            },
            function (arg1, cb) {
                auth_layer.checkAccessToken(res, access_token, cb);
            },
            function (profileData, cb) {

                cb(null, profileData);
            }
        ],
        function (error, result) {
            if (error) {
                responses.finalResultError(res, []);
            } else {
                responses.successUserProfile(res, result);
            }
        });
};

exports.edit_profile = function (req, res) {

    logging.startSection("edit profile");
    logging.logRequest(req);


    var access_token = req.body.access_token,
        name = req.body.name;

    all_value = [access_token, name];

    var editUser = {};
    editUser.access_token = access_token;
    editUser.name = name;

    async.waterfall([
            function (cb) {
                auth_layer.checkBlank(res, all_value, cb);
            },
            function (arg1, cb) {
                auth_layer.checkAccessToken(res, editUser.access_token, cb);
            },
            function (data, cb) {
                db_layer.profileEdit(res, editUser, cb);
            },
            function (profileData, cb) {
                cb(null, profileData);
            }
        ],
        function (error, result) {
            if (error) {
                responses.finalResultError(res, []);
            } else {
                responses.successUserEditProfile(res, result);
            }
        });
};

exports.LogOut = function (req, res) {

    logging.startSection("Logout");
    logging.logRequest(req);


    var access_token = req.body.access_token,


        all_value = [access_token];

    var User = {};
    User.access_token = access_token;

    async.waterfall([
            function (cb) {
                auth_layer.checkBlank(res, all_value, cb);
            },
            function (arg1, cb) {
                auth_layer.checkAccessToken(res, User.access_token, cb);
            },
            function (data, cb) {
                db_layer.logOut(res, User, cb);
            },
            function (profileData, cb) {
                cb(null, profileData);
            }
        ],
        function (error, result) {
            if (error) {
                responses.finalResultError(res, []);
            } else {
                responses.LogOut(res, result);
            }
        });
};


exports.dashboardInfo = function (req, res) {

    logging.startSection("dashboard Info ");
    logging.logRequest(req);

    var access_token = req.query.access_token;
    all_value = [access_token];

    var id,
        loss,
        win,
        score,
        rank,
        completedAttempt,
        winPercentageAll,
        totalUser;


    async.waterfall([
            function (cb) {
                auth_layer.checkBlank(res, all_value, cb);
            },
            function (arg1, cb) {
                auth_layer.checkAccessToken(res, access_token, cb);

            },
            function (profileData, cb) {
                id = profileData[0].id;
                db_layer.getDashboardUsers(res, cb);

            },
            function (dashboardUser, cb) {

                totalUser = dashboardUser[0].total_user;

                db_layer.getWinCount(res, id, cb);
            },
            function (userWin, cb) {

                win = userWin[0].user_win;

                db_layer.getLossCount(res, id, cb);
            },
            function (userLoss, cb) {

                loss = userLoss[0].user_loss;

                db_layer.getTotalCompletedAttempt(res, id, cb)

            },
            function (userCompletedAttempt, cb) {

                completedAttempt = userCompletedAttempt[0].total_attempt;

                db_layer.getAllUserId(res, cb);

            },
            function (userId, cb) {

                var user_id = _.uniq(_.pluck(userId, 'user_id'));

                var userWinResult = [];
                var conuter = 0;
                var j = 0;
                for (var i = 0; i < user_id.length; i++) {

                    (function(i) {
                        var id = user_id[i];
                        common_function.calculateUserWinPercentage(res, id, function (error, result) {

                            userWinResult.push({
                                id: id,
                                winPercentageAll: result
                            });

                            if(++conuter === user_id.length) {

                                cb(null, userWinResult);
                            }
                        });
                    }(i));
                }

            },
          function (winPercentage, cb) {

                var sortedWinPercentage =  (_.sortBy(winPercentage, 'winPercentageAll')).reverse();

                console.log("winPercentage", sortedWinPercentage);

                var index = _.findIndex(sortedWinPercentage, { id: 19 });

                console.log("rank",index+1);

                cb(null, sortedWinPercentage);
            }

        ],
        function (error, result) {

            var index = _.findIndex(result, { id: id });

            var dashboard = [{
                id: id,
                totalUser: totalUser,
                win: win,
                loss: loss,
                score: win * 10,
                completedAttempt: completedAttempt,
                rank: index+1

            }];

            if (error) {
                responses.finalResultError(res, []);
            } else {
                responses.actionComplete(res, dashboard);
            }
        });
};
