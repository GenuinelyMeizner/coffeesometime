import express from "express";
import connectionPool from "../database/db-connection.js";
import bcrypt from "bcrypt";

const signUpRoute = express.Router();

signUpRoute.post("/", async (req, res) => {

    try {
        const connect = await connectionPool.getConnection();

        const { email, password, firstName, birthdate, gender, sexuality, subscribed, tosAgreement } = req.body;

        console.log(req.body);

        const [rows] = await connect.execute(`SELECT * FROM users WHERE email = ?`, [req.body.email]);

        const salt = await bcrypt.genSalt();

        if (Object.entries(rows).length === 0) {
            await connect.execute(        
                `
                INSERT INTO users (email, password, first_name, birthdate, gender, sexuality, subscribed, tos_agreement)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?)
                `,
                [
                    email,
                    await bcrypt.hash(password, salt),
                    firstName,
                    birthdate,
                    gender,
                    sexuality,
                    subscribed,
                    tosAgreement
                ]);
            connect.release();
            return res.status(201).send();
        } else {
            return res.status(400).send();
        }
        
    } catch (error) {
        console.log(error)
        return res.status(500).send();
    }

});

export default signUpRoute;