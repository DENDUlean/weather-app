import { useState } from 'react';
import axios from 'axios';

function App() {

  const [data, setData] = useState({});
  const [location, setLocation] = useState("");

  const units = 'metric';
  const lang = 'cz';

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=${units}&lang=${lang}&appid=${api_key}`;

  const searchLocation = (event) => {
    if(event.key == "Enter"){
      axios.get(url).then((res) => {
        setData(res.data);
      })
      searchLocation('');
    }
  }

  return (
    <div className='app'>

      <div className='search'>
        <input type="text" value={location} onChange={event => setLocation(event.target.value)} placeholder='Poloha' onKeyDown={searchLocation}/>
      </div>
      
      <div className='container'>
        
        <div className='top'>

          <div className='location'>
            <p>{data.name}</p>
          </div>

          <div className='temp'>
            {data.main ? <h1>{data.main.temp.toFixed()}°C</h1> : null}
          </div>

          <div className='desc'>
            {data.weather ? <p>{data.weather[0].description}</p> : null}
          </div>

        </div>
        
        {data.name != undefined &&
          <div className='bottom'>

            <div className='feels'>
              {data.main ? <p className='bold'>{data.main.feels_like.toFixed()}°C</p> : null}
              <p>Pocitově</p>
            </div>

            <div className='humidity'>
              {data.main ? <p className='bold'>{data.main.humidity} %</p> : null}
              <p>Vlhkost</p>
            </div>

            <div className='wind'>
              {data.wind ? <p className='bold'>{data.wind.speed} km/h</p> : null}
              <p>Rychlost větru</p>
            </div>

          </div>
        }
      
      
      </div>
    </div>
  )
}

export default App
