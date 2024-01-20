'use client'

import Tags from '@/components/tags'
import { Dancing_Script, Alata, Caveat } from 'next/font/google'
import { useState } from 'react'

const dancingScript = Dancing_Script({ subsets: ['latin'] })
const alata = Alata({ weight: '400', preload: false })
const caveat = Caveat({ subsets: ['latin'] })

export default function Home() {
  const logoClasses = `logo ${dancingScript.className} mt-8 text-5xl text-center`
  const introClasses = `intro ${alata.className} mt-20 text-2xl text-center mx-auto`
  const inputClasses = `${caveat.className} h-10 p-3 w-full mb-4 text-2xl`

  const [inputValue, setInputValue] = useState('')
  const [seasonings, setSeasonings] = useState([
    'Lemon',
    'Soy sauce',
    'Tomato paste',
    'Vinegar',
  ] as string[]) // temp initial value

  const removeSeasoning = async (itemToRemove: string) => {
    setSeasonings((prev) => prev.filter((val) => val != itemToRemove))
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value)
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== 'Enter') {
      return
    }

    const newItem = inputValue.trim()

    if (!newItem) {
      return
    }

    const capitalized = `${newItem.charAt(0).toUpperCase()}${newItem.slice(1)}`

    setSeasonings((prev) => [...prev, capitalized])
    setInputValue('')
  }

  return (
    <main>
      <div className="container mx-auto max-w-lg p-2">
        <h1 className={logoClasses}>Taste Tango</h1>
        <div className={introClasses}>What do you have?</div>
        <div className="mt-16">
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder="i.e. soy sauce"
            className={inputClasses}
          />
          <Tags items={seasonings} removeItem={removeSeasoning} />
        </div>
      </div>
    </main>
  )
}
