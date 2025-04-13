import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '@/components/Home';
import { Login } from '@/components/Login';
import { Signup } from '@/components/Signup';
import ProtectedRoute from '@/utils/ProtectedRoute';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route element={<ProtectedRoute />}>
        <Route path="/" element={<Home />} />
          
        </Route>
        <Route path="*" element={<p>Page Not Found</p>} />
      </Routes>
    </Router>
  );
}