"use client"
import React, {useEffect, useState} from 'react';
import {PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer} from 'recharts';
import {fetchSalesByCategory} from "@/app/lib/data";

export default function Category() {
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        async function loadData() {
            try {
                const salesData = await fetchSalesByCategory();
                const formattedData = Object.keys(salesData).map(key => ({
                    name: key,
                    value: salesData[key]
                }));
                setChartData(formattedData);
            } catch (error) {
                console.error("Failed to fetch sales by category:", error);
            }
        }

        loadData();
    }, []);

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

    return (
        <div className="h-full bg-base-100">
            <h2 className="text-xl font-semibold mb-2">Sales by Category</h2>
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        data={chartData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({name, percent}) => `${name} (${(percent * 100).toFixed(0)}%)`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                    >
                        {chartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]}/>
                        ))}
                    </Pie>
                    <Tooltip/>
                    <Legend/>
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
}
