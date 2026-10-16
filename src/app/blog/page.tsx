import type { Metadata } from "next";
import Link from "next/link";
import { SectionLabel } from "@/components/site/section-label";
import { PlaceholderImage } from "@/components/site/placeholder-image";
import { RevealGroup } from "@/components/site/reveal-group";
import { blogPosts, getPostsDestacados } from "@/lib/data/blog";
import { blogCategorias } from "@/lib/data/certificaciones";
import { TextReveal } from "@/components/site/text-reveal";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Artículos sobre ingeniería, construcción, remodelación y mantenimiento de INGECAR LTDA.",
};

function categoriaNombre(slug: string) {
  return blogCategorias.find((c) => c.slug === slug)?.nombre ?? slug;
}

export default function BlogPage() {
  const destacados = getPostsDestacados();

  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <SectionLabel>Blog</SectionLabel>
      <h1 className="mt-2 font-heading text-4xl font-bold text-foreground">
        <TextReveal>Ingeniería, construcción y hogar</TextReveal>
      </h1>
      <p className="mt-4 max-w-2xl text-base text-muted-foreground">
        Contenido técnico, consejos y novedades para empresas y hogares.
      </p>

      <div className="mt-8 flex flex-wrap gap-2">
        {blogCategorias.map((c) => (
          <Link
            key={c.slug}
            href={`/blog/categoria/${c.slug}`}
            className="rounded-full border border-border px-3.5 py-1.5 text-xs font-medium text-foreground/75 hover:border-primary/40 hover:text-primary"
          >
            {c.nombre}
          </Link>
        ))}
      </div>

      {destacados.length > 0 ? (
        <div className="mt-10">
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Destacados
          </p>
          <RevealGroup className="mt-4 grid gap-5 sm:grid-cols-2" itemClassName="flex h-full">
            {destacados.map((post, i) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="card-interactive group flex w-full flex-col overflow-hidden rounded-xl border border-border bg-card"
              >
                <PlaceholderImage label={post.titulo} tone={i} className="aspect-[16/9] w-full" />
                <div className="p-5">
                  <p className="font-data text-[11px] text-muted-foreground">
                    {categoriaNombre(post.categoriaSlug)} · {post.tiempoLectura}
                  </p>
                  <h2 className="mt-2 font-heading text-lg font-bold text-foreground">
                    {post.titulo}
                  </h2>
                  <p className="mt-2 text-sm text-muted-foreground">{post.resumen}</p>
                </div>
              </Link>
            ))}
          </RevealGroup>
        </div>
      ) : null}

      <div className="mt-12">
        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          Todos los artículos
        </p>
        <RevealGroup className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-3" itemClassName="flex h-full">
          {blogPosts.map((post, i) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="card-interactive group flex w-full flex-col overflow-hidden rounded-xl border border-border bg-card"
            >
              <PlaceholderImage label={post.titulo} tone={i} className="aspect-[16/9] w-full" />
              <div className="p-5">
                <p className="font-data text-[11px] text-muted-foreground">
                  {categoriaNombre(post.categoriaSlug)} · {post.tiempoLectura}
                </p>
                <h3 className="mt-2 font-heading text-base font-bold text-foreground">
                  {post.titulo}
                </h3>
              </div>
            </Link>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
