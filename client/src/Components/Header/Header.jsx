import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

import { UserOutlined } from "@ant-design/icons"
import { DownOutlined } from "@ant-design/icons"
import { Avatar, Dropdown } from "antd"
import { Twirl as Hamburger } from 'hamburger-react';
import { FiLogOut } from "react-icons/fi"
import { AiOutlineSetting, AiOutlineUser } from "react-icons/ai";

import { logout } from '../../Slices/authSlice'
import { Logo } from '../SVG';

import "./Header.scss"

const Header = () => {
    const [isOpen, setOpen] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth)

    const handleLogout = () => {
        dispatch(logout());
        navigate("/")
    }

    const items =
        user?.maLoaiNguoiDung === "QuanTri" ?
            [
                {
                    label: (
                        <>
                            <span style={{ lineHeight: "25px", marginRight: "10px" }}>
                                <AiOutlineUser />
                            </span>
                            <Link
                                to="/user"
                                style={{ textDecoration: "none", fontWeight: "500" }}
                            >
                                Thông tin cá nhân
                            </Link>
                        </>
                    ),
                    key: "0",
                },
                {
                    label: (
                        <>
                            <span style={{ lineHeight: "25px", marginRight: "10px" }}>
                                <AiOutlineSetting />
                            </span>
                            <a
                                style={{ textDecoration: "none", fontWeight: "500" }}
                                href={process.env?.REACT_APP_ADMIN_URL || "#"}
                            >
                                Quản trị
                            </a>
                        </>
                    ),
                    key: "1",
                },
                {
                    type: "divider",
                },
                {
                    label: (
                        <>
                            <span style={{ lineHeight: "25px", marginRight: "10px" }}>
                                <FiLogOut />
                            </span>
                            <a
                                style={{ textDecoration: "none", fontWeight: "500" }}
                                href="/"
                                onClick={handleLogout}
                            >
                                Đăng xuất
                            </a>
                        </>
                    ),
                    key: "3",
                },
            ] :
            [
                {
                    label: (
                        <>
                            <span style={{ lineHeight: "25px", marginRight: "10px" }}>
                                <AiOutlineUser />
                            </span>
                            <Link
                                to="/user"
                                style={{ textDecoration: "none", fontWeight: "500" }}
                            >
                                Thông tin cá nhân
                            </Link>
                        </>
                    ),
                    key: "0",
                },
                {
                    type: "divider",
                },
                {
                    label: (
                        <>
                            <span style={{ lineHeight: "25px", marginRight: "10px" }}>
                                <FiLogOut />
                            </span>
                            <a
                                style={{ textDecoration: "none", fontWeight: "500" }}
                                href="/"
                                onClick={handleLogout}
                            >
                                Đăng xuất
                            </a>
                        </>
                    ),
                    key: "3",
                },
            ]

    return (
        <>
            <div className="header">
                <div className="header-logo">
                    <div className='menu-icon' onClick={() => setOpen(true)}>
                        <Hamburger toggled={false} />
                    </div>
                    <Link to='/' className='logo'>
                        <Logo />
                    </Link>
                </div>
                <div className="menu">
                    <Link to="/">Trang Chủ</Link>
                    <a href="#showing">Lịch Chiếu</a>
                    <a href="#cinemax">Cụm Rạp</a>
                    <a href="#footer">Liên Hệ</a>
                </div>

                {user ? (
                    <Dropdown menu={{ items }} trigger={["click"]}>
                        <div className="logout">
                            <Avatar
                                style={{
                                    backgroundColor: "#f53900",
                                }}
                            >
                                {user.taiKhoan.slice(0, 1).toUpperCase()}
                            </Avatar>
                            <p className="name">{user.taiKhoan}</p>
                            <DownOutlined style={{ color: "#999", fontSize: "18px" }} />
                        </div>
                    </Dropdown>
                ) : (
                    <div className="auth">
                        <div className="btn">
                            <Link to="/login" className="signin">
                                Đăng Nhập
                            </Link>
                        </div>
                        <div className="btn">
                            <Link to="/register" className="register">
                                Đăng Ký
                            </Link>
                        </div>
                    </div>
                )}
            </div>

            <div
                style={{ display: isOpen ? "block" : "none" }}
                className="overlay-mobile"
                onClick={() => setOpen(false)}
            ></div>

            <div
                style={{ transform: isOpen ? "translateX(0)" : "translateX(-101%)" }}
                className="header-mobile"
            >
                <div className="logo-mobile">
                    <div onClick={() => setOpen(false)}>
                        <Hamburger toggled={false} />
                    </div>
                    <Link to='/' className='logo'>
                        <Logo />
                    </Link>
                </div>

                {user ? (
                    <div className="user-mobile">
                        <Dropdown menu={{ items }} trigger={["click"]}>
                            <div className="logout-mobile">
                                <Avatar
                                    style={{
                                        backgroundColor: "#f56a00",
                                    }}
                                >
                                    {user.taiKhoan.slice(0, 1).toUpperCase()}
                                </Avatar>
                                <p className="name-mobile">{user.taiKhoan}</p>
                                <DownOutlined style={{ color: "#999", fontSize: "18px" }} />
                            </div>
                        </Dropdown>
                    </div>
                ) : (
                    <div className="auth-mobile">
                        <div className="btn-mobile">
                            <Avatar icon={<UserOutlined />} />
                            <Link to="/login" className="signin-mobile">
                                Đăng Nhập
                            </Link>
                        </div>
                        <div className="btn-mobile">
                            <Avatar icon={<UserOutlined />} />
                            <Link to="/register" className="register-mobile">
                                Đăng Ký
                            </Link>
                        </div>
                    </div>
                )}

                <div className="menu-mobile">
                    <Link to="/">Trang Chủ</Link>
                    <a href="#showing">Lịch Chiếu</a>
                    <a href="#cinema">Cụm Rạp</a>
                    <a href="#footer">Liên Hệ</a>
                </div>
            </div>
        </>
    )
}

export default Header