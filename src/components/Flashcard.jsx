import './Flashcard.css'

const Flashcard = ({ card, isFlipped, onFlip }) => {
  return (
    <div className={`flashcard ${isFlipped ? 'flipped' : ''} difficulty-${card.difficulty}`} onClick={onFlip}>
      <div className="flashcard-inner">
        <div className="flashcard-front">
          <div className="difficulty-badge">{card.difficulty}</div>
          <div className="card-content">
            <div className="card-image">
              <img src={card.image} alt="Card illustration" />
            </div>
            <h3>Question</h3>
            <p>{card.front}</p>
          </div>
          <div className="flip-hint">Click to reveal answer</div>
        </div>
        <div className="flashcard-back">
          <div className="difficulty-badge">{card.difficulty}</div>
          <div className="card-content">
            <div className="card-image">
              <img src={card.image} alt="Card illustration" />
            </div>
            <h3>Answer</h3>
            <p>{card.back}</p>
          </div>
          <div className="flip-hint">Click to see question</div>
        </div>
      </div>
    </div>
  )
}

export default Flashcard 