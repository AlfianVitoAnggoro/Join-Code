import Image from 'next/image';
import Link from 'next/link';

export default function RegisterSoftwareDeveloperPages() {
  return (
    <div className="relative laptop:mt-20">
      <div className="w-[1024px] mx-auto px-10 min-h-screen flex justify-center items-center">
        <div className="w-3/6 flex justify-center items-center">
          <Image
            src="/images/register_software_developer.svg"
            width={200}
            height={200}
            alt="register_software_developer"
            className="w-auto h-96"
            priority
          />
        </div>
        <div className="w-3/6">
          <div className="bg-white shadow-md border border-gray-200 rounded-lg p-4 sm:p-6 lg:p-8 ">
            <form className="space-y-3">
              <h3 className="text-xl font-medium text-dark">
                Sign up as Software Developer
              </h3>
              <div>
                <label
                  htmlFor="name"
                  className="text-sm font-medium text-black block mb-2"
                >
                  Your Name
                </label>
                <input
                  type="name"
                  name="name"
                  id="name"
                  className="bg-gray-50 border border-black text-black sm:text-sm rounded-lg focus:ring-black focus:border-black block w-full p-2.5 "
                  placeholder="Your Name"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="text-sm font-medium text-black block mb-2"
                >
                  Your Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-black text-black sm:text-sm rounded-lg focus:ring-black focus:border-black block w-full p-2.5 "
                  placeholder="name@email.com"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="text-sm font-medium text-black block mb-2"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  className="bg-gray-50 border border-black text-black sm:text-sm rounded-lg focus:ring-black focus:border-black block w-full p-2.5 "
                  placeholder="*******"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="confirm_password"
                  className="text-sm font-medium text-black block mb-2"
                >
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="confirm_password"
                  id="confirm_password"
                  className="bg-gray-50 border border-black text-black sm:text-sm rounded-lg focus:ring-black focus:border-black block w-full p-2.5 "
                  placeholder="*******"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Signup Account{' '}
              </button>
              <div className="text-sm font-medium text-gray-500">
                Create account as{' '}
                <Link
                  href="/register/organization"
                  className="text-blue-700 hover:underline "
                >
                  Organization
                </Link>
              </div>
              <div className="text-sm font-medium text-gray-500 ">
                Do you have an account?{' '}
                <Link href="/login" className="text-blue-700 hover:underline ">
                  Signin
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
