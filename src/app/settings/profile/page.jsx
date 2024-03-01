import Image from 'next/image';

export default function ProfileSettingsPage() {
  return (
    <div className="col-span-9 laptop:col-span-6 bg-white rounded h-max flex flex-col gap-3 p-3">
      <div className="border-b-2 border-neutral-500 py-3">
        <h2 className="text-3xl font-semibold">Profile</h2>
      </div>
      <form action="" className="space-y-3">
        <div className="space-y-2">
          <label className="font-medium">Image</label>
          <Image
            src={'/images/test_avatar.png'}
            width={50}
            height={50}
            alt="join-code"
            priority
            className="rounded object-cover w-28 h-28"
          />
          <input
            type="file"
            name="image"
            id="image"
            className="bg-gray-50 border border-gray-300 text-black sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            placeholder="Your Image"
          />
        </div>
        <div>
          <label className="font-medium">Name</label>
          <input
            type="text"
            name="name"
            id="name"
            className="bg-gray-50 border border-gray-300 text-black sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            value={'Alfian Vito Anggoro'}
          />
        </div>
        <div>
          <label className="font-medium">Email</label>
          <input
            type="text"
            name="email"
            id="email"
            className="bg-gray-50 border border-gray-300 text-black sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            value={'5Nt5L@example.com'}
          />
        </div>
        <div>
          <label className="font-medium">Gender</label>
          <select
            name="gender"
            id="gender"
            className="bg-gray-50 border border-gray-300 text-black sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <div>
          <label className="font-medium">Address</label>
          <textarea
            name="address"
            id="address"
            cols="10"
            rows="10"
            className="bg-gray-50 border border-gray-300 text-black sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          >
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore,
            autem architecto. Delectus unde facere tempora consequatur
            reiciendis illum dignissimos facilis.
          </textarea>
        </div>

        <div>
          <label className="font-medium">Description</label>
          <textarea
            name="description"
            id="description"
            cols="10"
            rows="10"
            className="bg-gray-50 border border-gray-300 text-black sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          >
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Facere
            similique, quia veniam nam assumenda adipisci quae quidem
            repellendus deserunt, commodi reiciendis modi dignissimos
            perspiciatis molestiae natus pariatur autem, eligendi optio
            perferendis magni quos voluptatibus vitae dolor? Odit earum animi
            asperiores provident qui architecto, aperiam ipsum dignissimos cum,
            voluptas nostrum rerum, ab cumque odio in ipsa. Possimus ullam quos
            odit quo accusantium aspernatur deserunt non. Recusandae delectus
            aut doloribus consequuntur, officia ea inventore pariatur eum. Sint
            cum optio sequi alias ea blanditiis illum consectetur fugiat minus
            molestias hic nulla, exercitationem quisquam, quam dolore totam amet
            tempore consequatur numquam? Inventore, nam delectus.
          </textarea>
        </div>
        <div>
          <label className="font-medium">Skill Yang Diminati</label>
          <select
            multiple
            name="skill"
            id="skill"
            className="bg-gray-50 border border-gray-300 text-black sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          >
            <option value="web">Web Developer</option>
            <option value="android">Android Developer</option>
          </select>
        </div>
        <div>
          <label className="font-medium">Status Collaboration</label>
          <select
            name="status_collaboration"
            id="status_collaboration"
            className="bg-gray-50 border border-gray-300 text-black sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          >
            <option value="open">Open</option>
            <option value="close">Close</option>
          </select>
        </div>
        <div>
          <label className="font-medium">Portofolio Link</label>
          <input
            type="text"
            name="portofolio_link"
            id="portofolio_link"
            className="bg-gray-50 border border-gray-300 text-black sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            placeholder="Portofolio Link"
            value={'https://github.com/alfiananggoro'}
          />
        </div>
        <div>
          <label className="font-medium">Instagram Link</label>
          <input
            type="text"
            name="instagram_link"
            id="instagram_link"
            className="bg-gray-50 border border-gray-300 text-black sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            placeholder="Instagram Link"
            value={'https://instagram.com/atokemen_'}
          />
        </div>
        <div>
          <label className="font-medium">Linkedin Link</label>
          <input
            type="text"
            name="linkedin_link"
            id="linkedin_link"
            className="bg-gray-50 border border-gray-300 text-black sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            placeholder="Linkedin Link"
            value={'https://www.linkedin.com/in/alfianvitoanggoro/'}
          />
        </div>

        <button className="w-full bg-blue-500 text-white py-2 rounded">
          Submit
        </button>
      </form>
    </div>
  );
}
