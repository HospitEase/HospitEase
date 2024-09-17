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

export default function PatientFormComponent() {
  const [images] = useState([
    "/Photo1.jpg?height=400&width=600",
    "/Photo1.jpg?height=200&width=300",
    "/Photo1.jpg?height=200&width=300",
    "/Photo1.jpg?height=200&width=300",
    "/Photo1.jpg?height=200&width=300",
  ]);

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
      <header className="flex items-center justify-between mb-8">
        <div className="text-pink-500 font-bold text-3xl">airbnb</div>
        <div className="flex items-center space-x-4 bg-white rounded-full shadow-md p-2">
          <Button variant="ghost">Anywhere</Button>
          <Button variant="ghost">Any week</Button>
          <Button variant="ghost">Add guests</Button>
          <Button size="icon" className="bg-pink-500 text-white rounded-full">
            <SearchIcon className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex items-center space-x-4">
          <Button variant="ghost">Airbnb your home</Button>
          <Button variant="ghost" size="icon">
            <GlobeIcon className="h-5 w-5" />
          </Button>
          <Button
            variant="outline"
            className="flex items-center space-x-2 rounded-full"
          >
            <MenuIcon className="h-4 w-4" />
            <UserCircleIcon className="h-6 w-6" />
          </Button>
        </div>
      </header>

      {/* Listing Title */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-semibold">
          Playdate at Polly Pocket's Compact
        </h1>
        <div className="flex space-x-4">
          <Button variant="outline">Share</Button>
          <Button variant="outline">Save</Button>
        </div>
      </div>

      {/* Image Gallery */}
      <div
        className="grid grid-cols-4 grid-rows-2 gap-2 mb-8"
        style={{ height: "400px" }}
      >
        <div className="col-span-2 row-span-2">
          <Image
            src={images[0]}
            alt="Main view"
            className="w-full h-full object-cover rounded-l-xl"
          />
        </div>
        {images.slice(1).map((src, index) => (
          <div key={index}>
            <Image
              src={src}
              alt={`View ${index + 2}`}
              className="w-full h-full object-cover rounded-r-xl"
            />
          </div>
        ))}
      </div>

      {/* Patient Form */}
      <div className="mt-12">
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
                <Label htmlFor="diagnosticHistory">Diagnostic History</Label>
                <Textarea
                  id="diagnosticHistory"
                  name="diagnosticHistory"
                  value={formData.diagnosticHistory}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <Label>Is this a new problem?</Label>
                <RadioGroup
                  name="isNewProblem"
                  value={formData.isNewProblem}
                  onValueChange={(value) =>
                    setFormData((prevData) => ({
                      ...prevData,
                      isNewProblem: value,
                    }))
                  }
                  className="flex space-x-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="newProblemYes" />
                    <Label htmlFor="newProblemYes">Yes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="newProblemNo" />
                    <Label htmlFor="newProblemNo">No</Label>
                  </div>
                </RadioGroup>
              </div>
              <Button type="submit" className="w-full">
                Submit
              </Button>
            </form>
          </div>

          {/* Card Section */}
          <div className="w-full md:w-1/3">
            <Card>
              <CardHeader>
                <CardTitle>Patient Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Name: {formData.name}</p>
                <p>Date of Birth: {formData.dob}</p>
                <p>Contact: {formData.contact}</p>
                <p>Sex: {formData.sex}</p>
                <p>Ayushman Card: {formData.ayushmanCard}</p>
                <p>
                  New Problem:{" "}
                  {formData.isNewProblem === "yes"
                    ? "Yes"
                    : formData.isNewProblem === "no"
                      ? "No"
                      : "Not specified"}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
