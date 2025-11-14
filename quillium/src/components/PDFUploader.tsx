import { useState } from 'react'

interface PDFUploaderProps {
  onTextExtracted: (text: string) => void
}

export default function PDFUploader({ onTextExtracted }: PDFUploaderProps) {
  const [isProcessing, setIsProcessing] = useState(false)

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file || file.type !== 'application/pdf') return

    setIsProcessing(true)
    
    // Simulate PDF processing
    setTimeout(() => {
      const mockText = "This is mock text extracted from PDF. In a real app, this would be processed by your backend."
      onTextExtracted(mockText)
      setIsProcessing(false)
    }, 2000)
  }

  return (
    <div className="pdf-upload-section">
      <label className="upload-label">
        📄 Upload a PDF document
      </label>
      <input
        type="file"
        accept=".pdf"
        onChange={handleFileUpload}
        disabled={isProcessing}
        className="file-upload-input"
      />
      {isProcessing && (
        <div className="processing-status">
          🔄 Processing PDF...
        </div>
      )}
    </div>
  )
}