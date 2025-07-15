// src/components/Header.js
import React from 'react';

/**
 * Header Component
 * Displays the main application header with the title and navigation links.
 */
function Header() {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-purple-700 text-white p-4 shadow-lg flex items-center justify-between rounded-b-lg">
      <div className="flex items-center">
        <h1 className="text-3xl font-bold tracking-wide">Bot HelpDesk</h1>
        {/* Placeholder for a logo/icon */}
        <svg className="w-8 h-8 ml-3 text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 100-2 1 1 0 000 2zm7-1a1 1 0 11-2 0 1 1 0 012 0zm-.464 5.535a1 1 0 10-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
        </svg>
      </div>
      {/* Navigation/User actions can go here */}
      <nav className="space-x-4">
        <button className="py-2 px-4 rounded-full bg-white bg-opacity-20 hover:bg-opacity-30 transition duration-300">Dashboard</button>
        <button className="py-2 px-4 rounded-full bg-white bg-opacity-20 hover:bg-opacity-30 transition duration-300">Settings</button>
      </nav>
    </header>
  );
}

export default Header;