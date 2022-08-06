import CountrySelector from './components/CountrySelector';
import Summary from './components/Summary';
import Highlight from './components/Highlight';
import { useEffect, useState } from 'react';
import { getCountries, getReportByCountry } from './apis';
import { sortBy } from 'lodash';
import { Container, Typography } from '@material-ui/core';
import moment from 'moment';
import '@fontsource/roboto';

function App() {
  const [countries, setCountries] = useState([]);
  const [selectedCountryId, setSelectedCountryId] = useState('');
  const [report, setReport] = useState([]);

  useEffect(() => {
    getCountries().then((res) => {
      //console.log({ res });
      const countries = sortBy(res.data, 'Country');
      setCountries(countries);
      setSelectedCountryId('au');
    });
  }, []);

  const handleOnChange = (e) => {
    //console.log({ e });
    setSelectedCountryId(e.target.value);
  };

  useEffect(() => {
    if (selectedCountryId) {
      const { Slug } = countries.find(
        (country) => country.ISO2.toLowerCase() === selectedCountryId
      );

      // call api
      getReportByCountry(Slug).then((res) => {
        // delete last item in array res.data because latest data is not finish on today.
        res.data.pop();
        setReport(res.data);
      });
    }
  }, [countries, selectedCountryId]);

  return (
    <Container style={{ marginTop: 20 }}>
      <Typography variant='h2' component='h2'>
        Coronavirus disease (COVID-19) data
      </Typography>
      <Typography>{moment().format('LLL')}</Typography>
      <CountrySelector
        countries={countries}
        handleOnChange={handleOnChange}
        value={selectedCountryId}
      />
      <Highlight report={report} />
      <Summary report={report} countryId={selectedCountryId} />
    </Container>
  );
}

export default App;
