import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';

function App() {

  return (
    <Routes>
      <Route path="/" element={ <Home /> }/>
      <Route path="/login" element={ <Login /> }/>
      <Route path="/sign-up" />
      <Route path="logout" />

      <Route path="/profile/:id" />
      <Route path="/collection/:id" />
      <Route path="/card/:id" />
    </Routes>
  );
}

export default App;
