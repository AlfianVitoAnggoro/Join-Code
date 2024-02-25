import Image from 'next/image';
import Link from 'next/link';

export default function LoginPages() {
  return (
    <div className="relative laptop:mt-20">
      <div className="w-[1024px] min-h-screen mx-auto px-10 flex justify-center items-center">
        <div className="w-3/6 bg-white shadow-md border border-gray-200 rounded-e-sm p-4 sm:p-6 lg:p-8">
          <form className="space-y-6 my-8">
            <h3 className="text-xl font-medium text-black">
              Sign in to our platform
            </h3>
            <div>
              <label
                htmlFor="email"
                className="text-sm font-medium text-black block mb-2"
              >
                Your email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="bg-gray-50 border border-black text-black sm:text-sm rounded-lg focus:ring-black focus:border-black block w-full p-2.5 "
                placeholder="name@company.com"
                required
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="text-sm font-medium text-black block mb-2"
              >
                Your Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                className="bg-gray-50 border border-black text-black sm:text-sm rounded-lg focus:ring-black focus:border-black block w-full p-2.5 "
                placeholder="********"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Login to your account
            </button>
            <div className="text-sm text-center font-medium text-gray-500 ">
              Don't have account ? Create account as{' '}
              <div className="flex justify-evenly items-center gap-2">
                <Link
                  href="/register/software_developer"
                  className="text-blue-700 hover:underline"
                >
                  Software Developer
                </Link>
                <Link
                  href="/register/organization"
                  className="text-blue-700 hover:underline"
                >
                  Organization
                </Link>
              </div>
            </div>
          </form>
        </div>
        <div className="w-3/6 flex justify-center items-center">
          <Image
            src="/images/login.svg"
            width={200}
            height={200}
            alt="Login"
            className="w-auto h-96"
            priority
          />
        </div>
      </div>
    </div>
  );
}
