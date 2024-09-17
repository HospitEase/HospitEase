"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { ArrowLeft, ArrowRight, Star } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = async () => {
    const res = await axios.post("http://127.0.0.1:8787/home/Login", {
      useremail: email,
      password: password,
    });

    const token = res.data.msg;
    console.log(token);
    if (!token) {
      alert("Kindly signup again");
    } else {
      sessionStorage.setItem("token", token);
      router.push("dashboard");
    }
  };
  return (
    <div className="flex h-screen bg-gray-100">
      <div className="flex-1 flex flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div>
            <div className="flex items-center">
              <div className="h-6 w-6 bg-gray-900 rounded-full"></div>
              <div className="ml-2 text-xl font-semibold">HospitEase</div>
            </div>
            <div className="mt-6 text-3xl font-bold tracking-tight text-gray-900">
              Welcome back, Abhijeet
            </div>
            <div className="mt-2 text-sm text-gray-600">
              Welcome back! Please enter your details.
            </div>
          </div>

          <div className="mt-8">
            <div>
              <div>
                <Button variant="outline" className="w-full">
                  Log in with Google
                </Button>
              </div>

              <div className="mt-6 relative">
                <div
                  className="absolute inset-0 flex items-center"
                  aria-hidden="true"
                >
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <div className="px-2 bg-white text-gray-500">or</div>
                </div>
              </div>
            </div>

            <div className="mt-6">
              {/* Changed from form to div */}
              <div className="space-y-6">
                <div>
                  <div className="block text-sm font-medium text-gray-700">
                    Email
                  </div>
                  <div className="mt-1">
                    <Input
                      required
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="block text-sm font-medium text-gray-700">
                    Password
                  </div>
                  <div className="mt-1">
                    <Input
                      type="password"
                      required
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Checkbox />
                    <div className="ml-2 block text-sm text-gray-900">
                      Remember for 30 days
                    </div>
                  </div>

                  <div className="text-sm">
                    <Link
                      href="#"
                      className="font-medium text-blue-600 hover:text-blue-500"
                    >
                      Forgot password
                    </Link>
                  </div>
                </div>

                <div>
                  <Button // Changed type to "button"
                    onClick={handleLogin}
                    className="w-full bg-gray-900 text-white"
                  >
                    Log in
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10 text-sm text-center text-gray-500">
            Don't have an account?{" "}
            <Link
              href="/patient/signup"
              className="font-semibold leading-6 text-blue-600 hover:text-blue-500"
            >
              Sign up for free
            </Link>
          </div>
        </div>
      </div>
      <div className="hidden lg:block relative w-0 flex-1">
        <Image
          className="absolute inset-0 h-full w-full object-cover"
          src="/placeholder.svg?height=1080&width=1920"
          width={1920}
          height={1080}
        />
        <div className="absolute inset-0 bg-gray-700 opacity-50"></div>
        <div className="absolute inset-0 flex flex-col justify-end p-12 text-white">
          <div className="max-w-2xl">
            <div className="text-4xl font-bold mb-4">
              Behind every great healthcare professional is the power to make
              informed decisions.
            </div>
            <div className="flex items-center mb-4">
              <div className="flex-shrink-0">
                <Image
                  className="h-12 w-12 rounded-full"
                  src="/placeholder.svg?height=48&width=48"
                  width={48}
                  height={48}
                />
              </div>
              <div className="ml-4">
                <div className="text-lg font-semibold">Dr. Jonathan Wells</div>
                <div className="text-sm opacity-75">
                  Renowned healthcare strategist{" "}
                </div>
                <div className="text-sm opacity-75">
                  St. Ignatius Medical Center
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-current" />
                ))}
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" size="icon" className="rounded-full">
                  <ArrowLeft className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" className="rounded-full">
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
