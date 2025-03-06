import RotatingText from '@/TextAnimations/RotatingText/RotatingText'
import {useTranslations} from 'next-intl';

export default function Top() {
	const t = useTranslations("rot")

  return (
	<>	
		<span className='flex items-center gap-1 justify-center mt-2'>
		<p className='font-bold text-xl lg:text-2xl'>{t('slogan')}</p>
		<RotatingText
		texts={[t('1'), t('2'), t('3')]}
		mainClassName="sm:px-1 md:px-2 bg-(--fondo-ojo) text-white text-xl lg:text-2xl overflow-hidden py-0.5 sm:py-1 md:py-2 justify-center rounded-lg w-auto grow max-w-sm"
		staggerFrom={"last"}
		initial={{ y: "100%" }}
		animate={{ y: 0 }}
		exit={{ y: "-120%" }}
		staggerDuration={0.025}
		splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
		transition={{ type: "spring", damping: 30, stiffness: 400 }}
		rotationInterval={4000}
		/>
		</span>
	</>
	
  )
}
