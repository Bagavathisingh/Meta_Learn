import banner from '../assets/animation/clg.png';
export default function Test() {
  return (
    <>
    <div className='overflow-y-auto overflow-x-hidden hide-scroll text-gray-300 h-full'>
      <div className='h-200'>
      <div
        id="banner"
        className="mt-1 h-100 w-[100%] flex h-full flex-col md:flex-row justify-between md:p-10"
      >
        <div id="bannerContent" className=" cursor-default p-5 md:p-2 md:m-7 -ml-10 md:-ml-0 flex flex-col min-w-sm min-h-sm font-serif">
          <div className='ml-10 h-20 w-70 p-4 '>
            <div className='cursor-pointer border w-60 h-11 rotate-div bg-[#FF3700] p-2 flex justify-center rounded-lg'>
              <h1 className='text-2xl font-serif text-white platform-text'>Platform To Study</h1>
            </div>
          </div>
          <div className='ml-10 joti-one p-7'>
          <div className=' w-88 m-2'>
          <h1 className="text-6xl ">Welcome To Our Website !!</h1>
          </div>
          <p className="leading-5 md:p-10 p-8 font-bold md:w-120 relative">
            Here is your material and internal question paper . Access it
            anywere anytime
          <span className="absolute mt-5 md:mt-10 ml-20">- Admin</span>
          </p>
          </div>
        </div>
        <div className='h-110 p-10 md:p-8 select-none'>
          <img className='size-95 md:size-150' src={banner} />
        </div>
      </div>
      </div>
    </div>
    </>
  );
}
