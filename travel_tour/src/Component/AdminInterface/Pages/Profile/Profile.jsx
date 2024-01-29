import React, { useContext, useEffect, useState } from 'react';
import './profile.scss';
import './profile.scss';
import axios from '../../../../api/axios';
import AuthContext from '../../../../context/AuthProvider';


function Profile() {
    const [userById, setUsersById] = useState([]);

    const { auth } = useContext(AuthContext);
    const { user_id } = auth;
    
    useEffect(() => {
        fetchData();
    }, [user_id]);

    const fetchData = async () => {
        try {
            const allUsers = `user/detail/${user_id}/`;
            const response = await axios.get(allUsers);

            // Format the reg_date
            const formattedRegDate = new Date(response.data.reg_date).toLocaleString();

            // Update the reg_date value in the response data
            response.data.reg_date = formattedRegDate;

            setUsersById(response.data)
            // console.log(response.data)
    
        } catch (error) {
            console.log('Error fetching data:', error);
        }
    };
    

    return (

        <>
            <div id='profile'>
            
                <div className="container d-flex justify-content-center ">

                    <hr className="mt-0 mb-1" />
                    <div className="row py-3">
                        <div className="col-md-12">

                            <div className="cardBoy">
                                <div className="text-center textCenter">

                                    <img className="img-account-profile rounded-circle" src={userById?.photo} alt="" />

                                </div>
                                <div className='card-body'>
                                    <form>
                                        <div className="row ">

                                            <div className="col-md-4">
                                                <label className="small mb-1" for="inputFirstName" >First name</label>
                                                <input className="form-control formControl" id="inputFirstName" type="text" placeholder="Enter your first name" value={userById?.first_name} />
                                            </div>

                                            <div className="col-md-4">
                                                <label className="small mb-1" for="inputLastName">Mid name</label>
                                                <input className="form-control formControl" id="inputLastName" type="text" placeholder="Enter your last name" value={userById?.mid_name} />
                                            </div>

                                            <div className="col-md-4">
                                                <label className="small mb-1" for="inputLastName">Last name</label>
                                                <input className="form-control formControl" id="inputLastName" type="text" placeholder="Enter your last name" value={userById?.last_name} />
                                            </div>

                                        </div>

                                        {/* <div className="row ">
                                           
                                        </div> */}

                                        <div className="row">

                                            <div className="col-md-6">
                                            <label className="small mb-1" for="inputEmailAddress">Email address</label>
                                            <input className="form-control formControl" id="inputEmailAddress" type="email" placeholder="Enter your email address" value={userById?.email} />
                                            </div>

                                            <div className="col-md-6">
                                                <label className="small mb-1" for="inputLocation">Location</label>
                                                <input className="form-control formControl" id="inputLocation" type="text" placeholder="Enter your location" value={userById?.address} />
                                            </div>

                                            <div className="col-md-6">
                                                <label className="small mb-1" for="inputPhone">Phone number</label>
                                                <input className="form-control formControl" id="inputPhone" type="tel" placeholder="Enter your phone number" value={userById?.phone_number} />
                                            </div>

                                            <div className="col-md-6">
                                                <label className="small mb-1" for="inputBirthday">Reg date</label>
                                                <input className="form-control formControl" id="inputBirthday" type="text" name="birthday" placeholder="Enter your birthday" value={userById?.reg_date} />
                                            </div>
                                        </div>

                                        <div className="row d-flex justify-content-center">
                                        <div className="col-md-10">

                                        {/* <div className="mb-3">
                                            <label className="small mb-1" for="inputEmailAddress">Email address</label>
                                            <input className="form-control" id="inputEmailAddress" type="email" placeholder="Enter your email address" value={userById.email} />
                                        </div> */}
                                        
                                        </div>
                                        </div>

                                    </form>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>

    );
}

export default Profile;



  // find user by id
            // const user = response.data.find(user => user.id === user_id);
            
            // if (user) {
            //     console.log('User found:', user);
            //     // Do something with the user
            // } else {
            //     console.log('User not found');
            // }