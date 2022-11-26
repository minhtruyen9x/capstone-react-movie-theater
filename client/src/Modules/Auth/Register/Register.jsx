import React from 'react'
import { Link, useNavigate } from "react-router-dom"
import { Controller, useForm } from "react-hook-form";
import swal from "sweetalert";

import authAPI from "../../../Services/authAPI"
import useRequest from "../../../Hook/useRequest"

import { Button, notification, Col, Row } from "antd";


import TextField from '../../../Components/TextField';

import "./register.scss"

const Register = () => {
  const navigate = useNavigate();

  const { handleSubmit, control } = useForm({
    defaultValues: {
      taiKhoan: "",
      matKhau: "",
      email: "",
      hoTen: "",
      soDt: "",
    },
    mode: "onTouched",
  })
  const { data: handleRegister, isloading } = useRequest(
    (values) => authAPI.register(values),
    { isManual: true }
  )

  const onSubmit = async (values) => {
    try {
      await handleRegister(values);
      swal("Đăng Ký Thành Công!", "You clicked the 'OK'!", "success");
      navigate("/login", {
        state: {
          taiKhoan: values.taiKhoan,
          matKhau: values.matKhau
        }
      });
    } catch (error) {
      notification.error({
        message: "Đăng ký thất bại",
        description: error,
      });
    }
  }
  return (
    <div className='register'>
      <div className='register_title'>
        Đăng ký
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Row gutter={[0, 16]}>
          <Col span={24}>
            <Controller
              name="taiKhoan"
              control={control}
              rules={{
                required: {
                  value: true,
                  message: "Tài khoản không được để trống",
                },
              }}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  {...field}
                  label="Tài Khoản"
                  error={error?.message}
                />
              )}
            />
          </Col>
          <Col span={24}>
            <Controller
              name="matKhau"
              control={control}
              rules={{
                required: {
                  value: true,
                  message: "Mật khẩu không được để trống",
                },
                minLength: {
                  value: 4,
                  message: "Mật khẩu phải từ 4 đến 8 ký tự",
                },
                maxLength: {
                  value: 8,
                  message: "Mật khẩu phải từ 4 đến 8 ký tự",
                },
              }}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  {...field}
                  label="Mật Khẩu"
                  error={error?.message}
                />
              )}
            />
          </Col>
          <Col span={24}>
            <Controller
              name="email"
              control={control}
              rules={{
                required: {
                  value: true,
                  message: "Email không được để trống",
                },
                pattern: {
                  value:
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  message: "Email không đúng định dạng",
                },
              }}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  {...field}
                  label="Email"
                  error={error?.message}
                />
              )}
            />
          </Col>
          <Col span={24}>
            <Controller
              name="hoTen"
              control={control}
              rules={{
                required: {
                  value: true,
                  message: "Họ tên không được để trống",
                },
              }}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  {...field}
                  label="Họ Tên"
                  error={error?.message}
                />
              )}
            />
          </Col>
          <Col span={24}>
            <Controller
              name="soDt"
              control={control}
              rules={{
                required: {
                  value: true,
                  message: "Số điện thoại không được để trống",
                },
              }}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  {...field}
                  label="Số Điện Thoại"
                  error={error?.message}
                />
              )}
            />
          </Col>
        </Row>
        <Button
          block
          className="reg-button"
          type="primary"
          htmlType="submit"
          disabled={isloading}
          loading={isloading}
        >
          Đăng Ký
        </Button>
      </form>
      <div className='register_link'>
        Bạn đã có tài khoản?
        <Link to="/login" type="primary">
          Đăng nhập
        </Link>
      </div>
    </div >
  )
}

export default Register