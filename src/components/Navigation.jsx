import './Navigation.css'

const Navigation = ({ 
  currentIndex, 
  totalCards, 
  onNext, 
  onPrevious, 
  onShuffle, 
  onResetOrder,
  onMarkMastered,
  isShuffled,
  hasGuessed 
}) => {
  const isFirstCard = currentIndex === 0
  const isLastCard = currentIndex === totalCards - 1

  return (
    <div className="navigation-container">
      {/* Primary Navigation */}
      <div className="primary-nav">
        <button 
          onClick={onPrevious}
          className={`nav-button prev-button ${isFirstCard ? 'disabled' : ''}`}
          disabled={isFirstCard}
          title={isFirstCard ? "This is the first card" : "Go to previous card"}
        >
          ← Previous
        </button>
        
        <div className="card-position">
          {currentIndex + 1} of {totalCards}
        </div>
        
        <button 
          onClick={onNext}
          className={`nav-button next-button ${isLastCard ? 'disabled' : ''}`}
          disabled={isLastCard}
          title={isLastCard ? "This is the last card" : "Go to next card"}
        >
          Next →
        </button>
      </div>

      {/* Secondary Actions */}
      <div className="secondary-nav">
        <div className="shuffle-controls">
          {!isShuffled ? (
            <button 
              onClick={onShuffle}
              className="action-button shuffle-button"
              title="Randomize card order"
            >
              🔀 Shuffle
            </button>
          ) : (
            <button 
              onClick={onResetOrder}
              className="action-button reset-button"
              title="Return to original order"
            >
              🔄 Reset Order
            </button>
          )}
        </div>

        {hasGuessed && (
          <button 
            onClick={onMarkMastered}
            className="action-button mastered-button"
            title="Mark this card as mastered and remove from deck"
          >
            ✅ Mark as Mastered
          </button>
        )}
      </div>
    </div>
  )
}

export default Navigation 