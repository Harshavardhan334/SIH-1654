import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from './Header';
import axios from 'axios';

export default function MatchPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { candidate, bestExperts } = location.state || {};
  const [loading, setLoading] = useState(false);

  const handleScheduleInterview = async () => {
    if (!candidate || !bestExperts || bestExperts.length === 0) {
      alert('No candidate or experts data available');
      return;
    }

    setLoading(true);
    try {
      const interviewData = {
        boardName: `Panel-${candidate.name}-${Date.now()}`,
        interviewDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 1 week from now
        subjectArea: (candidate.domain || []).join(', '),
        candidate: candidate._id,
        experts: bestExperts.map(expert => expert._id),
        relevancyScore: bestExperts.map(expert => expert.score || 0.8)
      };

      const response = await axios.post('http://localhost:4000/admin/setinterview', interviewData, { withCredentials: true });
      
      if (response.data.success) {
        alert('Interview scheduled successfully!');
        navigate('/admin'); // Redirect back to admin dashboard
      } else {
        alert('Failed to schedule interview');
      }
    } catch (error) {
      console.error('Error scheduling interview:', error);
      alert(error.response?.data?.message || 'Failed to schedule interview');
    } finally {
      setLoading(false);
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
                <p className="text-lg text-gray-600">Domains: {(candidate.domain || []).join(', ')}</p>
                <p className="text-lg text-gray-600">Experience: {candidate.experienceYears} years</p>
                <p className="text-lg text-gray-600">Research Interests: {(candidate.researchInterests || []).join(', ')}</p>
              </div>
            </div>

            {/* Experts List */}
            <div className="lg:w-1/2 lg:pl-8">
              <div className="text-center p-4 bg-gray-100 rounded-md">
                <h3 className="text-center text-xl font-semibold text-gray-900">Suitable Experts</h3>
                <ul className="items-center mt-4 list-disc list-inside text-gray-600">
                  {(bestExperts || []).map((expert) => (
                    <li key={expert._id} className="flex justify-between items-center">
                      <span>{expert.name} - {(expert.domain || []).join(', ')}{expert.score !== undefined ? ` (score: ${expert.score.toFixed(2)})` : ''}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="text-center mt-8">
            <button
              onClick={handleScheduleInterview}
              disabled={loading}
              className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:bg-gray-400"
            >
              {loading ? 'Scheduling...' : 'Schedule Interview'}
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
