import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SearchBar from './components/SearchBar';
import CryptoCard from './components/CryptoCard';
import Chart from './components/Chart';
import CryptoDetailModal from './components/CryptoDetailModal';

const App = () => {
  const [cryptos, setCryptos] = useState([]);
  const [selectedCrypto, setSelectedCrypto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const fetchCryptos = async () => {
      try {
        const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets', {
          params: {
            vs_currency: 'usd',
            order: 'market_cap_desc',
            per_page: 10,
            page: 1,
            sparkline: false,
          },
        });
        setCryptos(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchCryptos();

    // Check dark mode preference
    const storedMode = localStorage.getItem('dark-mode');
    if (storedMode) {
      setIsDarkMode(JSON.parse(storedMode));
    }
  }, []);

  const handleSearch = (cryptoName) => {
    const selected = cryptos.find(c => c.name.toLowerCase() === cryptoName.toLowerCase());
    setSelectedCrypto(selected);
  };

  const closeModal = () => {
    setSelectedCrypto(null);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    localStorage.setItem('dark-mode', !isDarkMode);
  };

  return (
    <div className={`container mx-auto p-4 ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}>
      <h1 className="text-2xl font-bold mb-4">Cryptocurrency Tracker</h1>
      <button onClick={toggleDarkMode} className="mb-4 bg-gray-600 text-white px-4 py-2 rounded">
        {isDarkMode ? 'Light Mode' : 'Dark Mode'}
      </button>
      <SearchBar cryptos={cryptos} onSearch={handleSearch} />
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {cryptos.map(crypto => (
            <div key={crypto.id} onClick={() => setSelectedCrypto(crypto)}>
              <CryptoCard crypto={crypto} />
            </div>
          ))}
        </div>
      )}
      {selectedCrypto && <CryptoDetailModal crypto={selectedCrypto} onClose={closeModal} />}
      {selectedCrypto && <Chart cryptoId={selectedCrypto.id} />}
    </div>
  );
};

export default App;