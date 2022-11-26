import { useState } from 'react'
import dayjs from 'dayjs';
import { Table } from 'antd';

import "./userbook.scss"
const { Column } = Table;

const UsersBook = ({ userInfo }) => {
	const [currentPage, setCurrentPage] = useState(1)
	return (
		<div className="user-history">
			<h1 className="user-history-title">Lịch sử đặt vé</h1>
			<div className="user-history-booking">
				<Table className="table"
					rowKey="maVe"
					bordered
					dataSource={userInfo?.thongTinDatVe}
					pagination={{
						pageSize: 4,
						onChange(current) {
							setCurrentPage(current);
						}
					}}
					scroll={{ x: 1000 }}
				>
					<Column
						title="STT"
						width={50}
						render={(id, record, index) => <span>{(currentPage - 1) * 4 + index + 1}</span>}
					/>
					<Column
						title="Tên Phim"
						dataIndex="tenPhim"
					/>
					<Column
						title="Thời Lượng Phim"
						dataIndex="thoiLuongPhim"
						width={150}
						render={(thoiLuongPhim) => thoiLuongPhim + " phút"}
					/>
					<Column
						title="Tên Rạp"
						dataIndex="danhSachGhe"
						width={100}
						render={(danhSachGhe) => danhSachGhe.slice(0, 1).map((item) => item.tenRap)}
					/>
					<Column
						title="Ngày Đặt"
						dataIndex="ngayDat"
						width={100}
						render={(ngayDat) => dayjs(ngayDat).format("DD/MM/YYYY")}

					/>
					<Column
						title="Mã Vé"
						dataIndex="maVe"
					/>
					<Column
						title="Tên Ghế"
						dataIndex="danhSachGhe"
						width={150}
						render={(danhSachGhe) => danhSachGhe.map((item) => item.tenGhe + ", ")}
					/>
					<Column
						title="Giá Vé"
						dataIndex="giaVe"
						width={100}
						render={(giaVe) => Number(giaVe).toLocaleString() + " đ"}
					/>
					<Column
						title="Tổng Tiền"
						dataIndex="Tổng Tiền"
						width={150}
						render={(_, { giaVe, danhSachGhe }) => (
							<span>{Number(giaVe * danhSachGhe.length).toLocaleString() + " đ"}</span>
						)}
					/>
				</Table>
			</div>
		</div>
	)
}

export default UsersBook