import express from "express";
import cookieParser from "cookie-parser";
import path from "path";
import { urlencoded } from "express";
import { createUnauthenticatedPage } from "./render.js";
import { createAuthenticatedPage } from "./render.js";
import { signUpRoute } from "./routers/sign-up-route.js";
import { loginRoute } from "./routers/login-route.js";

const app = express();

const __dirname = path.resolve();

app.use(express.static("public"));
app.use("/js", express.static(__dirname + '/node_modules/jquery/dist'));
app.use("/js", express.static(__dirname + '/node_modules/bootstrap/dist/js'));
app.use("/build", express.static(__dirname + '/node_modules/toastr/build/'));
app.use("/css", express.static(__dirname + '/node_modules/bootstrap/dist/css'));
app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/users", signUpRoute);
app.use("/auth", loginRoute);

const frontpage = createUnauthenticatedPage("/pages/unauthenticated/frontpage.html");
const about = createUnauthenticatedPage("/pages/unauthenticated/about.html");
const termsOfService = createUnauthenticatedPage("/pages/unauthenticated/terms-of-service.html");

const dashboard = createAuthenticatedPage("/pages/authenticated/dashboard.html");

app.get("/", (req, res) => {
    res.send(frontpage);
});

app.get("/about", (req, res) => {
    res.send(about);
});

app.get("/terms-of-service", (req, res) => {
    res.send(termsOfService);
});

app.get("/dashboard", (req, res) => {
    res.send(dashboard);
});

const PORT = process.env.PORT || 8080;

const server = app.listen(PORT, (error) => {
    if (error) {
        console.log(error);
    }
    console.log(`Server is running on port ${PORT}`);
});