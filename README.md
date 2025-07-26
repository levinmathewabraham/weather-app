# weather-app ⛅
A weather application where users can input coordinates and retrieve real-time weather information like temperature, humidity, wind conditions, pressure, and cloudiness that are all dynamically rendered using EJS

## 🛠 Tech Stack

- **Frontend:** HTML5, CSS3 (Bootstrap 5)
- **Backend:** Node.js, Express.js
- **Templating Engine:** EJS
- **API:** OpenWeatherMap API

## 📂 Project Structure
```bash
weather-app/
├── node_modules/
├── public/
│ ├── images/
|     ├── open-weather.png
│ ├── styles/
|     ├── index.css
├── views/
│ ├── partials/
|      ├── footer.ejs
|      ├── header.ejs
│ ├── index.ejs
├── .env
├── .gitignore
├── index.js
├── package-lock.json
├── package.json
└── README.md
```

---

## 💻 Installation

1. **Clone the repository**

    ```bash
    git clone https://github.com/levinmathewabraham/weather-app.git
    cd weather-app
    ```

2. **Create .env file**

   ```bash
   API_KEY="your_openWeatherMap_apiKey"
   ```
   
3. **Install dependencies**

    ```bash
    npm install
    ```
    
4. Run the server
 
    ```bash
    node index.js
    ```
    
5. Visit in browser
    ```bash
    http://localhost:3000
    ```
---

## 📌 Notes
- This project was created as a learning exercise to explore how public APIs work.
- Weather data is fetched using the OpenWeatherMap API based on user-provided coordinates.
