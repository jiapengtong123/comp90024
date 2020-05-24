//PieChartComponent.js
import React, {Component} from 'react';
import {HorizontalBar} from 'react-chartjs-2';

export default class BarChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      labels: ['demo1', 'demo2', 'demo3'],
      datasets: [{
        label: 'dataset name',
        data: [2000, 3000, 4000],
        // backgroundColor: ['#FF0000'],
        backgroundColor: '#4ca1ff',
        borderWidth: 1
      }]
    }
  }

  componentDidMount() {
  }

  render() {
    return (
        <div>
          <HorizontalBar
              data={{
                labels: this.state.labels,
                datasets: this.state.datasets
              }}
              options={{
                barPercentage: 0.1
              }}
          />
        </div>
    )
  }
}