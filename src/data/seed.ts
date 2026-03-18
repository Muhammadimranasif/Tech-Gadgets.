import { collection, doc, getDocs, setDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { initialProducts } from './products';

export const seedProducts = async () => {
  try {
    const productsRef = collection(db, 'products');
    const snapshot = await getDocs(productsRef);
    
    if (snapshot.empty) {
      console.log('Seeding products...');
      const promises = initialProducts.map(product => {
        const docRef = doc(db, 'products', product.id);
        return setDoc(docRef, product);
      });
      await Promise.all(promises);
      console.log('Products seeded successfully!');
    }
  } catch (error) {
    console.error('Error seeding products:', error);
  }
};
