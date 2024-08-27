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
            style={{ backgroundImage: `url(background.png)` }}
        >
            <Header />
            <div className="flex flex-1 justify-end mt-11 mr-16 mb-11"> 
                <div className="flex"> 
                    <Sidebar setActiveForm={setActiveForm} />
                    <div className="flex-1 p-8 bg-white shadow-md">
                        {renderForm()}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Home;
