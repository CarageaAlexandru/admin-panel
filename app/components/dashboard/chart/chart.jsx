"use client"
import React from 'react';
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer} from 'recharts';

const transactionsData = [
    {id: 4, name: 'Jennica Kindred', status: 'done', date: '22.01.2024', amount: '2400'},
    {id: 5, name: 'Dorolice Crossman', status: 'cancelled', date: '05.02.2024', amount: '3300'},
    {id: 6, name: 'Bailie Coulman', status: 'pending', date: '18.02.2024', amount: '1900'},
    {id: 7, name: 'Felice Walkington', status: 'pending', date: '22.02.2024', amount: '4100'},
    {id: 8, name: 'Emmalynn Penndragon', status: 'pending', date: '14.03.2024', amount: '2950'},
    {id: 9, name: 'Roscoe Barfoot', status: 'done', date: '28.03.2024', amount: '2250'},
    {id: 10, name: 'Barby Heisler', status: 'cancelled', date: '09.04.2024', amount: '1850'},
    {id: 11, name: 'Karylin Stollenbeck', status: 'done', date: '19.04.2024', amount: '5600'},
    {id: 12, name: 'Dorry Gillingham', status: 'cancelled', date: '23.04.2024', amount: '3200'},
    {id: 13, name: 'Patty Kneass', status: 'done', date: '30.04.2024', amount: '2450'},
];

const chartData = transactionsData.map((transaction) => ({
    date: transaction.date,
    amount: transaction.amount
}))

const Chart = (props) => {
    return (
        <div className="h-full bg-base-100">
            <h2 className="text-xl font-semibold mb-2">Weekly Transactions</h2>
            <ResponsiveContainer width="100%" height="100%" className="bg-base-200">
                <LineChart
                    data={chartData}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3"/>
                    <XAxis dataKey="date"/>
                    <YAxis/>
                    <Tooltip/>
                    <Legend/>
                    <Line type="monotone" dataKey="amount" stroke="#8884d8" activeDot={{r: 8}}/>
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default Chart;