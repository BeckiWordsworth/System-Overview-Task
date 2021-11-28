import React, { PureComponent } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';


export default class DevelopersGraph extends PureComponent {

  render() {
    const chartData = []

    for(let key in this.props.data) {
      chartData.push({
        name: key,
        Developers: this.props.data[key]
      })
    }

    return (
      <BarChart
        width={500}
        height={300}
        data={chartData}
        margin={{
          top: 20, right: 30, left: 20, bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="Developers" stackId="a" fill="#82ca9d" />
      </BarChart>
    );
  }
}
