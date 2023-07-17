import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from 'components/Navbar';
import PaginaInicial from 'PaginaInicial/index';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<PaginaInicial />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
