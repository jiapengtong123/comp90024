import React, {Component} from 'react';
import ReactMapboxGl, {Feature, Layer, Popup} from 'react-mapbox-gl';
import {Button, MenuItem, Select} from '@material-ui/core';
import styled from 'styled-components';
import data1 from '../data/data1.json';
import data2 from '../data/data2.json';
import data3 from '../data/data3.json';
import data4 from '../data/data4.json';
// import data5 from '../data/data5.json';

const Map = ReactMapboxGl({
  accessToken:
      'pk.eyJ1IjoiamlhcGVuZ3RvbmciLCJhIjoiY2thZGJ5eGZjMjNoMDJycXZyMXluNWd6aiJ9.7JMI-kKER5hU2Pe59Ro-7w'
});

const StyledPopup = styled.div`
  background: white;
  color: #3f618c;
  font-weight: 400;
  padding: 5px;
  border-radius: 2px;
`;

const StyledLegend = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  background: rgba(255, 255, 255, 0.8);
  margin-right: 20px;
  font-family: Arial, sans-serif;
  overflow: auto;
  border-radius: 3px;
  padding: 10px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  line-height: 18px;
  height: auto;
  margin-bottom: 40px;
  width: auto;
`;

const StyledFeature = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  background: rgba(255, 255, 255, 0.8);
  margin-right: 20px;
  font-family: Arial, sans-serif;
  overflow: auto;
  border-radius: 3px;
  top: 75px;
  height: 200px;
  margin-top: 20px;
  width: 250px;
  display: flex;
  flex-direction: column;
`;

export default class ChoroplethMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      markers: [{
        "count": 2,
        "location coordinates": [-27.570278, 153.008056],
        "location name": "Archerfield"
      }, {"count": 1, "location coordinates": [-34.14417052, 138.41864646], "location name": "Balaklava"}, {
        "count": 1,
        "location coordinates": [-16.919847, 145.7775061],
        "location name": "Cairns"
      }, {
        "count": 2,
        "location coordinates": [-33.28504944, 151.42295837],
        "location name": "Central Coast"
      }, {"count": 1, "location coordinates": [-21.87937325, 137.2047205], "location name": "Costello"}, {
        "count": 1,
        "location coordinates": [-28.0183, 153.3921],
        "location name": "Gold Coast"
      }, {"count": 1, "location coordinates": [-30.26720686, 150.75202116], "location name": "Gundamulda"}, {
        "count": 2,
        "location coordinates": [-42.882541, 147.330281],
        "location name": "Hobart"
      }, {"count": 1, "location coordinates": [-37.8895005, 145.0422836], "location name": "Melbourne"}, {
        "count": 1,
        "location coordinates": [-37.73106861, 144.96501443],
        "location name": "Melbourne"
      }, {"count": 1, "location coordinates": [-29.2657145, 137.25752332], "location name": "Outback"}, {
        "count": 3,
        "location coordinates": [-35.401389, 148.981667],
        "location name": "Paddys River"
      }, {"count": 1, "location coordinates": [-31.9522, 115.859], "location name": "Perth (WA)"}, {
        "count": 1,
        "location coordinates": [-25.3979053, 129.54715375],
        "location name": "Petermann"
      }, {"count": 1, "location coordinates": [-23.367, 150.5], "location name": "Rockhampton"}, {
        "count": 1,
        "location coordinates": [-20.7723, 117.1465],
        "location name": "Roebourne"
      }, {"count": 1, "location coordinates": [-33.87915, 151.20747], "location name": "Sydney"}, {
        "count": 1,
        "location coordinates": [-33.87859, 151.21354],
        "location name": "Sydney"
      }, {"count": 2, "location coordinates": [-33.86751, 151.20797], "location name": "Sydney"}, {
        "count": 5,
        "location coordinates": [-19.319002, 146.73761],
        "location name": "Townsville"
      }, {"count": 1, "location coordinates": [-34.36853407, 150.90605397], "location name": "Wollongong"}]
    };
    this.state.data = data1;
    this.state.dataset_name = 'data1';
    this.state.datasets = {
      data1: {
        layers: ['19223-22163', '21163-25342', '25342-30175', '30175-37700'],
        colors: ['#D9DAD4', '#D8BEB0', '#D89C8C', '#C07375'],
        maxValue: 37700,
        property: 'median_income_per_job_aud_persons'
      },
      data2: {
        layers: ['529-586', '586-638', '638-717', '717-758', '758-1041'],
        colors: ['#F8F7CD', '#F7DDA2', '#F7BE92', '#F09484', '#B9677A'],
        maxValue: 1041,
        property: 'median_tot_prsnl_inc_weekly'
      },
      data3: {
        layers: ['1562-159783', '159783-418305', '418305-605065', '605065-790381', '790381-1530174'],
        colors: ['#F8F7CD', '#F7DDA2', '#F7BE92', '#F09484', '#B9677A'],
        maxValue: 1530174,
        property: 'tot_p'
      },
      data4: {
        layers: ['46500-46500', '75000-75000', '77000-77000', '174900-174900', '185900-185900'],
        colors: ['#F8F7CD', '#F7DDA2', '#F7BE92', '#F09484', '#B9677A'],
        maxValue: 185900,
        property: 'empy_by_industry_tot_accom_food'
      },
      data5: {
        layers: ['0-10', '10-22220', '20-50', '50-100', '100-200', '200-500', '500-1000', '1000+'],
        colors: ['#FFEDA0', '#FED976', '#FEB24C', '#FD8D3C', '#FC4E2A', '#E31A1C', '#BD0026', '#800026'],
        maxValue: 0,
        property: 'median_income_per_employed_aud_persons'
      }
    };
    this.state.center = [133.7751, -25.2744];
    this.state.zoom = [3.5];
    this.state.selectedMarker = undefined;
    this.state.showMarker = false;
    this.state.currentLayer = {};
  }

  componentDidMount() {
    const ip = this.props.IP;
    const url = ip + 'fetch/api/v1.0/tasks/precise';
    fetch(url).then(response => response.json()).then(
        data => {
          this.setState({markers: data});
        }
    )
  }

  UNSAFE_componentWillMount() {
  }

  setColorGradient(name, value) {
    const colors = this.state.datasets[name]['colors'];
    const maxValue = this.state.datasets[name]['maxValue'];
    return colors[Math.floor(value / maxValue * (colors.length - 1))];
  }

  getPropertyName(name) {
    return this.state.datasets[name]['property'];
  }

  handleChange = event => {
    this.setState({dataset_name: event.target.value});
    this.setState({currentLayer: {}});
    switch (event.target.value) {
      case 'data1':
        this.setState({data: data1});
        break;
      case 'data2':
        this.setState({data: data2});
        break;
        case 'data3':
          this.setState({data: data3});
          break;
        case 'data4':
          this.setState({data: data4});
          break;
        // case 'data5':
        //   this.setState({data: data5});
        //   break;
    }
  };

  renderOptions() {
    return ['data1', 'data2', 'data3', 'data4', 'data5'].map((e, i) => {
      return (
          <MenuItem
              label="Select a country"
              value={e}
              key={i}>{e}</MenuItem>
      );
    });
  }

  markerClick = (feature) => {
    this.setState({
      // center: [feature['location coordinates'][1], feature['location coordinates'][0]],
      // zoom: [14],
      selectedMarker: feature
    });
  };

  handleMarkers = (event) => {
    this.setState({showMarker: true});
  };

  handleHideMarkers = (event) => {
    this.setState({showMarker: false});
  };

  handleLayer = (layer) => {
    this.setState({
      currentLayer: {
        name: this.getPropertyName(this.state.dataset_name),
        value: layer['properties'][this.getPropertyName(this.state.dataset_name)]
      }
    });
  };

  render() {
    return (
        <>
          <Select value={this.state.selected} onChange={this.handleChange}>
            {this.renderOptions()}
          </Select>
          <Button onClick={this.handleMarkers}>show markers</Button>
          <Button onClick={this.handleHideMarkers}>hide markers</Button>
          <Map
              style="mapbox://styles/mapbox/streets-v11"
              containerStyle={{
                height: '100vh',
                width: '100vw'
              }}
              center={this.state.center}
              zoom={this.state.zoom}
              fitBounds={undefined}
              flyToOptions={{speed: 0.8}}
          >
            {/* color map */}
            {
              this.state.data['features'].map(e => {
                return <Layer type="fill"
                              layout={{}}
                              paint={{
                                // 'fill-color': '#3bb2d0',
                                'fill-color': this.setColorGradient(this.state.dataset_name, e['properties'][this.getPropertyName(this.state.dataset_name)]),
                                'fill-opacity': 0.7,
                              }}
                              onClick={this.handleLayer.bind(this, e)}
                >
                  <Feature
                      coordinates={e['geometry']['coordinates']}/>
                </Layer>
              })
            }
            {/* markers */}
            {this.state.showMarker &&
            <Layer
                type="circle"
                id="marker"
                paint={{
                  "circle-color": "#0f4cff",
                  "circle-stroke-width": 1,
                  "circle-stroke-color": "#fff",
                  "circle-stroke-opacity": 1
                }}
            >
              {
                this.state.markers.map((marker, index) => (
                    <Feature
                        onClick={this.markerClick.bind(this, marker)}
                        coordinates={[marker['location coordinates'][1], marker['location coordinates'][0]]}/>
                ))
              }
            </Layer>
            }
            {this.state.selectedMarker && (
                <Popup key={this.state.selectedMarker['location name']}
                       coordinates={[this.state.selectedMarker['location coordinates'][1], this.state.selectedMarker['location coordinates'][0]]}>
                  <StyledPopup>
                    <div>{this.state.selectedMarker['location name']}</div>
                    <div>
                      {this.state.selectedMarker['count']}
                    </div>
                  </StyledPopup>
                </Popup>
            )}
          </Map>
          <StyledFeature>
            {
              this.state.currentLayer.name &&
              <>
                <h3>{this.state.currentLayer.name}</h3>
                <div>{this.state.currentLayer.value}</div>
              </>
            }
          </StyledFeature>
          <StyledLegend>
            {
              this.state.datasets[this.state.dataset_name]['colors'].map((e, i) => {
                    return <div style={{display: 'flex'}}>
                      <div>
                        <span style={{backgroundColor: e, width: '10px', height: '10px', display: 'inline-block'}}></span>
                        <span>{this.state.datasets[this.state.dataset_name]['layers'][i]}</span>
                      </div>
                    </div>
                  }
              )}
          </StyledLegend>
        </>
    );
  }
}