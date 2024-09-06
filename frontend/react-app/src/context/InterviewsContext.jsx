
import React, { createContext, useContext, useState } from 'react';

const InterviewsContext = createContext();

export const useInterviews = () => useContext(InterviewsContext);

export const InterviewsProvider = ({ children }) => {
  const [interviews, setInterviews] = useState([]);

  const addInterview = (candidate, experts) => {
    const newInterview = {
      id: Date.now(),
      candidate,
      experts,
      date: new Date().toLocaleString(), 
    };
    setInterviews((prevInterviews) => [...prevInterviews, newInterview]);
  };

  return (
    <InterviewsContext.Provider value={{ interviews, addInterview }}>
      {children}
    </InterviewsContext.Provider>
  );
};
