import React, { useState } from 'react';






const ReportPage = () => {
  const [report, setReport] = useState('');
  console.log("Here is the report", report)

  const handleChange = (event) => {
    setReport(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    try {
      const response = fetch('http://localhost:3000/api/report', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ report })
      });
      console.log(response);
      // Add logic to handle successful sign in
    } catch (error) { 
      console.error(error);
    } finally {
      console.log("finally" + report)
    }


    // Add code to submit the report here
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea value={report} onChange={handleChange} />
      <button type="submit">Submit Report</button>
    </form>
  );
};

export default ReportPage;
