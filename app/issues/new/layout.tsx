import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "New Issue",
  description: "Create a new issue to track bugs, features, or tasks in your project.",
  openGraph: {
    title: "Create New Issue - Issue Tracker",
    description: "Create a new issue to track bugs, features, or tasks in your project.",
  },
};

export default function NewIssueLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}