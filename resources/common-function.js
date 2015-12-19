var constants = require('./constant'),
    responses = require('./responses');
    db_layer  = require('./db-layer'),
    async     = require('async');

exports.calculateUserWinPercentage = function(res, id, callback){


    var winPercentage,
        win,
        completedAttempt;

     async.waterfall([
         function(cb) {
             db_layer.getWinCount(res, id,cb);
         },
         function(winResult, cb) {

             win = winResult[0].user_win ? winResult[0].user_win : 0;
             db_layer.getTotalCompletedAttempt(res, id, cb);
         },
         function(completedAttemptResult, cb){
              completedAttempt = completedAttemptResult[0].total_attempt ? completedAttemptResult[0].total_attempt : 0;

               if(completedAttempt === 0) {
                   winPercentage = 0;
               } else {
                   winPercentage = Math.floor((win*100)/completedAttempt);
               }

             cb(null,winPercentage);

         }
     ],
     function(error, result) {
         if(error) {
            callback(error);
         } else {
             callback(null, result);
         }
     });
};
