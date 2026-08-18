import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import ProfileDetail from './pages/ProfileDetail';
import Register from './pages/Register';

function App() {

  return (
    <Routes>
      <Route path="/" element={ <Home /> }/>
      <Route path="/login" element={ <Login /> }/>
      <Route path="/register" element={ <Register /> } />
      <Route path="logout" />

      <Route path="/profile/:id" element={ <ProfileDetail /> } />
      <Route path="/collection/:id" />
      <Route path="/card/:id" />
    </Routes>
  );
}

export default App;
