import React from 'react';
import Card from "@/app/components/dashboard/card/card";
import Transactions from "@/app/components/dashboard/transactions/transactions";
import Chart from "@/app/components/dashboard/chart/chart";
import Rightbar from "@/app/components/dashboard/rightbar/rightbar";
import {redirect} from "next/navigation";
import {createClient} from "@/supabase/server";

const supabase = createClient();

const DashboardPage = async () => {
    const {
        data: {user},
    } = await supabase.auth.getUser();
    if (!user) {
        return redirect("/login");
    }
    return (
        <div className="flex h-full">
            {/* Left side content area */}
            <div className="flex-1 flex flex-col gap-3">
                {/* Cards container */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:grid-cols-2 ">
                    <Card/>
                    <Card/>
                    <Card/>
                </div>
                {/* Transactions */}
                <div className="flex-1 mb-4 overflow-y-auto">
                    <Transactions/>
                </div>
                {/* Chart */}
                <div className="flex-1 min-h-0 bg-green-50">
                    <Chart/>
                </div>
            </div>
            {/* Rightbar occupies 25% of the width and the full height of its container */}
            <div className="w-1/4 ml-2">
                <Rightbar/>
            </div>
        </div>
    );
};

export default DashboardPage;
