"use client"
import React, {Suspense} from 'react';
import {signup} from "@/app/register/actions";
import MessageDisplay from "@/app/ui/MessageDisplay/MessageDisplay";
import Submit from "@/app/ui/forms/Submit";
import Link from "next/link";

const RegisterPage = () => {
    const renderLoader = () => <p>Loading...</p>;

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="flex flex-col p-4 shadow-lg rounded max-w-sm w-full items-center">
                <h1 className="font-semibold text-2xl py-4">Register</h1>
                <form action={signup} className="flex flex-col gap-4 w-full">
                    <input type="email" className="input input-bordered" placeholder="Email" name="email" required/>
                    <input type="password" className="input input-bordered" placeholder="Password" name="password"
                           required autoComplete="new-password"/>
                    <div className="flex justify-between">
                        <Link href="/dashboard/products">
                            <button className="btn btn-primary">Back</button>
                        </Link>
                        <Submit/>
                    </div>
                </form>
                <Suspense fallback={renderLoader()}>
                    <MessageDisplay/>
                </Suspense>
            </div>
        </div>
    );
};


export default RegisterPage;
