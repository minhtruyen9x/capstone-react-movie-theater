import React from 'react'
import {useParams} from "react-router-dom"
import OverTime from './OverTime'
import ShowTime from './ShowTime'

const Movie = () => {
    const {movieId} = useParams()
  return (
    <>
    <OverTime movieId={movieId}/>
    <ShowTime movieId={movieId}/>
    </>
  )
}

export default Movie