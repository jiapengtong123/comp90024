import React, {useState} from 'react';
import './App.css';
import Home from './components/Home';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
// import data from './components/data/data1.json';
import Map from './components/Map';

function App() {
  const [num, setNum] = useState(0);

  const setScenarios = () => {
    setNum(1);
  };

  const setMap = () => {
    setNum(2);
  };

  return (
      <div className="App">
        <Container maxWidth="md">
          <header style={{display: 'block', width: '100%', height: '50px'}}>
            <Button onClick={setScenarios}>Data Graphs</Button>
            {/*<Button href={process.env.PUBLIC_URL + '/choropleth.html'}>Choropleth Map</Button>*/}
            <Button onClick={setMap}>Choropleth Map</Button>
          </header>
          </Container>
          {num === 0 && <h3>COMP90024 team54</h3>}
          {num === 1 && <Home/>}
          {num === 2 && <Map/>}
      </div>
  );
}

export default App;
