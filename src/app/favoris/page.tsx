'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

function getFavoris(): string[] {
  try {
    return JSON.parse(localStorage.getItem('favoris') ?? '[]')
  } catch {
    return []
  }
}

export default function FavorisPage() {
  const [favoris, setFavoris] = useState<string[]>([])
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setFavoris(getFavoris())
    setMounted(true)
  }, [])

  function remove(nom: string) {
    const next = favoris.filter(f => f !== nom)
    setFavoris(next)
    localStorage.setItem('favoris', JSON.stringify(next))
  }

  function clear() {
    setFavoris([])
    localStorage.removeItem('favoris')
  }

  if (!mounted) return null

  return (
    <main className="flex min-h-screen flex-col items-center p-6 bg-gradient-to-b from-pink-50 to-purple-50">
      <div className="w-full max-w-sm">
        {/* Header */}
        <div className="flex items-center justify-between mb-8 mt-2">
          <Link href="/" className="text-gray-500 hover:text-gray-700 transition-colors">
            ← Retour
          </Link>
          <h1 className="text-xl font-bold text-gray-800">Mes favoris ❤️</h1>
          {favoris.length > 0 ? (
            <button onClick={clear} className="text-xs text-red-400 hover:text-red-600">
              Tout effacer
            </button>
          ) : (
            <span className="w-16" />
          )}
        </div>

        {/* Empty state */}
        {favoris.length === 0 && (
          <div className="flex flex-col items-center gap-6 text-center mt-20">
            <div className="text-6xl">💭</div>
            <p className="text-gray-500 text-lg">Pas encore de favoris.</p>
            <p className="text-gray-400 text-sm">Commencez à voter pour retrouver vos prénoms préférés ici.</p>
            <Link
              href="/choisir"
              className="bg-purple-400 hover:bg-purple-500 text-white font-semibold py-3 px-8 rounded-2xl transition-colors"
            >
              Voter des prénoms
            </Link>
          </div>
        )}

        {/* Favorites list */}
        {favoris.length > 0 && (
          <div className="flex flex-col gap-3">
            <p className="text-sm text-gray-400 mb-1">{favoris.length} prénom{favoris.length > 1 ? 's' : ''} aimé{favoris.length > 1 ? 's' : ''}</p>
            {favoris.map(nom => (
              <div
                key={nom}
                className="flex items-center justify-between bg-white rounded-2xl shadow-sm px-5 py-4 border border-gray-100"
              >
                <span className="text-lg font-semibold text-gray-800">{nom}</span>
                <button
                  onClick={() => remove(nom)}
                  className="text-gray-300 hover:text-red-400 transition-colors text-xl"
                  aria-label={`Retirer ${nom}`}
                >
                  ✕
                </button>
              </div>
            ))}

            <div className="flex gap-3 mt-4">
              <Link
                href="/choisir"
                className="flex-1 text-center bg-purple-400 hover:bg-purple-500 text-white font-semibold py-3 px-4 rounded-2xl transition-colors"
              >
                Continuer
              </Link>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
