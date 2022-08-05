import CountrySelector from './components/CountrySelector';
import Summary from './components/Summary';
import Highlight from './components/Highlight';
import { useEffect, useState } from 'react';
import { getCountries, getReportByCountry } from './apis';

function App() {
  const [countries, setCountries] = useState([]);
  const [selectedCountryId, setSelectedCountryId] = useState('');
  const [report, setReport] = useState([]);

  useEffect(() => {
    getCountries().then((res) => {
      //console.log({ res });
      setCountries(res.data);
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
    <>
      <CountrySelector
        countries={countries}
        handleOnChange={handleOnChange}
        value={selectedCountryId}
      />
      <Highlight report={report} />
      <Summary report={report} countryId={selectedCountryId} />
    </>
  );
}

export default App;
