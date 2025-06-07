"use client";

import React from "react";
import useEmblaCarousel from "embla-carousel-react";

interface Post {
  title: string;
  link: string;
}

interface BlogCarouselProps {
  posts: Post[];
}

export const BlogCarousel: React.FC<BlogCarouselProps> = ({ posts }) => {
  const [emblaRef] = useEmblaCarousel();

  return (
    <div className="embla" ref={emblaRef}>
      <div className="embla__container">
        {posts.map((post) => (
          <div className="embla__slide" key={post.link}>
            <a
              href={post.link}
              target="_blank"
              rel="noopener noreferrer"
              className="block rounded-lg bg-white dark:bg-slate-800 p-6 h-full hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors shadow-md"
            >
              <h3 className="text-lg font-semibold">{post.title}</h3>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};
