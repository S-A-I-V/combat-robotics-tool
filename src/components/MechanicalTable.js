// src/components/MechanicalTable.js
import React from 'react';

/**
 * MechanicalTable Component
 * Displays and manages a table for mechanical components of a specific bot.
 * Also shows mechanical metrics like total weight and material distribution.
 * Allows adding, editing, and deleting rows.
 *
 * @param {object} props - The component props.
 * @param {object} props.bot - The current bot object containing mechanical data.
 * @param {function} props.setBots - Function to update the main bots state.
 * @param {Array} props.bots - The array of all bot objects.
 */
function MechanicalTable({ bot, setBots, bots }) {
  // Function to update a cell value in the mechanical table
  const handleCellChange = (e, rowId, field) => {
    const updatedMechanical = bot.mechanical.map(item =>
      item.id === rowId ? { ...item, [field]: e.target.value } : item
    );
    updateBotData(updatedMechanical, 'mechanical');
  };

  // Function to add a new row when 'Enter' key is pressed in an input field
  const handleAddRow = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
    }
    const newRow = { id: Date.now().toString(), name: '', material: '', qty: '', weight: '' };
    const updatedMechanical = [...bot.mechanical, newRow];
    updateBotData(updatedMechanical, 'mechanical');
  };

  // Function to delete a specific row from the mechanical table
  const handleDeleteRow = (rowId) => {
    const updatedMechanical = bot.mechanical.filter(item => item.id !== rowId);
    updateBotData(updatedMechanical, 'mechanical');
  };

  // Helper function to update the bot's data (electronics or mechanical) in the main bots state
  const updateBotData = (updatedData, type) => {
    setBots(bots.map(b =>
      b.id === bot.id ? { ...b, [type]: updatedData } : b
    ));
  };

  // Calculate total weight for mechanical components
  const totalWeight = bot.mechanical.reduce((sum, item) => {
    const weight = parseFloat(item.weight) || 0;
    const qty = parseInt(item.qty) || 0;
    return sum + (weight * qty);
  }, 0);

  // Calculate material distribution for a simple "pie chart" representation
  const materialDistribution = bot.mechanical.reduce((acc, item) => {
    if (item.material) {
      acc[item.material] = (acc[item.material] || 0) + (parseFloat(item.weight) || 0);
    }
    return acc;
  }, {});

  // Convert distribution to an array for easier rendering (e.g., for a real chart library)
  const pieChartData = Object.entries(materialDistribution).map(([material, weight]) => ({
    material,
    weight,
    percentage: (weight / totalWeight) * 100 || 0
  }));

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <h3 className="text-2xl font-semibold mb-4 text-gray-800">Mechanical Components</h3>
      <div className="flex-1 flex flex-col lg:flex-row gap-6 overflow-hidden">
        {/* Table Section - Added max-h-[calc(100vh-320px)] and overflow-y-auto */}
        <div className="flex-1 overflow-x-auto overflow-y-auto max-h-[calc(100vh-320px)] rounded-lg shadow-lg border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50 sticky top-0 z-10"> {/* Added sticky top-0 and z-10 for sticky header */}
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider rounded-tl-lg"></th> {/* For delete button */}
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Material</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Qty</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider rounded-tr-lg">Weight (kg)</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {bot.mechanical.map((item, index) => (
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
                      onKeyDown={handleAddRow}
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                      placeholder="Component Name"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="text"
                      value={item.material}
                      onChange={(e) => handleCellChange(e, item.id, 'material')}
                      onKeyDown={handleAddRow}
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                      placeholder="Material (e.g., Steel, Aluminum)"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="number"
                      value={item.qty}
                      onChange={(e) => handleCellChange(e, item.id, 'qty')}
                      onKeyDown={handleAddRow}
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                      placeholder="Quantity"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="number"
                      value={item.weight}
                      onChange={(e) => handleCellChange(e, item.id, 'weight')}
                      onKeyDown={handleAddRow}
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                      placeholder="Weight per item"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Metrics Section */}
        <div className="w-full lg:w-1/3 p-4 bg-gray-50 rounded-xl shadow-inner border border-gray-200 flex flex-col justify-between">
          <h4 className="text-xl font-semibold mb-4 text-gray-800">Mechanical Metrics</h4>
          <div className="flex-1 flex flex-col items-center justify-center">
            <div className="text-center mb-4">
              <p className="text-lg text-gray-700">Total Weight:</p>
              <p className="text-4xl font-bold text-blue-600">{totalWeight.toFixed(2)} kg</p>
            </div>
            {/* Simple representation of a "pie chart" - can be replaced with a library later */}
            <div className="w-48 h-48 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 text-sm font-medium border-4 border-gray-300">
              {pieChartData.length > 0 ? (
                <ul className="list-disc list-inside">
                  {pieChartData.map((data, index) => (
                    <li key={index} className="text-gray-700">
                      {data.material}: {data.percentage.toFixed(1)}%
                    </li>
                  ))}
                </ul>
              ) : (
                <span>No data for chart</span>
              )}
            </div>
            <p className="mt-4 text-gray-600 text-center">Material Distribution (by weight)</p>
          </div>
        </div>
      </div>
      {/* Add Row Button for Mechanical Table */}
      <div className="mt-4 text-right">
        <button
          onClick={() => handleAddRow()}
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

export default MechanicalTable;