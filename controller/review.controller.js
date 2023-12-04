"use strict";
// import { Request, Response } from 'express'
// import { reviewValidation } from '../validation/review.validation'
// import { reviewService } from '../services/review.service'
// import { ResponseService } from '../services/response.service'
// export const reviewController = {
//   async create(req: Request, res: Response): Promise<{}> {
//     const {user} = req
//     const { value, error } = reviewValidation.create.validate(req.body)
//     if (error) return res.status(400).send({ error: error.details[0].message })
//     value.userId  = user
//     const data = await reviewService.createreview(value)
//     return ResponseService.success(
//       res,
//       'The Workreview is Created, Kindly, wait approval',
//       data,
//     )
//   },
//   async list(req: Request, res: Response): Promise<{}> {
//     const queryParams = {
//       ...req.query,
//     }
//     const data = await reviewService.listreview(queryParams)
//     return ResponseService.success(res, 'Work reviews Successfully Retrieved', data)
//   },
// }
