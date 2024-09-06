
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import CandidatePage from './components/CandidatePage';
import MatchPage from './components/MatchPage';

import Login from "./pages/Login"
import axios from 'axios';
axios.defaults.withCredentials=true;

import InterviewsPage from './pages/InterviewsPage';
import { InterviewsProvider } from './context/InterviewsContext';
import { CandidateDashboard } from './pages/CandidateDashboard';
import AdminDashboard from './pages/AdminDashboard';
import  ExpertDashboard  from './pages/ExpertDashboard';

function App() {

  return (
    <>
    <InterviewsProvider>
    <Router>
      <Routes>
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/candidate/:id" element={<CandidatePage />} />
        <Route path="/match" element={<MatchPage />} />
        <Route path="/" element={<Login/>}/>
        <Route path="/interviews" element={<InterviewsPage />} />
        <Route path='/candidate' element={<CandidateDashboard/>}/>
        <Route path='/expert' element={<ExpertDashboard/>}/>
      </Routes>
    </Router>
    </InterviewsProvider>

    </>
  )
}

export default App
