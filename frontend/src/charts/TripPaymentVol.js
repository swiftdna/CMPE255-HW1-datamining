import React, { useState, useEffect, PureComponent } from 'react';
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from 'recharts';
import { getData } from '../utils';

function TripPaymentVol() {

  const [data, setData] = useState([]);

  useEffect(() => {
    if (data.length) {
      return;
    }
    async function fetchData() {
      const tripMonthsData = await getData('/api/trips/payment');
      // console.log(tripMonthsData);
      setData(tripMonthsData.data);
    }
    fetchData();
  });

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {`${data[index].payment_type} ${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div className="TripPaymentVol" style={{ width: '18rem', flex: 1 }}>
      <h4>Payment Volume share for trips</h4>
      {data && data.length && 
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={80}
            fill="#8884d8"
            dataKey="total_volume"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    }
      
    </div>
  );
}

export default TripPaymentVol;
