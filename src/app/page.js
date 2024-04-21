import { Permanent_Marker } from 'next/font/google';

const permanent_Marker = Permanent_Marker({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-permanent-marker',
  display: 'swap',
  adjustFontFallback: false,
});

export const metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
  ),
  title: 'Home - Join Code',
  description:
    'The Application make a collaboration and competition for software developer',
  authors: [
    { name: 'Alfian Vito Anggoro', url: `${process.env.NEXT_PUBLIC_API_URL}` },
  ],
  icons: {
    icon: '/icon.png',
  },
  openGraph: {
    title: 'Home',
    description: 'Home - Join Code',
    url: `${process.env.NEXT_PUBLIC_API_URL}`,
    siteName: 'Home',
  },
};

export default function Home() {
  return (
    <div className="relative min-h-screen laptop:mt-20">
      <div className="max-w-[1024px] min-h-screen mx-auto flex flex-col items-center justify-center">
        <h1
          className={`${permanent_Marker.className} text-2xl tablet:text-8xl text-center`}
        >
          JOIN CODE
        </h1>
        <p className="text-base tablet:text-xl text-center text-wrap mt-4">
          Up Your Skill With{' '}
          <span className="font-bold"> Collaboration and Competition </span>
          For Make Amazing Inovation Together
        </p>
      </div>
      <div className="bg-black min-h-screen flex justify-center items-center">
        <div className="max-w-[1024px] p-10 mx-auto flex flex-col justify-center items-center">
          <h2 className="font-semibold mb-3 text-2xl tablet:text-5xl text-center text-white">
            Collaboration
          </h2>
          <p className="text-center text-base tablet:text-xl text-white">
            Collaboration / Kolaborasi adalah proses bekerja sama dengan orang
            lain atau kelompok untuk mencapai tujuan bersama atau menyelesaikan
            suatu tugas. Ini melibatkan individu atau entitas yang menggabungkan
            upaya, keahlian, dan sumber daya mereka untuk memecahkan masalah,
            menghasilkan ide, membuat keputusan, atau menghasilkan hasil yang
            bermanfaat bagi semua pihak yang terlibat. Kolaborasi sering
            membutuhkan komunikasi yang efektif, saling menghormati, tanggung
            jawab bersama, dan koordinasi di antara peserta. Ini bisa terjadi
            dalam berbagai setting, seperti tempat kerja, lembaga pendidikan,
            proyek penelitian, inisiatif masyarakat, dan usaha kreatif.
          </p>
        </div>
      </div>
      <div className="bg-white min-h-screen flex justify-center items-center">
        <div className="max-w-[1024px] p-10 mx-auto flex flex-col justify-center items-center">
          <h2 className="font-semibold mb-3 text-2xl tablet:text-5xl text-center text-black">
            Competition
          </h2>
          <p className="text-center text-base tablet:text-xl text-black">
            Competition / Kompetisi adalah situasi di mana dua atau lebih
            individu, kelompok, atau entitas bersaing untuk mencapai tujuan yang
            sama atau mendapatkan keunggulan atas yang lain dalam hal tertentu.
            Ini bisa terjadi dalam berbagai konteks, termasuk olahraga, bisnis,
            pendidikan, dan lainnya. Dalam konteks bisnis, kompetisi mengacu
            pada persaingan antara perusahaan untuk memenangkan pangsa pasar,
            pelanggan, atau sumber daya lainnya.
          </p>
        </div>
      </div>
      <div className="bg-neutral-200 min-h-screen flex justify-center items-center">
        <div className="max-w-[1024px] p-10 mx-auto flex flex-col justify-center items-center">
          <h2 className="font-semibold mb-3 text-2xl tablet:text-5xl text-center text-black">
            Leaderboard
          </h2>
          <p className="text-center text-base tablet:text-xl text-black">
            Leaderboard / Papan peringkat adalah daftar atau tabel yang
            menampilkan peringkat atau posisi relatif dari peserta dalam suatu
            kompetisi, permainan, atau aktivitas lainnya berdasarkan kriteria
            tertentu. Biasanya, leaderboard menampilkan informasi seperti nama
            peserta, skor, atau pencapaian lainnya, dan diurutkan dari yang
            terbaik hingga yang terendah. Ini digunakan untuk memotivasi
            peserta, membangkitkan persaingan sehat, dan memberikan pengakuan
            atas pencapaian tertinggi.
          </p>
        </div>
      </div>
    </div>
  );
}
