import React, { useState, useEffect, useRef, useContext } from 'react'
import ButtonUtils from '../../../../utils/ButtonUtils'
import HowToRegIcon from '@mui/icons-material/HowToReg';
import Stack from 'rsuite/Stack';
import './LogIn.css';
import { Form, Button, Panel, IconButton, Divider } from 'rsuite';
import { Link, useNavigate } from 'react-router-dom';
import GithubIcon from '@rsuite/icons/legacy/Github';
import FacebookIcon from '@rsuite/icons/legacy/Facebook';
import GoogleIcon from '@rsuite/icons/legacy/Google';
import WechatIcon from '@rsuite/icons/legacy/Wechat';
import SignUp from '../SignUp/SignUp';
import ForgotPassword from '../ForgotPassword/ForgotPassword';
import TextField from '@mui/material/TextField';
import { Alert } from 'antd';
import AuthContext from '../../../../context/AuthProvider';
import axios from '../../../../api/axios'


export default function LogInPage() {

  const { setAuth } = useContext(AuthContext);
  // const [userRole, setUserRole] = useState(null);
  const [role, setRole] = useState('');
  const [user_id, setUserId] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const errRef = useRef();


  useEffect(() => {
    setError('');
  }, [email, password])

  function validateEmail(email) {
    // Email regex pattern for basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('login/', {
        email,
        password
      }, { withCredentials: true }); 

      console.log("logIn Data: ",response.data)

      setRole(response.data.role);
      setUserId(response.data.user_id);
      console.log(JSON.stringify(response?.data));
      const role = response?.data?.role;
      const user_id = response?.data?.user_id;
      const login_count = response?.data?.login_count;
      const is_verified = response?.data?.is_verified;
      const photo_url = response?.data?.photo_url;
      const customer_id = response?.data?.customer_id;
      const technician_id = response?.data?.technician_id;
      const status = response?.data?.status;

      // Check if login was successful
      if (is_verified === true && status === true) {
        if (response.data.message === 'Valid login') {
          // Check login count and role here

          if (login_count === 1 && role === 'technician') {
            console.log('Fill up the form to complete registretion');
            navigate('/technician');
            setAuth({ email, role, user_id, login_count, is_verified, photo_url, customer_id, technician_id });
            setEmail('');
            setPassword('');
            setIsValidEmail(true);
          } else if(login_count === 1 && role === 'customer') {
            navigate('/dashboard');
            console.log('Login successful');
            setAuth({ email, role, user_id, login_count, is_verified, photo_url,customer_id, technician_id });
            setEmail('');
            setPassword('');
            setIsValidEmail(true);
            const response = await axios.post('customers/create', {
              techUser:user_id
            }, { withCredentials: true }); 
          }
          else  {
            navigate('/dashboard');
            console.log('Login successful');
            setAuth({ email, role, user_id, login_count, is_verified, photo_url,customer_id, technician_id });
            setEmail('');
            setPassword('');
            setIsValidEmail(true);
          }
        }
      } 
      else {
        console.log('Account not verified yet, go to your Email, verify your account before logIn or contact with system administration');
        setError(<Alert type="error" message='Account not verified yet, go to your Email, verify your account before logIn.' banner />);
      }

    } catch (error) {
      // Handle API errors
      console.error('Error:', error.message);
      
      if (!email.trim() || !password.trim()) {
        setError(<Alert type="error" message='Please fill Email and Password to logIn.' banner />);
      } else {
        setError('');
        setError(<Alert type="error" message='Invalid credentials.' banner />);

      }
    }
  };

  function handleChange(event) {
    const { value } = event.target;
    setEmail(value);
    setIsValidEmail(validateEmail(value));
  }



  return (

    <Stack direction="column" spacing={15} alignItems="center">
      <div className='panel'>
        <Panel bordered
          style={{ background: '#fff', width: 370, marginTop: '8rem' }}
          header={<h3>Sign In</h3>}>
          <p style={{ marginBottom: 10 }}>
            <span className="text-muted">New Here? </span>{' '}
            <Link to="/SignUp" element={SignUp}>
              <ButtonUtils
                label="Sign up"
                Apppearance="link"
                startbuttonIcon={<HowToRegIcon />}
                endbuttonIcon
              />
            </Link>
          </p>

          <Form>
            <Form.Group>
              <TextField
                margin="dense"
                label="User Email"
                variant="standard"
                type="text"
                fullWidth
                required
                value={email}
                onChange={handleChange}
                error={!isValidEmail}
                autoFocus
              />
              {!isValidEmail &&
                <Alert type="error" message="Invalid email address" banner />
              }
              <TextField
                margin="dense"
                variant="standard"
                label="Password"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                fullWidth
                required />

              {error && <p>{error}</p>}

              <Form.ControlLabel>
                <a style={{ float: 'right' }}>
                  <Link to="/ForgotPassword" element={ForgotPassword}>
                    Forgot password?
                  </Link>
                </a>
              </Form.ControlLabel>

            </Form.Group>

            <Form.Group>
              <Stack spacing={6} divider={<Divider vertical />}>
                {/* <Link to="/admin" element={Admin}> */}

                <Button
                  disabled={!isValidEmail ? true : false}
                  type="submit"
                  appearance="primary"
                  size='sm'
                  onClick={handleSubmit}
                >Sign in</Button>
                {/* </Link> */}

                <Stack spacing={6}>
                  <IconButton icon={<WechatIcon />} appearance="subtle" />
                  <IconButton icon={<GithubIcon />} appearance="subtle" />
                  <IconButton icon={<FacebookIcon />} appearance="subtle" />
                  <IconButton icon={<GoogleIcon />} appearance="subtle" />
                </Stack>
              </Stack>
            </Form.Group>
          </Form>
        </Panel>
      </div>
    </Stack>
  )
}
