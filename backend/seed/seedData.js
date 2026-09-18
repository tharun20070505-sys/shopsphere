require('dotenv').config({ path: __dirname + '/../.env' });
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { connectDB, disconnectDB } = require('../config/db');

const User = require('../models/User');
const Category = require('../models/Category');
const Product = require('../models/Product');
const Review = require('../models/Review');
const Order = require('../models/Order');
const Cart = require('../models/Cart');

const seedData = async () => {
  try {
    console.log('Connecting to database for seeding...');
    await connectDB();

    // 1. Clear existing data
    await Cart.deleteMany({});
    await Order.deleteMany({});
    await Review.deleteMany({});
    await Product.deleteMany({});
    await Category.deleteMany({});
    await User.deleteMany({});

    console.log('Existing collections cleared.');

    // 2. Seed 10 Categories
    const categoriesData = [
      {
        name: 'Electronics',
        description: 'Smart gadgets, smart home tech, audio gear and accessories',
        image: 'https://images.unsplash.com/photo-1550009158-9ebf69173e03?auto=format&fit=crop&w=600&q=80'
      },
      {
        name: 'Mobile Phones',
        description: 'Flagship smartphones, 5G phones and wireless accessories',
        image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=600&q=80'
      },
      {
        name: 'Laptops',
        description: 'High-performance laptops, ultrabooks, and productivity machines',
        image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=600&q=80'
      },
      {
        name: 'Headphones',
        description: 'Noise-canceling headphones, true wireless earbuds and audiophile sound',
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80'
      },
      {
        name: 'Cameras',
        description: 'Mirrorless cameras, DSLR, lenses, and professional photography gear',
        image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=600&q=80'
      },
      {
        name: "Men's Clothing",
        description: 'Modern menswear, jackets, casual shirts, denim, and activewear',
        image: 'https://images.unsplash.com/photo-1516257984-b1b4d707412e?auto=format&fit=crop&w=600&q=80'
      },
      {
        name: "Women's Clothing",
        description: 'Elegant dresses, outerwear, designer apparel, and knitwear',
        image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=600&q=80'
      },
      {
        name: 'Shoes',
        description: 'Running sneakers, formal dress shoes, trail boots and trainers',
        image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80'
      },
      {
        name: 'Home & Kitchen',
        description: 'Smart appliances, kitchenware, coffee makers, and home decor',
        image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=600&q=80'
      },
      {
        name: 'Books',
        description: 'Bestselling fiction, technology, business, self-help, and literature',
        image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=600&q=80'
      }
    ];

    const createdCategories = await Category.insertMany(categoriesData);
    const catMap = {};
    createdCategories.forEach((cat) => {
      catMap[cat.name] = cat._id;
    });

    // 3. Seed 11 Users (1 Admin + 10 Customers)
    const adminPasswordHash = await bcrypt.hash('Admin@123', 10);
    const customerPasswordHash = await bcrypt.hash('Customer@123', 10);

    const usersData = [
      {
        name: 'ShopSphere Administrator',
        email: 'admin@shopsphere.com',
        password: adminPasswordHash,
        phone: '+1 (555) 019-2834',
        role: 'ADMIN',
        address: {
          street: '100 Tech Plaza, Suite 400',
          city: 'San Jose',
          state: 'California',
          pincode: '95113'
        }
      },
      {
        name: 'Alex Johnson',
        email: 'alex.johnson@example.com',
        password: customerPasswordHash,
        phone: '+1 (555) 123-4567',
        role: 'CUSTOMER',
        address: {
          street: '42 Maple Street',
          city: 'Austin',
          state: 'Texas',
          pincode: '78701'
        }
      },
      {
        name: 'Sophia Martinez',
        email: 'sophia.martinez@example.com',
        password: customerPasswordHash,
        phone: '+1 (555) 234-5678',
        role: 'CUSTOMER',
        address: {
          street: '789 Sunset Blvd',
          city: 'Los Angeles',
          state: 'California',
          pincode: '90028'
        }
      },
      {
        name: 'David Chen',
        email: 'david.chen@example.com',
        password: customerPasswordHash,
        phone: '+1 (555) 345-6789',
        role: 'CUSTOMER',
        address: {
          street: '12 Pine Valley Way',
          city: 'Seattle',
          state: 'Washington',
          pincode: '98101'
        }
      },
      {
        name: 'Emma Watson',
        email: 'emma.watson@example.com',
        password: customerPasswordHash,
        phone: '+1 (555) 456-7890',
        role: 'CUSTOMER',
        address: {
          street: '55 Beacon Street',
          city: 'Boston',
          state: 'Massachusetts',
          pincode: '02108'
        }
      },
      {
        name: 'Michael Brown',
        email: 'michael.brown@example.com',
        password: customerPasswordHash,
        phone: '+1 (555) 567-8901',
        role: 'CUSTOMER',
        address: {
          street: '224 Peachtree Rd',
          city: 'Atlanta',
          state: 'Georgia',
          pincode: '30309'
        }
      },
      {
        name: 'Olivia Wilson',
        email: 'olivia.wilson@example.com',
        password: customerPasswordHash,
        phone: '+1 (555) 678-9012',
        role: 'CUSTOMER',
        address: {
          street: '88 Michigan Ave',
          city: 'Chicago',
          state: 'Illinois',
          pincode: '60611'
        }
      },
      {
        name: 'James Anderson',
        email: 'james.anderson@example.com',
        password: customerPasswordHash,
        phone: '+1 (555) 789-0123',
        role: 'CUSTOMER',
        address: {
          street: '342 Broadway',
          city: 'New York',
          state: 'New York',
          pincode: '10013'
        }
      },
      {
        name: 'Isabella Garcia',
        email: 'isabella.garcia@example.com',
        password: customerPasswordHash,
        phone: '+1 (555) 890-1234',
        role: 'CUSTOMER',
        address: {
          street: '610 Ocean Drive',
          city: 'Miami',
          state: 'Florida',
          pincode: '33139'
        }
      },
      {
        name: 'Lucas Taylor',
        email: 'lucas.taylor@example.com',
        password: customerPasswordHash,
        phone: '+1 (555) 901-2345',
        role: 'CUSTOMER',
        address: {
          street: '15 Larimer Street',
          city: 'Denver',
          state: 'Colorado',
          pincode: '80202'
        }
      },
      {
        name: 'Mia Robinson',
        email: 'mia.robinson@example.com',
        password: customerPasswordHash,
        phone: '+1 (555) 012-3456',
        role: 'CUSTOMER',
        address: {
          street: '900 Pearl Street',
          city: 'Boulder',
          state: 'Colorado',
          pincode: '80302'
        }
      }
    ];

    const createdUsers = await User.insertMany(usersData);
    const customers = createdUsers.filter((u) => u.role === 'CUSTOMER');

    // 4. Seed 100 Realistic Products across the 10 categories
    const productsData = [
      // --- Electronics (10 products) ---
      {
        name: 'Apple Watch Series 9 GPS',
        brand: 'Apple',
        category: catMap['Electronics'],
        price: 399,
        discountPrice: 349,
        stock: 25,
        rating: 4.8,
        numReviews: 2,
        isFeatured: true,
        description: 'Advanced health sensors, bright Always-On Retina display, powerful S9 SiP chip, and carbon neutral case combinations.',
        image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=600&q=80'
      },
      {
        name: 'Samsung Galaxy Watch 6 Classic',
        brand: 'Samsung',
        category: catMap['Electronics'],
        price: 369,
        discountPrice: 299,
        stock: 18,
        rating: 4.6,
        numReviews: 1,
        isFeatured: true,
        description: 'Rotating bezel styling, comprehensive sleep coaching, body composition analysis, and sapphire crystal glass.',
        image: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?auto=format&fit=crop&w=600&q=80'
      },
      {
        name: 'Logitech MX Master 3S Wireless Mouse',
        brand: 'Logitech',
        category: catMap['Electronics'],
        price: 99,
        discountPrice: 89,
        stock: 45,
        rating: 4.9,
        numReviews: 2,
        isFeatured: true,
        description: 'Quiet clicks, 8K DPI sensor for any-surface tracking, MagSpeed electromagnetic scrolling, and ergonomic design.',
        image: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=600&q=80'
      },
      {
        name: 'Logitech MX Mechanical Wireless Keyboard',
        brand: 'Logitech',
        category: catMap['Electronics'],
        price: 169,
        discountPrice: 149,
        stock: 22,
        rating: 4.7,
        numReviews: 1,
        isFeatured: false,
        description: 'Tactile quiet low-profile mechanical switches, smart backlighting, multi-device easy switch, and aluminum top plate.',
        image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=600&q=80'
      },
      {
        name: 'Anker 737 Power Bank 24000mAh',
        brand: 'Anker',
        category: catMap['Electronics'],
        price: 149,
        discountPrice: 119,
        stock: 30,
        rating: 4.8,
        numReviews: 1,
        isFeatured: false,
        description: 'Ultra-powerful 140W two-way fast charging with smart digital display and PowerIQ 4.0 technology.',
        image: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?auto=format&fit=crop&w=600&q=80'
      },
      {
        name: 'Amazon Echo Show 10 Smart Display',
        brand: 'Amazon',
        category: catMap['Electronics'],
        price: 249,
        discountPrice: 209,
        stock: 7, // low stock (<10)
        rating: 4.5,
        numReviews: 1,
        isFeatured: false,
        description: '10.1-inch HD smart screen that automatically moves with you during video calls, recipes, and streaming shows.',
        image: 'https://images.unsplash.com/photo-1543512214-318c7553f230?auto=format&fit=crop&w=600&q=80'
      },
      {
        name: 'Belkin 3-in-1 MagSafe Wireless Charger',
        brand: 'Belkin',
        category: catMap['Electronics'],
        price: 139,
        discountPrice: 119,
        stock: 14,
        rating: 4.6,
        numReviews: 1,
        isFeatured: false,
        description: 'Fast 15W wireless charging stand for iPhone, Apple Watch, and AirPods simultaneously in premium chrome finish.',
        image: 'https://images.unsplash.com/photo-1622445262464-84b1456045b6?auto=format&fit=crop&w=600&q=80'
      },
      {
        name: 'SanDisk 2TB Extreme Portable SSD',
        brand: 'SanDisk',
        category: catMap['Electronics'],
        price: 189,
        discountPrice: 159,
        stock: 35,
        rating: 4.7,
        numReviews: 1,
        isFeatured: false,
        description: 'Rugged NVMe solid state drive with up to 1050MB/s read speeds, IP55 water and dust resistance, and carabiner loop.',
        image: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?auto=format&fit=crop&w=600&q=80'
      },
      {
        name: 'Elgato Stream Deck MK.2',
        brand: 'Elgato',
        category: catMap['Electronics'],
        price: 149,
        discountPrice: 129,
        stock: 5, // low stock (<10)
        rating: 4.8,
        numReviews: 1,
        isFeatured: false,
        description: '15 customizable LCD keys for one-touch actions in streaming, video editing, audio mixing, and everyday workflows.',
        image: 'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?auto=format&fit=crop&w=600&q=80'
      },
      {
        name: 'DJI Osmo Mobile 6 Smartphone Gimbal',
        brand: 'DJI',
        category: catMap['Electronics'],
        price: 159,
        discountPrice: 139,
        stock: 16,
        rating: 4.6,
        numReviews: 1,
        isFeatured: false,
        description: '3-axis handheld stabilizer with built-in extension rod, Quick Launch, and ActiveTrack 6.0 for cinematic phone video.',
        image: 'https://images.unsplash.com/photo-1584824486509-112e4181ff6b?auto=format&fit=crop&w=600&q=80'
      },

      // --- Mobile Phones (10 products) ---
      {
        name: 'Apple iPhone 15 Pro Max',
        brand: 'Apple',
        category: catMap['Mobile Phones'],
        price: 1199,
        discountPrice: 1099,
        stock: 12,
        rating: 4.9,
        numReviews: 2,
        isFeatured: true,
        description: 'Aerospace-grade titanium design, A17 Pro chip, Action button, 5x optical telephoto lens, and USB-C speed.',
        image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=600&q=80'
      },
      {
        name: 'Samsung Galaxy S24 Ultra',
        brand: 'Samsung',
        category: catMap['Mobile Phones'],
        price: 1299,
        discountPrice: 1149,
        stock: 15,
        rating: 4.8,
        numReviews: 2,
        isFeatured: true,
        description: 'Galaxy AI assistance, titanium frame, 200MP camera system, built-in S Pen, and flat 6.8-inch Dynamic AMOLED 2X.',
        image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=600&q=80'
      },
      {
        name: 'Google Pixel 8 Pro',
        brand: 'Google',
        category: catMap['Mobile Phones'],
        price: 999,
        discountPrice: 849,
        stock: 20,
        rating: 4.7,
        numReviews: 1,
        isFeatured: false,
        description: 'Google Tensor G3 chip, upgraded triple camera system, temperature sensor, and 7 years of OS updates.',
        image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=600&q=80'
      },
      {
        name: 'Samsung Galaxy A56 5G',
        brand: 'Samsung',
        category: catMap['Mobile Phones'],
        price: 449,
        discountPrice: 389,
        stock: 4, // low stock (<10)
        rating: 4.5,
        numReviews: 1,
        isFeatured: false,
        description: 'Vibrant 120Hz Super AMOLED display, 50MP OIS camera, 5000mAh long battery, and water-resistant design.',
        image: 'https://images.unsplash.com/photo-1565849904461-04a58ad377e0?auto=format&fit=crop&w=600&q=80'
      },
      {
        name: 'OnePlus 12 5G',
        brand: 'OnePlus',
        category: catMap['Mobile Phones'],
        price: 799,
        discountPrice: 699,
        stock: 18,
        rating: 4.7,
        numReviews: 1,
        isFeatured: false,
        description: 'Snapdragon 8 Gen 3, 4th Gen Hasselblad camera for mobile, 100W SUPERVOOC charging, and 5400mAh dual-cell battery.',
        image: 'https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=600&q=80'
      },
      {
        name: 'Apple iPhone 15',
        brand: 'Apple',
        category: catMap['Mobile Phones'],
        price: 799,
        discountPrice: 729,
        stock: 28,
        rating: 4.7,
        numReviews: 1,
        isFeatured: false,
        description: 'Dynamic Island, 48MP main camera, color-infused back glass design, A16 Bionic chip, and USB-C connectivity.',
        image: 'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?auto=format&fit=crop&w=600&q=80'
      },
      {
        name: 'Google Pixel 8a',
        brand: 'Google',
        category: catMap['Mobile Phones'],
        price: 499,
        discountPrice: 429,
        stock: 35,
        rating: 4.6,
        numReviews: 1,
        isFeatured: false,
        description: 'Delightful AI camera features, Actua display, durable IP67 water resistance, and all-day battery life.',
        image: 'https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?auto=format&fit=crop&w=600&q=80'
      },
      {
        name: 'Motorola Razr+ Foldable',
        brand: 'Motorola',
        category: catMap['Mobile Phones'],
        price: 999,
        discountPrice: 799,
        stock: 6, // low stock (<10)
        rating: 4.4,
        numReviews: 1,
        isFeatured: false,
        description: 'Largest external display on a flip phone, zero-gap hinge folding, Snapdragon 8+ Gen 1, and Dolby Atmos audio.',
        image: 'https://images.unsplash.com/photo-1585060544812-6b45742d762f?auto=format&fit=crop&w=600&q=80'
      },
      {
        name: 'Xiaomi 14 Ultra',
        brand: 'Xiaomi',
        category: catMap['Mobile Phones'],
        price: 1099,
        discountPrice: 949,
        stock: 10,
        rating: 4.6,
        numReviews: 1,
        isFeatured: false,
        description: 'Leica quad camera system with 1-inch variable aperture sensor, Snapdragon 8 Gen 3, and 90W HyperCharge.',
        image: 'https://images.unsplash.com/photo-1567581935884-3349723552ca?auto=format&fit=crop&w=600&q=80'
      },
      {
        name: 'Sony Xperia 1 VI',
        brand: 'Sony',
        category: catMap['Mobile Phones'],
        price: 1299,
        discountPrice: 1199,
        stock: 8, // low stock (<10)
        rating: 4.5,
        numReviews: 0,
        isFeatured: false,
        description: 'Optical telephoto zoom 85-170mm lens, Bravia-powered OLED display, 2-day battery life, and 3.5mm headphone jack.',
        image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=600&q=80'
      },

      // --- Laptops (10 products) ---
      {
        name: 'Apple MacBook Air 15 M3',
        brand: 'Apple',
        category: catMap['Laptops'],
        price: 1299,
        discountPrice: 1149,
        stock: 20,
        rating: 4.9,
        numReviews: 2,
        isFeatured: true,
        description: 'Liquid Retina display, ultrafast M3 chip, up to 18 hours battery life, 1080p FaceTime HD camera, and MagSafe.',
        image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=80'
      },
      {
        name: 'Dell XPS 14 OLED',
        brand: 'Dell',
        category: catMap['Laptops'],
        price: 1699,
        discountPrice: 1499,
        stock: 11,
        rating: 4.7,
        numReviews: 1,
        isFeatured: true,
        description: 'CNC machined aluminum, 3.2K OLED infinityEdge touch display, Intel Core Ultra 7 processor, and NVIDIA RTX graphics.',
        image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=600&q=80'
      },
      {
        name: 'Lenovo ThinkPad X1 Carbon Gen 12',
        brand: 'Lenovo',
        category: catMap['Laptops'],
        price: 1549,
        discountPrice: 1399,
        stock: 14,
        rating: 4.8,
        numReviews: 1,
        isFeatured: false,
        description: 'Legendary keyboard with TrackPoint, carbon fiber chassis, MIL-SPEC durability, and enhanced communications bar.',
        image: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=600&q=80'
      },
      {
        name: 'ASUS ROG Zephyrus G14 Gaming Laptop',
        brand: 'ASUS',
        category: catMap['Laptops'],
        price: 1599,
        discountPrice: 1399,
        stock: 9, // low stock (<10)
        rating: 4.8,
        numReviews: 1,
        isFeatured: true,
        description: 'ROG Nebula 3K 120Hz OLED display, AMD Ryzen 9 8945HS, NVIDIA GeForce RTX 4070, and ultra-thin aluminum chassis.',
        image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=600&q=80'
      },
      {
        name: 'Apple MacBook Pro 14 M3 Pro',
        brand: 'Apple',
        category: catMap['Laptops'],
        price: 1999,
        discountPrice: 1849,
        stock: 16,
        rating: 4.9,
        numReviews: 1,
        isFeatured: false,
        description: 'Liquid Retina XDR display with ProMotion, Space Black finish, HDMI, SDXC card slot, and monstrous computing speed.',
        image: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=600&q=80'
      },
      {
        name: 'HP Spectre x360 14 2-in-1',
        brand: 'HP',
        category: catMap['Laptops'],
        price: 1449,
        discountPrice: 1299,
        stock: 12,
        rating: 4.6,
        numReviews: 1,
        isFeatured: false,
        description: 'Versatile 360-degree convertible hinge, 2.8K OLED touchscreen, 9MP smart AI webcam, and magnetic stylus pen.',
        image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80'
      },
      {
        name: 'Microsoft Surface Laptop 7 Copilot+ PC',
        brand: 'Microsoft',
        category: catMap['Laptops'],
        price: 999,
        discountPrice: 899,
        stock: 22,
        rating: 4.6,
        numReviews: 0,
        isFeatured: false,
        description: 'Snapdragon X Elite processor, PixelSense touchscreen, all-day battery efficiency, and AI features like Recall and Cocreator.',
        image: 'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?auto=format&fit=crop&w=600&q=80'
      },
      {
        name: 'Razer Blade 16 Gaming Laptop',
        brand: 'Razer',
        category: catMap['Laptops'],
        price: 2799,
        discountPrice: 2499,
        stock: 3, // low stock (<10)
        rating: 4.7,
        numReviews: 1,
        isFeatured: false,
        description: 'Dual-mode Mini-LED display (UHD+ 120Hz / FHD+ 240Hz), Intel Core i9-14900HX, RTX 4080, and anodized aluminum body.',
        image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=600&q=80'
      },
      {
        name: 'Acer Swift Go 14 OLED',
        brand: 'Acer',
        category: catMap['Laptops'],
        price: 799,
        discountPrice: 679,
        stock: 26,
        rating: 4.5,
        numReviews: 1,
        isFeatured: false,
        description: 'Brilliant 2.8K 90Hz OLED screen, lightweight 1.3kg chassis, Intel Core Ultra 5 CPU with Intel Arc graphics.',
        image: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=600&q=80'
      },
      {
        name: 'Framework Laptop 13 DIY Edition',
        brand: 'Framework',
        category: catMap['Laptops'],
        price: 1049,
        discountPrice: 949,
        stock: 7, // low stock (<10)
        rating: 4.8,
        numReviews: 1,
        isFeatured: false,
        description: 'Fully modular and upgradeable laptop with customizable expansion card ports, 2.8K display, and repairable parts.',
        image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=600&q=80'
      },

      // --- Headphones (10 products) ---
      {
        name: 'Sony WH-1000XM6 Wireless Headphones',
        brand: 'Sony',
        category: catMap['Headphones'],
        price: 399,
        discountPrice: 349,
        stock: 30,
        rating: 4.9,
        numReviews: 2,
        isFeatured: true,
        description: 'Industry-leading noise canceling with Dual Noise Sensor tech, LDAC high-resolution wireless audio, and 30-hour battery.',
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80'
      },
      {
        name: 'Bose QuietComfort Ultra Headphones',
        brand: 'Bose',
        category: catMap['Headphones'],
        price: 429,
        discountPrice: 379,
        stock: 19,
        rating: 4.8,
        numReviews: 1,
        isFeatured: true,
        description: 'Breakthrough spatialized audio for more immersive listening, world-class active noise cancellation, and CustomTune tech.',
        image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=600&q=80'
      },
      {
        name: 'Apple AirPods Pro 2nd Gen USB-C',
        brand: 'Apple',
        category: catMap['Headphones'],
        price: 249,
        discountPrice: 199,
        stock: 40,
        rating: 4.9,
        numReviews: 2,
        isFeatured: true,
        description: 'H2 chip, 2x more Active Noise Cancellation, Adaptive Audio, Transparency mode, and MagSafe Charging Case with USB-C.',
        image: 'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&w=600&q=80'
      },
      {
        name: 'Sennheiser Momentum 4 Wireless',
        brand: 'Sennheiser',
        category: catMap['Headphones'],
        price: 379,
        discountPrice: 299,
        stock: 15,
        rating: 4.7,
        numReviews: 1,
        isFeatured: false,
        description: 'Audiophile-inspired 42mm transducer system, unmatched 60-hour battery life, adaptive ANC, and customizable sound EQ.',
        image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=600&q=80'
      },
      {
        name: 'Sony WF-1000XM5 True Wireless Earbuds',
        brand: 'Sony',
        category: catMap['Headphones'],
        price: 299,
        discountPrice: 249,
        stock: 24,
        rating: 4.7,
        numReviews: 1,
        isFeatured: false,
        description: 'Dynamic Driver X for rich vocals, dual feedback microphones, bone conduction sensors for crystal-clear call quality.',
        image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=600&q=80'
      },
      {
        name: 'Bose QuietComfort Ultra Earbuds',
        brand: 'Bose',
        category: catMap['Headphones'],
        price: 299,
        discountPrice: 249,
        stock: 5, // low stock (<10)
        rating: 4.6,
        numReviews: 1,
        isFeatured: false,
        description: 'Revolutionary immersive audio, world-class noise cancellation tuned to your ear shape, and soft umbrella-shaped tips.',
        image: 'https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?auto=format&fit=crop&w=600&q=80'
      },
      {
        name: 'Beats Studio Pro Wireless',
        brand: 'Beats',
        category: catMap['Headphones'],
        price: 349,
        discountPrice: 249,
        stock: 28,
        rating: 4.5,
        numReviews: 1,
        isFeatured: false,
        description: 'Custom acoustic platform, personalized spatial audio with dynamic head tracking, USB-C lossless audio, and 40-hour battery.',
        image: 'https://images.unsplash.com/photo-1577174881658-0f30ed549adc?auto=format&fit=crop&w=600&q=80'
      },
      {
        name: 'Shure AONIC 50 Gen 2',
        brand: 'Shure',
        category: catMap['Headphones'],
        price: 349,
        discountPrice: 299,
        stock: 12,
        rating: 4.6,
        numReviews: 0,
        isFeatured: false,
        description: 'Studio-quality sound engineered from decades of stage experience, spatialized audio modes, and Snapdragon Sound.',
        image: 'https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=600&q=80'
      },
      {
        name: 'Marshall Major IV On-Ear Headphones',
        brand: 'Marshall',
        category: catMap['Headphones'],
        price: 149,
        discountPrice: 119,
        stock: 32,
        rating: 4.6,
        numReviews: 1,
        isFeatured: false,
        description: 'Iconic vintage Marshall design, 80+ solid hours of wireless playtime, wireless charging capability, and multi-directional knob.',
        image: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=600&q=80'
      },
      {
        name: 'Audio-Technica ATH-M50xBT2',
        brand: 'Audio-Technica',
        category: catMap['Headphones'],
        price: 199,
        discountPrice: 169,
        stock: 8, // low stock (<10)
        rating: 4.8,
        numReviews: 1,
        isFeatured: false,
        description: 'Critically acclaimed sonic performance with 45mm large-aperture drivers, AK4377 DAC, and low-latency gaming mode.',
        image: 'https://images.unsplash.com/photo-1524678606370-a47ad25cb82a?auto=format&fit=crop&w=600&q=80'
      },

      // --- Cameras (10 products) ---
      {
        name: 'Canon EOS R50 Mirrorless Camera',
        brand: 'Canon',
        category: catMap['Cameras'],
        price: 679,
        discountPrice: 599,
        stock: 14,
        rating: 4.7,
        numReviews: 1,
        isFeatured: true,
        description: 'Compact lightweight 24.2 Megapixel APS-C sensor, Dual Pixel CMOS AF II with subject detection, and uncropped 4K 30p video.',
        image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=600&q=80'
      },
      {
        name: 'Sony Alpha a7 IV Full-Frame Camera',
        brand: 'Sony',
        category: catMap['Cameras'],
        price: 2498,
        discountPrice: 2298,
        stock: 6, // low stock (<10)
        rating: 4.9,
        numReviews: 2,
        isFeatured: true,
        description: '33MP Exmor R sensor, BIONZ XR processing engine, 4K 60p 10-bit 4:2:2 recording, and real-time human/animal eye AF.',
        image: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?auto=format&fit=crop&w=600&q=80'
      },
      {
        name: 'Fujifilm X-T5 Mirrorless Digital Camera',
        brand: 'Fujifilm',
        category: catMap['Cameras'],
        price: 1699,
        discountPrice: 1549,
        stock: 10,
        rating: 4.8,
        numReviews: 1,
        isFeatured: false,
        description: '40.2MP X-Trans CMOS 5 HR sensor, 5-axis 7-stop in-body stabilization, classic dial controls, and 19 Film Simulation modes.',
        image: 'https://images.unsplash.com/photo-1500634245200-e5245c7574ef?auto=format&fit=crop&w=600&q=80'
      },
      {
        name: 'Nikon Z6 III Creator Camera',
        brand: 'Nikon',
        category: catMap['Cameras'],
        price: 2499,
        discountPrice: 2299,
        stock: 8, // low stock (<10)
        rating: 4.8,
        numReviews: 1,
        isFeatured: false,
        description: 'Partially-stacked 24.5MP CMOS sensor, 6K 60p internal RAW video recording, and bright 4000-nit electronic viewfinder.',
        image: 'https://images.unsplash.com/photo-1512790182412-b19e6d62bc39?auto=format&fit=crop&w=600&q=80'
      },
      {
        name: 'GoPro HERO12 Black Action Camera',
        brand: 'GoPro',
        category: catMap['Cameras'],
        price: 399,
        discountPrice: 349,
        stock: 35,
        rating: 4.6,
        numReviews: 1,
        isFeatured: false,
        description: '5.3K60 HDR video, HyperSmooth 6.0 video stabilization, dual LCD screens, and rugged waterproof construction up to 33ft.',
        image: 'https://images.unsplash.com/photo-1565849904461-04a58ad377e0?auto=format&fit=crop&w=600&q=80'
      },
      {
        name: 'DJI Pocket 3 Creator Combo',
        brand: 'DJI',
        category: catMap['Cameras'],
        price: 669,
        discountPrice: 599,
        stock: 15,
        rating: 4.9,
        numReviews: 2,
        isFeatured: true,
        description: '1-inch CMOS sensor pocket camera with rotatable 2-inch OLED touchscreen, mechanical 3-axis gimbal, and wireless mic.',
        image: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=600&q=80'
      },
      {
        name: 'Canon RF 24-70mm F2.8 L IS USM Lens',
        brand: 'Canon',
        category: catMap['Cameras'],
        price: 2399,
        discountPrice: 2199,
        stock: 4, // low stock (<10)
        rating: 4.9,
        numReviews: 1,
        isFeatured: false,
        description: 'Professional standard zoom lens for Canon EOS R mirrorless system with Nano USM focus and 5-stop optical image stabilizer.',
        image: 'https://images.unsplash.com/photo-1617005082133-548c4dd27f35?auto=format&fit=crop&w=600&q=80'
      },
      {
        name: 'Sony FE 50mm F1.4 GM Lens',
        brand: 'Sony',
        category: catMap['Cameras'],
        price: 1298,
        discountPrice: 1198,
        stock: 9, // low stock (<10)
        rating: 4.9,
        numReviews: 0,
        isFeatured: false,
        description: 'G Master standard prime lens delivering extraordinary sharpness, smooth creamy bokeh, and fast XD Linear Motor autofocus.',
        image: 'https://images.unsplash.com/photo-1510127034890-ba27508e9f1c?auto=format&fit=crop&w=600&q=80'
      },
      {
        name: 'Insta360 X4 8K 360 Action Camera',
        brand: 'Insta360',
        category: catMap['Cameras'],
        price: 499,
        discountPrice: 449,
        stock: 20,
        rating: 4.7,
        numReviews: 1,
        isFeatured: false,
        description: 'Mind-blowing 8K 30fps 360-degree video capture, invisible selfie stick effect, FlowState stabilization, and gesture control.',
        image: 'https://images.unsplash.com/photo-1542385151-efd9000785a0?auto=format&fit=crop&w=600&q=80'
      },
      {
        name: 'Panasonic Lumix S5 IIX',
        brand: 'Panasonic',
        category: catMap['Cameras'],
        price: 2199,
        discountPrice: 1999,
        stock: 11,
        rating: 4.8,
        numReviews: 1,
        isFeatured: false,
        description: 'Phase Hybrid autofocus full-frame mirrorless camera, all-black stealth design, ProRes internal recording, and live streaming.',
        image: 'https://images.unsplash.com/photo-1520390138845-fd2d229dd553?auto=format&fit=crop&w=600&q=80'
      },

      // --- Men's Clothing (10 products) ---
      {
        name: 'Nike Sportswear Club Fleece Hoodie',
        brand: 'Nike',
        category: catMap["Men's Clothing"],
        price: 65,
        discountPrice: 52,
        stock: 45,
        rating: 4.7,
        numReviews: 2,
        isFeatured: true,
        description: 'Classic brushed-back fleece delivers everyday softness and comfort with kangaroo pocket and adjustable drawstring hood.',
        image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=600&q=80'
      },
      {
        name: "Levi's 511 Slim Fit Stretch Jeans",
        brand: "Levi's",
        category: catMap["Men's Clothing"],
        price: 79,
        discountPrice: 59,
        stock: 35,
        rating: 4.6,
        numReviews: 2,
        isFeatured: true,
        description: 'Modern slim fit with room to move, crafted with premium stretch denim for all-day comfort and timeless five-pocket styling.',
        image: 'https://images.unsplash.com/photo-1542272604-780c96856592?auto=format&fit=crop&w=600&q=80'
      },
      {
        name: 'Patagonia Better Sweater Fleece Jacket',
        brand: 'Patagonia',
        category: catMap["Men's Clothing"],
        price: 159,
        discountPrice: 139,
        stock: 18,
        rating: 4.9,
        numReviews: 1,
        isFeatured: false,
        description: '100% recycled polyester fleece with sweater-knit aesthetic, dyed with a low-impact process, featuring zip-through stand-up collar.',
        image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=600&q=80'
      },
      {
        name: 'Ralph Lauren Classic Fit Oxford Shirt',
        brand: 'Ralph Lauren',
        category: catMap["Men's Clothing"],
        price: 115,
        discountPrice: 89,
        stock: 22,
        rating: 4.8,
        numReviews: 1,
        isFeatured: false,
        description: 'Signature cotton oxford fabric with button-down collar and signature embroidered Pony emblem at left chest.',
        image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=600&q=80'
      },
      {
        name: 'The North Face 1996 Retro Nuptse Jacket',
        brand: 'The North Face',
        category: catMap["Men's Clothing"],
        price: 330,
        discountPrice: 289,
        stock: 8, // low stock (<10)
        rating: 4.9,
        numReviews: 1,
        isFeatured: true,
        description: '700-fill goose down insulation, water-repellent ripstop shell, packable hood, and boxy oversized retro silhouette.',
        image: 'https://images.unsplash.com/photo-1544923246-77307dd654cb?auto=format&fit=crop&w=600&q=80'
      },
      {
        name: 'Lululemon ABC Classic-Fit Pant 32"',
        brand: 'Lululemon',
        category: catMap["Men's Clothing"],
        price: 128,
        discountPrice: 108,
        stock: 20,
        rating: 4.8,
        numReviews: 1,
        isFeatured: false,
        description: 'Engineered with everyday comfort in mind, four-way stretch Warpstreme fabric that resists wrinkles and holds shape.',
        image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=600&q=80'
      },
      {
        name: 'Tommy Hilfiger Classic Crewneck T-Shirt 3-Pack',
        brand: 'Tommy Hilfiger',
        category: catMap["Men's Clothing"],
        price: 45,
        discountPrice: 35,
        stock: 50,
        rating: 4.5,
        numReviews: 1,
        isFeatured: false,
        description: 'Breathable 100% combed cotton undershirts with flat seams and embroidered flag logo on left hem.',
        image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=600&q=80'
      },
      {
        name: 'Carhartt Duck Detroit Blanket-Lined Jacket',
        brand: 'Carhartt',
        category: catMap["Men's Clothing"],
        price: 140,
        discountPrice: 125,
        stock: 7, // low stock (<10)
        rating: 4.8,
        numReviews: 1,
        isFeatured: false,
        description: 'Heavyweight 12-ounce cotton duck canvas with warm blanket lining, corduroy-trimmed collar, and triple-stitched seams.',
        image: 'https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&w=600&q=80'
      },
      {
        name: 'Calvin Klein Slim Fit Wool Suit Blazer',
        brand: 'Calvin Klein',
        category: catMap["Men's Clothing"],
        price: 295,
        discountPrice: 229,
        stock: 12,
        rating: 4.6,
        numReviews: 0,
        isFeatured: false,
        description: 'Refined tailored silhouette woven from pure virgin wool with notched lapel, two-button closure, and side vents.',
        image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=600&q=80'
      },
      {
        name: 'Adidas Tiro 23 League Training Pants',
        brand: 'Adidas',
        category: catMap["Men's Clothing"],
        price: 50,
        discountPrice: 39,
        stock: 38,
        rating: 4.7,
        numReviews: 1,
        isFeatured: false,
        description: 'Moisture-absorbing AEROREADY fabric, tapered leg cut with ankle zips for easy changes over football boots or sneakers.',
        image: 'https://images.unsplash.com/photo-1517445312882-bc9910d016b7?auto=format&fit=crop&w=600&q=80'
      },

      // --- Women's Clothing (10 products) ---
      {
        name: 'Zara Belted Trench Coat with Lapel',
        brand: 'Zara',
        category: catMap["Women's Clothing"],
        price: 149,
        discountPrice: 119,
        stock: 18,
        rating: 4.7,
        numReviews: 2,
        isFeatured: true,
        description: 'Classic double-breasted cotton blend trench coat with removable self-tie belt, storm flap, and tortoise buttons.',
        image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=600&q=80'
      },
      {
        name: 'Lululemon Align High-Rise Pant 25"',
        brand: 'Lululemon',
        category: catMap["Women's Clothing"],
        price: 98,
        discountPrice: 84,
        stock: 35,
        rating: 4.9,
        numReviews: 2,
        isFeatured: true,
        description: 'Weightless, buttery-soft Nulu fabric for total freedom of movement with waistband pocket for keys and cards.',
        image: 'https://images.unsplash.com/photo-1506619216599-9d16d0903dfd?auto=format&fit=crop&w=600&q=80'
      },
      {
        name: 'H&M Knit Cashmere-Blend Cardigan',
        brand: 'H&M',
        category: catMap["Women's Clothing"],
        price: 89,
        discountPrice: 69,
        stock: 22,
        rating: 4.6,
        numReviews: 1,
        isFeatured: false,
        description: 'Relaxed-fit ribbed knit cardigan made from a luxurious blend of soft cashmere and recycled wool with dropped shoulders.',
        image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=600&q=80'
      },
      {
        name: "Levi's Ribcage Straight Ankle Jeans",
        brand: "Levi's",
        category: catMap["Women's Clothing"],
        price: 108,
        discountPrice: 88,
        stock: 26,
        rating: 4.8,
        numReviews: 1,
        isFeatured: false,
        description: "Levi's highest high rise with a classic straight leg, fitted through the hip and thigh with vintage wash authentic denim.",
        image: 'https://images.unsplash.com/photo-1582533561751-ef6f6ab93a2e?auto=format&fit=crop&w=600&q=80'
      },
      {
        name: 'Free People Boho Floral Midi Dress',
        brand: 'Free People',
        category: catMap["Women's Clothing"],
        price: 168,
        discountPrice: 138,
        stock: 9, // low stock (<10)
        rating: 4.7,
        numReviews: 1,
        isFeatured: true,
        description: 'Effortless bohemian tiered silhouette with ditsy floral print, flattering V-neckline, and billowy balloon sleeves.',
        image: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=600&q=80'
      },
      {
        name: 'Mango Structured Tailored Suit Blazer',
        brand: 'Mango',
        category: catMap["Women's Clothing"],
        price: 129,
        discountPrice: 99,
        stock: 14,
        rating: 4.6,
        numReviews: 0,
        isFeatured: false,
        description: 'Oversized structured silhouette with shoulder pads, peaked lapels, flap pockets, and inner silky satin lining.',
        image: 'https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&w=600&q=80'
      },
      {
        name: 'Everlane The Clean Silk Relaxed Shirt',
        brand: 'Everlane',
        category: catMap["Women's Clothing"],
        price: 150,
        discountPrice: 120,
        stock: 17,
        rating: 4.8,
        numReviews: 1,
        isFeatured: false,
        description: 'Dyed with safer dyes that meet strict Bluesign standards, crafted from 100% pure Mulberry silk with point collar.',
        image: 'https://images.unsplash.com/photo-1589310243389-96a5483213a8?auto=format&fit=crop&w=600&q=80'
      },
      {
        name: 'Aritzia The Super Puff Down Jacket',
        brand: 'Aritzia',
        category: catMap["Women's Clothing"],
        price: 250,
        discountPrice: 219,
        stock: 5, // low stock (<10)
        rating: 4.9,
        numReviews: 1,
        isFeatured: false,
        description: 'Engineered to keep you warm down to -30°C / -22°F, filled with 100% responsibly sourced 700+ fill power goose down.',
        image: 'https://images.unsplash.com/photo-1544923246-77307dd654cb?auto=format&fit=crop&w=600&q=80'
      },
      {
        name: 'Nike One Dri-FIT High-Waisted Biker Shorts',
        brand: 'Nike',
        category: catMap["Women's Clothing"],
        price: 45,
        discountPrice: 34,
        stock: 40,
        rating: 4.6,
        numReviews: 1,
        isFeatured: false,
        description: 'Non-sheer fabric passes squat test with flying colors, seamless sides, and contoured V-shape back waistband.',
        image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=600&q=80'
      },
      {
        name: 'Madewell Denim Jacket in Classic Wash',
        brand: 'Madewell',
        category: catMap["Women's Clothing"],
        price: 128,
        discountPrice: 98,
        stock: 15,
        rating: 4.7,
        numReviews: 1,
        isFeatured: false,
        description: 'The ultimate jean jacket with an easy relaxed fit, deep interior pockets for your phone, and authentic copper hardware.',
        image: 'https://images.unsplash.com/photo-1527082395-e939b847da0d?auto=format&fit=crop&w=600&q=80'
      },

      // --- Shoes (10 products) ---
      {
        name: 'Nike Air Max 90 Sneakers',
        brand: 'Nike',
        category: catMap['Shoes'],
        price: 130,
        discountPrice: 105,
        stock: 30,
        rating: 4.8,
        numReviews: 2,
        isFeatured: true,
        description: 'Iconic waffle sole, stitched overlays and classic TPU accents with Max Air cushioning for unbeatable comfort.',
        image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80'
      },
      {
        name: 'Adidas Ultraboost Light Running Shoes',
        brand: 'Adidas',
        category: catMap['Shoes'],
        price: 190,
        discountPrice: 149,
        stock: 24,
        rating: 4.9,
        numReviews: 2,
        isFeatured: true,
        description: 'Lightest Ultraboost ever made with 30% lighter Light BOOST material, Primeknit+ textile upper, and Continental rubber.',
        image: 'https://images.unsplash.com/photo-1587563871167-1ee9c731aefb?auto=format&fit=crop&w=600&q=80'
      },
      {
        name: 'New Balance 574 Core Classics',
        brand: 'New Balance',
        category: catMap['Shoes'],
        price: 89,
        discountPrice: 74,
        stock: 35,
        rating: 4.7,
        numReviews: 1,
        isFeatured: false,
        description: 'ENCAP midsole cushioning combines lightweight foam with durable polyurethane rim for all-day dependable support.',
        image: 'https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&w=600&q=80'
      },
      {
        name: 'On Cloud 5 All-Day Running Shoes',
        brand: 'On Running',
        category: catMap['Shoes'],
        price: 140,
        discountPrice: 125,
        stock: 20,
        rating: 4.8,
        numReviews: 1,
        isFeatured: true,
        description: 'Zero-Gravity CloudTec cushioning, speed-lacing system, and breathable antimicrobial mesh upper for featherlight comfort.',
        image: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=600&q=80'
      },
      {
        name: 'Converse Chuck Taylor All Star High Top',
        brand: 'Converse',
        category: catMap['Shoes'],
        price: 65,
        discountPrice: 55,
        stock: 45,
        rating: 4.6,
        numReviews: 1,
        isFeatured: false,
        description: 'Timeless silhouette loved since 1917, durable canvas upper, iconic ankle patch, and vulcanized rubber sole.',
        image: 'https://images.unsplash.com/photo-1607522370275-f14206abe5d3?auto=format&fit=crop&w=600&q=80'
      },
      {
        name: 'Vans Old Skool Skate Shoes',
        brand: 'Vans',
        category: catMap['Shoes'],
        price: 70,
        discountPrice: 59,
        stock: 40,
        rating: 4.7,
        numReviews: 1,
        isFeatured: false,
        description: 'First skate shoe to bare the iconic side stripe, reinforced toecaps, supportive padded collars, and signature rubber waffle outsoles.',
        image: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=600&q=80'
      },
      {
        name: 'Hoka Clifton 9 Road Running Shoes',
        brand: 'Hoka',
        category: catMap['Shoes'],
        price: 145,
        discountPrice: 129,
        stock: 7, // low stock (<10)
        rating: 4.9,
        numReviews: 1,
        isFeatured: false,
        description: 'Revitalized underfoot experience with responsive new foam, early stage MetaRocker, and breathable engineered knit.',
        image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=600&q=80'
      },
      {
        name: 'Dr. Martens 1460 Smooth Leather Boot',
        brand: 'Dr. Martens',
        category: catMap['Shoes'],
        price: 170,
        discountPrice: 145,
        stock: 12,
        rating: 4.7,
        numReviews: 1,
        isFeatured: false,
        description: 'The original 8-eye boot with grooved edges, scripted heel-loop, visible yellow welt stitching, and air-cushioned AirWair sole.',
        image: 'https://images.unsplash.com/photo-1518002171953-a080ee817e1f?auto=format&fit=crop&w=600&q=80'
      },
      {
        name: 'Birkenstock Arizona Birko-Flor Sandals',
        brand: 'Birkenstock',
        category: catMap['Shoes'],
        price: 110,
        discountPrice: 95,
        stock: 25,
        rating: 4.8,
        numReviews: 0,
        isFeatured: false,
        description: 'Anatomically shaped cork-latex footbed conforms to the shape of your foot with dual individually adjustable metal pin buckles.',
        image: 'https://images.unsplash.com/photo-1562183241-b937e95585b6?auto=format&fit=crop&w=600&q=80'
      },
      {
        name: 'Salomon XT-6 Trail Running Shoes',
        brand: 'Salomon',
        category: catMap['Shoes'],
        price: 200,
        discountPrice: 179,
        stock: 5, // low stock (<10)
        rating: 4.8,
        numReviews: 1,
        isFeatured: false,
        description: 'Downhill chassis and lug geometry provide stability on rugged terrain, Quicklace closure system, and EVA cushioning.',
        image: 'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=600&q=80'
      },

      // --- Home & Kitchen (10 products) ---
      {
        name: 'Instant Pot Duo 7-in-1 Pressure Cooker',
        brand: 'Instant Pot',
        category: catMap['Home & Kitchen'],
        price: 100,
        discountPrice: 79,
        stock: 28,
        rating: 4.8,
        numReviews: 2,
        isFeatured: true,
        description: 'Pressure cook, slow cook, rice cooker, yogurt maker, steamer, sauté pan and food warmer with 13 one-touch Smart Programs.',
        image: 'https://images.unsplash.com/photo-1584269600519-112d071b35e6?auto=format&fit=crop&w=600&q=80'
      },
      {
        name: 'Philips 3200 Series Fully Automatic Espresso Machine',
        brand: 'Philips',
        category: catMap['Home & Kitchen'],
        price: 799,
        discountPrice: 649,
        stock: 10,
        rating: 4.7,
        numReviews: 1,
        isFeatured: true,
        description: 'LatteGo milk system crowns your milk coffee with silky smooth froth, intuitive touch display, and 12-step ceramic grinder.',
        image: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?auto=format&fit=crop&w=600&q=80'
      },
      {
        name: 'Dyson V15 Detect Cordless Vacuum',
        brand: 'Dyson',
        category: catMap['Home & Kitchen'],
        price: 749,
        discountPrice: 629,
        stock: 8, // low stock (<10)
        rating: 4.9,
        numReviews: 2,
        isFeatured: true,
        description: 'Precisely-angled laser illuminates invisible dust on hard floors, piezo sensor counts particles, and Hyperdymium motor spins at 125,000rpm.',
        image: 'https://images.unsplash.com/photo-1558317374-067fb5f30001?auto=format&fit=crop&w=600&q=80'
      },
      {
        name: 'Ninja Professional Plus Kitchen System Blender',
        brand: 'Ninja',
        category: catMap['Home & Kitchen'],
        price: 199,
        discountPrice: 159,
        stock: 19,
        rating: 4.8,
        numReviews: 1,
        isFeatured: false,
        description: '1400-peak-watt motor powers through tough ingredients, Total Crushing pitcher, food processor bowl, and to-go cups.',
        image: 'https://images.unsplash.com/photo-1570222094114-d054a817e56b?auto=format&fit=crop&w=600&q=80'
      },
      {
        name: 'Cosori Air Fryer Pro LE 5.0 Quart',
        brand: 'Cosori',
        category: catMap['Home & Kitchen'],
        price: 99,
        discountPrice: 84,
        stock: 33,
        rating: 4.7,
        numReviews: 1,
        isFeatured: false,
        description: 'Up to 450°F cooking heat creates crispy results in minutes with up to 85% less oil than traditional deep frying.',
        image: 'https://images.unsplash.com/photo-1585515320310-259814833e62?auto=format&fit=crop&w=600&q=80'
      },
      {
        name: 'Le Creuset Enameled Cast Iron Dutch Oven 5.5 Qt',
        brand: 'Le Creuset',
        category: catMap['Home & Kitchen'],
        price: 420,
        discountPrice: 350,
        stock: 6, // low stock (<10)
        rating: 4.9,
        numReviews: 1,
        isFeatured: false,
        description: 'Handcrafted in France since 1925, superior heat distribution and retention, tight-fitting lid, and iconic vibrant enamel finish.',
        image: 'https://images.unsplash.com/photo-1584990347449-397a66b2670d?auto=format&fit=crop&w=600&q=80'
      },
      {
        name: 'KitchenAid Artisan Series 5 Quart Stand Mixer',
        brand: 'KitchenAid',
        category: catMap['Home & Kitchen'],
        price: 449,
        discountPrice: 379,
        stock: 14,
        rating: 4.9,
        numReviews: 1,
        isFeatured: false,
        description: '10 speeds to gently knead, thoroughly mix and whip ingredients, tilt-head design, and 59 touchpoints per rotation.',
        image: 'https://images.unsplash.com/photo-1594385208974-2e75f8d7bb48?auto=format&fit=crop&w=600&q=80'
      },
      {
        name: 'Fellow Stagg EKG Electric Gooseneck Kettle',
        brand: 'Fellow',
        category: catMap['Home & Kitchen'],
        price: 165,
        discountPrice: 145,
        stock: 21,
        rating: 4.8,
        numReviews: 1,
        isFeatured: false,
        description: 'To-the-degree variable temperature control, precision pour spout for pour-over coffee, LCD screen, and 60-minute heat hold mode.',
        image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=600&q=80'
      },
      {
        name: 'Zwilling J.A. Henckels Pro 8-Inch Chef Knife',
        brand: 'Zwilling',
        category: catMap['Home & Kitchen'],
        price: 160,
        discountPrice: 129,
        stock: 17,
        rating: 4.8,
        numReviews: 0,
        isFeatured: false,
        description: 'Precision forged from a single piece of special formula high carbon stainless steel, ice-hardened FRIODUR blade retains razor edge.',
        image: 'https://images.unsplash.com/photo-1593618998160-e34014e67546?auto=format&fit=crop&w=600&q=80'
      },
      {
        name: 'iRobot Roomba j7+ Self-Emptying Robot Vacuum',
        brand: 'iRobot',
        category: catMap['Home & Kitchen'],
        price: 799,
        discountPrice: 599,
        stock: 4, // low stock (<10)
        rating: 4.6,
        numReviews: 1,
        isFeatured: false,
        description: 'PrecisionVision navigation avoids pet waste and cords, cleans in neat rows, and empties itself into Clean Base for 60 days.',
        image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=600&q=80'
      },

      // --- Books (10 products) ---
      {
        name: 'Atomic Habits by James Clear',
        brand: 'Penguin Random House',
        category: catMap['Books'],
        price: 27,
        discountPrice: 18,
        stock: 60,
        rating: 4.9,
        numReviews: 2,
        isFeatured: true,
        description: 'An easy and proven way to build good habits and break bad ones. Over 15 million copies sold worldwide.',
        image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80'
      },
      {
        name: 'Designing Data-Intensive Applications',
        brand: "O'Reilly Media",
        category: catMap['Books'],
        price: 49,
        discountPrice: 39,
        stock: 25,
        rating: 4.9,
        numReviews: 2,
        isFeatured: true,
        description: 'The big ideas behind reliable, scalable, and maintainable systems by Martin Kleppmann. Essential reading for software engineers.',
        image: 'https://images.unsplash.com/photo-1532012164546-f432f2e3777a?auto=format&fit=crop&w=600&q=80'
      },
      {
        name: 'Clean Code: A Handbook of Agile Software Craftsmanship',
        brand: 'Prentice Hall',
        category: catMap['Books'],
        price: 45,
        discountPrice: 35,
        stock: 30,
        rating: 4.7,
        numReviews: 1,
        isFeatured: false,
        description: 'Robert C. Martin introduces peer-tested principles and best practices of writing clean, maintainable, and readable code.',
        image: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&w=600&q=80'
      },
      {
        name: 'The Psychology of Money by Morgan Housel',
        brand: 'Harriman House',
        category: catMap['Books'],
        price: 20,
        discountPrice: 15,
        stock: 40,
        rating: 4.8,
        numReviews: 1,
        isFeatured: false,
        description: 'Timeless lessons on wealth, greed, and happiness doing well with money is not necessarily about what you know, but how you behave.',
        image: 'https://images.unsplash.com/photo-1592496431122-2349e0fbc666?auto=format&fit=crop&w=600&q=80'
      },
      {
        name: 'Sapiens: A Brief History of Humankind',
        brand: 'Harper',
        category: catMap['Books'],
        price: 25,
        discountPrice: 19,
        stock: 35,
        rating: 4.8,
        numReviews: 1,
        isFeatured: false,
        description: 'Yuval Noah Harari spans the whole of human history from the very first humans to walk the earth to radical technological breakthroughs.',
        image: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=600&q=80'
      },
      {
        name: 'Dune: Deluxe Edition by Frank Herbert',
        brand: 'Ace Books',
        category: catMap['Books'],
        price: 35,
        discountPrice: 28,
        stock: 15,
        rating: 4.9,
        numReviews: 1,
        isFeatured: true,
        description: 'The triumph of the imagination, Frank Herbert’s legendary science fiction epic set on the desert planet Arrakis in a gorgeous hardcover.',
        image: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&w=600&q=80'
      },
      {
        name: 'Thinking, Fast and Slow by Daniel Kahneman',
        brand: 'Farrar, Straus and Giroux',
        category: catMap['Books'],
        price: 22,
        discountPrice: 16,
        stock: 28,
        rating: 4.7,
        numReviews: 1,
        isFeatured: false,
        description: 'Nobel Memorial Prize laureate Daniel Kahneman takes us on a groundbreaking tour of the two systems that drive the way we think.',
        image: 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=600&q=80'
      },
      {
        name: 'The Pragmatic Programmer: 20th Anniversary Edition',
        brand: 'Addison-Wesley',
        category: catMap['Books'],
        price: 55,
        discountPrice: 44,
        stock: 9, // low stock (<10)
        rating: 4.9,
        numReviews: 1,
        isFeatured: false,
        description: 'David Thomas and Andrew Hunt explore the core of modern development: software craftsmanship, architecture, and career mastery.',
        image: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?auto=format&fit=crop&w=600&q=80'
      },
      {
        name: 'Deep Work by Cal Newport',
        brand: 'Grand Central Publishing',
        category: catMap['Books'],
        price: 28,
        discountPrice: 21,
        stock: 32,
        rating: 4.8,
        numReviews: 0,
        isFeatured: false,
        description: 'Rules for focused success in a distracted world, teaching how to master complicated information and produce better results in less time.',
        image: 'https://images.unsplash.com/photo-1476275466078-4007374efbbe?auto=format&fit=crop&w=600&q=80'
      },
      {
        name: 'Project Hail Mary by Andy Weir',
        brand: 'Ballantine Books',
        category: catMap['Books'],
        price: 24,
        discountPrice: 17,
        stock: 5, // low stock (<10)
        rating: 4.9,
        numReviews: 1,
        isFeatured: false,
        description: 'A lone astronaut must save the earth from disaster in this incredible interstellar adventure from the author of The Martian.',
        image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=600&q=80'
      }
    ];

    const createdProducts = await Product.insertMany(productsData);

    // 5. Seed 50 Reviews distributed across products and users
    const sampleReviewsData = [
      { rating: 5, comment: 'Absolutely outstanding quality! Exceeded my expectations in every way.' },
      { rating: 5, comment: 'Best purchase I have made this year. High performance and build quality.' },
      { rating: 4, comment: 'Very good product for the price. Fast shipping and solid packaging.' },
      { rating: 5, comment: 'Incredible design and feel. Works straight out of the box effortlessly.' },
      { rating: 4, comment: 'Solid construction and works great. Minor setup learning curve.' },
      { rating: 5, comment: 'Highly recommended! Reliable and durable everyday companion.' },
      { rating: 3, comment: 'Decent performance overall, though there is slight room for improvement.' },
      { rating: 4, comment: 'Comfortable, sleek, and performs as advertised. Happy customer!' },
      { rating: 5, comment: 'Premium experience from start to finish. Would definitely buy again.' },
      { rating: 4, comment: 'Great value for money! Functions smoothly and fits all my needs.' }
    ];

    const reviewsToInsert = [];
    for (let i = 0; i < 50; i++) {
      const user = customers[i % customers.length];
      const product = createdProducts[i % createdProducts.length];
      const template = sampleReviewsData[i % sampleReviewsData.length];

      reviewsToInsert.push({
        user: user._id,
        product: product._id,
        rating: template.rating,
        comment: `${template.comment} Verified buyer review #${i + 1}.`,
        createdAt: new Date(Date.now() - i * 86400000 * 2)
      });
    }

    await Review.insertMany(reviewsToInsert);

    // 6. Seed 20 Realistic Orders (All Cash On Delivery)
    const statuses = ['PLACED', 'CONFIRMED', 'SHIPPED', 'DELIVERED', 'CANCELLED'];
    const ordersToInsert = [];

    for (let i = 0; i < 20; i++) {
      const customer = customers[i % customers.length];
      const prod1 = createdProducts[(i * 3) % createdProducts.length];
      const prod2 = createdProducts[(i * 3 + 1) % createdProducts.length];

      const price1 = prod1.discountPrice > 0 ? prod1.discountPrice : prod1.price;
      const price2 = prod2.discountPrice > 0 ? prod2.discountPrice : prod2.price;

      const orderProducts = [
        {
          product: prod1._id,
          quantity: (i % 2) + 1,
          price: price1
        },
        {
          product: prod2._id,
          quantity: 1,
          price: price2
        }
      ];

      const totalAmount = orderProducts.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );

      const status = statuses[i % statuses.length];

      ordersToInsert.push({
        user: customer._id,
        products: orderProducts,
        shippingAddress: {
          name: customer.name,
          phone: customer.phone,
          address: customer.address.street,
          city: customer.address.city,
          state: customer.address.state,
          pincode: customer.address.pincode
        },
        totalAmount,
        paymentMethod: 'COD',
        orderStatus: status,
        createdAt: new Date(Date.now() - (20 - i) * 86400000 * 1.5)
      });
    }

    await Order.insertMany(ordersToInsert);

    // Print the exact requested output format:
    console.log(`Categories: ${createdCategories.length}`);
    console.log(`Users: ${createdUsers.length}`);
    console.log(`Products: ${createdProducts.length}`);
    console.log(`Reviews: ${reviewsToInsert.length}`);
    console.log(`Orders: ${ordersToInsert.length}`);
    console.log('\nSeed completed successfully.');

    await disconnectDB();
    process.exit(0);
  } catch (error) {
    console.error('Error during database seeding:', error);
    process.exit(1);
  }
};

seedData();
