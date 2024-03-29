'use client'

import Tags from '@/components/tags'
import { Dancing_Script, Alata, Caveat } from 'next/font/google'
import { useEffect, useState } from 'react'
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'

config.autoAddCss = false

const dancingScript = Dancing_Script({ subsets: ['latin'] })
const alata = Alata({ weight: '400', preload: false })
const caveat = Caveat({ subsets: ['latin'] })

export default function Home() {
  const logoClasses = `logo ${dancingScript.className} mt-8 text-5xl text-center`
  const introClasses = `intro ${alata.className} mt-20 text-2xl text-center mx-auto`
  const inputClasses = `text-input ${caveat.className} h-10 p-3 w-full mb-4 text-2xl`
  const resultClasses = `result ${dancingScript.className} mt-8 rounded-lg p-3 text-center text-4xl h-80 flex justify-center items-center`

  const SEASONINGS = 'seasonings'

  const [inputErrorMessage, setInputErrorMessage] = useState('')
  const [inputValue, setInputValue] = useState('')
  const [seasonings, setSeasonings] = useState([] as string[])
  const [results, setResults] = useState([] as string[])

  useEffect(() => {
    const localStorageSeasonings = localStorage.getItem(SEASONINGS)

    if (localStorageSeasonings) {
      setSeasonings(localStorageSeasonings.split(','))
    }
  }, [])

  useEffect(() => {
    if (!seasonings) {
      return
    }
    localStorage.setItem(SEASONINGS, seasonings.toString())
  }, [seasonings])

  const removeSeasoning = async (itemToRemove: string) => {
    setSeasonings((prev) => prev.filter((val) => val != itemToRemove))
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputErrorMessage('')
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

    if (newItem.includes(',')) {
      setInputErrorMessage('The character "," is not allowed')
      return
    }

    const capitalized = `${newItem.charAt(0).toUpperCase()}${newItem.slice(1)}`

    if (seasonings.includes(capitalized)) {
      setInputErrorMessage('The item already exists')
      return
    }

    setSeasonings((prev) => [...prev, capitalized])
    setInputValue('')
  }

  const generateResult = () => {
    const numOfItems = Math.floor(Math.random() * 3) + 2
    const shuffled = seasonings.toSorted(() => 0.5 - Math.random())
    setResults(shuffled.slice(0, numOfItems))
  }

  const handleButtonClick = () => {
    generateResult()
  }

  return (
    <main>
      <div className="container mx-auto max-w-lg p-2">
        <h1 className={logoClasses}>Taste Tango</h1>
        <div className={introClasses}>What do you have?</div>
        <div className="mt-14">
          <div className="input-error relative z-10 h-6">
            {inputErrorMessage}
          </div>
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
        {results.length ? (
          <div className={resultClasses}>
            <div>
              {results.map((result, i) => (
                <div className="my-6" key={i}>
                  {result}
                </div>
              ))}
            </div>
          </div>
        ) : (
          ''
        )}
        <div className="group mb-4">
          <button
            className="mingle-button mt-8 mx-auto block rounded-md p-2 text-xl w-4/5"
            onClick={handleButtonClick}
            disabled={seasonings.length < 3}
          >
            {results.length ? 'Mingle again!' : "Let's mingle!"}
          </button>
          {seasonings.length < 3 ? (
            <div className="tooltip hidden group-hover:block text-center mt-1">
              *Add 3 or more seasonings to mingle
            </div>
          ) : (
            ''
          )}
        </div>
      </div>
    </main>
  )
}
