import React from 'react';
import './TimeZoneDisplay.css';

const TimeZoneDisplay = ({ timeZone, currentTime, onDelete }) => {
  // Format the time for the given time zone
  const timeInZone = currentTime.tz(timeZone).format('HH:mm:ss');

  return (
    <div className="timezone-display">
      <div>
        <strong>{timeZone}</strong>: {timeInZone}
      </div>
      <button onClick={onDelete}>Remove</button>
    </div>
  );
};

export default TimeZoneDisplay;
