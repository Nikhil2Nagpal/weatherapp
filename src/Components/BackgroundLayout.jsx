import React, { useState, useEffect } from 'react'
import { useStateContext } from '../Context'
import clear from '../assets/images/clear.jpg'
import cloudy from '../assets/images/cloudy.jpg'
import smoke from '../assets/images/smoke.png'
import rainy from '../assets/images/rainy.jpg'
import snow from '../assets/images/snow.jpg'
import stromy from '../assets/images/stromy.jpg'
import sunny from '../assets/images/sunny.jpg'

const BackgroundLayout = () => {

  const {weather} = useStateContext()

  const [image, setImage] = useState(clear)

  useEffect(() => {
    if (weather && weather.description) {
      console.log(weather.description);  // Check if this logs the correct description
      let imageString = weather.description.toLowerCase(); 
      if (imageString.toLowerCase().includes('clear')){
        setImage(clear)
      } else if (imageString.toLowerCase().includes('cloud')){
        setImage(cloudy)
      } else if (imageString.toLowerCase().includes('smoke')){
        setImage(smoke)
      } else if (imageString.toLowerCase().includes('rain') || imageString.toLowerCase().includes('shower')){
        setImage(rainy)
      } else if (imageString.toLowerCase().includes('snow')){
        setImage(snow)
      } else if (imageString.toLowerCase().includes('thunder') || imageString.toLowerCase().includes('strom')){
        setImage(stromy)
      } else if (imageString.toLowerCase().includes('sunny')){
        setImage(sunny)
      }
    }
  },[weather])

  return (
    <img src={image} alt="weather-image" className='h-screen w-full fixed left-0 top-0 -z-[10]' />
  )
}

export default BackgroundLayout