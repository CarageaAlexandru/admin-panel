// import React from 'react';
// import Link from "next/link";
// import Image from 'next/image'; // Assuming you might want to add an image
// import {redirect} from "next/navigation";
// import {createClient} from "@/supabase/server";
//
// const supabase = createClient()
// export default async function SingleProductPage() {
//     const {
//         data: {user},
//     } = await supabase.auth.getUser();
//
//     if (!user) {
//         return redirect("/login");
//     }
//     const product = {
//         id: 1,
//         title: 'Wireless Headphones',
//         description: 'High-quality wireless headphones with noise cancellation features.',
//         price: '$99',
//         created_at: '2021-09-01',
//         stock: 'In stock',
//     };
//
//     return (
//         <div className="flex items-start justify-center p-5">
//             <div className="flex flex-col items-center justify-center">
//                 {/* Optional: Product Image */}
//                 <div>
//                     <Image src="/avatar_placeholder.png" alt="Product Image" width={300} height={300}/>
//                 </div>
//             </div>
//
//             <div className="flex-1 max-w-md px-6">
//                 <div className="mb-4">
//                     <label className="block text-sm font-medium mb-1">Title:</label>
//                     <input type="text" value={product.title} className="input input-bordered w-full" readOnly/>
//                 </div>
//                 <div className="mb-4">
//                     <label className="block text-sm font-medium mb-1">Description:</label>
//                     <textarea className="textarea textarea-bordered w-full" value={product.description} readOnly
//                               rows={3}></textarea>
//                 </div>
//                 <div className="mb-4">
//                     <label className="block text-sm font-medium mb-1">Price:</label>
//                     <input type="text" value={product.price} className="input input-bordered w-full" readOnly/>
//                 </div>
//                 <div className="mb-4">
//                     <label className="block text-sm font-medium mb-1">Stock:</label>
//                     <input type="text" value={product.stock} className="input input-bordered w-full" readOnly/>
//                 </div>
//                 <div className="flex justify-between items-center">
//                     <button className="btn btn-primary">Update</button>
//                     <Link href="/dashboard/products">
//                         <button className="btn btn-accent">Back to List</button>
//                     </Link>
//                 </div>
//             </div>
//         </div>
//     );
// };
