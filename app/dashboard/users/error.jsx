'use client'

import {useEffect} from 'react'

export default function Error({error, reset}) {
    useEffect(() => {
        console.error(error)
    }, [error])

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="flex flex-col p-6 rounded-lg shadow-lg max-w-md w-full text-center">
                <h2 className="text-lg font-bold text-error">Something went wrong!</h2>
                <p className="mb-4">{error.message}</p>
                <button
                    onClick={reset}
                    className="btn btn-primary"
                >
                    Try again
                </button>
            </div>
        </div>
    )
}