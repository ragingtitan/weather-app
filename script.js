    async function fetchData() {
        try {
            const apikey = "70d488f89b0b769fb167817378a074bc";
            let city = document.getElementById("submit-city");
            let inputCity = city.value;
            console.log(inputCity);
            let apiurl = `https://api.openweathermap.org/data/2.5/weather?q=${inputCity}&units=metric`;
            document.getElementById("temperature").innerHTML = "- -" + "°C";
            document.getElementById("city-name").innerHTML = "- -";
            document.getElementById("humidity-value").innerHTML = "- -"+"%";
            document.getElementById("wind-speed").innerHTML = "- -"+" Km/hr";
            document.getElementById("real-feel").innerHTML="- -"+"°C";
            document.getElementById("weather-status").innerHTML="- -";
            document.addEventListener("input",()=>{
                if(inputCity==='')
                {
                    document.querySelector(".weather-icon").src="";
                    document.getElementById("temperature").innerHTML = "- -" + "°C";
                    document.getElementById("city-name").innerHTML = "- -";
                    document.getElementById("humidity-value").innerHTML = "- -"+"%";
                    document.getElementById("wind-speed").innerHTML = "- -"+" Km/hr";
                    document.getElementById("real-feel").innerHTML="- -"+"°C";
                    document.getElementById("weather-status").innerHTML="- -";
                }
            })
            const res = await fetch(apiurl + `&appid=${apikey}`);
            let data = await res.json();
            console.log(data);
            document.getElementById("temperature").innerHTML = Math.round(data.main.temp) + "°C";
            document.getElementById("city-name").innerHTML = data.name+", "+data.sys.country;
            document.getElementById("humidity-value").innerHTML = data.main.humidity+"%";
            document.getElementById("wind-speed").innerHTML = data.wind.speed.toFixed(1)+" Km/hr";
            document.getElementById("real-feel").innerHTML="Feels like "+ Math.round(data.main.feels_like)+"°C";
            const weatherIcon=document.querySelector(".weather-icon");
            const condition=document.getElementById("weather-status");
            console.log(data.weather[0].main);
            if(data.weather[0].main=="Clouds")
            {
                weatherIcon.src="images/clouds.png";
                condition.innerHTML='<p>"It is cloudy outside."</p>'
            }
            else if(data.weather[0].main=="Clear")
            {
                weatherIcon.src="images/clear.png";
                condition.innerHTML='<p>"It is bright and sunny today!"</p>';
            }
            else if(data.weather[0].main=="Rain")
            {
                weatherIcon.src="images/rain.png";
                condition.innerHTML='<p>"It is cats and dogs."</p>';
            }
            else if(data.weather[0].main=="Drizzle")
            {
                weatherIcon.src="images/drizzle.png";
                condition.innerHTML='<p>"It is Raining lightly."</p>';
            }
            else if(data.weather[0].main=="Mist")
            {
                weatherIcon.src="images/mist.png";
                condition.innerHTML='<p>"It is misty outside."</p>';
            }
            else if(data.weather[0].main=="Smoke")
            {
                weatherIcon.src="images/smoke.png";
                condition.innerHTML='<p>"It is smokey outside."</p>';
            }
            else if(data.weather[0].main=="Haze")
            {
                weatherIcon.src="images/haze.png";
                condition.innerHTML='<p>"It is hazey outside."</p>';
            }
            else if(data.weather[0].main=="Snow")
            {
                weatherIcon.src="images/snow.png";
                condition.innerHTML='<p>"It is snowing!"</p>';
            }
            else
            {
                console.log("error");
            }
            //Catchy message for weather conditions.

        } catch (error) {
            console.error("Error fetching weather data:", error);
        }
    }

    // Run fetchData initially
    fetchData();
    //for updating data after 30s
    setInterval(fetchData,30000);