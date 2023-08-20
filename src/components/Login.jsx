import React, { useState } from 'react';
import { Link , useNavigate} from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2'; 
import '../style/login.css';

const Login = () => {
   const navigate = useNavigate()
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [errorMessage, setErrorMessage] = useState('');

   const handleLogin = async (e) => {
      e.preventDefault();

      try {
         const response = await axios.post('http://localhost:8000/user/login', {
            email: email,
            password: password,
         });

         console.log('Server Response:', response.data.token);

         if (response.status === 200) {
            Swal.fire({
               title: 'Login Successful',
               text: 'You have successfully logged in!',
               icon: 'success',
               showConfirmButton: false,
               timer: 3000,
            });

            localStorage.setItem('authToken', response.data.token);
            navigate('/home')

         } else {
            setErrorMessage(response.data.msg || 'Login failed. Please try again.');
         }
      } catch (error) {
         console.error('Error logging in:', error);
         setErrorMessage('An error occurred while logging in. Please try again later.');
      }
   };

   return (
      <div>
         <section className="vh-100">
            <div className="container">
               <div className="row">
                  <div className="col-sm-4">
                     <form style={{ width: '25rem' }} onSubmit={handleLogin}>
                        <h3 className="fw-normal mb-3 pb-3" style={{ letterSpacing: '1px' }}>Login</h3>
                        <div className="form-outline mt-2 mb-4">
                           <input
                              type="email"
                              className="form-control form-control-lg"
                              placeholder="Email.."
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                           />
                        </div>
                        <div className="form-outline mt-5 mb-4">
                           <input
                              type="password"
                              className="form-control form-control-lg"
                              placeholder="Password..."
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                           />
                        </div>
                        <div className="pt-3 mb-4">
                           <button className="btn btn-info btn-lg btn-block ps-5 pe-5" type="submit">
                              Login
                           </button>
                        </div>
                        {errorMessage && <p className="text-danger">{errorMessage}</p>}
                        <p className="small mb-1 pb-lg-2">
                           <a className="text-muted" href="#!">Forgot password?</a>
                        </p>
                        <p>
                           Don't have an account? <Link to="/sign">Register here</Link>
                        </p>
                     </form>
                  </div>
                  <div className="col-sm-6 offset-2 px-0 d-none d-sm-block">
                     <img
                        src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img3.webp"
                        alt="Login"
                        style={{ objectFit: 'cover', objectPosition: 'left', width: '70%', height: '70%' }}
                     />
                  </div>
               </div>
            </div>
         </section>
      </div>
   );
};

export default Login;
