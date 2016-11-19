var React = require('react');
var WeatherForm = require('WeatherForm');
var WeatherMessage = require('WeatherMessage');
var openWeatherMap = require('openWeatherMap');

var Weather = React.createClass({

  getInitialState: function() {
    return {
      location: '',
      temp: '',
      isLoading: false
    };
  },

  handleSearch: function(location) {
    this.setState({
      isLoading: true
    });

    openWeatherMap.getTemp(location)
      .then((response) => {
        this.setState({
          location: location,
          temp: response,
          isLoading: false
        });
      })
      .catch((error) => {
        this.setState({
          isLoading: false
        });
        alert(error);
      });
  },

  render: function() {
    var { isLoading, location, temp } = this.state;

    function renderMessage() {
      if (isLoading) {
        return <h3>Fetching data...</h3>;
      } else if (temp && location) {
        return <WeatherMessage location = { location } temp = { temp } />;
      }
    }

    return (
      <div>
        <h3>Weather component</h3>
        <WeatherForm onSearch={ this.handleSearch }/>
        { renderMessage() }
      </div>
    );
  }

});

module.exports = Weather;