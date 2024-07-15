import React, { useState } from 'react';
import axios from 'axios';
import sideImage from '../assets/side_image.png';
import { useNavigate } from 'react-router-dom';

const BACKEND_URL = process.env.Jobfinder_BACKEND_URL;


function Signup() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');
    const [password, setPassword] = useState('');
    const [agreed, setAgreed] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!agreed) {
            alert('You must agree to the terms and conditions to sign up.');
            return;
        }

        const userData = { name, email, mobile, password };

        try {
            const response = await axios.post(`${BACKEND_URL}/users/signup`, userData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            console.log('Form submitted successfully', response.data);
            setSuccess('Account created successfully!');
            setError('');

            // Optionally clear the form fields
            setName('');
            setEmail('');
            setMobile('');
            setPassword('');
            setAgreed(false);
        } catch (error) {
            console.error('Error submitting form', error);
            if (error.response) {
                console.error('Response data:', error.response.data);
                console.error('Response status:', error.response.status);
                console.error('Response headers:', error.response.headers);
                setError(`Failed to create account: ${error.response.data.message || 'Please try again.'}`);
            } else if (error.request) {
                console.error('Request data:', error.request);
                setError('No response received from the server. Please try again.');
            } else {
                console.error('Error message:', error.message);
                setError(`Failed to create account: ${error.message}. Please try again.`);
            }
            setSuccess('');
        }
    };

    const handleSignin = ()=>{
        navigate('/login')
    }

    return (
        <div style={{width:'1480px',height: '880px',top: '-630px',
            left: '-2449px',gap: '0px',opacity: '0px',xolor:'#FFFFFF'
            }}>
            <h1 style={{width:'360px',height:'58px',top:'133px',left:'80px',
                fontFamily:'DM Sans,sans-serif',fontSize:'40px',fontWeight:'700',lineHeight:'57.61px',
                textAlign:'center' }} >
                    Create an account </h1>

            <p style={{width:'307px',height:'30px',top:'194px',left:'82px',gap:'0px',opacity:'0px',
            fontFamily:'DM Sans,sans-serif',fontSize:'21px',fontWeight:'500',lineHeight:'30.24px',
            textAlign:'center'            
            }}>Your personal job finder is here</p>

            <form onSubmit={handleSubmit} id='form'>
                <div>
                    <input 
                    style={{width:'599px',height:'64px',top:'257px',left: '90px',gap:'0px',borderRadius:'5px 0px 0px 0px',
                        border: '2px 0px 0px 0px',opacity:'0px',position:'absolute',fontFamily:'DM Sans,sans-serif',
                        fontSize:'20px',fontWeight:'500',lineHeight:'28.8px',paddingLeft:'26px',borderColor:'#C2C2C2'
                        }}
                        id="name"
                        name="name"
                        type='text'
                        value={name}
                        placeholder='Name'
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div>
                    
                    <input 
                        style={{width:'599px',height:'64px',top:'354px',left: '90px',gap:'0px',borderRadius:'5px 0px 0px 0px',
                            border: '2px 0px 0px 0px',opacity:'0px',position:'absolute',fontFamily:'DM Sans,sans-serif',
                            fontSize:'20px',fontWeight:'500',lineHeight:'28.8px',paddingLeft:'26px',borderColor:'#C2C2C2'
                            }}
                        id="email"
                        name="email"
                        type='email'
                        value={email}
                        placeholder='Email'
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div>
                    
                    <input
                        style={{width:'599px',height:'64px',top:'451px',left: '90px',gap:'0px',borderRadius:'5px 0px 0px 0px',
                            border: '2px 0px 0px 0px',opacity:'0px',position:'absolute',fontFamily:'DM Sans,sans-serif',
                            fontSize:'20px',fontWeight:'500',lineHeight:'28.8px',paddingLeft:'26px',borderColor:'#C2C2C2'
                            }}
                        id="mobile"
                        name="mobile" 
                        type='text'
                        value={mobile}
                        placeholder='Mobile'
                        onChange={(e) => setMobile(e.target.value)}
                    />
                </div>
                <div>
                   
                    <input 
                        style={{width:'599px',height:'64px',top:'548px',left: '90px',gap:'0px',borderRadius:'5px 0px 0px 0px',
                            border: '2px 0px 0px 0px',opacity:'0px',position:'absolute',fontFamily:'DM Sans,sans-serif',
                            fontSize:'20px',fontWeight:'500',lineHeight:'28.8px',paddingLeft:'26px',borderColor:'#C2C2C2'
                            }}
                        id="password"
                        name="password"
                        type='password'
                        value={password}
                        placeholder='Password'
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div>
                    <input 
                        style={{width:'15px',height:'11.49px',top:'650.92px',left:'92px',gap:'0px',opacity:'0px',
                            position:'absolute',color:'#858585'
                            }}
                        type='checkbox'
                        id="agreed"
                        name="agreed"
                        checked={agreed}
                        onChange={(e) => setAgreed(e.target.checked)}
                    />
                    <label htmlFor="agreed" style={{width:'563px',height:'24px',top:'645px',
                    left:'100px',gap:'0px',opacity:'0px',position:'absolute'
                    }}>By creating an account, I agree to our terms of use and privacy policy</label>
                </div>
                <button 
                style={{width:'277px',height:'63.92px',top:'707px',left:'90px',gap:'0px',
                    borderRadius:'5px 0px 0px 0px',opacity:'0px',position:'absolute',backgroundColor:'#ED5353'
                }}
                type='submit'>
                    <p
                    style={{
                        fontFamily: 'DM Sans,sans-serif',fontSize:'27.79px',fontWeight:'700',
                        lineHeight:'0.03px',textAlign:'center',color: '#FFFFFF'
                    }}>Create Account</p></button>
                    <p style={{
                        width:'257px',height:'30px',top:'785px',left:'90px',gap:'0px',
                        opacity:'0px',position:'absolute',fontFamily:'DM Sans,sans-serif',
                        fontSize:'21px',fontWeight:'500',lineHeight:'30.24px',textAlign:'center',
                        color:'#525252'
                        }}>Already have an account?</p>
                    <button onClick={handleSignin}
                    style={{
                        width:'120px',height:'30px',top:'800px',left:'357px',gap:'0px',opacity:'0px',fontFamily:'DM Sans,sans-serif',
                        fontSize:'21px',fontWeight:'500',lineHeight:'5.24px',textAlign:'center',color:'#000000',position:'absolute',
                        border:'#FFFFFF'                        
                        }}>Sign In</button>
            </form>
            <img src={sideImage} style={{width:'696.47px',height:'982.57px',left:'816px',
            gap:'0px',opacity:'0px',position:'absolute',top:'0px'}}/>
            <p style={{width:'465px',height:'58px',top:'63px',left:'931px',gap:'0px',opacity:'0px',
                color:'#FFFFFF',fontFamily:'DM Sans,sans-serif',fontSize:'40px',fontWeight:'500',
                lineHeight:'57.61px',textAlign: 'center',position:'absolute'}}>Your Personal Job Finder</p>
        </div>
    );
}

export default Signup;
