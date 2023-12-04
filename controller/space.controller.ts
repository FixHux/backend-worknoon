import { Request, Response } from 'express'
import { spaceValidation } from '../validation/space.validation'
import { spaceService } from '../services/space.service'
import { ResponseService } from '../services/response.service'


export const spaceController = {
  async create(req: Request, res: Response): Promise<{}> {
    const {user} = req
    const { value, error } = spaceValidation.create.validate(req.body)
    if (error) return res.status(400).send({ error: error.details[0].message })
    value.userId  = user
    const data = await spaceService.createSpace(value)
    return ResponseService.success(
      res,
      'The WorkSpace is Created, Kindly, wait approval',
      data,
    )
    
  },

  async list(req: Request, res: Response): Promise<{}> {
    const queryParams = {
      ...req.query,
    }
    const data = await spaceService.listSpace(queryParams)

    return ResponseService.success(res, 'Work Spaces Successfully Retrieved', data)
  },
}
