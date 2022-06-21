function NhanVien(taiKhoan, tenNV, email, password, ngayLam, luongCB, chucVu, gioLam, xepLoai) {
    this.taiKhoan = taiKhoan;
    this.tenNV = tenNV;
    this.email = email;
    this.password = password;
    this.ngayLam = ngayLam;
    this.luongCB = luongCB;
    this.chucVu = chucVu;
    this.gioLam = gioLam;
    this.tongLuong = 0;
    this.xepLoai = '';
    this.tinhTongLuong = function() {
        (this.chucVu == 'Sếp') ? this.tongLuong = this.luongCB * 3 :
        (this.chucVu == 'Trưởng phòng') ? this.tongLuong = this.luongCB * 2 :
        this.tongLuong = this.luongCB;
    }
    this.xepLoaiNV = function() {
        (this.gioLam < 160) ?  this.xepLoai = 'Trung bình' :
        (this.gioLam >= 160 && this.gioLam < 176) ? this.xepLoai = 'Khá' :
        (this.gioLam >= 176 && this.gioLam < 192) ? this.xepLoai = 'Giỏi' :
        this.xepLoai = 'Xuất sắc';
    }
}
