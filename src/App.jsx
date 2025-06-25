import { useState } from 'react'
import './App.css'
import Flashcard from './components/Flashcard'
import AnswerInput from './components/AnswerInput'
import Navigation from './components/Navigation'
import ScoreTracker from './components/ScoreTracker'

function App() {
  // Enhanced flashcard data with images and categories
  const cardSet = {
    title: "Computer Science Fundamentals",
    description: "Test your knowledge of basic computer science concepts and programming principles",
    cards: [
      {
        id: 1,
        front: "What does 'HTML' stand for?",
        back: "HyperText Markup Language",
        difficulty: "easy",
        image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
        acceptedAnswers: ["hypertext markup language", "html", "hyper text markup language"]
      },
      {
        id: 2,
        front: "What is the time complexity of binary search?",
        back: "O(log n) - Binary search eliminates half the search space with each comparison",
        difficulty: "medium",
        image: "https://upload.wikimedia.org/wikipedia/commons/8/83/Binary_Search_Depiction.svg",
        acceptedAnswers: ["o(log n)", "log n", "logarithmic", "o(logn)", "logn"]
      },
      {
        id: 3,
        front: "What does 'CSS' stand for?",
        back: "Cascading Style Sheets",
        difficulty: "easy",
        image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
        acceptedAnswers: ["cascading style sheets", "css", "cascade style sheets"]
      },
      {
        id: 4,
        front: "What is a variable in programming?",
        back: "A storage location with an associated name that contains data",
        difficulty: "easy",
        image: "https://cdn-icons-png.flaticon.com/512/2920/2920277.png",
        acceptedAnswers: ["storage location", "container for data", "named storage", "data container"]
      },
      {
        id: 5,
        front: "What does 'API' stand for?",
        back: "Application Programming Interface - a set of protocols for building software applications",
        difficulty: "medium",
        image: "https://cdn-icons-png.flaticon.com/512/2164/2164832.png",
        acceptedAnswers: ["application programming interface", "api", "app programming interface"]
      },
      {
        id: 6,
        front: "What is recursion?",
        back: "A programming technique where a function calls itself to solve smaller subproblems",
        difficulty: "hard",
        image: "https://cdn-icons-png.flaticon.com/512/1055/1055687.png",
        acceptedAnswers: ["function calls itself", "self-calling function", "function calling itself"]
      },
      {
        id: 7,
        front: "What does 'SQL' stand for?",
        back: "Structured Query Language - used for managing relational databases",
        difficulty: "medium",
        image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
        acceptedAnswers: ["structured query language", "sql", "structured query lang"]
      },
      {
        id: 8,
        front: "What is the difference between '==' and '===' in JavaScript?",
        back: "'==' compares values with type coercion, '===' compares values and types without coercion (strict equality)",
        difficulty: "hard",
        image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
        acceptedAnswers: ["type coercion vs strict", "loose vs strict equality", "coercion difference", "strict equality"]
      }
    ]
  }

  // State management
  const [allCards, setAllCards] = useState(cardSet.cards)
  const [masteredCards, setMasteredCards] = useState([])
  const [availableCards, setAvailableCards] = useState(cardSet.cards)
  const [currentCardIndex, setCurrentCardIndex] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)
  const [userGuess, setUserGuess] = useState('')
  const [guessResult, setGuessResult] = useState(null) // 'correct', 'incorrect', or null
  const [hasGuessed, setHasGuessed] = useState(false)
  const [currentStreak, setCurrentStreak] = useState(0)
  const [longestStreak, setLongestStreak] = useState(0)
  const [isShuffled, setIsShuffled] = useState(false)

  // Fuzzy matching function
  const checkAnswer = (userAnswer, acceptedAnswers) => {
    const normalizedUser = userAnswer.toLowerCase().trim().replace(/[^\w\s]/g, '')
    
    return acceptedAnswers.some(accepted => {
      const normalizedAccepted = accepted.toLowerCase().trim().replace(/[^\w\s]/g, '')
      
      // Exact match
      if (normalizedUser === normalizedAccepted) return true
      
      // Partial match (user answer contains key parts)
      if (normalizedUser.includes(normalizedAccepted) || normalizedAccepted.includes(normalizedUser)) return true
      
      // Word-by-word matching for multi-word answers
      const userWords = normalizedUser.split(/\s+/)
      const acceptedWords = normalizedAccepted.split(/\s+/)
      
      if (acceptedWords.length > 1) {
        const matchedWords = acceptedWords.filter(word => 
          userWords.some(userWord => userWord.includes(word) || word.includes(userWord))
        )
        return matchedWords.length >= Math.ceil(acceptedWords.length * 0.6) // 60% word match
      }
      
      return false
    })
  }

  // Handle answer submission
  const handleSubmitGuess = () => {
    if (!userGuess.trim()) return
    
    const currentCard = availableCards[currentCardIndex]
    const isCorrect = checkAnswer(userGuess, currentCard.acceptedAnswers)
    
    setGuessResult(isCorrect ? 'correct' : 'incorrect')
    setHasGuessed(true)
    
    // Update streaks
    if (isCorrect) {
      const newStreak = currentStreak + 1
      setCurrentStreak(newStreak)
      if (newStreak > longestStreak) {
        setLongestStreak(newStreak)
      }
    } else {
      setCurrentStreak(0)
    }
  }

  // Handle card flip
  const handleCardFlip = () => {
    if (hasGuessed) {
      setIsFlipped(!isFlipped)
    }
  }

  // Navigation functions
  const goToNextCard = () => {
    if (currentCardIndex < availableCards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1)
      resetCardState()
    }
  }

  const goToPreviousCard = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(currentCardIndex - 1)
      resetCardState()
    }
  }

  // Reset card state when navigating
  const resetCardState = () => {
    setIsFlipped(false)
    setUserGuess('')
    setGuessResult(null)
    setHasGuessed(false)
  }

  // Shuffle cards
  const shuffleCards = () => {
    const shuffled = [...availableCards].sort(() => Math.random() - 0.5)
    setAvailableCards(shuffled)
    setCurrentCardIndex(0)
    setIsShuffled(true)
    resetCardState()
  }

  // Reset to original order
  const resetOrder = () => {
    setAvailableCards([...allCards.filter(card => !masteredCards.find(m => m.id === card.id))])
    setCurrentCardIndex(0)
    setIsShuffled(false)
    resetCardState()
  }

  // Mark card as mastered
  const markAsMastered = () => {
    const currentCard = availableCards[currentCardIndex]
    const newMastered = [...masteredCards, currentCard]
    const newAvailable = availableCards.filter(card => card.id !== currentCard.id)
    
    setMasteredCards(newMastered)
    setAvailableCards(newAvailable)
    
    // Adjust current index if necessary
    if (currentCardIndex >= newAvailable.length) {
      setCurrentCardIndex(Math.max(0, newAvailable.length - 1))
    }
    
    resetCardState()
  }

  // If no cards available, show completion message
  if (availableCards.length === 0) {
    return (
      <div className="app">
        <div className="completion-message">
          <h1>🎉 Congratulations!</h1>
          <p>You've mastered all the cards!</p>
          <p>Mastered Cards: {masteredCards.length}</p>
          <p>Longest Streak: {longestStreak}</p>
          <button onClick={() => {
            setAvailableCards([...allCards])
            setMasteredCards([])
            setCurrentCardIndex(0)
            setCurrentStreak(0)
            resetCardState()
          }} className="restart-button">
            Start Over
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="app">
      <div className="header">
        <h1 className="title">{cardSet.title}</h1>
        <p className="description">{cardSet.description}</p>
        <div className="stats">
          <span className="card-count">Cards: {currentCardIndex + 1}/{availableCards.length}</span>
          <span className="mastered-count">Mastered: {masteredCards.length}</span>
        </div>
      </div>
      
      <ScoreTracker 
        currentStreak={currentStreak}
        longestStreak={longestStreak}
      />
      
      <div className="flashcard-container">
        <Flashcard 
          card={availableCards[currentCardIndex]}
          isFlipped={isFlipped}
          onFlip={handleCardFlip}
          hasGuessed={hasGuessed}
          guessResult={guessResult}
        />
        
        <AnswerInput 
          userGuess={userGuess}
          setUserGuess={setUserGuess}
          onSubmit={handleSubmitGuess}
          guessResult={guessResult}
          hasGuessed={hasGuessed}
          disabled={hasGuessed}
        />
        
        <Navigation 
          currentIndex={currentCardIndex}
          totalCards={availableCards.length}
          onNext={goToNextCard}
          onPrevious={goToPreviousCard}
          onShuffle={shuffleCards}
          onResetOrder={resetOrder}
          onMarkMastered={markAsMastered}
          isShuffled={isShuffled}
          hasGuessed={hasGuessed}
        />
      </div>
    </div>
  )
}

export default App
