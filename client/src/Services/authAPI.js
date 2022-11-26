import fetcher from "./fetcher";

const authAPI = {
  login: (values) => {
    return fetcher.post("/QuanLyNguoiDung/DangNhap", values);
  },

  register: (values) => {
    return fetcher.post("/QuanLyNguoiDung/DangKy", {
      ...values,
      maNhom: "GP06",
    });
  },

  updateUserClient: (values) => {
    return fetcher.put("/QuanLyNguoiDung/CapNhatThongTinNguoiDung", {
      ...values,
      maNhom: "GP06",
    });
  },

  getUsersInfo: () => {
    return fetcher.post("/QuanLyNguoiDung/ThongTinTaiKhoan");
  },
};
export default authAPI;
