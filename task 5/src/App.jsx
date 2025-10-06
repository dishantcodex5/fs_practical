import { useState } from 'react'
import './App.css'

function App() {
  const [display, setDisplay] = useState('0')
  const [previousValue, setPreviousValue] = useState(null)
  const [operation, setOperation] = useState(null)
  const [waitingForNewValue, setWaitingForNewValue] = useState(false)

  const inputNumber = (num) => {
    if (waitingForNewValue) {
      setDisplay(String(num))
      setWaitingForNewValue(false)
    } else {
      setDisplay(display === '0' ? String(num) : display + num)
    }
  }

  const inputDecimal = () => {
    if (waitingForNewValue) {
      setDisplay('0.')
      setWaitingForNewValue(false)
    } else if (display.indexOf('.') === -1) {
      setDisplay(display + '.')
    }
  }

  const clear = () => {
    setDisplay('0')
    setPreviousValue(null)
    setOperation(null)
    setWaitingForNewValue(false)
  }

  const performOperation = (nextOperation) => {
    const inputValue = parseFloat(display)

    if (previousValue === null) {
      setPreviousValue(inputValue)
    } else if (operation) {
      const currentValue = previousValue || 0
      const newValue = calculate(currentValue, inputValue, operation)

      setDisplay(newValue === 'Error' ? 'Error' : String(newValue))
      setPreviousValue(newValue === 'Error' ? null : newValue)
    }

    setWaitingForNewValue(true)
    setOperation(nextOperation)
  }

  const calculate = (firstValue, secondValue, operation) => {
    switch (operation) {
      case '+':
        return firstValue + secondValue
      case '-':
        return firstValue - secondValue
      case '*':
        return firstValue * secondValue
      case '/':
        if (secondValue === 0) {
          return 'Error'
        }
        const result = firstValue / secondValue
        return Math.round(result * 1000) / 1000
      case '=':
        return secondValue
      default:
        return secondValue
    }
  }

  const handleEquals = () => {
    const inputValue = parseFloat(display)

    if (previousValue !== null && operation) {
      const newValue = calculate(previousValue, inputValue, operation)
      setDisplay(newValue === 'Error' ? 'Error' : String(newValue))
      setPreviousValue(null)
      setOperation(null)
      setWaitingForNewValue(true)
    }
  }

  return (
    <div className="calculator">
      <div className="calculator-display">
        {display}
      </div>
      <div className="calculator-buttons">
        <button className="btn btn-clear" onClick={clear}>C</button>
        <button className="btn btn-operation" onClick={() => performOperation('/')}>/</button>
        <button className="btn btn-operation" onClick={() => performOperation('*')}>*</button>
        <button className="btn btn-operation" onClick={() => performOperation('-')}>-</button>
        
        <button className="btn btn-number" onClick={() => inputNumber(7)}>7</button>
        <button className="btn btn-number" onClick={() => inputNumber(8)}>8</button>
        <button className="btn btn-number" onClick={() => inputNumber(9)}>9</button>
        <button className="btn btn-operation" onClick={() => performOperation('+')}>+</button>
        
        <button className="btn btn-number" onClick={() => inputNumber(4)}>4</button>
        <button className="btn btn-number" onClick={() => inputNumber(5)}>5</button>
        <button className="btn btn-number" onClick={() => inputNumber(6)}>6</button>
        <button className="btn btn-equals" onClick={handleEquals} rowSpan="2">=</button>
        
        <button className="btn btn-number" onClick={() => inputNumber(1)}>1</button>
        <button className="btn btn-number" onClick={() => inputNumber(2)}>2</button>
        <button className="btn btn-number" onClick={() => inputNumber(3)}>3</button>
        
        <button className="btn btn-number btn-zero" onClick={() => inputNumber(0)}>0</button>
        <button className="btn btn-number" onClick={inputDecimal}>.</button>
      </div>
    </div>
  )
}

export default App
