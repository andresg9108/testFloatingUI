import './App.sass';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Index from './pages/Index/Index';
import Test1 from './pages/Test1/Test1';
import Error404 from './pages/Error404/Error404';

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/test1" element={<Test1 />} />
      <Route path="*" element={<Error404 />} />
    </Routes>
  </Router>
);

export default App;
