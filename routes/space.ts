import express from 'express'
import { asyncErrorhandling } from '../middleware/async'
import { spaceController } from '../controller/space.controller'
import { refreshAuth } from '../middleware/refreshauth'

const router = express.Router()

router.post('/create', asyncErrorhandling(spaceController.create))
router.get('/', asyncErrorhandling(spaceController.list))

export default router
