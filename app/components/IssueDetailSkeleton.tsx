import React from 'react';
import { Card } from '@radix-ui/themes';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const IssueDetailSkeleton = () => {
    return (
        <SkeletonTheme baseColor="#f3f4f6" highlightColor="#e5e7eb">
            <div className="max-w-4xl mx-auto space-y-6 p-6">
                {/* Back Button Skeleton */}
                <div>
                    <Skeleton width={150} height={36} style={{ borderRadius: '6px' }} />
                </div>

                <Card>
                    <div className="space-y-4 p-6">
                        {/* Title and Status Row */}
                        <div className="flex items-start justify-between">
                            <Skeleton width={350} height={32} />
                            <Skeleton width={70} height={24} style={{ borderRadius: '12px' }} />
                        </div>

                        {/* Created and Updated dates */}
                        <div className="space-y-2">
                            <Skeleton width={180} height={16} />
                            <Skeleton width={190} height={16} />
                        </div>

                        {/* Description Section */}
                        <div className="border-t pt-4">
                            {/* Description Heading */}
                            <div className="mb-3">
                                <Skeleton width={120} height={24} />
                            </div>
                            
                            {/* Description Content - Multiple lines to simulate markdown */}
                            <div className="space-y-3">
                                <Skeleton width="100%" height={18} />
                                <Skeleton width="95%" height={18} />
                                <Skeleton width="85%" height={18} />
                                <div className="space-y-2 mt-4">
                                    <Skeleton width="70%" height={16} />
                                    <Skeleton width="80%" height={16} />
                                    <Skeleton width="60%" height={16} />
                                </div>
                                <div className="mt-4">
                                    <Skeleton width="90%" height={18} />
                                    <Skeleton width="75%" height={18} />
                                </div>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        </SkeletonTheme>
    );
};

export default IssueDetailSkeleton;