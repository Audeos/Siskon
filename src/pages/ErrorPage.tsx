import React from "react";
import {NavLink} from "react-router-dom";
import Header from "../components/header";

const ErrorPage: React.FC = () => {

return (
    <div className="min-h-screen flex flex-col items-center ">
        <Header/>
        <h1 className="text-6xl font-bold text-indigo-600 mb-4">404</h1>
        <h2 className="text-2xl font-medium text-gray-700 mb-8">Sayfa Bulunamadı</h2>
        <p className="text-lg text-gray-600 mb-4">
            Aradığınız sayfa bulunamadı. Ana sayfaya dönmek için aşağıdaki düğmeyi kullanabilirsiniz.
        </p>
        <NavLink to="/" className="py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-md shadow-sm">
            Ana Sayfa
        </NavLink>
    </div>
)
}

export default ErrorPage
