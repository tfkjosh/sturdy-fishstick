import Image from "next/image";
import { Navbar } from "./components/layout/navbar";

export default function Home() {
  return (
    <div>
      <Navbar />
      <h1> Hello! </h1>
    </div>
  );
}
