"use client"
import React from 'react';
import {useRouter} from 'next/navigation'
import {useSearchParams} from 'next/navigation'
import ErrorAlert from "@/app/components/error/error";

const Page = () => {
    const router = useRouter()
    const searchParams = useSearchParams()
    const message = searchParams.get("message")
    return (
        <div className="flex justify-center items-center h-screen">
            <div className="flex flex-col p-4 shadow-lg rounded max-w-sm w-full items-center">

                {/* Display the error message if it exists, otherwise show a default message */}
                {message ? (
                    <ErrorAlert message={decodeURIComponent(message)}/>
                ) : (
                    <ErrorAlert message="Sorry, something went wrong, but no error details were provided."/>
                )}
                {/* Button to navigate back */}
                <button className="btn btn-accent mt-4" onClick={router.back}>Go Back</button>
            </div>
        </div>
    );
};

export default Page;