import React from "react";
import Navbar from "../components/Navbar";
import PageTransition from "../components/PageTransition";

const Dashboard = () => {
  return (
    <div className="min-h-screen pt-32 px-8 flex flex-col items-center">
      <Navbar />

      <PageTransition>
        <div className="flex flex-col items-center w-full">
          <h1 className="text-3xl font-bold text-white">Dashboard</h1>
        </div>
      </PageTransition>
    </div>
  );
};

export default Dashboard;
