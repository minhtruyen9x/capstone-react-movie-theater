import React from 'react'
import { useNavigate } from "react-router-dom";
import moment from "moment"


import { Tabs, Collapse } from "antd"

import tickerAPI from '../../../Services/tickerAPI'
import useRequest from "../../../Hook/useRequest"

import "./ShowTime.css"

const ShowTime = ({ movieId }) => {
  const navigate = useNavigate()
  const { data: movieDetails } = useRequest(() => tickerAPI.getMovieRapDetail(movieId))

  if (movieDetails?.heThongRapChieu.length === 0) {
    return (
      <div className="showtime-wrapper">
        <div className="showtime">
          <p className='showtime-empty'>Hiện Tại chưa có lịch chiếu cho bộ phim này</p>
        </div>
      </div>
    );
  }

  const { Panel } = Collapse;

  const onChange = (key) => {
    // console.log(key);
  };

  const items = movieDetails?.heThongRapChieu.map((cinemaSystem, index) => {
    return {
      label: (
        <div className="showtime-cinema">
          <div className="showtime-logo">
            <img
              width={50}
              height={50}
              src={cinemaSystem.logo}
              alt={cinemaSystem.maHeThongRap}
            />
          </div>
          <div className="showtime-name-cinema">
            <p>{cinemaSystem.tenHeThongRap}</p>
          </div>
        </div>
      ),
      key: index,
      className: "showtime-scroll",
      children: cinemaSystem.cumRapChieu?.map((cinemaComplex) => {
        return (
          <div
            key={cinemaComplex.maCumRap}
            className="showtime-complex"
          >
            <h1 className="showtime-name">
              {cinemaComplex.tenCumRap}
            </h1>
            <div className="showtime-date">
              {cinemaComplex.lichChieuPhim?.map((dateTime) => {
                return (
                  <button
                    key={dateTime.maLichChieu}
                    onClick={() =>
                      navigate(`/ticket/${dateTime.maLichChieu}`)
                    }
                  >
                    {moment(dateTime.ngayChieuGioChieu).format(
                      "L - hh:mm A"
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )
      })
    }
  })

  return (
    <div className="showtime-wrapper">
      <div id='showtime' className='showtime'>
        <Tabs
          className="showtime-desktop"
          defaultActiveKey="1"
          tabPosition="left" items={items}
        />
        <Collapse className="showtime-mobile" onChange={onChange}>
          {movieDetails?.heThongRapChieu.map((cinemaSystem, index) => {
            return (
              <Panel
                key={index + 1}
                header={
                  <div className="showtime-cinema-mobile">
                    <div className="showtime-logo-mobile">
                      <img
                        width={50}
                        height={50}
                        src={cinemaSystem.logo}
                        alt={cinemaSystem.maHeThongRap}
                      />
                    </div>
                    <div className="showtime-name-cinema-mobile">
                      <p>{cinemaSystem.tenHeThongRap}</p>
                    </div>
                  </div>
                }
              >
                <div className="showtime-scroll-mobile">
                  {cinemaSystem.cumRapChieu?.map((cinemaComplex) => {
                    return (
                      <div
                        key={cinemaComplex.maCumRap}
                        className="showtime-complex-mobile"
                      >
                        <h1 className="showtime-name-mobile">
                          {cinemaComplex.tenCumRap}
                        </h1>
                        <div className="showtime-date-mobile">
                          {cinemaComplex.lichChieuPhim?.map((dateTime) => {
                            return (
                              <button
                                key={dateTime.maLichChieu}
                                onClick={() =>
                                  navigate(`/ticket/${dateTime.maLichChieu}`)
                                }
                              >
                                {moment(dateTime.ngayChieuGioChieu).format(
                                  "L - hh:mm A"
                                )}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </Panel>
            );
          })}
        </Collapse>
      </div>
    </div>
  )
}

export default ShowTime