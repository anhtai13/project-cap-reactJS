import { Route, Routes } from 'react-router-dom';
import HomePage from './Client/Homepage/HomePage';
import Premium from '../src/ServiceClient/Premium';
import Fast from './ServiceClient/Fast';
import Dry from './ServiceClient/Dry';
import Hotel from './ServiceClient/Hotel';
import Uniform from './ServiceClient/Uniform';
import Discount from './Client/Discount/Discount';
import About from './Client/About/About';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<HomePage />} exact />
        <Route path='/premium' element={<Premium />} />
        <Route path='/fast' element={<Fast />} />
        <Route path='/dry' element={<Dry />} />
        <Route path='/hotel' element={<Hotel />} />
        <Route path='/uniform' element={<Uniform />} />
        <Route path='/discount' element={<Discount />} />
        <Route path='/about' element={<About />} />
      </Routes>
    </>
  );
}

export default App;
