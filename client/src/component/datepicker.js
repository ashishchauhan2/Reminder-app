import React from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

const Datepicker = React.forwardRef(({ selectedDate, onTimeChange, name }, ref)=> {

    return (
        <DatePicker
            minDate={new Date()}
            selected={selectedDate}
            value={selectedDate}
            onChange={(date) => {
                onTimeChange(date)
            }}
            showTimeSelect={true}
            timeFormat="h:mm aa"
            timeIntervals={15}
            timeCaption="time"
            dateFormat="MMMM d, yyyy h:mm aa"
            ref={ref}
            name={name}
        />
    );
  }
)
  
  export default Datepicker;