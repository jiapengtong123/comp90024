import React, {useState} from 'react';
import './App.css';
import Home from './components/Home';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';

function App() {
  const [num, setNum] = useState(0);

  const setScenarios = () => {
    setNum(1);
  };

  return (
      <div className="App">
        <Container maxWidth="sm">
          <header style={{display: 'block', width: '100%', height: '50px'}}>
            <Button onClick={setScenarios}>Data Graphs</Button>
            <Button href={process.env.PUBLIC_URL + '/choropleth.html'}>Choropleth Map</Button>
          </header>
          {num === 0 && <div>COMP90024 team54</div>}
          {num === 1 && <Home/>}
        </Container>
      </div>
  );
}

export default App;
