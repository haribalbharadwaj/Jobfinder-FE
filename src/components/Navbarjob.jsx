import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Nav3 from '../assets/nav3.png';
import Nav2 from '../assets/nav2.png';
import Nav1 from '../assets/nav1.png';
import User from '../assets/userImage.png';

function Navbarjob() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    sessionStorage.clear();
    setIsLoggedIn(false);
  };

  const handleLogin = () => {
    window.location.href = '/login';
  };

  const handleRegister = () => {
    window.location.href = '/signup';
  };

  return (
    <>
      <Navbar>
        <Container>
          <Nav
            className="me-auto"
            style={{
              width: '1512px',
              height: '139px',
              gap: '0px',
              borderRadius: '0px 0px 62px 55px',
              opacity: '0px',
              backgroundColor: '#ED5353',
              top: '0px',
              position: 'absolute',
              zIndex: '1'
            }}
          >
            <img
              src={Nav3}
              style={{
                width: '407.5px',
                height: '139px',
                left: '1040px',
                position: 'absolute',
                zIndex: '0'
              }}
            />
            <img
              src={Nav2}
              style={{
                width: '390px',
                height: '105px',
                left: '509px',
                position: 'absolute',
                zIndex: '0'
              }}
            />
            <img
              src={Nav1}
              style={{
                width: '349px',
                height: '63px',
                top: '76px',
                left: '0px',
                position: 'absolute',
                zIndex: '0'
              }}
            />

            {isLoggedIn ? (
              <>
                <button
                  onClick={handleLogout}
                  style={{
                    position: 'absolute',
                    zIndex: '2', // Ensure the button is above other elements
                    left: '1100px',
                    top: '52px',
                    width: '75px',
                    height: '0px',
                    background: '#FF6B6B',
                    borderRadius: '7px',
                    color: '#FFFFFF',
                    fontFamily: 'DM Sans, sans-serif',
                    fontSize: '23px',
                    fontWeight: '500',
                    textAlign: 'left'
                  }}
                >
                  Logout
                </button>
                <p
                  style={{
                    width: '166px',
                    height: '33px',
                    top: '52px',
                    left: '1210px',
                    gap: '0px',
                    opacity: '0px',
                    fontFamily: 'DM Sans,sans-serif',
                    fontSize: '23px',
                    fontWeight: '500',
                    lineHeight: '10.13px',
                    textAlign: 'center',
                    color: '#FFFFFF',
                    position: 'absolute'
                  }}
                >
                  Hello! Recruiter
                </p>
                <img
                  src={User}
                  style={{
                    width: '54px',
                    height: '54px',
                    top: '45px',
                    left: '1394px',
                    gap: '0px',
                    borderRadius: '27.64px 27.64px 27.64px 27.64px',
                    opacity: '0px',
                    position: 'absolute'
                  }}
                />
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/login">
                  <button
                    style={{
                      width: '113px',
                      height: '46px',
                      left: '1190px',
                      top: '44px',
                      gap: '0px',
                      borderRadius: '7px 7px 7px 7px',
                      opacity: '0px',
                      background: '#FF6B6B',
                      border: '2px solid #FFFFFF',
                      position: 'absolute',
                      zIndex: '2'
                    }}
                  >
                    <span
                      style={{
                        fontFamily: 'DM Sans,sans-serif',
                        fontSize: '23px',
                        fontWeight: '500',
                        top: '20px',
                        lineHeight: '0px',
                        textAlign: 'center',
                        color: '#FFFFFF',
                        left: '25px',
                        position: 'absolute',
                        zIndex: '2'
                      }}
                    >
                      Login
                    </span>
                  </button>
                </Nav.Link>

                <Nav.Link as={Link} to="/signup">
                  <button
                    style={{
                      width: '113px',
                      height: '46px',
                      top: '44px',
                      left: '1327px',
                      gap: '0px',
                      borderRadius: '7px 7px 7px 7px',
                      opacity: '0px',
                      background: '#FFFFFF',
                      position: 'absolute',
                      zIndex: '2'
                    }}
                  >
                    <span
                      style={{
                        fontFamily: 'DM Sans,sans-serif',
                        fontSize: '23px',
                        fontWeight: '500',
                        top: '20px',
                        lineHeight: '0px',
                        textAlign: 'center',
                        color: '#ED5353',
                        left: '15px',
                        position: 'absolute',
                        border: '2px solid #FFFFFF'
                      }}
                    >
                      Register
                    </span>
                  </button>
                </Nav.Link>
              </>
            )}

            <span
              style={{
                width: '140px',
                height: '43px',
                top: '42px',
                left: '79px',
                position: 'absolute',
                fontFamily: 'DM Sans,sans-serif',
                fontSize: '30px',
                fontWeight: '700',
                textAlign: 'center',
                color: '#FFFFFF'
              }}
            >
              Jobfinder
            </span>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default Navbarjob;
