import React from 'react';
import Link from "next/link";
import Pagination from "@/app/ui/dashboard/pagination/pagination";
import {fetchProducts} from "@/app/lib/data";
import {formatDate} from "@/app/lib/utils";
import Search from "@/app/ui/dashboard/search/search";
import {deleteProductById} from "@/app/dashboard/products/actions";

export default async function ProductsPage({searchParams}) {
    const query = searchParams?.title || ""
    const page = parseInt(searchParams?.page) || 1
    const {products, count} = await fetchProducts(page, query)
    return (
        <div className="flex-1">
            <div className="flex items-center gap-3 justify-evenly ">
                <Search placeholder="Search for product" queryParam="title"/>
                <div className="flex items-center gap-2 ">
                    <div className="flex items-center">
                        <Link href="/dashboard/products/add">
                            <button className="btn btn-primary">Add new product</button>
                        </Link>
                    </div>
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
                            <th>Stock</th>
                            <th>Size</th>
                            <th>Color</th>
                            <th>Created at</th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {products.map((product) => (
                            <tr key={product.id}>
                                <td>{product.title}</td>
                                <td className="max-w-96">{product.description}</td>
                                <td>{product.price}</td>
                                <td>{product.stock}</td>
                                <td>{product.size}</td>
                                <td>{product.color}</td>
                                <td>{formatDate(product.created_at)}</td>
                                <td className="flex gap-4 py-5">
                                    <Link href={`/dashboard/products/${product.id}`}>
                                        <button className="btn btn-primary btn-sm ">View</button>
                                    </Link>
                                    <form action={deleteProductById}>
                                        <input type="hidden" name="id" value={product.id}/>
                                        <button className="btn btn-error btn-sm">Delete</button>
                                    </form>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    <Pagination count={count}/>
                </div>
            </div>
        </div>
    );
};
