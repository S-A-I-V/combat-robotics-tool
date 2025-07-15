// src/App.js
import React, { useState } from 'react';
import Header from './components/Header';
import BotSidebar from './components/BotSidebar';
import ElectronicsTable from './components/ElectronicsTable';
import MechanicalTable from './components/MechanicalTable';

// Main App Component
function App() {
  // State to manage the list of bots
  const [bots, setBots] = useState([]);
  // State to manage the currently selected bot
  const [selectedBotId, setSelectedBotId] = useState(null);
  // State to manage the current view for the selected bot (electronics or mechanical)
  const [currentView, setCurrentView] = useState('electronics'); // 'electronics' or 'mechanical'

  // Get the currently selected bot object
  const selectedBot = bots.find(bot => bot.id === selectedBotId);

  return (
    // The root app div must be flex-col and min-h-screen to occupy full viewport height
    <div className="min-h-screen bg-gray-100 font-inter flex flex-col">
      {/* Header */}
      <Header />

      {/* Main Content Area - This div holds the sidebar and the main content. */}
      {/* flex-1 ensures it takes all remaining vertical space after the header. */}
      {/* overflow-hidden is crucial here to prevent the main page from scrolling. */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar */}
        <BotSidebar
          bots={bots}
          setBots={setBots}
          selectedBotId={selectedBotId}
          setSelectedBotId={setSelectedBotId}
          setCurrentView={setCurrentView}
        />

        {/* Right Main Content Area (the 'main' tag) */}
        {/* flex-1 ensures it takes all remaining horizontal space. */}
        {/* flex-col ensures its children are stacked vertically. */}
        {/* overflow-hidden ensures any content overflowing this 'main' area is hidden. */}
        {/* p-8 adds padding around the content. */}
        <main
          className="flex-1 p-8 bg-cover bg-center flex flex-col rounded-tl-lg overflow-hidden" // Added overflow-hidden here
          style={{ backgroundImage: `url('https://placehold.co/1200x800/e0e0e0/ffffff?text=Combat+Robotics+Workspace')` }}
        >
          {selectedBot ? (
            // This white content box needs to fill the available space within 'main'
            // flex-1 ensures it expands to fill vertical space.
            // flex-col arranges its children vertically.
            // overflow-hidden on this div is CRUCIAL to contain the scrollable table.
            // pb-6 added to give more space for buttons at the bottom.
            <div className="bg-white bg-opacity-90 p-6 pb-6 rounded-xl shadow-2xl flex-1 flex flex-col overflow-hidden"> {/* Adjusted pb-6 */}
              <h2 className="text-3xl font-bold mb-6 text-gray-900">{selectedBot.name}</h2>

              {/* View Switcher Tabs */}
              <div className="mb-6 flex space-x-4">
                <button
                  onClick={() => setCurrentView('electronics')}
                  className={`py-2 px-5 rounded-full text-lg font-medium transition duration-300 ${
                    currentView === 'electronics'
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  Electronics Components
                </button>
                <button
                  onClick={() => setCurrentView('mechanical')}
                  className={`py-2 px-5 rounded-full text-lg font-medium transition duration-300 ${
                    currentView === 'mechanical'
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  Mechanical Components
                </button>
              </div>

              {/* Render the appropriate table based on currentView */}
              {currentView === 'electronics' && (
                <ElectronicsTable
                  bot={selectedBot}
                  setBots={setBots}
                  bots={bots}
                />
              )}
              {currentView === 'mechanical' && (
                <MechanicalTable
                  bot={selectedBot}
                  setBots={setBots}
                  bots={bots}
                />
              )}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-gray-700 text-center text-2xl font-semibold">
              <p className="mb-4">Select a bot from the left or add a new one to get started!</p>
              <svg className="w-24 h-24 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm-3.707-9.293a1 1 0 00-1.414 1.414L8.586 12l-2.293 2.293a1 1 0 101.414 1.414L10 13.414l2.293 2.293a1 1 0 001.414-1.414L11.414 12l2.293-2.293a1 1 0 00-1.414-1.414L10 10.586 7.707 8.293z" clipRule="evenodd"></path>
              </svg>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default App;
