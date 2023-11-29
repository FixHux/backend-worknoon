import Joi from 'joi'

export const spaceValidation = {
  create: Joi.object({
    name: Joi.string().min(5).required(),
    city: Joi.string().required(),
    country: Joi.string().required(),
    startDate: Joi.date().required(),
    description: Joi.string().required(),
    amenities: Joi.array()
      .items(
        Joi.string().valid('High-Speed-Wifi', 'Heating', 'Air Conditioning'),
      )
      .required(),
    seatingOptions: Joi.array()
      .items(
        Joi.string().valid(
          'Standing Desks',
          'Beanbags',
          'Ergonomic Chairs',
          'Hammocks',
          'Bosu Ball Chairs',
        ),
      )
      .required(),
    communityOptions: Joi.array()
      .items(
        Joi.string().valid(
          'Events',
          'Workshops',
          'Community Lunches',
          'Community Drinks',
          'Facebook Group For Members',
          'Slack Channel For Members',
          'Mentorship Programs',
          'Community Apps',
          'Pitching Events',
          'Incubator Programs',
          'Accelerator Programs',
          'Organized Sports Team',
        ),
      )
      .required(),
    contactDetails: Joi.object({
      email: Joi.string().email().required(),
      phoneNumber: Joi.string()
        .pattern(/^[0-9]{1,15}$/)
        .required(),
      websiteUrl: Joi.string().uri().required(),
      socialMedia: Joi.object({
        twitter: Joi.string().uri(),
        instagram: Joi.string().uri(),
        linkedIn: Joi.string().uri(),
      }).or('twitter', 'instagram', 'linkedIn'),
    }).required(),
    locationDetails: Joi.object({
      locationName: Joi.string().required(),
      unitFloorNumber: Joi.string(),
      mainAddress: Joi.string(),
      secondAddress: Joi.string(),
      townCity: Joi.string(),
      neighbourhood: Joi.string(),
      district: Joi.string(),
    }).required(),
    operatingHours: Joi.object({
      mondayToFriday: Joi.object({
        openingHours: Joi.string().required(),
        closingHours: Joi.string().required(),
      }).required(),
      saturday: Joi.object({
        openingHours: Joi.string(),
        closingHours: Joi.string(),
      }),
      sunday: Joi.object({
        openingHours: Joi.string(),
        closingHours: Joi.string(),
      }),
    }).required(),
    spaceSize: Joi.object({
      desks: Joi.number().required(),
      privateOffices: Joi.number().required(),
    }).required(),
    images: Joi.array().items(Joi.string().uri()).min(5).required(),
    category: Joi.object({
      desk: Joi.object({
        pricePerDay: Joi.number(),
        dailyAccessHours: Joi.string(),
      }).required(),
      privateOffice: Joi.object({
        pricePerDay: Joi.number(),
        dailyAccessHours: Joi.string(),
      }).required(),
      both: Joi.object({
        pricePerDay: Joi.number(),
        dailyAccessHours: Joi.string(),
      }).required(),
    }).required(),
    numberOfOfficesIncluded: Joi.number().when(
      Joi.object({ category: Joi.object({ both: Joi.exist() }) }).unknown(),
      { then: Joi.required() },
    ),
    disableButton: Joi.boolean().required(),

    virtualOffice: Joi.boolean(),

    virtualOfficeDetails: Joi.object({
      amenities: Joi.array()
        .items(
          Joi.string().valid(
            'Local Professional Business Address',
            'Use Of Address For Mail Receipt',
            'Business Cards',
            'Licensing',
            'Website',
            'Mail Forwarding Additional',
            'Lobby Greeter',
            'Walk-In Clients',
            'Multiple Meeting Spaces',
            'Worldwide Business Support Center',
            'Private Day Offices',
            'Event Rooms',
            'Client Drop Off/Pick Up Point',
            'Conference Rooms',
            'Mail Notification Included',
          ),
        )
        .required(),
      meetingRooms: Joi.object({
        numberOfMeetingRooms: Joi.number().required(),
        maximumCapacity: Joi.number().required(),
        nonMemberCanRent: Joi.boolean().required(),
        nonMemberCanHireForEvent: Joi.boolean().required(),
        activeHours: Joi.string().required(),
      }).when('virtualOffice', {
        is: true,
        then: Joi.required(),
      }),
    }).when('virtualOffice', {
      is: true,
      then: Joi.required(),
    }),
  }),
}
