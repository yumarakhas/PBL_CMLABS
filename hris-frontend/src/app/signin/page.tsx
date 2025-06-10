// signin->page.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { loginAdmin } from "@/lib/api";
import { Eye, EyeOff } from "lucide-react"; // Import Eye and EyeOff icons

export default function SignInPage() {
  const router = useRouter();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State for password visibility

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const res = await loginAdmin(identifier, password);
      localStorage.setItem("adminToken", res.token);
      router.push("/admin/dashboard");
    } catch (err: any) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      {/* Kiri - Gambar */}
      <div className="w-full lg:w-1/2 bg-[#f0f4ff] flex items-center justify-center p-8">
        <Image
          src="/assets/img/signin.png"
          alt="Login Illustration"
          width={700}
          height={700}
          className="object-contain max-w-full h-auto"
        />
      </div>

      {/* Kanan - Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-between bg-[#ffffff] px-6 sm:px-12 md:px-16 lg:px-20 py-10">
        <div>
          <div className="flex justify-between items-center mb-8">
            <Image src="/assets/img/LogoHRIS.png" alt="Logo" width={90} height={90} />
            <Link href="/signup" className="text-blue-600 font-semibold text-sm underline">
              Try for free!
            </Link>
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold mb-3">Sign in</h1>
          <p className="text-gray-600 mb-6">
            Welcome back to HRIS cmlabs! Manage everything with ease.
          </p>

          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && <p className="text-red-500">{error}</p>}

            <div>
              <label className="block text-sm font-medium mb-1">Email / Phone</label>
              <input
                type="text"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                placeholder="Enter your email or phone number"
                className="w-full border border-gray-400 p-3 rounded"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Password</label>
              <div className="relative"> {/* Added relative positioning */}
                <input
                  type={showPassword ? "text" : "password"} // Toggle type based on showPassword state
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full border border-gray-400 p-3 rounded pr-10" // Add padding-right for the icon
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-3 text-gray-600" // Position the icon
                  onClick={() => setShowPassword(!showPassword)} // Toggle showPassword state
                >
                  {showPassword ? <EyeOff size={25} /> : <Eye size={25} />}
                </button>
              </div>
            </div>

            <div className="flex justify-between items-center text-sm">
              <label htmlFor="remember" className="flex items-center cursor-pointer">
                <input type="checkbox" id="remember" className="peer hidden" />
                <div className="w-5 h-5 rounded-full border-2 border-gray-400 flex items-center justify-center peer-checked:bg-blue-600 peer-checked:border-blue-600 transition-all duration-200">
                  <svg
                    className="w-3 h-3 text-white hidden peer-checked:block"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="ml-3 text-sm">Remember Me</span>
              </label>
              <Link href="#" className="text-blue-600 font-medium">
                Forgot Password?
              </Link>
            </div>

            <button
              type="submit"
              className="w-full bg-gray-800 text-white py-4 rounded font-semibold hover:bg-gray-900 transition"
            >
              SIGN IN
            </button>

            <button
              type="button"
              className="w-full border border-black py-4 rounded font-semibold hover:bg-gray-100 transition"
            >
              Sign in with Google
            </button>

            <Link
              href="/signin/idemployee"
              className="block text-center w-full border border-black py-4 rounded font-semibold hover:bg-gray-100 transition"
            >
              Sign in with ID Employee
            </Link>
          </form>
        </div>

        <div className="pt-6">
          <hr className="my-9" />
          <p className="text-center text-sm">
            Don’t have an account yet?{" "}
            <Link href="/signup" className="text-blue-600 font-medium">
              Sign up now and get started
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}