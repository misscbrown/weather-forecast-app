class Fetch {
    async getCurrent(input) {
      const myKey = "d65886cf52c458b65f7f5a093e229f6b";
  
      //make request to url
  
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${input}&appid=${myKey}`
      );
  
      const data = await response.json();
  
      console.log(data);
  
      return data;
    }
  }

