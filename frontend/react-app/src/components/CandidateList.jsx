import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import CandidateSearchList from './CandidateSearchList';
import { useDataFetch } from '../utils/fetchData';
import axios from 'axios'; // Import axios here for the match request

export default function CandidateList() {
  const { candidates, experts  } = useDataFetch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleMatchClick = async (candidate) => {
    setLoading(true);
    setError(null);

    try {
      // Use axios to send a GET request to the backend
      console.log(candidate);
      const response = await axios.get(`http://localhost:4000/match/${candidate._id}`);

      // Check for success in the response
      if (response.data.success) {
        navigate('/match', {
          state: {
            candidate,
            experts: response.data.bestExperts || [],
          },
        });
      } else {
        throw new Error('Failed to retrieve best experts');
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <section className="py-10 bg-gray-50 sm:py-16 lg:py-24">
        <div className="px-4 mx-auto max-w-6xl sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl lg:text-5xl">
              Candidates
            </h2>
          </div>

          <div className="mt-8 md:mt-16 flex justify-center">
            {/* Handle loading and error states */}
            {loading && <p>Loading candidates...</p>}
            {!loading && <p className="text-red-500">{error}</p>}
            {!loading && !error && (
              <CandidateSearchList candidates={candidates} matchClick={handleMatchClick} />
            )}
          </div>

          {loading && <p>Loading...</p>}
          {error && <p className="text-red-500">{error}</p>}
        </div>
      </section>
    </>
  );
}
