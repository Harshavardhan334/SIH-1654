import { useState, useEffect } from 'react';
import axios from 'axios';

export const useDataFetch = () => {
  const [candidates, setCandidates] = useState([]);
  const [experts, setExperts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const candidatesResponse = await axios.get('http://localhost:4000/admin/candidates');
        // console.log(candidatesResponse);
        if (!candidatesResponse.data.success) {
          throw new Error('Network response was not ok');
        }
        const candidatesData = await candidatesResponse.data.candidates;
        console.log(candidatesData);

        // Uncomment and update the experts API call as needed
        // const expertsResponse = await fetch('http://localhost:4000/admin/experts');
        // if (!expertsResponse.ok) {
        //   throw new Error('Network response was not ok');
        // }
        // const expertsData = await expertsResponse.json();
        // console.log(expertsData);

        setCandidates(candidatesData.candidates);
        // setExperts(expertsData.experts);

      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to fetch data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { candidates, experts, loading, error };
};
