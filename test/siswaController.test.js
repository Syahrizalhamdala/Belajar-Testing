const request = require('supertest')
const app = require('../index')
const conn = require('../config/connection')

describe('siswaController', () => {
  describe('GET /siswa', () => {
    test('should get list of siswa', async () => {
      const response = await request(app).get('/siswa')
      expect(response.statusCode).toBe(200)
      expect(response.body).toHaveProperty('status', true)
    })
  })

  describe('POST /siswa', () => {
    test('should insert new siswa', async () => {
      const response = await request(app)
        .post('/siswa')
        .query({
          nama: 'Yulhan',
          umur: 45,
          alamat: 'Jl. Situgunung Km. 6',
        })

      expect(response.statusCode).toBe(200)
      expect(response.body).toHaveProperty('status', true)
    })
  })

  describe('PUT /siswa/:id', () => {
    let insertedId

    beforeAll(async () => {
      const insertQuery =
        "INSERT INTO tbl_siswa (nama, umur, alamat) VALUES ('Yulhan', 30, 'Sukabumi')"
      const insertResult = await new Promise((resolve) => {
        conn.query(insertQuery, (err, result) => {
          if (err) {
            console.error('Insert Error:', err)
          }
          resolve(result)
        })
      })
      insertedId = insertResult.insertId
    })

    afterAll(async () => {
      const deleteQuery = `DELETE FROM tbl_siswa WHERE id = ${insertedId}`
      await new Promise((resolve) => {
        conn.query(deleteQuery, () => {
          resolve()
        })
      })
    })

    test('should update a student', async () => {
      const response = await request(app)
        .put(`/siswa/${insertedId}`)
        .query({
          nama: 'Alun',
          umur: 20,
          alamat: 'Malang',
        })

      expect(response.statusCode).toBe(200)
      expect(response.body).toHaveProperty('status', true)
      expect(response.body).toHaveProperty('msg', 'Successfull Updated')

      // Cek apakah data telah diubah di database
      const selectQuery = `SELECT * FROM tbl_siswa WHERE id = ${insertedId}`
      const selectResult = await new Promise((resolve) => {
        conn.query(selectQuery, (err, result) => {
          resolve(result)
        })
      })

      expect(selectResult.length).toBe(1)
      expect(selectResult[0].nama).toBe('Alun')
      expect(selectResult[0].umur).toBe(20)
      expect(selectResult[0].alamat).toBe('Malang')
    })
  })

  describe('DELETE /siswa/:id', () => {
    let insertedId

    beforeAll(async () => {
      const insertQuery =
        "INSERT INTO tbl_siswa (nama, umur, alamat) VALUES ('Test', 25, 'Jl. Test')"
      const insertResult = await new Promise((resolve) => {
        conn.query(insertQuery, (err, result) => {
          if (err) {
            console.error('Insert Error:', err)
          }
          insertedId = result.insertId
          resolve()
        })
      })
    })

    test('should delete a student', async () => {
      const response = await request(app).delete(`/siswa/${insertedId}`)

      expect(response.statusCode).toBe(200)
      expect(response.body).toHaveProperty('status', true)
      expect(response.body).toHaveProperty('msg', 'Delete Successfull')

      // Pastikan data telah dihapus di database
      const selectQuery = `SELECT * FROM tbl_siswa WHERE id = ${insertedId}`
      const selectResult = await new Promise((resolve) => {
        conn.query(selectQuery, (err, result) => {
          resolve(result)
        })
      })

      expect(selectResult.length).toBe(0)
    })
  })
})

// Tutup koneksi database setelah semua test selesai
afterAll((done) => {
  conn.end(() => {
    done()
  })
})
