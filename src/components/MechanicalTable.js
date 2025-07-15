import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function MechanicalTable({ bot, setBots, bots }) {
  const handleCellChange = (e, rowId, field) => {
    const updatedMechanical = bot.mechanical.map(item =>
      item.id === rowId ? { ...item, [field]: e.target.value } : item
    );
    updateBotData(updatedMechanical, 'mechanical');
  };

  const handleAddRow = () => {
    const newRow = { id: Date.now().toString(), name: '', material: '', qty: '', weight: '' };
    const updatedMechanical = [...bot.mechanical, newRow];
    updateBotData(updatedMechanical, 'mechanical');
  };

  const handleDeleteRow = (rowId) => {
    const updatedMechanical = bot.mechanical.filter(item => item.id !== rowId);
    updateBotData(updatedMechanical, 'mechanical');
  };

  const handleClearRows = () => {
    updateBotData([], 'mechanical');
  };

  const updateBotData = (updatedData, type) => {
    setBots(bots.map(b =>
      b.id === bot.id ? { ...b, [type]: updatedData } : b
    ));
  };

  const totalWeight = bot.mechanical.reduce((sum, item) => {
    const weight = parseFloat(item.weight) || 0;
    const qty = parseInt(item.qty) || 0;
    return sum + (weight * qty);
  }, 0);

  const materialDistribution = bot.mechanical.reduce((acc, item) => {
    if (item.material && item.material.trim() !== '') {
      const weight = parseFloat(item.weight) || 0;
      const qty = parseInt(item.qty) || 0;
      acc[item.material] = (acc[item.material] || 0) + (weight * qty);
    }
    return acc;
  }, {});

  const pieChartData = Object.entries(materialDistribution).map(([material, weight]) => ({
    name: material,
    value: weight,
  }));

  const COLORS = ['#4299E1', '#805AD5', '#38B2AC', '#ED8936', '#ECC94B', '#F56565'];

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden">
      <h3 className="text-2xl font-semibold mb-4 text-gray-800">Mechanical Components</h3>
      <div className="flex-1 flex flex-col lg:flex-row gap-6 h-full overflow-hidden">
        {/* Fixed Height Table Container with Scroll */}
        <div className="flex-1 overflow-x-auto overflow-y-auto rounded-lg shadow-lg border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50 sticky top-0 z-10">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider rounded-tl-lg"></th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Material</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Qty</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider rounded-tr-lg">Weight (kg)</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {bot.mechanical.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-4 text-center text-gray-500">No mechanical components added yet.</td>
                </tr>
              ) : (
                bot.mechanical.map((item) => (
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
                    {/* Table cells with content wrapping */}
                    <td className="px-6 py-4">
                      <input
                        type="text"
                        value={item.name}
                        onChange={(e) => handleCellChange(e, item.id, 'name')}
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        placeholder="Component Name"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <input
                        type="text"
                        value={item.material}
                        onChange={(e) => handleCellChange(e, item.id, 'material')}
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        placeholder="Material (e.g., Steel, Aluminum)"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <input
                        type="number"
                        value={item.qty}
                        onChange={(e) => handleCellChange(e, item.id, 'qty')}
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        placeholder="Quantity"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <input
                        type="number"
                        value={item.weight}
                        onChange={(e) => handleCellChange(e, item.id, 'weight')}
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        placeholder="Weight per item"
                      />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="w-full lg:w-1/3 p-4 bg-gray-50 rounded-xl shadow-inner border border-gray-200 flex flex-col justify-between">
          <h4 className="text-xl font-semibold mb-4 text-gray-800">Mechanical Metrics</h4>
          <div className="flex-1 flex flex-col items-center justify-center">
            <div className="text-center mb-4">
              <p className="text-lg text-gray-700">Total Weight:</p>
              <p className="text-4xl font-bold text-blue-600">{totalWeight.toFixed(2)} kg</p>
            </div>
            {pieChartData.length > 0 && totalWeight > 0 ? (
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={pieChartData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {pieChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `${value.toFixed(2)} kg`} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="text-gray-500 text-center text-sm">
                No material data for chart. Add components with material and weight.
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Buttons with right padding to prevent cutting off the border outline */}
      {/* Adjust pr-value (e.g., pr-4, pr-6, pr-8) to control right padding */}
      <div className="mt-0 flex justify-end space-x-3 py-4 pr-6">
        <button
          onClick={handleClearRows}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition duration-150"
        >
          <svg className="-ml-1 mr-2 h-5 w-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm6 0a1 1 0 012 0v6a1 1 0 11-2 0V8z" clipRule="evenodd"></path>
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

export default MechanicalTable;