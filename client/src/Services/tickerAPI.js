import fetcher from "./fetcher";

const tickerAPI = {
  getMovieRap: () => {
    return fetcher.get("QuanLyRap/LayThongTinLichChieuHeThongRap", {
      params: {
        maNhom: "GP06",
      },
    });
  },

  getMovieRapDetail: (movieId) => {
    return fetcher.get("QuanLyRap/LayThongTinLichChieuPhim", {
      params: {
        maPhim: movieId,
      },
    });
  },
};

export default tickerAPI;
