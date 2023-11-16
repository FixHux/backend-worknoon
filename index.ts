import { config } from './config'

import app from './app'

import { dbConnection } from './startup/db.js'

dbConnection()

app.listen(config.PORT, () => {
 console.log(`Web server is running ${config.PORT}`)
})