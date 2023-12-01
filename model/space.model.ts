import mongoose, { Document, Schema } from 'mongoose'

interface ContactDetails extends Document {
  email: string
  phoneNumber: string
  websiteUrl: string
  socialMedia: {
    twitter?: string
    instagram?: string
    linkedIn?: string
  }
}

interface LocationDetails extends Document {
  locationName: string
  unitFloorNumber?: string
  mainAddress?: string
  secondAddress?: string
  townCity?: string
  neighbourhood?: string
  district?: string
}

interface OperatingHours extends Document {
  mondayToFriday: {
    openingHours: string
    closingHours: string
  }
  saturday?: {
    openingHours?: string
    closingHours?: string
  }
  sunday?: {
    openingHours?: string
    closingHours?: string
  }
}

interface SpaceSize extends Document {
  desks: number
  privateOffices: number
}

interface MeetingRooms extends Document {
  numberOfMeetingRooms: number
  maximumCapacity: number
  nonMemberCanRent: boolean
  nonMemberCanHireForEvent: boolean
  activeHours: string
}

interface Category extends Document {
  desk?: {
    pricePerDay?: number
    dailyAccessHours?: string
  }
  privateOffice?: {
    pricePerDay?: number
    dailyAccessHours?: string
  }
  both?: {
    pricePerDay?: number
    dailyAccessHours?: string
  }
}

interface VirtualOfficeDetails extends Document {
  amenities: string[]
  meetingRooms?: MeetingRooms
}

interface Workspace extends Document {
  userId: string
  name: string
  city: string
  country: string
  startDate: Date
  description: string
  amenities: string[]
  seatingOptions: string[]
  communityOptions: string[]
  contactDetails: ContactDetails
  locationDetails: LocationDetails
  operatingHours: OperatingHours
  spaceSize: SpaceSize
  images: string[]
  category: Category
  numberOfOfficesIncluded?: number
  // disableButton: boolean
  virtualOffice?: boolean
  virtualOfficeDetails?: VirtualOfficeDetails
}

const contactDetailsSchema = new Schema<ContactDetails>({
  userId: {
    type: String,
    // required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  websiteUrl: {
    type: String,
    required: true,
  },
  socialMedia: {
    twitter: String,
    instagram: String,
    linkedIn: String,
  },
})

const locationDetailsSchema = new Schema<LocationDetails>({
  locationName: {
    type: String,
    required: true,
  },
  unitFloorNumber: String,
  mainAddress: String,
  secondAddress: String,
  townCity: String,
  neighbourhood: String,
  district: String,
})

const operatingHoursSchema = new Schema<OperatingHours>({
  mondayToFriday: {
    openingHours: {
      type: String,
      required: true,
    },
    closingHours: {
      type: String,
      required: true,
    },
  },
  saturday: {
    openingHours: String,
    closingHours: String,
  },
  sunday: {
    openingHours: String,
    closingHours: String,
  },
})

const spaceSizeSchema = new Schema<SpaceSize>({
  desks: {
    type: Number,
    required: true,
  },
  privateOffices: {
    type: Number,
    required: true,
  },
})

const meetingRoomsSchema = new Schema<MeetingRooms>({
  numberOfMeetingRooms: {
    type: Number,
    required: true,
  },
  maximumCapacity: {
    type: Number,
    required: true,
  },
  nonMemberCanRent: {
    type: Boolean,
    required: true,
  },
  nonMemberCanHireForEvent: {
    type: Boolean,
    required: true,
  },
  activeHours: {
    type: String,
    required: true,
  },
})

const categorySchema = new Schema<Category>({
  desk: {
    pricePerDay: Number,
    dailyAccessHours: String,
  },
  privateOffice: {
    pricePerDay: Number,
    dailyAccessHours: String,
  },
  both: {
    pricePerDay: Number,
    dailyAccessHours: String,
  },
})

const virtualOfficeDetailsSchema = new Schema<VirtualOfficeDetails>({
  amenities: {
    type: [String],
    required: true,
  },
  meetingRooms: meetingRoomsSchema,
})

const workspaceSchema = new Schema<Workspace>({
  name: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  amenities: {
    type: [String],
    required: true,
  },
  seatingOptions: {
    type: [String],
    required: true,
  },
  communityOptions: {
    type: [String],
    required: true,
  },
  contactDetails: contactDetailsSchema,
  locationDetails: locationDetailsSchema,
  operatingHours: operatingHoursSchema,
  spaceSize: spaceSizeSchema,
  images: {
    type: [String],
    required: true,
  },
  category: categorySchema,
  numberOfOfficesIncluded: Number,
  disableButton: {
    type: Boolean,
    // required: true,
  },
  virtualOffice: Boolean,
  virtualOfficeDetails: virtualOfficeDetailsSchema,
})

const WorkspaceModel = mongoose.model<Workspace>('Workspace', workspaceSchema)

export default WorkspaceModel
