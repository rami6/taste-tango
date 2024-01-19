'use client'

import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'

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
    <div>
      <div className="tagged-dropdown relative">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyChange}
          placeholder="i.e. soy sauce"
          className="h-10 p-2 w-full mb-4"
        />
        <div className="tag-container flex gap-2 flex-wrap">
          {addedItems.map((tag, index) => (
            <div key={index} className="tag my-2 px-1 h-6 leading-6">
              <span>{tag}</span>
              <span
                className="ml-1.5 delete-icon"
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
