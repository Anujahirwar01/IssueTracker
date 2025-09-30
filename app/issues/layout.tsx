import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Issues",
  description: "Browse and manage all project issues. Filter by status, search, and navigate through pages.",
  openGraph: {
    title: "Issues - Issue Tracker",
    description: "Browse and manage all project issues. Filter by status, search, and navigate through pages.",
  },
};

export default function IssuesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}