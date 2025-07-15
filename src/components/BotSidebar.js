// src/components/BotSidebar.js
import React, { useState } from 'react';

/**
 * BotSidebar Component
 * Displays a list of bots, allows adding new bots, and editing bot names.
 *
 * @param {object} props - The component props.
 * @param {Array} props.bots - The array of all bot objects.
 * @param {function} props.setBots - Function to update the main bots state.
 * @param {string|null} props.selectedBotId - The ID of the currently selected bot.
 * @param {function} props.setSelectedBotId - Function to set the currently selected bot ID.
 * @param {function} props.setCurrentView - Function to set the current view (electronics/mechanical).
 */
function BotSidebar({ bots, setBots, selectedBotId, setSelectedBotId, setCurrentView }) {
  // State to manage which bot's name is currently being edited
  const [editingBotId, setEditingBotId] = useState(null);

  // Function to add a new bot
  const addBot = () => {
    const newBotId = Date.now().toString(); // Simple unique ID
    const newBot = {
      id: newBotId,
      name: `New Bot ${bots.length + 1}`,
      electronics: [{ id: 'e1', name: '', link: '', qty: '', comments: '' }],
      mechanical: [{ id: 'm1', name: '', material: '', qty: '', weight: '' }],
    };
    setBots([...bots, newBot]);
    setSelectedBotId(newBotId); // Select the new bot
    setCurrentView('electronics'); // Default to electronics view for new bot
    setEditingBotId(null); // Ensure no bot name is being edited
  };

  // Function to handle changing a bot's name
  const handleBotNameChange = (e, botId) => {
    const updatedBots = bots.map(bot =>
      bot.id === botId ? { ...bot, name: e.target.value } : bot
    );
    setBots(updatedBots);
  };

  // Function to save the edited bot name when focus is lost or Enter is pressed
  const handleBotNameBlur = () => {
    setEditingBotId(null);
  };

  const handleBotNameKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.target.blur(); // Blur the input to trigger onBlur and save
    }
  };

  return (
    <aside className="w-64 bg-white p-6 border-r border-gray-200 shadow-md flex flex-col rounded-tr-lg">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Your Bots</h2>
      <div className="flex-1 overflow-y-auto pr-2">
        {bots.length === 0 ? (
          <div className="text-gray-500 text-center py-8">
            <p className="mb-2">Looks empty... start building!</p>
            <button
              onClick={addBot}
              className="mt-4 p-3 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600 transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400"
              aria-label="Add new bot"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
              </svg>
            </button>
          </div>
        ) : (
          <ul className="space-y-3">
            {bots.map(bot => (
              <li key={bot.id}>
                {editingBotId === bot.id ? (
                  <input
                    type="text"
                    value={bot.name}
                    onChange={(e) => handleBotNameChange(e, bot.id)}
                    onBlur={handleBotNameBlur}
                    onKeyDown={handleBotNameKeyDown}
                    className="w-full p-2 border border-blue-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                    autoFocus // Automatically focus when editing
                  />
                ) : (
                  <button
                    onClick={() => {
                      setSelectedBotId(bot.id);
                      setCurrentView('electronics'); // Always default to electronics when selecting a bot
                    }}
                    onDoubleClick={() => setEditingBotId(bot.id)} // Double click to edit name
                    className={`w-full text-left p-3 rounded-lg flex items-center justify-between transition duration-200 ${
                      selectedBotId === bot.id
                        ? 'bg-blue-100 text-blue-800 font-medium shadow-inner'
                        : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <span>{bot.name}</span>
                    {/* You can add a small icon or indicator here if needed */}
                  </button>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
      {bots.length > 0 && (
        <button
          onClick={addBot}
          className="mt-6 p-3 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600 transition duration-300 transform hover:scale-105 self-center focus:outline-none focus:ring-2 focus:ring-blue-400"
          aria-label="Add new bot"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
          </svg>
        </button>
      )}
    </aside>
  );
}

export default BotSidebar;