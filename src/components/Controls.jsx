import React, { PropTypes, Component } from 'react'

class Controls extends Component {
  render() {
    const { getWeather } = this.props
    return (
      <div>
        <button className="hi"
                onClick={() => this.props.getWeather()} >this is my button</button>
      </div>
    );
  }
}
Controls.propTypes = {
  getWeather: PropTypes.func.isRequired,
}

export default Controls
