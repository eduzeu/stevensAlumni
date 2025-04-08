import react from 'react'
import campus from "../assets/campus.jpeg"
import "../App.css"

function Home() {

  return (
    <>
      <p className="text">Welcome to the Stevens Alumni Network, where you can connect with fellow alumni, expand your professional
        network, and discover new opportunities. Whether you're looking to share your expertise or seeking guidance for
        your career journey, this platform is designed to help you find the perfect mentor. Tap into the experience and
        insights of alumni who have walked the path you're on. Building meaningful connections with like-minded professionals
        can open doors to personal and professional growth. Let us help you grow your network and find the mentor who can make
        a difference in your career!</p>

      <img className="campus" src={campus} alt="stc" />
    </>
  )
}


export default Home;