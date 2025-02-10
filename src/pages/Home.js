import React, { useState } from 'react';
import '../styles/formstyles.css'; // Import the updated CSS file

function Home() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // 'success' or 'error'

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = { name, email, city };

    try {
      const response = await fetch('http://localhost:5001/api/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setMessageType('success');
        setFeedbackMessage("Data submitted successfully!");
        setName('');
        setEmail('');
        setCity('');
      } else {
        setMessageType('error');
        setFeedbackMessage("Failed to submit data.");
      }
    } catch (error) {
      console.error('Error submitting data', error);
      setMessageType('error');
      setFeedbackMessage("Error submitting data.");
    }

    // Clear the message after 5 seconds
    setTimeout(() => {
      setFeedbackMessage('');
      setMessageType('');
    }, 5000);
  };

  return (
    <div className="container">
      <h1 className="heading">Submit Your Data</h1>
      <form onSubmit={handleSubmit} className="form">
        <div className="inputGroup">
          <input
            type="text"
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input"
            required
          />
        </div>
        <div className="inputGroup">
          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input"
            required
          />
        </div>
        <div className="inputGroup">
          <input
            type="text"
            placeholder="Enter City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="input"
            required
          />
        </div>
        <button type="submit" className="button">Submit</button>
      </form>

      {/* Display feedback message */}
      {feedbackMessage && (
        <div className={`feedbackMessage ${messageType}`}>
          {feedbackMessage}
        </div>
      )}
    </div>
  );
}

export default Home;
