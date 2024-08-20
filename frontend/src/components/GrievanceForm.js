import React, { useState } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Sidebar from './Sidebar';

const GrievanceDetailForm = () => {
    const [journeyType, setJourneyType] = useState('PNR');
    const [file, setFile] = useState(null);
    const [pnr, setPnr] = useState('');
    const [uts, setUts] = useState('');
    const [trainNo, setTrainNo] = useState('');
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const getCurrentLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setLatitude(position.coords.latitude);
                    setLongitude(position.coords.longitude);
                },
                (error) => {
                    console.error('Error getting location:', error);
                    alert('Unable to retrieve location. Please ensure location services are enabled.');
                }
            );
        } else {
            alert('Geolocation is not supported by this browser.');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        getCurrentLocation();

        setTimeout(async () => {
            const formData = new FormData();
            formData.append('mobileNo', document.querySelector('input[name="mobileNo"]').value);
            formData.append('journeyType', journeyType);
            formData.append('incidentDate', document.querySelector('input[name="incidentDate"]').value);
            formData.append('grievanceDescription', document.querySelector('textarea[name="grievanceDescription"]').value);
            formData.append('pnr', pnr); 
            formData.append('uts', uts); 
            formData.append('trainNo', trainNo); 
            formData.append('latitude', latitude || '');
            formData.append('longitude', longitude || ''); 

            if (file) {
                formData.append('file', file);
            }

            try {
                const response = await fetch('http://localhost:5000/submit_grievance', {
                    method: 'POST',
                    body: formData,
                });

                const result = await response.json();
                if (response.ok) {
                    alert(result.message);
                    console.log('Train details:', result.train_details); 
                } else {
                    alert(`Error: ${result.error || 'An error occurred. Please try again.'}`);
                }
            } catch (error) {
                console.error('Error:', error);
                alert('An error occurred. Please try again.');
            }
        }, 1000); 
    };

    return (
        <div className="flex min-h-screen">
            <Sidebar />
            <div className="w-3/4 bg-white p-8 relative">
                <h2 className="text-2xl font-semibold mb-4 text-[#800020]">Grievance Detail</h2>

                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="col-span-2">
                            <label className="block text-sm font-medium mb-1">Mobile No.</label>
                            <div className="flex">
                                <input
                                    name="mobileNo"
                                    type="text"
                                    className="border border-gray-300 rounded-l px-4 py-2 w-full"
                                    placeholder="Enter your mobile number"
                                />
                                <button className="bg-[#800020] text-white px-4 py-2 rounded-r">Get OTP</button>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Journey Details</label>
                            <select
                                className="border border-gray-300 rounded px-4 py-2 w-full"
                                value={journeyType}
                                onChange={(e) => {
                                    setJourneyType(e.target.value);
                                    setPnr(''); 
                                    setUts(''); 
                                    setTrainNo(''); 
                                }}
                            >
                                <option value="PNR">PNR</option>
                                <option value="UTS">UTS</option>
                            </select>
                        </div>

                        {journeyType === 'PNR' && (
                            <div>
                                <label className="block text-sm font-medium mb-1">PNR No.</label>
                                <input
                                    type="text"
                                    className="border border-gray-300 rounded px-4 py-2 w-full"
                                    placeholder="Enter PNR"
                                    value={pnr}
                                    onChange={(e) => setPnr(e.target.value)}
                                />
                            </div>
                        )}

                        {journeyType === 'UTS' && (
                            <>
                                <div>
                                    <label className="block text-sm font-medium mb-1">UTS No.</label>
                                    <input
                                        type="text"
                                        className="border border-gray-300 rounded px-4 py-2 w-full"
                                        placeholder="Enter UTS"
                                        value={uts}
                                        onChange={(e) => setUts(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Train No.</label>
                                    <input
                                        type="text"
                                        className="border border-gray-300 rounded px-4 py-2 w-full"
                                        placeholder="Enter Train No."
                                        value={trainNo}
                                        onChange={(e) => setTrainNo(e.target.value)}
                                    />
                                </div>
                            </>
                        )}
                    </div>

                    <div className="mt-4">
                        <label className="block text-sm font-medium mb-1">Incident Date</label>
                        <input
                            name="incidentDate"
                            type="datetime-local"
                            className="border border-gray-300 rounded px-4 py-2 w-full"
                        />
                    </div>

                    <div className="mt-4">
                        <label className="block text-sm font-medium mb-1">Upload File (Optional)</label>
                        <input
                            type="file"
                            className="border border-gray-300 rounded px-4 py-2 w-full"
                            onChange={handleFileChange}
                        />
                    </div>

                    <div className="col-span-2 mt-4">
                        <label className="block text-sm font-medium mb-1">Grievance Description</label>
                        <textarea
                            name="grievanceDescription"
                            className="border border-gray-300 rounded px-4 py-2 w-full"
                            placeholder="Enter your grievance"
                            rows="4"
                        ></textarea>
                    </div>

                    <div className="flex justify-end space-x-4 mt-6">
                        <button
                            type="button"
                            className="bg-gray-500 text-white px-4 py-2 rounded"
                            onClick={() => {
                                document.querySelector('form').reset();
                                setFile(null);
                                setPnr('');
                                setUts('');
                                setTrainNo('');
                                setLatitude(null);
                                setLongitude(null);
                            }}
                        >
                            Reset
                        </button>
                        <button
                            type="submit"
                            className="bg-[#800020] text-white px-4 py-2 rounded"
                        >
                            Submit
                        </button>
                    </div>
                </form>

                <div className="absolute top-4 right-4 text-xs text-gray-600">
                    *Mandatory Fields
                </div>

                <div className="absolute top-4 right-0 bg-blue-500 text-white rounded-full p-2 cursor-pointer">
                    <i className="fas fa-universal-access"></i>
                </div>
            </div>
        </div>
    );
};

export default GrievanceDetailForm;
