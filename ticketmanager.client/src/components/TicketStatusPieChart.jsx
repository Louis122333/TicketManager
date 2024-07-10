import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { getAllTickets } from '../services/api';

const TicketStatusPieChart = () => {
    const [data, setData] = useState([]);
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#D32F2F', '#7B1FA2'];

    useEffect(() => {
        const fetchTickets = async () => {
            try {
                const tickets = await getAllTickets();
                const statusCounts = tickets.reduce((acc, ticket) => {
                    acc[ticket.status] = (acc[ticket.status] || 0) + 1;
                    return acc;
                }, {});

                const chartData = Object.entries(statusCounts).map(([status, count]) => ({ name: status, value: count }));
                setData(chartData);
            } catch (error) {
                console.error('Error fetching tickets:', error);
            }
        };

        fetchTickets();
    }, []);

    return (
        <ResponsiveContainer width="100%" height={400}>
            <PieChart>
                <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${value}`}
                    outerRadius="80%"
                    fill="#8884d8"
                    dataKey="value"
                >
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
                <Tooltip />
                <Legend />
            </PieChart>
        </ResponsiveContainer>
    );
};

export default TicketStatusPieChart;