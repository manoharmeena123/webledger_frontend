import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/login.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post('http://localhost:8000/user/sign', {
        email: email,
        password: password
      });

      console.log('Server Response:', response);
      console.log('Server Response:', response.status);
      if (response.status === 200) {
        Swal.fire({
          title: response.data.msg || 'Signup Successful',
          text: response.data.response || 'You have successfully signed up!',
          icon: 'success',
          showConfirmButton: false,
          timer: 3000
        });

        navigate('/login');
      } else if (response.status === 409) {
        Swal.fire({
          title: 'User already exists',
          text: response.data.msg || 'User already exists. Please login.',
          icon: 'success',
          showConfirmButton: false,
          timer: 3000
        });
      }
    } catch (error) {
      console.error('Error signing up:', error);
      Swal.fire({
        title: 'Signup Error',
        text: 'An error occurred while signing up.',
        icon: 'error',
        showConfirmButton: false,
        timer: 3000
      });
    }
  };


  return (
    <div>
      <section className="vh-100">
        <div className="container">
          <div className="row">
            <div className="col-sm-4">
              <form style={{ width: '25rem' }}>
                <h3 className="fw-normal mb-3 pb-3" style={{ letterSpacing: '1px' }}>
                  Signup
                </h3>
                <div className="form-outline mt-2 mb-4">
                  <input
                    type="email"
                    id="form2Example18"
                    className="form-control form-control-lg"
                    placeholder="Email.."
                    onChange={e => setEmail(e.target.value)}
                  />
                </div>
                <div className="form-outline mt-5 mb-4">
                  <input
                    type="password"
                    id="form2Example28"
                    className="form-control form-control-lg"
                    placeholder="Password..."
                    onChange={e => setPassword(e.target.value)}
                  />
                </div>
                <div className="pt-3 mb-4">
                  <button className="btn btn-info btn-lg btn-block ps-5 pe-5" type="button" onClick={handleSignup}>
                    Signup
                  </button>
                </div>
                <p className="small mb-3 pb-lg-2">
                  <a className="text-muted" href="#!">
                    Forgot password?
                  </a>
                </p>
                <p>
                  Already have an account? <Link to="/login">Login here</Link>
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

export default Signup;
