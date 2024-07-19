import React from "react";
import Header from "../components/header";
import {Outlet} from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer} from "react-toastify";

const RootLayout: React.FC = () => {

    return (
        <div className={"flex flex-col"}>
            <Header/>
            <ToastContainer position={"bottom-left"} pauseOnHover={false}/>
            <main className={"flex-grow w-screen bg-repeat bg-60%"}>
                <Outlet/>
            </main>
        </div>
    )
}

export default RootLayout
