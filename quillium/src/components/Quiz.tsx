'use client'
import { useState, useEffect } from 'react'

interface Question {
  question: string
  answer: string
  options: string[]
}

interface QuizProps {
  language: string
  questionCount: number
  pdfText: string
}

export default function Quiz({ language, questionCount, pdfText }: QuizProps) {
  const [questions, setQuestions] = useState<Question[]>([])
  const [selectedAnswers, setSelectedAnswers] = useState<{[key: number]: string}>({})
  const [isGenerating, setIsGenerating] = useState(false)

  useEffect(() => {
    if (pdfText) {
      generateQuestions()
    }
  }, [pdfText, language, questionCount])

  const generateQuestions = async () => {
    setIsGenerating(true)
    // Mock questions
    const mockQuestions: Question[] = Array.from({ length: questionCount }, (_, i) => ({
      question: `Sample question ${i + 1} in ${language}?`,
      answer: `Correct answer ${i + 1}`,
      options: [
        `Correct answer ${i + 1}`,
        `Wrong answer A ${i + 1}`,
        `Wrong answer B ${i + 1}`,
        `Wrong answer C ${i + 1}`
      ].sort(() => Math.random() - 0.5)
    }))
    
    setTimeout(() => {
      setQuestions(mockQuestions)
      setIsGenerating(false)
    }, 1500)
  }

  const handleAnswerSelect = (questionIndex: number, option: string) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionIndex]: option
    }))
  }

  const isCorrect = (questionIndex: number, option: string) => {
    return questions[questionIndex]?.answer === option
  }

  if (isGenerating) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <div className="loading-text">Generating questions...</div>
      </div>
    )
  }

  return (
    <div className="quiz-section">
      <h2 className="section-title">🎯 Quiz Mode</h2>
      
      {questions.length > 0 ? (
        <>
          <div className="generation-status">
            ✅ Generated {questions.length} questions in {language}
          </div>
          
          {questions.map((question, index) => {
            const selectedAnswer = selectedAnswers[index]
            const showResult = selectedAnswer !== undefined
            
            return (
              <div key={index} className="question-item">
                <h3 className="question-text">
                  ❓ Q{index + 1}: {question.question}
                </h3>
                
                <div className="options-list">
                  {question.options.map((option, optIndex) => {
                    let buttonClass = 'option-btn'
                    if (showResult) {
                      if (isCorrect(index, option)) {
                        buttonClass += ' correct'
                      } else if (option === selectedAnswer) {
                        buttonClass += ' incorrect'
                      } else {
                        buttonClass += ' disabled'
                      }
                    }
                    
                    return (
                      <button
                        key={optIndex}
                        onClick={() => handleAnswerSelect(index, option)}
                        disabled={showResult}
                        className={buttonClass}
                      >
                        {option}
                      </button>
                    )
                  })}
                </div>
                
                {selectedAnswer && !isCorrect(index, selectedAnswer) && (
                  <div className="feedback-message feedback-incorrect">
                    ❌ The correct answer is: <strong>{question.answer}</strong>
                  </div>
                )}
                
                {selectedAnswer && isCorrect(index, selectedAnswer) && (
                  <div className="feedback-message feedback-correct">
                    🎉 Correct! Well done!
                  </div>
                )}
              </div>
            )
          })}
        </>
      ) : (
        <div className="empty-state">
          <p>Upload a PDF to generate questions</p>
        </div>
      )}
    </div>
  )
}