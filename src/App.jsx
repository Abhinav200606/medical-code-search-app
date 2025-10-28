import React from 'react'
import SearchBar from './Components/SearchBar/SearchBar'
import hospital from './assets/hospital.png';


const App = () => {
  return (
    <div className="min-vh-100 d-flex flex-column align-items-center pt-5" 
    style={{ backgroundImage: `url(${hospital})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      overflow: "hidden" }}>

<div
        style={{
          position: "absolute",
          inset: 0,
          backdropFilter: "blur(2px)",
          backgroundColor: "rgba(255, 255, 255, 0.3)",
          zIndex: 1,
        }}
      ></div>
      <div
        className="position-relative"
        style={{ zIndex: 2, width: "100%", maxWidth: "700px" }}
      >
      <SearchBar/>
      </div>
      <strong>
      <footer className="text-center text-muted small py-2 bg-light fixed-bottom border-top">
        © {new Date().getFullYear()} Medical Lookup by Abhinav B
      </footer>
      </strong>
    </div>
  )
}

export default App
