import React from "react";
import Tab from './DestionationTab';
import './destination.css';
import { Link, useNavigate } from 'react-router-dom';
import Footer from "../Footer/Footer";
import NavApp from "../Navbar/NavApp";
import Img1 from '../../../theZanzibarTaxi.png';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { useQuery } from 'react-query';
import { fetchDestinationAreas } from "../../../api/DestinationAPI";


const Destination = () => {

    const navigete = useNavigate()
    const { data } = useQuery('northAreas', fetchDestinationAreas);

    // if (isLoading) return <div>Loading...</div>;
    // if (isError) return <div>Error loading data</div>;

    return (
        <>

           

            <header className="bg-gradient-dark w-100">
                <div className="page-header min-vh-85" id="homeId">
                    <span className="mask bg-gradient-dark opacity-7"></span>
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-lg-8 col-md-10 col-sm-12 text-center mx-auto my-auto">
                                <img
                                    src={Img1}
                                    alt="My Image"
                                    className="img-fluid"
                                    style={{
                                        maxWidth: '150px',
                                        height: 'auto',
                                        margin: '-.5rem auto',
                                    }}
                                />
                                <h3 className="text-white mt-3">
                                    Zanzibar Destination Area
                                </h3>
                                <p className="lead mb-4 text-white opacity-8">
                                    welcame to the Zanzibar taxi and tours, we are here to
                                    complete the needs of your taxi transfer services from
                                    airport to hotel and from hotel to hotel across the Zanzibar.
                                </p>

                                <h6 className="text-white mb-2 mt-3">Find Us on</h6>
                                <div
                                    className="d-flex justify-content-center flex-wrap"
                                    style={{ color: '#ff5722' }}
                                >
                                    <i className="fab fa-facebook text-lg me-3 mb-2"></i>
                                    <i className="fab fa-instagram text-lg me-3 mb-2"></i>
                                    <i className="fab fa-twitter text-lg me-3 mb-2"></i>
                                    <i className="fab fa-google-plus text-lg mb-2"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>


            <div className="card card-body shadow-xl mx-2 mx-md-4 mt-n4 mb-5">

                <section className="py-3">

                    <div container>
                        <div class="row">
                            <div className="col-md-9">
                                <Tab />
                            </div>

                            <div class="col-md-3 destinationList" style={{ textAlign: 'start' }}>
                                <div class="col4-col">
                                    <div class="col4-box-seach">
                                        <div class="input-group mb-3 ">
                                            <input type="text" class="form-control dis-search" placeholder="    Search" />
                                            <button class="btn btn-secondary my-1" type="submit">Go</button>
                                        </div>
                                    </div>

                                    <div class="col4-box">
                                        <div class="container mt-3">
                                            <table class="table table-hover">
                                                <thead>
                                                    <tr>
                                                        <th>North Areas</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {data?.map((area, index) => {
                                                        if (area.destination.id === 1) {
                                                            return (
                                                                <>
                                                                    <tr key={area.id}>
                                                                        <td className="border-radius-md" onClick={() => {
                                                                            navigete(`/destination/${area.destination.id - 1}`)
                                                                        }}>
                                                                            <Link to={`/destination/${area.destination.id - 1}`}>{area.title}</Link>
                                                                        </td>
                                                                    </tr>
                                                                </>
                                                            );
                                                        } else {
                                                            return null;
                                                        }
                                                    })}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>

                                    <div class="col4-box">
                                        <div class="container mt-3">
                                            <table class="table table-hover">
                                                <thead>
                                                    <tr>
                                                        <th>South Areas</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {data?.map((area, index) => {
                                                        if (area.destination.id === 2) {
                                                            return (
                                                                <>
                                                                    <tr key={area.id}>
                                                                        <td className="border-radius-md" onClick={() => {
                                                                            navigete(`/destination/${area.destination.id - 1}`)
                                                                        }}>
                                                                            <Link to={`/destination/${area.destination.id}`}>{area.title}</Link>
                                                                        </td>
                                                                    </tr>
                                                                </>
                                                            );
                                                        } else {
                                                            return null;
                                                        }
                                                    })}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>

                                    <div class="col4-box">
                                        <div class="container mt-3">
                                            <table class="table table-hover">
                                                <thead>
                                                    <tr>
                                                        <th>Zanzibar Central/Urban</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {data?.map((area, index) => {
                                                        if (area.destination.id === 3) {
                                                            return (
                                                                <>
                                                                    <tr key={area.id}>
                                                                        <td className="border-radius-md" onClick={() => {
                                                                            navigete(`/destination/${area.destination.id - 1}`)
                                                                        }}>
                                                                            <Link to={`/destination/${area.destination.id}`}>{area.title}</Link>
                                                                        </td>
                                                                    </tr>
                                                                </>
                                                            );
                                                        } else {
                                                            return null;
                                                        }
                                                    })}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>

                                    <div class="col4-box">
                                        <div class="container mt-3">
                                            <table class="table table-hover">
                                                <thead>
                                                    <tr>
                                                        <th>Zanzibar Beach to Beach</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {data?.map((area, index) => {
                                                        if (area.destination.id === 4) {
                                                            return (
                                                                <>
                                                                    <tr key={area.id}>
                                                                        <td className="border-radius-md" onClick={() => {
                                                                            navigete(`/destination/${area.destination.id - 1}`)
                                                                        }}>
                                                                            <Link to={`/destination/${area.destination.id}`}>{area.title}</Link>
                                                                        </td>
                                                                    </tr>
                                                                </>
                                                            );
                                                        } else {
                                                            return null; 
                                                        }
                                                    })}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>

                    {/* <h4>Transfer Price varies according to government taxes</h4> */}
                </section>

            </div>
           

        </>
    )
}

export default Destination;

