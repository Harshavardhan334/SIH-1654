import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import axios from 'axios';

export default function InterviewsPage() {
  const [interviews, setInterviews] = useState([]);
  const [expandedInterview, setExpandedInterview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchInterviews = async () => {
      try {
        const res = await axios.get('http://localhost:4000/admin/interviews', { withCredentials: true });
        setInterviews(res.data.interviews || []);
      } catch (e) {
        setError(e.response?.data?.message || e.message);
      } finally {
        setLoading(false);
      }
    };
    fetchInterviews();
  }, []);

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
            {loading ? (
              <p className="text-center">Loading...</p>
            ) : error ? (
              <p className="text-center text-red-600">{error}</p>
            ) : interviews.length === 0 ? (
              <p className="text-center text-lg text-gray-600">No scheduled interviews yet.</p>
            ) : (
              <ul className="divide-y divide-gray-200">
                {interviews.map((interview) => (
                  <li key={interview._id} className="p-4 bg-white rounded-md shadow-md mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">
                      Candidate: {interview.candidate?.name}
                    </h3>
                    <p className="text-sm text-gray-600">Subject: {interview.subjectArea}</p>
                    <p className="text-sm text-gray-600">Date: {new Date(interview.interviewDate).toLocaleString()}</p>
                    <button
                      className="mt-2 text-indigo-500 hover:underline"
                      onClick={() => toggleExperts(interview._id)}
                    >
                      {expandedInterview === interview._id ? 'Hide Experts' : 'Show Experts'}
                    </button>
                    {expandedInterview === interview._id && (
                      <ul className="mt-2 list-disc list-inside text-gray-600">
                        {(interview.experts || []).map((expert) => (
                          <li key={expert._id}>{expert.name} - {(expert.domain || []).join(', ')}</li>
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
