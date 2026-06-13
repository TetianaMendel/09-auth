"use client";

import { useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import css from "../../NotesPage.module.css";
import SearchBox from '@/components/SearchBox/SearchBox';
import Pagination from '@/components/Pagination/Pagination';
import NoteList from '@/components/NoteList/NoteList';

import Link from 'next/link';
import { fetchNotes } from '@/lib/api/clientApi';

export interface NotesClientProps {
  tag?: string;
}

const NotesClient = ({ tag }: NotesClientProps) => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');

  const PER_PAGE = 12;

  const handleSearch = useDebouncedCallback((value: string) => {
    setSearch(value);
    setPage(1);
  }, 500);

  const effectiveTag = tag === "all" ? undefined : tag;  
    
  const { data} = useQuery({
    queryKey: ["notes", effectiveTag, page, search],
    queryFn: () =>
      fetchNotes({
        page: page,
        perPage: PER_PAGE,
        search: search || undefined,
        tag: effectiveTag,
      }),
    placeholderData: keepPreviousData,
  });

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox onSearch={handleSearch} />

        {data && data.totalPages > 1 && (
        <Pagination
        totalPages={data.totalPages}
        currentPage={page}
        onPageChange={setPage}
/>
        )}

        <Link className={css.button} href="/notes/action/create">
          Create note +
        </Link>
      </header>

      {data && data.notes.length > 0 && (
        <NoteList notes={data.notes} />
      )}

    </div>
  );
}

export default NotesClient;