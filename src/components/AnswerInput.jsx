import './AnswerInput.css'

const AnswerInput = ({ userGuess, setUserGuess, onSubmit, guessResult, hasGuessed, disabled }) => {
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !disabled) {
      onSubmit()
    }
  }

  return (
    <div className="answer-input-container">
      <div className="input-section">
        <label htmlFor="guess-input" className="input-label">
          Enter your guess:
        </label>
        <div className="input-group">
          <input
            id="guess-input"
            type="text"
            value={userGuess}
            onChange={(e) => setUserGuess(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your answer here..."
            className={`guess-input ${guessResult ? `result-${guessResult}` : ''}`}
            disabled={disabled}
          />
          <button 
            onClick={onSubmit}
            className={`submit-button ${guessResult ? `result-${guessResult}` : ''}`}
            disabled={disabled || !userGuess.trim()}
          >
            {hasGuessed ? '✓' : 'Submit'}
          </button>
        </div>
      </div>
      
      {hasGuessed && (
        <div className={`feedback ${guessResult}`}>
          {guessResult === 'correct' ? (
            <span className="feedback-text">
              🎉 Correct! Click the card to see the full answer.
            </span>
          ) : (
            <span className="feedback-text">
              ❌ Incorrect. Click the card to see the correct answer.
            </span>
          )}
        </div>
      )}
    </div>
  )
}

export default AnswerInput 