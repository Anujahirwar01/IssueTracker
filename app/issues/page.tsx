'use client';
import React, { useEffect, useState } from 'react'
import {Button, Table} from '@radix-ui/themes';
import { useRouter } from 'next/navigation';
import { useSession, signIn } from 'next-auth/react';
import Link from 'next/link';
import IssueStatusBadge from '../components/IssueStatusBadge';
import IssueTableSkeleton from '../components/IssueTableSkeleton';
import { withMinimumDelay } from '../utils/delay';

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
}

const IssuesPage = () => {
    const router = useRouter();
    const { data: session } = useSession();
    const [issues, setIssues] = useState<Issue[]>([]);
    const [loading, setLoading] = useState(true);
    const [issueCount, setIssueCount] = useState<number>(0);
    const [countLoaded, setCountLoaded] = useState<boolean>(false);

    useEffect(() => {
        fetchIssues();
    }, []);

    const fetchIssues = async () => {
        try {
            // First, get the count quickly to show proper skeleton size
            const countResponse = await fetch('/api/issues');
            if (countResponse.ok) {
                const countData = await countResponse.json();
                setIssueCount(countData.length || 0);
                setCountLoaded(true); // Now we can show the skeleton with correct count
            }

            // Then use withMinimumDelay for the actual data with skeleton display
            const data = await withMinimumDelay(async () => {
                const response = await fetch('/api/issues');
                if (response.ok) {
                    return await response.json();
                }
                throw new Error('Failed to fetch issues');
            }, 800);
            
            setIssues(data);
        } catch (error) {
            console.error('Failed to fetch issues:', error);
        } finally {
            setLoading(false);
        }
    };    const handleNewIssue = () => {
        router.push('/issues/new');
    };

    const handleNewIssueClick = () => {
        if (session) {
            handleNewIssue();
        } else {
            signIn();
        }
    };

    return (
        <div className="space-y-4 p-10">
            <div>
                <Button onClick={handleNewIssueClick}>New Issue</Button>
            </div>
            
            {loading ? (
                !countLoaded ? (
                    // Show table structure with minimal skeleton while getting count
                    <div className="max-w-4xl">
                        <Table.Root variant='surface' size="2">
                            <Table.Header>
                                <Table.Row>
                                    <Table.ColumnHeaderCell>Issue</Table.ColumnHeaderCell>
                                    <Table.ColumnHeaderCell className='hidden md:table-cell'>Status</Table.ColumnHeaderCell>
                                    <Table.ColumnHeaderCell className='hidden md:table-cell'>Created</Table.ColumnHeaderCell>
                                </Table.Row>
                            </Table.Header>
                            <Table.Body>
                                <Table.Row>
                                    <Table.Cell colSpan={3}>
                                        <div className="flex items-center justify-center py-4">
                                            <div className="text-gray-500 text-sm">Loading issues...</div>
                                        </div>
                                    </Table.Cell>
                                </Table.Row>
                            </Table.Body>
                        </Table.Root>
                    </div>
                ) : issueCount === 0 ? (
                    <div className="max-w-4xl">
                        <Table.Root variant='surface' size="2">
                            <Table.Header>
                                <Table.Row>
                                    <Table.ColumnHeaderCell>Issue</Table.ColumnHeaderCell>
                                    <Table.ColumnHeaderCell className='hidden md:table-cell'>Status</Table.ColumnHeaderCell>
                                    <Table.ColumnHeaderCell className='hidden md:table-cell'>Created</Table.ColumnHeaderCell>
                                </Table.Row>
                            </Table.Header>
                        </Table.Root>
                    </div>
                ) : (
                    <IssueTableSkeleton count={issueCount} />
                )
            ) : (
                <div className="max-w-4xl">
                    <Table.Root variant='surface' size="2">
                        <Table.Header>
                            <Table.Row>
                                <Table.ColumnHeaderCell>Issue</Table.ColumnHeaderCell>
                                <Table.ColumnHeaderCell className='hidden md:table-cell'>Status</Table.ColumnHeaderCell>
                                <Table.ColumnHeaderCell className='hidden md:table-cell'>Created</Table.ColumnHeaderCell>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {issues.map(issue => (
                                <Table.Row key={issue.id}>
                                    <Table.Cell>
                                        <Link href={`/issues/${issue.id}`} className='text-violet-600 hover:underline'>
                                            {issue.title}
                                        </Link>
                                    </Table.Cell>
                                    <Table.Cell className='hidden md:table-cell'>
                                        <IssueStatusBadge status={issue.status} />
                                    </Table.Cell>
                                    <Table.Cell className='hidden md:table-cell'>
                                        {new Date(issue.createdAt).toDateString()}
                                    </Table.Cell>
                                </Table.Row>
                            ))}
                        </Table.Body>
                    </Table.Root>
                    
                    {issues.length === 0 && (
                        <div className="text-center py-8 text-gray-500">
                            No issues found. Create your first issue!
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default IssuesPage;