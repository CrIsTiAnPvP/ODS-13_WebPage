"use client"
import SpotlightCard from './SpotlightCard/SpotlightCard';
import { useTranslations } from 'next-intl';


export default function MainPage() {
	const t = useTranslations("mainpage")
  return (
	<>
		<div className='flex flex-col items-center justify-center'>
			<div className='w-2/3 relative h-full'>
				<div className='mt-5 w-full grid grid-cols-1 justify-center items-start gap-x-2 h-max gap-y-4 mb-5 md:grid-cols-2 lg:grid-cols-3'>
					<SpotlightCard className="custom-spotlight-card z-10 col-span-3 md:col-span-1" spotlightColor="rgba(72, 118, 59, 0.5)">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="white" className="size-8 mb-2">
							<path d="M10 1a6 6 0 0 0-3.815 10.631C7.237 12.5 8 13.443 8 14.456v.644a.75.75 0 0 0 .572.729 6.016 6.016 0 0 0 2.856 0A.75.75 0 0 0 12 15.1v-.644c0-1.013.762-1.957 1.815-2.825A6 6 0 0 0 10 1ZM8.863 17.414a.75.75 0 0 0-.226 1.483 9.066 9.066 0 0 0 2.726 0 .75.75 0 0 0-.226-1.483 7.553 7.553 0 0 1-2.274 0Z" />
						</svg>
						<h1 className="text-2xl font-bold text-gray-300">{t('1.t')}</h1>
						<p className="text-xl text-gray-400">{t('1.st')}</p>
						<div></div>
					</SpotlightCard>
					<SpotlightCard className="custom-spotlight-card z-10 col-span-3 md:col-span-1" spotlightColor="rgba(72, 118, 59, 0.5)">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="white" className="size-8 mb-2">
							<path fillRule="evenodd" d="M10.339 2.237a.531.531 0 0 0-.678 0 11.947 11.947 0 0 1-7.078 2.75.5.5 0 0 0-.479.425A12.11 12.11 0 0 0 2 7c0 5.163 3.26 9.564 7.834 11.257a.48.48 0 0 0 .332 0C14.74 16.564 18 12.163 18 7c0-.538-.035-1.069-.104-1.589a.5.5 0 0 0-.48-.425 11.947 11.947 0 0 1-7.077-2.75ZM10 6a.75.75 0 0 1 .75.75v3.5a.75.75 0 0 1-1.5 0v-3.5A.75.75 0 0 1 10 6Zm0 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" clipRule="evenodd" />
						</svg>
						<h1 className="text-2xl font-bold text-gray-300">{t('4.t')}</h1>
						<p className="text-lg text-gray-400">{t('4.st')}</p>
					</SpotlightCard>
					<SpotlightCard className="custom-spotlight-card z-10 col-span-3 md:col-span-1" spotlightColor="rgba(72, 118, 59, 0.5)">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="white" className="size-8 mb-2">
							<path fillRule="evenodd" d="M13.5 4.938a7 7 0 1 1-9.006 1.737c.202-.257.59-.218.793.039.278.352.594.672.943.954.332.269.786-.049.773-.476a5.977 5.977 0 0 1 .572-2.759 6.026 6.026 0 0 1 2.486-2.665c.247-.14.55-.016.677.238A6.967 6.967 0 0 0 13.5 4.938ZM14 12a4 4 0 0 1-4 4c-1.913 0-3.52-1.398-3.91-3.182-.093-.429.44-.643.814-.413a4.043 4.043 0 0 0 1.601.564c.303.038.531-.24.51-.544a5.975 5.975 0 0 1 1.315-4.192.447.447 0 0 1 .431-.16A4.001 4.001 0 0 1 14 12Z" clipRule="evenodd" />
						</svg>
						<h1 className="text-2xl font-bold text-gray-300">{t('2.t')}</h1>
						<p className="text-xl text-gray-400">{t('2.st')}</p>
					</SpotlightCard>
					<SpotlightCard className="custom-spotlight-card z-10 col-span-3" spotlightColor="rgba(72, 118, 59, 0.5)">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="white" className="size-8 mb-2">
							<path fillRule="evenodd" d="M10.339 2.237a.531.531 0 0 0-.678 0 11.947 11.947 0 0 1-7.078 2.75.5.5 0 0 0-.479.425A12.11 12.11 0 0 0 2 7c0 5.163 3.26 9.564 7.834 11.257a.48.48 0 0 0 .332 0C14.74 16.564 18 12.163 18 7c0-.538-.035-1.069-.104-1.589a.5.5 0 0 0-.48-.425 11.947 11.947 0 0 1-7.077-2.75ZM10 6a.75.75 0 0 1 .75.75v3.5a.75.75 0 0 1-1.5 0v-3.5A.75.75 0 0 1 10 6Zm0 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" clipRule="evenodd" />
						</svg>
						<h1 className="text-2xl font-bold text-gray-300">{t('3.t')}</h1>
						<p className="text-xl text-gray-400">{t('3.st')}</p>
					</SpotlightCard>
					<SpotlightCard className="custom-spotlight-card z-10 col-span-3 col-start-1" spotlightColor="rgba(72, 118, 59, 0.5)">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="white" className="size-8 mb-2">
							<path fillRule="evenodd" d="M4.606 12.97a.75.75 0 0 1-.134 1.051 2.494 2.494 0 0 0-.93 2.437 2.494 2.494 0 0 0 2.437-.93.75.75 0 1 1 1.186.918 3.995 3.995 0 0 1-4.482 1.332.75.75 0 0 1-.461-.461 3.994 3.994 0 0 1 1.332-4.482.75.75 0 0 1 1.052.134Z" clipRule="evenodd" />
							<path fillRule="evenodd" d="M5.752 12A13.07 13.07 0 0 0 8 14.248v4.002c0 .414.336.75.75.75a5 5 0 0 0 4.797-6.414 12.984 12.984 0 0 0 5.45-10.848.75.75 0 0 0-.735-.735 12.984 12.984 0 0 0-10.849 5.45A5 5 0 0 0 1 11.25c.001.414.337.75.751.75h4.002ZM13 9a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" clipRule="evenodd" />
						</svg>

						<h1 className="text-2xl font-bold text-gray-300">{t('5.t')}</h1>
						<p className="text-xl text-gray-400">{t('5.st')}</p>
					</SpotlightCard>
				</div>
			</div>
		</div>
		
	</>
  )
}
