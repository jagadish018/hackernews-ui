import Link from "next/link";

const NavigationLinks = () => {
  return (
    <div className="flex items-center gap-2">
      <div className="bg-white text-orange-500 font-bold px-1">Y</div>
      <Link href="/" className="">
        <span className="font-bold px-1">Hacker News</span>
      </Link>

      <Link href="/blocks/posts/new-post" className="hover:underline">
        new
      </Link>
      <span className="px-1">|</span>
      <Link href="/blocks/posts/past-post" className="hover:underline">
        past
      </Link>
      <span className="px-1">|</span>
      <Link href="/comments" className="hover:underline">
        comments
      </Link>
      <span className="px-1">|</span>
      <Link href="/ask" className="hover:underline">
        ask
      </Link>
      <span className="px-1">|</span>
      <Link href="/show" className="hover:underline">
        show
      </Link>
      <span className="px-1">|</span>
      <Link href="/jobs" className="hover:underline">
        jobs
      </Link>
      <span className="px-1">|</span>
      <Link href="/blocks/posts/create-post" className="hover:underline">
        submit
      </Link>
    </div>
  );
};

export default NavigationLinks;
