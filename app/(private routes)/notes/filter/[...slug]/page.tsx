import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import NotesClient from "./Notes.client";
import { Metadata } from "next";
import { fetchNotes } from "@/lib/api/serverApi";

const PER_PAGE = 12;

type Props = {
  params: Promise<{ slug: string[] }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const tag = slug[0] === 'all' ? undefined : slug[0];
  return {
    title: tag ? `Note: ${tag}` : "All Notes",
    description: tag
      ? `Browse ${tag} notes in NoteHub.`
      : "Browse all notes in NoteHub.",
    openGraph: {
      title: tag ? `Note: ${tag}` : "All Notes",
      description: tag
      ? `Browse ${tag} notes in NoteHub.`
      : "Browse all notes in NoteHub.",
      url: `https://notehub.com/notes/${tag ?? "all"}`,
      images: [
        {
          url: 'https://ac.goit.global/fullstack/react/og-meta.jpg',
          width: 1200,
          height: 630,
          alt: tag ?? "All Notes",
        },
      ],
    },
  }
}

export default async function NotesPage({ params }: Props) {
  const { slug } = await params;
  const tag = slug[0] === 'all' ? undefined : slug[0];
  
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["notes", tag, 0, ""],
    queryFn: () => fetchNotes({ page: 1, perPage: PER_PAGE, tag: tag }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={tag}/>
    </HydrationBoundary>
  );
}