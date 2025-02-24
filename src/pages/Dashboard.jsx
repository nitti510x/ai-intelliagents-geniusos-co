import React, { useEffect, useState } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import { supabase } from '../config/supabase';
import AIAgentsList from '../components/dashboard/AIAgentsList';
import AgentSettings from '../components/dashboard/AgentSettings';
import AgentActivity from '../components/dashboard/AgentActivity';
import AgentUsage from '../components/dashboard/AgentUsage';
import OverallUsage from '../components/dashboard/OverallUsage';
import Profile from '../components/dashboard/Profile';
import Subscription from '../components/dashboard/Subscription';
import SetupGuide from '../components/dashboard/SetupGuide';
import Logo from '../components/Logo';
import { FiUser, FiLogOut } from 'react-icons/fi';

function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
    });
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-dark">
      <nav className="bg-dark-lighter border-b border-dark-card">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="text-2xl font-bold text-gray-100">
              <Logo className="h-8" />
            </Link>
            <div className="flex items-center space-x-6">
              {user && (
                <span className="text-text-light">
                  {user.email}
                </span>
              )}
              <Link 
                to="/dashboard/profile" 
                className="flex items-center text-gray-400 hover:text-secondary transition-colors"
              >
                <FiUser className="w-5 h-5 mr-2" />
                <span>Profile</span>
              </Link>
              <button
                onClick={handleSignOut}
                className="flex items-center text-gray-400 hover:text-secondary transition-colors"
              >
                <FiLogOut className="w-5 h-5 mr-2" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-6 py-8">
        <Routes>
          <Route index element={<AIAgentsList />} />
          <Route path="settings/:agentId" element={<AgentSettings />} />
          <Route path="activity/:agentId" element={<AgentActivity />} />
          <Route path="usage/:agentId" element={<AgentUsage />} />
          <Route path="usage" element={<OverallUsage />} />
          <Route path="profile" element={<Profile />} />
          <Route path="subscription" element={<Subscription />} />
          <Route path="setup/:agentId" element={<SetupGuide />} />
        </Routes>
      </div>
    </div>
  );
}

export default Dashboard;