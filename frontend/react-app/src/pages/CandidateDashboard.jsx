import { useEffect, useState } from "react";
import axios from "axios";
import HeaderForCandidateD from "../components/HeaderForCandidateD";

export function CandidateDashboard() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [candidate, setCandidate] = useState(null);
  const [interviews, setInterviews] = useState([]);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [updateForm, setUpdateForm] = useState({
    name: '',
    domain: [],
    researchInterests: [],
    experienceYears: 0,
    projects: []
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:4000/candidate/home", { withCredentials: true });
        setCandidate(res.data.candidate);
        setInterviews(res.data.interviews || []);
        if (res.data.candidate) {
          setUpdateForm({
            name: res.data.candidate.name || '',
            domain: res.data.candidate.domain || [],
            researchInterests: res.data.candidate.researchInterests || [],
            experienceYears: res.data.candidate.experienceYears || 0,
            projects: res.data.candidate.projects || []
          });
        }
      } catch (e) {
        setError(e.response?.data?.message || e.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put("http://localhost:4000/candidate/update", updateForm, { withCredentials: true });
      setCandidate(res.data.candidate);
      setShowUpdateForm(false);
      alert('Profile updated successfully!');
    } catch (e) {
      alert(e.response?.data?.message || 'Update failed');
    }
  };

  const addArrayItem = (field) => {
    const value = prompt(`Enter new ${field}:`);
    if (value && value.trim()) {
      setUpdateForm(prev => ({
        ...prev,
        [field]: [...prev[field], value.trim()]
      }));
    }
  };

  const removeArrayItem = (field, index) => {
    setUpdateForm(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  return (
    <>
      <HeaderForCandidateD />
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto flex flex-col">
          <div className="lg:w-4/6 mx-auto">
            {loading ? (
              <p className="text-center">Loading...</p>
            ) : error ? (
              <p className="text-center text-red-600">{error}</p>
            ) : (
              <div className="flex flex-col sm:flex-row mt-10">
                <div className="sm:w-1/3 text-center sm:pr-8 sm:py-8">
                  <div className="w-20 h-20 rounded-full inline-flex items-center justify-center bg-gray-200 text-gray-400">
                    <svg
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="w-10 h-10"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                  </div>
                  <div className="flex flex-col items-center text-center justify-center">
                    <h2 className="font-medium title-font mt-4 text-gray-900 text-lg">
                      {candidate?.name}
                    </h2>
                    <div className="w-12 h-1 bg-indigo-500 rounded mt-2 mb-4"></div>
                    <button
                      onClick={() => setShowUpdateForm(!showUpdateForm)}
                      className="inline-flex items-center justify-center px-4 py-2 text-base font-semibold text-white transition-all duration-200 bg-blue-600 border border-transparent rounded-md focus:outline-none hover:bg-blue-700 focus:bg-blue-700"
                    >
                      {showUpdateForm ? 'Cancel Update' : 'Update Profile'}
                    </button>
                  </div>
                </div>
                <div className="sm:w-2/3 sm:pl-8 sm:py-8 sm:border-l border-gray-200 sm:border-t-0 border-t mt-4 pt-4 sm:mt-0 text-center sm:text-left">
                  {!showUpdateForm ? (
                    <div>
                      <p className="leading-relaxed text-lg mb-4">
                        <strong>Domains:</strong> {(candidate?.domain || []).join(", ")}<br />
                        <strong>Research Interests:</strong> {(candidate?.researchInterests || []).join(", ")}<br />
                        <strong>Experience:</strong> {candidate?.experienceYears} years<br />
                        <strong>Projects:</strong> {(candidate?.projects || []).join(", ")}
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleUpdate} className="space-y-5">
                      <div>
                        <label htmlFor="name" className="text-base font-medium text-gray-900">Name</label>
                        <input
                          type="text"
                          id="name"
                          value={updateForm.name}
                          onChange={(e) => setUpdateForm(prev => ({ ...prev, name: e.target.value }))}
                          className="mt-2.5 block w-full py-3 px-4 text-black placeholder-gray-500 transition-all duration-200 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-blue-600 caret-blue-600"
                          required
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="experienceYears" className="text-base font-medium text-gray-900">Experience Years</label>
                        <input
                          type="number"
                          id="experienceYears"
                          value={updateForm.experienceYears}
                          onChange={(e) => setUpdateForm(prev => ({ ...prev, experienceYears: parseInt(e.target.value) }))}
                          className="mt-2.5 block w-full py-3 px-4 text-black placeholder-gray-500 transition-all duration-200 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-blue-600 caret-blue-600"
                          required
                        />
                      </div>

                      <div>
                        <label className="text-base font-medium text-gray-900">Domains</label>
                        <div className="mt-2.5 flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => addArrayItem('domain')}
                            className="inline-flex items-center justify-center px-3 py-2 text-sm font-semibold text-white transition-all duration-200 bg-green-600 border border-transparent rounded-md focus:outline-none hover:bg-green-700 focus:bg-green-700"
                          >
                            Add Domain
                          </button>
                        </div>
                        <div className="mt-2 space-y-2">
                          {updateForm.domain.map((item, index) => (
                            <div key={index} className="flex items-center gap-2">
                              <span className="px-3 py-2 bg-gray-100 border border-gray-200 rounded-md text-gray-700">{item}</span>
                              <button
                                type="button"
                                onClick={() => removeArrayItem('domain', index)}
                                className="text-red-600 hover:text-red-800 font-bold text-lg"
                              >
                                ×
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="text-base font-medium text-gray-900">Research Interests</label>
                        <div className="mt-2.5 flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => addArrayItem('researchInterests')}
                            className="inline-flex items-center justify-center px-3 py-2 text-sm font-semibold text-white transition-all duration-200 bg-green-600 border border-transparent rounded-md focus:outline-none hover:bg-green-700 focus:bg-green-700"
                          >
                            Add Interest
                          </button>
                        </div>
                        <div className="mt-2 space-y-2">
                          {updateForm.researchInterests.map((item, index) => (
                            <div key={index} className="flex items-center gap-2">
                              <span className="px-3 py-2 bg-gray-100 border border-gray-200 rounded-md text-gray-700">{item}</span>
                              <button
                                type="button"
                                onClick={() => removeArrayItem('researchInterests', index)}
                                className="text-red-600 hover:text-red-800 font-bold text-lg"
                              >
                                ×
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="text-base font-medium text-gray-900">Projects</label>
                        <div className="mt-2.5 flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => addArrayItem('projects')}
                            className="inline-flex items-center justify-center px-3 py-2 text-sm font-semibold text-white transition-all duration-200 bg-green-600 border border-transparent rounded-md focus:outline-none hover:bg-green-700 focus:bg-green-700"
                          >
                            Add Project
                          </button>
                        </div>
                        <div className="mt-2 space-y-2">
                          {updateForm.projects.map((item, index) => (
                            <div key={index} className="flex items-center gap-2">
                              <span className="px-3 py-2 bg-gray-100 border border-gray-200 rounded-md text-gray-700">{item}</span>
                              <button
                                type="button"
                                onClick={() => removeArrayItem('projects', index)}
                                className="text-red-600 hover:text-red-800 font-bold text-lg"
                              >
                                ×
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <button
                          type="submit"
                          className="inline-flex items-center justify-center w-full px-4 py-3 text-base font-semibold text-white transition-all duration-200 bg-blue-600 border border-transparent rounded-md focus:outline-none hover:bg-blue-700 focus:bg-blue-700"
                        >
                          Update Profile
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="py-10 bg-gray-50 sm:py-16 lg:py-24">
        <div className="px-4 mx-auto max-w-6xl sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center">Interview Details</h2>
          {interviews.length === 0 ? (
            <p className="text-center mt-4 text-gray-600">No interview scheduled yet.</p>
          ) : (
            <div className="mt-6 space-y-4">
              {interviews.map((iv) => (
                <div key={iv._id} className="p-4 bg-white rounded-md shadow-md">
                  <p className="text-sm text-gray-600">Date: {new Date(iv.interviewDate).toLocaleString()}</p>
                  <p className="text-sm text-gray-600">Subject: {iv.subjectArea}</p>
                  <h4 className="mt-2 font-semibold">Experts:</h4>
                  <ul className="list-disc list-inside text-gray-600">
                    {(iv.experts || []).map((ex) => (
                      <li key={ex._id}>{ex.name} - {(ex.domain || []).join(', ')}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
