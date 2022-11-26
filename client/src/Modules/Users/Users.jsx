import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import cn from 'classnames'


import UsersBook from './UserBook/UsersBook'
import UsersInfo from './UserInfo/UsersInfo'

import { getUserInfo } from '../../Slices/userSlice'

import "./Users.scss"

const Users = () => {
    const { user: userInfo } = useSelector(state => state.user)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getUserInfo())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const ticketsNum = userInfo?.thongTinDatVe.reduce((total, item) => {
        return total + item.danhSachGhe.length
    }, 0)

    const numBook = userInfo?.thongTinDatVe.length;

    return (
        <div className='users'>
            <div className='users-main'>
                <div className='users-info'>
                    <p className='users-photo'>
                        {userInfo?.taiKhoan.slice(0, 1).toUpperCase()}
                    </p>
                    <p className="users-name">{userInfo?.hoTen}</p>
                    <p className={cn("users-type text-primary", {
                        "text-danger": userInfo?.maLoaiNguoiDung === "QuanTri"
                    })}>
                        {userInfo?.loaiNguoiDung.tenLoai}
                    </p>
                    <div className="users-info-booking">
                        <p>
                            Số lần đặt vé:{" "}
                            <strong className="text-success">{numBook}</strong>
                        </p>
                        <p>
                            Số vé đã đặt:{" "}
                            <strong className="text-success">{ticketsNum}</strong>
                        </p>
                    </div>
                </div>

                <div className='users-show'>
                    <div className='info-users'>
                        <UsersInfo userInfo={userInfo} />
                    </div>

                    <div className='users-history'>
                        <UsersBook userInfo={userInfo} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Users