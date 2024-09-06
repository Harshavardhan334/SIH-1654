import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from './Header';
import { useInterviews } from '../context/InterviewsContext';
export default function MatchPage() {
  const location = useLocation();
  const { candidate, bestExperts} = location.state || {}; // receive the remove function
  const { addInterview, interviews } = useInterviews();

  // Schedule interview and remove the candidate

  const handleScheduleInterview = () => {
    if(Object.keys(interviews).length=== Object.keys(interviews.filter((i)=>i.candidate.id!=candidate.id)).length){
    addInterview(candidate, bestExperts); 
    alert('Interview scheduled!');}
    else {
    alert('Interview already scheduled!');
    }
  };

  if (!candidate) {
    return <div className="text-center py-10">No candidate data available</div>;
  }

  return (
    <>
      <Header />
      <section className="py-10 bg-gray-50 sm:py-16 lg:py-24">
        <div className="px-4 mx-auto max-w-6xl sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row">
            {/* Candidate Details */}
            <div className="lg:w-1/2 mb-8 lg:mb-0">
              <div className="p-4 bg-white shadow-md rounded-md">
                <h3 className="text-xl font-semibold text-gray-900">Candidate</h3>
                <p className="mt-2 text-lg text-gray-600">Name: {candidate.name}</p>
                <p className="text-lg text-gray-600">Position: {candidate.position}</p>
                <p className="text-lg text-gray-600">Interview Date: {candidate.interviewDate}</p>
              </div>
            </div>

            {/* Experts List */}
            <div className="lg:w-1/2 lg:pl-8">
              <div className="text-center p-4 bg-gray-100 rounded-md">
                <h3 className="text-center text-xl font-semibold text-gray-900">Suitable Experts</h3>
                <ul className="items-center mt-4 list-disc list-inside text-gray-600">
                  {topExperts.map((expert) => (
                    <li key={expert.id} className="flex justify-between items-center">
                      <span>{expert.name} - {expert.expertise}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="text-center mt-8">
            <button
              onClick={handleScheduleInterview}
              className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
            >
              Schedule Interview
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
