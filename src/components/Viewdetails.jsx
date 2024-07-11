import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Viewdetails() {
    const { id } = useParams();
    const [job, setJob] = useState(null);

    const fetchJobDetails = async () => {
        try {
            const response = await axios.get(`http://localhost:4000/jobs/${id}`);
            setJob(response.data.data);
        } catch (error) {
            console.error('Error fetching job details', error.response ? error.response.data : error.message);
        }
    };

    useEffect(() => {
        fetchJobDetails();
    }, [id]);

    if (!job) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <h2>Job Details</h2>
            <p><strong>Company Name:</strong> {job.companyName}</p>
            <p><strong>Logo:</strong> <img src={job.logoUrl} alt="Company Logo" width="100" /></p>
            <p><strong>Job Position:</strong> {job.jobPosition}</p>
            <p><strong>Salary:</strong> {job.salary}</p>
            <p><strong>Location:</strong> {job.location}</p>
            <p><strong>Job Type:</strong> {job.jobType}</p>
            <p><strong>Job Mode:</strong> {job.jobMode}</p>
            <p><strong>Description:</strong> {job.description}</p>
            <p><strong>About Company:</strong> {job.aboutCompany}</p>
            <p><strong>Skills Required:</strong> {job.skillsRequired.join(', ')}</p>
            <p><strong>Information:</strong> {job.information}</p>
            <Link to={`/jobedit/${job._id}`}>
                                        <button style={{
                                            padding: '5px 10px', backgroundColor: '#28a745', color: '#fff', border: 'none', borderRadius: '5px'
                                        }}>Edit Job</button>
                                    </Link>
        </div>
    );
}

export default Viewdetails;
