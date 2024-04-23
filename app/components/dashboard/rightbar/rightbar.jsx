import React from 'react';

const Rightbar = (props) => {
    return (
        <div className="flex flex-col  items-center gap-2">
            <div className="card w-96 bg-base-100 shadow-xl">
                <figure><img src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="Shoes"/>
                </figure>
                <div className="card-body">
                    <h2 className="card-title">
                        New features
                        <div className="badge badge-secondary">NEW</div>
                    </h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad corporis debitis dicta earum
                        expedita facere nam nemo, nesciunt optio quaerat similique soluta sunt totam voluptas
                        voluptates! Aliquam dicta libero unde.</p>
                    <div className="card-actions justify-end">
                        <div className="badge badge-outline">Revenue</div>
                        <div className="badge badge-outline">Products</div>
                    </div>
                </div>
            </div>
            <div className="card w-96 bg-base-100 shadow-xl">
                <figure><img src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="Shoes"/>
                </figure>
                <div className="card-body">
                    <h2 className="card-title">
                        Content
                        <div className="badge badge-secondary">Learn</div>
                    </h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus atque deleniti eveniet facere
                        illo inventore tenetur ut.</p>
                    <div className="card-actions justify-end">
                        <div className="badge badge-outline">Dishes</div>
                        <div className="badge badge-outline">Products</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Rightbar;