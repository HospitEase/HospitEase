import CheckReport from "@/components/component/CheckReport";
import SideBar from "@/components/component/SideBar";
import TopBar from "@/components/component/Topbar";
import Visit from "@/components/component/Visit";
import Messenger from "@/components/component/Messenger";
import PastReports from "@/components/component/PastReports";

export default function DoctorDashboard() {
  return (
    <div className="flex min-h-screen">
      <SideBar />
      <main className="flex-1 p-6">
        <TopBar />
        <div className="grid grid-cols-2 gap-4">
          <div>
            <PastReports />
            <Visit />
          </div>
          <div>
            <section className="grid grid-rows-2 gap-4">
              <CheckReport />
              <Messenger />
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
