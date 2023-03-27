import { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import dayjs from "dayjs";
import "dayjs/locale/th";
dayjs.locale("th");
import { ThaiDatePicker } from "thaidatepicker-react";



function DateCalculator() {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  function calculateDays(start, end) {
    const difference = end.diff(start, "day");
    return difference;
  }

  const days = startDate && endDate ? calculateDays(dayjs(startDate), dayjs(endDate)) : null;

  return (
    <div>
      <label htmlFor="start-date">Start Date:</label>

      <ThaiDatePicker
        id="start-date"
        value={startDate}
        onChange={(christDate) => setStartDate(christDate)}
        inputProps={{
          displayFormat:"D MMMM YYYY"
        }}
      />
      <label htmlFor="end-date">End Date:</label>
      <ThaiDatePicker
        id="end-date"
        value={endDate}
        onChange={(christDate) => setEndDate(christDate)}
        inputProps={{
          displayFormat:"D MMMM YYYY"
        }}
      />

      <label htmlFor="num-days">Number of days:</label>
      <input
        type="text"
        id="num-days"
        value={days ? days : ""}
        readOnly
      />
    </div>
  );
}

export default DateCalculator;