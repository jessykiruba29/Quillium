'use client'
import { useState } from 'react'
import PDFUploader from '@/components/PDFUploader'
import Quiz from '@/components/Quiz'
import Flashcards from '@/components/Flashcards'
import Progress from '@/components/Progress'

type Language = 'English' | 'Spanish' | 'French' | 'German' | 'Chinese' | 'Japanese' | 'Korean' | 'Arabic' | 'Portuguese' | 'Russian' | 'Italian'
type Page = 'quiz' | 'flashcards' | 'progress'

export default function Home() {
  const [currentPage, setCurrentPage] = useState<Page>('quiz')
  const [selectedLanguage, setSelectedLanguage] = useState<Language>('English')
  const [questionCount, setQuestionCount] = useState(20)
  const [pdfText, setPdfText] = useState<string>('')

  const globalLanguages: Language[] = [
    'English', 'Spanish', 'French', 'German', 'Chinese', 'Japanese',
    'Korean', 'Arabic', 'Portuguese', 'Russian', 'Italian'
  ]

  return (
    <div>
      {/* Header */}
      <div className="app-header">
        <h1 className="app-title">🌿Quillium</h1>
        <p className="app-subtitle">Quiz.Learn.Conquer</p>
      </div>

      <div className="main-container">
        {/* Navigation */}
        <div className="navigation">
          {(['quiz', 'flashcards', 'progress'] as Page[]).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`nav-btn ${currentPage === page ? 'active' : ''}`}
            >
              {page === 'quiz' && 'Quiz'}
              {page === 'flashcards' && 'Flashcards'}
              {page === 'progress' && 'Progress'}
            </button>
          ))}
        </div>

        {/* Controls */}
        <div className="controls-section">
          <select
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value as Language)}
            className="language-selector"
          >
            {globalLanguages.map(lang => (
              <option key={lang} value={lang}>{lang}</option>
            ))}
          </select>

          <div className="range-control-group">
            <span className="range-label">Questions: {questionCount}</span>
            <input
              type="range"
              min="5"
              max="20"
              value={questionCount}
              onChange={(e) => setQuestionCount(parseInt(e.target.value))}
              className="range-slider"
            />
          </div>
        </div>

        {/* PDF Upload */}
        <PDFUploader onTextExtracted={setPdfText} />

        {/* Content */}
        {currentPage === 'quiz' && (
          <Quiz 
            language={selectedLanguage}
            questionCount={questionCount}
            pdfText={pdfText}
          />
        )}

        {currentPage === 'flashcards' && (
          <Flashcards
            language={selectedLanguage}
            questionCount={questionCount}
            pdfText={pdfText}
          />
        )}

        {currentPage === 'progress' && <Progress />}
      </div>
    </div>
  )
}