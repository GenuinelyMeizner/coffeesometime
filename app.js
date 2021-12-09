import express from "express";
import path from "path";
import { urlencoded } from "express";
import { createUnauthenticatedPage } from "./render.js";

const app = express();

const __dirname = path.resolve();

app.use(express.static("public"));
app.use("/js", express.static(__dirname + '/node_modules/jquery/dist'));
app.use("/js", express.static(__dirname + '/node_modules/bootstrap/dist/js'));
app.use("/build", express.static(__dirname + '/node_modules/toastr/build/'));
app.use("/css", express.static(__dirname + '/node_modules/bootstrap/dist/css'));
app.use(express.json());
app.use(urlencoded({extended : true}));

const frontpage = createUnauthenticatedPage("/pages/unauthenticated/frontpage.html");
const about = createUnauthenticatedPage("/pages/unauthenticated/about.html");
const termsOfService = createUnauthenticatedPage("/pages/unauthenticated/terms-of-service.html");

app.get("/", (req, res) => {
    res.send(frontpage);
});

app.get("/about", (req, res) => {
    res.send(about);
});

app.get("/terms-of-service", (req, res) => {
    res.send(termsOfService);
});

const PORT = process.env.PORT || 8080;

const server = app.listen(PORT, (error) => {
    if (error) {
        console.log(error);
    }
    console.log(`Server is running on port ${PORT}`);
});