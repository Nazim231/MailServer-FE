import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Inbox from '@/components/Inbox';
import { Login } from '@/components/Login';
import { Signup } from '@/components/Signup';
import { Home } from '@/components/Home';
import ProtectedRoute from '@/utils/ProtectedRoute';
import NotFound from '@/components/NotFound';

export default function App() {
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route element={<ProtectedRoute />}>
          {/* TODO : Add the Protected Routes */}
          <Route path="/inbox" element={<Inbox />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}
