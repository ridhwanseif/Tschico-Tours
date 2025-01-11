import './App.css';
import Home from './Component/CustomerInterface/Home/Home'
import { Route, Routes } from 'react-router-dom';
import Booking from './Component/CustomerInterface/booking/Booking'
import Destionation from './Component/CustomerInterface/destination/Destination'
import Contact from './Component/CustomerInterface/contact/Contact';
import RouteLoyOut from './RouteLoyOut';
import ResetPassword from './Component/AdminInterface/Authentication/ForgotPassword/ResetPassword';
import ForgotPassword from './Component/AdminInterface/Authentication/ForgotPassword/ForgotPassword';
import LogInPage from './Component/AdminInterface/Authentication/LogIn/LogInPage';
import SignUp from './Component/AdminInterface/Authentication/SignUp/SignUp';
import EmailVatification from './Component/AdminInterface/Authentication/EmailVatification';
import RequireAuth from './Component/RequireAuth';
import DestionationTab from './Component/CustomerInterface/destination/DestionationTab';
import Excursions from './Component/CustomerInterface/Excursions/Excursions';
import ExcursionById from './Component/CustomerInterface/Excursions/ExcursionById';
import NavApp from './Component/CustomerInterface/Navbar/NavApp';
import Footer from './Component/CustomerInterface/Footer/Footer';
import Social from './utils/Social';


function App() {
  return (
    <div className="App">
      <Routes>

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
            <Route path="/auth/*" element={<RouteLoyOut />} />
          </Route>

          {/* loyOut */}
          <Route path="*" element={<LoyOuts />} />

          {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </div>
  );
}

export default App;

const LoyOuts = () => {
  return (
    <div className="App">
      <NavApp />
      <Social />
      <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path='/destination' element={<Destionation />}>
            <Route path=":tab" element={<DestionationTab />} />
          </Route>
          <Route path='/excursion' element={<Excursions />}>
            <Route path=":tourId" element={<ExcursionById />} />
          </Route>
          <Route path='/contact' element={<Contact />} />
          <Route path='/booking' element={<Booking />} />

          {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>

      <Footer />
    </div>
  )
}