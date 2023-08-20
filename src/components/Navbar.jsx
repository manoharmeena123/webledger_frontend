import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../style/navbar.css'
const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState(''); 
  const navigate = useNavigate(); 

  const handleSearch = () => {
    navigate(`/home?query=${searchQuery}`);
  };

  return (
    <div className="container mt-5 mb-5" id="navbar">
      <div className="row mt-4 mb-4">
        <div className="col-sm-2">
          <h2>
            <Link to="/home" className="text-decoration-none">
              WebLedger
            </Link>
          </h2>
        </div>
        <div className="col-sm-7  mb-md-0 mb-3 offset-1">
          <div className="search">
            <input
              placeholder="Search..."
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit" onClick={handleSearch}>
              Go
            </button>
          </div>
          
        </div> 
         <div className="col-sm-1 pt-1">
          <Link to="/sign" className="text-decoration-none">
            Signup
          </Link>
        </div>
        <div className="col-sm-1 pt-1">
          <Link to="/login" className="text-decoration-none">
            Login
          </Link>
        </div>
      
      </div>
      <hr />
    </div>
  );
};

export default Navbar;
