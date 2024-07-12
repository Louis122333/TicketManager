import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { getAllTickets } from '../../services/api';

const TicketTypePieChart = () => {
    const [data, setData] = useState([]);
    const COLORS = ['#0088FE', '#00C49F'];

    useEffect(() => {
        const fetchTickets = async () => {
            try {
                const tickets = await getAllTickets();
                const incidents = tickets.filter(ticket => ticket.type === 'Incident').length;
                const requests = tickets.filter(ticket => ticket.type === 'Request').length;
                setData([
                    { name: 'Incidents', value: incidents },
                    { name: 'Requests', value: requests }
                ]);
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
                    label={({ name, value }) => `${name}: ${value}`}
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

export default TicketTypePieChart;