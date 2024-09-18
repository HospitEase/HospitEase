"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

const generateBeds = (count, offset = 0) =>
  Array.from({ length: count }, (_, i) => ({
    id: `bed-${i + 1 + offset}`,
    number: i + 1 + offset,
    status: Math.random() > 0.6 ? "available" : "occupied",
  }));

const wards = [
  { id: "male", name: "Male Ward", beds: generateBeds(20) },
  { id: "female", name: "Female Ward", beds: generateBeds(20, 20) },
  { id: "children", name: "Children's Ward", beds: generateBeds(15, 40) },
];

export default function BedManagement() {
  const [selectedWard, setSelectedWard] = useState(wards[0]);

  const handleWardChange = (event) => {
    const ward = wards.find((w) => w.id === event.target.value);
    if (ward) {
      setSelectedWard(ward);
    }
  };

  const availableBeds = selectedWard.beds.filter(
    (bed) => bed.status === "available",
  ).length;

  const handleBedClick = (bedId) => {
    // Create a copy of the beds array
    const updatedBeds = selectedWard.beds.map((bed) =>
      bed.id === bedId
        ? {
            ...bed,
            status: bed.status === "available" ? "occupied" : "available",
          }
        : bed,
    );

    // Update the state with the modified beds array
    setSelectedWard({ ...selectedWard, beds: updatedBeds });
  };

  return (
    <div className="mx-auto p-4 max-w-sm bg-gray-100 rounded-lg shadow-lg h-[calc(100vh-2rem)] flex flex-col">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">
        Hospital Bed Management
      </h1>
      <div className="mb-4 flex flex-col items-start gap-2">
        <div className="relative w-full">
          <select
            onChange={handleWardChange}
            value={selectedWard.id}
            className="block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          >
            {wards.map((ward) => (
              <option key={ward.id} value={ward.id}>
                {ward.name}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <ChevronDown className="h-4 w-4" />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-gray-600 font-medium">Available Beds:</span>
          <span className="inline-block bg-teal-100 text-teal-800 text-lg font-mono px-2 py-1 rounded-full">
            {availableBeds} / {selectedWard.beds.length}
          </span>
        </div>
      </div>
      <div className="bg-white border-2 border-gray-200 rounded-lg p-4">
        <h2 className="text-xl font-semibold mb-3 text-gray-700">
          {selectedWard.name}
        </h2>
        <div className="grid grid-cols-4 gap-2">
          {selectedWard.beds.map((bed) => (
            <div
              key={bed.id}
              className={`
                aspect-square flex items-center justify-center rounded-md text-white font-bold text-sm
                ${bed.status === "available" ? "bg-teal-500 hover:bg-teal-600" : "bg-rose-500 hover:bg-rose-600"}
                transition-colors duration-200 cursor-pointer shadow-md
              `}
              title={`Bed ${bed.number}: ${bed.status}`}
              onClick={() => {
                if (bed.status === "available") {
                  handleBedClick(bed.id);
                } else {
                  alert("Can't pick occupied beds");
                }
              }}
            >
              {bed.number}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
