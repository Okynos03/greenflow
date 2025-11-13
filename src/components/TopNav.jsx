import React from 'react';


export default function TopNav({ companyName = 'Empresa' }) {
return (
    <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
        <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center text-white font-bold">GF</div>
            <div className="text-lg font-semibold">GREENFLOW</div>
        </div>
        <nav className="flex items-center gap-6 text-sm text-gray-600">
            <a className="px-3 py-2 rounded-md bg-gray-100">Resumen</a>
            <a className="px-3 py-2 rounded-md hover:bg-gray-100">Diagnóstico</a>
            <a className="px-3 py-2 rounded-md hover:bg-gray-100">Oportunidades</a>
            <a className="px-3 py-2 rounded-md hover:bg-gray-100">Recursos</a>
        </nav>
            <div className="text-sm text-gray-600">{companyName} · <button className="ml-3 text-blue-600">Salir</button></div>
        </div>
        </div>
    </header>
    );
}