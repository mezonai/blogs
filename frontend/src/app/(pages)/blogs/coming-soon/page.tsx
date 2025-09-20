import Image from 'next/image';

const ComingSoonPage = () => {
  return (
    <div className="max-w-[1000px] mx-auto p-6 space-y-8">
      <div className="relative w-full flex justify-center items-center min-h-[60vh]">
        <Image
          src="/coming-soon.png"
          alt="coming-soon.png"
          width="300"
          height="300"
          className="h-[300px] w-[300px]"
        />
      </div>
    </div>
  );
};
export default ComingSoonPage;
