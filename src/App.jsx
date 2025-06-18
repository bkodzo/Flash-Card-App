import { useState } from 'react'
import './App.css'
import Flashcard from './components/Flashcard'

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
        image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg"
      },
      {
        id: 2,
        front: "What is the time complexity of binary search?",
        back: "O(log n) - Binary search eliminates half the search space with each comparison",
        difficulty: "medium",
        image: "https://upload.wikimedia.org/wikipedia/commons/8/83/Binary_Search_Depiction.svg"
      },
      {
        id: 3,
        front: "What does 'CSS' stand for?",
        back: "Cascading Style Sheets",
        difficulty: "easy",
        image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg"
      },
      {
        id: 4,
        front: "What is a variable in programming?",
        back: "A storage location with an associated name that contains data",
        difficulty: "easy",
        image: "https://cdn-icons-png.flaticon.com/512/2920/2920277.png"
      },
      {
        id: 5,
        front: "What does 'API' stand for?",
        back: "Application Programming Interface - a set of protocols for building software applications",
        difficulty: "medium",
        image: "https://cdn-icons-png.flaticon.com/512/2164/2164832.png"
      },
      {
        id: 6,
        front: "What is recursion?",
        back: "A programming technique where a function calls itself to solve smaller subproblems",
        difficulty: "hard",
        image: "https://cdn-icons-png.flaticon.com/512/1055/1055687.png"
      },
      {
        id: 7,
        front: "What does 'SQL' stand for?",
        back: "Structured Query Language - used for managing relational databases",
        difficulty: "medium",
        image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg"
      },
      {
        id: 8,
        front: "What is the difference between '==' and '===' in JavaScript?",
        back: "'==' compares values with type coercion, '===' compares values and types without coercion (strict equality)",
        difficulty: "hard",
        image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg"
      }
    ]
  }

  const [currentCardIndex, setCurrentCardIndex] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)

  const handleNextCard = () => {
    // Generate random index for next card
    let randomIndex
    do {
      randomIndex = Math.floor(Math.random() * cardSet.cards.length)
    } while (randomIndex === currentCardIndex && cardSet.cards.length > 1)
    
    setCurrentCardIndex(randomIndex)
    setIsFlipped(false) // Reset flip state when showing new card
  }

  const handleCardFlip = () => {
    setIsFlipped(!isFlipped)
  }

  return (
    <div className="app">
      <div className="header">
        <h1 className="title">{cardSet.title}</h1>
        <p className="description">{cardSet.description}</p>
        <p className="card-count">Total Cards: {cardSet.cards.length}</p>
      </div>
      
      <div className="flashcard-container">
        <Flashcard 
          card={cardSet.cards[currentCardIndex]}
          isFlipped={isFlipped}
          onFlip={handleCardFlip}
        />
        
        <button className="next-button" onClick={handleNextCard}>
          Next Card →
        </button>
      </div>
    </div>
  )
}

export default App
