var React = require('react');
var { Link, IndexLink } = require('react-router');

var Nav = (props) => {
  return (
    <div>
      <h2>Nav Component</h2>
      <IndexLink to='/' activeStyle={{ fontWeight: 'bold' }}>Get weather</IndexLink>
      <Link to='/about' activeStyle={{ fontWeight: 'bold' }}>About</Link>
      <Link to='/examples' activeStyle={{ fontWeight: 'bold' }}>Examples</Link>
    </div>
  );
}

module.exports = Nav;
