import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <h1>
        <Link href="/create">Create</Link>
      </h1>
      <h1>Hello World!</h1>
    </main>
  );
}
