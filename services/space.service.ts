import { spaceRepository } from '../repositories/space.repositories'

export const spaceService = {
  async createSpace(createSpace: {}) {
    const workspace = await spaceRepository.createSpace(createSpace)
    return workspace
  },
}
