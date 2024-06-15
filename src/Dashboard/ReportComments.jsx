import React, { useEffect, useState } from 'react';
import useAxiosPublic from '/Projects/OpinionLoom-client/src/Hooks/useAxiosPublic';
const ReportComments = () => {
    const [report,setReport]=useState([]);
const axiosPublic=useAxiosPublic();
    useEffect(()=>{
        axiosPublic.get('/report')
       .then(res=>{
        setReport(res.data);
       })
       .then((err)=>{
        console.log(err.message)
       });

    })
    return (
        <div className='pt-20 p-8 '>
            {
                report.map((re,index)=>
                <div key={re._id} className='border-2 rounded-2xl border-orange-400 p-4'>
                    <p>Report {index+1}</p>
                    <p>Reporter Name: {re.name}</p>
                    <p>Details: {re.reportDescription}</p>
                </div>)
            }
        </div>
    );
};

export default ReportComments;
