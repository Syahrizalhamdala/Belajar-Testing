const express = require('express')
const cors = require('cors')
const route  = require('./router/route')
const app = express()

const port = 3000

app.use(cors())
app.use(express.json())
app.use('/siswa',route)

// Hanya jalankan server jika file dijalankan langsung (bukan untuk test)
if (require.main === module) {
    app.listen(port,()=>{
        console.log(`Server berjalan pada port ${port}`)
    })
}

module.exports = app
