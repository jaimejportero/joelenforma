import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <div className="font-bold text-lg">NutriApp</div>
      <div className="space-x-4">
        <Link to="/" className="hover:underline">Inicio</Link>
        <Link to="/dietas" className="hover:underline">Dietas</Link>
      </div>
    </nav>
  );
}