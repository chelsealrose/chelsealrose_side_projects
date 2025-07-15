// src/components/LibrarySystem.jsx
import React from 'react';

const LibrarySystem = ({ setCurrentPage, students, books, newBookISBN, setNewBookISBN, newBookTitle, setNewBookTitle, newBookAuthor, setNewBookAuthor, libraryStudentBarcodeInput, setLibraryStudentBarcodeInput, selectedBookForCheckout, setSelectedBookForCheckout, selectedBookForCheckin, setSelectedBookForCheckin, isbnSearchInput, setIsbnSearchInput, isbnSearchLoading, setIsbnSearchLoading, handleISBNLookup, addBook, checkoutBook, checkinBook, isbnSearchInputRef, newBookISBNRef, newBookTitleRef, newBookAuthorRef, libraryStudentBarcodeInputRef, handleEnterKey }) => {
  const isBookLate = (book) => {
    if (book.isAvailable || !book.checkoutDate) return false;
    const checkoutDate = new Date(book.checkoutDate);
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7); // Changed to 7 days
    return checkoutDate < sevenDaysAgo;
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">In-Class Library System</h2>
      <p className="text-gray-600 mb-4">
        Manage your classroom library. Add books (manually or by ISBN search), check them out to students using their barcodes/PINs/names, and check them back in.
      </p>

      {/* Add New Book */}
      <div className="mb-6 p-4 border border-gray-200 rounded-lg bg-gray-50">
        <h3 className="text-xl font-semibold text-gray-700 mb-3">Add New Book</h3>
        <div className="flex items-center mb-2">
          <input
            type="text"
            value={isbnSearchInput}
            onChange={(e) => { setIsbnSearchInput(e.target.value); }}
            onKeyDown={(e) => handleEnterKey(e, handleISBNLookup)}
            placeholder="Search by ISBN (e.g., 9780321765723)"
            className="flex-grow p-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            ref={isbnSearchInputRef}
            autoFocus
          />
          <button
            onClick={handleISBNLookup}
            disabled={isbnSearchLoading}
            className={`bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-r-lg shadow-md transition duration-300 ease-in-out ${isbnSearchLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {isbnSearchLoading ? 'Searching...' : 'Search Book'}
          </button>
        </div>
        <p className="text-gray-500 text-sm mb-2">Or enter details manually:</p>
        <input
          type="text"
          value={newBookISBN}
          onChange={(e) => { setNewBookISBN(e.target.value); }}
          onKeyDown={(e) => { if (e.key === 'Enter') newBookTitleRef.current.focus(); }}
          placeholder="ISBN (manual entry)"
          className="w-full p-2 mb-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          ref={newBookISBNRef}
        />
        <input
          type="text"
          id="newBookTitleInput"
          value={newBookTitle}
          onChange={(e) => { setNewBookTitle(e.target.value); }}
          onKeyDown={(e) => { if (e.key === 'Enter') newBookAuthorRef.current.focus(); }}
          placeholder="Book Title"
          className="w-full p-2 mb-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          ref={newBookTitleRef}
        />
        <input
          type="text"
          id="newBookAuthorInput"
          value={newBookAuthor}
          onChange={(e) => { setNewBookAuthor(e.target.value); }}
          onKeyDown={(e) => handleEnterKey(e, addBook)}
          placeholder="Author"
          className="w-full p-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          ref={newBookAuthorRef}
        />
        <button
          onClick={addBook}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out"
        >
          Add Book
        </button>
      </div>

      {/* Checkout Book */}
      <div className="mb-6 p-4 border border-gray-200 rounded-lg bg-gray-50">
        <h3 className="text-xl font-semibold text-gray-700 mb-3">Checkout Book</h3>
        <select
          value={selectedBookForCheckout ? selectedBookForCheckout.id : ''}
          onChange={(e) => setSelectedBookForCheckout(books.find(book => book.id === e.target.value))}
          className="w-full p-2 mb-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select a book to checkout</option>
          {books.filter(book => book.isAvailable).map(book => (
            <option key={book.id} value={book.id}>{book.title} by {book.author}</option>
          ))}
        </select>
        <input
          type="text"
          value={libraryStudentBarcodeInput}
          onChange={(e) => { setLibraryStudentBarcodeInput(e.target.value); }}
          onKeyDown={(e) => handleEnterKey(e, checkoutBook)}
          placeholder="Scan/Enter Student Barcode, PIN, or Name"
          className="w-full p-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          ref={libraryStudentBarcodeInputRef}
        />
        <button
          onClick={checkoutBook}
          disabled={!selectedBookForCheckout || !libraryStudentBarcodeInput}
          className={`w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out ${(!selectedBookForCheckout || !libraryStudentBarcodeInput) ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          Checkout Book
        </button>
      </div>

      {/* Check-in Book */}
      <div className="mb-6 p-4 border border-gray-200 rounded-lg bg-gray-50">
        <h3 className="text-xl font-semibold text-gray-700 mb-3">Check-in Book</h3>
        <select
          value={selectedBookForCheckin ? selectedBookForCheckin.id : ''}
          onChange={(e) => setSelectedBookForCheckin(books.find(book => book.id === e.target.value))}
          onKeyDown={(e) => handleEnterKey(e, checkinBook)}
          className="w-full p-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select a book to check-in</option>
          {books.filter(book => !book.isAvailable).map(book => (
            <option key={book.id} value={book.id}>{book.title} (by {book.author}) - Borrowed by {book.currentBorrowerName}</option>
          ))}
        </select>
        <button
          onClick={checkinBook}
          disabled={!selectedBookForCheckin}
          className={`w-full bg-yellow-600 hover:bg-yellow-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out ${!selectedBookForCheckin ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          Check-in Book
        </button>
      </div>

      {/* Current Library Inventory */}
      <div className="mt-6">
        <h3 className="text-2xl font-semibold text-gray-700 mb-4">Current Library Inventory</h3>
        {books.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
              <thead>
                <tr className="bg-gray-100 border-b">
                  <th className="py-2 px-4 text-left text-sm font-medium text-gray-600">Title</th>
                  <th className="py-2 px-4 text-left text-sm font-medium text-gray-600">Author</th>
                  <th className="py-2 px-4 text-left text-sm font-medium text-gray-600">ISBN</th>
                  <th className="py-2 px-4 text-left text-sm font-medium text-gray-600">Status</th>
                  <th className="py-2 px-4 text-left text-sm font-medium text-gray-600">Borrowed By</th>
                </tr>
              </thead>
              <tbody>
                {books.map((book) => (
                  <tr key={book.id} className={`border-b last:border-b-0 hover:bg-gray-50 ${isBookLate(book) ? 'bg-red-100' : ''}`}>
                    <td className="py-2 px-4 text-sm text-gray-800">{book.title}</td>
                    <td className="py-2 px-4 text-sm text-gray-800">{book.author}</td>
                    <td className="py-2 px-4 text-sm text-gray-800">{book.isbn}</td>
                    <td className="py-2 px-4 text-sm text-gray-800">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${book.isAvailable ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {book.isAvailable ? 'Available' : (isBookLate(book) ? 'Late' : 'Loaned')}
                      </span>
                    </td>
                    <td className="py-2 px-4 text-sm text-gray-800">{book.currentBorrowerName || 'N/A'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-500 italic">No books in the library yet. Add some!</p>
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
};

export default LibrarySystem;