import Feed from "@components/Feed";
export default function page() {
  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center">
        Discover and share
        <br className="max-md:hidden" />
        <span className="orange_gradient">Al-Powered prompts</span>
      </h1>
      <p className=" desc text-center">
        Promptopia is an open-source Al prompting tool for modern world to
        discover, create and share creative prompts
      </p>
      <Feed />
    </section>
  );
}
