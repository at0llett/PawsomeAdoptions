import React from 'react';
import './App.css';
import 'bootswatch/dist/vapor/bootstrap.min.css';
import Navigation from './Components/Navigation';
import About from './Components/About';
import Home from './Components/Home';
// import Adoption from './Components/Adoption';
import Adopt from './Components/Adopt';
import AdoptionTabs from './Components/AdoptionTabs';

function App() {


  let Component;

  switch (window.location.pathname) {
    case "/":
      Component = Home;
      break;
    case "/about":
      Component = About;
      break;
    case "/adopt":
      Component = AdoptionTabs;
      break;
  }

  return (
    <div className="App">

      <Navigation />
      <Component />

    </div>
  );
}

export default App;
