import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from "react-toastify";

// react-slick css
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import './App.css';
import Home from './routes/Home';
import System from './routes/System';

import HomePage from './containers/HomePage/HomePage';
import DetailDoctor from './containers/HomePage/Doctor/DetailDoctor';
import ConfirmBooking from './containers/HomePage/Booking/ConfirmBooking';
import DetailSpecialty from './containers/HomePage/Specialty/DetailSpecialty';
import DetailClinic from './containers/HomePage/Clinic/DetailClinic';
import Login from './containers/Auth/Login';
import ListDoctor from './containers/HomePage/Doctor/ListDoctor';
import ListSpecialties from './containers/HomePage/Specialty/ListSpecialties';
import ListClinics from './containers/HomePage/Clinic/ListClinics';

function App() {
  return (
    <div className=''>
      <BrowserRouter>
        <Routes>
          {/* Trang chủ */}
          <Route path="/login" element={<Login />} />

          <Route path="/" element={<Home />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/doctors" element={<ListDoctor />} />
          <Route path="/doctors/:id" element={<DetailDoctor />} />

          <Route path="/specialties" element={<ListSpecialties />} />
          <Route path="/specialties/:id" element={<DetailSpecialty />} />

          <Route path="/clinics" element={<ListClinics />} />
          <Route path="/clinics/:id" element={<DetailClinic />} />

          <Route path="/confirmBooking" element={<ConfirmBooking />} />

          {/* Hệ thống */}
          <Route path="/system/*" element={<System />} />
        </Routes>
      </BrowserRouter>

      <ToastContainer
        position="bottom-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
}

export default App;
