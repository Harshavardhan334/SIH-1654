import React from 'react';
import { useInterviews } from '../context/InterviewsContext';

export default function ExpertInterviewDisplay({ id }) {
  const { interviews } = useInterviews();

  // Filter the interviews to find those that include the expert with the given ID
  const expertInterviews = interviews.filter((interview) =>
    interview.experts.some((expert) => expert.id === id)
  );

  return (
    <section className="py-10 bg-gray-50 sm:py-16 lg:py-24">
      <div className="px-4 mx-auto max-w-6xl sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl lg:text-5xl text-center">
          Your Interviews
        </h2>

        {/* Check if there are any interviews for this expert */}
        {expertInterviews.length > 0 ? (
          <ul className="mt-8 divide-y divide-gray-200">
            {expertInterviews.map((interview) => (
              <li key={interview.id} className="p-4 bg-white rounded-md shadow-md mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Candidate: {interview.candidate.name}
                </h3>
                <p className="text-sm text-gray-600">
                  Position: {interview.candidate.position}
                </p>
                <p className="text-sm text-gray-600">Date: {interview.date}</p>
                <h4 className="mt-4 text-md font-medium text-gray-800">Experts Involved:</h4>
                <ul className="mt-2 list-disc list-inside text-gray-600">
                  {interview.experts.map((expert) => (
                    <li key={expert.id}>{expert.name} - {expert.expertise}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        ) : (
          // Message if no interviews involve this expert
          <p className="text-center text-lg text-gray-600 mt-4">
            You are not part of any scheduled interviews yet.
          </p>
        )}
      </div>
    </section>
  );
}
