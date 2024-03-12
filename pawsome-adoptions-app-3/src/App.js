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
import Resources from './frontend/Resources';
import Reviews from './frontend/Reviews';
import Services from './frontend/Services';
import LostFound from './frontend/LostFound';
import RegistrationForm from './frontend/RegistrationForm';
import ToDo from './frontend/ToDo/ToDo';
import AddToDo from './frontend/ToDo/addToDo';
import UpdateToDo from './frontend/ToDo/UpdateToDo';
// import About from './frontend/aboutUs.html';

function App() {
  return (
    <Router>
      <div className="App">
        <Navigation />
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/adopt" element={<AdoptionTabs/>} />
          <Route path="/quotes" element={<QuotesPage/>} />
          <Route path="/account" element={<LogTabs/>} />
          <Route path="/documentation" element={<Documentation/>} />
          <Route path="/resources" element={<Resources/>} />
          <Route path="/reviews" element={<Reviews/>} />
          <Route path="/services" element={<Services/>} />
          <Route path="/lost" element={<LostFound/>} />
          <Route path="/register" element={<RegistrationForm/>} />
          <Route path="/todo/:username" element={<ToDo/>} />
          <Route path="/addtodo/:username" element={<AddToDo/>} />
          <Route path="/updatetodo/:task_id/:username" element={<UpdateToDo/>} />
          {/* <Route path="/about" element={<About/>} /> */}

        </Routes>
      </div>
    </Router>
  );
}

export default App;
