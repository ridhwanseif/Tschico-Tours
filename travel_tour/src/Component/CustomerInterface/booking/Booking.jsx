import './booking.css';
import TextField from '@mui/material/TextField';
import Img1 from '../../../theZanzibarTaxi.png'
import NavApp from '../Navbar/NavApp';
import Social from '../../../utils/Social';
import { createBooking } from '../../../api/BookingAPI';
import { useMutation, useQueryClient } from 'react-query';
import { useState } from 'react';
import { DatePicker, Select, Space, TimePicker } from 'antd';
// import Timer from './timer';



function Booking() {

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [pickUp, setPickUp] = useState('');
  const [dropOff, setDropOff] = useState('');
  const [description, setDescription] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);

  // const [pickup, setPickup] = useState('');


  // date and time
  const handleDateChange = (value) => {
    setSelectedDate(value);
  };

  const queryClient = useQueryClient();

  const createTaskMutation = useMutation(createBooking, {
    onSuccess: () => {
      queryClient.invalidateQueries('booking'); // Refresh the task list after creating a new task
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Format the selectedDate in the desired format
    const formattedDate = selectedDate ? selectedDate.format('YYYY-MM-DD HH:mm') : null;

    try {
      const formData = new FormData();
      formData.append('order_date', formattedDate);
      formData.append('firstName', firstName);
      formData.append('lastName', lastName);
      formData.append('email', email);
      formData.append('pickUp_Location', pickUp);
      formData.append('dropOff_Location', dropOff);
      formData.append('description', description);


      // Set loading to true during the mutation
      createTaskMutation.mutate(formData);

      // Reset the form fields upon successful mutation
      setFirstName('');
      setLastName('');
      setEmail('');
      setPickUp('');
      setDropOff('');
      setDescription('');


    } catch (error) {
      // Handle error here (e.g., show an error message to the user)
      console.error('Error creating task:', error);
    }
  };

  return (
    <>

      <NavApp />
      {/* <Social /> */}

      <section class="py-lg-5">
        <div class="container py-7">
          <div class="row">
            <div class="col">
              <div class="card box-shadow-xl overflow-hidden mb-5">
                <div className="row">
                  <div class="col-lg-5 booking-card position-relative bg-cover px-0">
                    <div class="z-index-2 text-center d-flex h-100 w-100 d-flex m-auto justify-content-center">
                      <div class="mask bg-gradient-dark opacity-8"></div>
                      <div class="p-5 ps-sm-5 position-relative text-start my-1 z-index-2">
                        <img
                          src={Img1}
                          alt="My Image"
                          style={{
                            width: '9rem',
                            height: '9rem',
                            marginLeft: '6.5rem',
                            marginRight: '1rem',
                            marginBottom: '2rem'
                          }}
                        />
                        <h3 className="text-white">Contact Information</h3>
                        <p className="text-white opacity-8 mb-4">Fill up the form and our Team will get back to you within 24 hours.</p>
                        <div className="d-flex p-2 text-white">
                          <div>
                            <i className="fas fa-phone text-sm"></i>
                          </div>
                          <div className="ps-3">
                            <span className="text-sm opacity-8">(+40) 772 100 200</span>
                          </div>
                        </div>
                        <div className="d-flex p-2 text-white">
                          <div>
                            <i className="fas fa-envelope text-sm"></i>
                          </div>
                          <div className="ps-3">
                            <span className="text-sm opacity-8">hello@creative-tim.com</span>
                          </div>
                        </div>
                        <div className="d-flex p-2 text-white">
                          <div>
                            <i className="fas fa-map-marker-alt text-sm"></i>
                          </div>
                          <div className="ps-3">
                            <span className="text-sm opacity-8">Dyonisie Wolf Bucharest, RO 010458</span>
                          </div>
                        </div>
                        <div className="mt-4">
                          <button type="button" className="btn btn-icon-only btn-link text-white btn-lg mb-0" data-toggle="tooltip" data-placement="bottom" data-original-title="Log in with Facebook">
                            <i className="fab fa-facebook"></i>
                          </button>
                          <button type="button" className="btn btn-icon-only btn-link text-white btn-lg mb-0" data-toggle="tooltip" data-placement="bottom" data-original-title="Log in with Twitter">
                            <i className="fab fa-twitter"></i>
                          </button>
                          <button type="button" className="btn btn-icon-only btn-link text-white btn-lg mb-0" data-toggle="tooltip" data-placement="bottom" data-original-title="Log in with Dribbble">
                            <i className="fab fa-dribbble"></i>
                          </button>
                          <button type="button" className="btn btn-icon-only btn-link text-white btn-lg mb-0" data-toggle="tooltip" data-placement="bottom" data-original-title="Log in with Instagram">
                            <i className="fab fa-instagram"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-7 haf-booking">
                    <form className="p-2" id="contact-form" method="post" onSubmit={handleSubmit}>
                      <div className="card-header px-4 py-sm-3 py-0">
                        <h4>Book with us</h4>
                        <p className="lead"> We'd like to book with you.</p>
                      </div>

                      <div className="card-body pt-1 mx-md-6">
                        <div className="row">

                          <div className="col-md-12 pe-2 mb-1">
                            <div className="input-group input-group-static mb-4">
                              <div className='col-md-5 a'>
                                <TextField
                                  autoFocus
                                  margin="dense"
                                  id="fname"
                                  label="First Name"
                                  type="text"
                                  fullWidth
                                  variant="standard"
                                  acteve
                                  required
                                  value={firstName}
                                  onChange={(e) => setFirstName(e.target.value)}
                                />
                              </div>
                              <div className='col-md-6'>
                                <TextField
                                  margin="dense"
                                  id="Lname"
                                  label="Last Name"
                                  type="text"
                                  fullWidth
                                  variant="standard"
                                  required
                                  value={lastName}
                                  onChange={(e) => setLastName(e.target.value)}
                                />
                              </div>
                            </div>
                          </div>

                          <div className="col-md-12 pe-2 mb-1">
                            <div className="input-group input-group-static mb-4">
                              <TextField
                                margin="dense"
                                id="Email"
                                label="Enter Email"
                                type="text"
                                fullWidth
                                variant="standard"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                              />

                              <div className="col-md-5">
                                <label className="small mt-2" for="inputLastName">Select Date and time:</label><br />
                                <Space direction="vertical" size={12}>
                                  <DatePicker showTime onChange={handleDateChange} />
                                </Space>
                              </div>
                            </div>
                          </div>

                          <div className="col-md-12 pe-2 mb-1">
                            <div className="input-group input-group-static mb-4">
                              <div className='col-md-5 a'>
                                <TextField
                                  margin="dense"
                                  id="pickup"
                                  label="Pickup Location"
                                  type="text"
                                  fullWidth
                                  variant="standard"
                                  required
                                  value={pickUp}
                                  onChange={(e) => setPickUp(e.target.value)}
                                />
                              </div>

                              <div className='col-md-6 input-group-static'>
                                <TextField
                                  margin="dense"
                                  id="drop"
                                  label="Drop Off Location"
                                  className="form-control"
                                  type="text"
                                  fullWidth
                                  variant="standard"
                                  required
                                  value={dropOff}
                                  onChange={(e) => setDropOff(e.target.value)}
                                />
                              </div>

                            </div>
                          </div>

                          <div className="col-md-12 pe-2 mb-1">
                            <div className="input-group input-group-static mb-4">
                              <label>Your message</label>
                              <textarea
                                name="message"
                                className="form-control"
                                id="message" rows="3"
                                placeholder="I want to say that... "
                                required
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                              ></textarea>
                            </div>
                          </div>

                        </div>

                        <div className="row">
                          <div className="col-md-6 text-end ms-auto">
                            <button type="submit" className="btn mb-0">Submit</button>
                          </div>
                        </div>
                      </div>
                    </form>

                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}





export default Booking;
