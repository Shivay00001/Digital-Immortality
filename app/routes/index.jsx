import { Link } from "@remix-run/react";

export default function Index() {
  return (
    <div>
      <h1>Welcome to the Digital Immortality Archive</h1>
      <Link to="/about">Go to About Page</Link>
    </div>
  );
}