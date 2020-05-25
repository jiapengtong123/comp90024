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
    this.state.loading = true;
  }

  componentDidMount() {
    const ip = this.props.IP;
    //http://172.26.129.249:80/
    const urls = [
        ip + 'fetch/api/v1.0/tasks/corona',
        ip + 'fetch/api/v1.0/tasks/economy',
        ip + 'fetch/api/v1.0/tasks/employment'
    ];

    let promises = urls.map(url => fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "text/plain"
      },
    }).then(y => {
      return y.json()
    }));
    Promise.all(promises).then(([corona_data, economy_data, employment_data]) => {
      const corona = corona_data;
      const economy = economy_data;
      const employment = employment_data;
      // count up all data into one
      let city_names = [];
      let city_data = [...corona];
      let city_corona = [];
      let city_economy = [];
      let city_employment = [];
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
          if (e1['location'] === e2['location']) {
            e1['count_economy'] = e2['count'];
          }
          return e2;
        });
        return e1
      });

      city_data.map(e1 => {
        employment.map(e2 => {
          if (e1['location'] === e2['location']) {
            e1['count_employment'] = e2['count'];
          }
          return e2;
        });
        return e1
      });

      console.log(city_data);

      // get city names in a list
      city_data.map(e => {
        city_names.push(e['location']);
        city_corona.push(e['count']);
        city_economy.push(e['count_economy']);
        city_employment.push(e['count_employment']);
        return e;
      });

      return {
        city_names: city_names,
        city_corona: city_corona,
        city_economy: city_economy,
        city_employment: city_employment,
        corona_countup: corona_countup,
        economy_countup: economy_countup,
        employment_countup: employment_countup
      }
    }).then((data) => {
      this.setState(
          {
            pie_data: {
              labels: ['corona', 'economy', 'employment'],
              datasets: [{
                data: [data.corona_countup, data.economy_countup, data.employment_countup],
                backgroundColor: ['#4ca1ff', "#ff7474", "#f8ff58"]
              }]
            },
            bar_data: {
              labels: data.city_names,
              datasets: [
                {
                  label: 'corona',
                  data: data.city_corona,
                  backgroundColor: '#4ca1ff',
                },
                {
                  label: "economy",
                  data: data.city_economy,
                  backgroundColor: "#ff7474",
                },
                {
                  label: "employment",
                  data: data.city_employment,
                  backgroundColor: "#f8ff58",
                }]
            },
            loading: false
          });
    });
  }

  render() {
    return <div>
      {
        !this.state.loading && <>
          <div>Pie Chart</div>
          <PieChart data={this.state.pie_data}/>
          <div>Bar Chart</div>
          <BarChart data={this.state.bar_data}/>
        </>
      }
      {
        this.state.loading && <>
          <h2>Now loading, please wait.</h2>
        </>
      }
    </div>
  }
}