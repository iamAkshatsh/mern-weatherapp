🌦️ Weather App (MERN Stack)
Ek simple Weather App jisme user koi bhi city/location search kar ke uska weather dekh sakta hai aur save kar sakta hai.

Saved cities ka list ban jata hai jisme CRUD operations ka support hai (city save, delete kar sakte ho).

🔥 Features
📍 City/location search karne par weather details milti hai.

🗺️ Agar same naam ka location hai (jaise DumDum), to location ke saath country/state ka suggestion dropdown aata hai.

📋 City save kar sakte ho.

❌ Saved cities ko delete kar sakte ho.

🌗 Light/Dark mode ka support hai.

⚙️ Technologies Used
Frontend: React.js + Material UI

Backend: Node.js + Express.js

Database: MongoDB (cities save karne ke liye)

API: OpenWeatherMap API (weather data fetch karne ke liye)

📦 Setup Karne Ka Tarika
1️⃣ Project Clone Karo

bash
Copy
Edit
git clone https://github.com/your-username/mern-weather-app.git
cd mern-weather-app
2️⃣ Backend Setup

bash
Copy
Edit
cd server
npm install
3️⃣ Frontend Setup

bash
Copy
Edit
cd ../client
npm install
4️⃣ .env File Banao (Backend me)

plaintext
Copy
Edit
PORT=5000
MONGO_URI=your_mongo_db_connection_string
WEATHER_API_KEY=your_openweathermap_api_key
5️⃣ Server & Client Start Karo

Backend:

bash
Copy
Edit
cd server
npm start
Frontend:

bash
Copy
Edit
cd client
npm start
🚀 Deployment
link - https://mern-weatherapp-frontend.onrender.com/

