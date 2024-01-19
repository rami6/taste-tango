'use client'

import { useState, useRef, useEffect } from 'react'

interface TaggedDropdownProps {
  options: string[]
}

export default function TaggedDropdown({ options }: TaggedDropdownProps) {
  const [inputValue, setInputValue] = useState('')
  const [selectedOptions, setSelectedOptions] = useState([] as string[])
  const [dropdownVisible, setDropdownVisible] = useState(false)
  const dropdownListRef = useRef<null | HTMLUListElement>(null)
  const textInputRef = useRef<null | HTMLInputElement>(null)

  // Close the dropdown when clicking outside
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      const dropdownList = dropdownListRef.current
      const textInput = textInputRef.current
      if (
        dropdownList &&
        !dropdownList.contains(event.target as Node) &&
        textInput &&
        !textInput.contains(event.target as Node)
      ) {
        setDropdownVisible(false)
      }
    }

    document.addEventListener('click', handleOutsideClick)
    return () => document.removeEventListener('click', handleOutsideClick)
  }, [])

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value)
    setDropdownVisible(true)
  }

  const handleTagClick = (tag: string) => {
    setSelectedOptions((prevTags) => prevTags.filter((t) => t !== tag))
  }

  const handleDropdownItemClick = (value: string) => {
    setSelectedOptions((prevTags) => [...prevTags, value])
    setInputValue('')
    setDropdownVisible(false)
  }

  return (
    <div>
      <div className="tagged-dropdown relative">
        <input
          ref={textInputRef}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Select options"
          onClick={() => setDropdownVisible(true)}
          className="h-10 p-2 w-full"
        />
        <div className="tag-container">
          {selectedOptions.map((tag, index) => (
            <div
              key={index}
              className="tag"
              onClick={() => handleTagClick(tag)}
            >
              {tag}
            </div>
          ))}
        </div>
        {dropdownVisible && (
          <ul className="dropdown-list absolute top-10" ref={dropdownListRef}>
            <li onClick={() => handleDropdownItemClick('option1')}>Option 1</li>
            <li onClick={() => handleDropdownItemClick('option2')}>Option 2</li>
            <li onClick={() => handleDropdownItemClick('option3')}>Option 3</li>
          </ul>
        )}
      </div>
    </div>
  )
}
