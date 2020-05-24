//PieChartComponent.js
import React, {Component} from 'react';
import {HorizontalBar} from 'react-chartjs-2';

export default class BarChart extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <div>
          <HorizontalBar
              data={{
                labels: this.props.data.labels,
                datasets: this.props.data.datasets
              }}
              options={{
                scales: {
                  xAxes: [{
                    ticks: {
                      beginAtZero:true,
                      barPercentage: 1
                    }
                  }]
                }
              }}
              height={'2000px'}
          />
        </div>
    )
  }
}