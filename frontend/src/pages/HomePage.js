import React, { useState } from 'react';
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import GrievanceDetailForm from "../components/GrievanceForm";
import Footer from "../components/Footer";

const Home = () => {
    const [activeForm, setActiveForm] = useState('train');

    const renderForm = () => {
        switch (activeForm) {
            case 'train':
                return <GrievanceDetailForm />;
            default:
                return <GrievanceDetailForm />;
        }
    };

    return (
        <div
            className="min-h-screen flex flex-col bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(image.jpg)` }}
        >
            <Header />
            <div className="flex flex-1 justify-start mt-3 mr-16 mb-11">
                <div className="w-full lg:w-1/2 p- mr4-40 ml-10">
                    <h1 className="text-6xl font-bold text-white mt-10">Helping Railways Help Travellers</h1>
                    <p className="mt-4  text-2xl text-white">
                        See how our AI enabled platform helps travellers lodge a complaint and IRCTC resolve it faster than ever before!
                    </p>
                </div>
                <div className="flex ml-20">
                    {/* <Sidebar setActiveForm={setActiveForm} /> */}
                    <div >
                        {renderForm()}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Home;
