'use client';
import React from 'react'
import {Button} from '@radix-ui/themes';
import { useRouter } from 'next/navigation';
const IssuesPage = () => {
    const router = useRouter();

    const handleNewIssue = () => {
        router.push('/issues/new');
    };

    return (
        <div>
            <Button onClick={handleNewIssue}>New Issue</Button>
        </div>
    );
}

export default IssuesPage;