// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { Modal } from './components/Modal';
// import { ModalProvider } from './store/ModalProvider';
// import Home from './pages/HomePage';
// import AdminDashboard from './pages/AdminDashboard'; 
// import GrievanceList from './pages/GrievancesList';

// function App() {
//     return (
//         <ModalProvider>
//             <Router>
//                 <Routes>
//                     <Route path="/" element={<Home />} />
//                     <Route path="/admin-dashboard" element={<AdminDashboard />} /> 
//                     <Route path="/grievances/:type/:name" element={<GrievanceList />} />
//                 </Routes>
//                 <Modal />
//             </Router>
//         </ModalProvider>
//     );
// }

// function App(){
//     return(
//         <>
//             <ModalProvider>
//                 <Home/>
//             </ModalProvider>
//         </>
//     )
// }

// src/App.jsx

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GrievanceDashboard from './components/AdminDashboard';
import Home from './pages/HomePage';
import { ModalProvider } from './store/ModalProvider';
import GrievanceByTrainNo from './components/TTEDashboard';
import GrievancesByStation from './components/GrievancesByStation';

const grievances = [
  { id: 1, category: "Infrastructure", subCategory: "Tracks", priority: "High", description: "Broken tracks near Station A.", station: "Station A", tte: "John Doe", reasonForUnresolved: "Pending parts", contact: "123-456-7890", pnrNumber: "1234567890" },
  { id: 2, category: "Service", subCategory: "Cleanliness", priority: "Medium", description: "Lack of cleanliness in compartment B.", station: "Station B", tte: "Jane Smith", reasonForUnresolved: "No staff available", contact: "987-654-3210", pnrNumber: "2345678901" },
  { id: 3, category: "Safety", subCategory: "Security", priority: "High", description: "Unauthorized persons spotted near platform.", station: "Station C", tte: "Michael Johnson", reasonForUnresolved: "Ongoing investigation", contact: "555-555-5555", pnrNumber: "3456789012" },
  { id: 4, category: "Maintenance", subCategory: "Cleaning", priority: "High", description: "Train exterior not cleaned regularly.", station: "Station D", tte: "Emily Davis", reasonForUnresolved: "Scheduling conflicts", contact: "444-555-6666", pnrNumber: "4567890123" },
  { id: 5, category: "Customer Experience", subCategory: "Comfort", priority: "Medium", description: "Uncomfortable seating in first class.", station: "Station E", tte: "Alice Brown", reasonForUnresolved: "Budget limitations", contact: "777-888-9999", pnrNumber: "5678901234" },
  { id: 6, category: "Infrastructure", subCategory: "Restrooms", priority: "Medium", description: "Restrooms not cleaned regularly.", station: "Station F", tte: "Robert Wilson", reasonForUnresolved: "Contractor delay", contact: "333-444-5555", pnrNumber: "6789012345" },
  { id: 7, category: "Safety", subCategory: "Lighting", priority: "High", description: "Poor lighting in platform area.", station: "Station G", tte: "Sophia Martinez", reasonForUnresolved: "Electrical maintenance", contact: "222-333-4444", pnrNumber: "7890123456" },
  { id: 8, category: "Service", subCategory: "Wi-Fi", priority: "Low", description: "Wi-Fi not available in compartment.", station: "Station H", tte: "James Taylor", reasonForUnresolved: "Technical difficulties", contact: "666-777-8888", pnrNumber: "8901234567" },
  { id: 9, category: "Accessibility", subCategory: "Wheelchair Access", priority: "High", description: "Inadequate wheelchair access at Station I.", station: "Station I", tte: "Linda Anderson", reasonForUnresolved: "Design constraints", contact: "999-000-1111", pnrNumber: "9012345678" },
  { id: 10, category: "Customer Service", subCategory: "Refunds", priority: "Medium", description: "Delayed refund process.", station: "Station J", tte: "Michael Johnson", reasonForUnresolved: "Processing delays", contact: "555-666-7777", pnrNumber: "0123456789" },
];

const App = () => {
  return (
    <ModalProvider>
      <Router>
        <div className="flex flex-col h-screen">
          <div className="flex flex-1">
            <div className="flex-1">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/admin-dashboard" element={<GrievanceDashboard grievances={grievances} />} />
                <Route path="/grievances/train/:trainNo" element={<GrievanceByTrainNo />} />
                <Route path="/station/:station_master" element={<GrievancesByStation />} />
              </Routes>
            </div>
          </div>
        </div>
      </Router>
    </ModalProvider>
  );
};

export default App;

