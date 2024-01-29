import React from 'react'
import { Form, Input, ButtonToolbar } from 'rsuite';
import ControlledCarousel from '../../../utils/carousel/ControlledCarousel';
import { useQuery } from 'react-query';
import { fetchAboutById, fetchAbout } from '../../../api/AboutAPI';
import { useNavigate } from 'react-router-dom';
import { Button } from 'antd';



const Textarea = React.forwardRef((props, ref) => <Input {...props} as="textarea" rf={ref} />);


export const Post = () => {

    const aboutId = 1;
    const { data: aboutData, isLoading, isError } = useQuery(['post', aboutId], () => fetchAboutById(aboutId));
    const navigate = useNavigate();

    if (isLoading) return <div>Loading...</div>;

    if (isError) return <div>Error loading tasks</div>;


    return (


        <div className="row align-items-center py-3">
            <div class="col-md-4">
                {/* <div class="full-background" style={{ backgroundImage: "linear-gradient(rgba(214, 212, 212, 0), rgba(190, 186, 186, 0.048)), url(./tech6.jpg)" }} loading="lazy"></div> */}
                <div class="content-left text-start">
                    {/* {abouts.map((about, index) => ( */}
                    <>
                        <div className='py-1'>
                            <h5 class="card-title text py-1" style={{ fontSize: '1.5rem' }}>
                                {aboutData.title}
                            </h5>
                            <h5 class="card-title text" style={{ fontSize: '1.3rem' }}>
                                {aboutData.subtitle}
                            </h5>
                        </div>
                        <p class="card-description text py-1">
                            {aboutData.description}
                        </p>
                        {/* ))} */}
                    </>
                    <a onClick={()=>{
                        navigate('/booking')
                    }} type='link' href="javascript:;" class="text text-sm icon-move-right" >Booking Now
                        <i class="fas fa-arrow-right text-xs ms-1"></i>
                    </a>
                </div>
            </div>

            <div className='col-md-8 mb-4 '>
                {/* <h2 style={{ textAlign: 'start', fontSize: '1.6rem' }}>Our Latest Post.</h2> */}
                <ControlledCarousel />
            </div>

        </div>




    )
}
