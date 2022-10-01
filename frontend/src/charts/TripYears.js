import React, { useState, useEffect, PureComponent } from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import {getData} from '../utils';

function TripYears() {

  const [data, setData] = useState([]);

  useEffect(() => {
    if (data.length) {
      return;
    }
    async function fetchData() {
      const tripYearsData = await getData('/api/trips/year');
      // console.log(tripYearsData);
      setData(tripYearsData.data);
    }
    fetchData();
  });

  return (
    <div className="TripYears" style={{ width: '18rem', flex: 1 }}>
      <h4>Trips by Years</h4>
      {data && data.length && 
        <>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart width={150} height={40} data={data}>
            <Bar dataKey="count" fill="#8884d8" />
            <XAxis dataKey="trip_year" />
            <YAxis width={80} />
            <Tooltip />
            <Legend />
          </BarChart>
        </ResponsiveContainer>
        </>}
      
    </div>
  );
}

export default TripYears;
