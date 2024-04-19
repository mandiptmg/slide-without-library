import { useState, useEffect } from 'react'

const Cursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isMouseDown, setIsMouseDown] = useState(false)
  const [isMovingUpDown, setIsMovingUpDown] = useState(false)

  useEffect(() => {
    const onMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY })

      // Check if mouse is moving up or down when mouse down
      if (isMouseDown) {
        setIsMovingUpDown(true)
        setTimeout(() => setIsMovingUpDown(false), 100) // Reset after 100ms
      }
    }

    const onMouseDown = () => {
      setIsMouseDown(true)
      document.body.style.cursor = 'none' // Hide body cursor when mouse down

      // Start scale transition from 1 to 0 after 1 second
      document.querySelector('.custom-cursor').style.transition =
        'transform  ease'
      document.querySelector('.custom-cursor').style.transform = 'scale(0)'
    }

    const onMouseUp = () => {
      setIsMouseDown(false)
      setIsMovingUpDown(false) // Reset when mouse up
      document.body.style.cursor = '' // Show body cursor when mouse up
    }

    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mousedown', onMouseDown)
    document.addEventListener('mouseup', onMouseUp)

    return () => {
      document.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mousedown', onMouseDown)
      document.removeEventListener('mouseup', onMouseUp)
    }
  }, [isMouseDown])

  return (
    <div
      className='custom-cursor'
      style={{
        left: position.x,
        top: position.y,
        transform: `scale(${isMouseDown ? 1 : 0})`,
      }}
    >
      <div
        className='cursor-inner'
        style={{
          height: isMovingUpDown ? '90px' : '20px',
          borderRadius: isMouseDown ? '80px' : '',
        }}
      ></div>
    </div>
  )
}

export default Cursor
