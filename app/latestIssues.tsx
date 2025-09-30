'use client';
import React, { useEffect, useState } from 'react';
import { Card, Heading, Text, Badge } from '@radix-ui/themes';
import Link from 'next/link';
import IssueStatusBadge from './components/IssueStatusBadge';

interface Issue {
  id: number;
  title: string;
  description: string;
  status: 'OPEN' | 'IN_PROGRESS' | 'CLOSED';
  createdAt: Date;
  updatedAt: Date;
  author?: {
    id: string;
    name: string | null;
    email: string | null;
  };
  assignee?: {
    id: string;
    name: string | null;
    email: string | null;
  };
}

const LatestIssues = () => {
  const [issues, setIssues] = useState<Issue[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLatestIssues();
  }, []);

  const fetchLatestIssues = async () => {
    try {
      const response = await fetch('/api/issues?limit=5');
      if (response.ok) {
        const data = await response.json();
        // Handle both paginated and non-paginated responses
        const issuesData = data.issues || data;
        setIssues(Array.isArray(issuesData) ? issuesData : []);
      } else {
        console.error('Failed to fetch latest issues');
      }
    } catch (error) {
      console.error('Error fetching latest issues:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Card>
        <div className="p-6">
          <Heading size="4" className="mb-4">Latest Issues</Heading>
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-3 bg-gray-100 rounded w-3/4"></div>
              </div>
            ))}
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card>
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <Heading size="4">Latest Issues</Heading>
          <Link 
            href="/issues" 
            className="text-violet-600 hover:text-violet-700 text-sm font-medium"
          >
            View all →
          </Link>
        </div>

        {issues.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <Text size="2">No issues found</Text>
          </div>
        ) : (
          <div className="space-y-4">
            {issues.map((issue) => (
              <div 
                key={issue.id} 
                className="border-b border-gray-100 last:border-b-0 pb-4 last:pb-0"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <Link 
                      href={`/issues/${issue.id}`}
                      className="text-violet-600 hover:text-violet-700 font-medium block truncate"
                    >
                      {issue.title}
                    </Link>
                    <div className="flex items-center gap-3 mt-2">
                      <IssueStatusBadge status={issue.status} />
                      <Text size="1" color="gray">
                        {new Date(issue.createdAt).toLocaleDateString()}
                      </Text>
                      {issue.author && (
                        <Text size="1" color="gray">
                          by {issue.author.name || issue.author.email}
                        </Text>
                      )}
                    </div>
                  </div>
                </div>
                {issue.assignee && (
                  <div className="mt-2">
                    <Badge color="blue" variant="soft" size="1">
                      Assigned to {issue.assignee.name || issue.assignee.email}
                    </Badge>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </Card>
  );
};

export default LatestIssues;
