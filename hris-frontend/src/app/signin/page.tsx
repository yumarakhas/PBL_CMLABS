import Image from "next/image";
import Link from "next/link";

export default function SignInPage() {
  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      {/* Kiri - Gambar */}
      <div className="w-full lg:w-1/2 bg-[#f5f9ff] flex items-center justify-center p-8">
        <Image
          src="/assets/img/signin.png"
          alt="Login Illustration"
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
            <Link href="/signup" className="text-blue-600 font-semibold text-sm">
              Try for free!
            </Link>
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold mb-3">Sign in</h1>
          <p className="text-gray-600 mb-6">
            Welcome back to HRIS cmlabs! Manage everything with ease.
          </p>

          <form className="space-y-6">
            {/* Email / Phone */}
            <div>
              <label className="block text-sm font-medium mb-1">Email or Phone Number</label>
              <input
                type="text"
                placeholder="Enter your email or phone number"
                className="w-full border border-gray-400 p-3 rounded"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium mb-1">Password</label>
              <div className="relative">
                <input
                  type="password"
                  placeholder="Enter your password"
                  className="w-full border border-gray-400 p-3 rounded pr-10"
                />
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex justify-between items-center text-sm">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className="w-4 h-4 border border-gray-300 rounded"
                />
                Remember Me
              </label>
              <Link href="#" className="text-blue-600 font-medium">
                Forgot Password?
              </Link>
            </div>

            {/* Tombol Sign In */}
            <button
              type="submit"
              className="w-full bg-gray-800 text-white py-4 rounded font-semibold hover:bg-gray-900 transition"
            >
              SIGN IN
            </button>

            {/* Sign in with Google */}
            <button
              type="button"
              className="w-full border border-black py-4 rounded font-semibold hover:bg-gray-100 transition"
            >
              Sign in with Google
            </button>

            {/* Sign in with ID Employee */}
            <button
              type="button"
              className="w-full border border-black py-4 rounded font-semibold hover:bg-gray-100 transition"
            >
              Sign in with ID Employee
            </button>
          </form>
        </div>

        {/* Footer */}
        <div className="pt-6">
          <hr className="my-9" />
          <p className="text-center text-sm">
            Don’t have an account yet?{' '}
            <Link href="/signup" className="text-blue-600 font-medium">
              Sign up now and get started
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
