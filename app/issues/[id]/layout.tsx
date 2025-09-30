import type { Metadata } from 'next';
import prisma from "@/prisma/client";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  
  try {
    const issue = await prisma.issue.findUnique({
      where: { id: parseInt(id) },
      include: {
        author: {
          select: {
            name: true,
            email: true
          }
        }
      }
    });

    if (!issue) {
      return {
        title: "Issue Not Found",
        description: "The requested issue could not be found.",
      };
    }

    const authorName = issue.author?.name || issue.author?.email || "Unknown";
    const statusText = issue.status.replace('_', ' ').toLowerCase();
    
    return {
      title: issue.title,
      description: `${issue.description.substring(0, 160)}...`,
      openGraph: {
        title: `${issue.title} - Issue Tracker`,
        description: `Status: ${statusText} | Created by: ${authorName} | ${issue.description.substring(0, 120)}...`,
      },
      twitter: {
        title: `${issue.title} - Issue Tracker`,
        description: `Status: ${statusText} | ${issue.description.substring(0, 120)}...`,
      },
    };
  } catch {
    return {
      title: "Issue",
      description: "View and manage issue details.",
    };
  }
}

export default function IssueLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}