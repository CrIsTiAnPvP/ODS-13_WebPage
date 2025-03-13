"use client"
import { useTranslations, useLocale } from "next-intl"
import Image from "next/image"
import { useState } from "react"
import Link from "next/link"

export default function OdsComponent() {

	const links: { [key: number]: [string, string][] } = {
		1: [["Javier","https://jarrval222.github.io/"], ["Miguel Bueno", "https://mbuefeijoo.github.io/"], ["Bea", "https://bgarciaa181.github.io/"], ["Máximo", "https://msanfer1403.github.io/"]],
		2: [["ONU-ES", "https://www.un.org/sustainabledevelopment/es/hunger/"], ["ONU-EN", "https://www.un.org/sustainabledevelopment/hunger/"]], // [0] Español, [1] Inglés
		3: [["Juan Amador", "https://jhingalv.github.io/index-ods.html"], ["Jesús", "https://marinettoo.github.io/"]],
		4: [["David", "https://davidhlanz.github.io/"]],
		5: [["ONU-ES", "https://www.un.org/sustainabledevelopment/es/gender-equality/"], ["ONU-EN", "https://www.un.org/sustainabledevelopment/gender-equality/"]], // [0] Español, [1] Inglés
		6: [["Nicolás", "https://nbc0711-car.github.io/"], ["Alvaro", "https://alvarorpulido.github.io/"]],
		7: [["Francisco", "https://franmab44.github.io/"], ["Xiana", "https://xtolgal704.github.io/"]],
		8: [["ONU-ES", "https://www.un.org/sustainabledevelopment/es/economic-growth/"], ["ONU-EN", "https://www.un.org/sustainabledevelopment/economic-growth/"]], // [0] Español, [1] Inglés
		9: [["ONU-ES", "https://www.un.org/sustainabledevelopment/es/infrastructure/"], ["ONU-EN", "https://www.un.org/sustainabledevelopment/infrastructure/"]], // [0] Español, [1] Inglés
		10: [["ONU-ES", "https://www.un.org/sustainabledevelopment/es/inequality/"], ["ONU-EN", "https://www.un.org/sustainabledevelopment/inequality/"]], // [0] Español, [1] Inglés
		11: [["ONU-ES", "https://www.un.org/sustainabledevelopment/es/cities/"], ["ONU-EN", "https://www.un.org/sustainabledevelopment/cities/"]], // [0] Español, [1] Inglés
		12: [["Paula", "https://p4u74r.github.io/"]],
		13: [["Ismael", "https://imarrui599.github.io/"], ["Manuel", "https://manololama-source.github.io/"]],
		14: [["Pablo", "https://heylo03.github.io/"]],
		15: [["ONU-ES", "https://www.un.org/sustainabledevelopment/es/biodiversity/"], ["ONU-EN", "https://www.un.org/sustainabledevelopment/biodiversity/"]], // [0] Español [1] Inglés
		16: [["Raúl", "https://ribasol.github.io/"], ["Jorge", "https://jorgepello.github.io/"]],
		17: [["ONU-ES", "https://www.un.org/sustainabledevelopment/es/globalpartnerships/"], ["ONU-EN", "https://www.un.org/sustainabledevelopment/globalpartnerships/"]] // [0] Español, [1] Inglés
	}

	const t = useTranslations("ods")
	const locale = useLocale()

	const [modal, setModal] = useState(false)
	const [modalContent, setModalContent] = useState({ods: 0})

  return (
	<>
		<section className="py-12 bg-gray-100/30 lg:min-h-0">
			<div className="container mx-auto px-4">
				<h1 className="text-2xl font-bold lg:mb-5 lg:text-3xl">{t('t')}</h1>
				<h2 className="text-xs font-semibold lg:text-xl">{t('1st')}</h2>
			</div>
		</section>
		<hr className="my-4 border-t-2 border-gray-500" />
		<section className="py-12 bg-gray-100/30 min-h-screen lg:min-h-0">
			<div className="container mx-auto px-4">
				<h1 className="text-2xl font-bold mb-5 lg:text-3xl">{t('title')}</h1>
				<h2 className="text-xl font-semibold lg:text-2xl">{t('st')}</h2>
			</div>
			<div className="container mx-auto px-4 mt-5">
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
					{
						Array.from({ length: 17}).map((_, i) => (
							<div key={i} 
							className="p-4 bg-gray-100/50 rounded-lg flex gap-5 items-center active:bg-gray-100/80 active:scale-[0.99] transition-transform duration-300 hover:cursor-pointer hover:scale-[1.03] hover:bg-gray-100/80"
							onClick={() => (setModalContent({ods: i + 1}), setModal(true))}
							>
								<Image 
								src={`/images/ods/${locale}/${i+1}.jpg`}
								width={500}
								height={500}
								alt={t(`${i + 1}.title`)}
								className="rounded-lg h-24 w-24 lg:w-34 lg:h-34"
								/>
								<div>
									<h3 className="text-xl font-semibold">{t(`${i + 1}.title`)}</h3>
									<p className="text-gray-700">{t(`${i + 1}.desc`)}</p>
								</div>
								<div className="mt-4">
									
								</div>
							</div>
						))
					}
				</div>
			</div>
		</section>
		{
			modal && (
				<div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
					<div className="bg-white/90 p-4 rounded-lg max-w-3xl w-full">
						<div className="flex justify-between items-center">
							<h2 className="text-2xl font-bold">{`${t('modal.t1')}${links[modalContent.ods].length}${t('modal.t2')}${modalContent.ods}`}</h2>
							<button onClick={() => setModal(false)} className="text-red-500 text-xl hover:cursor-pointer hover:scale-[1.1] transition-transform duration-300">
								<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
								</svg>
							</button>
						</div>
						<p className="text-gray-700 mt-2">{t('modal.st')}</p>
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
							{
								links[modalContent.ods].map((item, i) => (
									<Link key={i} 
									href={item[1]} 
									target="_blank" 
									rel="noreferrer" 
									className="p-4 bg-(--fern-green-2)/70 rounded-lg flex gap-2 items-center justify-center active:bg-(--fern-green-2)/80 active:scale-[0.99] transition-transform duration-300 hover:scale-[1.025] "
									>	
										<p className="text-lg font-semibold">{item[0]}</p>
									</Link>
								))
							}
						</div>
					</div>
				</div>
			)
		}
	</>
  )
}
