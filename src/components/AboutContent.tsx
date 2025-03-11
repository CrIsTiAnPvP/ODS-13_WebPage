import { useTranslations } from "next-intl";
import { siReact, siMongodb, siNodedotjs, siNextdotjs, siPreact, siI18next, siTailwindcss, siPrisma, SimpleIcon, siNginx } from "simple-icons"


export default function AboutContent() {

	const t = useTranslations("about");

	const Technology = ({ title, description }: { title: React.ReactNode, description: string }) => (
		<div className="p-4">
			{title}
			<p className="text-gray-700">{description}</p>
		</div>
	);

	const icons = [[siReact, '#61DAFB'], [siNodedotjs, '#5FA04E'], [siNextdotjs, '#000000'], [siMongodb, '#47A248'], [siPreact, '#673AB8'], [siI18next, '#26A69A'], [siTailwindcss, '#06B6D4'], [siPrisma, '#2D3748'], [siNginx, '#009639']];

	return (
		<>
			<section className="py-12 bg-gray-100/30 lg:min-h-0">
				<div className="container mx-auto px-4">
					<h1 className="text-3xl font-bold mb-6">{t('title')}</h1>
					<p className="text-lg text-gray-700 mb-8">{t('description')}</p>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
					</div>
				</div>
			</section>
			<hr className="my-4 border-t-2 border-gray-500" />
			<section className="py-12 bg-gray-100/30 min-h-screen lg:min-h-0">
				<div className="container mx-auto px-4">
					<h1 className="text-3xl font-bold mb-6">{t('technologies.title')}</h1>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
						{icons.map((icon, index) => (
							<Technology
								key={index}
								title={
									<div className="flex items-center text-sm">
										<svg className="w-8 h-8 mr-2" 
											dangerouslySetInnerHTML={{ __html: (icon[0] as SimpleIcon).svg }} 
											fill={(icon[1] as string)}
											viewBox="0 0 20 20" 
										/>
										{t(`technologies.names.${index + 1}`)}
									</div>
								}
								description={t(`technologies.descs.${index + 1}`)}
							/>
						))}
					</div>
				</div>
			</section>
		</>
	);
}
