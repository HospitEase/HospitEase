"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { CalendarIcon } from "lucide-react";
import BedComponent from "@/components/component/BedComponent";
import axios from "axios";
import AccountButton from "@/components/component/AccountButton";
import TopBar from "@/components/component/TopBar";
import { useSearchParams } from "next/navigation";

export default function Home() {
  const searchParams = useSearchParams();
  const hospitalId = searchParams.get("id");
  console.log(hospitalId);

  const images = [
    "/Photo1.jpg",
    "/Photo2.jpg",
    "/Photo3.jpg",
    "/Photo4.jpg",
    "/Photo5.jpg",
  ];

  const [formData, setFormData] = useState({
    name: "",
    dob: "",
    address: "",
    contact: "",
    sex: "",
    ayushmanCard: "",
    diagnosisHistory: "",
    status: "",
  });

  const [hospitalName, setHospitalName] = useState("");

  useEffect(() => {
    if (hospitalId) {
      const fetchHospitalName = async () => {
        try {
          const response = await axios.get(
            `http://127.0.0.1:8787/home/hospital-deatails/${hospitalId}`,
          );
          console.log("API Response:", response.data); // Log API response
          setHospitalName(response.data.hospitalName);
          console.log(response.data.hospitalName);
        } catch (error) {
          console.error("Error fetching hospital details:", error);
        }
      };

      fetchHospitalName();
    }
  }, [hospitalId]); // Removed hospitalName from dependencies

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://127.0.0.1:8787/home/patient-details",
        formData,
      );
      setFormData(res.data.patient);

      alert("Data submitted successfully!");
      if (res.data.patient) {
        await axios.post("http://127.0.0.1:8787/home/notify", res.data.patient);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Failed to submit data.");
    }
  };

  return (
    <div className="container mx-auto p-4">
      {/* Header */}
      <TopBar />

      {/* Listing Title */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-semibold text-[#1c3f39] mt-4">
          {/* {hospitalName} */}
          Fortis Hospital
        </h1>
      </div>

      {/* <div
        className="grid grid-cols-4 grid-rows-2 gap-2"
        style={{ height: "450px" }}
      >
        <div className="relative col-span-2 row-span-2">
          <Image
            src={images[0]}
            alt="Main view"
            className="rounded-l-xl object-cover"
            layout="fill"
            quality={100}
          />
        </div>
        {images.slice(1, 5).map((src, index) => (
          <div key={src} className="relative col-span-1 row-span-1">
            <Image
              src={src}
              alt={`Image ${index + 2}`}
              className="object-cover rounded-r-xl"
              layout="fill"
              quality={100}
            />
          </div>
        ))}
      </div> */}

      {/* Patient Form */}
      <div className="mt-32 pt-10">
        <h2 className="text-2xl font-bold mb-4">Patient Information</h2>
        <div className="flex flex-col md:flex-row gap-8">
          {/* Form Section */}
          <div className="w-full md:w-2/3">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="dob">Date of Birth</Label>
                <div className="relative">
                  <Input
                    id="dob"
                    name="dob"
                    type="date"
                    value={formData.dob}
                    onChange={handleInputChange}
                    required
                  />
                  <CalendarIcon className="absolute right-2 top-2.5 h-4 w-4 opacity-50" />
                </div>
              </div>
              <div>
                <Label htmlFor="address">Address</Label>
                <Textarea
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="contact">Contact</Label>
                <Input
                  id="contact"
                  name="contact"
                  type="tel"
                  value={formData.contact}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <Label>Sex</Label>
                <RadioGroup
                  name="sex"
                  value={formData.sex}
                  onValueChange={(value) =>
                    setFormData((prevData) => ({ ...prevData, sex: value }))
                  }
                  className="flex space-x-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="male" id="male" />
                    <Label htmlFor="male">Male</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="female" id="female" />
                    <Label htmlFor="female">Female</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="other" id="other" />
                    <Label htmlFor="other">Other</Label>
                  </div>
                </RadioGroup>
              </div>
              <div>
                <Label htmlFor="ayushmanCard">Ayushman Card Number</Label>
                <Input
                  id="ayushmanCard"
                  name="ayushmanCard"
                  value={formData.ayushmanCard}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <Label htmlFor="diagnosisHistory">Diagnostic History</Label>
                <Textarea
                  id="diagnosisHistory"
                  name="diagnosisHistory"
                  value={formData.diagnosisHistory}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <Label>Status</Label>
                <RadioGroup
                  name="status"
                  value={formData.status}
                  onValueChange={(value) =>
                    setFormData((prevData) => ({
                      ...prevData,
                      status: value,
                    }))
                  }
                  className="flex space-x-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Waiting" id="statusWaiting" />
                    <Label htmlFor="statusWaiting">Waiting</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="InProgress" id="statusInProgress" />
                    <Label htmlFor="statusInProgress">In Progress</Label>
                  </div>
                </RadioGroup>
              </div>
              <Button type="submit" className="w-full">
                Submit
              </Button>
            </form>
          </div>

          {/* Patient Summary Card */}
          <div className="">
            <BedComponent />
          </div>
        </div>
      </div>
    </div>
  );
}
