import React, { useContext, useEffect, useState } from 'react';
import { Button } from 'antd';
import axios from '../../../../api/axios';
import AuthContext from '../../../../context/AuthProvider';

function Password() {
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  const { auth } = useContext(AuthContext);
  const { user_id } = auth;

  const handleChangePassword = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(`api/change-password/${user_id}/`, {
        password: password,
        new_password: newPassword,
        confirm_password: confirmNewPassword
      });
      console.log(response.data.message); // Password change success message
      // Add your own logic here for handling success or displaying a success message to the user
    } catch (error) {
      console.log('Error changing password:', error);
      // Add your own logic here for handling error or displaying an error message to the user
    }
  };

  return (
    <>
      <div id='password'>
        <div className="container d-flex justify-content-center py-3">
          <hr className="mt-0 mb-1" />
          <div className="row py-7">
            <div className="col-md-12">
              <div className="mb-2">
                <div className="text-center">
                  <span style={{ fontSize: "1.3rem" }}>Change Password</span>
                </div>
                <div className='card-body'>
                  <form onSubmit={handleChangePassword}>
                    <div className="row">
                      <div className="col-md-12">
                        <label className="small mb-1" htmlFor="inputLastName">Old Password</label>
                        <input
                          className="form-control formControl"
                          id="inputLastName"
                          type="password"
                          placeholder="Enter your old password"
                          value={password}
                          onChange={(event) => setPassword(event.target.value)}
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <label className="small mb-1" htmlFor="inputFirstName">New Password</label>
                        <input
                          className="form-control formControl"
                          id="inputFirstName"
                          type="password"
                          placeholder="Enter your new password"
                          value={newPassword}
                          onChange={(event) => setNewPassword(event.target.value)}
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="small mb-1" htmlFor="inputLastName">Confirm New Password</label>
                        <input
                          className="form-control formControl"
                          id="inputLastName"
                          type="password"
                          placeholder="Confirm your new password"
                          value={confirmNewPassword}
                          onChange={(event) => setConfirmNewPassword(event.target.value)}
                        />
                      </div>
                    </div>
                    <div className="text-center">
                      <Button type="primary" htmlType="submit">Change</Button>
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

export default Password;
