import React, { useState } from 'react';
import '../Home.css';
import { useQuery } from 'react-query';
import { fetchDestinations, fetchDestinationAreas } from '../../../../api/DestinationAPI';
import { Col, Row } from 'antd';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';


function HomeDestination() {

    const navigate = useNavigate();
    const [selectedItem, setSelectedItem] = useState(null);

    const { data: destinations, isLoading, isError } = useQuery('destinations', fetchDestinations);

    if (isLoading) return <div>Loading...</div>;

    if (isError) return <div>Error loading</div>;


    const ParagraphWithLimit = ({ text, limit }) => {
        const words = text.split(' ');
        const truncatedText = words.slice(0, limit).join(' ');
        const remainingCount = words.length - limit;

        return (
            <div>
                <p>
                    {truncatedText}
                    {remainingCount > 0 && <span> ...</span>}
                </p>
            </div>
        );
    };

    // A separate component for fetching destination areas
    const FetchDestinationAreasButton = ({ destinationID, areaName }) => {

        const { data: destinationAreas, isLoading, isError } = useQuery(['destinationAreas', destinationID], () =>
            fetchDestinationAreas(destinationID)
        );
        if (isLoading) return <div>Loading Areas...</div>;

        if (isError) return <div>Error loading Areas</div>;

        return (
            <div>
                {destinationAreas.map((area, index) => {
                    if (area.destination.id === selectedItem) {

                        areaName = area.description?.title
                        const tabId = (area.destination.id - 1)
                        return (
                            // Use Link from react-router-dom instead of a regular button
                            <Link to={`/destination/${tabId}`} key={index} id={area.title} className="dropdown-item" type="button">
                                {area.title}
                            </Link>
                        );
                    } else {
                        return null;
                    }
                })}
            </div>
        );
    };


    return (
        <>
            <div className="pb-5 align-items-start text-align-start mx-n1">
                <div className="row">
                    <div className="col-md-8 text-start mb-3">
                        <h3 className="text-white z-index-1 position-relative" style={{ textAlign: 'start' }}>
                            Our Transfer Destinations
                        </h3>
                        <p className="text-white opacity-8" style={{ textAlign: 'start' }}>
                        We assure you a safe journey and complete the needs of your taxis transfer service, we are available 24 hours a day.
                        </p>
                    </div>
                </div>

                <div className="pb-5 align-items-start text-align-start mx-n1">
                    <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                        <div className="row">
                            {destinations.map((destination, index) => (
                                <div key={index} className="col-lg-6">
                                    <Col key={index} id={destination.id} span={25}>
                                        <div className="card card-profile mt-5">
                                            <Row >

                                                <Col span={8} className="mt-n4" >
                                                    <div className="p-2 pe-md-0">
                                                        <img
                                                            className="w-100 h-100 border-radius-md shadow-lg"
                                                            src={destination.photo}
                                                            alt="image"
                                                            onClick={() => {
                                                                navigate('./destination')
                                                            }}

                                                        />
                                                    </div>
                                                    <div className="dropdown" style={{ marginLeft: '.6rem' }}>
                                                        <button
                                                            className="btn bg-gradient-warning dropdown-toggle"
                                                            type="button"
                                                            id={`dropdownMenuButton-${index}`}
                                                            data-bs-toggle="dropdown"
                                                            aria-expanded="false"
                                                            onClick={() => {
                                                                setSelectedItem(destination.id)
                                                            }}
                                                        >
                                                            Possible trip
                                                        </button>

                                                        {/* Fetch destination areas for each destination */}
                                                        <div className="dropdown-menu" aria-labelledby={`dropdownMenuButton-${index}`}>
                                                            <FetchDestinationAreasButton key={index} destinationID={destination.id} areaName={destination.title} />
                                                        </div>
                                                    </div>
                                                </Col>
                                                <Col span={16} className="my-auto" style={{ paddingLeft: '1rem' }}>
                                                    <div className="card-body ps-lg-0" style={{ textAlign: 'start' }}>
                                                        <h5 className="mb-0 text-info">{destination.title}</h5>
                                                        <p className="mb-0">
                                                            <span>
                                                                <ParagraphWithLimit text={destination.description} limit={20} />
                                                            </span>
                                                        </p>
                                                        <div className='row'>
                                                            <div className='col-md-6'>
                                                                <div style={{ textAlign: 'start' }}>
                                                                    <a onClick={() => {
                                                                        navigate(`/destination/${destination.id - 1}`)
                                                                    }} type='link' href="javascript:;" class="text text-sm icon-move-right" >Read more
                                                                        <i class="fas fa-arrow-right text-xs ms-1"></i>
                                                                    </a>
                                                                </div>
                                                            </div>
                                                            <div className='col-md-6'>
                                                                <div style={{ textAlign: 'end' }}>
                                                                    <span className='m-1'><i className="fa fa-sun m-1 text-blue"></i>Days</span>
                                                                    <span className='m-1'><i className="fa fa-moon m-1"></i>Nigths</span>
                                                                </div>
                                                            </div>
                                                        </div>


                                                    </div>
                                                </Col>
                                            </Row>
                                        </div>
                                    </Col>
                                </div>
                            ))}
                        </div>
                    </Row>
                </div>
            </div>
        </>
    );
}

export default HomeDestination;