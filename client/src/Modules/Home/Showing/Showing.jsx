import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom"
import { AiOutlineClose, AiOutlinePlayCircle } from "react-icons/ai";
import { Swiper, SwiperSlide } from 'swiper/react'
import { Grid, Navigation, Pagination, Autoplay } from "swiper"
import { HashLoader } from 'react-spinners';
import movieAPI from '../../../Services/movieAPI'
import ReactPlayer from 'react-player'
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/pagination";
import "./Showing.css"


const Showing = () => {
  const [movies, setMovies] = useState([])
  const [openModal, setOpenModal] = useState(false)
  const [playVideo, setPlayVideo] = useState(false)
  const [video, setVideo] = useState("")
  const navigate = useNavigate()

  useEffect(() => {
    /* IIFE */
    (async () => {
      const data = await movieAPI.getMovies()
      setMovies(data)
    })()
  }, [])

  const handleOpen = (trailer) => {
    setOpenModal(true);
    setVideo(trailer);
    setPlayVideo(true);
  };

  const handleClose = () => {
    setOpenModal(false);
    setVideo("");
  };
  return (
    <div id="showing" className="showing">
      <Swiper
        breakpoints={{
          0: {
            slidesPerView: 1,
            slidesPerGroup: 1,
            grid: { rows: 1 },
          },
          579: {
            slidesPerView: 2,
            slidesPerGroup: 2,
            grid: { rows: 1 },
          },
          769: {
            slidesPerView: 3,
            slidesPerGroup: 3,
            grid: { rows: 2 },
          },
          993: {
            slidesPerView: 4,
            slidesPerGroup: 4,
            grid: { rows: 2 },
          },
          1201: {
            slidesPerView: 4,
            slidesPerGroup: 4,
            grid: { rows: 2 },
          },
        }}
        navigation={true}
        spaceBetween={25}
        pagination={{
          clickable: true,
        }}
        modules={[Grid, Pagination, Navigation, Autoplay]}
        className="mySwiper"
      >
        {movies.map((item) => {
          return (
            <SwiperSlide key={item.maPhim}>
              <div className="show_flim">
                <div className="show_card">
                  <img src={item.hinhAnh} alt={item.maPhim} />
                  <div className="show_info">
                    <p>{item.moTa.length > 100
                      ? item.moTa.substring(0, 30) + "..."
                      : item.moTa}</p>
                    <button onClick={() => navigate(`/movie/${item.maPhim}`)}>Chi Tiết</button>
                  </div>
                  <button className="icon_play"
                    onClick={() => handleOpen(item.trailer)}>
                    <AiOutlinePlayCircle />
                  </button>
                </div>
                <h2>
                  {item.hot && <span className="movie_sub">HOT</span>}
                  {item.tenPhim}
                </h2>
                <button className="showing_btn_movie"
                  onClick={() => navigate(`/movie/${item.maPhim}`)}>
                  Chi Tiết
                </button>
              </div>
            </SwiperSlide>
          )
        })}
      </Swiper>
      <div style={{ display: openModal ? "block" : "none" }}
        className="showing_modal">
        <div className="showing_ovelay" onClick={handleClose}></div>
        <div className="video_trailer">
          <ReactPlayer playing={playVideo} url={video} controls />
          <button className="showing_close_modal" onClick={handleClose}>
            <AiOutlineClose />
          </button>
        </div>
      </div>
      <div style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "50px",
      }}>
        <HashLoader style={{
          margin: "0 auto",
          borderColor: "#fff",
          display: "none"
        }}
          loading={movies}
          size={30} />
      </div>
    </div>
  )
}

export default Showing