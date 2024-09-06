import React, { useState } from 'react';
import Header from '../components/Header';
import { useInterviews } from '../context/InterviewsContext';

export default function InterviewsPage() {
  const { interviews } = useInterviews();
  const [expandedInterview, setExpandedInterview] = useState(null);

  const toggleExperts = (interviewId) => {
    // Toggle the expanded interview state
    setExpandedInterview(expandedInterview === interviewId ? null : interviewId);
  };

  return ( 
    <>
      <Header />
      <section className="py-10 bg-gray-50 sm:py-16 lg:py-24">
        <div className="px-4 mx-auto max-w-6xl sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl lg:text-5xl text-center">
            Scheduled Interviews
          </h2>
          <div className="mt-8">
            {interviews.length === 0 ? (
              <p className="text-center text-lg text-gray-600">No scheduled interviews yet.</p>
            ) : (
              <ul className="divide-y divide-gray-200">
                {interviews.map((interview) => (
                  <li key={interview.id} className="p-4 bg-white rounded-md shadow-md mb-4">
                    
                    <h3 className="text-lg font-semibold text-gray-900">
                      Candidate: {interview.candidate.name}
                    </h3>
                    <p className="text-sm text-gray-600">
                      C_ID: {interview.candidate.id}
                    </p>
                    <p className="text-sm text-gray-600">
                      Position: {interview.candidate.position}
                    </p>
                    <p className="text-sm text-gray-600">Date: {interview.date}</p>
                    {/* Toggle button to show/hide experts */}
                    <button
                      className="mt-2 text-indigo-500 hover:underline"
                      onClick={() => toggleExperts(interview.id)}
                    >
                      {expandedInterview === interview.id ? 'Hide Experts' : 'Show Experts'}
                    </button>
                    {/* Conditionally render the experts list */}
                    {expandedInterview === interview.id && (
                      <ul className="mt-2 list-disc list-inside text-gray-600">
                        {interview.experts.map((expert) => (
                          <li key={expert.id}>{expert.name} - {expert.expertise}</li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
