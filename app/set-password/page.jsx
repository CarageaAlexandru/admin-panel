"use client"
import React, {Suspense} from 'react';
import ErrorAlert from "@/app/components/error/error";
import {useSearchParams} from 'next/navigation';

const SetPassword = () => {
    // Placeholder for Suspense fallback
    const renderLoader = () => <p>Loading...</p>;

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="flex flex-col p-4 shadow-lg rounded max-w-sm w-full items-center">
                <h1 className="font-semibold text-2xl py-4">Welcome!</h1>
                <p className="pb-2">Finish your set up by creating a password.</p>
                <form className="flex flex-col gap-4 w-full">
                    <input type="password" className="input input-bordered" placeholder="Create Password"
                           name="password" required/>
                    <input type="password" className="input input-bordered" placeholder="Confirm Password"
                           name="confirm-password"
                           required/>
                    <button type="submit" className="btn btn-accent">Set Password</button>
                </form>
                <Suspense fallback={renderLoader()}>
                    <MessageDisplay/>
                </Suspense>
            </div>
        </div>
    );
};

// Component to handle the display of messages
const MessageDisplay = () => {
    const searchParams = useSearchParams();
    const message = searchParams.get("message");
    return (
        message ? <ErrorAlert message={message}/> : ""
    );
};

export default SetPassword;
