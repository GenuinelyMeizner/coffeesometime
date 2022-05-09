import connectionPool from "./db-connection.js";

(async () => {
    const connect = await connectionPool.getConnection();
    await connect.execute("DROP TABLE IF EXISTS users");

    const userTable = `CREATE TABLE IF NOT EXISTS users (
        user_id INT AUTO_INCREMENT PRIMARY KEY,
        email VARCHAR(50) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        first_name VARCHAR(50) NOT NULL,
        birthdate DATE NOT NULL,
        gender VARCHAR(50) NOT NULL,
        sexuality VARCHAR(50) NOT NULL,
        subscribed BOOLEAN NOT NULL,
        tos_agreement BOOLEAN NOT NULL
    );`

    await connect.execute(userTable);
    connect.destroy();
})()