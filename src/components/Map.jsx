import React, { Component, PropTypes } from 'react'
import _ from 'lodash';
import {GoogleMapLoader, GoogleMap, Marker} from 'react-google-maps';
import { triggerEvent } from 'react-google-maps/lib/utils';
import update from "react-addons-update";

const DEFAULT_CENTER = { lat: 47.6062, lng: -122.3321 }; //Seattle
const DEFAULT_CENTER_NAME = 'Seattle';
const DEFAULT_ZOOM = 6;

class Map extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      markers: [{
        position: DEFAULT_CENTER,
        key: DEFAULT_CENTER_NAME,
        defaultAnimation: 2,
      }],
    }
    this._handleWindowResize = _.throttle(this._handleWindowResize.bind(this), 500);
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
              defaultZoom={DEFAULT_ZOOM}
              defaultCenter={DEFAULT_CENTER}
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
