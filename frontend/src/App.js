import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import ProfileDetail from './pages/ProfileDetail';
import Register from './pages/Register';
import AddCollection from './pages/AddCollection';
import CollectionDetail from './pages/CollectionDetail';
import CardDetail from './pages/CardDetail';
import AddCard from './pages/AddCard';
import Search from './pages/Search';

function App() {

  return (
    <Routes>
      <Route path="/" element={ <Home /> }/>
      <Route path="/login" element={ <Login /> }/>
      <Route path="/register" element={ <Register /> } />
      <Route path="logout" />

      <Route path="/profile/:username" element={ <ProfileDetail /> } />
      <Route path="/collections/new" element={ <AddCollection /> } />
      <Route path="/collection/:id" element={ <CollectionDetail /> }/>
      <Route path="/collection/:collectionId/add" element={ <AddCard /> } />

      <Route path="/item/:id" element={ <CardDetail /> } />

      <Route path="/search" element={ <Search /> } />
    </Routes>
  );
}

export default App;
