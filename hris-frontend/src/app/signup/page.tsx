import Image from "next/image";
import Link from "next/link";

export default function SignUpPage() {
  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      {/* Kiri - Gambar */}
      <div className="w-full lg:w-1/2 bg-[#f5f9ff] flex items-center justify-center p-8">
        <Image
          src="/assets/img/signup.png"
          alt="Signup Illustration"
          width={600}
          height={600}
          className="object-contain max-w-full h-auto"
        />
      </div>

      {/* Kanan - Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-between px-6 sm:px-12 md:px-16 lg:px-20 py-10">
        {/* Konten Atas */}
        <div>
          <div className="flex justify-between items-center mb-8">
            <Image
              src="/assets/img/LogoHRIS.png"
              alt="HRIS Logo"
              width={90}
              height={90}
            />
            <Link href="/signin" className="text-blue-600 font-semibold text-sm">
              Sign In here!
            </Link>
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold mb-3">Sign Up</h1>
          <p className="text-gray-600 mb-6">
            Create your account and streamline your employee management.
          </p>

          <form className="space-y-6">
            {/* Nama Depan & Belakang */}
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
              <div className="w-full sm:w-1/2">
                <label className="block text-sm font-medium mb-1">First Name</label>
                <input
                  type="text"
                  placeholder="Enter your first name"
                  className="w-full border border-gray-400 p-3 rounded"
                />
              </div>
              <div className="w-full sm:w-1/2">
                <label className="block text-sm font-medium mb-1">Last Name</label>
                <input
                  type="text"
                  placeholder="Enter your last name"
                  className="w-full border border-gray-400 p-3 rounded"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full border border-gray-400 p-3 rounded"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium mb-1">Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                className="w-full border border-gray-400 p-3 rounded"
              />
            </div>

            {/* Konfirmasi Password */}
            <div>
              <label className="block text-sm font-medium mb-1">Confirm Password</label>
              <input
                type="password"
                placeholder="Enter your confirm password"
                className="w-full border border-gray-400 p-3 rounded"
              />
            </div>

            {/* Checkbox */}
            <div className="flex items-start gap-2 mb-7">
              <input
                type="checkbox"
                className="mt-1 w-4 h-4 border-2 border-gray-300 rounded focus:outline-none"
              />
              <label className="text-sm">
                I agree with the terms of use of HRIS
              </label>
            </div>

            {/* Tombol Signup */}
            <button
              type="submit"
              className="w-full bg-gray-800 text-white py-5 rounded font-semibold hover:bg-gray-900 transition mt-8"
            >
              SIGN UP
            </button>

            {/* Tombol Google */}
            <button
              type="button"
              className="w-full border border-black py-5 rounded font-semibold hover:bg-gray-100 transition"
            >
              Sign up with Google
            </button>
          </form>
        </div>

        {/* Footer */}
        <div className="pt-6">
          <hr className="my-9" />
          <p className="text-center text-sm">
            Already have an account?{' '}
            <Link href="/signin" className="text-blue-600 font-medium">
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
