import React from 'react';

const CryptoCard = ({ crypto }) => {
  return (
    <div className="border rounded p-4 mb-4">
      <h2 className="text-xl font-bold">{crypto.name} ({crypto.symbol.toUpperCase()})</h2>
      <p>Price: ${crypto.current_price}</p>
      <p>24h Change: {crypto.price_change_percentage_24h}%</p>
      <p>Market Cap: ${crypto.market_cap}</p>
      <p>Trading Volume: ${crypto.total_volume}</p>
    </div>
  );
};

export default CryptoCard;
