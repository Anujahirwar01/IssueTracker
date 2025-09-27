'use client';
import React, { useEffect, useState, useCallback, use } from 'react';
import { useRouter } from 'next/navigation';
import { Card, Heading, Text, Button } from '@radix-ui/themes';
import ReactMarkdown from 'react-markdown';
import IssueStatusBadge from '../../components/IssueStatusBadge';
import IssueDetailSkeleton from '../../components/IssueDetailSkeleton';

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
    const [deleting, setDeleting] = useState(false);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
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

    const handleDelete = async () => {
        try {
            setDeleting(true);
            const response = await fetch(`/api/issues/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                router.push('/issues');
            } else {
                const errorData = await response.json();
                setError(errorData.error || 'Failed to delete issue');
            }
        } catch (error) {
            console.error('Failed to delete issue:', error);
            setError('Failed to delete issue');
        } finally {
            setDeleting(false);
            setShowDeleteConfirm(false);
        }
    };

    if (loading) {
        return <IssueDetailSkeleton />;
    }

    if (error) {
        return (
            <div className="text-center py-8">
                <Text color="red">{error}</Text>
                <div className="mt-4">
                    <Button onClick={() => router.push('/issues')}>Back to Issues</Button>
                </div>
            </div>
        );
    }

    if (!issue) {
        return (
            <div className="text-center py-8">
                <Text>Issue not found</Text>
                <div className="mt-4">
                    <Button onClick={() => router.push('/issues')}>Back to Issues</Button>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto space-y-6 p-6">
            <div className="flex items-center justify-between">
                <Button variant="soft" onClick={() => router.push('/issues')}>
                    ← Back to Issues
                </Button>
                <div className="flex gap-3">
                    <Button onClick={() => router.push(`/issues/${issue.id}/edit`)}>
                        Edit Issue
                    </Button>
                    <Button 
                        color="red" 
                        variant="soft"
                        onClick={() => setShowDeleteConfirm(true)}
                    >
                        Delete Issue
                    </Button>
                </div>
            </div>

            {/* Delete Confirmation Dialog */}
            {showDeleteConfirm && (
                <Card style={{ border: '2px solid #ef4444' }}>
                    <div className="p-6 text-center space-y-4">
                        <Heading size="4" color="red">Delete Issue</Heading>
                        <Text>Are you sure you want to delete this issue? This action cannot be undone.</Text>
                        <div className="flex gap-3 justify-center">
                            <Button 
                                color="red"
                                onClick={handleDelete}
                                disabled={deleting}
                                loading={deleting}
                            >
                                {deleting ? 'Deleting...' : 'Yes, Delete'}
                            </Button>
                            <Button 
                                variant="soft" 
                                onClick={() => setShowDeleteConfirm(false)}
                                disabled={deleting}
                            >
                                Cancel
                            </Button>
                        </div>
                    </div>
                </Card>
            )}

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
                        <div className="prose prose-gray max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-strong:text-gray-900 prose-ul:list-disc prose-ol:list-decimal prose-li:ml-4 prose-code:text-purple-600 prose-code:bg-gray-100 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-pre:bg-gray-900 prose-pre:text-gray-100">
                            <ReactMarkdown>{issue.description}</ReactMarkdown>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    );
}

export default IssueDetailPage
