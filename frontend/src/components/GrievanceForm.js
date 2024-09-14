import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

const GrievanceDetailForm = () => {
    const [journeyType, setJourneyType] = useState('PNR');
    const [file, setFile] = useState(null);
    const [pnr, setPnr] = useState('');
    const [selectedDate, setSelectedDate] = useState(null);
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);
    const [activeForm, setActiveForm] = useState('train'); // For navigation control

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

            // formData.append('incidentDate', selectedDate ? selectedDate.toISOString() : '');
            formData.append('grievanceDescription', document.querySelector('textarea[name="grievanceDescription"]').value);
            formData.append('pnr', pnr);
            formData.append('latitude', latitude || '');
            formData.append('longitude', longitude || '');

            if (file) {
                formData.append('file', file);
            }

            try {
                const response = await fetch('http://localhost:5000/grievance/submit', {
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
        <div className="flex flex-col items-start">
            {/* Top Navigation Bar */}
            <div className="flex items-center justify-around bg-black shadow-md w-full rounded-t-lg" style={{ width: '320px' }}>
                <div
                    className={`px-4 py-2 cursor-pointer text-md font-semibold ${activeForm === 'train' ? 'text-black bg-white rounded-t-lg' : 'text-white hover:bg-gray-200 rounded-t-lg'}`}
                    onClick={() => setActiveForm('train')}
                >
                    Grievance
                </div>
                <div
                    className={`px-4 py-2 cursor-pointer text-md font-semibold ${activeForm === 'appreciation' ? 'text-black bg-white rounded-t-lg' : 'text-white hover:bg-gray-200 rounded-t-lg'}`}
                    onClick={() => setActiveForm('appreciation')}
                >
                    Appreciation
                </div>
                <div
                    className={`px-4 py-2 cursor-pointer text-md font-semibold ${activeForm === 'trackConcern' ? 'text-black bg-white rounded-t-lg' : 'text-white hover:bg-gray-200 rounded-t-lg'}`}
                    onClick={() => setActiveForm('trackConcern')}
                >
                    Concern
                </div>
            </div>

            {/* Form Section */}
            <div className="bg-white shadow-lg p-8" style={{ width: '700px', height: '700px' }}>
                <h2 className="text-2xl font-semibold mb-6 text-[#800020]">Grievance Detail</h2>

                <form onSubmit={handleSubmit}>
                    {journeyType === 'PNR' && (
                        <div>
                            <label className="block text-sm font-medium mb-2">PNR No.</label>
                            <input
                                type="text"
                                className="border border-gray-300 rounded-lg px-4 py-2 w-full"
                                placeholder="Enter PNR"
                                value={pnr}
                                onChange={(e) => setPnr(e.target.value)}
                            />
                        </div>
                    )}

                    <div className="mt-6">
                        <label className="block text-sm font-medium mb-2">Grievance Description</label>
                        <textarea
                            name="grievanceDescription"
                            className="border border-gray-300 rounded-lg px-4 py-2 w-full"
                            placeholder="Enter your grievance"
                            rows="4"
                        ></textarea>
                    </div>

                    <div className="mt-6 flex space-x-4">
                        {/* <div className="w-1/2">
                            <label className="block text-sm font-medium mb-2">Incident Date and Time</label>
                            <div className="relative">
                                <DatePicker
                                    selected={selectedDate}
                                    onChange={(date) => setSelectedDate(date)}
                                    showTimeSelect
                                    timeFormat="HH:mm"
                                    timeIntervals={15}
                                    dateFormat="yyyy-MM-dd HH:mm"
                                    className="border border-gray-300 rounded-lg mr-10 px-8 py-2 w-full"
                                    placeholderText="Select date and time"
                                    calendarClassName="custom-calendar"
                                    style={{ zIndex: 10 }}
                                    open={true}
                                />
                            </div>
                        </div> */}

                        <div className="w-1/2">
                            <label className="block text-sm font-medium mb-2">Upload File (Optional)</label>
                            <div className="border border-gray-300 rounded-lg px-4 py-20 flex flex-col items-center justify-center text-center cursor-pointer mb-18">
                                <div className="mb-2">
                                    <i className="fas fa-file-upload text-gray-500 text-4xl"></i>
                                </div>
                                <p className="text-gray-500">
                                    Drag & Drop or{' '}
                                    <a href="#" className="text-blue-500 hover:underline" onClick={() => document.getElementById('fileInput').click()}>
                                        Choose a file
                                    </a>
                                </p>
                                <input
                                    id="fileInput"
                                    type="file"
                                    className="hidden"
                                    onChange={handleFileChange}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end space-x-4 mt-8">
                        <button
                            type="button"
                            className="bg-gray-500 text-white px-6 py-2 rounded-lg"
                            onClick={() => {
                                document.querySelector('form').reset();
                                setFile(null);
                                setPnr('');
                                setLatitude(null);
                                setLongitude(null);
                                setSelectedDate(null); // Reset the date
                            }}
                        >
                            Reset
                        </button>
                        <button
                            type="submit"
                            className="bg-black text-white px-6 py-2 rounded-lg"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div >
        </div >
    );
};

export default GrievanceDetailForm;
