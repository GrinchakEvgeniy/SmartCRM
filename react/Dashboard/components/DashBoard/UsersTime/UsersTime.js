import React, {useEffect, useState} from 'react';

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const UsersTime = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());
  const [dates, setDates] = useState([]);
  const [calendar, setCalendar] = useState({
    month: selectedDay.getMonth(),
    year: selectedDay.getFullYear(),
  });

  useEffect(() => {
  const body = {
    month: calendar.month,
    year: calendar.year
  };
  const { dates, nextMonth, nextYear, previousMonth, previousYear } = datesGenerator(body);

  setDates([ ...dates ]);
  setCalendar({
    ...calendar,
    nextMonth,
    nextYear,
    previousMonth,
    previousYear
  });
}, [])

    return (
        <div className="container users_times">
            <div className="wrap_calendar">
                {months[calendar.month]}
            </div>
            <div>

        <div>
          <table style={{ width: '100%' }}>
            <tbody>
              <tr>
                {days.map((day) => (
                  <td key={day} style={{ padding: '5px 0' }}>
                    <div style={{ textAlign: 'center', padding: '5px 0' }}>
                      {day}
                    </div>
                   </td>
                 ))}
              </tr>

              {dates.length > 0 && dates.map((week) => (
                <tr key={JSON.stringify(week[0])}>
                  {week.map((each) => (
                    <td key={JSON.stringify(each)} style={{ padding: '5px 0' }}>
                      <div style={{ textAlign: 'center', padding: '5px 0' }}>
                        {each.date}
                      </div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
        </div>
    );
};

export default UsersTime;