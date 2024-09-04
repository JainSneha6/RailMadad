import React, { useState } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';

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

            formData.append('incidentDate', document.querySelector('input[name="incidentDate"]').value);
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
        <div className="flex">
            <div className="bg-white relative" style={{ width: '650px' }}>
                <h2 className="text-2xl font-semibold mb-4 text-[#800020]">Grievance Detail</h2>

                <form onSubmit={handleSubmit}>


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
            </div>
        </div>
    );
};

export default GrievanceDetailForm;
