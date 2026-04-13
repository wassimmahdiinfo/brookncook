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
            className="object-contain w-[120px] h-auto"
          />
        </Link>

        {/* MENU */}
        <nav className="flex gap-6 text-sm font-medium">
          <Link href="/" className="hover:text-[#5c3d2e]">
            Accueil
          </Link>
          <Link href="/products" className="hover:text-[#5c3d2e]">
            Produits
          </Link>
          <Link href="/admin" className="hover:text-[#5c3d2e]">
            Admin
          </Link>
        </nav>
      </div>
    </header>
  );
}