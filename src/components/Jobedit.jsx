import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function Jobedit() {
    const { id } = useParams();
    const [jobDetails, setJobDetails] = useState({
        companyName: '',
        logoUrl: '',
        jobPosition: '',
        salary: '',
        jobType: '',
        jobMode: '',
        location: '',
        description: '',
        aboutCompany: '',
        skillsRequired: '',
        information: ''
    });
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        const fetchJobDetails = async () => {
            try {
            
                const response = await axios.get(`http://localhost:4000/jobs/${id}`);
                const data = response.data;
                setJobDetails({
                    companyName: data.data.companyName,
                    logoUrl: data.data.logoUrl,
                    jobPosition: data.data.jobPosition,
                    salary: data.data.salary,
                    jobType: data.data.jobType,
                    jobMode: data.data.jobMode,
                    location: data.data.location,
                    description: data.data.description,
                    aboutCompany: data.data.aboutCompany,
                    skillsRequired: Array.isArray(data.data.skillsRequired)? data.data.skillsRequired.join(','):'', // Convert array to comma-separated string
                    information: data.data.information
                });
            } catch (error) {
                console.log('Error fetching job details', error);
            }
        };
        fetchJobDetails();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setJobDetails((prevDetails) => ({
            ...prevDetails,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const authToken = localStorage.getItem('authToken');
            if (!authToken) {
                console.error('No auth token found');
                return;
            }
            console.log('Auth Token:', authToken);
            
            const response =await axios.put(`http://localhost:4000/updateJob/${id}`, {
                ...jobDetails,
                skillsRequired: jobDetails.skillsRequired.split(',').map(skill => skill.trim())
            }, {
                headers: {
                    Authorization: `Bearer ${authToken}` // Replace with your actual authentication token
                }
        });
            console.log('Response:', response);
            alert('Job updated successfully');
            setIsEditing(false);
        } catch (error) {
            console.log('Error updating job details', error);
        }
    };

    return (
        <div>
            <h2>{isEditing ? 'Edit Job' : 'Job Details'}</h2>
            {isEditing ? (
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Company Name:</label>
                        <input
                            type="text"
                            name="companyName"
                            value={jobDetails.companyName}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Logo URL:</label>
                        <input
                            type="text"
                            name="logoUrl"
                            value={jobDetails.logoUrl}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Job Position:</label>
                        <input
                            type="text"
                            name="jobPosition"
                            value={jobDetails.jobPosition}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Salary:</label>
                        <input
                            type="number"
                            name="salary"
                            value={jobDetails.salary}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Job Type:</label>
                        <select name="jobType" value={jobDetails.jobType} onChange={handleChange} required>
                            <option value="">Select Job Type</option>
                            <option value="fullTime">Full Time</option>
                            <option value="part-time">Part Time</option>
                            <option value="internship">Internship</option>
                            <option value="contract">Contract</option>
                        </select>
                    </div>
                    <div>
                        <label>Job Mode:</label>
                        <select name="jobMode" value={jobDetails.jobMode} onChange={handleChange} required>
                            <option value="">Select Job Mode</option>
                            <option value="remote">Remote</option>
                            <option value="office">Office</option>
                            <option value="hybrid">Hybrid</option>
                        </select>
                    </div>
                    <div>
                        <label>Location:</label>
                        <input
                            type="text"
                            name="location"
                            value={jobDetails.location}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Description:</label>
                        <textarea
                            name="description"
                            value={jobDetails.description}
                            onChange={handleChange}
                            required
                        ></textarea>
                    </div>
                    <div>
                        <label>About Company:</label>
                        <textarea
                            name="aboutCompany"
                            value={jobDetails.aboutCompany}
                            onChange={handleChange}
                            required
                        ></textarea>
                    </div>
                    <div>
                        <label>Skills Required:</label>
                        <input
                            type="text"
                            name="skillsRequired"
                            value={jobDetails.skillsRequired}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Additional Information:</label>
                        <textarea
                            name="information"
                            value={jobDetails.information}
                            onChange={handleChange}
                            required
                        ></textarea>
                    </div>
                    <button type="submit">Update Job</button>
                </form>
            ) : (
                <div>
                    <p><strong>Company Name:</strong> {jobDetails.companyName}</p>
                    <p><strong>Logo URL:</strong> <img src={jobDetails.logoUrl} alt="Company Logo" /></p>
                    <p><strong>Job Position:</strong> {jobDetails.jobPosition}</p>
                    <p><strong>Salary:</strong> {jobDetails.salary}</p>
                    <p><strong>Job Type:</strong> {jobDetails.jobType}</p>
                    <p><strong>Job Mode:</strong> {jobDetails.jobMode}</p>
                    <p><strong>Location:</strong> {jobDetails.location}</p>
                    <p><strong>Description:</strong> {jobDetails.description}</p>
                    <p><strong>About Company:</strong> {jobDetails.aboutCompany}</p>
                    <p><strong>Skills Required:</strong> {jobDetails.skillsRequired}</p>
                    <p><strong>Additional Information:</strong> {jobDetails.information}</p>
                    <button onClick={() => setIsEditing(true)}>Edit Job</button>
                </div>
            )}
        </div>
    );
}

export default Jobedit;
