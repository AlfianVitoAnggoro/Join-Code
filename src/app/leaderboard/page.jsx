import Image from 'next/image';

export default function LeaderboardPages() {
  return (
    <div className="relative min-h-screen py-3 laptop:mt-20">
      <div className="w-[1024px] mx-auto px-10">
        <div className="flex flex-col gap-3">
          {/* Header */}
          <div className="bg-white rounded py-5 px-3">
            <h1 className="text-3xl font-bold m-3">Leaderboard</h1>
          </div>
          {/* Card */}
          <div>
            <div>
              <table className="table-auto min-w-full rounded-lg">
                <thead className="bg-black text-white font-bold text-sm text-left uppercase tracking-wider">
                  <tr>
                    <th className="px-6 py-3 w-[15%]">Peringkat</th>
                    <th className="px-6 py-3 w-[65%]">Software Developer</th>
                    <th className="px-6 py-3 w-[20%]">Point</th>
                  </tr>
                </thead>
              </table>
            </div>
            <div className="overflow-y-auto min-h-max max-h-60">
              <table className="table-auto min-w-full rounded-lg">
                <tbody>
                  <tr className="even:bg-gray-100 odd:bg-gray-200 hover:bg-gray-300 transition-colors duration-200">
                    <td className="px-6 py-4 whitespace-nowrap w-[15%]">1</td>
                    <td className="px-6 py-4 whitespace-nowrap w-[65%]">
                      <div className="flex items-center gap-3">
                        <Image
                          src={'/images/test_avatar.png'}
                          width={50}
                          height={50}
                          alt="Alfian Vito Anggoro"
                          className="rounded object-cover w-10 h-10"
                        />
                        <div className="flex flex-col gap-1">
                          <p className="text-base font-semibold">
                            Alfian Vito Anggoro
                          </p>
                          <p className="text-sm text-neutral-400">
                            alfianvitoanggoro@gmail.com
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap w-[20%]">
                      1000
                    </td>
                  </tr>
                  <tr className="even:bg-gray-100 odd:bg-gray-200 hover:bg-gray-300 transition-colors duration-200">
                    <td className="px-6 py-4 whitespace-nowrap w-[15%]">1</td>
                    <td className="px-6 py-4 whitespace-nowrap w-[65%]">
                      <div className="flex items-center gap-3">
                        <Image
                          src={'/images/test_avatar.png'}
                          width={50}
                          height={50}
                          alt="Alfian Vito Anggoro"
                          className="rounded object-cover w-10 h-10"
                        />
                        <div className="flex flex-col gap-1">
                          <p className="text-base font-semibold">
                            Alfian Vito Anggoro
                          </p>
                          <p className="text-sm text-neutral-400">
                            alfianvitoanggoro@gmail.com
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap w-[20%]">
                      1000
                    </td>
                  </tr>
                  <tr className="even:bg-gray-100 odd:bg-gray-200 hover:bg-gray-300 transition-colors duration-200">
                    <td className="px-6 py-4 whitespace-nowrap w-[15%]">1</td>
                    <td className="px-6 py-4 whitespace-nowrap w-[65%]">
                      <div className="flex items-center gap-3">
                        <Image
                          src={'/images/test_avatar.png'}
                          width={50}
                          height={50}
                          alt="Alfian Vito Anggoro"
                          className="rounded object-cover w-10 h-10"
                        />
                        <div className="flex flex-col gap-1">
                          <p className="text-base font-semibold">
                            Alfian Vito Anggoro
                          </p>
                          <p className="text-sm text-neutral-400">
                            alfianvitoanggoro@gmail.com
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap w-[20%]">
                      1000
                    </td>
                  </tr>
                  <tr className="even:bg-gray-100 odd:bg-gray-200 hover:bg-gray-300 transition-colors duration-200">
                    <td className="px-6 py-4 whitespace-nowrap w-[15%]">1</td>
                    <td className="px-6 py-4 whitespace-nowrap w-[65%]">
                      <div className="flex items-center gap-3">
                        <Image
                          src={'/images/test_avatar.png'}
                          width={50}
                          height={50}
                          alt="Alfian Vito Anggoro"
                          className="rounded object-cover w-10 h-10"
                        />
                        <div className="flex flex-col gap-1">
                          <p className="text-base font-semibold">
                            Alfian Vito Anggoro
                          </p>
                          <p className="text-sm text-neutral-400">
                            alfianvitoanggoro@gmail.com
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap w-[20%]">
                      1000
                    </td>
                  </tr>
                  <tr className="even:bg-gray-100 odd:bg-gray-200 hover:bg-gray-300 transition-colors duration-200">
                    <td className="px-6 py-4 whitespace-nowrap w-[15%]">1</td>
                    <td className="px-6 py-4 whitespace-nowrap w-[65%]">
                      <div className="flex items-center gap-3">
                        <Image
                          src={'/images/test_avatar.png'}
                          width={50}
                          height={50}
                          alt="Alfian Vito Anggoro"
                          className="rounded object-cover w-10 h-10"
                        />
                        <div className="flex flex-col gap-1">
                          <p className="text-base font-semibold">
                            Alfian Vito Anggoro
                          </p>
                          <p className="text-sm text-neutral-400">
                            alfianvitoanggoro@gmail.com
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap w-[20%]">
                      1000
                    </td>
                  </tr>
                  <tr className="even:bg-gray-100 odd:bg-gray-200 hover:bg-gray-300 transition-colors duration-200">
                    <td className="px-6 py-4 whitespace-nowrap w-[15%]">1</td>
                    <td className="px-6 py-4 whitespace-nowrap w-[65%]">
                      <div className="flex items-center gap-3">
                        <Image
                          src={'/images/test_avatar.png'}
                          width={50}
                          height={50}
                          alt="Alfian Vito Anggoro"
                          className="rounded object-cover w-10 h-10"
                        />
                        <div className="flex flex-col gap-1">
                          <p className="text-base font-semibold">
                            Alfian Vito Anggoro
                          </p>
                          <p className="text-sm text-neutral-400">
                            alfianvitoanggoro@gmail.com
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap w-[20%]">
                      1000
                    </td>
                  </tr>
                  <tr className="even:bg-gray-100 odd:bg-gray-200 hover:bg-gray-300 transition-colors duration-200">
                    <td className="px-6 py-4 whitespace-nowrap w-[15%]">1</td>
                    <td className="px-6 py-4 whitespace-nowrap w-[65%]">
                      <div className="flex items-center gap-3">
                        <Image
                          src={'/images/test_avatar.png'}
                          width={50}
                          height={50}
                          alt="Alfian Vito Anggoro"
                          className="rounded object-cover w-10 h-10"
                        />
                        <div className="flex flex-col gap-1">
                          <p className="text-base font-semibold">
                            Alfian Vito Anggoro
                          </p>
                          <p className="text-sm text-neutral-400">
                            alfianvitoanggoro@gmail.com
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap w-[20%]">
                      1000
                    </td>
                  </tr>
                  <tr className="even:bg-gray-100 odd:bg-gray-200 hover:bg-gray-300 transition-colors duration-200">
                    <td className="px-6 py-4 whitespace-nowrap w-[15%]">1</td>
                    <td className="px-6 py-4 whitespace-nowrap w-[65%]">
                      <div className="flex items-center gap-3">
                        <Image
                          src={'/images/test_avatar.png'}
                          width={50}
                          height={50}
                          alt="Alfian Vito Anggoro"
                          className="rounded object-cover w-10 h-10"
                        />
                        <div className="flex flex-col gap-1">
                          <p className="text-base font-semibold">
                            Alfian Vito Anggoro
                          </p>
                          <p className="text-sm text-neutral-400">
                            alfianvitoanggoro@gmail.com
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap w-[20%]">
                      1000
                    </td>
                  </tr>
                  <tr className="even:bg-gray-100 odd:bg-gray-200 hover:bg-gray-300 transition-colors duration-200">
                    <td className="px-6 py-4 whitespace-nowrap w-[15%]">1</td>
                    <td className="px-6 py-4 whitespace-nowrap w-[65%]">
                      <div className="flex items-center gap-3">
                        <Image
                          src={'/images/test_avatar.png'}
                          width={50}
                          height={50}
                          alt="Alfian Vito Anggoro"
                          className="rounded object-cover w-10 h-10"
                        />
                        <div className="flex flex-col gap-1">
                          <p className="text-base font-semibold">
                            Alfian Vito Anggoro
                          </p>
                          <p className="text-sm text-neutral-400">
                            alfianvitoanggoro@gmail.com
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap w-[20%]">
                      1000
                    </td>
                  </tr>
                  <tr className="even:bg-gray-100 odd:bg-gray-200 hover:bg-gray-300 transition-colors duration-200">
                    <td className="px-6 py-4 whitespace-nowrap w-[15%]">1</td>
                    <td className="px-6 py-4 whitespace-nowrap w-[65%]">
                      <div className="flex items-center gap-3">
                        <Image
                          src={'/images/test_avatar.png'}
                          width={50}
                          height={50}
                          alt="Alfian Vito Anggoro"
                          className="rounded object-cover w-10 h-10"
                        />
                        <div className="flex flex-col gap-1">
                          <p className="text-base font-semibold">
                            Alfian Vito Anggoro
                          </p>
                          <p className="text-sm text-neutral-400">
                            alfianvitoanggoro@gmail.com
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap w-[20%]">
                      1000
                    </td>
                  </tr>
                  <tr className="even:bg-gray-100 odd:bg-gray-200 hover:bg-gray-300 transition-colors duration-200">
                    <td className="px-6 py-4 whitespace-nowrap w-[15%]">1</td>
                    <td className="px-6 py-4 whitespace-nowrap w-[65%]">
                      <div className="flex items-center gap-3">
                        <Image
                          src={'/images/test_avatar.png'}
                          width={50}
                          height={50}
                          alt="Alfian Vito Anggoro"
                          className="rounded object-cover w-10 h-10"
                        />
                        <div className="flex flex-col gap-1">
                          <p className="text-base font-semibold">
                            Alfian Vito Anggoro
                          </p>
                          <p className="text-sm text-neutral-400">
                            alfianvitoanggoro@gmail.com
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap w-[20%]">
                      1000
                    </td>
                  </tr>
                  <tr className="even:bg-gray-100 odd:bg-gray-200 hover:bg-gray-300 transition-colors duration-200">
                    <td className="px-6 py-4 whitespace-nowrap w-[15%]">1</td>
                    <td className="px-6 py-4 whitespace-nowrap w-[65%]">
                      <div className="flex items-center gap-3">
                        <Image
                          src={'/images/test_avatar.png'}
                          width={50}
                          height={50}
                          alt="Alfian Vito Anggoro"
                          className="rounded object-cover w-10 h-10"
                        />
                        <div className="flex flex-col gap-1">
                          <p className="text-base font-semibold">
                            Alfian Vito Anggoro
                          </p>
                          <p className="text-sm text-neutral-400">
                            alfianvitoanggoro@gmail.com
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap w-[20%]">
                      1000
                    </td>
                  </tr>
                  <tr className="even:bg-gray-100 odd:bg-gray-200 hover:bg-gray-300 transition-colors duration-200">
                    <td className="px-6 py-4 whitespace-nowrap w-[15%]">1</td>
                    <td className="px-6 py-4 whitespace-nowrap w-[65%]">
                      <div className="flex items-center gap-3">
                        <Image
                          src={'/images/test_avatar.png'}
                          width={50}
                          height={50}
                          alt="Alfian Vito Anggoro"
                          className="rounded object-cover w-10 h-10"
                        />
                        <div className="flex flex-col gap-1">
                          <p className="text-base font-semibold">
                            Alfian Vito Anggoro
                          </p>
                          <p className="text-sm text-neutral-400">
                            alfianvitoanggoro@gmail.com
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap w-[20%]">
                      1000
                    </td>
                  </tr>
                  <tr className="even:bg-gray-100 odd:bg-gray-200 hover:bg-gray-300 transition-colors duration-200">
                    <td className="px-6 py-4 whitespace-nowrap w-[15%]">1</td>
                    <td className="px-6 py-4 whitespace-nowrap w-[65%]">
                      <div className="flex items-center gap-3">
                        <Image
                          src={'/images/test_avatar.png'}
                          width={50}
                          height={50}
                          alt="Alfian Vito Anggoro"
                          className="rounded object-cover w-10 h-10"
                        />
                        <div className="flex flex-col gap-1">
                          <p className="text-base font-semibold">
                            Alfian Vito Anggoro
                          </p>
                          <p className="text-sm text-neutral-400">
                            alfianvitoanggoro@gmail.com
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap w-[20%]">
                      1000
                    </td>
                  </tr>
                  <tr className="even:bg-gray-100 odd:bg-gray-200 hover:bg-gray-300 transition-colors duration-200">
                    <td className="px-6 py-4 whitespace-nowrap w-[15%]">1</td>
                    <td className="px-6 py-4 whitespace-nowrap w-[65%]">
                      <div className="flex items-center gap-3">
                        <Image
                          src={'/images/test_avatar.png'}
                          width={50}
                          height={50}
                          alt="Alfian Vito Anggoro"
                          className="rounded object-cover w-10 h-10"
                        />
                        <div className="flex flex-col gap-1">
                          <p className="text-base font-semibold">
                            Alfian Vito Anggoro
                          </p>
                          <p className="text-sm text-neutral-400">
                            alfianvitoanggoro@gmail.com
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap w-[20%]">
                      1000
                    </td>
                  </tr>
                  <tr className="even:bg-gray-100 odd:bg-gray-200 hover:bg-gray-300 transition-colors duration-200">
                    <td className="px-6 py-4 whitespace-nowrap w-[15%]">1</td>
                    <td className="px-6 py-4 whitespace-nowrap w-[65%]">
                      <div className="flex items-center gap-3">
                        <Image
                          src={'/images/test_avatar.png'}
                          width={50}
                          height={50}
                          alt="Alfian Vito Anggoro"
                          className="rounded object-cover w-10 h-10"
                        />
                        <div className="flex flex-col gap-1">
                          <p className="text-base font-semibold">
                            Alfian Vito Anggoro
                          </p>
                          <p className="text-sm text-neutral-400">
                            alfianvitoanggoro@gmail.com
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap w-[20%]">
                      1000
                    </td>
                  </tr>
                  <tr className="even:bg-gray-100 odd:bg-gray-200 hover:bg-gray-300 transition-colors duration-200">
                    <td className="px-6 py-4 whitespace-nowrap w-[15%]">1</td>
                    <td className="px-6 py-4 whitespace-nowrap w-[65%]">
                      <div className="flex items-center gap-3">
                        <Image
                          src={'/images/test_avatar.png'}
                          width={50}
                          height={50}
                          alt="Alfian Vito Anggoro"
                          className="rounded object-cover w-10 h-10"
                        />
                        <div className="flex flex-col gap-1">
                          <p className="text-base font-semibold">
                            Alfian Vito Anggoro
                          </p>
                          <p className="text-sm text-neutral-400">
                            alfianvitoanggoro@gmail.com
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap w-[20%]">
                      1000
                    </td>
                  </tr>
                  <tr className="even:bg-gray-100 odd:bg-gray-200 hover:bg-gray-300 transition-colors duration-200">
                    <td className="px-6 py-4 whitespace-nowrap w-[15%]">1</td>
                    <td className="px-6 py-4 whitespace-nowrap w-[65%]">
                      <div className="flex items-center gap-3">
                        <Image
                          src={'/images/test_avatar.png'}
                          width={50}
                          height={50}
                          alt="Alfian Vito Anggoro"
                          className="rounded object-cover w-10 h-10"
                        />
                        <div className="flex flex-col gap-1">
                          <p className="text-base font-semibold">
                            Alfian Vito Anggoro
                          </p>
                          <p className="text-sm text-neutral-400">
                            alfianvitoanggoro@gmail.com
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap w-[20%]">
                      1000
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div>
              <table className="table-auto min-w-full rounded-lg">
                <tfoot>
                  <tr className="bg-neutral-700 text-white hover:bg-neutral-800 font-bold text-left tracking-wider transition-colors duration-200">
                    <td className="px-6 py-4 whitespace-nowrap w-[15%]">100</td>
                    <td className="px-6 py-4 whitespace-nowrap w-[65%]">
                      <div className="flex items-center gap-3">
                        <Image
                          src={'/images/test_avatar.png'}
                          width={50}
                          height={50}
                          alt="Alfian Vito Anggoro"
                          className="rounded object-cover w-10 h-10"
                        />
                        <div className="flex flex-col gap-1">
                          <p className="text-base font-semibold">
                            Alfian Vito Anggoro
                          </p>
                          <p className="text-sm text-neutral-400">
                            alfianvitoanggoro@gmail.com
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap w-[20%]">
                      1000
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
