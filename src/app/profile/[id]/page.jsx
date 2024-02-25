import Image from 'next/image';
import Link from 'next/link';

export default function ProfilePage({ params }) {
  return (
    <div className="relative min-h-screen laptop:mt-20">
      <div className="bg-black">
        <div className="w-[1024px] min-h-fit mx-auto p-10 grid gap-5 grid-cols-1 laptop:grid-cols-3">
          <div className="col-span-1 flex justify-center">
            <div className="bg-gray-600 w-56 h-56 rounded-full">
              <Image
                width={100}
                height={100}
                src="/images/test_avatar.png"
                alt="Alfian Vito Anggoro"
                priority
                className="rounded-full w-56 h-56 object-cover"
              />
            </div>
          </div>
          <div className="lg:col-span-2 m-10 lg:m-0 lg:mr-10 ">
            <div className="flex flex-col space-y-2">
              <h2 className="text-5xl font-bold text-white">
                Alfian Vito Anggoro{' '}
              </h2>
              <p className="text-md bg-green-600 w-fit rounded-full p-1 px-3 mt-1 text-md font-semibold text-white my-2">
                #OPENTOCOLLABORATE
              </p>
              <p className="text-xl text-white mt-1">
                Web Developer || Android Developer || Flutter Developer
              </p>
              <div className="flex justify-start items-center gap-3 mt-2">
                <p className="bg-gray-200 w-fit rounded-full py-1 px-3 text-md font-semibold text-black">
                  Newbie
                </p>
                <p className="text-xl font-semibold text-white">1.000 XP</p>
              </div>
              <div className="mt-2">
                <h2 className="font-semibold text-2xl text-white">About Me</h2>
                <p className="text-white mt-1 text-lg">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Dignissimos porro dolorem vero nihil commodi quae ratione ex
                  accusamus, officia nam dolor aliquam consequatur inventore
                  fuga eaque excepturi sunt doloribus quam! Ducimus dolor illo
                  officiis architecto eum. Nesciunt facere fugit natus
                  cupiditate placeat corrupti officia blanditiis nisi libero
                </p>
              </div>
              <div className="mt-2">
                <h2 className="font-semibold text-2xl text-white">
                  Social Media
                </h2>
                <div className="flex mt-1">
                  <Link
                    href={'https://www.instagram.com/atokemen_/'}
                    target={'_blank'}
                    className={'flex items-center w-10 h-10 mx-2'}
                  >
                    <Image
                      src="/images/icon-instagram.svg"
                      width={20}
                      height={20}
                      className="w-10 h-10 bg-gray-200 rounded-full mr-1"
                      alt="Instagram"
                    />
                  </Link>
                  <Link
                    href={'https://www.linkedin.com/in/alfianvitoanggoro/'}
                    target={'_blank'}
                    className={'flex items-center w-10 h-10 mx-2'}
                  >
                    <Image
                      src="/images/icon-linkedin.svg"
                      width={20}
                      height={20}
                      className="w-10 h-10 bg-gray-200 rounded-full"
                      alt="Linkedin"
                    />
                  </Link>
                </div>
              </div>
              <div className="flex flex-col mt-2">
                <h2 className="font-semibold text-2xl text-white">
                  Portofolio Link
                </h2>
                <Link
                  href={'https://github.com/AlfianVitoAnggoro'}
                  target={'_blank'}
                  className={'flex items-center mt-1 text-blue-500'}
                >
                  https://github.com/AlfianVitoAnggoro
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-mainColor">
        <div className="w-[1024px] min-h-screen mx-auto p-10">
          <h2 className="text-black text-3xl font-bold">My Competition</h2>
          <div className="flex justify-end items-center gap-3">
            <label htmlFor="filter" className="text-lg">
              Tampilkan :{' '}
            </label>
            <select name="filter" id="filter" className="py-2 px-3 rounded">
              <option value="">See All</option>
              <option value="">Finish</option>
              <option value="">Progress</option>
              <option value="">Not Finish</option>
            </select>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-5">
            <div className="bg-white w-full h-96 border border-slate-300 hover:shadow-2xl rounded p-5">
              <Link href={'/competition/1'}>
                <div className="grid grid-cols-3 gap-3 h-40">
                  <div className="col-span-1 flex justify-center items-center">
                    <Image
                      src={'/images/register_software_developer.svg'}
                      width={50}
                      height={50}
                      alt="Software Developer"
                      priority
                      className="w-auto h-40 object-cover rounded"
                    />
                  </div>
                  <div className="col-span-2 p-3">
                    <div className="flex justify-between items-center">
                      <div className="flex justify-start items-center">
                        <Image
                          src={'/images/icon-ok.svg'}
                          width={25}
                          height={25}
                          alt="Ok"
                        />
                        <p className="text-xl font-semibold text-green-600 ml-1">
                          Finish
                        </p>
                      </div>
                      <div className="flex justify-start items-center">
                        <Image
                          src={'/images/icon-medal.png'}
                          width={25}
                          height={25}
                          alt="Medal"
                        />
                        <p className="text-xl font-semibold text-yellow-600 ml-1">
                          Juara 1
                        </p>
                      </div>
                    </div>
                    <h1 className="text-2xl font-bold my-2">
                      Competition Name
                    </h1>
                    <div className="flex justify-start items-center gap-3">
                      <div className="flex justify-start items-center gap-1">
                        <Image
                          src={'/images/icon-time.svg'}
                          width={20}
                          height={20}
                          alt="Time"
                        />
                        <p className="text-md font-semibold text-black">
                          7 Days
                        </p>
                      </div>
                      <div className="flex justify-start items-center gap-1">
                        <Image
                          src={'/images/icon-team.png'}
                          width={20}
                          height={20}
                          alt="Team"
                        />
                        <p className="text-md font-semibold text-black">
                          8 Team
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-full h-56 py-3">
                  <p className="text-ellipsis overflow-clip text-lg h-40">
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    Adipisci, quibusdam quo. Nobis, provident aperiam? Saepe
                    quod, facilis laboriosam maiores, perferendis ab eum magnam
                    atque necessitatibus id perspiciatis! Nobis eum debitis,
                    dignissimos dolor consequatur corrupti veniam quas
                    temporibus nulla neque, tenetur enim! Vel reiciendis quidem
                    ut qui libero, voluptates tempore! Ex iure impedit
                    voluptatibus vitae dolor quae odio cupiditate! Corrupti
                    optio veniam consequuntur eaque, itaque exercitationem
                    pariatur impedit in fugit soluta quidem est nisi? Porro,
                    cumque sit aliquam esse rem perferendis? Illo tempora,
                    delectus assumenda debitis rem, quasi dolore laudantium
                    rerum omnis voluptatem commodi ad repellendus, est
                    consequatur nesciunt! Repellendus, voluptates?
                  </p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
