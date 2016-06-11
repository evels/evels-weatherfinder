import React, { Component, PropTypes } from 'react'
import _ from 'lodash';
import {GoogleMapLoader, GoogleMap, Marker} from 'react-google-maps';
import { triggerEvent } from 'react-google-maps/lib/utils';
import update from "react-addons-update";

class Map extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      markers: [{
        position: {
          lat: 25.0112183,
          lng: 121.52067570000001,
        },
        key: `Taiwan`,
        defaultAnimation: 2,
      }],
    }
    this.handleWindowResize = _.throttle(this.handleWindowResize.bind(this), 500);
  }

  componentDidMount() {
    window.addEventListener(`resize`, this.handleWindowResize);
  }

  componentWillUnmount() {
    window.removeEventListener(`resize`, this.handleWindowResize);
  }

  handleWindowResize() {
    console.log(`handleWindowResize`, this._googleMapComponent);
    triggerEvent(this._googleMapComponent, `resize`);
  }

  /*
   * This is called when you click on the map.
   * Go and try click now.
   */
  handleMapClick(event) {
    let { markers } = this.state;
    console.log(markers);
    console.log(event.latLng.lat());
    markers = update(markers, {
      $push: [
        {
          position: event.latLng,
          defaultAnimation: 2,
          key: Date.now(), // Add a key property for: http://fb.me/react-warning-keys
        },
      ],
    });
    console.log(markers);
    this.setState({ markers });
  }

  render() {
    return (
      <section style={{height: "400px"}}>
        <GoogleMapLoader
          containerElement={<div style={{height: "100%"}}/>}
          googleMapElement={
            <GoogleMap
              defaultZoom={3}
              defaultCenter={{ lat: -25.363882, lng: 131.044922 }}
              onClick={this.handleMapClick.bind(this)}
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
      </section>
    );
  }
}

export default Map
