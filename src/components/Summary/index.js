import { Grid } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import HighMaps from '../Charts/HighMaps';
import LineChart from '../Charts/LineChart';

export default function Summary({ report, countryId }) {
  const [mapData, setMapData] = useState({});
  //console.log({ countryId });

  useEffect(() => {
    //'au', 'us'
    if (countryId) {
      const mapData = import(
        `@highcharts/map-collection/countries/${countryId}/${countryId}-all.geo.json`
      ).then((res) => setMapData(res));
    }
  }, [countryId]);

  return (
    <div>
      <Grid container spacing={3}>
        <Grid item sm={8} xs={12}>
          <LineChart data={report} />
        </Grid>
        <Grid item sm={4} xs={12}>
          <HighMaps mapData={mapData} />
        </Grid>
      </Grid>
    </div>
  );
}
