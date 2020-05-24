//PieChartComponent.js
import React, {Component} from 'react';
import {Pie} from 'react-chartjs-2';

export default class PieChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      labels: ['demo1', 'demo2', 'demo3'],
      datasets: [{
        data: [2000, 3000, 4000],
        // backgroundColor: ['#FF0000', '#0000FF', '#FFFF00']
      }]
    }
  }

  componentDidMount() {
    // load data based on different areas
    let url = 'localhost:80/';
    fetch('http://example.com/movies.json')
        .then(response => response.json())
        .then(data => {
          console.log(data);
          // format data into chartjs datasets

        });
  }

  render() {
    return (
        <div>
          <Pie
              data={{
                labels: this.state.labels,
                datasets: this.state.datasets
              }}
          />
        </div>
    )
  }
}