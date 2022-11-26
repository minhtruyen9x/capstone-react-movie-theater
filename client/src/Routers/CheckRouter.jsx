import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import swal from 'sweetalert';

const CheckRouter = ({ children }) => {
  const { user } = useSelector((state) => state.auth);
  const location = useLocation()

  if (!user) {
    const url = `/login?redirectUrl=${location.pathname}`
    swal("Vui lòng đăng nhập để đặt vé!", "You clicked the button!", "warning")
    return <Navigate to={url} replace />
  }
  return children
}

export default CheckRouter