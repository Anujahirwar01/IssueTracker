'use client';
import React, { useEffect, useState, useCallback, Suspense } from 'react'
import {Button, Table} from '@radix-ui/themes';
import { useRouter, useSearchParams } from 'next/navigation';
import { useSession, signIn } from 'next-auth/react';
import Link from 'next/link';
import IssueStatusBadge from '../components/IssueStatusBadge';
import IssueStatusFilter from '../components/IssueStatusFilter';
import Pagination from '../components/Pagination';
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

interface PaginationInfo {
    page: number;
    limit: number;
    totalCount: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
}

interface ApiResponse {
    issues: Issue[];
    pagination: PaginationInfo;
}

const IssuesPageContent = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { data: session } = useSession();
    const [issues, setIssues] = useState<Issue[]>([]);
    const [pagination, setPagination] = useState<PaginationInfo | null>(null);
    const [loading, setLoading] = useState(true);
    
    // Initialize status filter and page from URL query parameters
    const [statusFilter, setStatusFilter] = useState<string>(() => {
        const statusFromUrl = searchParams.get('status');
        return statusFromUrl && ['OPEN', 'IN_PROGRESS', 'CLOSED'].includes(statusFromUrl) 
            ? statusFromUrl 
            : 'ALL';
    });
    
    const [currentPage, setCurrentPage] = useState<number>(() => {
        const pageFromUrl = searchParams.get('page');
        return pageFromUrl ? parseInt(pageFromUrl) : 1;
    });

    const fetchIssues = useCallback(async () => {
        setLoading(true);
        try {
            const params = new URLSearchParams({
                page: currentPage.toString(),
                limit: '10',
                ...(statusFilter !== 'ALL' && { status: statusFilter })
            });

            const data: ApiResponse = await withMinimumDelay(async () => {
                const response = await fetch(`/api/issues?${params}`);
                if (response.ok) {
                    return await response.json();
                }
                throw new Error('Failed to fetch issues');
            }, 800);
            
            setIssues(data.issues);
            setPagination(data.pagination);
        } catch (error) {
            console.error('Failed to fetch issues:', error);
        } finally {
            setLoading(false);
        }
    }, [currentPage, statusFilter]);

    useEffect(() => {
        fetchIssues();
    }, [fetchIssues]);

    // Update filter and page when URL query parameter changes
    useEffect(() => {
        const statusFromUrl = searchParams.get('status');
        const pageFromUrl = searchParams.get('page');
        
        const newStatus = statusFromUrl && ['OPEN', 'IN_PROGRESS', 'CLOSED'].includes(statusFromUrl) 
            ? statusFromUrl 
            : 'ALL';
        const newPage = pageFromUrl ? parseInt(pageFromUrl) : 1;
        
        setStatusFilter(newStatus);
        setCurrentPage(newPage);
    }, [searchParams]);

    const handleStatusFilterChange = (status: string) => {
        const params = new URLSearchParams(searchParams);
        if (status === 'ALL') {
            params.delete('status');
        } else {
            params.set('status', status);
        }
        // Reset to page 1 when changing filter
        params.set('page', '1');
        
        const queryString = params.toString();
        const newUrl = queryString ? `/issues?${queryString}` : '/issues';
        router.push(newUrl, { scroll: false });
    };

    const handlePageChange = (page: number) => {
        const params = new URLSearchParams(searchParams);
        params.set('page', page.toString());
        
        const queryString = params.toString();
        router.push(`/issues?${queryString}`, { scroll: false });
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
            <div className="flex items-center justify-between">
                <Button onClick={handleNewIssueClick}>New Issue</Button>
                <IssueStatusFilter 
                    currentStatus={statusFilter}
                    onStatusChange={handleStatusFilterChange}
                />
            </div>
            
            {loading ? (
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
                    
                    {issues.length === 0 && !loading && (
                        <div className="text-center py-8 text-gray-500">
                            No issues found. Create your first issue!
                        </div>
                    )}
                    
                    {/* Pagination */}
                    {pagination && pagination.totalPages > 1 && (
                        <Pagination
                            currentPage={currentPage}
                            totalPages={pagination.totalPages}
                            onPageChange={handlePageChange}
                        />
                    )}
                </div>
            )}
        </div>
    );
}

// Loading component for Suspense boundary
const IssuesPageLoading = () => (
    <div className="max-w-6xl mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">Issues</h1>
        </div>
        <div className="text-center py-8">
            Loading issues...
        </div>
    </div>
);

// Main component with Suspense boundary
const IssuesPage = () => {
    return (
        <Suspense fallback={<IssuesPageLoading />}>
            <IssuesPageContent />
        </Suspense>
    );
}

export default IssuesPage;