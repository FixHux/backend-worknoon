"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.spaceValidation = void 0;
const joi_1 = __importDefault(require("joi"));
exports.spaceValidation = {
    create: joi_1.default.object({
        name: joi_1.default.string().min(5).required(),
        city: joi_1.default.string().required(),
        country: joi_1.default.string().required(),
        startDate: joi_1.default.date().required(),
        description: joi_1.default.string().required(),
        amenities: joi_1.default.array()
            .items(joi_1.default.string().valid('High-Speed-Wifi', 'Heating', 'Air Conditioning'))
            .required(),
        seatingOptions: joi_1.default.array()
            .items(joi_1.default.string().valid('Standing Desks', 'Beanbags', 'Ergonomic Chairs', 'Hammocks', 'Bosu Ball Chairs'))
            .required(),
        communityOptions: joi_1.default.array()
            .items(joi_1.default.string().valid('Events', 'Workshops', 'Community Lunches', 'Community Drinks', 'Facebook Group For Members', 'Slack Channel For Members', 'Mentorship Programs', 'Community Apps', 'Pitching Events', 'Incubator Programs', 'Accelerator Programs', 'Organized Sports Team'))
            .required(),
        contactDetails: joi_1.default.object({
            email: joi_1.default.string().email().required(),
            phoneNumber: joi_1.default.string()
                .pattern(/^[0-9]{1,15}$/)
                .required(),
            websiteUrl: joi_1.default.string().uri().required(),
            socialMedia: joi_1.default.object({
                twitter: joi_1.default.string().uri(),
                instagram: joi_1.default.string().uri(),
                linkedIn: joi_1.default.string().uri(),
            }).or('twitter', 'instagram', 'linkedIn'),
        }).required(),
        locationDetails: joi_1.default.object({
            locationName: joi_1.default.string().required(),
            unitFloorNumber: joi_1.default.string(),
            mainAddress: joi_1.default.string(),
            secondAddress: joi_1.default.string(),
            townCity: joi_1.default.string(),
            neighbourhood: joi_1.default.string(),
            country: joi_1.default.string(),
            district: joi_1.default.string(),
        }).required(),
        operatingHours: joi_1.default.object({
            mondayToFriday: joi_1.default.object({
                openingHours: joi_1.default.string().required(),
                closingHours: joi_1.default.string().required(),
            }).required(),
            saturday: joi_1.default.object({
                openingHours: joi_1.default.string(),
                closingHours: joi_1.default.string(),
            }),
            sunday: joi_1.default.object({
                openingHours: joi_1.default.string(),
                closingHours: joi_1.default.string(),
            }),
        }).required(),
        spaceSize: joi_1.default.object({
            desks: joi_1.default.number().required(),
            privateOffices: joi_1.default.number().required(),
        }).required(),
        images: joi_1.default.array().items(joi_1.default.string().uri()).min(5).required(),
        category: joi_1.default.object({
            desk: joi_1.default.object({
                pricePerDay: joi_1.default.number(),
                dailyAccessHours: joi_1.default.string(),
            }).required(),
            privateOffice: joi_1.default.object({
                pricePerDay: joi_1.default.number(),
                dailyAccessHours: joi_1.default.string(),
            }).required(),
            both: joi_1.default.object({
                pricePerDay: joi_1.default.number(),
                dailyAccessHours: joi_1.default.string(),
            }).required(),
        }).required(),
        numberOfOfficesIncluded: joi_1.default.number().when(joi_1.default.object({ category: joi_1.default.object({ both: joi_1.default.exist() }) }).unknown(), { then: joi_1.default.required() }),
        // disableButton: Joi.boolean().required(),
        virtualOffice: joi_1.default.boolean(),
        virtualOfficeDetails: joi_1.default.object({
            amenities: joi_1.default.array()
                .items(joi_1.default.string().valid('Local Professional Business Address', 'Use Of Address For Mail Receipt', 'Business Cards', 'Licensing', 'Website', 'Mail Forwarding Additional', 'Lobby Greeter', 'Walk-In Clients', 'Multiple Meeting Spaces', 'Worldwide Business Support Center', 'Private Day Offices', 'Event Rooms', 'Client Drop Off/Pick Up Point', 'Conference Rooms', 'Mail Notification Included'))
                .required(),
            meetingRooms: joi_1.default.object({
                numberOfMeetingRooms: joi_1.default.number().required(),
                maximumCapacity: joi_1.default.number().required(),
                nonMemberCanRent: joi_1.default.boolean().required(),
                nonMemberCanHireForEvent: joi_1.default.boolean().required(),
                activeHours: joi_1.default.string().required(),
            }).when('virtualOffice', {
                is: true,
                then: joi_1.default.required(),
            }),
        }).when('virtualOffice', {
            is: true,
            then: joi_1.default.required(),
        }),
    }),
};
