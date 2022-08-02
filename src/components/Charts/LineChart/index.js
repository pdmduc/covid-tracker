import HighchartsReact from 'highcharts-react-official';
import Highchart from 'highcharts';
import React, { useEffect, useState } from 'react';

const generateOptions = (data) => {
  console.log('LineChart', { data });
  const categories = [];
  return {
    chart: {
      height: 500,
    },
    title: {
      text: 'Total infected case',
    },
    xAxis: {
      categories: categories,
      crosshair: true,
    },
    colors: ['#F3585B'],
    yAxis: {
      min: 0,
      title: {
        text: null,
      },
    },
    tooltip: {
      headerFormat: '<span style="font-size:10px">{point.key}<span><table>',
      pointFormat:
        '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
        '<td style="padding:0"><b>{point.y} ca</b></td></tr>',
      footerFormat: '</table>',
      shared: true,
      useHTML: true,
    },
    plotOptions: {
      colum: {
        pointPadding: 0.2,
        borderWidth: 0,
      },
    },
    series: [
      {
        name: 'Total infected',
        //data: data.map((item) => item.Confirmed),
      },
    ],
  };
};

export default function LineChart(data) {
  const [options, setOptions] = useState({});

  useEffect(() => {
    setOptions(generateOptions(data));
  }, [data]);

  return (
    <div>
      <HighchartsReact
        highcharts={Highchart}
        options={options}
      ></HighchartsReact>
    </div>
  );
}
