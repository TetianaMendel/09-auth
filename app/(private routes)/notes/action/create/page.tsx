import type { Metadata } from "next";
import NoteForm from "../../../../../components/NoteForm/NoteForm";
import css from "./CreateNote.module.css";

const siteUrl = "https://notehub.com";
const pageTitle = "Create note | NoteHub";
const pageDescription = "Create a new personal note in NoteHub.";
const pageUrl = `${siteUrl}/notes/action/create`;
const ogImage = "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: {
    canonical: pageUrl,
  },
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    url: pageUrl,
    images: [
      {
        url: ogImage,
        width: 1200,
        height: 630,
        alt: "Create a NoteHub note",
      },
    ],
  },
};

const CreateNote = () => {
  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>Create note</h1>
        <NoteForm />

      </div>
    </main>
  );
};

export default CreateNote;