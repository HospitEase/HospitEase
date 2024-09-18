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
        <div className="grid grid-cols-4">
          <div className="col-span-2">
            {hospitalDetails.map((hospital, index) => (
              <HospitalCard
                key={index}
                hospitalName={hospital.hospitalName}
                hospitalAddress={hospital.hospitalAddress}
              />
            ))}
          </div>
          <div className="col-span-2">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3072.7207167486063!2d-104.89823824910198!3d39.6334917793631!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x876c87013041e0cf%3A0x9d57c6524be33d65!2sJaffery%20Aslam!5e0!3m2!1sen!2sin!4v1667917161314!5m2!1sen!2sin"
              width="350"
              height="250"
              allowfullscreen=""
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}
