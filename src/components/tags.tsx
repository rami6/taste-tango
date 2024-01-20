import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Caveat } from 'next/font/google'

const caveat = Caveat({ subsets: ['latin'] })

interface TagsProps {
  items: string[]
  removeItem: (item: string) => void
}

export default function Tags({ items, removeItem }: TagsProps) {
  const handleXClick = (tag: string) => {
    removeItem(tag)
  }

  const classes = `tag-container flex gap-2 flex-wrap ${caveat.className}`

  return (
    <div className={classes}>
      {items.map((tag, index) => (
        <div
          key={index}
          className="tag my-1 px-1 h-7 leading-7 text-xl font-bold"
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
  )
}
