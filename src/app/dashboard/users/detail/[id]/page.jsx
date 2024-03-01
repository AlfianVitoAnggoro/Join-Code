import Image from 'next/image';

export default function DetailUserPage(params) {
  return (
    <div className="flex-1 bg-mainColor px-3">
      <div className="pt-3 mb-3">
        <h2 className="text-2xl font-medium">Detail User {params.id}</h2>
      </div>
      <div className="p-3 bg-white space-y-3">
        <div className="grid grid-cols-5 gap-2">
          <div className="col-span-1">
            <Image
              src={'/images/test_avatar.png'}
              width={50}
              height={50}
              alt="join-code"
              priority
              className="rounded object-cover w-36 h-36"
            />
          </div>
          <div className="col-span-4 flex flex-col gap-y-1">
            <div className="flex flex-col">
              <h3 className="text-lg font-medium">Nama :</h3>
              <p className="text-base font-normal">Alfian Vito Anggoro</p>
            </div>
            <div className="flex flex-col">
              <h3 className="text-lg font-medium">Email :</h3>
              <p className="text-base font-normal">
                alfianvitoanggoro@gmail.com
              </p>
            </div>
            <div className="flex flex-col">
              <h3 className="text-lg font-medium">Role :</h3>
              <p className="text-base font-normal">Software Developer</p>
            </div>
            <div className="flex flex-col">
              <h3 className="text-lg font-medium">Gender :</h3>
              <p className="text-base font-normal">Male</p>
            </div>
            <div className="flex flex-col">
              <h3 className="text-lg font-medium">Address :</h3>
              <p className="text-base font-normal">Kabupaten Bogor</p>
            </div>
            <div className="flex flex-col">
              <h3 className="text-lg font-medium">Description :</h3>
              <p className="text-base font-normal">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sequi
                perspiciatis distinctio maiores quia. Quae sed ipsum, cupiditate
                unde voluptas aspernatur corporis quia rerum aut non modi omnis
                minima fugiat, esse quasi cum quisquam. Excepturi perferendis
                voluptate autem dolorum cum officiis temporibus. Laboriosam cum
                id dolore aspernatur? Odio consequatur officiis tenetur velit
                perspiciatis corporis enim molestiae, obcaecati ex, sint ipsam
                magnam, tempore ipsum quia aliquam dolorem aspernatur natus
                animi. Assumenda nemo veniam libero pariatur soluta consequuntur
                ducimus, nulla illo autem nesciunt, perspiciatis corporis, rerum
                eaque error ex vel sint inventore cumque dolores officiis.
                Officiis reiciendis natus, numquam tempore corrupti non
                voluptatibus!
              </p>
            </div>
            <div className="flex flex-col">
              <h3 className="text-lg font-medium">Skill Yang Diminati :</h3>
              <p className="text-base font-normal">Web Developer</p>
            </div>
            <div className="flex flex-col">
              <h3 className="text-lg font-medium">Point :</h3>
              <p className="text-base font-normal">1000 XP</p>
            </div>
            <div className="flex flex-col">
              <h3 className="text-lg font-medium">Badge :</h3>
              <p className="text-base text-white font-normal bg-neutral-400 px-3 py-2 w-max rounded">
                Newbie
              </p>
            </div>
            <div className="flex flex-col">
              <h3 className="text-lg font-medium">Status Collaboration :</h3>
              <p className="text-base font-normal text-white bg-neutral-500 px-3 py-2 w-max rounded">
                #OPENTOCOLLABORATION
              </p>
            </div>
            <div className="flex flex-col">
              <h3 className="text-lg font-medium">Portofolio Link :</h3>
              <p className="text-base font-normal">
                https://github.com/alfianvitoanggoro
              </p>
            </div>
            <div className="flex flex-col">
              <h3 className="text-lg font-medium">Instagram Link :</h3>
              <p className="text-base font-normal">
                https://github.com/atokemen
              </p>
            </div>
            <div className="flex flex-col">
              <h3 className="text-lg font-medium">Linkedin Link :</h3>
              <p className="text-base font-normal">
                https://github.com/atokemen
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
