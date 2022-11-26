import React, { useState , useEffect } from 'react'
import { AiOutlineArrowUp } from "react-icons/ai";
import "./Scroll.css"

const ScrollTop = () => {
  const [scrolls, setScroll] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      window.scrollY >= 200 ? setScroll(true) : setScroll(false);
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <div>
      {scrolls && (
        <button
          className="btn_top"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <AiOutlineArrowUp />
        </button>
      )}
    </div>
  )
}

export default ScrollTop