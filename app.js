import { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import {
  getFirestore, collection, addDoc, getDocs
} from 'firebase/firestore';
import {
  getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut
} from 'firebase/auth';
import { Button } from "@/components/ui/button";

// Replace the placeholder with your actual Firebase config values
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

export default function App() {
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
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Digital Immortality Archive</h1>

      {!user ? (
        <Button onClick={handleSignIn}>Sign in with Google</Button>
      ) : (
        <div>
          <div className="flex justify-between items-center mb-4">
            <p className="text-sm">Welcome, {user.displayName}</p>
            <Button variant="outline" onClick={handleSignOut}>Sign Out</Button>
          </div>
          <textarea
            className="w-full p-2 border rounded mb-2"
            placeholder="Write a memory or thought..."
            value={newMemory}
            onChange={e => setNewMemory(e.target.value)}
          />
          <Button onClick={addMemory}>Save Memory</Button>

          <h2 className="text-xl font-semibold mt-6 mb-2">Your Memories</h2>
          <ul className="space-y-2">
            {memories.map(mem => (
              <li key={mem.id} className="border p-2 rounded">
                <p className="text-sm text-gray-700">{mem.text}</p>
                <p className="text-xs text-gray-400">By {mem.user}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}