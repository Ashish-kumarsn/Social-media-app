import { useSelector } from 'react-redux';
import './App.css';
import Auth from './Pages/auth/Auth';
import Home from './Pages/home/Home';
import Profile from './Pages/profile/Profile';
import { Routes, Route, Navigate } from 'react-router-dom';

function App() {
  // Normalize authData: some reducers store { user, token }, some store user directly.
  const authData = useSelector((state) => state.authReducer.authData);
  const user = authData?.user ?? authData ?? null;

  return (
    <div className="App">
      <div className="blur" style={{ top: '-18%', right: '0' }}></div>
      <div className="blur" style={{ top: '36%', left: '-8rem' }}></div>

      <Routes>
        <Route
          path="/"
          element={user ? <Navigate to="/home" replace /> : <Navigate to="/auth" replace />}
        />
        <Route
          path="/home"
          element={user ? <Home /> : <Navigate to="/auth" replace />}
        />
        <Route
          path="/auth"
          element={user ? <Navigate to="/home" replace /> : <Auth />}
        />
        <Route
          path="/profile/:id"
          element={user ? <Profile /> : <Navigate to="/auth" replace />}
        />
      </Routes>
    </div>
  );
}

export default App;
