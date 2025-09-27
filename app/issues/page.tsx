'use client';
import React, { useEffect, useState } from 'react'
import {Button, Table} from '@radix-ui/themes';
import { useRouter } from 'next/navigation';
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
}

const IssuesPage = () => {
    const router = useRouter();
    const [issues, setIssues] = useState<Issue[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchIssues();
    }, []);

    const fetchIssues = async () => {
        try {
            // Use withMinimumDelay to ensure skeleton shows for at least 800ms
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

    return (
        <div className="space-y-4">
            <div>
                <Button onClick={handleNewIssue}>New Issue</Button>
            </div>
            
            {loading ? (
                <IssueTableSkeleton />
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