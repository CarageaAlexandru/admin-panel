"use client"
import React, {Suspense} from 'react';
import {login} from "@/app/login/actions";
import Link from "next/link";
import {useFormState} from "react-dom"
import Toast from "@/app/ui/toast/toast";
import MessageDisplay from "@/app/ui/MessageDisplay/MessageDisplay";

const LoginPage = () => {
    const [state, formAction] = useFormState(login, undefined)
    const renderLoader = () => <p>Loading...</p>;

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="flex flex-col p-4 shadow-lg rounded max-w-sm w-full items-center">
                <h1 className="font-semibold text-2xl py-4">Login</h1>
                <form action={formAction} className="flex flex-col gap-4 w-full">
                    <input type="email" className="input input-bordered" placeholder="Email" name="email" required/>
                    <input type="password" className="input input-bordered" placeholder="Password" name="password"
                           required autoComplete="new-password"/>
                    <button type="submit" className="btn btn-accent">Login</button>
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
                {state && state.errors && Object.entries(state.errors).map(([field, message]) => (
                    <Toast key={`${field}-${message}`} message={message} field={field}/>
                ))}
            </div>
        </div>
    );
};


export default LoginPage;
