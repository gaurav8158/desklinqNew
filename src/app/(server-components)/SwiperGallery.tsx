import React, { useState } from 'react'
import { useSwipeable } from 'react-swipeable'
import officeimg from '../../../public/images/pic.jpg'
import Image from 'next/image'
// Define image paths
const images = [
  '/images/image1.jpg',
  '/images/image2.jpg',
  '/images/image3.jpg',
  '/images/image4.jpg',
  '/images/image5.jpg',
  '/images/image6.jpg',
]

const SwiperGallery: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0)

  const handlers = useSwipeable({
    onSwipedLeft: () => handleNext(),
    onSwipedRight: () => handlePrev(),
    delta: 10,
    // preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  })

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
  }

  const handlePrev = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    )
  }

  return (
    <div {...handlers} className="relative overflow-hidden w-full h-">
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((src, index) => (
          <div key={index} className="flex-shrink-0 w-full h-96">
            <Image
              src={officeimg}
              alt={`Slide ${index + 1}`}
              className="w-full h-96 rounded-lg object-cover"
            />
          </div>
        ))}
      </div>
      <button
        onClick={handlePrev}
        className="hidden lg:block absolute  top-1/2 left-4 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-lg"
      >
        Prev
      </button>
      <button
        onClick={handleNext}
        className="hidden lg:block absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-lg"
      >
        Next
      </button>
    </div>
  )
}

export default SwiperGallery
