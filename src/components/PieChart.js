//PieChartComponent.js
import React, {Component} from 'react';
import {Pie} from 'react-chartjs-2';

export default class PieChart extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <div>
          <Pie
              data={{
                labels: this.props.data.labels,
                datasets: this.props.data.datasets
              }}
          />
        </div>
    )
  }
}