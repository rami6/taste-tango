import TaggedInput from '@/components/tagged-input'
import { Dancing_Script, Alata } from 'next/font/google'

const dancingScript = Dancing_Script({ subsets: ['latin'] })
const alata = Alata({ weight: '400', preload: false })

export default function Home() {
  const logoClasses = `logo ${dancingScript.className} mt-8 text-5xl text-center`
  const introClasses = `intro ${alata.className} mt-20 text-2xl text-center mx-auto`

  return (
    <main>
      <div className="container mx-auto max-w-lg p-2">
        <h1 className={logoClasses}>Taste Tango</h1>
        <div className={introClasses}>What do you have?</div>
        <div className="mt-16">
          <TaggedInput />
        </div>
      </div>
    </main>
  )
}
