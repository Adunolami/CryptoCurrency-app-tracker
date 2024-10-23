import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';

const Chart = ({ cryptoId }) => {
  const [chartData, setChartData] = useState({});
  const [days, setDays] = useState(7);

  useEffect(() => {
    const fetchChartData = async () => {
      const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${cryptoId}/market_chart`, {
        params: {
          vs_currency: 'usd',
          days: days,
        },
      });

      const prices = response.data.prices.map(price => price[1]);
      const labels = response.data.prices.map(price => new Date(price[0]).toLocaleDateString());

      setChartData({
        labels,
        datasets: [
          {
            label: 'Price in USD',
            data: prices,
            fill: false,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
          },
        ],
      });
    };
    fetchChartData();
  }, [cryptoId, days]);

  return (
    <div>
      <select onChange={(e) => setDays(e.target.value)} className="mb-4">
        <option value="1">1 Day</option>
        <option value="7">1 Week</option>
        <option value="30">1 Month</option>
        <option value="90">3 Months</option>
      </select>
      <Line data={chartData} />
    </div>
  );
};

export default Chart;
