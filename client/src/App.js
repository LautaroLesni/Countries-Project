import './App.css';
import { Route } from 'react-router-dom';
import Home from './components/Home'
import Nav from './components/Nav'
import SpecificCountry from './components/SpecificCountry'
import Countries from './components/Countries'
import CreateActivity from './components/CreateActivity'

function App() {
  return (
    <div className="App">
      <Route exact path='/' component={Home}/>
      <Route path='/paises' component={Nav}/>
      <Route path='/paises' component={Countries}/>
      <Route path='/country/:id' component={SpecificCountry}/>
      <Route path='/createactivity' component={CreateActivity}/>
    </div>
  );
}

export default App;
