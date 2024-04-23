import React from 'react';

// Dummy data for transactions
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

const getStatusBadgeClass = (status) => {
    switch (status) {
        case 'done':
            return 'badge badge-success';
        case 'cancelled':
            return 'badge badge-error';
        case 'pending':
            return 'badge badge-info';
        default:
            return 'badge';
    }
};

const Transactions = (props) => {
    return (
        <div className="flex flex-col max-h-lvh h-lvh">
            <h2 className="text-xl font-semibold">Latest Transactions</h2>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                    <tr>
                        <th></th>
                        <th>Name</th>
                        <th>Status</th>
                        <th>Date</th>
                        <th>Amount</th>
                    </tr>
                    </thead>
                    <tbody>
                    {transactionsData.map((transaction) => (
                        <tr key={transaction.id} className="bg-base-200 hover:bg-base-300">
                            <td>{transaction.id}</td>
                            <td>{transaction.name}</td>
                            <td>
                                <div className={getStatusBadgeClass(transaction.status)}>{transaction.status}</div>
                            </td>
                            <td>{transaction.date}</td>
                            <td>£ {transaction.amount}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Transactions;