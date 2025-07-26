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

function getWindType(speed) {
    if (speed < 0.5)
        return "Calm";
    else if (speed < 1.5)
        return "Light air";
    else if (speed < 3.3)
        return "Light breeze";
    else if (speed < 5.5)
        return "Gentle breeze";
    else if (speed < 7.9)
        return "Moderate breeze";
    else if (speed < 10.7)
        return "Fresh breeze";
    else if (speed < 13.8)
        return "Strong breeze";
    else if (speed < 17.1)
        return "Near gale";
    else if (speed < 20.7)
        return "Gale";
    else if (speed < 24.4)
        return "Severe gale";
    else if (speed < 28.4)
        return "Storm";
    else if (speed < 32.6)
        return "Violent storm";
    else
        return "Hurricane force";
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
            windDirection: getWindDirection,
            windType: getWindType,
            currentTime: response.data.dt * 1000,
            sunrise: response.data.sys.sunrise * 1000,
            sunset: response.data.sys.sunset * 1000,
        });
    } catch(error) {
        console.log("Failed to make request.", error.response);
        res.status(500).send("Failed to fetch weather data");
    }
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
