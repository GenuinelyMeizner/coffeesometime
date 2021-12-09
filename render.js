import fs from "fs";

const unauthenticatedNav = fs.readFileSync("./public/components/unauthenticated-nav.html", "utf-8");
const footer = fs.readFileSync("./public/components/footer.html", "utf-8");

function createUnauthenticatedPage(path, options) {
    return (unauthenticatedNav + fs.readFileSync(`./public/${path}`) + footer);
}

export { createUnauthenticatedPage };