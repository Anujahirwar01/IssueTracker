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
      select: {
        title: true
      }
    });

    if (!issue) {
      return {
        title: "Edit Issue - Not Found",
        description: "The issue you're trying to edit could not be found.",
      };
    }
    
    return {
      title: `Edit: ${issue.title}`,
      description: `Edit the details of issue: ${issue.title}`,
      openGraph: {
        title: `Edit Issue: ${issue.title} - Issue Tracker`,
        description: `Edit the details and update information for this issue.`,
      },
    };
  } catch {
    return {
      title: "Edit Issue",
      description: "Edit issue details and information.",
    };
  }
}

export default function EditIssueLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}