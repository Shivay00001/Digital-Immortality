import { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import {
  getFirestore, collection, addDoc, getDocs
} from 'firebase/firestore';
import {
  getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut
} from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCoLh5UXizvZkKRKK6zUHDlwVA0EjcwxVE",
  authDomain: "digital-immortality1.firebaseapp.com",
  projectId: "digital-immortality1",
  storageBucket: "digital-immortality1.firebasestorage.app",
  messagingSenderId: "28222298619",
  appId: "1:28222298619:web:188e39e8c1af978ea6d35e",
  measurementId: "G-YKX8YBPX1V"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export default function Index() {
  const [user, setUser] = useState(null);
  const [memories, setMemories] = useState([]);
  const [newMemory, setNewMemory] = useState("");

  useEffect(() => {
    onAuthStateChanged(auth, user => {
      setUser(user);
      if (user) loadMemories();
    });
  }, []);

  const loadMemories = async () => {
    const snapshot = await getDocs(collection(db, "memories"));
    const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setMemories(data);
  };

  const handleSignIn = () => signInWithPopup(auth, provider);
  const handleSignOut = () => signOut(auth);

  const addMemory = async () => {
    if (!newMemory) return;
    await addDoc(collection(db, "memories"), {
      text: newMemory,
      user: user.displayName,
      timestamp: new Date()
    });
    setNewMemory("");
    loadMemories();
  };

  return (
    <div style={{ padding: 20, maxWidth: 600, margin: "0 auto" }}>
      <h1>Digital Immortality Archive</h1>

      {!user ? (
        <button onClick={handleSignIn}>Sign in with Google</button>
      ) : (
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <p>Welcome, {user.displayName}</p>
            <button onClick={handleSignOut}>Sign Out</button>
          </div>
          <textarea
            placeholder="Write a memory or thought..."
            value={newMemory}
            onChange={e => setNewMemory(e.target.value)}
          />
          <button onClick={addMemory}>Save Memory</button>

          <h2>Your Memories</h2>
          <ul>
            {memories.map(mem => (
              <li key={mem.id}>
                <p>{mem.text}</p>
                <small>By {mem.user}</small>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}