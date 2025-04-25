import Image from "next/image";
import Link from "next/link";

export default function ForgotPasswordPage() {
  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      {/* Kiri - Form Reset Password */}
      <div className="w-full lg:w-1/2 bg-[#f5f9ff] flex flex-col px-6 sm:px-12 md:px-16 lg:px-20 py-10">
        {/* Logo */}
        <div className="mb-12">
          <Image
            src="/assets/img/LogoHRIS.png"
            alt="HRIS Logo"
            width={90}
            height={90}
          />
        </div>

        {/* Tengah - Form & Teks */}
        <div className="flex-grow flex flex-col justify-center items-center text-center">
          <div className="w-full max-w-md">
            <h1 className="text-5xl font-bold mb-10">Forgot Password</h1>
            <p className="text-gray-600 mb-25">
              No worries! Enter your email address below, and we'll send you a link to reset your password.
            </p>

            <form className="space-y-6">
              <div className="text-left">
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="w-full border border-gray-400 p-3 rounded"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gray-800 text-white py-3 rounded font-semibold hover:bg-gray-900 transition"
              >
                Reset Password
              </button>
            </form>

            <div className="mt-6 text-sm">
              <Link href="/signin" className="text-blue-600 hover:underline">
                ← Back to log in
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Kanan - Ilustrasi */}
      <div className="hidden lg:flex w-full lg:w-1/2 items-center justify-center bg-white p-8">
        <Image
          src="/assets/img/forgotpassword.png"
          alt="Forgot Password Illustration"
          width={500}
          height={500}
          className="object-contain"
        />
      </div>
    </div>
  );
}
