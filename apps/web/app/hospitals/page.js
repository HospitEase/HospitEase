import HospitalCard from "@/components/component/HospitalCard";
import PatientHeader from "@/components/component/PatientHeader";
export default function Home() {
  return (
    <div>
      <PatientHeader />
      <div className="flex justify-center">
        <div className="grid grid-cols-4 gap-4">
          <HospitalCard />
          <HospitalCard />
          <HospitalCard />
          <HospitalCard />
          <HospitalCard />
          <HospitalCard />
          <HospitalCard />
          <HospitalCard />
        </div>
      </div>
    </div>
  );
}
