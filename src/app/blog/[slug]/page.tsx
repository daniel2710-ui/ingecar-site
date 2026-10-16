import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { PlaceholderImage } from "@/components/site/placeholder-image";
import { blogPosts, getPostBySlug } from "@/lib/data/blog";
import { blogCategorias } from "@/lib/data/certificaciones";
import { whatsappLink } from "@/lib/site-config";

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return { title: post.titulo, description: post.resumen };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();
  const categoria = blogCategorias.find((c) => c.slug === post.categoriaSlug);

  return (
    <article className="mx-auto max-w-2xl px-4 py-14 sm:px-6">
      <Link href="/blog" className="text-sm font-medium text-primary">
        ← Volver al blog
      </Link>

      {categoria ? (
        <Link
          href={`/blog/categoria/${categoria.slug}`}
          className="mt-5 inline-block rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground"
        >
          {categoria.nombre}
        </Link>
      ) : null}

      <h1 className="mt-4 font-heading text-3xl font-bold text-foreground sm:text-4xl">
        {post.titulo}
      </h1>
      <p className="mt-3 font-data text-xs text-muted-foreground">
        {new Date(post.fecha).toLocaleDateString("es-CO", { year: "numeric", month: "long", day: "numeric" })}
        {" · "}
        {post.tiempoLectura} de lectura
      </p>

      <PlaceholderImage label={post.titulo} className="mt-8 aspect-video w-full rounded-2xl" />

      <div className="mt-8 flex flex-col gap-5">
        {post.contenido.map((parrafo, i) => (
          <p key={i} className="text-base leading-relaxed text-foreground/85">
            {parrafo}
          </p>
        ))}
      </div>

      <div className="mt-12 flex flex-col items-start gap-3 rounded-xl border border-border bg-card p-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm font-medium text-foreground">
          ¿Tienes un proyecto relacionado con este tema?
        </p>
        <div className="flex gap-3">
          <Button asChild variant="cta" className="rounded-lg">
            <Link href="/cotizar">Solicitar cotización</Link>
          </Button>
          <Button asChild variant="outline" className="rounded-lg">
            <a href={whatsappLink(`Hola, leí el artículo "${post.titulo}" y tengo una consulta.`)} target="_blank" rel="noopener noreferrer">
              Consultar por WhatsApp
            </a>
          </Button>
        </div>
      </div>
    </article>
  );
}
