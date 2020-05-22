import React from "react";
import PieChart from "./PieChart";
import {Bar} from "react-chartjs-2";
import BarChart from "./BarChart";


export default class Home extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
  }

  render() {
    return (
        <>
          <div>Pie Chart</div>
          <PieChart/>
          <div>Bar Chart</div>
          <BarChart/>
        </>
    )
  }
}