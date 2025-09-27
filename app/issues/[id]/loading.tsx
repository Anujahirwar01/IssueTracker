import React from 'react'
import { Card } from '@radix-ui/themes';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const Loading = () => {
  return (
    <SkeletonTheme baseColor="#f3f4f6" highlightColor="#e5e7eb">
      <div className="max-w-4xl mx-auto space-y-6 p-6">
        <div className="flex items-center justify-between">
          <Skeleton width={120} height={36} style={{ borderRadius: '6px' }} />
        </div>

        <Card>
          <div className="space-y-4 p-6">
            <div className="flex items-start justify-between">
              <Skeleton width={300} height={32} />
              <Skeleton width={80} height={24} style={{ borderRadius: '12px' }} />
            </div>

            <div className="space-y-2">
              <Skeleton width={180} height={16} />
              <Skeleton width={160} height={16} />
            </div>

            <div className="border-t pt-4">
              <Skeleton width={100} height={24} className="mb-3" />
              <div className="space-y-2">
                <Skeleton width="100%" height={16} />
                <Skeleton width="90%" height={16} />
                <Skeleton width="95%" height={16} />
                <Skeleton width="85%" height={16} />
              </div>
            </div>
          </div>
        </Card>
      </div>
    </SkeletonTheme>
  )
}

export default Loading
