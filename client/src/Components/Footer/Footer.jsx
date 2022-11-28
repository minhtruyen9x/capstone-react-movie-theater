import React from 'react'
import {
    AiFillAndroid,
    AiFillApple,
    AiOutlineFacebook,
    AiOutlineGooglePlus,
    AiOutlineInstagram,
    AiOutlineYoutube,
    AiFillTwitterCircle
} from "react-icons/ai";
import { Col, Row } from 'antd';
import "./Footer.css"

const Footer = () => {
    return (
        <div id='footer' className='footer'>
            <Row className='footer_detail' gutter={[0, 24]}>
                <Col sm={12} lg={6} className='footer_item'>
                    <h1>Mạng Xã Hội</h1>
                    <div className='hottline'>
                        <a href="/" className='footer_app'>
                            <AiOutlineFacebook />
                        </a>
                        <a href="/" className='footer_app'>
                            <AiOutlineGooglePlus />
                        </a>
                        <a href="/" className='footer_app'>
                            <AiOutlineYoutube />
                        </a>
                        <a href="/" className='footer_app'>
                            <AiOutlineInstagram />
                        </a>
                        <a href="/" className='footer_app'>
                            <AiFillTwitterCircle />
                        </a>
                    </div>
                </Col>
                <Col sm={12} lg={6} className='faqItem'>
                    <h1>LIÊN HỆ</h1>
                    <a href="/">FAQ</a>
                    <a href="/">Liên Lạc</a>
                    <a href="/">Thỏa thuận sử dụng</a>
                    <a href="/">Chính sách bảo mật</a>
                </Col>

                <Col sm={12} lg={6} className='cinemaItem'>
                    <h1>Đối Tác</h1>
                    <div className='cinemaList'>
                        <div className='images'>
                            <a href="/" className="theater">
                                <img
                                    src="https://static-s.aa-cdn.net/img/gp/20600005285939/9N7f8PWb1zlDqOR4mepkNFkRt5SlrjFoLsg5jYtVhvq9LeQneLKyHg9eEx4BSgyl7F4=w300?v=1"
                                    alt="cgv"
                                />
                            </a>
                            <a href="/" className="theater">
                                <img
                                    src="https://is4-ssl.mzstatic.com/image/thumb/Purple113/v4/9b/e6/c5/9be6c53e-eb2f-f3e9-ff01-445036af8ca9/source/256x256bb.jpg"
                                    alt="bhd"
                                />
                            </a>
                            <a href="/" className="theater">
                                <img
                                    src="https://cdn.mywork.com.vn/company-logo-medium/102018/3N1jjAtQffNCDZxYTeTx54khfndItCJiIBaDTvEL.w-200.h-200.fit-crop.jpeg"
                                    alt="glx"
                                />
                            </a>
                            <a href="/" className="theater">
                                <img
                                    src="https://printgo.vn/uploads/file-logo/1/512x512.6ceefc7f866a88b5ebb6c32591020e26.ai.1.png"
                                    alt="cns"
                                />
                            </a>
                            <a href="/" className="theater">
                                <img
                                    src="https://cdn.mywork.com.vn/company-logo-medium/042019/e6e940613a8915e90449d625a72f4ecb.png"
                                    alt="lotte"
                                />
                            </a>
                        </div>
                    </div>
                </Col>

                <Col sm={12} lg={6} className='mobileItem'>
                    <h1>MOBILE APP</h1>
                    <div gutter={10} className="mobileApp">
                        <div>
                            <a href="/" className="store">
                                <AiFillApple />
                            </a>

                            <a href="/" className="store">
                                <AiFillAndroid />
                            </a>
                        </div>
                    </div>
                </Col>
            </Row>
        </div>
    )
}

export default Footer