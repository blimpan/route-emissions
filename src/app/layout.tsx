import "./styles.css"

export const metadata = {
  title: 'Route Emissions',
  description: 'A tool for estimating your carbon footprint for a route.',
}

export default function RootLayout({
  children, // Destructure the children prop
}: Readonly<{
  children: React.ReactNode // Specify the type of the children prop
}>) {
  return (
    <html lang="en">
      <body className="min-w-[320px] min-h-[650px]">
        {children}
      </body>
    </html>
  )
}