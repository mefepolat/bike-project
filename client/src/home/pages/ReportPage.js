import React, { useState } from 'react';

const ReportPage = () => {
  const [report, setReport] = useState('');

  const handleChange = (event) => {
    setReport(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

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
