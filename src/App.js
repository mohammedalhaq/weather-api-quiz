import logo from './logo.svg';
import './App.css';
import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: "",
      weather: {}
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({ location: e.target.value })
  }

  handleSubmit(e) {
    const that = this;
    e.preventDefault();
    fetch("https://www.metaweather.com/api/location/search/?query=" + this.state.location)
      .then(response => response.json())
      .then(function (data) {
        var woeid = data[0].woeid;
        return fetch("https://www.metaweather.com/api/location/" + woeid)
          .then(response => response.json())
          .then(data => that.setState({ weather: data.consolidated_weather[0] }))
      });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Enter location here:
            <input type="text" onChange={this.handleChange} />
          </label>
          <input type="submit" />
        </form>
        <p>Weather state: {this.state.weather.weather_state_name}</p>
        <p>Current temp: {this.state.weather.the_temp}°</p>
        <p>Min temp: {this.state.weather.min_temp}°</p>
        <p>Max temp: {this.state.weather.max_temp}°</p>
        <p>Wind Speed: {this.state.weather.wind_speed} km/h</p>
      </div>
    );
  }
}

export default App;
