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
    const { data, isLoading, isError } = useQuery('northAreas', fetchDestinationAreas);

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error loading data</div>;

    return (
        <>

            <NavApp />
            {/* <Social /> */}
            <header className="bg-gradient-dark w-100">
                <div className="page-header min-vh-85">
                    <span className="mask bg-gradient-dark opacity-7"></span>
                    <div className="container">
                        <div className="row justify-content-center my-5">
                            <div className="col-lg-8 text-center mx-auto my-auto">
                                <img
                                    src={Img1}
                                    alt="My Image"
                                    style={{
                                        width: '9rem',
                                        height: '9rem',
                                        marginLeft: '1rem',
                                        marginRight: '1rem',
                                        marginBottom: '2rem'
                                    }}
                                />
                                <h1 className="text-white">Zanzibar Destination Area</h1>
                                <p className="lead mb-0 text-white opacity-8">welcame to the Zanzibar taxi and tours, we are here to complete the needs of your taxi transfer services from airport to hotel and from hotel to hotel across the Zanzibar.</p>

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
                                                    {data.map((area, index) => {
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
                                                            return null; // If the title is not "zanzibarNorth", return null to render nothing
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
                                                    {data.map((area, index) => {
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
                                                            return null; // If the title is not "zanzibarNorth", return null to render nothing
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
                                                    {data.map((area, index) => {
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
                                                            return null; // If the title is not "zanzibarNorth", return null to render nothing
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
                                                    {data.map((area, index) => {
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
                                                            return null; // If the title is not "zanzibarNorth", return null to render nothing
                                                        }
                                                    })}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>

                                    {/* <div class="col4-box">
                                        <div class="container mt-3">
                                            <table class="table table-hover">
                                                <thead>
                                                    <tr>
                                                        <th>South Areas</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td className="border-radius-md"><a href="#southPaje">Paje</a></td>
                                                    </tr>
                                                    <tr>
                                                        <td className="border-radius-md"><a href="#southBwejuu">Bwejuu</a></td>
                                                    </tr>
                                                    <tr>
                                                        <td className="border-radius-md"><a href="#southMichamvi">Michamvi</a></td>
                                                    </tr>
                                                    <tr>
                                                        <td className="border-radius-md"><a href="#southJambiani">Jambiani</a></td>
                                                    </tr>
                                                    <tr>
                                                        <td className="border-radius-md"><a href="#southKizimkazi">Kizimkazi</a></td>
                                                    </tr>
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
                                                    <tr>
                                                        <td className="border-radius-md"><a href="#urbanUroa">Uroa</a></td>
                                                    </tr>
                                                    <tr>
                                                        <td className="border-radius-md"><a href="#urbanMarumbi">Marumbi</a></td>
                                                    </tr>
                                                    <tr>
                                                        <td className="border-radius-md"><a href="#urbanPongwe">Pongwe</a></td>
                                                    </tr>
                                                    <tr>
                                                        <td className="border-radius-md"><a href="#urbanSTown">Stone Town</a></td>
                                                    </tr>
                                                    <tr>
                                                        <td className="border-radius-md"><a href="#urbanSHotel">Seacliff Hotel</a></td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>

                                    <div class="col4-box">
                                        <div class="container mt-3">
                                            <table class="table table-hover">
                                                <thead>
                                                    <tr>
                                                        <th>Destination To Destination</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td className="border-radius-md"><a href="#">Nungwi to Kizimkazi</a></td>
                                                    </tr>
                                                    <tr>
                                                        <td className="border-radius-md"><a href="#">Uroa to Jambian</a></td>
                                                    </tr>
                                                    <tr>
                                                        <td className="border-radius-md"><a href="#">Matemwe to Paje</a></td>
                                                    </tr>
                                                    <tr>
                                                        <td className="border-radius-md"><a href="#">Kiwengwa to Kendwa</a></td>
                                                    </tr>
                                                    <tr>
                                                        <td className="border-radius-md"><a href="#">Stone Town to Paje</a></td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div> */}



                                </div>
                            </div>
                        </div>
                    </div>

                    <h4>Transfer Price varies according to government taxes</h4>
                </section>

            </div>
            <div className="mx-2 mx-md-7 mt-n0 ml-5">
                <Footer />
            </div>

        </>
    )
}

export default Destination;



function srcset(image, size, rows = 1, cols = 1) {
    return {
        src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
        srcSet: `${image}?w=${size * cols}&h=${size * rows
            }&fit=crop&auto=format&dpr=2 2x`,
    };
}

function QuiltedImageList() {
    return (
        <ImageList
            sx={{ width: 500, height: 450 }}
            variant="quilted"
            cols={4}
            rowHeight={121}
        >
            {itemData.map((item) => (
                <ImageListItem key={item.img} cols={item.cols || 1} rows={item.rows || 1}>
                    <img
                        {...srcset(item.img, 121, item.rows, item.cols)}
                        alt={item.title}
                        loading="lazy"
                    />
                </ImageListItem>
            ))}
        </ImageList>
    );
}

const itemData = [
    {
        img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
        title: 'Breakfast',
        rows: 2,
        cols: 2,
    },
    {
        img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
        title: 'Burger',
    },
    {
        img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
        title: 'Camera',
    },
    {
        img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
        title: 'Coffee',
        cols: 2,
    },
    {
        img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
        title: 'Hats',
        cols: 2,
    },
    {
        img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
        title: 'Honey',
        author: '@arwinneil',
        rows: 2,
        cols: 2,
    },
    {
        img: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
        title: 'Basketball',
    },
    {
        img: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f',
        title: 'Fern',
    },
    {
        img: 'https://images.unsplash.com/photo-1597645587822-e99fa5d45d25',
        title: 'Mushrooms',
        rows: 2,
        cols: 2,
    },
    {
        img: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af',
        title: 'Tomato basil',
    },
    {
        img: 'https://images.unsplash.com/photo-1471357674240-e1a485acb3e1',
        title: 'Sea star',
    },
    {
        img: 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6',
        title: 'Bike',
        cols: 2,
    },
];