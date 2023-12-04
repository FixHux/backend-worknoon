import Space from '../model/space.model'

export const spaceRepository = {
  async createSpace(createSpace: {}) {
    const data = await Space.create(createSpace)
    return data
  },

  async listSpace(queryParams: any) {
    const perPage = 10
    const page = parseInt(queryParams.page as string) || 1
    const skip = (page - 1) * perPage

    const [space, total] = await Promise.all([
      Space.find(queryParams)
        .skip(skip)
        .limit(perPage)
        .select('-_id -__v')
        .exec(),
      Space.countDocuments(queryParams).exec(),
    ])
    const meta = {
      total,
      page,
      perPage,
      hasMore: total > page * perPage,
      nextPage: total > page * perPage ? page + 1 : null,
    }

    return { space, meta }
  },
}
