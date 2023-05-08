import { firestore } from '../../firebase';
import { collection, doc, getDocs, getDoc, setDoc, query, where } from '@firebase/firestore';

async function checkUser(user) {
  const docRef = doc(collection(firestore, 'users'), user);
  const docSnapshot = await getDoc(docRef);

  if (docSnapshot.exists()) {
    const userData = docSnapshot.data();
    const name = userData.name;
    return { allow: false, name: name };
  } else {
    return { allow: true, name: undefined };
  }
}
async function addUser(id, name) {
  // eslint-disable-next-line no-unused-vars
  // format inputs
  const inputId = id.toLowerCase();
  const inputName = name
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
  const docId = inputId.replace('@uci.edu', '');

  if ((await checkUser(docId)).allow) {
    try {
      const docRef = doc(collection(firestore, 'users'), docId);
      await setDoc(docRef, {
        id: inputId,
        name: inputName
      });
      alert('Registered User!');
    } catch (e) {
      alert('Error registering user ', e);
    }
  } else {
    alert('User is already registered');
  }
}
const getUser = async (documentName) => {
  if (!documentName || documentName.trim() === '') {
    return null;
  }
  const q = query(collection(firestore, 'users'), where('name', '==', documentName));
  const querySnapshot = await getDocs(q);
  if (querySnapshot.docs.length === 0) {
    return null;
  } else {
    const userData = querySnapshot.docs[0].data();
    const name = userData.name;
    return name;
  }
};

export { addUser, checkUser, getUser };
