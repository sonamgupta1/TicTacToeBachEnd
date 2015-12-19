var x  = {};
x.host = "localhost";
x.user = "root";
x.password = "root";
x.database = "abc";
x.port = 3306;
x.multipleStatements = true;

function handleDisconnect() {
    connection = mysql.createConnection(x); // Recreate the connection, since
    // the old one cannot be reused.

    connection.connect(function(err) {
        if(err) {
            console.log('error when connecting to db:', err);
            setTimeout(handleDisconnect, 2000);
        }
    });

    connection.on('error', function(err) {
        console.log('db error', err);
        if(err.code === 'PROTOCOL_CONNECTION_LOST') {
            handleDisconnect();
        } else {
            throw err;
        }
    });
}

handleDisconnect();