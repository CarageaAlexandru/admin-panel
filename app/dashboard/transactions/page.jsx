import React from 'react';
import Pagination from "@/app/ui/dashboard/pagination/pagination";
import {fetchTransactions} from "@/app/lib/data";
import Search from "@/app/ui/dashboard/search/search";
import Transactions from "@/app/ui/dashboard/transactions/transactions";

export default async function TransactionsPage({searchParams}) {
    const query = searchParams?.user_name || ""
    const page = parseInt(searchParams?.page) || 1
    const {transactions, count} = await fetchTransactions(page, query)
    return (
        <div className="flex-1">
            <div className="flex items-center justify-center">
                <Search placeholder="Search for transaction" queryParam="user_name"/>
            </div>
            <div className="flex-1 justify-center overflow-hidden">
                <div>
                    <Transactions transactions={transactions} title="All Transactions"/>
                    <Pagination count={count}/>
                </div>
            </div>
        </div>
    );
};
