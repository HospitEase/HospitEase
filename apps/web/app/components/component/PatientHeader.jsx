"use client";

import { useState } from "react";
import { Search, Globe, Menu, User } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { useRouter } from "next/navigation";

export default function AirbnbHeader() {
  const router = useRouter();
  const [where, setWhere] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [when, setWhen] = useState(new Date());
  const [whom, setWhom] = useState("");
  const localities = [
    "New York",
    "Los Angeles",
    "Chicago",
    "Houston",
    "Phoenix",
    "Philadelphia",
    "San Antonio",
    "San Diego",
    "Dallas",
    "San Jose",
  ];
  const handleWhomChange = (e) => {
    const query = e.target.value;
    setWhom(query);
  };
  const handleWhereChange = (e) => {
    const query = e.target.value;
    setWhere(query);

    if (query.length > 0) {
      const filteredSuggestions = localities.filter((locality) =>
        locality.toLowerCase().includes(query.toLowerCase()),
      );
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
    setHighlightedIndex(-1); // Reset highlighted index when typing
  };

  const handleSuggestionClick = (suggestion) => {
    setWhere(suggestion);
    setSuggestions([]); // Hide suggestions after click
  };

  const handleKeyDown = (e) => {
    if (suggestions.length === 0) return;

    if (e.key === "ArrowDown") {
      // Move down in the suggestions list
      setHighlightedIndex((prevIndex) =>
        prevIndex < suggestions.length - 1 ? prevIndex + 1 : prevIndex,
      );
    } else if (e.key === "ArrowUp") {
      // Move up in the suggestions list
      setHighlightedIndex((prevIndex) =>
        prevIndex > 0 ? prevIndex - 1 : prevIndex,
      );
    } else if (e.key === "Enter" && highlightedIndex >= 0) {
      // Select the highlighted suggestion on Enter
      setWhere(suggestions[highlightedIndex]);
      setSuggestions([]);
    }
  };

  const handleSearch = () => {
    router.push({
      pathname: "/hospital",
    });
  };

  return (
    <header className="border-b">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0">HospitEase</div>

          {/* Right side buttons */}
          <div className="flex items-center">
            <button className="flex items-center space-x-2 border rounded-full p-2 hover:shadow-md">
              <Menu className="h-5 w-5 text-gray-500" />
              <User className="h-5 w-5 text-gray-500" />
            </button>
          </div>
        </div>

        <div className="flex items-center justify-center py-4">
          <div className="flex w-full max-w-3xl rounded-full border shadow-sm">
            <div className="flex-1 min-w-0 px-4 py-2">
              <div className="p-4">
                <div className="font-medium">Where</div>
                <input
                  type="text"
                  className="w-full border-0 bg-transparent text-gray-900 placeholder-gray-500 focus:outline-none sm:text-sm"
                  placeholder="Search your locality"
                  value={where}
                  onChange={handleWhereChange}
                  onKeyDown={handleKeyDown} // Add keydown event
                />
                {suggestions.length > 0 && (
                  <ul className="absolute mt-2 bg-white border border-gray-300 rounded-md shadow-lg max-h-48 overflow-y-auto z-10">
                    {suggestions.map((suggestion, index) => (
                      <li
                        key={index}
                        className={`px-4 py-2 cursor-pointer text-gray-700 hover:bg-gray-100 ${
                          index === highlightedIndex ? "bg-gray-100" : ""
                        }`} // Highlight the suggestion when it is selected with ArrowDown
                        onClick={() => handleSuggestionClick(suggestion)}
                      >
                        {suggestion}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            <div className="flex-1 min-w-0 px-4 py-2 border-l">
              <div className="p-4">
                <div className="font-medium">When</div>
                <Popover>
                  <PopoverTrigger asChild>
                    <input
                      type="text"
                      className="w-full border-0 bg-transparent text-gray-900 placeholder-gray-500 focus:outline-none sm:text-sm"
                      placeholder="Add date"
                      value={format(when, "PPP")}
                    />
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={when}
                      onSelect={setWhen}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            <div className="flex-1 min-w-0 px-4 py-2 border-l">
              <div className="p-4">
                <div className="font-medium">With Whom</div>
                <input
                  type="text"
                  id="guests"
                  name="guests"
                  className="w-full border-0 bg-transparent text-gray-900 placeholder-gray-500 focus:outline-none sm:text-sm"
                  placeholder="Speciality"
                  value={whom}
                  onChange={handleWhomChange}
                />
              </div>
            </div>

            <button
              className="bg-[#ff385c] text-white p-2 m-2 rounded-full hover:bg-[#e31c5f] transition-colors duration-200"
              onClick={handleSearch}
            >
              <Search className="h-5 w-16" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
