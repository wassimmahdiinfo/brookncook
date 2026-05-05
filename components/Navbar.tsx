import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        
        {/* LOGO */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/Logo.png"
            alt="Brook'n'Cook"
            width={140}
            height={90}
            priority
            className="object-contain w-[120px] h-auto"
          />
        </Link>

        {/* MENU */}
        <nav className="flex gap-6">
          <Link href="/">Accueil</Link>
          <Link href="/products">Produits</Link>
        </nav>
        
      </div>
    </header>
  );
}