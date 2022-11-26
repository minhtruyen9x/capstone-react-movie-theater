import fetcher from "./fetcher";

const ticketboxAPI = {
  getTicket: (ticketId) => {
    return fetcher.get("/QuanLyDatVe/LayDanhSachPhongVe", {
      params: {
        MaLichChieu: ticketId,
      },
    });
  },

  bookingTicket:(infoBooking) => {
    return fetcher.post("/QuanLyDatVe/DatVe", infoBooking)
  }
};

export default ticketboxAPI