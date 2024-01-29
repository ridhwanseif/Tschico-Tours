import React, { useState } from 'react';
import { Modal, Button } from 'rsuite';
import { Card } from 'antd';
import { Panel } from 'rsuite';
import { Carousel } from 'rsuite';
import { fetchDestinationAreaById, fetchDestinationsPhotos } from '../../../api/DestinationAPI';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';

const DestinationModel = ({ destinationsId }) => {

    const { Meta } = Card;
    const navigate = useNavigate();

    const [open, setOpen] = useState(false);
    const [size, setSize] = useState();
    const handleOpen = value => {
        setSize(value);
        setOpen(true);
    };
    const handleClose = () => setOpen(false);

    // fetch destination by id
    const { data: destinationData, isLoading, isError } = useQuery(['destinationData', destinationsId], () => fetchDestinationAreaById(destinationsId));
    const { data: destinationPhotos, isLoadingPhoto, isErrorPhoto } = useQuery('destinationPhotos', fetchDestinationsPhotos);

    if (isLoading || isLoadingPhoto) return <div>Loading...</div>;

    if (isError || isErrorPhoto) return <div>Error loading destination</div>;

    // console.log(destinationsId)

    return (
        <>
            <span size="md" onClick={() => handleOpen('full')}>
                Read More
            </span>

            <Modal backdrop='static' size={size} open={open} onClose={handleClose}>
                <Modal.Header>
                    <Modal.Title>destinations</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Panel>
                        <div className='row py-1'>
                            <div className='col-md-6'>
                                <Card
                                    hoverable
                                    style={{
                                        width: 550,
                                    }}
                                >

                                    <Meta title={destinationData.title} description={destinationData.longDescription} />
                                    <div className="py-3" style={{ textAlign: 'start' }}>
                                        <h5>
                                            <span className=' m-1 p-1 text-black'
                                                style={{ backgroundColor: '#ff5722' }}>Price: {destinationData.price}
                                            </span>
                                        </h5>
                                    </div>
                                </Card>
                            </div>
                            <div className='col-md-6'>
                                <Carousel autoplay className="custom-slider">
                                    {destinationPhotos?.map((item, index) => (
                                        (item.destinationArea === destinationData.id) ? (
                                            <img
                                                key={index}
                                                alt={item.id}
                                                src={item.image}
                                            // sizes='1rem'
                                            />
                                        ) : null
                                    ))}
                                </Carousel>
                            </div>
                        </div>
                        {/* <div className='row py-2'>
                            <div className='col-md-12'>
                                <QuiltedImageList />
                            </div>
                        </div> */}
                    </Panel>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={handleClose} appearance="subtle">
                        Cancel
                    </Button>
                    <Button
                        onClick={() => {
                            navigate('/booking')
                        }}
                        appearance="primary">
                        Booking
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default DestinationModel;




