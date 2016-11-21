var React = require('react');
var WeatherForm = require('WeatherForm');
var WeatherMessage = require('WeatherMessage');
var ErrorModal = require('ErrorModal');
var openWeatherMap = require('openWeatherMap');


var Weather = React.createClass({

  getInitialState: function() {
    return {
      isLoading: false,
      location: null,
      temp: null,
      errorMessage: null
    };
  },

  handleSearch: function(location) {
    this.setState({
      isLoading: true
    });

    openWeatherMap.getTemp(location)
      .then((response) => {
        this.setState({
          isLoading: false,
          location: location,
          temp: response,
        });
      })
      .catch((error) => {
        this.setState({
          isLoading: false,
          errorMessage: error.message
        });
      });
  },

  render: function() {
    var { isLoading, location, temp, errorMessage} = this.state;

    function renderMessage() {
      if (isLoading) {
        return <h3 className="text-center">Fetching data...</h3>;
      } else if (temp && location) {
        return <WeatherMessage location = { location } temp = { temp } />;
      }
    }

    function renderError () {
      if (errorMessage !== null) {
        return (
          <ErrorModal message={ errorMessage } />
        )
      }
    }

    return (
      <div>
        <h1 className="text-center">Get Weather</h1>
        <WeatherForm onSearch={ this.handleSearch } />
        { renderMessage() }
        { renderError() }
      </div>
    );
  }

});

module.exports = Weather;
