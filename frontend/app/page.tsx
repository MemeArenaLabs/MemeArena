import Image from "next/image";
import Button from "../components/Button";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <section className="layout">
        <h2> Landing page</h2>
        <Link href={"/app"}>
          <button className="btn">Launch App</button>
        </Link>
      </section>
    </main>
  );
}
