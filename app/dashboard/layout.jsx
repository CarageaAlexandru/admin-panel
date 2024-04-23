import React from 'react';
import Sidebar from "@/app/components/dashboard/sidebar/sidebar";
import Navbar from "@/app/components/dashboard/navbar/navbar";
import Footer from "@/app/components/footer/footer";

const Layout = ({children}) => {
    return (
        <div className="flex h-screen overflow-hidden bg-base-100">
            {/* Sidebar */}
            <aside className="w-1/6 min-w-[300px] flex-none p-5 ">
                <Sidebar/>
            </aside>
            {/* Main content area including Navbar and Footer */}
            <div className="flex-1 flex flex-col">
                {/* Navbar */}
                <header>
                    <Navbar/>
                </header>
                {/* Main content below Navbar */}
                <main className="flex-1 p-3 overflow-y-auto ">
                    {children}
                </main>
                {/* Footer at the bottom */}
                <footer>
                    <Footer/>
                </footer>
            </div>
        </div>
    );
};

export default Layout;
