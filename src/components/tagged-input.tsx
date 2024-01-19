'use client'

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

  const handleTagClick = (tag: string) => {
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
          placeholder="Type here and hit Enter"
          className="h-10 p-2 w-full mb-4"
        />
        <div className="tag-container flex gap-2 flex-wrap">
          {addedItems.map((tag, index) => (
            <div
              key={index}
              className="tag my-2 px-1"
              onClick={() => handleTagClick(tag)}
            >
              {tag}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
