import Space from '../model/space.model'

export const spaceRepository = {
  async createSpace(createSpace: {}) {
    const data = await Space.create(createSpace)
    return data
  },
}
