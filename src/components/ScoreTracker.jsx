import './ScoreTracker.css'

const ScoreTracker = ({ currentStreak, longestStreak }) => {
  return (
    <div className="score-tracker">
      <div className="streak-container">
        <div className="streak-item current">
          <div className="streak-label">Current Streak</div>
          <div className="streak-value">{currentStreak}</div>
        </div>
        
        <div className="streak-divider">
          <div className="divider-line"></div>
        </div>
        
        <div className="streak-item longest">
          <div className="streak-label">Longest Streak</div>
          <div className="streak-value">{longestStreak}</div>
        </div>
      </div>
      
      {currentStreak > 0 && (
        <div className="streak-message">
          {currentStreak === 1 ? "Great start! 🔥" : 
           currentStreak < 3 ? "Keep going! 🔥🔥" :
           currentStreak < 5 ? "On fire! 🔥🔥🔥" :
           "Incredible streak! 🔥🔥🔥🔥"}
        </div>
      )}
    </div>
  )
}

export default ScoreTracker 