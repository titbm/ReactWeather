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
      isLoading: true,
      location: null,
      temp: null,
      errorMessage: null
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

  componentDidMount: function() {
    var location = this.props.location.query.location;

    if (location && location.length > 0) {
      this.handleSearch(location);
      window.location.hash = '#/';
    }
  },

  componentWillReceiveProps: function(newProps) {
    var location = newProps.location.query.location;

    if (location && location.length > 0) {
      this.handleSearch(location);
      window.location.hash = '#/';
    }
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
        <h1 className="text-center page-title">Get Weather</h1>
        <WeatherForm onSearch={ this.handleSearch } />
        { renderMessage() }
        { renderError() }
      </div>
    );
  }

});

module.exports = Weather;
