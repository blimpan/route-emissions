import Link from "next/link"

export default function AboutMe() {
  return (
    <>
        <h1 className="text-2xl font-bold">About Me</h1>
        <p>My name is Linus!</p>
        <Link href="/">Link to Home Page</Link>
    </>
  )
}
