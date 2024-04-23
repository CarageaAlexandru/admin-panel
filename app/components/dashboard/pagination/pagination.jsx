import React from 'react';

const Pagination = (props) => {
    return (
        <div className="flex flex-row items-center justify-between py-4">
            <button className="btn btn-accent" disabled="disabled">Prev</button>
            <button className="btn btn-accent">Next</button>
        </div>
    );
};

export default Pagination;