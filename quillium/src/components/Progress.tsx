'use client'
import { useState, useEffect } from 'react'

interface ProgressData {
  totalQuestions: number
  correctAnswers: number
  incorrectAnswers: number
  flashcardsStudied: number
}

export default function Progress() {
  const [progress, setProgress] = useState<ProgressData>({
    totalQuestions: 0,
    correctAnswers: 0,
    incorrectAnswers: 0,
    flashcardsStudied: 0
  })

  useEffect(() => {
    // Load from localStorage
    const saved = localStorage.getItem('quillium-progress')
    if (saved) {
      setProgress(JSON.parse(saved))
    }
  }, [])

  const accuracy = progress.totalQuestions > 0 
    ? (progress.correctAnswers / progress.totalQuestions) * 100 
    : 0

  const resetProgress = () => {
    const newProgress: ProgressData = {
      totalQuestions: 0,
      correctAnswers: 0,
      incorrectAnswers: 0,
      flashcardsStudied: 0
    }
    setProgress(newProgress)
    localStorage.setItem('quillium-progress', JSON.stringify(newProgress))
  }

  return (
    <div className="progress-section">
      <h2 className="section-title">📊 Your Learning Progress</h2>
      
      <div className="stats-grid">
        <div className="stat-card">
          <h3 className="stat-label">Total Questions</h3>
          <h2 className="stat-value">{progress.totalQuestions}</h2>
        </div>
        
        <div className="stat-card">
          <h3 className="stat-label">Accuracy</h3>
          <h2 className="stat-value">{accuracy.toFixed(1)}%</h2>
        </div>
        
        <div className="stat-card">
          <h3 className="stat-label">Correct Answers</h3>
          <h2 className="stat-value">{progress.correctAnswers}</h2>
        </div>
        
        <div className="stat-card">
          <h3 className="stat-label">Flashcards Studied</h3>
          <h2 className="stat-value">{progress.flashcardsStudied}</h2>
        </div>
      </div>

      {progress.totalQuestions > 0 && (
        <div className="charts-container">
          {/* Accuracy Gauge */}
          <div className="chart-panel">
            <h3 className="chart-title">Accuracy Score</h3>
            <div className="progress-bar">
              <div 
                className="progress-fill"
                style={{ width: `${accuracy}%` }}
              ></div>
            </div>
            <div className="accuracy-text">{accuracy.toFixed(1)}%</div>
          </div>

          {/* Answer Distribution */}
          <div className="chart-panel">
            <h3 className="chart-title">Answer Distribution</h3>
            <div className="stats-list">
              <div className="stat-row">
                <span className="stat-correct">Correct ✅</span>
                <span>{progress.correctAnswers}</span>
              </div>
              <div className="stat-row">
                <span className="stat-incorrect">Incorrect ❌</span>
                <span>{progress.incorrectAnswers}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      <button
        onClick={resetProgress}
        className="reset-progress-btn"
      >
        🔄 Reset Progress
      </button>
    </div>
  )
}