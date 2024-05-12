"use client"
import React, {useEffect, useState} from 'react';
import {AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer} from 'recharts';
import {fetchLastTransactions} from "@/app/lib/data";
import {formatDate} from "@/app/lib/utils";

export default function Chart() {
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        async function loadData() {
            try {
                const transactions = await fetchLastTransactions();
                const formattedData = transactions.map(({transaction_date, total_amount}) => ({
                    date: formatDate(transaction_date),
                    amount: total_amount
                }));
                setChartData(formattedData);
            } catch (error) {
                console.error("Failed to fetch transactions:", error);
            }
        }

        loadData();
    }, []);
    return (
        <div className="h-full bg-base-100">
            <h2 className="text-xl font-semibold mb-2">Weekly Transactions</h2>
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}
                >
                    <defs>
                        <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                        </linearGradient>
                        <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
                        </linearGradient>
                    </defs>
                    <XAxis dataKey="date"/>
                    <YAxis/>
                    <Tooltip/>
                    <Area type="monotone" dataKey="amount" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)"/>
                    <Area type="monotone" dataKey="date" stroke="#82ca9d" fillOpacity={1} fill="url(#colorPv)"/>
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
};