import { useState, useContext } from 'react';
import {AuthContext} from "../../shared/components/AuthContext";


const ReportPage = () => {
  const [description, setDescription] = useState('');
  const [title, setTitle] = useState('');
  const {user} = useContext(AuthContext);
  const dummyUser = user;
  
  const handleChange = (event) => {
    setDescription(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
   
    try {
      const response = await fetch('http://localhost:3000/api/create-report', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title, description,dummyUser })
      });
     const data = await response.json();
     console.log(data);
     
    } catch (error) { 
      console.error(error);
    } 

  
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor='title'>Title:</label> 
      <input type='text' name='title' id='title' value={title} onChange={((event) => setTitle(event.target.value))} />
      <textarea value={description} onChange={handleChange} />
      <button type="submit">Submit Report</button>
    </form>
  );
};

export default ReportPage;
