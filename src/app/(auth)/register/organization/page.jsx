import Image from 'next/image';
import Link from 'next/link';

export default function RegisterOrganizationPages() {
  return (
    <div className="relaltive laptop:mt-20">
      <div className="w-[1024px] mx-auto min-h-screen flex justify-center items-center px-10">
        <div className="w-3/6 flex justify-center items-center">
          <Image
            src="/images/register_organization.svg"
            width={200}
            height={200}
            alt="register_software_developer"
            className="w-auto h-96"
            priority
          />
        </div>
        <div className="w-3/6">
          <div className="bg-white shadow-md border border-gray-200 rounded-lg p-4 sm:p-6 lg:p-8">
            <form className="space-y-3">
              <h3 className="text-xl font-medium text-black">
                Sign up as Organization
              </h3>
              <div>
                <label
                  htmlFor="name"
                  className="text-sm font-medium text-black block mb-2"
                >
                  Organization Name
                </label>
                <input
                  type="name"
                  name="name"
                  id="name"
                  className="bg-gray-50 border border-black text-black sm:text-sm rounded-lg focus:ring-black focus:border-black block w-full p-2.5 "
                  placeholder="Organization of Name"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="text-sm font-medium text-black block mb-2"
                >
                  Organization Email
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
              <div>
                <label
                  htmlFor="document"
                  className="text-sm font-medium text-black block mb-2"
                >
                  Upload your document support as organization
                </label>
                <input
                  type="file"
                  name="document"
                  id="document"
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
                  href="/register/software_developer"
                  className="text-blue-700 hover:underline "
                >
                  Software Developer
                </Link>
              </div>

              <div className="text-sm font-medium text-gray-500">
                Do you have an account?{' '}
                <Link href="/login" className="text-blue-700 hover:underline">
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
