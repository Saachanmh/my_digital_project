// src/components/WeekCalendar.js
import React, { useState, useEffect } from 'react';
import './WeekCalendar.css';

const WeekCalendar = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [weekDays, setWeekDays] = useState([]);

    useEffect(() => {
        const startOfWeek = new Date(currentDate);
        const dayOfWeek = startOfWeek.getDay();
        const diff = startOfWeek.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1); // Adjust for Sunday
        startOfWeek.setDate(diff);

        const days = [];
        for (let i = 0; i < 7; i++) {
            const day = new Date(startOfWeek);
            day.setDate(startOfWeek.getDate() + i);
            days.push(day);
        }
        setWeekDays(days);
    }, [currentDate]);

    const handleNextWeek = () => {
        setCurrentDate(new Date(currentDate.setDate(currentDate.getDate() + 7)));
    };

    const handlePrevWeek = () => {
        setCurrentDate(new Date(currentDate.setDate(currentDate.getDate() - 7)));
    };

    return (
        <div className="week-calendar">
            <div className="calendar-header">
                <button onClick={handlePrevWeek}>Previous Week</button>
                <button onClick={handleNextWeek}>Next Week</button>
            </div>
            <div className="week-days">
                {weekDays.map((day, index) => (
                    <div key={index} className="day">
                        <div className="day-name">{day.toLocaleDateString('fr-FR', { weekday: 'long' })}</div>
                        <div className="day-date">{day.getDate()}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default WeekCalendar;
