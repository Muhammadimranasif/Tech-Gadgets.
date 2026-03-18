import { Product } from '../types';

export const initialProducts: Product[] = [
  {
    id: 'prod_1',
    name: 'Quantum X Pro Smartphone 5G',
    price: 899.99,
    originalPrice: 1099.99,
    images: [
      'https://images.unsplash.com/photo-1598327105666-5b89351cb315?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&q=80&w=1000'
    ],
    category: 'smartphones',
    stock: 15,
    rating: 4.8,
    reviewsCount: 342,
    description: 'Experience the future with the Quantum X Pro. Featuring a revolutionary 120Hz OLED display, next-gen AI camera system, and all-day battery life.',
    features: ['6.7" OLED Display', '108MP Main Camera', '5000mAh Battery', '256GB Storage', '5G Ready'],
    isFlashSale: true,
    flashSaleEndsAt: new Date(Date.now() + 86400000 * 2).toISOString(), // 2 days from now
  },
  {
    id: 'prod_2',
    name: 'AeroNoise Cancelling Earbuds',
    price: 149.99,
    originalPrice: 199.99,
    images: [
      'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1606220588913-b3aecb47115a?auto=format&fit=crop&q=80&w=1000'
    ],
    category: 'audio',
    stock: 45,
    rating: 4.6,
    reviewsCount: 890,
    description: 'Immerse yourself in pure sound. Active noise cancellation blocks out the world, while 10mm dynamic drivers deliver deep bass and crisp highs.',
    features: ['Active Noise Cancellation', '30 Hours Battery Life', 'Water Resistant (IPX4)', 'Touch Controls'],
  },
  {
    id: 'prod_3',
    name: 'Titanium Smartwatch Series 8',
    price: 349.99,
    originalPrice: 399.99,
    images: [
      'https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?auto=format&fit=crop&q=80&w=1000'
    ],
    category: 'wearables',
    stock: 8,
    rating: 4.9,
    reviewsCount: 128,
    description: 'Your ultimate fitness companion. Track your health metrics, receive notifications, and pay on the go with this sleek titanium smartwatch.',
    features: ['Always-On Retina Display', 'ECG App', 'Blood Oxygen Sensor', 'Water Resistant to 50m'],
  },
  {
    id: 'prod_4',
    name: 'UltraWide Curved Gaming Monitor 34"',
    price: 599.99,
    images: [
      'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&q=80&w=1000'
    ],
    category: 'accessories',
    stock: 22,
    rating: 4.7,
    reviewsCount: 56,
    description: 'Dominate the game with a 144Hz refresh rate and 1ms response time on a stunning 34-inch curved ultrawide display.',
    features: ['34" WQHD Resolution', '144Hz Refresh Rate', '1ms Response Time', 'AMD FreeSync Premium'],
  },
  {
    id: 'prod_5',
    name: 'Pro Mechanical Keyboard RGB',
    price: 129.99,
    originalPrice: 159.99,
    images: [
      'https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&q=80&w=1000'
    ],
    category: 'accessories',
    stock: 5,
    rating: 4.5,
    reviewsCount: 210,
    description: 'Tactile, responsive, and customizable. Featuring hot-swappable switches and per-key RGB lighting for the ultimate typing experience.',
    features: ['Hot-Swappable Switches', 'Per-Key RGB', 'Aluminum Frame', 'Detachable USB-C'],
    isFlashSale: true,
    flashSaleEndsAt: new Date(Date.now() + 86400000 * 1).toISOString(),
  },
  {
    id: 'prod_6',
    name: 'NextGen Console Controller',
    price: 69.99,
    images: [
      'https://images.unsplash.com/photo-1600080972464-8e5f35f63d08?auto=format&fit=crop&q=80&w=1000'
    ],
    category: 'accessories',
    stock: 120,
    rating: 4.8,
    reviewsCount: 1024,
    description: 'Experience haptic feedback and adaptive triggers that bring your games to life. Ergonomic design for hours of comfortable play.',
    features: ['Haptic Feedback', 'Adaptive Triggers', 'Built-in Microphone', 'USB-C Charging'],
  }
];
