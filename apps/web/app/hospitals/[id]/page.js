"use client";

import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import {
  CalendarIcon,
  GlobeIcon,
  MenuIcon,
  SearchIcon,
  UserCircleIcon,
} from "lucide-react";
import BedComponent from "@/components/component/BedComponent";
import axios from "axios";

export default function Home() {
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
      <div className="flex items-center justify-between mb-8">
        <div className="text-[#1c3f39]  font-bold text-3xl">Hospit-Ease</div>
        <div className="flex items-center space-x-4 bg-white rounded-full shadow-md p-2">
          <Button variant="ghost">Location</Button>
          <Button variant="ghost">Time</Button>
          <Button variant="ghost">Problem</Button>
          <Button
            size="icon"
            className="bg-[#1c3f39] text-white rounded-full hover:bg-emerald-100 hover:text-[#1c3f39]"
          >
            <SearchIcon className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex items-center space-x-4">
          <Button
            variant="outline"
            className="flex items-center space-x-2 rounded-full"
          >
            <MenuIcon className="h-4 w-4" />
            <UserCircleIcon className="h-6 w-6" />
          </Button>
        </div>
      </div>

      {/* Listing Title */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-semibold text-[#1c3f39]">Hospital</h1>
      </div>

      {/* Image Gallery */}

      <div
        className="grid grid-cols-4 grid-rows-2 gap-2 mb-8"
        style={{ height: "400px" }}
      >
        <div className="relative col-span-2 row-span-2 w-full h-full">
          <Image
            src={images[0]}
            alt="Main view"
            className="rounded-l-xl object-cover" // Adjust here if needed
            layout="fill"
            quality={100}
          />
        </div>

        {/* Smaller images (1x1 grid) */}
        {images.slice(1).map((src, index) => (
          <div key={src} className="col-span-1 row-span-1">
            <Image
              src={src}
              className="w-full h-full object-cover rounded-r-xl"
              width={400} // Same aspect ratio as the main image
              height={267} // Adjusted height to maintain uniformity
              layout="responsive"
              quality={100}
              sizes="(max-width: 400px) 100vw, 400px"
            />
          </div>
        ))}
      </div>

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
                    setFormData((prevData) => ({ ...prevData, status: value }))
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
                  {/* Add other statuses here if needed */}
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
