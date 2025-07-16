import React, { useState } from 'react';
import Header from './components/Header';
import BotSidebar from './components/BotSidebar';
import ElectronicsTable from './components/ElectronicsTable';
import MechanicalTable from './components/MechanicalTable';

function App() {
  const [bots, setBots] = useState([]);
  const [selectedBotId, setSelectedBotId] = useState(null);
  const [currentView, setCurrentView] = useState('electronics');

  const selectedBot = bots.find(bot => bot.id === selectedBotId);

  
  return (
    // Outermost container:
    // h-screen: Sets the height of the div to 100% of the viewport height.
    // bg-gray-100: Sets a light gray background.
    // font-inter: Applies the Inter font.
    // flex flex-col: Establishes a flex container with items stacked vertically.
    // overflow-hidden: Prevents any scrollbars from appearing on the entire page (main window).
    <div className="h-screen bg-gray-100 font-inter flex flex-col overflow-hidden">
      {/* Header Component */}
      <Header />

      {/* This flex container ensures sidebar and main content share available height:
          flex: Establishes a flex container.
          flex-1: Allows this container to grow and shrink to fill available space.
          overflow-hidden: Essential to contain the sidebar and main content, preventing them from overflowing this container.
      */}
      <div className="flex flex-1 overflow-hidden">
        {/* BotSidebar Component: Manages bot selection and creation */}
        {/*
          Adjust the width of the sidebar. You can use 'w-1/5' for 20%, 'w-1/4' for 25%,
          or a fixed pixel width like 'w-80' (320px).
          'w-72' (288px) is a good starting point to give more space to the main content.
        */}
        <BotSidebar
          bots={bots}
          setBots={setBots}
          selectedBotId={selectedBotId}
          setSelectedBotId={setSelectedBotId}
          setCurrentView={setCurrentView}
          // The width class needs to be applied within the BotSidebar component itself
          // or passed as a prop if it controls its own width. For simplicity,
          // assume BotSidebar directly has a width applied or can receive one.
          // For now, the App component only affects the distribution of space.
        />

        {/* Main content display area (right side):
            flex-1: Allows this section to grow and shrink, taking up the remaining horizontal space.
            p-8: Adds padding all around.
            bg-cover bg-center: Styles for the background image.
            flex flex-col: Establishes a flex container with items stacked vertically.
            overflow-hidden: Prevents this 'main' area itself from scrolling. Scrolling will be managed deeper within.
            rounded-tl-lg: Rounds the top-left corner.
        */}
        <main
          className="flex-1 p-8 bg-cover bg-center flex flex-col overflow-hidden rounded-tl-lg"
          style={{ backgroundImage: `url('https://placehold.co/1200x800/e0e0e0/ffffff?text=Combat+Robotics+Workspace')` }}
        >
          {selectedBot ? (
            // Inner content wrapper when a bot is selected:
            // bg-white bg-opacity-90: White background with 90% opacity.
            // p-6 pb-16: Padding all around, with extra padding at the bottom.
            // rounded-xl shadow-2xl: Rounded corners and a strong shadow.
            // flex-1: Allows this div to fill the available space within its parent 'main'.
            // flex flex-col: Establishes a flex container with items stacked vertically.
            // overflow-hidden: Prevents content within this white box from overflowing it,
            //                  allowing child components (tables) to manage their own scrolls internally.
            <div className="bg-white bg-opacity-90 p-6 pb-16 rounded-xl shadow-2xl flex-1 flex flex-col overflow-hidden">
              {/* Bot Name Heading */}
              <h2 className="text-3xl font-bold mb-6 text-gray-900">{selectedBot.name}</h2>

              {/* Tab buttons for switching between Electronics and Mechanical views */}
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

              {/* Container for the table components:
                  flex-1: Ensures this div takes up the remaining vertical space.
                  flex flex-col: Stacks table components vertically (though only one is visible at a time).
                  overflow-hidden: Prevents the table components from overflowing this container,
                                   allowing them to manage their internal scrolls.
              */}
              <div className="flex-1 flex flex-col overflow-hidden">
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
            </div>
          ) : (
            // Placeholder content when no bot is selected
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