var async           = require('async'),
    common_function = require('../resources/common-function'),
    constant        = require('../resources/constant'),
    auth_layer      = require('../resources/auth-layer'),
    db_layer        = require('../resources/db-layer'),
    responses       = require('../resources/responses'),
    logging         = require('../resources/logging'),
    md5             = require('MD5');
var _ = require('underscore');







exports.signup         = function (req, res) {
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
                auth_layer.checkPassword(res, password, cb);
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

                var signUpData = [{
                    access_token: user.access_token
                }];

                cb(null, signUpData);
            }
        ],
        function (error, result) {
            if (error) {
                responses.finalResultError(res, []);
            } else {
                responses.successRegister(res, result);
            }
        });
};

exports.getUserName    = function (req, res) {
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

exports.login          = function (req, res) {
    logging.startSection("login");
    logging.logRequest(req);

    var user_name    = req.query.user_name,
        password     = req.query.password,
        access_token = md5(user_name + new Date()),
        all_value    = [user_name, password, access_token];

    var userLogin           = {};
    userLogin.access_token  = access_token;
    userLogin.user_name     = user_name;
    userLogin.password      = (md5(password));

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
            },
            function(loginData, cb) {
                db_layer.updateAccessToken(res, userLogin, cb);
            },
            function(updateUser, cb) {
                console.log("Access token successfully updated", updateUser);

                var user = [{
                    access_token : access_token
                }];
                cb(null, user);
            }

        ],
        function (error, result) {
            if (error) {
                responses.finalResultError(res, []);
            } else {
                responses.successLogin(res, result);
            }
        });
};

exports.profile        = function (req, res) {
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

exports.edit_profile   = function (req, res) {

    logging.startSection("edit profile");
    logging.logRequest(req);

    var access_token = req.body.access_token,
        name         = req.body.name;

    var all_value = [access_token, name];

    var editUser          = {};
    editUser.access_token = access_token;
    editUser.name         = name;

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
            function (updateData, cb) {
                console.log("Profile data successfully updated", updateData);
                cb(null, 100);
            }
        ],
        function (error, result) {
            if (error) {
                responses.finalResultError(res, []);
            } else {
                responses.successUserEditProfile(res, []);
            }
        });
};

exports.LogOut         =  function (req, res) {

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

exports.dashboardInfo  = function (req, res) {

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
        totalTie,
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

                db_layer.getTieCount(res, id, cb);
            },
            function (userTie, cb) {

                totalTie = userTie[0].user_tie;
                //db_layer.getDashboardUsers(res, cb);
                db_layer.getTotalUsers(res, cb);

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
                    (function (i) {
                        var id = user_id[i];
                        common_function.calculateUserWinPercentage(res, id, function (error, result) {
                            userWinResult.push({
                                id: id,
                                winPercentageAll: result
                            });

                            if (++conuter === user_id.length) {

                                cb(null, userWinResult);
                            }
                        });
                    }(i));
                }
            },
            function (winPercentage, cb) {
                var sortedWinPercentage = (_.sortBy(winPercentage, 'winPercentageAll')).reverse();
                console.log("winPercentage", sortedWinPercentage);

                cb(null, sortedWinPercentage);
            },
            function (sortedWinPercentage, cb) {

                var index      = _.findIndex(sortedWinPercentage, {id: id});
                var finalIndex = 0;
                var counter    = 0;
                for (var i = 0; i < index; i++) {
                    if (sortedWinPercentage[i].winPercentageAll === sortedWinPercentage[i + 1].winPercentageAll) {
                        return cb(null, i);
                    }
                }
                return cb(null, index);
            },
            function(FinalIndex, cb) {
                rank = FinalIndex + 1;
                cb(null, 100);
            }
        ],
        function (error, result) {
            var dashboard = [{
                id: id,
                totalUser: totalUser,
                win: win,
                loss: loss,
                totalTie: totalTie,
                score: win * 10,
                completedAttempt: completedAttempt,
                rank: rank
            }];

            if (error) {
                responses.finalResultError(res, []);
            } else {
                responses.actionComplete(res, dashboard);
            }
        });
};


exports.initializeGame = function (req, res) {

    console.log("Comes from initialize game ===");


    logging.startSection("initializeGame");
    logging.logRequest(req);

    var access_token = req.body.access_token,
        all_value    = [access_token];

    async.waterfall([
            function (cb) {
                auth_layer.checkBlank(res, all_value, cb);
            },
            function (arg1, cb) {
                auth_layer.checkAccessToken(res, access_token, cb);
            },
            function (userData, cb) {
                var player = require('../player');
                var player = new player();
                var a= userData[0].id;
                module.exports.userid = a;
                cb(null, 100);
            }
        ],
        function (error, result) {
            if (error) {
                responses.finalResultError(res, []);
            } else {
                responses.actionComplete(res, []);
            }
        });
};