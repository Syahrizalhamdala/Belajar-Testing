const {
  tambah,
  kurang,
  kali,
  bagi,
  hitungRataRata,
  tentukanGrade,
  validasiNilai
} = require('./utils/kalkulator')

describe('Unit Test - Kalkulator Sederhana', () => {
  
  describe('Fungsi tambah', () => {
    test('harus mengembalikan hasil penjumlahan yang benar', () => {
      // ARRANGE: Siapkan data
      const a = 5
      const b = 3

      // ACT: Panggil fungsi
      const hasil = tambah(a, b)

      // ASSERT: Verifikasi hasil
      expect(hasil).toBe(8)
    })

    test('harus menangani bilangan negatif', () => {
      expect(tambah(-5, 3)).toBe(-2)
      expect(tambah(5, -3)).toBe(2)
    })
  })

  describe('Fungsi kurang', () => {
    test('harus mengembalikan hasil pengurangan yang benar', () => {
      expect(kurang(10, 4)).toBe(6)
      expect(kurang(5, 8)).toBe(-3)
    })
  })

  describe('Fungsi kali', () => {
    test('harus mengembalikan hasil perkalian yang benar', () => {
      expect(kali(5, 3)).toBe(15)
      expect(kali(4, 0)).toBe(0)
      expect(kali(-2, 5)).toBe(-10)
    })
  })

  describe('Fungsi bagi', () => {
    test('harus mengembalikan hasil pembagian yang benar', () => {
      expect(bagi(10, 2)).toBe(5)
      expect(bagi(15, 3)).toBe(5)
    })

    test('harus throw error jika dibagi dengan nol', () => {
      expect(() => {
        bagi(10, 0)
      }).toThrow('Tidak bisa dibagi dengan nol')
    })
  })

  describe('Fungsi hitungRataRata', () => {
    test('harus menghitung rata-rata nilai dengan benar', () => {
      // ARRANGE
      const nilai1 = 80
      const nilai2 = 85
      const nilai3 = 90

      // ACT
      const rataRata = hitungRataRata(nilai1, nilai2, nilai3)

      // ASSERT
      expect(rataRata).toBe(85) // (80 + 85 + 90) / 3 = 85
    })

    test('harus menghitung rata-rata nilai desimal', () => {
      const hasil = hitungRataRata(70, 80, 90)
      expect(hasil).toBe(80)
    })
  })

  describe('Fungsi tentukanGrade', () => {
    test('harus mengembalikan A untuk nilai >= 90', () => {
      expect(tentukanGrade(95)).toBe('A')
      expect(tentukanGrade(90)).toBe('A')
    })

    test('harus mengembalikan B untuk nilai >= 80', () => {
      expect(tentukanGrade(85)).toBe('B')
      expect(tentukanGrade(80)).toBe('B')
    })

    test('harus mengembalikan C untuk nilai >= 70', () => {
      expect(tentukanGrade(75)).toBe('C')
      expect(tentukanGrade(70)).toBe('C')
    })

    test('harus mengembalikan D untuk nilai >= 60', () => {
      expect(tentukanGrade(65)).toBe('D')
      expect(tentukanGrade(60)).toBe('D')
    })

    test('harus mengembalikan E untuk nilai < 60', () => {
      expect(tentukanGrade(50)).toBe('E')
      expect(tentukanGrade(0)).toBe('E')
    })
  })

  describe('Fungsi validasiNilai', () => {
    test('harus mengembalikan true untuk nilai valid (0-100)', () => {
      expect(validasiNilai(0)).toBe(true)
      expect(validasiNilai(50)).toBe(true)
      expect(validasiNilai(100)).toBe(true)
    })

    test('harus mengembalikan false untuk nilai di bawah 0', () => {
      expect(validasiNilai(-1)).toBe(false)
      expect(validasiNilai(-10)).toBe(false)
    })

    test('harus mengembalikan false untuk nilai di atas 100', () => {
      expect(validasiNilai(101)).toBe(false)
      expect(validasiNilai(150)).toBe(false)
    })
  })
})

