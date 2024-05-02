"use client"
import React, {Suspense} from 'react';
import {useRouter} from 'next/navigation';
import {useSearchParams} from 'next/navigation';
import ErrorAlert from "@/app/ui/error/error";

const ErrorMessage = () => {
    const searchParams = useSearchParams();
    const message = searchParams.get("message");
    return (
        message ? (
            <ErrorAlert message={decodeURIComponent(message)}/>
        ) : (
            <ErrorAlert message="Sorry, something went wrong, but no error details were provided."/>
        )
    );
};

const Page = () => {
    const router = useRouter();

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="flex flex-col p-4 shadow-lg rounded max-w-sm w-full items-center">
                <Suspense fallback={<p>Loading...</p>}>
                    <ErrorMessage/>
                </Suspense>
                <button className="btn btn-accent mt-4" onClick={() => router.push("/")}>Go Home</button>
            </div>
        </div>
    );
};

export default Page;
