import React from 'react';

const CryptoDetailModal = ({ crypto, onClose }) => {
  if (!crypto) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white rounded p-5 w-11/12 md:w-1/3">
        <h2 className="text-xl font-bold">{crypto.name} ({crypto.symbol.toUpperCase()})</h2>
        <p>Current Price: ${crypto.current_price}</p>
        <p>Market Cap: ${crypto.market_cap}</p>
        <p>24h Change: {crypto.price_change_percentage_24h}%</p>
        <p>Trading Volume: ${crypto.total_volume}</p>
        <button onClick={onClose} className="mt-4 bg-red-500 text-white px-4 py-2 rounded">Close</button>
      </div>
    </div>
  );
};

export default CryptoDetailModal;
