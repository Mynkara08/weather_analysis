const { saveOrUpdate } = require("../db/queries");

const axios = require("axios");
require("dotenv").config();

const apiCallWeatherDetails = async (city) => {
    
  try{const apiKey = process.env.API_KEY;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  const { data } = await axios.get(url);
  return data;}
  catch(err){
    console.log(err.message);
    return null;
    
  }
};

const weatherScheduler = async () => {
  try {
    const cities = [
      "Kolkata",
      "Delhi",
      "Mumbai",
      "Chennai",
      "Bangalore",
      "Hyderabad",
    ];

    for (let i=0;i<6;i++) {
      const city=cities[i];
      const data = await apiCallWeatherDetails(city);
      
      const value = await saveOrUpdate({
        description: data.weather[0].description,
        temp: data.main.temp,
        timestamp: data.dt,
        type: data.weather[0].main,
        name: data.name,
      });
    }
  } catch (err) {
    console.log(err.message);
  }
};
module.exports = weatherScheduler;
