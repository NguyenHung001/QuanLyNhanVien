function DanhSachNhanVien() {
    this.mangNV = [];
    this.themNV = function(nv) {
        this.mangNV.push(nv);
    }
    this.timViTri = function(id) {
        var viTri = -1;
        this.mangNV.map(function(nv, index) {
            if(nv.taiKhoan == id) {
                viTri = index;
            }
        });
        return viTri;
    }
    this.xoaNV = function(id) {
        var viTriXoa = this.timViTri(id);
        if(viTriXoa > -1) {
            dsnv.mangNV.splice(viTriXoa, 1);
        }
    }
    this.capNhat = function(nv){
        var viTriCapNhat = this.timViTri(nv.taiKhoan);
        if(viTriCapNhat > -1){
            this.mangNV[viTriCapNhat] = nv;
        }
    };
}