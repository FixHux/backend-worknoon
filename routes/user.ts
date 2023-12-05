import express from 'express'
import multer from 'multer'
import { asyncErrorhandling } from '../middleware/async'
import { userController } from '../controller/user.controller'
import { refreshAuth } from '../middleware/refreshauth'
import {auth } from '../middleware/auth'

import storage from '../utilis/multer'
const upload = multer({ storage });

const router = express.Router()

router.post('/register', asyncErrorhandling(userController.register))
router.post('/verify-token', asyncErrorhandling(userController.verifyToken))
router.post('/login', asyncErrorhandling(userController.login))
router.post(
    '/forgot-password',
    asyncErrorhandling(userController.forgotPassword),
  )
router.post(
  '/reset/password',
  asyncErrorhandling(userController.resetPassword),
)
router.get('/refresh-token', refreshAuth)
router.put('/settings', auth,  upload.single('profileImage'),userController.settings)

export default router
