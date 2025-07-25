import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = 3000;
const apiKey = process.env.API_KEY;
const API_URL = "https://api.openweathermap.org/data/2.5/weather/";

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

function getWindDirection(degree) {
    const directions = ['N', 'E', 'W', 'S', 'NE', 'NW', 'SE', 'SW'];
    return directions[Math.round(degree / 45) % 8];
}

app.get("/", (req, res) => {
    res.render("index.ejs", {
        content: null,
    });
});

app.post("/submit", async(req, res) => {
    const latitude = req.body.latitude;
    const longitude = req.body.longitude;
    try {
        const response = await axios.get(API_URL, {
            params: {
                lat: latitude,
                lon: longitude,
                appid: apiKey,
                units: "metric",
            },
        });
        // const result = JSON.stringify(response.data);
        res.render("index.ejs", {
            content: response.data,
            wind: getWindDirection,
        });
    } catch(error) {
        console.log("Failed to make request.", error.response);
        res.status(500).send("Failed to fetch weather data");
    }
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
