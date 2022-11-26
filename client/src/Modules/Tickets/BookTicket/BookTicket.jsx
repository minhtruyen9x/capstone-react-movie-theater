import React from 'react'
import { notification } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom"
import swal from 'sweetalert';

import { bookingTicket } from '../../../Slices/ticketSlice';

import "./bookticket.css"

const BookTicket = ({ ticketId, tickets, checkLists }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth)

  const SeatList = checkLists?.reduce((total, item) => {
    return total + " Ghế " + item.tenGhe + ", "
  }, "")

  const totalPrice = checkLists.reduce((total, item) => {
    return total + item.giaVe
  }, 0)

  const infoBooking = {
    maLichChieu: ticketId,
    danhSachVe: checkLists,
  }

  const handleTicket = async () => {
    if (!user) {
      await swal(
        "Vui Lòng đăng nhập để đặt vé",
        "You clicked the 'Back Login' !",
        "warning"
      )
      return
    }

    if (!SeatList) {
      swal("Vui Lòng Chọn Ghế", "You Clicked the 'OK'! ", "warning")
      return
    }

    try {
      await dispatch(bookingTicket(infoBooking)).unwrap();
      await swal("Đặt Vé Thành Công", "You Clicked the 'OK' !", "success");
      navigate("/user")
    } catch (error) {
      notification.error({
        message: "Đặt Vé Thất Bại",
        description: error,
      })
    }

  }
  return (
    <div className='bookings'>
      <div className='bookings-details'>
        <div className='bookings-title'>
          <div className='bookings-img'>
            <img
              width={150}
              height={200}
              src={tickets?.thongTinPhim.hinhAnh} alt={tickets?.thongTinPhim.tenPhim} />
          </div>
          <h1 className='bookings-name'>
            {tickets?.thongTinPhim.tenPhim}
          </h1>
        </div>
        <div className='bookings-info'>
          <div className='bookings-item'>
            <h3>Tên rạp:</h3>
            <p>{tickets?.thongTinPhim.tenRap}</p>
          </div>
          <div className='bookings-item'>
            <h3>Ngày Chiếu</h3>
            <p>{tickets?.thongTinPhim.ngayChieu}
              <span>-</span>
              <span style={{ color: "red" }}>
                {tickets?.thongTinPhim.gioChieu}
              </span>
            </p>
          </div>
          <div className='bookings-item'>
            <h3>Địa Chỉ: </h3>
            <p>{tickets?.thongTinPhim.diaChi}</p>
          </div>
          <div className='bookings-item list'>
            <h3>Ghế Bạn Chọn: </h3>
            <p className='bookings-list'>
              {SeatList}
            </p>
          </div>
        </div>
        <div className='bookings-buy'>
          <div className='buy-ticket'>
            <h3 className='total'> Thành Tiền</h3>
            <p className='price'>
              {Number(totalPrice).toLocaleString()} VND
            </p>
          </div>
          <button className='bookings-btn' onClick={handleTicket}>
            Đặt Vé
          </button>
        </div>
      </div>
    </div>
  )
}

export default BookTicket