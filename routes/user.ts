import express from 'express'
import { asyncErrorhandling } from '../middleware/async'
import { userController } from '../controller/user.controller'
import {refreshAuth} from '../middleware/refreshauth'

const router = express.Router()

router.post('/register', asyncErrorhandling(userController.register))
router.post('/login', asyncErrorhandling(userController.login))
router.get('/refresh-token', refreshAuth)

export default router