import express from "express";
import ciudadesRoutes from "./routes/ciudad.routes.js";
import os from "os";
import chalk from "chalk";

const port = 4000;
const appUrl = `/api`;
const ipAddress = getIpAddress();
const appUrlIP = `http://${ipAddress}:${port}`;
const appUrllocalhost = `http://localhost:${port}`;
const app = express();

app.use(express.json());

app.use(`${appUrl}/ciudades`, ciudadesRoutes);

app.listen(port);
console.log(`Server running at ${chalk.magenta(appUrllocalhost)} and ${chalk.magenta(appUrlIP)}`);

function getIpAddress() {
    const ifaces = os.networkInterfaces();
    let ipAddress = "localhost";

    Object.keys(ifaces).forEach((ifname) => {
        ifaces[ifname].forEach((iface) => {
            if (iface.family === "IPv4" && !iface.internal) {
                ipAddress = iface.address;
            }
        });
    });

    return ipAddress;
}