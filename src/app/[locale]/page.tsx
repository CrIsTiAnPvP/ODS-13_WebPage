import Nav from '@/components/NavBar';
import Top from '@/components/Top';
import Eye from '@/components/Eye';
import Carousel from '@/components/Carrousel';

export default function Home() {
  return (
    <>
    <Nav />
    <Eye />
    <Top />
    <div className='flex flex-col items-center justify-center'>
      <div className='w-2/3 border border-(--fern-green) mt-3 mb-0' />
    </div>
    <Carousel />
    </>
  );
}
