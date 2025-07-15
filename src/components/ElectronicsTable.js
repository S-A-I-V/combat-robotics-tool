// src/components/ElectronicsTable.js
import React from 'react';

/**
 * ElectronicsTable Component
 * Displays and manages a table for electronics components of a specific bot.
 * Allows adding, editing, and deleting rows, and clearing all rows.
 *
 * @param {object} props - The component props.
 * @param {object} props.bot - The current bot object containing electronics data.
 * @param {function} props.setBots - Function to update the main bots state.
 * @param {Array} props.bots - The array of all bot objects.
 */
function ElectronicsTable({ bot, setBots, bots }) {
  // Function to update a cell value in the electronics table
  const handleCellChange = (e, rowId, field) => {
    const updatedElectronics = bot.electronics.map(item =>
      item.id === rowId ? { ...item, [field]: e.target.value } : item
    );
    updateBotData(updatedElectronics, 'electronics');
  };

  // Function to add a new row
  const handleAddRow = () => {
    const newRow = { id: Date.now().toString(), name: '', link: '', qty: '', comments: '' };
    const updatedElectronics = [...bot.electronics, newRow];
    updateBotData(updatedElectronics, 'electronics');
  };

  // Function to delete a specific row from the electronics table
  const handleDeleteRow = (rowId) => {
    const updatedElectronics = bot.electronics.filter(item => item.id !== rowId);
    updateBotData(updatedElectronics, 'electronics');
  };

  // Function to clear all rows from the electronics table
  const handleClearRows = () => {
    updateBotData([], 'electronics'); // Set to an empty array to clear all rows
  };

  // Helper function to update the bot's data (electronics or mechanical) in the main bots state
  const updateBotData = (updatedData, type) => {
    setBots(bots.map(b =>
      b.id === bot.id ? { ...b, [type]: updatedData } : b
    ));
  };

  return (
    // This outer div needs to be flex-1 to take up remaining space within its parent (the white content box in App.js)
    // and flex-col to arrange its children (title, table, buttons) vertically.
    // h-0 is added here as well for strict flex behavior
    <div className="flex-1 flex flex-col h-0 overflow-hidden"> {/* Added h-0 */}
      <h3 className="text-2xl font-semibold mb-4 text-gray-800">Electronics Components</h3>

      {/* This div is the scrollable container. flex-1 makes it take up all available vertical space */}
      {/* overflow-y-auto ensures a scrollbar appears when content overflows */}
      {/* No max-h needed here, as parent's height is now explicitly managed */}
      <div className="overflow-x-auto overflow-y-auto flex-1 rounded-lg shadow-lg border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50 sticky top-0 z-10">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider rounded-tl-lg"></th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Link/Specs</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Qty</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider rounded-tr-lg">Comments</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {bot.electronics.length === 0 ? (
              <tr>
                <td colSpan="6" className="px-6 py-4 text-center text-gray-500">No electronics components added yet.</td>
              </tr>
            ) : (
              bot.electronics.map((item) => (
                <tr key={item.id}>
                  <td className="px-4 py-2 whitespace-nowrap text-center">
                    <button
                      onClick={() => handleDeleteRow(item.id)}
                      className="text-red-500 hover:text-red-700 transition duration-150"
                      aria-label="Delete row"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm6 0a1 1 0 012 0v6a1 1 0 11-2 0V8z" clipRule="evenodd"></path>
                      </svg>
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="text"
                      value={item.name}
                      onChange={(e) => handleCellChange(e, item.id, 'name')}
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                      placeholder="Component Name"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="text"
                      value={item.link}
                      onChange={(e) => handleCellChange(e, item.id, 'link')}
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                      placeholder="Link/Specs"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="number"
                      value={item.qty}
                      onChange={(e) => handleCellChange(e, item.id, 'qty')}
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                      placeholder="Quantity"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="text"
                      value={item.comments}
                      onChange={(e) => handleCellChange(e, item.id, 'comments')}
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                      placeholder="Comments"
                    />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Action Buttons: Add Row and Clear Rows */}
      {/* mt-4 provides space above the buttons */}
      <div className="mt-4 flex justify-end space-x-3">
        <button
          onClick={handleClearRows}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition duration-150"
        >
          <svg className="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm6 0a1 1 0 012 0v6a1 1 0 11-2 0V8z" clipRule="evenodd" />
          </svg>
          Clear Rows
        </button>
        <button
          onClick={handleAddRow}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150"
        >
          <svg className="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          Add Row
        </button>
      </div>
    </div>
  );
}

export default ElectronicsTable;
