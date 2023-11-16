import { config } from './config'

import app from './app'

import { dbConnection } from './startup/db'

dbConnection()

app.listen(config.PORT, () => {
 console.log(`Web server is running ${config.PORT}`)
})