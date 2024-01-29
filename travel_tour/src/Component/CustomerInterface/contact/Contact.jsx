import React, { useRef } from 'react';
import './contact.css';
import TextField from '@mui/material/TextField';
import { FaTelegramPlane } from 'react-icons/fa';
import { BsFacebook } from 'react-icons/bs';
import { ImWhatsapp } from 'react-icons/im';
import emailjs from '@emailjs/browser';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import NavApp from '../Navbar/NavApp';
import Social from '../../../utils/Social';
import Img1 from '../../../theZanzibarTaxi.png'
// import emailjs from 'emailjs-com';




function Contact() {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_c91oy7c', 'template_pgol6da', form.current, 'zhoN2ngqfPgvBQHCe')
      .then((result) => {
        console.log(result.text);
        <Alert severity="success">
          <AlertTitle>Success</AlertTitle>
          The massege success send <strong>Please weight for feedback</strong>
        </Alert>
      }, (error) => {
        console.log(error.text);
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          This is an error <strong>check your internet conection.</strong>
        </Alert>
      });
    e.target.reset()
  };

  return (
    <>
      <NavApp />
      <Social />

      <section class="py-lg-5">
        <div class="container py-7">
          <div class="row">
            <div class="col">
              <div class="card box-shadow-xl overflow-hidden mb-5">
                <div class="row">
                  <div class="col-lg-5 booking-card position-relative bg-cover px-0">
                    <div class="z-index-2 text-center d-flex h-100 w-100 d-flex m-auto justify-content-center">
                      <div class="mask bg-gradient-dark opacity-8"></div>
                      <div class="p-3 ps-sm-5 position-relative text-start my-1 z-index-2">
                        <img
                          src={Img1}
                          alt="My Image"
                          style={{
                            width: '5rem',
                            height: '5rem',
                            marginLeft: '9.5rem',
                            marginRight: '1rem',
                          }}
                        />
                        <h3 class="text-white">Contact Information</h3>
                        <p class="text-white opacity-8 mb-4">Fill up the form and our Team will get back to you within 24 hours.</p>
                        <div className="col-md-12">
                          <div className="contact_pos">
                            <article className="contact_op">
                              <FaTelegramPlane />
                              <h5>Email</h5>
                              <h6>waririzi65@gmail.com</h6>
                              <a href="mailto:waririzi65@gmail.com" target="_blank">Send a message</a>
                            </article>
                            <article className="contact_op">
                              <BsFacebook />
                              <h5>Messenger</h5>
                              <h6>RidhwanSeif</h6>
                              <a href="https://m.me/" target="_blank">Send a message</a>
                            </article>
                            <article className="contact_op">
                              <ImWhatsapp />
                              <h5>WhatsApp</h5>
                              <h6>Mr Password</h6>
                              <a href="https://api.whatsapp.com/send?phone+255778489968" target="_blank">WhatsApp me</a>
                            </article>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="col-lg-7 haf-booking">
                    <form ref={form} onSubmit={sendEmail} class="p-2">
                      <div class="card-header px-6 py-sm-3 py-0">
                        <h2>Contact us</h2>
                        <p class="lead"> We'd like to talk with you.</p>
                      </div>

                      <div class="card-body pt-1">
                        <div class="row">

                          <div class="col-md-12 pe-2 mb-3">
                            <div class="input-group input-group-static mb-4">
                              <div className='col-md-5 a'>
                                <TextField
                                  autoFocus
                                  margin="dense"
                                  id="fname"
                                  label="First Name"
                                  type="text"
                                  name="user_name"
                                  fullWidth
                                  variant="standard"
                                  acteve
                                  required
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
                                />
                              </div>
                            </div>
                          </div>

                          <div class="col-md-12 pe-2 mb-3">
                            <div class="input-group input-group-static mb-4">
                              <TextField
                                margin="dense"
                                id="Email"
                                label="Enter Email"
                                type="email"
                                fullWidth
                                variant="standard"
                                name="user_email"
                                required
                              />
                            </div>
                          </div>

                          <div class="col-md-12 pe-2 mb-3">
                            <div class="input-group input-group-static mb-4">
                              <label>Your message</label>
                              <textarea class="form-control" name="message" id="messag" rows="6" placeholder="I want to say that..." required></textarea>
                            </div>
                          </div>

                        </div>

                        <div class="row">
                          <div class="col-md-6 text-end ms-auto">
                            <button type="submit" value="Send" class="btn mb-0">Send Message</button>
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

export default Contact;
