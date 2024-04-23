import React from 'react';
import {MdSearch} from "react-icons/md";
import Link from "next/link";
import Image from "next/image";
import Pagination from "@/app/components/dashboard/pagination/pagination";
import {redirect} from "next/navigation";
import {createClient} from "@/supabase/server";

const supabase = createClient();

const products = [
    {
        id: 1,
        title: 'Wireless Headphones',
        description: 'High-quality wireless headphones with noise cancellation features.',
        price: '$99',
        created_at: '2021-09-01',
        stock: 'In stock',
    },
    {
        id: 2,
        title: 'Smartwatch',
        description: 'Latest smartwatch with heart rate and GPS tracking.',
        price: '$299',
        created_at: '2021-10-15',
        stock: 'In stock',
    },
    {
        id: 3,
        title: '4K Drone',
        description: 'A drone with 4K capabilities and 30 minutes of flight time.',
        price: '$499',
        created_at: '2022-01-20',
        stock: 'Out of stock',
    },
    {
        id: 4,
        title: 'E-Book Reader',
        description: 'Lightweight e-book reader with a paper-like display.',
        price: '$130',
        created_at: '2022-02-11',
        stock: 'In stock',
    },
    {
        id: 5,
        title: 'Bluetooth Speaker',
        description: 'Portable Bluetooth speaker with 24-hour battery life.',
        price: '$75',
        created_at: '2022-03-30',
        stock: 'In stock',
    }
];


const ProductsPage = async (props) => {
    const {
        data: {user},
    } = await supabase.auth.getUser();

    if (!user) {
        return redirect("/login");
    }
    return (
        <div className="flex-1">
            <div className="flex items-center gap-3 justify-between">
                <div className="flex items-center gap-3 p-4 rounded">
                    <MdSearch size={40}/>
                    <input type="text" placeholder="Search products" className="input input-bordered w-full md:w-auto"/>
                </div>
                <div className="flex items-center">
                    <Link href="/dashboard/products/add">
                        <button className="btn btn-primary">Add new product</button>
                    </Link>
                </div>
            </div>
            <div className="flex items-center justify-center">
                <div className="overflow-x-auto">
                    <table className="table table-zebra w-full">
                        <thead>
                        <tr>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Price</th>
                            <th>Created at</th>
                            <th>Stock</th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {products.map((product) => (
                            <tr key={product.id}>
                                <td>{product.title}</td>
                                <td>{product.description}</td>
                                <td>{product.price}</td>
                                <td>{product.created_at}</td>
                                <td>{product.stock}</td>
                                <td className="flex gap-4 py-5">
                                    <Link href="/dashboard/products/1">
                                        <button className="btn btn-primary btn-sm ">View</button>
                                    </Link>
                                    <Link href="/">
                                        <button className="btn btn-error btn-sm">Delete</button>
                                    </Link>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    <Pagination/>
                </div>
            </div>
        </div>
    );
};

export default ProductsPage;
