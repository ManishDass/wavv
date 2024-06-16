import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';

const fetchUserProfile = async (uid) => {
  try {
    const userDoc = await getDoc(doc(db, 'users', uid));
    if (userDoc.exists()) {
      return userDoc.data();
    } else {
      console.log("No such user profile!");
      return null;
    }
  } catch (error) {
    console.error("Error fetching user profile: ", error);
    return null;
  }
};

export default fetchUserProfile;
