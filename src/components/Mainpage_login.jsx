import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Addjob from './Addjob';
import Navbarjob from './Navbarjob';
import India from '../assets/india.png';
import Employee from '../assets/employee.png';
import Search from '../assets/search.png';

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
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const [filteredJobs, setFilteredJobs] = useState([]);
    const [filterText, setFilterText] = useState('');
    const [appliedSkills, setAppliedSkills] = useState([]);

    const fetchAllJobs = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_JOBFINDER_BACKEND_URL}/jobs`);
            setJobs(response.data.data); // Ensure response.data.data is an array
        } catch (error) {
            console.error('Error fetching job details', error.response ? error.response.data : error.message);
        }
    };

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

    const handleLogin = () => {
        window.location.href = '/login';
    };

    const handleRegister = () => {
        window.location.href = '/signup';
    };

    const handleAddJob = () => {
        window.location.href = '/addjob';
    };

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
            <Navbarjob />
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
                            boxShadow:'0px 0px 22px 4px #FF202040',
                            background:'#FFFFFF'
                        }}>
                            <div style={{ position: 'absolute', width: '287px', height: '76px', left: '60px', top: '20px', borderRadius: '0px', fontFamily: 'DM Sans', fontStyle: 'normal', fontWeight: 'bold', fontSize: '30px', lineHeight: '39px', color: '#212427' }}>
                                {job.jobPosition}
                            </div>
                            <img
                                src={Employee}
                                style={{
                                    width: '28px', height: '28px', top: '20px', left: '899px', gap: '10px', opacity: '0px', position: 'absolute', zIndex: '0'
                                }}
                            />
                            <div style={{ position: 'absolute', width: '179px', height: '26px', left: '938px', top: '24px', borderRadius: '0px', fontFamily: 'DM Sans', fontStyle: 'normal', fontWeight: '500', fontSize: '22px', lineHeight: '23px', color: '#5B5B5B' }}>
                                {job.companyName}
                            </div>
                            <div style={{ position: 'absolute', width: '225px', height: '26px', left: '892px', top: '67px', borderRadius: '0px', fontFamily: 'DM Sans', fontStyle: 'normal', fontWeight: '500', fontSize: '22px', lineHeight: '23px', color: '#5B5B5B' }}>
                                {job.salary}
                            </div>
                            <img
                                src={India}
                                style={{
                                    width: '20px', height: '20px', top: '72px', left: '861px', gap: '10px', opacity: '0px', position: 'absolute', zIndex: '0'
                                }}
                            />
                            <div style={{ position: 'absolute', width: '150px', height: '26px', left: '938px', top: '72px', borderRadius: '0px', fontFamily: 'DM Sans', fontStyle: 'normal', fontWeight: '500', fontSize: '22px', lineHeight: '23px', color: '#5B5B5B' }}>
                                {job.location}
                            </div>
                            <Skills skills={job.skillsRequired} />
                        </div>
                    ))
                ) : (
                    <div>No jobs found</div>
                )}
            </div>
            <div>
                {!isLoggedIn && (
                    <>
                        <button onClick={handleLogin}
                            style={{
                                width: '150px', height: '50px', top: '160px', left: '1200px', borderRadius: '5px', position: 'absolute', background: '#ED5353',
                                fontFamily: 'DM Sans, sans-serif', fontSize: '16px', fontWeight: '500', color: '#FFFFFF', zIndex: '200'
                            }}
                        >
                            Login
                        </button>
                        <button onClick={handleRegister}
                            style={{
                                width: '150px', height: '50px', top: '220px', left: '1200px', borderRadius: '5px', position: 'absolute', background: '#ED5353',
                                fontFamily: 'DM Sans, sans-serif', fontSize: '16px', fontWeight: '500', color: '#FFFFFF', zIndex: '200'
                            }}
                        >
                            Register
                        </button>
                    </>
                )}
                {isLoggedIn && (
                    <button onClick={handleLogout}
                        style={{
                            width: '150px', height: '50px', top: '160px', left: '1200px', borderRadius: '5px', position: 'absolute', background: '#ED5353',
                            fontFamily: 'DM Sans, sans-serif', fontSize: '16px', fontWeight: '500', color: '#FFFFFF', zIndex: '200'
                        }}
                    >
                        Logout
                    </button>
                )}
            </div>
        </div>
    );
}

export default Mainpage_login;
