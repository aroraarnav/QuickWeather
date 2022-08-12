searchWeather()

function capitalize(inputString) {  
  var words = inputString.split(' ');  
  var CapitalizedWords = [];  
  words.forEach(element => {  
      CapitalizedWords.push(element[0].toUpperCase() + element.slice(1, element.length));  
  });  
  return CapitalizedWords.join(' ');  
}  

function handleImage (main) {
  document.getElementById('imgbg').style.backgroundImage="url(assets/" + main + ".png)";
}
function handleUi (temp, humidity, description, main, pressure, wind, cityName) {

    main = String (main).toLowerCase();
    description = capitalize (description);

    document.getElementById("weather.description").innerHTML = description;
    document.getElementById("name").innerHTML = cityName;
    document.getElementById("temperature.value").innerHTML = Math.trunc(temp);
    document.getElementById("humidity.value").innerHTML = Math.trunc(humidity) + " %";
    document.getElementById("pressure.value").innerHTML = Math.trunc(pressure) + " hPa";
    document.getElementById("wind.speed.value").innerHTML = Math.trunc(wind) + "  m/s";

    handleImage (main)

    switch (main) {
      case "thunderstorm":
        handleImage ("thunderstorm");
        break;
      case "drizzle":
        handleImage ("drizzle");
        break;
      case "rain":
        handleImage ("rain");
        break;
      case "snow":
        handleImage ("snow");
        break;
      case "clear":
        handleImage ("clear");
        break;
      case "clouds":
        handleImage ("clouds");
        break;
      case "mist":
      case "smoke":
      case "haze":
      case "fog":
        handleImage ("mist");
        break;
      case "dust":
      case "sand":
      case "ash":
        handleImage ("dust");
        break;
      case "squall":
      case "tornado":
        handleImage ("tornado");
        break;
    }

  }
  
  function handleJson (data) {
      try {
          temp = parseInt(data['list'][0]['main']['temp']) - 273.15
          humidity = parseInt (data['list'][0]['main']['humidity']);
          description = data['list'][0]['weather'][0]['description'];
          main = data['list'][0]['weather'][0]['main'];
          pressure = parseInt (data['list'][0]['main']['pressure']);
          wind = data['list'][0]['wind']['speed'];
          cityName = data ['city']['name'];
  
          final_str = "Temperature (°C): " + String(temp) + '\nConditions: ' + description + '\nHumidity: ' + String (humidity) + "%" + "\nPressure: " + pressure + " hPA" + "\nWind Speed: " + wind + "m/s";
        //   alert (final_str);
  
          handleUi (temp, humidity, description, main, pressure, wind, cityName);
  
        } catch (error) {
          console.log (error);
        }
        
  }
  
  function getJSON (url, callback) {
      var xhr = new XMLHttpRequest();
      xhr.open('GET', url, true);
      xhr.responseType = 'json';
      xhr.onload = function() {
        var status = xhr.status;
        if (status === 200) {
          callback(null, xhr.response);
        } else {
          callback(status, xhr.response);
        }
      };
      xhr.send();
  };

  function searchWeather() {
    city = window.location.href;
    city = city.split ("?").pop ();

    console.log (city)
  
      getJSON("http://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=f467ef60b93f01d3b1065b9105b9903e",
      function(err, data) {
          if (err !== null) {
            console.log (err)
          } else {
              console.log (data);
              handleJson (data);
            }
      });
  
  }
  
