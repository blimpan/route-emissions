import Link from "next/link"

export default function Home() {
  return (
    <main>
      <h1 className="text-2xl font-bold">Home Page</h1>
      <p>Hope you like my website!</p>
      <Link href="/aboutme">Link to About Me</Link>
      <p></p>
      <Link href="/route">Link to Route Page</Link>
    </main>
  )
}