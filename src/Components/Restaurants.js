import React, { Component } from 'react';
import axios from 'axios';

const API_KEY = process.env.REACT_APP_API_KEY;

export default class Restaurants extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        rPaired: []
      };
    }

    async myAxios() {
        let url = "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=38.0293,-78.4767&radius=8046.72&type=restaurant&opennow&key=" + API_KEY;
        let response = await axios.get(url);
        let rData = await response.data.results;
        let rNames = await rData.map(name => name.name);
        let rRatings = await rData.map(rating => rating.rating);
        let rPriceLevels = await rData.map(price => price.price_level);
        let rPaired = [];
        for(let i = 0; i < rNames.length; i++) {
            rPaired.push({name: rNames[i], rating: rRatings[i], priceLevel: rPriceLevels[i]})
        }
        await this.setState({rPaired: rPaired});
    }

    componentDidMount() {
        this.myAxios();
        /*
        axios
        .get("https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=38.0293,-78.4767&radius=8046.72&type=bar&opennow&key=" + API_KEY)
        .then(response => {
            let rData = response.data.results;
            let rNames = rData.map(name => name.geometry.name);
            let rRatings = rData.map(rating => rating.plus_code.rating);
            let rPriceLevels = rData.map(price => price.plus_code.price_level);
            let rPaired = [];
            for(let i = 0; i < rNames.length; i++) {
                rPaired.push({name: rNames[i], rating: rRatings[i], priceLevel: rPriceLevels[i]})
            }
            function updateState(update) {
                return new Promise(resolve => this.setState(update, () => resolve()));
            }
            async function makeWait() {
                await updateState(state => ({rPaired: rPaired}));
            }
        })
        */
    }

    render() {
        if(this.state.rPaired.length == 0) {
            return (
                <div>
                    <p>Open restaurants nearby:</p>
                    <li>None</li>
                </div>
            );
        }
        
        return (
            <div>
                <p>Open restaurants nearby:</p>
                <>
                {this.state.rPaired.map(restaurant => (
                    <li key={restaurant.name}>{restaurant.name}, Rating: {restaurant.rating}, Price Level: {restaurant.priceLevel}</li>
                ))}
                </>
            </div>
        );
    }
}