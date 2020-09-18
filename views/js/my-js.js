$(document).ready(function(){
    getToDay();
    inisialAwal();
});

function getToDay(){
    var hari = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabut'];
    var bulan = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember']
    var date = new Date();
    var hariIni = hari[date.getDay()];
    var bulanIni = bulan[date.getMonth()]
    var dd = date.getDate(), yy = date.getFullYear();

    $('#labelWaktu').text(hariIni +', '+dd+' '+bulanIni+' '+yy);
};

$('#showHidePassword').on('click', function(){
    var tipe = document.getElementById('inputPassword');

    if(tipe.type == 'password'){
        tipe.type = 'text';

        $('#iconPassword').removeClass('fa-eye').addClass('fa-eye-slash');
    }else {
        tipe.type = 'password';

        $('#iconPassword').removeClass('fa-eye-slash').addClass('fa-eye');
    }

    return false;
});

$('#showHidePasswordModal').on('click', function(){
    var tipe = document.getElementById('inputPasswordModal');

    if(tipe.type == 'password'){
        tipe.type = 'text';

        $('#iconPasswordModal').removeClass('fa-eye').addClass('fa-eye-slash');
    }else {
        tipe.type = 'password';

        $('#iconPasswordModal').removeClass('fa-eye-slash').addClass('fa-eye');
    }

    return false;
});

function inisialAwal(){
    var nama = $('#labelNama').text();
    var inisialAwal = nama.charAt(0);

    $('#labelInisial').text(inisialAwal.toUpperCase());
}

function swalError(){
    swal('Gagal!', 'Terjadi kesalahan, coba lagi!', 'error')
    .then((confirm) => {
      if(confirm){
        location.reload();
      }
    });
}

function swalSuccess(method, page){
    var text;
    
    if(method == 'put'){
        text = 'diubah';    
    }
    else if(method == 'post'){
        text = 'ditambahkan';
    }
    else if(method == 'delete'){
        text = 'dihapus'
    }

    return swal('Berhasil!', 'Data '+page+' telah '+text+'!', 'success')
    .then((confirm) => {
      if(confirm){
        location.reload();
      }
    });
}

function labelStatus(status){
    if(status == true){
        return '<span class="badge badge-success" style="width: 70px">Aktif</span>';
    } else{
        return '<span class="badge badge-danger" style="width: 70px">Non Aktif</span>';
    }
}

function cekJurusan(jurusan){
    if(jurusan == null){
        return '<i class="text-danger">Jurusan telah dihapus!</i>'
    }

    return jurusan.nama_jurusan;
}

function getKelas(idKelas){
    $.ajax({
      type: 'GET',
      url: '/spp/kelas',
      contentType: 'application/json',
      success: function(res){
        var selectKelas = $('#selectKelas')

        res.forEach(kelas => {
          selectKelas.append('<option value="'+kelas.id_kelas+'">'+kelas.kelas+' - '+kelas.jurusan.nama_jurusan+'</option>')
        });

        if(idKelas != null){
            selectKelas.val(idKelas).trigger('change')
        }
      }
    });
}

function getSpp(filterSelected, selectedArray){
    $.ajax({
      type: 'GET',
      url: '/spp/manajemen_spp/?status=true',
      contentType: 'application/json',
      success: function(res){
        var inputSpp = $('#inputSpp');
        var selectedSpp = selectedArray;

        res.forEach(spp => {
            if(filterSelected){
                if(!(selectedSpp.includes(spp.id_spp))){
                    inputSpp.append('<option value="'+spp.id_spp+'">'+spp.tahun_ajaran+'</option>');
                }
            } else{
                inputSpp.append('<option value="'+spp.id_spp+'">'+spp.tahun_ajaran+'</option>');
            }
        });

      }
    });
}