import './App.css';
import {useState , useEffect} from 'react';

import Preloader from './components/preloader/Preloader';
import Map from './components/map/Map';




function App() {
const [loading, setLoading] = useState(false);

useEffect(() => { // For loading the preloader
  setLoading(true);
  setTimeout(() => {
    setLoading(false);
  }, 2000)
},[])


  return (
    <div className="App">
      <Preloader loading={loading} />
      <Map />
    </div>
  );
}

export default App;
