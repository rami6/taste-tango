import { Dancing_Script } from 'next/font/google'

const dancingScript = Dancing_Script({ subsets: ['latin'] })

export default function Home() {
  const logoClassName = `logo ${dancingScript.className} mt-4 text-5xl text-center`

  return (
    <main>
      <div className="container mx-auto max-w-lg p-2">
        <h1 className={logoClassName}>Taste Tango</h1>
      </div>
    </main>
  )
}
