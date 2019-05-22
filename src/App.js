import React from 'react';
import './App.css';
import Restaurants from "./Components/Restaurants.js";
import Bars from "./Components/Bars.js";
import { render } from 'react-dom';
//import { Map, TileLayer } from "react-leaflet";

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      
    };
  }

  render() {
    return (
      <div>
        <Restaurants/>
        <Bars/>
      </div>
    );
  }
}

export default App;
