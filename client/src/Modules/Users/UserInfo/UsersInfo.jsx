import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { useForm, Controller } from "react-hook-form"
import swal from "sweetalert"

import { notification, Col, Row, Button } from "antd"
import TextField from '../../../Components/TextField';

import { updateUserClient, getUserInfo } from "../../../Slices/userSlice"

import "./usersInfo.scss"


const UsersInfo = () => {
  const dispatch = useDispatch();
  const { user: userInfo, isloading } = useSelector(state => state.user)


  useEffect(() => {
    reset({
      taiKhoan: userInfo?.taiKhoan,
      matKhau: userInfo?.matKhau,
      email: userInfo?.email,
      soDt: userInfo?.soDT,
      hoTen: userInfo?.hoTen,
      maLoaiNguoiDung: userInfo?.maLoaiNguoiDung,
    });
    // eslint-disable-next-line
  }, [userInfo]);

  const {
    reset,
    control,
    handleSubmit,
  } = useForm({
    defaultValues: {
      taiKhoan: "",
      matKhau: "",
      email: "",
      soDt: "",
      hoTen: "",
      maLoaiNguoiDung: "",
    },
    mode: "onTouched",
  });

  const onSubmit = async (values) => {
    try {
      await dispatch(updateUserClient(values)).unwrap();
      await dispatch(getUserInfo()).unwrap();
      await swal("Cập Nhật Thành Công!", "You clicked the 'OK'!", "success");
    } catch (error) {
      notification.error({
        message: "Cập nhật thất bại",
        description: error,
      });
    }
  };
  return (
    <div className='user_update'>
      <h1 className='user_title'> Thông Tin Người Dùng</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Row gutter={[16, 16]}>
          <Col span={24} lg={12}>
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
          <Col span={24} lg={12}>
            <Controller
              name="matKhau"
              control={control}
              rules={{
                required: {
                  value: true,
                  message: "Mật khẩu không được để trống",
                }
                // minLength: {
                //   value: 4,
                //   message: "Mật khẩu phải từ 4 đến 8 ký tự",
                // },
                // maxLength: {
                //   value: 8,
                //   message: "Mật khẩu phải từ 4 đến 8 ký tự",
                // },
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
          <Col span={24} lg={12}>
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
          <Col span={24} lg={12}>
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
          <Col span={24} lg={12}>
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
          className="update-button"
          type="primary"
          htmlType="submit"
          disabled={isloading}
          loading={isloading}
        >
          Cập nhật
        </Button>
      </form>
    </div>
  )
}

export default UsersInfo