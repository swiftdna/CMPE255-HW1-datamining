import logo from './logo.svg';
import './App.css';
import Container from 'react-bootstrap/Container';
import TripYears from './charts/TripYears'
import TripMonths from './charts/TripMonths'
import TripTipsDropLocation from './charts/TripTipsDropLocation'
import TripPaymentVol from './charts/TripPaymentVol'
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

function App() {
  return (
    <Container>
      <div className="App">
        <br />
        <h4>CMPE 255 HW1</h4>
        <div className="deck" style={{display: 'flex', flexDirection: 'row'}}>
          <TripYears />
          <TripMonths />
          <TripPaymentVol />
        </div>
        <TripTipsDropLocation />
      </div>
    </Container>
  );
}

export default App;
