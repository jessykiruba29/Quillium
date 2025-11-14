'use client'
import { useState, useEffect } from 'react'

interface Flashcard {
  question: string
  answer: string
}

interface FlashcardsProps {
  language: string
  questionCount: number
  pdfText: string
}

export default function Flashcards({ language, questionCount, pdfText }: FlashcardsProps) {
  const [flashcards, setFlashcards] = useState<Flashcard[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showAnswer, setShowAnswer] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)

  useEffect(() => {
    if (pdfText) {
      generateFlashcards()
    }
  }, [pdfText, language, questionCount])

  const generateFlashcards = async () => {
    setIsGenerating(true)
    // Mock flashcards
    const mockFlashcards: Flashcard[] = Array.from({ length: questionCount }, (_, i) => ({
      question: `Flashcard question ${i + 1} in ${language}?`,
      answer: `Flashcard answer ${i + 1} in ${language}`
    }))
    
    setTimeout(() => {
      setFlashcards(mockFlashcards)
      setIsGenerating(false)
    }, 1500)
  }

  const nextCard = () => {
    setCurrentIndex((prev) => (prev + 1) % flashcards.length)
    setShowAnswer(false)
  }

  const prevCard = () => {
    setCurrentIndex((prev) => (prev - 1 + flashcards.length) % flashcards.length)
    setShowAnswer(false)
  }

  if (isGenerating) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <div className="loading-text">Generating flashcards...</div>
      </div>
    )
  }

  return (
    <div className="flashcards-section">
      <h2 className="section-title">📚 Flashcard Mode</h2>
      
      {flashcards.length > 0 ? (
        <div className="flashcard-layout">
          <div className="flashcard">
            <div className="flashcard-content">
              {showAnswer ? flashcards[currentIndex].answer : flashcards[currentIndex].question}
            </div>
          </div>
          
          <div className="flashcard-controls">
            <button
              onClick={prevCard}
              className="control-btn nav-btn-flashcard"
            >
              ⬅️ Previous
            </button>
            
            <button
              onClick={() => setShowAnswer(!showAnswer)}
              className="control-btn flip-btn"
            >
              🔄 {showAnswer ? 'Show Question' : 'Show Answer'}
            </button>
            
            <button
              onClick={nextCard}
              className="control-btn nav-btn-flashcard"
            >
              Next ➡️
            </button>
          </div>
          
          <div className="flashcard-counter">
            📖 Card {currentIndex + 1} of {flashcards.length}
          </div>
        </div>
      ) : (
        <div className="empty-state">
          <p>Upload a PDF to generate flashcards</p>
        </div>
      )}
    </div>
  )
}