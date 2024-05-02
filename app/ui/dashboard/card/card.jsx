import React from 'react';
import {MdPeople} from "react-icons/md";


const Card = (props) => {
    return (
        <div className="card w-full bg-base-100 shadow-xl">
            <div className="card-body">
                <div className="flex flex-row items-center gap-4 justify-evenly">
                    <MdPeople size={24} className="text-primary"/>
                    <span className="font-bold">Total Users:</span>
                    <span className="font-bold">10.252</span>
                </div>
                <div className="flex flex-row gap-2 items-center justify-center">
                    <span className="text-accent">14%</span>
                    <span>increase from last week</span>
                </div>
            </div>
        </div>
    );
};

export default Card;