import React  from 'react'
import ScrollTop from '../../Components/Scroll/ScrollTop';
// import Banner from './Banner'
import Banners from './Banners';
import MovieBox from './Moviebox/MovieBox';
import Showing from './Showing/Showing';



const Home = () => {
 
  return (
    <>
      {/* <Banner  /> */}
      <Banners/>
      <Showing />
      <MovieBox/>
      <ScrollTop/>
    </>
  )
}

export default Home
