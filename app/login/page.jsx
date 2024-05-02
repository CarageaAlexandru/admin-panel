"use client"
import React, {Suspense, useState} from 'react';
import ErrorAlert from "@/app/ui/error/error";
import {login} from "@/app/login/actions";
import {useRouter} from 'next/navigation';
import {useSearchParams} from 'next/navigation';
import Link from "next/link";

const LoginPage = () => {
    const router = useRouter();

    // Placeholder for Suspense fallback
    const renderLoader = () => <p>Loading...</p>;

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="flex flex-col p-4 shadow-lg rounded max-w-sm w-full items-center">
                <h1 className="font-semibold text-2xl py-4">Login</h1>
                <form className="flex flex-col gap-4 w-full">
                    <input type="email" className="input input-bordered" placeholder="Email" name="email" required/>
                    <input type="password" className="input input-bordered" placeholder="Password" name="password"
                           required autoComplete="new-password"/>
                    <button type="submit" className="btn btn-accent" formAction={login}>Login</button>
                </form>
                <div className="mt-4 text-sm">
                    <p>Do not have an account?</p>
                    <Link href="/register">
                        <button className="text-blue-500 hover:underline">Register here</button>
                    </Link>
                </div>
                <Suspense fallback={renderLoader()}>
                    <MessageDisplay/>
                </Suspense>
            </div>
        </div>
    );
};

const MessageDisplay = () => {
    const searchParams = useSearchParams();
    const message = searchParams.get("message");
    return (
        message ? <ErrorAlert message={message}/> : ""
    );
};

export default LoginPage;
