let score = 0;

const scenes = {
start:{
speaker:"Chief Delivery",
text:"Hari ini adalah hari pertama Anda sebagai Driver. Apa yang Anda lakukan sebelum berangkat?",
choices:[
{label:"Ambil dokumen dan cek kendaraan",next:"inspection",score:10},
{label:"Langsung berangkat ke kendaraan",next:"wrong1",score:-10}
]
},
wrong1:{
speaker:"Chief Delivery",
text:"Salah! Driver wajib mengambil dokumen dan melakukan pengecekan kendaraan.",
choices:[
{label:"Lanjut",next:"inspection"}
]
},
inspection:{
speaker:"Petugas Inspeksi",
text:"Apakah Anda sudah memeriksa gembok dan segel kendaraan?",
choices:[
{label:"Sudah, saya cek dan pastikan terkunci.",next:"tailgate",score:10},
{label:"Belum perlu dicek.",next:"wrong2",score:-10}
]
},
wrong2:{
speaker:"Petugas Inspeksi",
text:"Salah! Segel dan gembok wajib diperiksa sebelum keluar DC.",
choices:[
{label:"Lanjut",next:"tailgate"}
]
},
tailgate:{
speaker:"Pemegang Shift",
text:"Mas, biar saya saja yang mengoperasikan tailgate.",
choices:[
{label:"Boleh.",next:"wrong3",score:-15},
{label:"Tidak boleh, tailgate hanya dioperasikan driver.",next:"rokok",score:15}
]
},
wrong3:{
speaker:"Narator",
text:"Salah! Pengoperasian tailgate adalah tanggung jawab driver.",
choices:[
{label:"Lanjut",next:"rokok"}
]
},
rokok:{
speaker:"Pemegang Shift",
text:"Di surat jalan tertulis 50 slop rokok, tetapi fisik hanya 48 slop.",
choices:[
{label:"Abaikan saja.",next:"wrong4",score:-20},
{label:"Buat berita acara dan laporkan ke Chief Delivery.",next:"retur",score:20}
]
},
wrong4:{
speaker:"Narator",
text:"Salah! Barang rawan hilang seperti rokok wajib dibuatkan berita acara.",
choices:[
{label:"Lanjut",next:"retur"}
]
},
retur:{
speaker:"Narator",
text:"NRB mencatat 15 koli retur, tetapi Anda hanya menemukan 14 koli.",
choices:[
{label:"Tetap tanda tangan.",next:"ending",score:-20},
{label:"Hitung ulang dan klarifikasi dengan toko.",next:"ending",score:20}
]
},
ending:{
speaker:"Hasil Training",
text:"Training selesai.",
choices:[
{label:"Lihat Hasil",next:null}
]
}
};

let current="start";

function render(){
const scene=scenes[current];
document.getElementById("speaker").innerText=scene.speaker;
document.getElementById("text").innerText=scene.text;
document.getElementById("score").innerText="Skor SOP: "+score;

const choices=document.getElementById("choices");
choices.innerHTML="";

scene.choices.forEach(choice=>{
const btn=document.createElement("button");
btn.innerText=choice.label;
btn.onclick=()=>{
score += choice.score || 0;

if(choice.next===null){
let rank="Training Ulang";
if(score>=40) rank="Driver Teladan";
else if(score>=20) rank="Driver Siap Bertugas";

document.getElementById("speaker").innerText="Penilaian";
document.getElementById("text").innerText=`Skor Anda ${score}. Status: ${rank}`;
choices.innerHTML="";
return;
}

current=choice.next;
render();
};
choices.appendChild(btn);
});
}

render();
