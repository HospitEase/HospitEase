import Footer from "./components/component/Footer";
import Navbar from "./components/component/Navbar";
import Dashboardmain from "./components/component/Dashboardmain";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Dashboardmain />
      </main>
      <Footer />
      Hello World
    </div>
  );
}
