import React, { Component } from 'react';
import moment from 'moment-timezone';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import TimeZoneDisplay from './TimeZoneDisplay';
import AddTimeZone from './AddTimeZone';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './TimeZoneConverter.css';

class TimeZoneConverter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timeZones: ['UTC', 'Asia/Kolkata'], // Default time zones
      currentTime: moment(),
      darkMode: false,
    };
  }

  // Handle the addition of a new time zone
  handleTimeZoneAddition = (timeZone) => {
    // Prevent adding a duplicate time zone
    if (this.state.timeZones.includes(timeZone)) return;

    // Add the new time zone and update the state
    this.setState((prevState) => ({
      timeZones: [...prevState.timeZones, timeZone],
    }));
  };

  // Handle deletion of a time zone
  handleTimeZoneDeletion = (index) => {
    this.setState((prevState) => ({
      timeZones: prevState.timeZones.filter((_, i) => i !== index),
    }));
  };

  // Handle drag and drop functionality for reordering time zones
  onDragEnd = (result) => {
    if (!result.destination) return;
    const items = Array.from(this.state.timeZones);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    this.setState({ timeZones: items });
  };

  // Toggle dark mode
  toggleDarkMode = () => {
    this.setState((prevState) => ({ darkMode: !prevState.darkMode }));
  };

  render() {
    const { timeZones, currentTime, darkMode } = this.state;

    return (
      <div className={`timezone-converter ${darkMode ? 'dark' : 'light'}`}>
        <button onClick={this.toggleDarkMode}>
           {darkMode ? 'Light' : 'Dark'} Mode
        </button>
        <DatePicker
          selected={currentTime.toDate()}
          onChange={(date) => this.setState({ currentTime: moment(date) })}
          showTimeSelect
          dateFormat="Pp"
        />
        <DragDropContext onDragEnd={this.onDragEnd}>
          <Droppable droppableId="droppable">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {timeZones.map((zone, index) => (
                  <Draggable key={zone} draggableId={zone} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <TimeZoneDisplay
                          timeZone={zone}
                          currentTime={currentTime}
                          onDelete={() => this.handleTimeZoneDeletion(index)}
                        />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
        <AddTimeZone onAdd={this.handleTimeZoneAddition} />
      </div>
    );
  }
}

export default TimeZoneConverter;
