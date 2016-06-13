import chai from 'chai';
import {expect, should} from 'chai';
import chatHttp from 'chai-http';

import * as keys from '../src/constants/Keys'
import * as types from '../src/constants/ActionTypes';
import * as location from '../src/constants/Location'
import weather from '../src/reducers/weather.js';

chai.use(chatHttp);

describe('Weather Reducer', () => {
  it('should return initState when no action is defined', () => {
    const initState = {};
    const resultState = weather(initState, {});

    expect(resultState).to.be.empty;
  });

  it('should set state.date to given input', () => {
    const resultString = 'Result';
    const initState = { date: 'Init' };
    const resultState = weather(initState, { type: types.SET_DATE, date: resultString });

    expect(resultState).to.have.property('date', resultString);
  });
});

describe('Weather Actions', () => {
  it('should return 200 for Dark Sky forecast API call with valid input', function(done) {
    const input = {lat: location.DEFAULT_LAT, lng: location.DEFAULT_LNG, date: '2013-05-06T12:00:00-0400' };
    chai.request(`http://cors.io/?u=https://api.forecast.io/forecast/${keys.FORECAST}/${input.lat},${input.lng},${input.date}`)
    .get('/')
    .end(function(err, res) {
      expect(res).to.have.status(200);
      done();
    });
  });

  it('should return 500 for Dark Sky forecast API call with invalid inputs', function(done) {
    const input = {lat: '', lng: '', date: ''};
    chai.request(`http://cors.io/?u=https://api.forecast.io/forecast/${keys.FORECAST}/${input.lat},${input.lng},${input.date}`)
    .get('/')
    .end(function(err, res) {
      expect(res).to.have.status(500);
      done();
    });
  });

  it('should return 200 for Dark Sky forecast API call with future date', function(done) {
    const input = {lat: location.DEFAULT_LAT, lng: location.DEFAULT_LNG, date: '2018-05-06T12:00:00-0400' };
    chai.request(`http://cors.io/?u=https://api.forecast.io/forecast/${keys.FORECAST}/${input.lat},${input.lng},${input.date}`)
    .get('/')
    .end(function(err, res) {
      expect(res).to.have.status(200);
      done();
    });
  });

});
