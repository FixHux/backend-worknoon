import express from 'express'
import { asyncErrorhandling } from '../middleware/async'
import { spaceController } from '../controller/space.controller'


const router = express.Router()

router.post('/create', asyncErrorhandling(spaceController.create))

export default router
