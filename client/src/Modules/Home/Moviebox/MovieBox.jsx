import React, { useEffect, useState } from 'react'
import { Tabs, Collapse } from 'antd'
import { useNavigate } from "react-router-dom"
import tickerAPI from '../../../Services/tickerAPI'

import dayjs from "dayjs"
import "./MovieBox.css"

const MovieBox = () => {
    const navigate = useNavigate()
    const [cinemas, setCinemas] = useState([])

    useEffect(() => {
        (async () => {
            const data = await tickerAPI.getMovieRap()
            setCinemas(data)
        })()
    }, [])

    const { Panel } = Collapse;
    const onChange = (key) => {
        // console.log(key);
    };

    const items = cinemas?.map((cinebox) => {
        const subItems = cinebox.lstCumRap?.slice(0, 10).map((cineComplex, index) => {
            return {
                label: (
                    <div className='cine-info'>
                        <h3 className='cine-name'>
                            {cineComplex.tenCumRap.split("-")[0]}
                            <span> - {cineComplex.tenCumRap.split("-")[1]}</span>
                        </h3>
                        <p className='cine-address'>
                            {cineComplex.diaChi}
                        </p>
                    </div>
                ),
                key: index,
                children:
                    cineComplex.danhSachPhim.map((flim, index) => {
                        return (
                            <div key={index} className="cine-flim">
                                <div className='cine-title'>
                                    <div className='cine-img'>
                                        <img
                                            src={flim.hinhAnh}
                                            alt={flim.maPhim}
                                            width={100}
                                            height={150}
                                        />
                                    </div>
                                    <h1>
                                        {flim.tenPhim}
                                        {flim.hot && (
                                            <span className='cine-sub'>Hot</span>
                                        )}
                                    </h1>

                                </div>
                                {flim.lstLichChieuTheoPhim
                                    ?.slice(0, 4)
                                    .map((showtimes, idx) => {
                                        return (
                                            <button
                                                key={idx}
                                                className="cine-date" onClick={() => navigate(`/ticket/${showtimes.maLichChieu}`)}
                                            >
                                                {dayjs(showtimes.ngayChieuGioChieu).format("DD/MM/YYYY - hh:mm A")}
                                            </button>
                                        )
                                    })}
                            </div>
                        )
                    }),
                className: "cinema-scroll"
            }
        })
        return {
            label: (
                <div className='logo'>
                    <img width={50} height={50}
                        src={cinebox.logo}
                        alt={cinebox.tenHeThongRap} />
                </div>
            ),
            key: cinebox.maHeThongRap,
            children:
                <Tabs
                    defaultActiveKey='1'
                    tabPosition='left'
                    items={subItems}
                />,
            className: "cinema-scroll"
        }
    })

    return (
        <div id='cinemax' className='cinemax'>
            <div className='cinemax_box'>
                <Tabs defaultActiveKey='1' tabPosition='left' items={items} className="cinemax_content" />
            </div>
            <div className="cinema-system-mobile">
                <Collapse onChange={onChange}>
                    {cinemas?.map((cinemaSystem, index) => {
                        return (
                            <Panel
                                header={
                                    <div>
                                        <img
                                            width={40}
                                            height={40}
                                            src={cinemaSystem.logo}
                                            alt={cinemaSystem.tenHeThongRap}
                                        />
                                    </div>
                                }
                                key={index + 1}
                            >
                                <Collapse>
                                    {cinemaSystem.lstCumRap
                                        ?.slice(0, 10)
                                        .map((cinemaComplex, idx) => {
                                            return (
                                                <Panel
                                                    header={
                                                        <div className="cinema-info-mobile">
                                                            <h3 className="cinema-name-mobile">
                                                                {cinemaComplex.tenCumRap}
                                                            </h3>
                                                            <p className="cinema-address-mobile">
                                                                {cinemaComplex.diaChi}
                                                            </p>
                                                            <span className="cinema-detail-mobile">
                                                                Chi tiết
                                                            </span>
                                                        </div>
                                                    }
                                                    key={idx + 1}
                                                >
                                                    {cinemaComplex.danhSachPhim.map((film, filmIndex) => {
                                                        return (
                                                            <div
                                                                key={filmIndex}
                                                                className="d-flex align-items-center mb-3"
                                                            >
                                                                <div>
                                                                    <img
                                                                        width={60}
                                                                        height={80}
                                                                        src={film.hinhAnh}
                                                                        alt={film.maPhim}
                                                                    />
                                                                </div>
                                                                <div className="ms-3">
                                                                    <p className="name-film-mobile">
                                                                        {film.tenPhim}
                                                                    </p>
                                                                    {film.lstLichChieuTheoPhim
                                                                        ?.slice(0, 4)
                                                                        .map((showtimes, showtimesIndex) => {
                                                                            return (
                                                                                <button
                                                                                    key={showtimesIndex}
                                                                                    className="cinema-date-mobile"
                                                                                    onClick={() => navigate(`/ticket/${showtimes.maLichChieu}`)}
                                                                                >
                                                                                    {dayjs(
                                                                                        showtimes.ngayChieuGioChieu
                                                                                    ).format("DD/MM/YYYY - hh:mm A")}
                                                                                </button>
                                                                            );
                                                                        })}
                                                                </div>
                                                            </div>
                                                        );
                                                    })}
                                                </Panel>
                                            );
                                        })}
                                </Collapse>
                            </Panel>
                        );
                    })}
                </Collapse>
            </div>
        </div>
    )
}

export default MovieBox