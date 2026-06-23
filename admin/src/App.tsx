import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AuthSuccess from './pages/AuthSuccess';
import Login from './pages/Login';
import Pending from './pages/Pending';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route
          path="/pending"
          element={<Pending />}
        />

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />
        
        <Route
          path="/auth-success"
          element={<AuthSuccess />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;