import React from "react";
import Navbar from "../components/Navbar";
import PageTransition from "../components/PageTransition";

const Profile = () => {
  return (
    <div className="min-h-screen pt-32 px-4 md:px-8 flex flex-col items-center">
      <Navbar />
      <PageTransition>
        <div className="glass-card rounded-3xl w-full max-w-2xl p-8 md:p-12">
          {/* dummy user */}

          <h1 className="text-3xl font-bold text-white mb-8 border-b border-white/10 pb-4">
            Your Profile
          </h1>

          <div className="flex flex-col md:flex-row items-center gap-8 mb-10">
            <div className="text-center md:text-left">
              <h2 className="text-2xl font-bold text-white mb-1">John Doe</h2>
              <p className="text-gray-400 mb-3">johndoe@example.com</p>
            </div>
          </div>

          <div className="space-y-4">
            <button className="w-full text-left px-6 py-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors flex justify-between items-center text-gray-200 font-medium">
              Change Password
              <span className="text-indigo-400 text-xl">→</span>
            </button>
            <button className="w-full text-left px-6 py-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors flex justify-between items-center text-gray-200 font-medium">
              Export Data
              <span className="text-indigo-400 text-xl">→</span>
            </button>
          </div>
        </div>
      </PageTransition>
    </div>
  );
};

export default Profile;
