import Link from "next/link";
import Nav from "@/components/NavBar";

export default function NotFound() {
	return (
		<>
			<Nav />
			<div className="flex flex-col items-center justify-center min-h-screen bg-green-100 text-green-900">
				<h1 className="text-6xl font-bold mb-4">404</h1>
				<h2 className="text-2xl mb-8">Página no encontrada</h2>
				<p className="mb-8 text-center">
					Lo sentimos, no pudimos encontrar la página que estás buscando. 
					Recuerda que cada acción cuenta para combatir el cambio climático.
				</p>
				<Link href="/">
					<p className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
						Volver al inicio
					</p>
				</Link>
			</div>
		</>
	);
}
