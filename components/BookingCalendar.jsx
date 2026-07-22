import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

export default function BookingCalendar({
  selectedDate,
  setSelectedDate,
}) {
  const [holidays, setHolidays] =
    useState([]);

  const [fullyBookedDates, setFullyBookedDates] =
    useState([]);

  const formatDate = (date) => {
    return (
      date.getFullYear() +
      "-" +
      String(date.getMonth() + 1).padStart(2, "0") +
      "-" +
      String(date.getDate()).padStart(2, "0")
    );
  };

  useEffect(() => {
    async function loadStatus() {
      const response = await fetch(
        "/api/calendar-status"
      );

      const data = await response.json();

      setHolidays(
        data.holidays || []
      );

      setFullyBookedDates(
        data.fullyBookedDates || []
      );
    }

    loadStatus();
  }, []);

  const isWeekend = (date) => {
    const day = date.getDay();

    return day === 0 || day === 6;
  };

  const isHoliday = (date) => {
    return holidays.includes(
      formatDate(date)
    );
  };

  const isFullyBooked = (date) => {
    return fullyBookedDates.includes(
      formatDate(date)
    );
  };

  return (
    <Calendar
      minDate={new Date()}
      value={selectedDate}
      onChange={setSelectedDate}
      tileDisabled={({ date }) =>
        isWeekend(date) ||
        isHoliday(date) ||
        isFullyBooked(date)
      }
      tileClassName={({ date }) => {
        if (isHoliday(date))
          return "holiday-date";

        if (isFullyBooked(date))
          return "fully-booked-date";

        return null;
      }}
    />
  );
}