//* Lấy ELE bằng id
function getELE(id) {
    return document.getElementById(id);
}

//!=============================================================================>
//* Danh sách nhân viên
const dsnv = new DanhSachNhanVien();

//!=============================================================================>
//* Lưu trữ Local Storage
function setLocalStorage() {
    localStorage.setItem('Danh sách NV', JSON.stringify(dsnv.mangNV));
}

//!=============================================================================>
//* Lấy dữ liệu từ Local Storage
function getLocalStorage() {
    if (localStorage.getItem('Danh sách NV') != null) {
        dsnv.mangNV = JSON.parse(localStorage.getItem('Danh sách NV'));
        hienThiTable(dsnv.mangNV);
    }
}
getLocalStorage();

//!=============================================================================>
//* Thêm nhân viên
getELE('btnThemNV').onclick = function() {

//---------Lấy value từ form---------//
    var taiKhoan = getELE('tknv').value;
    var tenNV = getELE('name').value;
    var email  = getELE('email').value;
    var password = getELE('password').value;
    var ngayLam = getELE('datepicker').value;
    var luongCB = Number(getELE('luongCB').value);
    var chucVu = getELE('chucvu').value;
    var gioLam = Number(getELE('gioLam').value);
    var isValid = true;

    //? kiểm tra tài khoản
    isValid &= validation.kiemTraRong(taiKhoan, 'tbTKNV', 'Tài khoản không được bỏ trống!') && validation.kiemTraTrung(taiKhoan, 'tbTKNV', 'Tài khoản không được trùng', dsnv.mangNV);

    //? kiểm tra tên nhân viên
    isValid &= validation.kiemTraRong(tenNV, 'tbTen', 'Tên nhân viên không được bỏ trống!') && validation.kiemTraTen(tenNV, 'tbTen', 'Tên không được chứa kí tự đặc biệt!');

    //? kiểm tra email
    isValid &= validation.kiemTraRong(email, 'tbEmail', 'Email không được bỏ trống!') && validation.kiemTraEmail(email, 'tbEmail', 'Email không đúng định dạng!');

    //? kiểm tra pass
    isValid &= validation.kiemTraRong(password, 'tbMatKhau', 'Mật khẩu không được bỏ trống!') && validation.kiemTraPass(password, 'tbMatKhau', 'Mật khẩu phải chứa 6-10 kí tự!');

    //? kiểm tra chức vụ
    isValid &= validation.kiemTraChucVu('chucVu', 'tbChucVu', 'Chưa chọn chức vụ!');

    if(isValid) {
    //---------Nhân Viên----------//
        var nv = new NhanVien(taiKhoan, tenNV, email, password, ngayLam, luongCB, chucVu, gioLam);
        nv.xepLoaiNV();
        nv.tinhTongLuong();
        
    //--------Thêm nhân viên vào mảng-------//
        dsnv.themNV(nv);
        
    //--------Local Storage--------//
        setLocalStorage();
        getLocalStorage();
        
    //--------Hiển thị danh sánh--------//
        hienThiTable();
    }

}

//!=============================================================================>
//* Hiển thị table
function hienThiTable() {
    var content = '';
    dsnv.mangNV.map(function(nv) {
        content += `<tr>
            <td>${nv.taiKhoan}</td>
            <td>${nv.tenNV}</td>
            <td>${nv.email}</td>
            <td>${nv.ngayLam}</td>
            <td>${nv.chucVu}</td>
            <td>${(nv.tongLuong).toLocaleString()}</td>
            <td>${nv.xepLoai}</td>
            <td>
                <button class="btn btn-success" onclick="hienThiChiTiet('${nv.taiKhoan}')" data-toggle="modal" data-target="#myModal">Update</button>
                <button class="btn btn-danger" onclick="xoaNhanVien('${nv.taiKhoan}')">Delete</button>
            </td>
        </tr>`
    });
    getELE('tableDanhSach').innerHTML = content;
}

//!=============================================================================>
//* Xóa nhân viên
function xoaNhanVien(id) {
    dsnv.xoaNV(id);
    hienThiTable();
    setLocalStorage();
    getLocalStorage();
}

//!=============================================================================>
//* Hiển thị chi tiết
function hienThiChiTiet(id) {
    var viTri = dsnv.timViTri(id);
    if(viTri > -1) {
        getELE('tknv').value = dsnv.mangNV[viTri].taiKhoan;
        getELE('tknv').disabled = true;
        getELE('name').value = dsnv.mangNV[viTri].tenNV;
        getELE('email').value = dsnv.mangNV[viTri].email;
        getELE('password').value = dsnv.mangNV[viTri].password;
        getELE('datepicker').value = dsnv.mangNV[viTri].ngayLam;
        getELE('luongCB').value = dsnv.mangNV[viTri].luongCB;
        getELE('chucvu').value = dsnv.mangNV[viTri].chucVu;
        getELE('giolam').value = dsnv.mangNV[viTri].gioLam;
    }
}

//!=============================================================================>
//* Cập nhật nhân viên
getELE('btnCapNhat').onclick = function() {
    var taiKhoan = getELE('tknv').value;
    var tenNV = getELE('name').value;
    var email  = getELE('email').value;
    var password = getELE('password').value;
    var ngayLam = getELE('datepicker').value;
    var luongCB = Number(getELE('luongCB').value);
    var chucVu = getELE('chucvu').value;
    var gioLam = Number(getELE('gioLam').value);
    var nv = new NhanVien(taiKhoan, tenNV, email, password, ngayLam, luongCB, chucVu, gioLam);
    nv.xepLoaiNV();
    nv.tinhTongLuong();
    dsnv.capNhat(nv);
    setLocalStorage();
    getLocalStorage();
}
