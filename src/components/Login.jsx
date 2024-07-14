import React ,{useState} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import sideImage from '../assets/side_image.png';


function Login() {

    const [email, setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async(e)=>{
        e.preventDefault()

        if(!email || !password){
            console.error('Provide email address and password')
            return;
        }

        const userData = {email,password};

        try{
            const response = await axios.post(`http://localhost:4000/users/login`,userData,{
                headers:{
                    'Content-Type': 'application/json'
                }
            });

            console.log("User logged in successfully", response.data);
            localStorage.setItem('authToken', response.data.token); 
            setSuccess('User logged in successfully!');
            setError('')
            setEmail('');
            setPassword('');

            navigate('/')
        }catch(error){
            console.log('Error in login', error);
            setError('Error in login. Please try again.');
            setSuccess('');
        }
    }
  return (
    <div  style={{width:'1480px',height: '880px',top: '-630px',
        left: '-2449px',gap: '0px',opacity: '0px',color:'#FFFFFF'
        }}>
        <h1 style={{width:'501px',height:'58px',top:'209px',left:'80px',
                fontFamily:'DM Sans,sans-serif',fontSize:'40px',fontWeight:'700',lineHeight:'57.61px',
                textAlign:'center',position:'absolute'}}>Already have an account?</h1>
        <p style={{width:'307px',height:'30px',top:'270px',left:'82px',gap:'0px',opacity:'0px',
            fontFamily:'DM Sans,sans-serif',fontSize:'21px',fontWeight:'500',lineHeight:'30.24px',
            textAlign:'center',position:'absolute'            
            }}>Your personal job finder is here</p>
        <form onSubmit={handleSubmit}>
            <div>
                <input
                style={{width:'599px',height:'64px',top:'353px',left: '90px',gap:'0px',borderRadius:'5px 0px 0px 0px',
                    border: '2px 0px 0px 0px',opacity:'0px',position:'absolute',fontFamily:'DM Sans,sans-serif',
                    fontSize:'20px',fontWeight:'500',lineHeight:'28.8px',paddingLeft:'26px',borderColor:'#C2C2C2'
                    }} 
                id='email'
                placeholder='Email'
                name='email'
                type='email'
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                />
            </div>
            <div>
                <input
                style={{width:'599px',height:'64px',top:'441px',left: '90px',gap:'0px',borderRadius:'5px 0px 0px 0px',
                    border: '2px 0px 0px 0px',opacity:'0px',position:'absolute',fontFamily:'DM Sans,sans-serif',
                    fontSize:'20px',fontWeight:'500',lineHeight:'28.8px',paddingLeft:'26px',borderColor:'#C2C2C2'
                    }} 
                id='password'
                placeholder='Password'
                name='password'
                type='password'
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                />
            </div>
            <button 
              style={{width:'277px',height:'63.92px',top:'553px',left:'90px',gap:'0px',
                borderRadius:'5px 0px 0px 0px',opacity:'0px',position:'absolute',backgroundColor:'#ED5353'
            }}
             type="submit">
                <p
                style={{
                    fontFamily: 'DM Sans,sans-serif',fontSize:'27.79px',fontWeight:'700',
                    lineHeight:'0.03px',textAlign:'center',color: '#FFFFFF'
                }}
                >Sign in</p></button>
            <p
            style={{
                width:'257px',height:'30px',top:'631px',left:'90px',gap:'0px',
                opacity:'0px',position:'absolute',fontFamily:'DM Sans,sans-serif',
                fontSize:'21px',fontWeight:'500',lineHeight:'30.24px',textAlign:'center',
                color:'#525252'
                }}
            >Don’t have an account?</p>
            <a href="/Signup"
            style={{
                width:'120px',height:'30px',top:'660px',left:'357px',gap:'0px',opacity:'0px',fontFamily:'DM Sans,sans-serif',
                fontSize:'21px',fontWeight:'500',lineHeight:'5.24px',textAlign:'center',color:'#000000',position:'absolute',
                border:'#FFFFFF'                        
                }}
            >Signup</a>
        </form>
        <img src={sideImage} style={{width:'696.47px',height:'982.57px',left:'816px',
            gap:'0px',opacity:'0px',position:'absolute',top:'0px'}}/>
            <p style={{width:'465px',height:'58px',top:'63px',left:'931px',gap:'0px',opacity:'0px',
                color:'#FFFFFF',fontFamily:'DM Sans,sans-serif',fontSize:'40px',fontWeight:'500',
                lineHeight:'57.61px',textAlign: 'center',position:'absolute'}}>Your Personal Job Finder</p>
    </div>
  )
}

export default Login