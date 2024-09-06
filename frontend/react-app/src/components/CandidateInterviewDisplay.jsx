import React from 'react';
import { useInterviews } from '../context/InterviewsContext';

export default function CandidateInterviewDisplay({ id }) {
  const { interviews } = useInterviews();
  const candidateInterview=interviews.find((interview)=>interview.candidate.id===id)
  
  return (
    <section className="py-10 bg-gray-50 sm:py-16 lg:py-24">
      <div className="px-4 mx-auto max-w-6xl sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl lg:text-5xl text-center">
          Interview Details
        </h2>

        {/* Check if the candidate has a scheduled interview */}
        {candidateInterview ? (
          <div className="mt-8 p-4 bg-white rounded-md shadow-md">
            <h3 className="text-lg font-semibold text-gray-900">
              Candidate: {candidateInterview.candidate.name}
            </h3>
            <p className="text-sm text-gray-600">Position: {candidateInterview.candidate.position}</p>
            <p className="text-sm text-gray-600">Date: {candidateInterview.date}</p>
            <h4 className="mt-4 text-md font-medium text-gray-800">Experts Involved:</h4>
            <ul className="mt-2 list-disc list-inside text-gray-600">
              {candidateInterview.experts.map((expert) => (
                <li key={expert.id}>{expert.name} - {expert.expertise}</li>
              ))}
            </ul>
          </div>
        ) : (
          // Message if no interview is scheduled for the candidate
          <p className="text-center text-lg text-gray-600 mt-4">
            No interview scheduled yet.
          </p>
        )}
      </div>
    </section>
  );
}
