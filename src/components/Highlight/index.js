import React from 'react';
import { Card, CardContent, Grid, Typography } from '@material-ui/core';
import HighlightCard from './HighlightCard';

export default function Highlight({ report }) {
  const data = report && report.length ? report[report.length - 1] : [];

  const summary = [
    {
      title: 'Total Infected Cases',
      count: data.Confirmed,
      type: 'confirmed',
    },
    {
      title: 'Total Recovery Cases',
      count: data.Active,
      type: 'recovered',
    },
    {
      title: 'Total Deaths',
      count: data.Deaths,
      type: 'death',
    },
  ];

  return (
    <Grid container spacing={3}>
      {summary.map((item) => (
        <Grid item sm={4} xs={12} key={item.type}>
          <HighlightCard
            title={item.title}
            count={item.count}
            type={item.type}
          />
        </Grid>
      ))}
    </Grid>
  );
}
