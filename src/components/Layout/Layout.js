import React from "react";
import Footer from "./Footer/Footer";
import Header from "./Header/Header";
import SideDrawer from "./Navigation/SideDrawer/SideDrawer";

const Layout = ({ children }) => {
    return (
        <div className="drawer drawer-end">
            <input id="side-drawer" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col">
                <Header />
                {/* max-w-7xl mx-auto px-8 */}
                <main className="mt-16"> 
                    {/*  Page content here */}
                    {children}
                </main>
                <Footer />
            </div>
            <SideDrawer />
        </div>
    );
};

export default Layout;
