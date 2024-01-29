import React from 'react'
import './Home.css';
import { Post } from './Post';
import { Card } from 'antd';
import Footer from '../Footer/Footer';
import Img1 from '../../../theZanzibarTaxi.png';
import HomeDestination from './HomeDestination/HomeDestination';
import HomeGallary from './HomeGallary/HomeGallry';
import NavApp from '../Navbar/NavApp';
import Social from '../../../utils/Social';




const { Meta } = Card;


export default function Home() {
  return (
    <>
      <NavApp />
      <Social />
      <div className='home-page'>
        <header className="bg-gradient-dark w-100">
          <div className="page-header min-vh-85" id='homeId'>
            <span className="mask bg-gradient-dark opacity-7"></span>
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-lg-8 text-center mx-auto my-auto">
                  <img
                    src={Img1}
                    alt="My Image"
                    style={{
                      width: '9rem',
                      height: '9rem',
                      marginLeft: '1rem',
                      marginRight: '1rem',
                      marginBottom: '-2rem'
                    }}
                  />
                  <h3 className="text-white">Work with Tschico Tours</h3>
                  <p className="lead mb-4 text-white opacity-8">We guarantee you taxi transfer service across Zanzibar</p>
                  {/* <!-- <a href="https://playground.sarufi.io/playground/255"> <button type="submit" className="btn bg-white text-dark">Contact BluePower</button></a> --> */}
                  <h6 className="text-white mb-2 mt-2">Find Us on</h6>
                  <div className="d-flex justify-content-center"
                    style={{
                      color: "#ff5722"
                    }}>
                    <i className="fab fa-facebook text-lg me-4"></i>
                    <i className="fab fa-instagram text-lg me-4"></i>
                    <i className="fab fa-twitter text-lg me-4"></i>
                    <i className="fab fa-google-plus text-lg"></i>
                    {/* <i className="fab fa-google-plus text-lg text-white"></i> */}

                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="card card-body shadow-xl mx-1 mx-md-4 mt-n5 mb-0">
          <section className="bg-gradient-white">
            <div className="container">
              <div className="row">
                <div className="col-lg-12">
                  <Post />
                </div>
              </div>
            </div>
          </section>
        </div>

        <div className="page-header card card-body shadow-xl mx-3 mx-md-4 py-2" id='serviceId'>
          <section className="bg-gradient-white mx-n3">
            <span className="mask bg-gradient-dark opacity-7"></span>
            <div className="container">
              <div className="row align-items-start">
                <div className="col-lg-12">
                  <HomeDestination />
                </div>
              </div>
            </div>
          </section>
        </div>



        <div id='tour'>
          <HomeGallary />
        </div>


        <section className="bg-gradient-white">
          <div className="container">
            <Footer />

          </div>
        </section>
      </div >
    </>
  )
}
