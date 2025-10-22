import { faker } from '@faker-js/faker';
import dotenv from 'dotenv';
import connectDB from '../config/database';
import User from '../models/User';
import Listing from '../models/Listing';
import Booking from '../models/Booking';
import Review from '../models/Review';

dotenv.config();

const AMENITIES = [
  'WiFi',
  'Kitchen',
  'Washer',
  'Dryer',
  'Air conditioning',
  'Heating',
  'TV',
  'Hair dryer',
  'Iron',
  'Pool',
  'Hot tub',
  'Free parking',
  'Gym',
  'Workspace',
  'Pets allowed',
  'Smoke alarm',
  'First aid kit',
  'Fire extinguisher',
  'Coffee maker',
  'Dishwasher',
  'Refrigerator',
  'Microwave',
  'Balcony',
  'Garden',
  'BBQ grill',
];

const PROPERTY_TYPES = ['apartment', 'house', 'villa', 'cabin', 'cottage', 'loft'] as const;
const ROOM_TYPES = ['entire_place', 'private_room', 'shared_room'] as const;

const CITIES = [
  { name: 'New York', state: 'New York', country: 'United States', lat: 40.7128, lng: -74.006 },
  { name: 'Los Angeles', state: 'California', country: 'United States', lat: 34.0522, lng: -118.2437 },
  { name: 'San Francisco', state: 'California', country: 'United States', lat: 37.7749, lng: -122.4194 },
  { name: 'Miami', state: 'Florida', country: 'United States', lat: 25.7617, lng: -80.1918 },
  { name: 'Chicago', state: 'Illinois', country: 'United States', lat: 41.8781, lng: -87.6298 },
  { name: 'Seattle', state: 'Washington', country: 'United States', lat: 47.6062, lng: -122.3321 },
  { name: 'Austin', state: 'Texas', country: 'United States', lat: 30.2672, lng: -97.7431 },
  { name: 'Boston', state: 'Massachusetts', country: 'United States', lat: 42.3601, lng: -71.0589 },
  { name: 'Denver', state: 'Colorado', country: 'United States', lat: 39.7392, lng: -104.9903 },
  { name: 'Portland', state: 'Oregon', country: 'United States', lat: 45.5152, lng: -122.6784 },
  { name: 'Paris', state: 'Île-de-France', country: 'France', lat: 48.8566, lng: 2.3522 },
  { name: 'London', state: 'England', country: 'United Kingdom', lat: 51.5074, lng: -0.1278 },
  { name: 'Tokyo', state: 'Tokyo', country: 'Japan', lat: 35.6762, lng: 139.6503 },
  { name: 'Barcelona', state: 'Catalonia', country: 'Spain', lat: 41.3851, lng: 2.1734 },
  { name: 'Rome', state: 'Lazio', country: 'Italy', lat: 41.9028, lng: 12.4964 },
];

// Unsplash image URLs for property photos
const getPropertyImages = (count: number = 5): string[] => {
  const categories = ['architecture', 'house', 'apartment', 'interior', 'room'];
  return Array.from({ length: count }, (_, i) => {
    const category = categories[i % categories.length];
    const randomId = Math.floor(Math.random() * 1000);
    return `https://source.unsplash.com/800x600/?${category},modern,${randomId}`;
  });
};

const generateUsers = async (count: number) => {
  console.log(`Generating ${count} users...`);
  const users = [];

  for (let i = 0; i < count; i++) {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const user = {
      email: faker.internet.email({ firstName, lastName }).toLowerCase(),
      password: 'password123',
      firstName,
      lastName,
      avatar: faker.image.avatar(),
      phone: faker.phone.number(),
      bio: faker.lorem.sentences(2),
      isHost: i < count * 0.3, // 30% are hosts
    };
    users.push(user);
  }

  return await User.insertMany(users);
};

const generateListings = async (hosts: any[], count: number) => {
  console.log(`Generating ${count} listings...`);
  const listings = [];

  for (let i = 0; i < count; i++) {
    const host = hosts[Math.floor(Math.random() * hosts.length)];
    const city = CITIES[Math.floor(Math.random() * CITIES.length)];
    const propertyType = PROPERTY_TYPES[Math.floor(Math.random() * PROPERTY_TYPES.length)];
    const roomType = ROOM_TYPES[Math.floor(Math.random() * ROOM_TYPES.length)];

    const bedrooms = faker.number.int({ min: 1, max: 5 });
    const bathrooms = faker.helpers.arrayElement([1, 1.5, 2, 2.5, 3, 3.5, 4]);
    const beds = faker.number.int({ min: bedrooms, max: bedrooms + 2 });
    const maxGuests = beds * 2;

    // Select random amenities
    const amenitiesCount = faker.number.int({ min: 5, max: 15 });
    const selectedAmenities = faker.helpers.arrayElements(AMENITIES, amenitiesCount);

    const listing = {
      hostId: host._id,
      title: `${faker.helpers.arrayElement(['Cozy', 'Luxury', 'Modern', 'Charming', 'Spacious', 'Beautiful', 'Stunning'])} ${propertyType} in ${city.name}`,
      description: `${faker.lorem.paragraphs(3)}\n\nThis ${propertyType} is perfect for your stay in ${city.name}. ${faker.lorem.paragraph()}`,
      propertyType,
      roomType,
      location: {
        address: faker.location.streetAddress(),
        city: city.name,
        state: city.state,
        country: city.country,
        zipCode: faker.location.zipCode(),
        latitude: city.lat + (Math.random() - 0.5) * 0.1,
        longitude: city.lng + (Math.random() - 0.5) * 0.1,
      },
      price: faker.number.int({ min: 50, max: 500 }),
      images: getPropertyImages(faker.number.int({ min: 5, max: 8 })),
      maxGuests,
      bedrooms,
      beds,
      bathrooms,
      amenities: selectedAmenities,
      rules: [
        'No smoking',
        'No parties or events',
        'Check-in is anytime after 3:00 PM',
      ],
      checkInTime: '3:00 PM',
      checkOutTime: '11:00 AM',
      minNights: faker.helpers.arrayElement([1, 2, 3]),
      maxNights: faker.number.int({ min: 30, max: 365 }),
      instantBook: faker.datatype.boolean(),
    };

    listings.push(listing);
  }

  return await Listing.insertMany(listings);
};

const generateBookings = async (
  listings: any[],
  guests: any[],
  count: number
) => {
  console.log(`Generating ${count} bookings...`);
  const bookings = [];

  for (let i = 0; i < count; i++) {
    const listing = listings[Math.floor(Math.random() * listings.length)];
    const guest = guests[Math.floor(Math.random() * guests.length)];

    const checkIn = faker.date.between({
      from: new Date(2024, 0, 1),
      to: new Date(2024, 11, 31),
    });

    const nights = faker.number.int({ min: 2, max: 7 });
    const checkOut = new Date(checkIn);
    checkOut.setDate(checkOut.getDate() + nights);

    const booking = {
      listingId: listing._id,
      guestId: guest._id,
      checkIn,
      checkOut,
      guests: faker.number.int({ min: 1, max: listing.maxGuests }),
      totalPrice: listing.price * nights,
      status: faker.helpers.arrayElement(['confirmed', 'completed', 'cancelled']),
    };

    bookings.push(booking);
  }

  return await Booking.insertMany(bookings);
};

const generateReviews = async (
  completedBookings: any[],
  count: number
) => {
  console.log(`Generating ${count} reviews...`);
  const reviews = [];

  // Only create reviews for completed bookings
  const eligibleBookings = completedBookings.filter(b => b.status === 'completed');
  const bookingsToReview = faker.helpers.arrayElements(
    eligibleBookings,
    Math.min(count, eligibleBookings.length)
  );

  for (const booking of bookingsToReview) {
    const rating = faker.number.float({ min: 3.5, max: 5, fractionDigits: 1 });

    const review = {
      listingId: booking.listingId,
      userId: booking.guestId,
      bookingId: booking._id,
      rating: Math.round(rating),
      cleanliness: faker.number.int({ min: 4, max: 5 }),
      communication: faker.number.int({ min: 4, max: 5 }),
      checkIn: faker.number.int({ min: 4, max: 5 }),
      accuracy: faker.number.int({ min: 4, max: 5 }),
      location: faker.number.int({ min: 3, max: 5 }),
      value: faker.number.int({ min: 3, max: 5 }),
      comment: faker.lorem.paragraph(),
    };

    reviews.push(review);
  }

  return await Review.insertMany(reviews);
};

const seedDatabase = async () => {
  try {
    console.log('Starting database seed...');

    // Connect to database
    await connectDB();

    // Clear existing data
    console.log('Clearing existing data...');
    await User.deleteMany({});
    await Listing.deleteMany({});
    await Booking.deleteMany({});
    await Review.deleteMany({});

    // Generate data
    const users = await generateUsers(50);
    const hosts = users.filter((user) => user.isHost);
    const guests = users.filter((user) => !user.isHost);

    const listings = await generateListings(hosts, 100);
    const bookings = await generateBookings(listings, guests, 200);
    const reviews = await generateReviews(bookings, 150);

    console.log('\n✅ Database seeded successfully!');
    console.log(`   Users: ${users.length}`);
    console.log(`   Hosts: ${hosts.length}`);
    console.log(`   Listings: ${listings.length}`);
    console.log(`   Bookings: ${bookings.length}`);
    console.log(`   Reviews: ${reviews.length}`);
    console.log('\n📧 Test user credentials:');
    console.log(`   Email: ${users[0].email}`);
    console.log(`   Password: password123`);
    console.log(`\n   Host email: ${hosts[0].email}`);
    console.log(`   Password: password123`);

    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
