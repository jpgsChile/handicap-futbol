import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata = {
  title: 'FuturoFútbol - Handicap Fútbol MVP',
  description: 'MVP para gestión de ligas de fútbol con handicap sobre Stacks blockchain',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body>
        <Navbar />
        <main style={{ minHeight: "calc(100vh - 80px)" }}>
          {children}
        </main>
      </body>
    </html>
  )
}