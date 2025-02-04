import RotatingText from '@/TextAnimations/RotatingText/RotatingText'

export default function Top() {
  return (
	<>	
		<span>
		<p>Hola</p>
		<RotatingText
		texts={['React', 'Bits', 'Is', 'Cool!']}
		mainClassName="px-2 sm:px-2 md:px-3 bg-cyan-300 text-black overflow-hidden py-0.5 sm:py-1 md:py-2 justify-center rounded-lg"
		staggerFrom={"last"}
		initial={{ y: "50%" }}
		animate={{ y: 0 }}
		exit={{ y: "-120%" }}
		staggerDuration={0.025}
		splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
		transition={{ type: "spring", damping: 30, stiffness: 400 }}
		rotationInterval={2000}
		/>
		</span>
		<div>HOlaaaaaa</div>
		<div>Top</div>
	</>
	
  )
}
