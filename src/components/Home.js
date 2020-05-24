import React, {Component} from "react";
import PieChart from "./PieChart";
import BarChart from "./BarChart";

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pie_data: {},
      bar_data: {}
    };
  }

  componentDidMount() {
    Promise.all([
      fetch('127.0.0.1/fetch/api/v1.0/tasks/corona'),
      fetch('127.0.0.1/fetch/api/v1.0/tasks/economy'),
      fetch('127.0.0.1/fetch/api/v1.0/tasks/employment'),
    ]).then(async ([corona_data, economy_data, employment_data]) => {
      const corona = await corona_data.json();
      const economy = await economy_data.json();
      const employment = await employment_data.json();
      // count up all data into one
      let city_names = [];
      let city_data = [...corona];
      let corona_countup = 0;
      let economy_countup = 0;
      let employment_countup = 0;

      corona.map(e => {
        corona_countup += e['count'];
        return e;
      });

      economy.map(e => {
        economy_countup += e['count'];
        return e;
      });

      employment.map(e => {
        employment_countup += e['count'];
        return e;
      });

      // combine three datasets as one, for each city
      city_data.map(e1 => {
        economy.map(e2 => {
          if (e1['location name'] === e2['location name']) {
            e1['count_economy'] = e2['count'];
          }
          return e2;
        });
        return e1
      });

      city_data.map(e1 => {
        employment.map(e2 => {
          if (e1['location name'] === e2['location name']) {
            e1['count_employment'] = e2['count'];
          }
          return e2;
        });
        return e1
      });

      // get city names in a list
      city_data.map(e => {
        city_names.push(e['location name']);
        return e;
      });

      return {
        city_names: city_names,
        city_data: city_data,
        corona_countup: corona_countup,
        economy_countup: economy_countup,
        employment_countup: employment_countup
      }
    }).then((data) => {
      this.setState(
          {
            pie_data: {
              labels: ['corona', 'economy', 'employment'],
              datasets: [
                {
                  label: 'corona',
                  data: data.corona_countup,
                  backgroundColor: '#4ca1ff',
                },
                {
                  label: "economy",
                  data: data.economy_countup,
                  backgroundColor: "#ff7474",
                },
                {
                  label: "employment",
                  data: data.employment_countup,
                  backgroundColor: "#f8ff58",
                }
              ]
            },
            bar_data: {
              labels: data.city_names,
              datasets: [
                {
                  label: 'corona',
                  data: data.city_data['count'],
                  backgroundColor: '#4ca1ff',
                },
                {
                  label: "economy",
                  data: data.city_data['count_economy'],
                  backgroundColor: "#ff7474",
                },
                {
                  label: "employment",
                  data: data.city_data['count_employment'],
                  backgroundColor: "#f8ff58",
                }]
            }
          });
    }).catch((err) => {
      console.log(err);
    });
  }

  render() {
    return <div>
      <div>Pie Chart</div>
      <PieChart data={this.state.pie_data}/>
      <div>Bar Chart</div>
      <BarChart data={this.state.bar_data}/>
    </div>
  }
}