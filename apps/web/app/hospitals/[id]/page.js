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
    diagnosticHistory: "",
    isNewProblem: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Here you would typically send the data to an API or perform other actions
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
        <h1 className="text-3xl font-semibold text-[#1c3f39]">Acha Hospital</h1>
      </div>

      {/* Image Gallery */}

      <div
        className="grid grid-cols-4 grid-rows-2 gap-2 mb-8"
        style={{ height: "400px" }}
      >
        {/* Main image (2x2 grid) */}
        <div className="col-span-2 row-span-2">
          <Image
            src={images[0]}
            alt="Main view"
            className="w-full h-full object-cover rounded-l-xl"
            width={800} // Adjusted width for the main image
            height={533} // Maintain the aspect ratio for consistency
            layout="responsive"
            quality={100}
            sizes="(max-width: 800px) 100vw, 800px"
          />
        </div>

        {/* Smaller images (1x1 grid) */}
        {images.slice(1).map((src, index) => (
          <div key={src} className="col-span-1 row-span-1">
            <Image
              src={src}
              alt={`Photo ${index + 1}`}
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
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4 text-[#1c3f39] ">
          Patient Information
        </h2>
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
                <Label htmlFor="diagnosticHistory">Diagnostic History</Label>
                <Textarea
                  id="diagnosticHistory"
                  name="diagnosticHistory"
                  value={formData.diagnosticHistory}
                  onChange={handleInputChange}
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-[#1c3f39] hover:bg-[#1c3f39] hover:shadow-sm hover:shadow-[#1c3f39] "
              >
                Submit
              </Button>
            </form>
          </div>

          {/* Card Section */}
          <div className="w-full md:w-1/3">{/* Add Bed */}</div>
        </div>
      </div>
    </div>
  );
}
