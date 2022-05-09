import dotenv from "dotenv";
dotenv.config();
import express from "express";
import connectionPool from "../database/db-connection.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const loginRoute = express.Router();

loginRoute.post("/", async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    try {
        const connect = await connectionPool.getConnection();

        const [rows] = await connect.execute(`SELECT * FROM users WHERE email = ?`, [email]);

        if (!Array.isArray(rows) || !rows.length) {
            connect.release();
            return res.status(400).send();
        }

        console.log(rows)
    
        const authenticate = await bcrypt.compare(password, rows[0]["password"]);

        if (authenticate) {
            const user = {
                id: rows[0]["user_id"],
                email: rows[0]["email"]
            }

            const token = jwt.sign(user, process.env.ACCESS_JWT);

            connect.release();
            return res.cookie('jwt', token).status(200).send({ user: user });
        } else {
            connect.release();
            return res.status(400).send();
        }
    } catch (error) {
        console.log(error)
        return res.status(500).send();
    }
});

export { loginRoute };