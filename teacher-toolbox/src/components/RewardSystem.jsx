// src/components/RewardSystem.jsx
import React from 'react';

const RewardSystem = ({ setCurrentPage, students, rewardItems, newRewardItemName, setNewRewardItemName, newRewardItemCost, setNewRewardItemCost, newRewardItemQuantity, setNewRewardItemQuantity, rewardStudentSearchInput, setRewardStudentSearchInput, currentRewardStudent, setCurrentRewardStudent, pointsToAdd, setPointsToAdd, selectedRewardItem, setSelectedRewardItem, addRewardItem, handleRewardStudentLookup, addPoints, checkoutRewardItem, rewardStudentSearchInputRef, pointsToAddRef, newRewardItemNameRef, newRewardItemCostRef, newRewardItemQuantityRef, handleEnterKey }) => (
  <div className="p-6 bg-white rounded-lg shadow-lg">
    <h2 className="text-3xl font-bold text-gray-800 mb-6">Reward System</h2>
    <p className="text-gray-600 mb-4">
      Award points to students by scanning their badge, and let them redeem points for inventory items.
      Manage students in <span className="font-semibold text-gray-700">Admin Settings</span>.
    </p>

    {/* Lookup Student by Barcode/PIN/Name */}
    <div className="mb-6 p-4 border border-gray-200 rounded-lg bg-gray-50">
      <h3 className="text-xl font-semibold text-gray-700 mb-3">Student Lookup (Scan Badge, PIN, or Name)</h3>
      <div className="flex items-center mb-2">
        <input
          type="text"
          value={rewardStudentSearchInput}
          onChange={(e) => { setRewardStudentSearchInput(e.target.value); }}
          onKeyDown={(e) => handleEnterKey(e, handleRewardStudentLookup)}
          placeholder="Scan/Enter Student Barcode, PIN, or Name"
          className="flex-grow p-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          ref={rewardStudentSearchInputRef}
          autoFocus
        />
        <button
          onClick={handleRewardStudentLookup}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-r-lg shadow-md transition duration-300 ease-in-out"
        >
          Lookup Student
        </button>
      </div>
      {currentRewardStudent ? (
        <p className="text-gray-800 mt-2">
          Selected Student: <span className="font-bold">{currentRewardStudent.name}</span> (Points: <span className="font-bold text-green-700">{currentRewardStudent.points}</span>)
        </p>
      ) : (
        <p className="text-gray-500 italic mt-2">No student selected.</p>
      )}
    </div>

    {/* Add Points to Student */}
    <div className="mb-6 p-4 border border-gray-200 rounded-lg bg-gray-50">
      <h3 className="text-xl font-semibold text-gray-700 mb-3">Add Points</h3>
      <div className="flex items-center">
        <input
          type="number"
          value={pointsToAdd}
          onChange={(e) => { setPointsToAdd(e.target.value); }}
          onKeyDown={(e) => handleEnterKey(e, addPoints)}
          placeholder="Points to add"
          className="flex-grow p-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          ref={pointsToAddRef}
        />
        <button
          onClick={addPoints}
          disabled={!currentRewardStudent || !pointsToAdd || isNaN(parseInt(pointsToAdd)) || parseInt(pointsToAdd) <= 0}
          className={`bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-r-lg shadow-md transition duration-300 ease-in-out ${(!currentRewardStudent || !pointsToAdd || isNaN(parseInt(pointsToAdd)) || parseInt(pointsToAdd) <= 0) ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          Add Points
        </button>
      </div>
    </div>

    {/* Add Reward Item to Inventory */}
    <div className="mb-6 p-4 border border-gray-200 rounded-lg bg-gray-50">
      <h3 className="text-xl font-semibold text-gray-700 mb-3">Add Reward Item to Inventory</h3>
      <input
        type="text"
        value={newRewardItemName}
        onChange={(e) => { setNewRewardItemName(e.target.value); }}
        onKeyDown={(e) => { if (e.key === 'Enter') newRewardItemCostRef.current.focus(); }}
        placeholder="Item Name (e.g., Pencil, Sticker)"
        className="w-full p-2 mb-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        ref={newRewardItemNameRef}
      />
      <input
        type="number"
        id="newRewardItemCostInput"
        value={newRewardItemCost}
        onChange={(e) => { setNewRewardItemCost(e.target.value); }}
        onKeyDown={(e) => { if (e.key === 'Enter') newRewardItemQuantityRef.current.focus(); }}
        placeholder="Point Cost"
        className="w-full p-2 mb-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        ref={newRewardItemCostRef}
      />
      <input
        type="number"
        id="newRewardItemQuantityInput"
        value={newRewardItemQuantity}
        onChange={(e) => { setNewRewardItemQuantity(e.target.value); }}
        onKeyDown={(e) => handleEnterKey(e, addRewardItem)}
        placeholder="Quantity"
        className="w-full p-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        ref={newRewardItemQuantityRef}
      />
      <button
        onClick={addRewardItem}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out"
      >
        Add Item
      </button>
    </div>

    {/* Checkout Reward Item */}
    <div className="mb-6 p-4 border border-gray-200 rounded-lg bg-gray-50">
      <h3 className="text-xl font-semibold text-gray-700 mb-3">Checkout Reward Item</h3>
      <select
        value={selectedRewardItem ? selectedRewardItem.id : ''}
        onChange={(e) => setSelectedRewardItem(rewardItems.find(item => item.id === e.target.value))}
        onKeyDown={(e) => handleEnterKey(e, checkoutRewardItem)}
        className="w-full p-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">Select an item to checkout</option>
        {rewardItems.map(item => (
          <option key={item.id} value={item.id}>{item.name} ({item.cost} pts) - Qty: {item.quantity}</option>
        ))}
      </select>
      <button
        onClick={checkoutRewardItem}
        disabled={!currentRewardStudent || !selectedRewardItem}
        className={`w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out ${(!currentRewardStudent || !selectedRewardItem) ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        Redeem Item
      </button>
    </div>

    {/* Current Reward Inventory */}
    <div className="mt-6">
      <h3 className="text-2xl font-semibold text-gray-700 mb-4">Current Reward Inventory</h3>
      {rewardItems.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
            <thead>
              <tr className="bg-gray-100 border-b">
                <th className="py-2 px-4 text-left text-sm font-medium text-gray-600">Item Name</th>
                <th className="py-2 px-4 text-left text-sm font-medium text-gray-600">Point Cost</th>
                <th className="py-2 px-4 text-left text-sm font-medium text-gray-600">Quantity</th>
              </tr>
            </thead>
            <tbody>
              {rewardItems.map((item) => (
                <tr key={item.id} className="border-b last:border-b-0 hover:bg-gray-50">
                  <td className="py-2 px-4 text-sm text-gray-800">{item.name}</td>
                  <td className="py-2 px-4 text-sm text-gray-800">{item.cost}</td>
                  <td className="py-2 px-4 text-sm text-gray-800">{item.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-gray-500 italic">No reward items in inventory yet. Add some!</p>
      )}
    </div>

    <button
      onClick={() => setCurrentPage('dashboard')}
      className="mt-8 bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out"
    >
      Back to Dashboard
    </button>
  </div>
);

export default RewardSystem;