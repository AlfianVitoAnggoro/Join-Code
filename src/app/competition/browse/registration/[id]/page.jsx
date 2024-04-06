export const metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
  ),
  title: 'Registration Competition - Join Code',
  description:
    'The Application make a collaboration and competition for software developer',
  authors: [
    { name: 'Alfian Vito Anggoro', url: `${process.env.NEXT_PUBLIC_API_URL}` },
  ],
  icons: {
    icon: '/icon.png',
  },
  openGraph: {
    title: 'Registration Competition',
    description: 'Registration Competition - Join Code',
    url: `${process.env.NEXT_PUBLIC_API_URL}`,
    siteName: 'Registration Competition',
  },
};
export default function RegistrationCompetition() {
  return (
    <div className="flex-1 bg-mainColor px-3">
      <div className="pt-3 mb-3">
        <h2 className="text-2xl font-medium">Competition Registration</h2>
      </div>
      <div className="p-3 bg-white">
        <form action="" className="space-y-3">
          <div>
            <label className="font-medium">Name</label>
            <input
              type="text"
              name="name"
              id="name"
              className="bg-gray-50 border border-gray-300 text-black sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              placeholder="Your Name"
            />
          </div>
          <button className="w-full bg-blue-500 text-white py-2 rounded">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
