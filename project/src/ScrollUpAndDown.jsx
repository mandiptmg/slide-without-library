import { useRef, useState } from 'react'
import Cursor from './cursor'

const slides = ['Slide 1', 'Slide 2', 'Slide 3', 'Slide 4']

const VerticalSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const startY = useRef(null)

  const handlePrevSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === 0 ? slides.length - 1 : prevSlide - 1
    )
  }

  const handleNextSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === slides.length - 1 ? 0 : prevSlide + 1
    )
  }

  const handleDragStart = (e) => {
    startY.current = e.clientY || e.touches[0].clientY
    document.body.style.cursor = 'grabbing'
  }

  const handleDragEnd = (e) => {
    if (startY.current === null) return

    const endY = e.clientY || e.changedTouches[0].clientY
    const deltaY = startY.current - endY
    const sensitivity = 50

    if (deltaY > sensitivity) {
      handleNextSlide()
    } else if (deltaY < -sensitivity) {
      handlePrevSlide()
    }

    startY.current = null
    document.body.style.cursor = ''
  }

  return (
    <div className='relative bg-gradient-to-br from-yellow-300 via-pink-600 to-purple-800 h-screen grid place-items-center w-full mx-auto overflow-hidden'>
      <div>
        <Cursor />
        <div
          style={{
            transform: `translateY(-${currentSlide * 26}%)`,
            transition: 'transform 0.7s',
          }}
          className='space-y-10'
          onMouseDown={handleDragStart}
          onMouseUp={handleDragEnd}
          onTouchStart={handleDragStart}
          onTouchEnd={handleDragEnd}
        >
          {slides.map((slide, index) => (
            <div
              className={`h-[60vh] w-[30vw] transform duration-700 grid place-items-center translate-y-[35%] shadow-inner bg-yellow-600/60 rounded-3xl text-white mx-auto ${
                index === currentSlide
                  ? 'scale-[1.1] opacity-100'
                  : 'opacity-50'
              }`}
              key={index}
            >
              {slide}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default VerticalSlider
