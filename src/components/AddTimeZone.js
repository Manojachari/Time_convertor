import React, { useState } from 'react';
import './AddTimeZone.css';

const AddTimeZone = ({ onAdd }) => {
  const [timeZone, setTimeZone] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (timeZone) {
      onAdd(timeZone);
      setTimeZone('');  // Clear the input field
    }
  };

  return (
    <form onSubmit={handleSubmit} className="add-timezone-form">
      <input
        type="text"
        value={timeZone}
        onChange={(e) => setTimeZone(e.target.value)}
        placeholder="Enter time zone (e.g., America/New_York)"
      />
      <button type="submit">Add Time Zone</button>
    </form>
  );
};

export default AddTimeZone;
