import React, { useState, useEffect, PureComponent } from 'react';
// import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import {getData} from '../utils';

function TripMonths() {

  const [data, setData] = useState([]);

  useEffect(() => {
    if (data.length) {
      return;
    }
    async function fetchData() {
      const tripMonthsData = await getData('/api/trips/months');
      // console.log(tripMonthsData);
      setData(tripMonthsData.data);
    }
    fetchData();
  });

  return (
    <div className="TripMonths" style={{ width: '18rem', flex: 1 }}>
      <h4>Trips by Months</h4>
      {data && data.length && 
        <>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart width={150} height={40} data={data}>
            <Line dataKey="count" fill="#8884d8" />
            <XAxis dataKey="month_number" />
            <YAxis width={80} />
            <Tooltip />
            <Legend />
          </LineChart>
        </ResponsiveContainer>
        </>}
      
    </div>
  );
}

export default TripMonths;
