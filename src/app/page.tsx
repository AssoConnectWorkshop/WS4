import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-10 p-8 bg-gradient-to-b from-pink-50 to-blue-50">
      <div className="flex flex-col items-center gap-4 text-center">
        <Image src="/mascot.png" alt="Mascot" width={140} height={140} priority />
        <h1 className="text-4xl font-bold text-gray-800">Choisissez votre prénom !</h1>
        <p className="text-gray-500 max-w-sm">
          Likez ou passez des prénoms, retrouvez vos favoris et trouvez le parfait prénom pour votre enfant.
        </p>
      </div>

      <div className="flex flex-col gap-4 w-full max-w-xs">
        <Link
          href="/choisir?genre=F"
          className="flex items-center justify-center gap-3 bg-pink-400 hover:bg-pink-500 text-white font-semibold py-4 px-6 rounded-2xl text-lg transition-colors shadow-md"
        >
          <span className="text-2xl">👧</span> Prénoms de filles
        </Link>
        <Link
          href="/choisir?genre=M"
          className="flex items-center justify-center gap-3 bg-blue-400 hover:bg-blue-500 text-white font-semibold py-4 px-6 rounded-2xl text-lg transition-colors shadow-md"
        >
          <span className="text-2xl">👦</span> Prénoms de garçons
        </Link>
        <Link
          href="/choisir"
          className="flex items-center justify-center gap-3 bg-purple-400 hover:bg-purple-500 text-white font-semibold py-4 px-6 rounded-2xl text-lg transition-colors shadow-md"
        >
          <span className="text-2xl">🌈</span> Tous les prénoms
        </Link>
        <Link
          href="/favoris"
          className="flex items-center justify-center gap-3 bg-white hover:bg-gray-50 text-gray-700 font-semibold py-4 px-6 rounded-2xl text-lg transition-colors shadow-md border border-gray-200"
        >
          <span className="text-2xl">❤️</span> Mes favoris
        </Link>
      </div>
    </main>
  );
}
