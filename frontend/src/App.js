import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import GrievanceDetailForm from "./components/GrievanceForm";
import Footer from "./components/Footer";

function App() {
  return (
    <div
      className="min-h-screen flex flex-col bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(background.png)` }}
    >
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <div className="flex-1 flex justify-end">
          <GrievanceDetailForm />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
