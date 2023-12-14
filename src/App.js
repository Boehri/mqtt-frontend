import './App.css';
import ChartComponent from './Components/Chart';
import MQTTComponent from './Components/MQTT';
import DashboardComponent from './Components/DashboardComponent';

function App() {
  return (
    <div className="App">
      <MQTTComponent />
      <ChartComponent />
    </div>
  );
}

export default App;
