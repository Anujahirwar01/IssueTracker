import React from 'react';
import { Table } from '@radix-ui/themes';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const IssueTableSkeleton = () => {
    return (
        <SkeletonTheme baseColor="#f3f4f6" highlightColor="#e5e7eb">
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
                    {Array.from({ length: 5 }, (_, index) => {
                        // Smaller, more realistic widths for compact table
                        const titleWidths = [180, 200, 160, 220, 170];
                        return (
                            <Table.Row key={index}>
                                {/* Issue Title Column - Smaller widths */}
                                <Table.Cell>
                                    <Skeleton width={titleWidths[index]} height={14} />
                                </Table.Cell>
                                
                                {/* Status Badge Column - Compact badge */}
                                <Table.Cell className='hidden md:table-cell'>
                                    <Skeleton width={70} height={20} style={{ borderRadius: '10px' }} />
                                </Table.Cell>
                                
                                {/* Created Date Column - Smaller date width */}
                                <Table.Cell className='hidden md:table-cell'>
                                    <Skeleton width={100} height={14} />
                                </Table.Cell>
                            </Table.Row>
                        );
                    })}
                </Table.Body>
            </Table.Root>
            </div>
        </SkeletonTheme>
    );
};

export default IssueTableSkeleton;