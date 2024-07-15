import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Addjob from './Addjob';
import Navbarjob from './Navbarjob';
import India from '../assets/india.png';
import Employee from '../assets/employee.png';
import Search from '../assets/search.png'


const Skills = ({ skills }) => {
    const skillStyle = {
        background: '#FFEEEE',
        borderRadius: '5px',
        padding: '5px',
        marginBottom: '5px',
        width: '100px',
        height: '32.97px',
        display: 'inline-block',
        textAlign: 'center'
    };

    const textStyle = {
        fontFamily: 'DM Sans, sans-serif',
        fontSize: '15px',
        fontWeight: '500',
        color: '#000'
    };

    return (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
            {skills.map((skill, index) => (
                <div key={index} style={skillStyle}>
                    <p style={textStyle}>{skill}</p>
                </div>
            ))}
        </div>
    );
};

function Mainpage_login() {
    const [showAddJob, setShowAddJob] = useState(false);
    const [jobs, setJobs] = useState([]);
    const [filteredJobs, setFilteredJobs] = useState([]);
    const [filterText, setFilterText] = useState('');
    const [appliedSkills, setAppliedSkills] = useState([]);

    const fetchAllJobs = async () => {
        try {
            const backendUrl = process.env.REACT_APP_JOBFINDER_BACKEND_URL;
            if (!backendUrl) {
                throw new Error('Backend URL is not defined');
            }
            const response = await axios.get(`${backendUrl}/job/jobs`);
            console.log("Response data:", response.data); // Log the response data
            setJobs(response.data.data); // Ensure response.data.data is an array
        } catch (error) {
            console.error('Error fetching job details', error.response ? error.response.data : error.message);
        }
    }

    useEffect(() => {
        fetchAllJobs();
    }, []);

    useEffect(() => {
        let filtered = jobs;

        if (filterText) {
            filtered = filtered.filter(job =>
                job.jobPosition.toLowerCase().includes(filterText.toLowerCase())
            );
        }

        if (appliedSkills.length > 0) {
            filtered = filtered.filter(job =>
                appliedSkills.every(skill =>
                    job.skillsRequired.some(jobSkill =>
                        jobSkill.toLowerCase().includes(skill.toLowerCase())
                    )
                )
            );
        }

        setFilteredJobs(filtered);
    }, [filterText, appliedSkills, jobs]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        sessionStorage.clear();
        setIsLoggedIn(false);
    };

    const handleAddJob = ()=>{
        window.location.href = '/addjob';
    }

    const handleFilterChange = (e) => {
        setFilterText(e.target.value);
    };

    const handleApplySkill = () => {
        if (filterText && !appliedSkills.includes(filterText.toLowerCase())) {
            setAppliedSkills([...appliedSkills, filterText.toLowerCase()]);
        }
        setFilterText('');
    };

    const handleRemoveSkill = (skill) => {
        setAppliedSkills(appliedSkills.filter(s => s !== skill));
    };

    const handleClearSkills = () => {
        setAppliedSkills([]);
    };

    return (
        <div style={{ width: '1512px', height: '982px', top: '-630px', left: '-2449px' }}>
            <Navbarjob isLoggedIn={isLoggedIn}/>
            {showAddJob && <Addjob setAddedJob={(newJob) => setJobs([...jobs, newJob])} />}
            
            <div 
            style={{width:'1097px',height:'223px',top:'171px',left:'208px',gap:'0px',opacity:'0px',
                boxShadow:'0px 0px 22px 4px #FF202040',background:'#FFFFFF',position:'absolute'
                }}
            >
            <div>
            <style>
                {`
                input::placeholder {
                    font-family: DM Sans;font-size: 23px;font-weight: 500;line-height: 33.13px;
                    color: #9C9C9C;
                }
                `}
            </style>
                <img
                src={Search}
                style={{
                    width:'27px',height:'27px',top:'42px',left:'96px',gap:'0px',opacity:'0px',position:'absolute',zIndex:'200'
                }} 
                />
                <input
                    type="text"
                    value={filterText}
                    onChange={handleFilterChange}
                    placeholder="Type any job title"
                    style={{
                        width:'946px',height:'62px',top:'27px',left:'75px',gap:'0px',borderRadius:'9px 9px 9px 9px',
                        opacity:'0px',border:'1.8px solid #E3E3E3',background:'#FFFFFF',position:'absolute',paddingLeft:'66px'
                    }}
                />
                {isLoggedIn ?
                (
                    <button onClick={handleAddJob}
                style={{
                    width:'154px',height:'36.5px',top:'138px',left:'785px',gap:'0px',borderRadius:'3.92px 3.92px 3.92px 3.92px',opacity:'0px',
                    background:'#ED5353',position:'absolute',fontFamily:'DM Sans,sans-serif',fontSize:'19.61px',fontWeight:'500',lineHeight:'15.25px',
                    textAlign:'center',color:'#FFFFFF'
                 }}
                >+ Add Job</button>
                ):(
                    <button onClick={handleApplySkill}
                style={{
                    width:'154px',height:'36.5px',top:'138px',left:'785px',gap:'0px',borderRadius:'3.92px 3.92px 3.92px 3.92px',opacity:'0px',
                    background:'#ED5353',position:'absolute',fontFamily:'DM Sans,sans-serif',fontSize:'19.61px',fontWeight:'500',lineHeight:'15.25px',
                    textAlign:'center',color:'#FFFFFF'
                 }}
                >Apply Filter</button>
                )}
            </div>
            <div>
                {appliedSkills.map(skill => (
                    <span key={skill} style={{display: 'inline-block',
                        width:'133px',height:'46px',top:'127px',left:'235px',borderRadius:'2px 2px 2px 2px',
                        position:'absolute',background:'#FFEEEE',
                        fontFamily:'DM Sans,sans-serif',fontSize:'16.38px',fontWeight:'500',lineHeight:'45px',textAlign:'left',
                        color:'#000000'
                        }}>
                        {skill}
                        <button onClick={() => handleRemoveSkill(skill)} 
                        style={{
                            width:'41px',height:'46px',top:'0px',left:'93px',borderRadius:'2px 2px 2px 2px',
                            position:'absolute',background:'#FF6B6B',color:'#FFFFFF',lineHeight:'0px'
                        }}>X</button>
                    </span>
                ))}
                {appliedSkills.length > 0 && <button onClick={handleClearSkills}
                style={{
                    width:'50px',height:'29px',top:'142px',left:'970px',gap:'0px',opacity:'0px',fontFamily:'DM Sans,sans-serif',
                    fontSize:'20px',fontWeight:'500',lineHeight:'0.8px',textAlign:'center',position:'absolute',color:'#ED5353'
                }}
                >Clear</button>}
            </div>
            </div>

            <div className='view' style={{ position: 'relative', width: '1097px', height: '136px', left: '206px', top: '467px' }}>
                {filteredJobs.length > 0 ? (
                    filteredJobs.map(job => (
                        <div key={job._id} style={{ position: 'relative', marginBottom: '20px', padding: '10px', border: '1px solid #ccc', borderRadius: '10px', height: '136px', zIndex: '1',
                            boxShadow:'0px 0px 22px 2px #FF202040'

                         }}>
                            <p style={{
                                left: '105.14px', fontFamily: 'Roboto, sans-serif', fontSize: '19px', fontWeight: '500',
                                marginBottom: '5px', position: 'absolute', color: '#000000', top: '23px'
                            }}>
                                {job.jobPosition}
                            </p>
                            <img src={job.logoUrl} alt="Company Logo" style={{
                                width: '55.32px', height: '55px', borderRadius: '12px', left: '26px', top: '23px', position: 'absolute',
                                display: 'block', marginBottom: '5px'
                            }} />
                            <p style={{
                                fontFamily: 'Roboto', fontSize: '18px', fontWeight: '500', top: '59.88px', left: '228px',
                                color: '#9C9C9C', marginBottom: '5px', position: 'absolute'
                            }}>
                                ₹ {job.salary}
                            </p>
                            <p style={{
                                fontFamily: 'Roboto', fontSize: '18px', fontWeight: '500', top: '59.88px',
                                color: '#9C9C9C', marginBottom: '5px', left: '370px', position: 'absolute'
                            }}>
                                {job.location}
                            </p>

                            <p style={{
                                fontFamily: 'Roboto, sans-serif', fontSize: '15px', fontWeight: '500',
                                color: '#ED5353', marginBottom: '5px', left: '180px', top: '100px', position: 'absolute'
                            }}>
                                {job.jobType}
                            </p>

                            <p style={{
                                fontFamily: 'Roboto, sans-serif', fontSize: '15px', fontWeight: '500',
                                color: '#ED5353', marginBottom: '5px', top: '100px', position: 'absolute', left: '125.14px'
                            }}>
                                {job.jobMode}
                            </p>
                            <div style={{ position: 'absolute', top: '29px', left: '635px' }}>
                                <Skills skills={job.skillsRequired} />
                            </div>
                            <img
                            src={India}
                            style={{width:'33.04px',height:'33.04px',top:'75px',left:'322.58px',gap:'0px',
                                opacity:'0px',position:'absolute'
                                }}
                            />
                            <div>
                                <p
                                style={{
                                    width:'57px',height:'16px',top:'60.81px',left:'139.43px',
                                gap:'0px',opacity:'0px',color:'#919191',position:'absolute'

                                }}
                                >11-50</p>
                                <img
                                style={{width:'16.69px',height:'14.83px',top:'80px',left:'125.14px',
                                    gap:'0px',opacity:'0px',color:'#919191',position:'absolute'
    }}
                            src={Employee}
                            /></div>  
                            {isLoggedIn && (
                                <>
                                    <button onClick={() => window.location.href = `/jobdetails/${job._id}`} style={{
                                        marginRight: '10px', backgroundColor: '#ED5353', color: '#fff', border: 'none', borderRadius: '5px',
                                        top: '82px', left: '909px', position: 'absolute'
                                    }}>View Details</button>
                                </>
                            )}
                        </div>
                    ))
                ) : (
                    <p>No jobs available</p>
                )}
            </div>
        </div>
    );
}

export default Mainpage_login;
