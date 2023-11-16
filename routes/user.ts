import express from 'express'
import { asyncErrorhandling } from '../middleware/async'
import { userController } from '../controller/user.controller'

const router = express.Router()

router.post('/register', asyncErrorhandling(userController.register))
router.post('/login', asyncErrorhandling(userController.login))

export default router