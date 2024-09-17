"use client";
import { useState, useEffect } from "react";
import HospitalCard from "@/components/component/HospitalCard";
import PatientHeader from "@/components/component/PatientHeader";
import axios from "axios";

export default function Home() {
  const [hospitalDetails, setHospitalDetails] = useState([]);

  // Fetch hospital details from the backend
  useEffect(() => {
    async function getDetails() {
      try {
        const res = await axios.get(
          "http://127.0.0.1:8787/home/hospital-deatails",
        );
        setHospitalDetails(res.data); // Assuming the response data is an array of hospital objects
      } catch (error) {
        console.error("Error fetching hospital details:", error);
      }
    }

    getDetails();
  }, []);

  return (
    <div>
      <PatientHeader />
      <div className="flex justify-center">
        <div className="grid grid-cols-4 gap-4">
          {hospitalDetails.map((hospital, index) => (
            <HospitalCard key={index} hospitalName={hospital.hospitalName} />
          ))}
        </div>
      </div>
    </div>
  );
}
