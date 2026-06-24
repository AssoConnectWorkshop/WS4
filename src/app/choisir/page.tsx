'use client'

import { Suspense, useEffect, useState, useCallback } from 'react'
import { useSearchParams } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'

type Prenom = { id: number; nom: string; genre: string | null }

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function getFavoris(): string[] {
  try {
    return JSON.parse(localStorage.getItem('favoris') ?? '[]')
  } catch {
    return []
  }
}

function saveFavori(nom: string) {
  const favs = getFavoris()
  if (!favs.includes(nom)) {
    localStorage.setItem('favoris', JSON.stringify([...favs, nom]))
  }
}

function ChoisirInner() {
  const searchParams = useSearchParams()
  const genre = searchParams.get('genre')

  const [prenoms, setPrenoms] = useState<Prenom[]>([])
  const [index, setIndex] = useState(0)
  const [liked, setLiked] = useState(false)
  const [skipped, setSkipped] = useState(false)
  const [loading, setLoading] = useState(true)
  const [animate, setAnimate] = useState<'like' | 'skip' | null>(null)

  useEffect(() => {
    const supabase = createClient()
    let query = supabase.from('prenoms').select('id, nom, genre').order('nom')
    if (genre === 'M' || genre === 'F') {
      query = query.or(`genre.eq.${genre},genre.eq.M/F`)
    }
    query.then(({ data }: { data: Prenom[] | null }) => {
      setPrenoms(shuffle(data ?? []))
      setLoading(false)
    })
  }, [genre])

  const current = prenoms[index]
  const done = index >= prenoms.length && !loading

  const handleLike = useCallback(() => {
    if (!current || animate) return
    saveFavori(current.nom)
    setAnimate('like')
    setLiked(true)
    setTimeout(() => {
      setAnimate(null)
      setLiked(false)
      setIndex((i: number) => i + 1)
    }, 400)
  }, [current, animate])

  const handleSkip = useCallback(() => {
    if (!current || animate) return
    setAnimate('skip')
    setSkipped(true)
    setTimeout(() => {
      setAnimate(null)
      setSkipped(false)
      setIndex((i: number) => i + 1)
    }, 400)
  }, [current, animate])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'l') handleLike()
      if (e.key === 'ArrowLeft' || e.key === 's') handleSkip()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [handleLike, handleSkip])

  const genreLabel = genre === 'F' ? 'filles' : genre === 'M' ? 'garçons' : 'tous'
  const bgGradient = genre === 'F'
    ? 'from-pink-50 to-rose-50'
    : genre === 'M'
    ? 'from-blue-50 to-sky-50'
    : 'from-purple-50 to-indigo-50'

  const cardColor = genre === 'F'
    ? 'from-pink-400 to-rose-400'
    : genre === 'M'
    ? 'from-blue-400 to-sky-400'
    : 'from-purple-400 to-indigo-400'

  return (
    <main className={`flex min-h-screen flex-col items-center justify-between p-6 bg-gradient-to-b ${bgGradient}`}>
      <div className="w-full max-w-sm flex items-center justify-between">
        <Link href="/" className="text-gray-500 hover:text-gray-700 transition-colors">
          ← Retour
        </Link>
        <span className="text-sm font-medium text-gray-500 capitalize">{genreLabel}</span>
        <Link href="/favoris" className="text-gray-500 hover:text-gray-700 transition-colors">
          ❤️ Favoris
        </Link>
      </div>

      <div className="flex flex-col items-center gap-6 flex-1 justify-center w-full max-w-sm">
        {loading && (
          <div className="text-gray-400 text-lg">Chargement…</div>
        )}

        {done && (
          <div className="flex flex-col items-center gap-6 text-center">
            <div className="text-6xl">🎉</div>
            <h2 className="text-2xl font-bold text-gray-800">C&apos;est tout !</h2>
            <p className="text-gray-500">Vous avez vu tous les prénoms.</p>
            <Link
              href="/favoris"
              className="bg-pink-400 hover:bg-pink-500 text-white font-semibold py-3 px-8 rounded-2xl transition-colors"
            >
              Voir mes favoris ❤️
            </Link>
            <button
              onClick={() => { setIndex(0); setPrenoms((p: Prenom[]) => shuffle(p)) }}
              className="text-gray-400 hover:text-gray-600 underline text-sm"
            >
              Recommencer
            </button>
          </div>
        )}

        {!loading && !done && current && (
          <>
            <div className="w-full bg-gray-200 rounded-full h-1.5">
              <div
                className="h-1.5 rounded-full bg-gradient-to-r from-pink-400 to-purple-400 transition-all"
                style={{ width: `${(index / prenoms.length) * 100}%` }}
              />
            </div>
            <p className="text-xs text-gray-400">{index} / {prenoms.length}</p>

            <div
              className={`
                relative w-64 h-80 rounded-3xl shadow-xl flex flex-col items-center justify-center
                bg-gradient-to-br ${cardColor} text-white
                transition-all duration-300
                ${animate === 'like' ? 'translate-x-16 rotate-6 opacity-0' : ''}
                ${animate === 'skip' ? '-translate-x-16 -rotate-6 opacity-0' : ''}
              `}
            >
              {liked && (
                <div className="absolute top-4 right-4 text-4xl animate-bounce">❤️</div>
              )}
              {skipped && (
                <div className="absolute top-4 left-4 text-4xl animate-bounce">👋</div>
              )}
              <span className="text-5xl font-bold tracking-tight">{current.nom}</span>
              {current.genre && (
                <span className="mt-3 text-white/70 text-sm">
                  {current.genre === 'M' ? '👦 Garçon' : current.genre === 'F' ? '👧 Fille' : '🌈 Mixte'}
                </span>
              )}
            </div>

            <div className="flex gap-8 items-center">
              <button
                onClick={handleSkip}
                className="w-16 h-16 rounded-full bg-white shadow-lg flex items-center justify-center text-2xl hover:scale-110 active:scale-95 transition-transform border border-gray-100"
                aria-label="Passer"
              >
                ✗
              </button>
              <button
                onClick={handleLike}
                className="w-20 h-20 rounded-full bg-white shadow-lg flex items-center justify-center text-3xl hover:scale-110 active:scale-95 transition-transform border border-gray-100"
                aria-label="Aimer"
              >
                ❤️
              </button>
            </div>

            <p className="text-xs text-gray-400">← Skip · Like →</p>
          </>
        )}
      </div>

      <div className="h-6" />
    </main>
  )
}

export default function ChoisirPage() {
  return (
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center text-gray-400">Chargement…</div>}>
      <ChoisirInner />
    </Suspense>
  )
}
