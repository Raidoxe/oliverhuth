import Image from "next/image";

const MEDIUM_USERNAME = "oliverhuth";

interface Post {
  title: string;
  link: string;
}

async function getPosts(): Promise<Post[]> {
  try {
    const res = await fetch(
      `https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@${MEDIUM_USERNAME}`,
      { next: { revalidate: 3600 } }
    );
    const data = await res.json();
    if (Array.isArray(data.items)) {
      return data.items.map((item: { title: string; link: string }) => ({
        title: item.title,
        link: item.link,
      }));
    }
  } catch (err) {
    console.error(err);
  }
  return [];
}

export default async function Home() {
  const posts = await getPosts();
  const projects = [
    { name: "Project One", link: "https://github.com/oliverhuth/project-one" },
    { name: "Project Two", link: "https://github.com/oliverhuth/project-two" },
  ];

  return (
    <main className="container mx-auto max-w-3xl p-8 space-y-16">
      <section className="text-center space-y-4">
        <h1 className="text-4xl font-bold">Oliver Huth</h1>
        <Image
          src="https://placekitten.com/400/400"
          alt="Profile picture"
          width={200}
          height={200}
          className="mx-auto rounded-full"
        />
        <p className="text-lg">
          Hi, I&apos;m Oliver! I&apos;m a software developer passionate about building
          web applications.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Latest Blog Posts</h2>
        <ul className="list-disc list-inside space-y-2">
          {posts.length === 0 && <li>No posts found.</li>}
          {posts.map((post) => (
            <li key={post.link}>
              <a href={post.link} className="text-blue-600 hover:underline">
                {post.title}
              </a>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Projects</h2>
        <ul className="list-disc list-inside space-y-2">
          {projects.map((project) => (
            <li key={project.link}>
              <a href={project.link} className="text-blue-600 hover:underline">
                {project.name}
              </a>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
