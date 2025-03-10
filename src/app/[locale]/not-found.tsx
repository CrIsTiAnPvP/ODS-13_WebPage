import Link from "next/link";
import Nav from "@/components/NavBar";
import { useTranslations, useLocale } from "next-intl";
import Image from "next/image";

export default function NotFound() {
	const locale = useLocale();
	const t = useTranslations("404");

	return (
		<>
			<Nav /> 	
			<div className="p-0 flex flex-col items-center justify-center min-h-screen bg-[#0b9e65] text-green-900">
				<Image
					src={"/gif/travel.gif"}
					alt="404"
					width={300}
					height={300}
				/>
				<h1 className="text-6xl font-bold mb-4">404</h1>
				<h2 className="text-2xl mb-8">{t('1')}</h2>
				<p className="mb-8 text-center">{t('2')}</p>
				<Link href={`/${locale}`}>
					<p className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">{t('3')}</p>
				</Link>
			</div>
		</>
	);
}
