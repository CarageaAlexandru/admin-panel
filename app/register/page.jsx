"use client"
import React, {Suspense} from 'react';
import {signup} from "@/app/register/actions";
import MessageDisplay from "@/app/ui/MessageDisplay/MessageDisplay";

const RegisterPage = () => {
    // Placeholder for Suspense fallback
    const renderLoader = () => <p>Loading...</p>;

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="flex flex-col p-4 shadow-lg rounded max-w-sm w-full items-center">
                <h1 className="font-semibold text-2xl py-4">Register</h1>
                <form action={signup} className="flex flex-col gap-4 w-full">
                    <input type="email" className="input input-bordered" placeholder="Email" name="email" required/>
                    <input type="password" className="input input-bordered" placeholder="Password" name="password"
                           required autoComplete="new-password"/>
                    <button type="submit" className="btn btn-accent">Register</button>
                </form>
                <Suspense fallback={renderLoader()}>
                    <MessageDisplay/>
                </Suspense>
            </div>
        </div>
    );
};


export default RegisterPage;
