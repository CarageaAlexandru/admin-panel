import React from 'react';
import clsx from "clsx";
import {formatDate} from "@/app/lib/utils";
import {fetchLastTransactions} from "@/app/lib/data";

const Transactions = ({transactions, title}) => {
    return (
        <div className="flex flex-col">
            <h2 className="text-xl font-semibold">{title}</h2>
            <table className="table">
                {/* head */}
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Client Name</th>
                    <th>Product</th>
                    <th>Price</th>
                    <th>Total</th>
                    <th>Status</th>
                    <th>Date</th>
                </tr>
                </thead>
                <tbody>
                {transactions.map((transaction) => (
                    <tr key={transaction.transaction_id} className="bg-base-200 hover:bg-base-300">
                        <td>{transaction.transaction_id}</td>
                        <td>{transaction.user_name}</td>
                        <td>
                            <div className="indicator">
                                <span className="indicator-item badge badge-accent">{transaction.quantity}</span>
                                <div
                                    className="grid p-2 bg-secondary text-white place-items-center rounded-xl">{transaction.product_name}</div>
                            </div>
                        </td>
                        <td>£ {transaction.price}</td>
                        <td>£ {transaction.total_amount}</td>
                        <td>
                            <div className={clsx(
                                "badge", {
                                    "badge badge-info": transaction.status === "pending",
                                    "badge badge-error": transaction.status === "cancelled",
                                    "badge badge-success": transaction.status === "completed",
                                }
                            )}>{transaction.status}</div>
                        </td>
                        <td>{formatDate(transaction.transaction_date)}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default Transactions