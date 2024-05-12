import React from 'react';
import Card from "@/app/ui/dashboard/card/card";
import Transactions from "@/app/ui/dashboard/transactions/transactions";
import Chart from "@/app/ui/dashboard/chart/chart";
import {redirect} from "next/navigation";
import {createClient} from "@/supabase/server";
import {fetchCardData, fetchLastTransactions, fetchSalesByCategory} from "@/app/lib/data";
import Category from "@/app/ui/dashboard/chart/category";

export default async function DashboardPage() {
    const supabase = createClient();

    const {
        data: {user},
    } = await supabase.auth.getUser();
    if (!user) {
        return redirect("/login");
    }
    const {stockValue, totalSales, users} = await fetchCardData()
    const transactions = await fetchLastTransactions()
    return (
        <div className="flex h-full p-2 w-3/4  ">
            {/* Left side content area */}
            <div className="flex-1 flex flex-col gap-3">
                {/* Cards container */}
                <div className="grid lg:grid-cols-3 md:grid-cols-1 gap-4 sm:grid-cols-1">
                    <Card title="Total Users" value={users}/>
                    <Card title="Total Stock Value" value={stockValue}/>
                    <Card title="Total Sales" value={totalSales}/>
                </div>
                {/* Transactions */}
                <div className="flex-1  mb-4 overflow-y-auto">
                    <Transactions transactions={transactions}/>
                </div>
                {/* Chart */}
                <div className="flex items-center justify-center">
                    <div className="w-full h-[400px]"><Chart/></div>
                    <div className="w-full h-[400px]"><Category/></div>
                </div>
            </div>
        </div>
    );
};
