'use client'

import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'
import { Caveat } from 'next/font/google'

const caveat = Caveat({ subsets: ['latin'] })

export default function TaggedInput() {
  const [inputValue, setInputValue] = useState('')
  const [addedItems, setAddedItems] = useState([] as string[])

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value)
  }

  const handleKeyChange = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== 'Enter') {
      return
    }

    setAddedItems((prev) => [...prev, inputValue])
    setInputValue('')
  }

  const handleXClick = (tag: string) => {
    setAddedItems((prevTags) => prevTags.filter((t) => t !== tag))
  }

  return (
    <div className={caveat.className}>
      <div className="tagged-dropdown relative">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyChange}
          placeholder="i.e. soy sauce"
          className="h-10 p-3 w-full mb-4 text-2xl"
        />
        <div className="tag-container flex gap-2 flex-wrap">
          {addedItems.map((tag, index) => (
            <div
              key={index}
              className="tag my-2 px-1 h-7 leading-7 text-xl font-bold"
            >
              <span>{tag}</span>
              <span
                className="ml-1.5 delete-icon align-middle"
                onClick={() => handleXClick(tag)}
              >
                <FontAwesomeIcon icon={faXmark} />
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
