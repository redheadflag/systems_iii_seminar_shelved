import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import ProfileDetail from './pages/ProfileDetail';
import Register from './pages/Register';
import AddCollection from './pages/AddCollection';

function App() {

  return (
    <Routes>
      <Route path="/" element={ <Home /> }/>
      <Route path="/login" element={ <Login /> }/>
      <Route path="/register" element={ <Register /> } />
      <Route path="logout" />

      <Route path="/profile/:id" element={ <ProfileDetail /> } />
      <Route path="/collections/new" element={ <AddCollection /> } />
      <Route path="/collection/:id" />
      <Route path="/card/:id" />
    </Routes>
  );
}

export default App;
