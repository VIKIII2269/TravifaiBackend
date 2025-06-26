import { PrismaClient } from '@prisma/client';
import { Role } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
    await Promise.all([
        prisma.document.deleteMany(),
        prisma.propertyRoom.deleteMany(),
        prisma.propertyInfo.deleteMany(),
        prisma.connectivity.deleteMany(),
        prisma.propertyUSP.deleteMany(),
        prisma.amenities.deleteMany(),
        prisma.mandatoryAmenities.deleteMany(),
        prisma.propertyRules.deleteMany(),
        prisma.propertyStatus.deleteMany(),
    ]);

    await prisma.user.deleteMany();

    const usersData = [
        {
            id: 'user-uuid-001',
            email: 'user1@example.com',
            password: 'hashed_pass_1',
            phone: '1111111111',
            username: 'user1',
            role: Role.HOTELIER,
            propertyInfo: {
                create: {
                    hotelId: 'HID-001',
                    hotelName: 'Hotel Sunrise',
                    businessOwnerName: 'Amit Verma',
                    designation: 'Owner',
                    contact1Phone: '9999999999',
                    contact1Email: 'amit@sunrise.com',
                    locationLocality: 'Connaught Place',
                    locationStreet: 'Main Rd',
                    locationCity: 'Delhi',
                    locationState: 'Delhi',
                    locationCountry: 'India',
                    locationPincode: '110001',
                    propertyType: 'Hotel',
                    propertyRelationship: 'Owner',
                    onLease: false,
                    totalRooms: 25,
                    registerOnOTAs: true,
                    commissionPercentToOTAs: 15.0,
                    uploadIntroVideoUrl: 'https://video.example.com/hotel1.mp4',
                },
            },
            propertyRooms: {
                create: [
                    {
                        roomTypeName: 'Deluxe King',
                        floorNumber: 1,
                        totalRooms: 10,
                        roomType: 'Deluxe',
                        bedType: 'King',
                        roomView: 'City',
                        smokingAllowed: true,
                        extraBedAllowed: true,
                        amenities: ['WiFi', 'TV', 'AC'],
                        baseAdult: 2,
                        maxAdult: 3,
                        maxChildren: 2,
                        maxOccupancy: 5,
                        baseRate: 3500,
                        extraAdultCharge: 600,
                        childCharge: 400,
                        availabilityStart: '2025-06-01',
                        availabilityEnd: '2025-12-31',
                        totalRoomsInProperty: 25,
                        uploadRoomImageUrls: ['https://img.example.com/room1.jpg'],
                    },
                ],
            },
            connectivity: {
                create: {
                    channelManagerUsed: true,
                    connectedWithTravelAgency: true,
                    channelManagerName: 'OYO Partner',
                    travelAgencyName: 'Yatra',
                },
            },
            usp: {
                create: {
                    ageOfProperty: 8,
                    historicalEventAvailable: true,
                    historicalEventDesc: 'Site of Independence event',
                    propertyOwnerDescription: 'A heritage-style luxury hotel in Delhi',
                    nearbyPlaces: ['India Gate', 'Red Fort', 'Jama Masjid'],
                },
            },
            amenities: {
                create: {
                    mandatory: ['WiFi', 'AC'],
                    basicFacilities: ['Power Backup', 'Elevator'],
                    generalServices: ['Reception', '24x7 Security'],
                    outdoorActivities: ['Garden'],
                    commonAreas: ['Lobby'],
                    foodAndDrink: ['Buffet', 'Coffee Shop'],
                    healthWellness: ['Gym'],
                    businessCenter: ['Meeting Room'],
                    beautyAndSpa: ['Spa'],
                },
            },
            mandatoryAmenities: {
                create: {
                    airConditioning: true,
                    laundry: false,
                    newspaper: true,
                    parking: true,
                    roomService: true,
                    smokeDetector: true,
                    smokingRooms: false,
                    swimmingPools: false,
                    wifi: true,
                    lounge: true,
                    reception: true,
                    bar: false,
                },
            },
            rules: {
                create: {
                    coupleRule: 'Allowed',
                    guestRule: 'Only ID holders allowed',
                    otherRule: 'No alcohol',
                    petRule: 'Pets not allowed',
                    checkInTime: '12:00',
                    checkOutTime: '11:00',
                },
            },
            status: {
                create: {
                    status: 'submitted',
                },
            },
            documents: {
                create: [
                    {
                        category: 'PAN Card',
                        fileUrl: 'https://docs.example.com/pan1.pdf',
                    },
                ],
            },
        },
        {
            id: 'user-uuid-004',
            email: 'user4@example.com',
            password: 'hashed_pass_2',
            phone: '2222322223',
            username: 'user4',
            role: Role.TRAVEL_AGENCY,
            propertyInfo: {
                create: {
                    hotelId: 'HID-004',
                    hotelName: 'Hotel Sunset2',
                    businessOwnerName: 'Neha Singh',
                    designation: 'Manager',
                    contact1Phone: '8888888888',
                    contact1Email: 'neha@sunset.com',
                    locationLocality: 'Karol Bagh',
                    locationStreet: 'Ajmal Khan Road',
                    locationCity: 'Delhi',
                    locationState: 'Delhi',
                    locationCountry: 'India',
                    locationPincode: '110005',
                    propertyType: 'Resort',
                    propertyRelationship: 'Manager',
                    onLease: true,
                    totalRooms: 30,
                    registerOnOTAs: true,
                    commissionPercentToOTAs: 12.0,
                    uploadIntroVideoUrl: 'https://video.example.com/hotel2.mp4',
                },
            },
            // ... (rest remains same)
        },
        {
            id: 'user-uuid-002',
            email: 'user2@example.com',
            password: 'hashed_pass_2',
            phone: '2222222222',
            username: 'user2',
            role: Role.TRAVELER,
            propertyInfo: {
                create: {
                    hotelId: 'HID-002',
                    hotelName: 'Green Valley Resort',
                    businessOwnerName: 'Neha Singh',
                    designation: 'Manager',
                    contact1Phone: '8888888888',
                    contact1Email: 'neha@greenvalley.com',
                    locationLocality: 'MG Road',
                    locationStreet: '5th Cross',
                    locationCity: 'Bangalore',
                    locationState: 'Karnataka',
                    locationCountry: 'India',
                    locationPincode: '560001',
                    propertyType: 'Resort',
                    propertyRelationship: 'Manager',
                    onLease: true,
                    totalRooms: 40,
                    registerOnOTAs: true,
                    commissionPercentToOTAs: 12.5,
                    uploadIntroVideoUrl: 'https://video.example.com/hotel2.mp4',
                },
            },
            // ... (rest remains same)
        },
        {
            id: 'user-uuid-003',
            email: 'user3@example.com',
            password: 'hashed_pass_3',
            phone: '3333333333',
            username: 'user3',
            role: Role.TAXI_DRIVER,
            propertyInfo: {
                create: {
                    hotelId: 'HID-003',
                    hotelName: 'Ocean View Inn',
                    businessOwnerName: 'Rajeev Nair',
                    designation: 'Partner',
                    contact1Phone: '7777777777',
                    contact1Email: 'rajeev@oceanview.com',
                    locationLocality: 'Marine Drive',
                    locationStreet: 'Beach Road',
                    locationCity: 'Mumbai',
                    locationState: 'Maharashtra',
                    locationCountry: 'India',
                    locationPincode: '400001',
                    propertyType: 'Guest House',
                    propertyRelationship: 'Partner',
                    onLease: false,
                    totalRooms: 15,
                    registerOnOTAs: true,
                    commissionPercentToOTAs: 10.0,
                    uploadIntroVideoUrl: 'https://video.example.com/hotel3.mp4',
                },
            },
            // ... (rest remains same)
        },
        {
            id: 'user-uuid-005',
            email: 'user5@example.com',
            password: 'hashed_pass_5',
            phone: '5555555555',
            username: 'user5',
            role: Role.ADMIN,
            propertyInfo: {
                create: {
                    hotelId: 'HID-005',
                    hotelName: 'Ocean View Inn',
                    businessOwnerName: 'Rajeev Nair',
                    designation: 'Partner',
                    contact1Phone: '7777777777',
                    contact1Email: 'rajeev@oceanview.com',
                    locationLocality: 'Marine Drive',
                    locationStreet: 'Beach Road',
                    locationCity: 'Mumbai',
                    locationState: 'Maharashtra',
                    locationCountry: 'India',
                    locationPincode: '400001',
                    propertyType: 'Guest House',
                    propertyRelationship: 'Partner',
                    onLease: false,
                    totalRooms: 15,
                    registerOnOTAs: true,
                    commissionPercentToOTAs: 10.0,
                    uploadIntroVideoUrl: 'https://video.example.com/hotel3.mp4',
                },
            },
            // ... (rest remains same)
        },
        {
            id: 'user-uuid-006',
            email: 'user6@example.com',
            password: 'hashed_pass_6',
            phone: '6666666666',
            username: 'user6',
            role: Role.TRAVELER,
            propertyInfo: {
                create: {
                    hotelId: 'HID-006',
                    hotelName: 'Ocean View Inn',
                    businessOwnerName: 'Rajeev Nair',
                    designation: 'Partner',
                    contact1Phone: '7777777777',
                    contact1Email: 'rajeev@oceanview.com',
                    locationLocality: 'Marine Drive',
                    locationStreet: 'Beach Road',
                    locationCity: 'Mumbai',
                    locationState: 'Maharashtra',
                    locationCountry: 'India',
                    locationPincode: '400001',
                    propertyType: 'Guest House',
                    propertyRelationship: 'Partner',
                    onLease: false,
                    totalRooms: 15,
                    registerOnOTAs: true,
                    commissionPercentToOTAs: 10.0,
                    uploadIntroVideoUrl: 'https://video.example.com/hotel3.mp4',
                },
            },
            // ... (rest remains same)
        },
    ];

    for (const userData of usersData) {
        await prisma.user.create({ data: userData });
    }

    console.log('🌱 Seeded multiple users and properties successfully.');
}

main()
    .catch((e) => console.error(e))
    .finally(() => prisma.$disconnect());