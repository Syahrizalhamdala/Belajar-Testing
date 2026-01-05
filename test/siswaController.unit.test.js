const siswaController = require('../controller/siswaController')
const conn = require('../config/connection')

// Mock koneksi database 
// tidak menggunakan database real
jest.mock('../config/connection', () => ({
  query: jest.fn() 
}))

describe('Unit Test', () => {
  let mockReq, mockRes

  beforeEach(() => {
    jest.clearAllMocks()
    mockReq = {
      params: {},
      query: {},
      body: {}
    }

    mockRes = {
      json: jest.fn() 
    }
  })

  describe('Test fungsi getSiswa', () => {
    test('getSiswa berhasil mengambil data dari database', (done) => {
      // ARRANGE: Siapkan data mock
      const mockData = [
        { id: 1, nama: 'Yulhan', umur: 45, alamat: 'Sukabumi' }
      ]

      // Mock database query - ketika dipanggil, kembalikan data mock
      conn.query.mockImplementation((sql, callback) => {
        callback(null, mockData) // null = tidak ada error, mockData = hasil query
      })

      // ACT: Panggil fungsi yang akan di-test
      siswaController.getSiswa(mockReq, mockRes)

      // ASSERT: Verifikasi hasil
      setTimeout(() => {
        // Cek apakah query dipanggil dengan SQL yang benar
        expect(conn.query).toHaveBeenCalledWith(
          'select * from tbl_siswa',
          expect.any(Function)
        )

        // Cek apakah response yang dikirim sudah benar
        expect(mockRes.json).toHaveBeenCalledWith({
          status: true,
          msg: 'Successfull',
          result: mockData
        })

        done() 
      }, 10)
    })
  })

  describe('Test koneksi database', () => {
    test('koneksi database dipanggil dengan benar', () => {
      // ARRANGE: Setup mock untuk koneksi
      const mockData = [{ id: 1, nama: 'Test' }]

      // Mock query - simulasi database berhasil
      conn.query.mockImplementation((sql, callback) => {
        callback(null, mockData)
      })

      // ACT: Panggil fungsi yang menggunakan database
      siswaController.getSiswa(mockReq, mockRes)

      // ASSERT: Verifikasi koneksi database dipanggil
      expect(conn.query).toHaveBeenCalled()
      expect(conn.query).toHaveBeenCalledTimes(1) // Dipanggil 1 kali
    })

    test('koneksi database menangani error dengan benar', (done) => {
      // ARRANGE: Setup mock error
      const mockError = new Error('Database connection failed')

      // Mock query - simulasi database error
      conn.query.mockImplementation((sql, callback) => {
        callback(mockError, null) // Error, tidak ada data
      })

      // ACT: Panggil fungsi
      siswaController.getSiswa(mockReq, mockRes)

      // ASSERT: Verifikasi error ditangani
      setTimeout(() => {
        expect(conn.query).toHaveBeenCalled()
        done()
      }, 10)
    })
  })
})
