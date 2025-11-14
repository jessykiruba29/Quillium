import './global.css'

export const metadata = {
  title: 'Quillium - Quiz.Learn.Conquer',
  description: 'Transform your PDFs into interactive quizzes and flashcards',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}