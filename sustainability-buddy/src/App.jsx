import { Routes, Route, Navigate } from 'react-router-dom'
import { useEffect } from 'react'
import './App.css'
import Onboarding from './pages/Onboarding.jsx'
import Home from './pages/Home.jsx'
import Profile from './pages/Profile.jsx'
import Chat from './pages/Chat.jsx'
import ActionTracker from './pages/ActionTracker.jsx'
import Events from './pages/Events.jsx'
import userProfile from './utils/userProfile.js'

function App() {
  useEffect(() => {
    // Check if user needs onboarding
    userProfile.loadFromStorage();
  }, []);

  return (
    <>
      <Routes>
        <Route 
          path="/onboarding" 
          element={<Onboarding />} 
        />
        <Route 
          path="/home" 
          element={<Home />} 
        />
        <Route 
          path="/profile" 
          element={<Profile />} 
        />
        <Route 
          path="/chat" 
          element={<Chat />} 
        />
        <Route 
          path="/actions" 
          element={<ActionTracker />} 
        />
        <Route 
          path="/events" 
          element={<Events />} 
        />
        <Route 
          path="/" 
          element={
            userProfile.onboardingComplete ? 
              <Navigate to="/home" replace /> : 
              <Navigate to="/onboarding" replace />
          } 
        />
      </Routes>
    </>
  )
}

export default App
