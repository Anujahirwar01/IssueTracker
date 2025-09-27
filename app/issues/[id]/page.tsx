'use client';
import React, { useEffect, useState, useCallback, use } from 'react';
import { useRouter } from 'next/navigation';
import { Card, Heading, Text, Button } from '@radix-ui/themes';
import IssueStatusBadge from '../../components/IssueStatusBadge';

interface Issue {
    id: number;
    title: string;
    description: string;
    status: 'OPEN' | 'IN_PROGRESS' | 'CLOSED';
    createdAt: Date;
    updatedAt: Date;
}

interface Props {
    params: Promise<{ id: string }>;
}

const IssueDetailPage = ({ params }: Props) => {
    const router = useRouter();
    const [issue, setIssue] = useState<Issue | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    
    // Unwrap the params Promise
    const { id } = use(params);

    const fetchIssue = useCallback(async () => {
        try {
            const response = await fetch(`/api/issues/${id}`);
            if (response.ok) {
                const data = await response.json();
                setIssue(data);
            } else if (response.status === 404) {
                setError('Issue not found');
            } else {
                setError('Failed to load issue');
            }
        } catch (error) {
            console.error('Failed to fetch issue:', error);
            setError('Failed to load issue');
        } finally {
            setLoading(false);
        }
    }, [id]);

    useEffect(() => {
        fetchIssue();
    }, [fetchIssue]);

    if (loading) {
        return <div>Loading issue...</div>;
    }

    if (error) {
        return (
            <div className="text-center py-8">
                <Text color="red">{error}</Text>
                <div className="mt-4">
                    <Button onClick={() => router.back()}>Go Back</Button>
                </div>
            </div>
        );
    }

    if (!issue) {
        return (
            <div className="text-center py-8">
                <Text>Issue not found</Text>
                <div className="mt-4">
                    <Button onClick={() => router.back()}>Go Back</Button>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto space-y-6 p-6">
            <div className="flex items-center justify-between">
                <Button variant="soft" onClick={() => router.back()}>
                    ← Back to Issues
                </Button>
            </div>

            <Card>
                <div className="space-y-4 p-6">
                    <div className="flex items-start justify-between">
                        <Heading size="6">{issue.title}</Heading>
                        <IssueStatusBadge status={issue.status} />
                    </div>

                    <div className="space-y-2">
                        <Text size="2" color="gray">
                            Created: {new Date(issue.createdAt).toLocaleDateString()}
                        </Text>
                        <Text size="2" color="gray">
                            Updated: {new Date(issue.updatedAt).toLocaleDateString()}
                        </Text>
                    </div>

                    <div className="border-t pt-4">
                        <Heading size="4" className="mb-3">Description</Heading>
                        <div className="prose prose-sm max-w-none">
                            <Text>{issue.description}</Text>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    );
}

export default IssueDetailPage
