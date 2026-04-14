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
        <nav className="flex justify-between items-center p-4 bg-white shadow">
  

  <div className="flex gap-4">
    <a href="/">Accueil</a>
    <a href="/products">Produits</a>
    <a href="/admin">Admin</a>
  </div>
</nav>

        
      </div>
    </header>
  );
}