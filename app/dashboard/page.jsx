import React from 'react';
import Card from "@/app/ui/dashboard/card/card";
import Transactions from "@/app/ui/dashboard/transactions/transactions";
import Chart from "@/app/ui/dashboard/chart/chart";
import {redirect} from "next/navigation";
import {createClient} from "@/supabase/server";
import {fetchCardData} from "@/app/lib/data";

export default async function DashboardPage() {
    const supabase = createClient();
    const {
        data: {user},
    } = await supabase.auth.getUser();
    if (!user) {
        return redirect("/login");
    }
    // const {revenue, users} = await fetchCardData()
    const {stockValue, totalSales, users} = await fetchCardData()
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
                    <Transactions/>
                </div>
                {/* Chart */}
                <div className="flex flex-1 min-h-0 bg-green-50">
                    <div className="flex-1">
                        <Chart/>
                    </div>

                </div>
            </div>
        </div>
    );
};
