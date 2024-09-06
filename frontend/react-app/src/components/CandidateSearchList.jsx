import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function CandidateSearchList({ candidates, matchClick }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const navigate = useNavigate();
  // console.log(candidates)
  // Filter candidates by search term
  
  const filteredCandidates = candidates.filter((candidate) =>
    candidate.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectCandidate = (candidate) => {
    setSelectedCandidate(candidate);
  };

  const viewDetails = () => {
    if (selectedCandidate) {
      navigate(`/candidate/${selectedCandidate._id}`);
    }
  };

  return (
    <div className="max-w-sm mx-auto">
      {/* Search Input */}
      <input
        type="text"
        placeholder="Search candidate by name"
        className="mb-4 w-full p-2 border border-gray-300 rounded-md"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* Scrollable Candidate List */}
      <div className="overflow-y-auto max-h-60 border border-gray-200 rounded-md">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100 sticky top-0">
            <tr>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Position</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredCandidates.map((candidate) => (
              <tr
                key={candidate.id}
                onClick={() => handleSelectCandidate(candidate)}
                className="cursor-pointer hover:bg-gray-50"
              >
                <td className="px-4 py-2 text-sm font-medium text-gray-900">
                  {candidate.name}
                </td>
                <td className="px-4 py-2 text-sm text-gray-500">{candidate.position}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Action Buttons */}
      {selectedCandidate && (
        <div className="mt-8 flex gap-2">
          <button
            onClick={() => matchClick(selectedCandidate)}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none"
          >
            Match
          </button>
          <button
            onClick={viewDetails}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none"
          >
            View Details
          </button>
        </div>
      )}
    </div>
  );
}
