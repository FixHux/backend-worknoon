"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const contactDetailsSchema = new mongoose_1.Schema({
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
});
const locationDetailsSchema = new mongoose_1.Schema({
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
});
const operatingHoursSchema = new mongoose_1.Schema({
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
});
const spaceSizeSchema = new mongoose_1.Schema({
    desks: {
        type: Number,
        required: true,
    },
    privateOffices: {
        type: Number,
        required: true,
    },
});
const meetingRoomsSchema = new mongoose_1.Schema({
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
});
const categorySchema = new mongoose_1.Schema({
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
});
const virtualOfficeDetailsSchema = new mongoose_1.Schema({
    amenities: {
        type: [String],
        required: true,
    },
    meetingRooms: meetingRoomsSchema,
});
const workspaceSchema = new mongoose_1.Schema({
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
});
const WorkspaceModel = mongoose_1.default.model('Workspace', workspaceSchema);
exports.default = WorkspaceModel;
