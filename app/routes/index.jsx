// app/routes/index.tsx
import { Link } from 'react-router-dom';

export default function Index() {
  return (
    <div>
      <h1>Welcome to Digital Immortality!</h1>
      <Link to="/about">About</Link>
    </div>
  );
}