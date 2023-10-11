import React, { useState, useEffect } from 'react';
import './App.css';

const CountdownTimer = () => {
  const [timeRemaining, setTimeRemaining] = useState(calculateTimeRemaining());
  const [showFireworks, setShowFireworks] = useState(false);
  const [yearProgress, setYearProgress] = useState(calculateYearProgress());
  const [daysPassed, setDaysPassed] = useState(calculateDaysPassed());

  useEffect(() => {
    const timerInterval = setInterval(() => {
      const time = calculateTimeRemaining();

      if (time.days === 0 && time.hours === 0 && time.minutes === 1 && time.seconds === 0) {
        setShowFireworks(true);
      } else {
        setShowFireworks(false);
      }

      setTimeRemaining(time);
      setYearProgress(calculateYearProgress());
      setDaysPassed(calculateDaysPassed());
    }, 1000);

    return () => clearInterval(timerInterval);
  }, []);

  function calculateTimeRemaining() {
    const now = new Date();
    const currentYear = now.getFullYear();
    const nextYear = currentYear + 1;
    const endOfYear = new Date(nextYear, 0, 0, 23, 59, 59);
    const timeDifference = endOfYear - now;

    return {
      days: Math.floor(timeDifference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      minutes: Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((timeDifference % (1000 * 60)) / 1000),
    };
  }

  function calculateYearProgress() {
    const now = new Date();
    const currentYear = now.getFullYear();
    const startOfYear = new Date(currentYear, 0, 0);
    const endOfYear = new Date(currentYear + 1, 0, 0);
    const yearDuration = endOfYear - startOfYear;
    const timePassed = now - startOfYear;

    return (timePassed / yearDuration) * 100;
  }

  function calculateDaysPassed() {
    const now = new Date();
    const startOfYear = new Date(now.getFullYear(), 0, 0);
    const dayDifference = now - startOfYear;

    return Math.floor(dayDifference / (1000 * 60 * 60 * 24));
  }

  return (
    <div className="container">
      <h1 className="title">Contagem Regressiva para o Fim do Ano</h1>
      <div className="countdown">
        <p className="timer">
          <span className="number">{timeRemaining.days}</span> dias,{' '}
          <span className="number">{timeRemaining.hours}</span> horas,{' '}
          <span className="number">{timeRemaining.minutes}</span> minutos,{' '}
          <span className="number">{timeRemaining.seconds}</span> segundos
        </p>
      </div>
      {showFireworks && (
        <div className="fireworks">
          <div className="firework" />
          <div className="firework" />
          <div className="firework" />
          <div className="firework" />
          <div className="firework" />
          <div className="firework" />
        </div>
      )}
      <div className="loading-bar">
        <div className="loading-progress" style={{ width: `${yearProgress}%` }} />
      </div>
      <div className="percentage">{Math.round(yearProgress)}%</div>
      <div className="info">
        <div className="info-item">
          <div className="info-value">Já se passaram: {daysPassed} dias.</div>
        </div>
      </div>
    </div>
  );
};

export default CountdownTimer;
