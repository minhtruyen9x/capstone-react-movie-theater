import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useSearchParams, useLocation } from "react-router-dom"
import swal from "sweetalert";

import { notification, Col, Row } from "antd"

import { login } from "../../../Slices/authSlice"

import TextField from '../../../Components/TextField';
import "./Login.scss"

const Login = () => {
  const { state } = useLocation()
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams()
  const { user, isloading } = useSelector((state) => state.auth);
  const { control, handleSubmit, setValue } = useForm({
    defaultValues: { taiKhoan: "", matKhau: "" },
    mode: "onTouched",
  })

  useEffect(() => {
    if (state) {
      for (const [key, value] of Object.entries(state)) {
        setValue(key, value)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onSubmit = async (values) => {
    try {
      await dispatch(login(values)).unwrap();
      await swal("Đăng Nhập Thành Công!", "You clicked the 'OK'!", "success");
    } catch (error) {
      notification.open({
        message: "Đăng nhập thất bại",
        description: error,
      });
    }
  }

  if (user) {
    const redirectUrl = searchParams.get("redirectUrl")
    return <Navigate to={redirectUrl || "/"} replace />;
  }

  return (
    <div className='login'>
      <h1 className='login_title'>
        Đăng nhập
      </h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Row gutter={[0, 16]}>
          <Col span={24}>
            <Controller
              name="taiKhoan"
              control={control}
              rules={{
                required: {
                  value: true,
                  message: "Tài khoản Không Được Để Trống",
                },
              }}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  {...field}
                  label="Username"
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
                  message: "Vui lòng nhập mật khẩu",
                },
                minLength: {
                  value: 5,
                  message: "Mật khẩu phải từ 5 đến 10 ký tự",
                },
                maxLength: {
                  value: 10,
                  message: "Mật khẩu phải từ 5 đến 10 ký tự",
                },
              }}

              render={({ field, fieldState: { error } }) => (
                <TextField
                  {...field}
                  label="Password"
                  error={error?.message}
                />
              )}
            />
          </Col>
        </Row>
        <button
          className="login_button"
          type="submit"
          disabled={isloading}
        >
          Đăng Nhập
        </button>
        <div className='login_link'>
          Bạn chưa có tài khoản?
          <Link to="/register" type="primary">
            Đăng ký
          </Link>
        </div>
      </form>
    </div >
  )
}

export default Login