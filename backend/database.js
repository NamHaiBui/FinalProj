import mysql from "mysql"

const connectionConfig = {
    host: "localhost",
    user: "root",
    password: "MeapBoi3!",
    database: "library"
};

async function executeQuery(query, params) {
    const connection = mysql.createConnection(connectionConfig);
    const [results] = await connection.execute(query, params);
    connection.end();
    return results;
}

export default executeQuery;
