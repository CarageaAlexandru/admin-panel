"use client"
import React, {useState} from 'react';
import ErrorAlert from "@/app/components/error/error";
import {useSearchParams} from 'next/navigation'
import {signup} from "@/app/register/actions";

const RegisterPage = () => {
    const searchParams = useSearchParams()
    const message = searchParams.get("message")
    return (
        <div className="flex justify-center items-center h-screen">
            <div className="flex flex-col p-4 shadow-lg rounded max-w-sm w-full items-center">
                <h1 className="font-semibold text-2xl py-4">Register</h1>
                <form className="flex flex-col gap-4 w-full">
                    <input type="email" className="input input-bordered" placeholder="Email" name="email" required/>
                    <input type="password" className="input input-bordered" placeholder="Password" name="password"
                           required autoComplete="new-password"/>
                    <button type="submit" className="btn btn-accent" formAction={signup}>Register</button>
                </form>
                {message ? <ErrorAlert message={message}/> : ""}
            </div>
        </div>
    );
};

export default RegisterPage;
