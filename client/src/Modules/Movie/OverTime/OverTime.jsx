import React from 'react'
import { Rate, Progress } from 'antd'

import useRequest from "../../../Hook/useRequest"
import movieAPI from "../../../Services/movieAPI"

import "./OverTime.css"

const OverTime = ({ movieId }) => {
    const { data: movie } = useRequest(() => movieAPI.getMovieDetails(movieId))
    if (!movie) {
        return null
    }

    return (
        <div className='OverView'>
            <div className='OverView-backgroud'
                style={{ background: `url(${movie.hinhAnh}) center/ cover no-repeat` }}></div>

            <div className='OverView-flim'>
                <div className='OverView-title'>
                    <div className='OverView-imgs'>
                        <img
                            src={movie.hinhAnh}
                            alt={movie.maPhim}
                            width="300px"
                            height="400px"
                        />
                        <Rate
                            className="start-img-mobile"
                            allowHalf
                            count={5}
                            defaultValue={movie.danhGia / 2}
                            disabled
                        />
                    </div>
                    <div className='OverView-info'>
                        {movie?.dangChieu ? (
                            <span className="OverView-showing">Đang Chiếu</span>
                        ) : movie?.sapChieu ? (
                            <span className="OverView-coming-soon">Sắp Chiếu</span>
                        ) : null}
                        <h3 className="OverView-name">{movie.tenPhim}</h3>
                        <div className="OverView-scroll">
                            <p className="OverView-sub">{movie.moTa}</p>
                        </div>
                        <a href="#showtime" className="OverView-ticket">
                            Mua Vé
                        </a>
                    </div>
                </div>
                <div className="OverView-rating">
                    <div className="OverView-progress">
                        <Progress
                            type="circle"
                            strokeColor={{
                                "0%": "#10e931",
                                "50%": "#e1e107",
                                "100%": "#ec0909"
                            }}
                            format={(percent) => (
                                <span className="OverView-percent">{percent}%</span>
                            )}
                            percent={movie.danhGia * 10}
                        />
                    </div>
                    <div className="OverView-start">
                        <Rate
                            className="start-desktop"
                            count={5}
                            defaultValue={movie.danhGia}
                            disabled
                        />
                        <Rate
                            className="start-mobile"
                            allowHalf
                            count={5}
                            defaultValue={movie.danhGia / 2}
                            disabled
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OverTime