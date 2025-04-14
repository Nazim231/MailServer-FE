import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '@/components/Home';
import { Login } from '@/components/Login';
import { Signup } from '@/components/Signup';
import ProtectedRoute from '@/utils/ProtectedRoute';
import NotFound from '@/components/NotFound';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route element={<ProtectedRoute />}>
        {/* TODO : Add the Protected Routes */}
        <Route path="/" element={<Home />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}
