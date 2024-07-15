import { useState } from "react";
import React from 'react';
import axios from 'axios';
import Wallpaper from '../assets/wallpaperAddjob.png';

function Addjob() {
    const [companyName,setCompanyName]= useState('');
    const [logoUrl,setLogoUrl]= useState('');
    const [jobPosition,setJobPosition]= useState('');
    const [salary,setSalary]= useState('');
    const [jobType,setJobType]= useState('');
    const [jobMode,setJobMode]= useState('');
    const [location,setLocation]= useState('');
    const [description,setDescription]= useState('');
    const [aboutCompany,setAboutCompany]= useState('');
    const [skillsRequired,setSkillsRequired]= useState('');
    const [information,setInformation]= useState('');
    const [success,setSuccess]=useState('');
    const [error,setError]= useState('');
 

    const handleSubmit = async(e)=>{
        e.preventDefault();

        const jobData = {
            companyName,
            logoUrl,
            jobPosition,
            salary: Number(salary),
            jobType,
            jobMode,
            location,
            description,
            aboutCompany,
            skillsRequired :skillsRequired.split(',').map(skill=>skill.trim()),
            information
          };
          console.log("Form submitted with data:", jobData);

          try {
            const token = localStorage.getItem('authToken');
            console.log("Retrieved token:", token);

            if(!token){
              setError('Authentication token not found. Please log in again.');
              setSuccess('');
              return;
            }
          
            const response = await axios.post('http://localhost:4000/addJob',jobData,{
              headers:{
                'Content-Type':'application/json',
                'Authorization': `Bearer ${token}`
              },
            });
            console.log('Error adding job:',response.data);
            setSuccess('Job added successfullly');
            setError('');
            setCompanyName('');
            setLogoUrl('');
            setJobPosition('');
            setSalary('');
            setJobType('');
            setJobMode('');
            setLocation('');
            setDescription('');
            setAboutCompany('');
            setSkillsRequired('');
            setInformation('');
            

          }catch(error){
            console.log('Error adding job',error.response ? error.response.data : error.message);
            setError('Error adding job.Please try again');
            setSuccess('');

          }

    };
    const handleCancel = () => {
      // Reset form fields
      setCompanyName('');
      setLogoUrl('');
      setJobPosition('');
      setSalary('');
      setJobType('');
      setJobMode('');
      setLocation('');
      setJobDescription('');
      setAboutCompany('');
      setSkillsRequired('');
      setInformation('');
    };


  return (
    <div style={{
      width: '1512px', height: '800px', top: '0px', left: '0', padding: '0'
    }}>
        <img
        src={Wallpaper}
        style={{
              width: '667px', height: '1007px', position: 'absolute', top: '0', left: '900px', padding: '0'
        }}
        />
        <p
        style={{
          width:'559px',height:'58px',top:'54px',left:'965px',gap:'0px',opacity:'0px',
          fontFamily:'DM Sans,sans-serif',fontSize:'40px',fontWeight:'500',lineHeight:'57.61px',
          textAlign:'center',position:'absolute',color:'#FFFFFF'


        }}
        >Recruiter add job details here</p>
        <h1
        style={{
          width:'383px',height:'58px',top:'39px',left:'83px',gap:'0px',opacity:'0px',fontFamily:'DM Sans,sans-serif',
          fontSize:'40px',fontWeight:'700',textAlign:'left',position:'absolute',color:'#000000'
        }}
        >Add job description</h1>
    
        <form onSubmit={handleSubmit} id="form">
            <div>
            <p
            style={{top:'132.6px',width:'174px',height:'30px',left:'83px',gap:'0px',opacity:'0px',position:'absolute',color:'#000000',
              fontFamily:'DM Sans,sans-serif',fontSize:'23.34px',fontWeight:'400',lineHeight:'0px',textAlign:'left'}}
            >Company Name </p>
            <input 
            id='company name'
            name='company name'
            type='text'
            value={companyName}
            placeholder='Enter your company name here'
            onChange={(e)=>setCompanyName(e.target.value)}
            style={{
              width:'438.23px',height:'38.67px',top:'128px',left:'316.85px',gap:'0px',borderRadius:'4.6px 4.6px 4.6px 4.6px',
              border:'1.84px 1.84px 1.84px 1.84px',opacity:'0px',position:'absolute'
            }}
            />
            </div>
            <div>
            <p
            style={{top:'191.53px',width:'174px',height:'30px',left:'83px',gap:'0px',opacity:'0px',position:'absolute',color:'#000000',
              fontFamily:'DM Sans,sans-serif',fontSize:'23.34px',fontWeight:'400',lineHeight:'0px',textAlign:'left'}}
            >Add logo URL </p>
            <input 
            id='logo url'
            name='logo url'
            type='text'
            value={logoUrl}
            placeholder='Enter the link'
            onChange={(e)=>setLogoUrl(e.target.value)}
            style={{
              width:'438.23px',height:'38.67px',top:'186px',left:'316.85px',gap:'0px',borderRadius:'4.6px 4.6px 4.6px 4.6px',
              border:'1.84px 1.84px 1.84px 1.84px',opacity:'0px',position:'absolute'
            }}
            />
            </div>
            <div>
            <p
            style={{top:'248.61px',width:'174px',height:'30px',left:'83px',gap:'0px',opacity:'0px',position:'absolute',color:'#000000',
              fontFamily:'DM Sans,sans-serif',fontSize:'23.34px',fontWeight:'400',lineHeight:'0px',textAlign:'left'}}
            >Job position </p>
            <input 
            id='Job position'
            name='Job position'
            type='text'
            value={jobPosition}
            placeholder='Enter job position'
            onChange={(e)=>setJobPosition(e.target.value)}
            style={{
              width:'438.23px',height:'38.67px',top:'243.08px',left:'316.85px',gap:'0px',borderRadius:'4.6px 4.6px 4.6px 4.6px',
              border:'1.84px 1.84px 1.84px 1.84px',opacity:'0px',position:'absolute'
            }}
            />
            </div>
            <div>
            <p
            style={{top:'305.69px',width:'174px',height:'30px',left:'83px',gap:'0px',opacity:'0px',position:'absolute',color:'#000000',
              fontFamily:'DM Sans,sans-serif',fontSize:'23.34px',fontWeight:'400',lineHeight:'0px',textAlign:'left'}}
            >Monthly salary</p>
            <input 
            id='salary'
            name='salary'
            type='number'
            value={salary}
            placeholder='Enter Amount in rupees'
            onChange={(e)=>setSalary(e.target.value)}
            style={{
              width:'438.23px',height:'38.67px',top:'302px',left:'316.85px',gap:'0px',borderRadius:'4.6px 4.6px 4.6px 4.6px',
              border:'1.84px 1.84px 1.84px 1.84px',opacity:'0px',position:'absolute'
            }}
            />
            </div>
            <div>
             <p
             style={{top:'362.77px',width:'174px',height:'30px',left:'83px',gap:'0px',opacity:'0px',position:'absolute',color:'#000000',
              fontFamily:'DM Sans,sans-serif',fontSize:'23.34px',fontWeight:'400',lineHeight:'0px',textAlign:'left'}}
             >Job Type </p>
             <select 
             id='jobType'
             name='jobType'
             value={jobType}
             placeholder='select'
             onChange={(e)=>setJobType(e.target.value)}
             style={{
              width:'136.26px',height:'38.67px',top:'360px',left:'316.85px',gap:'0px',borderRadius:'4.6px 4.6px 4.6px 4.6px',
              border:'1.84px 1.84px 1.84px 1.84px',opacity:'0px',position:'absolute'
            }}
             >
              <option value=''>Select</option>
              <option value='fullTime'>Full-Time</option>
              <option value='part-time'>Part-Time</option>
              <option value='internship'>Internnship</option>

             </select>
            
             </div>
            <div>
            <p
            style={{top:'422.61px',width:'174px',height:'30px',left:'83px',gap:'0px',opacity:'0px',position:'absolute',color:'#000000',
              fontFamily:'DM Sans,sans-serif',fontSize:'23.34px',fontWeight:'400',lineHeight:'0px',textAlign:'left'}}
            >Remote/office </p>
            <select
            id='jobMode'
            name='jobMode'
            value={jobMode}
            onChange={(e) => setJobMode(e.target.value)}
            style={{
              width:'136.26px',height:'38.67px',top:'418px',left:'316.85px',gap:'0px',borderRadius:'4.6px 4.6px 4.6px 4.6px',
              border:'1.84px 1.84px 1.84px 1.84px',opacity:'0px',position:'absolute'
            }}
          >
            <option value=''>Select</option>
            <option value='remote'>Remote</option>
            <option value='office'>Office</option>
            <option value='hybrid'>Hybrid</option>
          </select>
            </div>
            <div>
            <p
            style={{top:'487.98px',width:'174px',height:'30px',left:'83px',gap:'0px',opacity:'0px',position:'absolute',color:'#000000',
              fontFamily:'DM Sans,sans-serif',fontSize:'23.34px',fontWeight:'400',lineHeight:'0px',textAlign:'left'}}
            >Location</p>
            <input 
            id='location'
            name='location'
            type='text'
            value={location}
            placeholder='Enter Location'
            onChange={(e)=>setLocation(e.target.value)}
            style={{
              width:'438.23px',height:'38.67px',top:'478px',left:'316.85px',gap:'0px',borderRadius:'4.6px 4.6px 4.6px 4.6px',
              border:'1.84px 1.84px 1.84px 1.84px',opacity:'0px',position:'absolute'
            }}
            />
            </div>
            <div>
            <p
            style={{top:'556.11px',width:'174px',height:'30px',left:'83px',gap:'0px',opacity:'0px',position:'absolute',color:'#000000',
              fontFamily:'DM Sans,sans-serif',fontSize:'23.34px',fontWeight:'400',lineHeight:'0px',textAlign:'left'}}
            >Job Description</p>
            <input 
            id='description'
            name='description'
            type='text'
            value={description}
            placeholder='Type the job description'
            onChange={(e)=>setDescription(e.target.value)}
            style={{
              width:'438.23px',height:'81px',top:'551px',left:'316.85px',gap:'0px',borderRadius:'4.6px 4.6px 4.6px 4.6px',
              border:'1.84px 1.84px 1.84px 1.84px',opacity:'0px',position:'absolute'
            }}
            />
            </div>
            <div>
            <p
            style={{top:'661px',width:'174px',height:'79px',left:'83px',gap:'0px',opacity:'0px',position:'absolute',color:'#000000',
              fontFamily:'DM Sans,sans-serif',fontSize:'23.34px',fontWeight:'400',lineHeight:'0px',textAlign:'left'}}
            >About Company</p>
            <input 
            id='aboutCompany'
            name='aboutCompany'
            type='text'
            value={aboutCompany}
            placeholder='Type about your company'
            onChange={(e)=>setAboutCompany(e.target.value)}
            style={{
              width:'438.23px',height:'79px',top:'661px',left:'316.85px',gap:'0px',borderRadius:'4.6px 4.6px 4.6px 4.6px',
              border:'1.84px 1.84px 1.84px 1.84px',opacity:'0px',position:'absolute'
            }}
            />
            </div>
            <div>
            <p
            style={{top:'764.52px',width:'174px',height:'30px',left:'83px',gap:'0px',opacity:'0px',position:'absolute',color:'#000000',
              fontFamily:'DM Sans,sans-serif',fontSize:'23.34px',fontWeight:'400',lineHeight:'0px',textAlign:'left'}}
            >Skills Required</p>
            <input 
            id='skillsRequired'
            name='skillsRequired'
            type='text'
            value={skillsRequired}
            placeholder='Enter the must have skills'
            onChange={(e)=>setSkillsRequired(e.target.value)}
            style={{
              width:'438.23px',height:'38.67px',top:'759px',left:'316.85px',gap:'0px',borderRadius:'4.6px 4.6px 4.6px 4.6px',
              border:'1.84px 1.84px 1.84px 1.84px',opacity:'0px',position:'absolute'
            }}
            />
            </div>
            <div>
            <p
            style={{top:'862px',width:'174px',height:'30px',left:'83px',gap:'0px',opacity:'0px',position:'absolute',color:'#000000',
              fontFamily:'DM Sans,sans-serif',fontSize:'23.34px',fontWeight:'400',lineHeight:'0px',textAlign:'left'}}
            >Information</p>
            <input 
            id='information'
            name='information'
            type='text'
            value={information}
            placeholder='Enter the additional information'
            onChange={(e)=>setInformation(e.target.value)}
            style={{
              width:'438.23px',height:'38.67px',top:'855px',left:'316.85px',gap:'0px',borderRadius:'4.6px 4.6px 4.6px 4.6px',
              border:'1.84px 1.84px 1.84px 1.84px',opacity:'0px',position:'absolute'
            }}
            />
            </div>
            <div>
            <button type='submit'
            style={{
              width:'146.79px',height:'42.66px',top:'922px',left:'609.21px',gap:'0px',background:'#ED5353',
              borderRadius:'6.51px 6.51px 6.51px 6.51px',opacity:'0px',fontFamily:'Roboto,sans-serif',color:'#FFFFFF',
              fontSize:'18.08px',fontWeight:'500',lineHeight:'0px',textAlign:'left',position:'absolute'
            }}
            >+ Add Job</button>
            <button type='button' onClick={handleCancel}
            style={{
              width:'146.79px',height:'42.66px',top:'922px',left:'448px',gap:'0px',borderRadius: '6.51px 6.51px 6.51px 6.51px',
              opacity:'0px',border: '0.85px solid #CECECE',fontFamily:'Roboto,sans-serif',fontSize:'18.08px',fontWeight:'500',
              lineHeight:'21.18px',textAlign:'left',position:'absolute',color:'#C2C2C2'
            }}
            >Cancel</button>
            </div>

            
        </form>
    </div>
  )
}

export default Addjob