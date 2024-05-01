import mysql from "mysql"

const connectionConfig = {
    host: "localhost",
    user: process.env.MYSQLUSER,
    password: process.env.MYSQLPASSWORD,
    database: process.env.MYSQLDBNAME
};

async function executeQuery(query, params) {
    const connection = mysql.createConnection(connectionConfig);
    const [results] = await connection.execute(query, params);
    connection.end();
    return results;
}

export default executeQuery;
