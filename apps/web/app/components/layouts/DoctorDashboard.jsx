import CheckReport from "../component/CheckReport";
import SideBar from "../component/SideBar";
import TopBar from "../component/TopBar";
import Visit from "../component/Visit";
import Messenger from "../component/Messenger";

export default function DoctorDashboard() {
  return (
    <div className="flex min-h-screen">
      <SideBar />
      <main className="flex-1 p-6">
        <TopBar />
        <Visit />
        <section className="grid grid-cols-2 gap-4">
          <CheckReport />
          <Messenger />
        </section>
      </main>
    </div>
  );
}
