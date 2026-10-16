import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SectionLabel } from "@/components/site/section-label";
import { PlaceholderImage } from "@/components/site/placeholder-image";
import { RevealGroup } from "@/components/site/reveal-group";
import { getPostsByCategoria } from "@/lib/data/blog";
import { blogCategorias } from "@/lib/data/certificaciones";
import { TextReveal } from "@/components/site/text-reveal";

export function generateStaticParams() {
  return blogCategorias.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const categoria = blogCategorias.find((c) => c.slug === slug);
  return { title: categoria?.nombre ?? "Blog" };
}

export default async function BlogCategoriaPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const categoria = blogCategorias.find((c) => c.slug === slug);
  if (!categoria) notFound();
  const posts = getPostsByCategoria(slug);

  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <Link href="/blog" className="text-sm font-medium text-primary">
        ← Todas las categorías
      </Link>
      <SectionLabel className="mt-5">Categoría</SectionLabel>
      <h1 className="mt-2 font-heading text-3xl font-bold text-foreground"><TextReveal>{categoria.nombre}</TextReveal></h1>

      <RevealGroup className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3" itemClassName="flex h-full">
        {posts.map((post, i) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="card-interactive group flex w-full flex-col overflow-hidden rounded-xl border border-border bg-card"
          >
            <PlaceholderImage label={post.titulo} tone={i} className="aspect-[16/9] w-full" />
            <div className="p-5">
              <p className="font-data text-[11px] text-muted-foreground">{post.tiempoLectura}</p>
              <h3 className="mt-2 font-heading text-base font-bold text-foreground">{post.titulo}</h3>
            </div>
          </Link>
        ))}
      </RevealGroup>
      {posts.length === 0 ? (
        <p className="mt-10 text-sm text-muted-foreground">
          Todavía no hay artículos publicados en esta categoría.
        </p>
      ) : null}
    </section>
  );
}
