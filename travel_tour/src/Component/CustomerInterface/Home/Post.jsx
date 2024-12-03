import React from 'react';
import { Form, Input } from 'rsuite';
import ControlledCarousel from '../../../utils/carousel/ControlledCarousel';
import { useQuery } from 'react-query';
import { fetchAboutById } from '../../../api/AboutAPI';
import { useNavigate } from 'react-router-dom';
import { Button } from 'antd';

const Textarea = React.forwardRef((props, ref) => <Input {...props} as="textarea" ref={ref} />);

export const Post = () => {
    const aboutId = 1;
    const { data: aboutData, isLoading, isError } = useQuery(['post', aboutId], () => fetchAboutById(aboutId));
    const navigate = useNavigate();

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error loading content</div>;

    return (
        <div className="row align-items-center py-2"> {/* Reduced padding */}
            {/* Left Section */}
            <div className="col-md-4">
                <div className="content-left text-start">
                    {aboutData && (
                        <>
                            <div className="py-1">
                                <h5 className="card-title text py-1" style={{ fontSize: '1.3rem' }}>
                                    {aboutData.title || 'No Title Available'}
                                </h5>
                                <h5 className="card-title text" style={{ fontSize: '1.1rem' }}>
                                    {aboutData.subtitle || 'No Subtitle Available'}
                                </h5>
                            </div>
                            <p className="card-description text py-1" style={{ fontSize: '1rem' }}>
                                {aboutData.description || 'No Description Available'}
                            </p>
                        </>
                    )}
                    <button
                        onClick={() => navigate('/booking')}
                        className="btn btn-link text text-sm icon-move-right"
                        style={{ textDecoration: 'none', color: 'inherit' }}
                    >
                        Booking Now
                        <i className="fas fa-arrow-right text-xs ms-1"></i>
                    </button>
                </div>
            </div>

            {/* Right Section */}
            <div className="col-md-8 mb-3" style={{ height: '10px' }}> {/* Reduced padding */}
                <div style={{ height: '300px', overflow: 'hidden' }}> {/* Set a fixed height for the carousel */}
                    <ControlledCarousel />
                </div>
            </div>
        </div>
    );
};
