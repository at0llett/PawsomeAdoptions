//import logo from './logo.svg';
import './App.css';
import Navigation from './frontend/Navigation';
import Home from './frontend/Home';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootswatch/dist/vapor/bootstrap.min.css';
import AdoptionTabs from './frontend/AdoptionTabs';
import QuotesPage from './frontend/QuotesPage';
import LogTabs from './frontend/LogTabs';
import Documentation from './frontend/Documentation';

import ToDo from './frontend/ToDo/ToDo';

function App() {
  return (
    <Router>
      <div className="App">
        <Navigation />
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/adopt" element={<AdoptionTabs/>} />
          <Route path="/account" element={<LogTabs/>} />
          <Route path="/quotes" element={<QuotesPage/>} />
          <Route path="/todo" element={<ToDo/>} />
          <Route path="/documentation" element={<Documentation/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
