import Image from "next/image";

const MEDIUM_USERNAME = "oliverhuth";

interface Post {
  title: string;
  link: string;
  description: string;
  pubDate: string;
  thumbnail?: string;
  categories?: string[];
}

interface RSSItem {
  title: string;
  link: string;
  description?: string;
  pubDate: string;
  thumbnail?: string;
  categories?: string[];
}

async function getPosts(): Promise<Post[]> {
  try {
    const res = await fetch(
      `https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@${MEDIUM_USERNAME}`,
      { next: { revalidate: 3600 } }
    );
    const data = await res.json();
    if (Array.isArray(data.items)) {
      return data.items.map((item: RSSItem) => ({
        title: item.title,
        link: item.link,
        description:
          item.description?.replace(/<[^>]*>/g, "").substring(0, 150) + "..." ||
          "No description available",
        pubDate: item.pubDate,
        thumbnail: item.thumbnail,
        categories: item.categories || [],
      }));
    }
  } catch (err) {
    console.error(err);
  }
  return [];
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function Home() {
  const posts = await getPosts();
  const projects = [
    {
      name: "WA PDA Booker",
      description:
        "Automated driving test booking platform that secured 700+ driving tests",
      link: "https://github.com/Raidoxe/wapdabooker",
      tech: ["TypeScript", "Node.js", "Puppeteer"],
    },
    {
      name: "Bellarmine Markets",
      description:
        "Prediction market built with Next.js & Firebase. Users sign in, start with $10, and trade yes/no shares via limit orders in a live order book online!",
      link: "https://github.com/Raidoxe/BellarmineMarkets",
      tech: ["TypeScript", "Next.js", "Firebase"],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <main className="container mx-auto max-w-4xl p-6 lg:p-8">
        {/* Hero Section */}
        <section className="text-center space-y-8 py-16">
          <div className="relative">
            <Image
              src="/headshot.jpg"
              alt="Profile picture"
              width={240}
              height={240}
              className="mx-auto h-[240px] w-[240px] rounded-full object-cover shadow-2xl ring-8 ring-white"
            />
          </div>

          <div className="space-y-6">
            <h1 className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-slate-900 to-blue-800 bg-clip-text text-transparent">
              Oliver Huth
            </h1>
            <p className="text-xl text-slate-600 font-medium">
              Machine Learning 🧠 • Surfing 🏄 • Travelling 🌍
            </p>
            <p className="text-lg text-slate-700 max-w-3xl mx-auto leading-relaxed">
              Hey! I&apos;m Oliver Huth, studying Advanced Computing and
              Philosophy at the University of Sydney. From launching WA PDA
              Booker (securing 700+ driving tests) to architecting ML projects,
              I specialize in turning complex theory into products people love.
              My passion lies at the intersection of code, mathematics, and
              real-world impact. If tech for good excites you, let&apos;s chat.
            </p>
          </div>

          <div className="flex justify-center gap-4 pt-4">
            <a
              href="mailto:olivernhuthpriority@gmail.com"
              className="bg-white text-slate-700 px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200 border border-slate-200"
            >
              Get in Touch
            </a>
          </div>
        </section>

        {/* Blog Posts Section */}
        <section className="py-16">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-slate-900">Blog Posts</h2>
            <a
              href={`https://medium.com/@${MEDIUM_USERNAME}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 font-semibold hover:underline transition-colors duration-200"
            >
              View all on Medium →
            </a>
          </div>
          {posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {posts.slice(0, 4).map((post) => (
                <article
                  key={post.link}
                  className="group bg-white rounded-xl shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 overflow-hidden"
                >
                  <a
                    href={post.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    {post.thumbnail && (
                      <div className="relative h-48 overflow-hidden">
                        <Image
                          src={post.thumbnail}
                          alt={post.title}
                          width={400}
                          height={200}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-10 transition-all duration-300"></div>
                      </div>
                    )}
                    <div className="p-6 space-y-4">
                      <div className="space-y-2">
                        <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors duration-200 line-clamp-2">
                          {post.title}
                        </h3>
                        <p className="text-slate-600 text-sm">
                          {formatDate(post.pubDate)}
                        </p>
                        <p className="text-slate-700 leading-relaxed line-clamp-3">
                          {post.description}
                        </p>
                      </div>
                      {post.categories && post.categories.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {post.categories.slice(0, 3).map((category) => (
                            <span
                              key={category}
                              className="bg-blue-50 text-blue-700 px-2 py-1 rounded-full text-xs font-medium"
                            >
                              {category}
                            </span>
                          ))}
                        </div>
                      )}
                      <div className="flex items-center justify-between pt-2">
                        <span className="text-blue-600 font-medium text-sm group-hover:underline">
                          Read more →
                        </span>
                        <div className="text-blue-600 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-200">
                          <svg
                            className="w-4 h-4"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </a>
                </article>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-lg p-12 text-center">
              <div className="text-slate-400 mb-4">
                <svg
                  className="w-16 h-16 mx-auto"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                  />
                </svg>
              </div>
              <p className="text-slate-600 text-lg">No blog posts found.</p>
              <p className="text-slate-500 text-sm mt-2">
                Check back soon for new content!
              </p>
            </div>
          )}
        </section>

        {/* Projects Section */}
        <section className="py-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-8">
            My Projects
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <a
                key={project.link}
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-white rounded-xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 overflow-hidden"
              >
                <div className="p-6 space-y-4">
                  <div className="flex items-start justify-between">
                    <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors duration-200">
                      {project.name}
                    </h3>
                    <div className="text-blue-600 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-200">
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                  <p className="text-slate-600 leading-relaxed">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center py-8 text-slate-600">
          <p>© 2024 Oliver Huth. Built with Next.js and lots of ☕</p>
        </footer>
      </main>
    </div>
  );
}
