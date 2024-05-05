"use client"
import {useSearchParams} from "next/navigation";
import ErrorAlert from "@/app/ui/error/error";
import React from "react";

const MessageDisplay = () => {
    const searchParams = useSearchParams();
    const message = searchParams.get("message");
    return (
        message ? <ErrorAlert message={message}/> : ""
    );
};

export default MessageDisplay