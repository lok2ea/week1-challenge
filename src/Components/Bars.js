import React, { Component } from 'react';
import axios from 'axios';

const API_KEY = process.env.REACT_APP_API_KEY;

export default class Bars extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        bPaired: []
      };
    }

    async myAxios() {
        let url = "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=38.0293,-78.4767&radius=8046.72&type=restaurant&opennow&key=" + API_KEY;
        let response = await axios.get(url);
        let bData = await response.data.results;
        let bNames = await bData.map(name => name.name);
        let bRatings = await bData.map(rating => rating.rating);
        let bPriceLevels = await bData.map(price => price.price_level);
        let bPaired = [];
        for(let i = 0; i < bNames.length; i++) {
            bPaired.push({name: bNames[i], rating: bRatings[i], priceLevel: bPriceLevels[i]})
        }
        await this.setState({bPaired: bPaired});
    }

    componentDidMount() {
        this.myAxios();
        /*
    axios
        .get("https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=38.0293,-78.4767&radius=8046.72&type=bar&opennow&key=" + API_KEY)
        .then(response => {
            let bData = response.data.results;
            let bNames = bData.map(name => name.geometry.name);
            let bRatings = bData.map(rating => rating.plus_code.rating);
            let bPriceLevels = bData.map(price => price.plus_code.price_level);
            let bPaired = [];
            for(let i = 0; i < bNames.length; i++) {
                bPaired.push({name: bNames[i], rating: bRatings[i], priceLevel: bPriceLevels[i]})
            }
            this.setState({bPaired: bPaired})
        })
        */
    }
    
    render() {
        if(this.state.bPaired.length == 0) {
            return (
                <div>
                    <p>Open bars nearby:</p>
                    <li>None</li>
                </div>
            );
        }
        
        return (
            <div>
                <p>Open bars nearby:</p>
                <>
                {this.state.bPaired.map(bar => (
                    <li key={bar.name}>{bar.name}, Rating: {bar.rating}, Price Level: {bar.priceLevel}</li>
                ))}
                </>
            </div>
        );
    }
  }