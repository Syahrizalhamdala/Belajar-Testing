// Fungsi-fungsi perhitungan sederhana untuk unit test

/**
 * Menghitung penjumlahan dua bilangan
 */
function tambah(a, b) {
  return a + b
}

/**
 * Menghitung pengurangan dua bilangan
 */
function kurang(a, b) {
  return a - b
}

/**
 * Menghitung perkalian dua bilangan
 */
function kali(a, b) {
  return a * b
}

/**
 * Menghitung pembagian dua bilangan
 */
function bagi(a, b) {
  if (b === 0) {
    throw new Error('Tidak bisa dibagi dengan nol')
  }
  return a / b
}

/**
 * Menghitung rata-rata nilai siswa
 */
function hitungRataRata(nilai1, nilai2, nilai3) {
  const total = nilai1 + nilai2 + nilai3
  return total / 3
}

/**
 * Menentukan grade berdasarkan nilai
 */
function tentukanGrade(nilai) {
  if (nilai >= 90) return 'A'
  if (nilai >= 80) return 'B'
  if (nilai >= 70) return 'C'
  if (nilai >= 60) return 'D'
  return 'E'
}

/**
 * Validasi apakah nilai valid (0-100)
 */
function validasiNilai(nilai) {
  if (nilai < 0 || nilai > 100) {
    return false
  }
  return true
}

module.exports = {
  tambah,
  kurang,
  kali,
  bagi,
  hitungRataRata,
  tentukanGrade,
  validasiNilai
}

// Jika file dijalankan langsung (bukan di-require), jalankan contoh
if (require.main === module) {
  console.log('='.repeat(50))
  console.log('MENJALANKAN KALKULATOR.JS')
  console.log('='.repeat(50))
  console.log('')

  // Contoh penggunaan fungsi tambah
  console.log('1. Fungsi Tambah:')
  console.log('   tambah(5, 3) =', tambah(5, 3))
  console.log('   tambah(10, 20) =', tambah(10, 20))
  console.log('')

  // Contoh penggunaan fungsi kurang
  console.log('2. Fungsi Kurang:')
  console.log('   kurang(10, 4) =', kurang(10, 4))
  console.log('')

  // Contoh penggunaan fungsi kali
  console.log('3. Fungsi Kali:')
  console.log('   kali(5, 3) =', kali(5, 3))
  console.log('')

  // Contoh penggunaan fungsi bagi
  console.log('4. Fungsi Bagi:')
  console.log('   bagi(10, 2) =', bagi(10, 2))
  console.log('')

  // Contoh penggunaan hitungRataRata
  console.log('5. Fungsi Hitung Rata-Rata:')
  const rataRata = hitungRataRata(80, 85, 90)
  console.log('   hitungRataRata(80, 85, 90) =', rataRata)
  console.log('')

  // Contoh penggunaan tentukanGrade
  console.log('6. Fungsi Tentukan Grade:')
  console.log('   tentukanGrade(95) =', tentukanGrade(95))
  console.log('   tentukanGrade(85) =', tentukanGrade(85))
  console.log('   tentukanGrade(75) =', tentukanGrade(75))
  console.log('')

  // Contoh penggunaan validasiNilai
  console.log('7. Fungsi Validasi Nilai:')
  console.log('   validasiNilai(50) =', validasiNilai(50))
  console.log('   validasiNilai(150) =', validasiNilai(150))
  console.log('')

  // Contoh penggunaan gabungan
  console.log('='.repeat(50))
  console.log('CONTOH PENGGUNAAN GABUNGAN:')
  console.log('='.repeat(50))
  const nilai1 = 80
  const nilai2 = 85
  const nilai3 = 90
  const rataRataSiswa = hitungRataRata(nilai1, nilai2, nilai3)
  const gradeSiswa = tentukanGrade(rataRataSiswa)
  
  console.log(`Nilai siswa: ${nilai1}, ${nilai2}, ${nilai3}`)
  console.log(`Rata-rata: ${rataRataSiswa}`)
  console.log(`Grade: ${gradeSiswa}`)
  console.log('')

  console.log('='.repeat(50))
  console.log('SELESAI!')
  console.log('='.repeat(50))
}

