import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, collection, getDocs } from 'firebase/firestore';
import { auth, db } from '../../firebaseConfig';


export const fetchUserDetails = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      unsubscribe(); // stop listening after getting the user once

      if (!user) {
        resolve(null);
        return;
      }

      try {
        const docRef = doc(db, 'userData', user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          resolve({
            email: user.email,
            companyName: data.companyName || '',
            adminName: data.adminName || '',
          });
        } else {
          console.warn('No such user document!');
          resolve(null);
        }
      } catch (error) {
        console.error('Error fetching user details:', error);
        reject(error);
      }
    });
  });
};


// fetchEmployees
export const fetchEmployees = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      unsubscribe();

      if (!user) {
        resolve([]); // or reject if you prefer
        return;
      }

      try {
        const employeesRef = collection(db, 'userData', user.uid, 'employees');
        const snapshot = await getDocs(employeesRef);

        const employees = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }));

        resolve(employees);
      } catch (error) {
        console.error('Error fetching employees:', error);
        reject(error);
      }
    });
  });
};
