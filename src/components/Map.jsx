import React, { Component, PropTypes } from 'react'
import _ from 'lodash'
import { GoogleMapLoader, GoogleMap, Marker } from 'react-google-maps'
import { triggerEvent } from 'react-google-maps/lib/utils'
import * as location from '../constants/Location'

class Map extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      markers: [{
        position: location.DEFAULT_CENTER,
        key: location.DEFAULT_CENTER_NAME,
        defaultAnimation: 2,
      }],
    }
    this._handleWindowResize = _.throttle(this._handleWindowResize.bind(this), 500);
    this._handleMapClick = this._handleMapClick.bind(this);
  }

  componentDidMount() {
    window.addEventListener(`resize`, this._handleWindowResize);
  }

  componentWillUnmount() {
    window.removeEventListener(`resize`, this._handleWindowResize);
  }

  _handleWindowResize() {
    triggerEvent(this._googleMapComponent, `resize`);
  }

  _handleMapClick(event) {
    this.setState({
      markers: [{ //could be changed to push to array to compare/show multiple markers
          position: event.latLng,
          defaultAnimation: 2,
          key: Date.now(),
        }]
    });
    this.props.changeData(event.latLng.lat(), event.latLng.lng());
  }

  render() {
    return (
      <div className={'map'}>
        <GoogleMapLoader
          containerElement={<div style={{height: '100%'}}/>}
          googleMapElement={
            <GoogleMap
              ref={(map) => (this._googleMapComponent = map)}
              defaultZoom={location.DEFAULT_ZOOM}
              defaultCenter={location.DEFAULT_CENTER}
              onClick={this._handleMapClick.bind(this)}
            >
            {this.state.markers.map((marker, index) => {
             return (
               <Marker
                 {...marker}
               />
             );
           })}
         </GoogleMap>
          }
        />
    </div>
    );
  }
}

export default Map
