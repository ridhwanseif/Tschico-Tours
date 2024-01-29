import './App.css';
import Home from './Component/CustomerInterface/Home/Home'
import NavApp from './Component/CustomerInterface/Navbar/NavApp'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Booking from './Component/CustomerInterface/booking/Booking'
import Destionation from './Component/CustomerInterface/destination/Destination'
import Social from './utils/Social';
import Contact from './Component/CustomerInterface/contact/Contact';
import RouteLoyOut from './RouteLoyOut';
import ResetPassword from './Component/AdminInterface/Authentication/ForgotPassword/ResetPassword';
import ForgotPassword from './Component/AdminInterface/Authentication/ForgotPassword/ForgotPassword';
import LogInPage from './Component/AdminInterface/Authentication/LogIn/LogInPage';
import SignUp from './Component/AdminInterface/Authentication/SignUp/SignUp';
import EmailVatification from './Component/AdminInterface/Authentication/EmailVatification';
import RequireAuth from './Component/RequireAuth';
import DestionationTab from './Component/CustomerInterface/destination/DestionationTab';


function App() {
  return (
    <div className="App">

      <Routes>
        <Route path="/">

          <Route exact path="/" element={<Home />} />
          <Route path='/destination' element={<Destionation />}>
            {/* <Route path='/destination' element={<Destionation />} /> */}
            <Route path=":tab" element={<DestionationTab />} />
          </Route>
          <Route path='/contact' element={<Contact />} />
          <Route path='/booking' element={<Booking />} />

          <Route path="/login" element={<LogInPage />} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/ForgotPassword" element={<ForgotPassword />} />
          <Route path='/verify'>
            <Route path=':userId' element={<EmailVatification />} />
          </Route>
          <Route path='/reset-password'>
            <Route path=':userId' element={<ResetPassword />} />
          </Route>

          {/* protected Route */}
          <Route element={<RequireAuth />}>
            <Route path="*" element={<RouteLoyOut />} />
          </Route>

          {/* <Route path="*" element={<NotFound />} /> */}
        </Route>
      </Routes>
    </div>
  );
}

export default App;
