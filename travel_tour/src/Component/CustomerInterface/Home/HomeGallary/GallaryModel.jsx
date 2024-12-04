import React, { useState } from 'react';
import { Modal, Button } from 'rsuite';
import { Card } from 'antd';
import { Panel } from 'rsuite';
import { Carousel } from 'rsuite';
import { fetchExcursionById, fetchExcursionsPhotos } from '../../../../api/ExcursionAPI';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import '../../../../utils/carousel/carousel.css';
// import { Carousel } from "react-bootstrap";
import ControlledCarousel from '../../../../utils/carousel/ControlledCarousel';


const GallaryModel = ({ toursId }) => {

    const { Meta } = Card;
    const navigate = useNavigate();

    const [open, setOpen] = useState(false);
    const [size, setSize] = useState();
    const handleOpen = value => {
        setSize(value);
        setOpen(true);
    };
    const handleClose = () => setOpen(false);



    // fetch tour by id
    const { data: tourData, isLoading, isError } = useQuery(['tourData', toursId], () => fetchExcursionById(toursId));
    const { data: excursionPhotos, isLoadingPhoto, isErrorPhoto } = useQuery('excursionPhotos', fetchExcursionsPhotos);

    if (isLoading || isLoadingPhoto) return <div>Loading...</div>;

    if (isError || isErrorPhoto) return <div>Error loading tour</div>;

    // console.log(toursId)

    return (
        <>
            <span size="lg" onClick={() => handleOpen('full')}>
                Read More
            </span>

            <Modal backdrop='static' size={size} open={open} onClose={handleClose}>
                <Modal.Header>
                    <Modal.Title>Tours</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Panel>
                        <div className='row py-1'>
                            <div className='col-md-6 py-2'>
                                <Card
                                    hoverable
                                    style={{
                                        width: 555,
                                    }}
                                >
                                    <Meta className='py-1 mb-2' title={tourData.title} description={tourData.longDescription} />
                                    <Meta className='py-1' title="Tour highlight" description={tourData.highlight} />
                                    <div className="py-3" style={{ textAlign: 'start' }}>
                                        <h5>
                                            <span className=' m-1 p-1 text-black' style={{ backgroundColor: '#ff5722' }}>Price Per Person: {tourData.price}</span>
                                        </h5>
                                    </div>
                                </Card>
                            </div>
                            <div className='col-md-6 py-1'>

                                <Carousel autoplay className="custom-slider">
                                    {excursionPhotos?.map((item, index) => (
                                        (item.excursions === tourData.id) ? (
                                            <img
                                                key={index}
                                                alt={item.id}
                                                src={item.image}
                                                height='100%'
                                            />
                                        ) : null
                                    ))}
                                </Carousel>

                                <div className='row py-2'>
                                    <div className='col-md-12'>
                                        <Card
                                            hoverable
                                            style={{
                                                width: 540,
                                            }}
                                        >
                                            <Meta className='py-1 mb-2' title='Tour inclusion' description={tourData.inclusion} />
                                            <Meta className='py-1' title="Tour exclusion" description={tourData.exclusion} />

                                        </Card>
                                    </div>
                                </div>
                            </div>
                        </div>
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

export default GallaryModel;




