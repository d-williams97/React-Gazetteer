import './App.css';
import {useState , useEffect} from 'react'

import Preloader from './components/preloader/Preloader';
import Map from './components/map/Map';
import Reduce from './components/UseReducer/UseReducer';



function App() {
const [loading, setLoading] = useState(false);
const [location, setLocation] = useState(null);

useEffect(() => { // For loading the preloader
  setLoading(true);
  setTimeout(() => {
    setLoading(false);
  }, 2000)
},[])


// useEffect(() => { // for getting geolocation data
//   getGeolocation();
// },[])

// const showPosition = (position) => {
//   const {latitude,longitude} = position.coords;
//      setLocation({latitude, longitude})
// }

// const geoError = (err) => {
//   console.error(`Error: ${err.message}`);
//   let latitude = 0;
//   let longitude = 0;
//   setLocation({latitude, longitude})

// }

// // Getting Geolocation data
// const getGeolocation = () => {
//   if (navigator.geolocation) {
//     navigator.geolocation.getCurrentPosition(showPosition, geoError)
//   }

//   }








  return (
    <div className="App">
      {/* <Preloader loading={loading} />  */}
      <Map location={location}/>
      {/* <Reduce /> */}
    </div>
  );
}

export default App;
