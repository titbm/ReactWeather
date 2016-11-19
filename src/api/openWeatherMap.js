var axios = require('axios');

const OPEN_WEATHER_MAP_API_KEY = '4643fc07f0f785304ec4506956588f9e';
const OPEN_WEATHER_MAP_URL = `http://api.openweathermap.org/data/2.5/weather?q=London,uk&appid=${OPEN_WEATHER_MAP_API_KEY}`;

module.exports = {
  getTemp: function(location) {
    var encodedLocation=encodeURIComponent(location);
    var requestUrl = `${OPEN_WEATHER_MAP_URL}&q=${encodedLocation}`;

    return axios.get(requestUrl)
      .then(function(response) {
        if(response.data.cod && response.data.message) {
          throw new Error(response.data.message);
        } else {
          return response.data.main.temp;
        }
      })
      .catch(function(error) {
        throw new Error(response.data.message);
      });
  }
};
