'use client';
import React, { useEffect, useState, use } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Card, Heading, Text, Select, TextField } from '@radix-ui/themes';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import dynamic from 'next/dynamic';
import IssueDetailSkeleton from '../../../components/IssueDetailSkeleton';

// Dynamic import for SimpleMDE to avoid SSR issues
const SimpleMDE = dynamic(() => import('react-simplemde-editor'), { ssr: false });
import 'easymde/dist/easymde.min.css';

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

interface Props {
    params: Promise<{ id: string }>;
}

// Validation schema
const editIssueSchema = z.object({
    title: z.string().min(1, "Title is required").max(255, "Title must be less than 255 characters"),
    description: z.string().min(1, "Description is required"),
    status: z.enum(['OPEN', 'IN_PROGRESS', 'CLOSED']),
});

type EditIssueForm = z.infer<typeof editIssueSchema>;

const EditIssuePage = ({ params }: Props) => {
    const router = useRouter();
    const [issue, setIssue] = useState<Issue | null>(null);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    
    // Unwrap the params Promise
    const { id } = use(params);

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors }
    } = useForm<EditIssueForm>({
        resolver: zodResolver(editIssueSchema)
    });

    const description = watch('description');

    useEffect(() => {
        const fetchIssue = async () => {
        try {
            const response = await fetch(`/api/issues/${id}`);
            if (response.ok) {
                const data = await response.json();
                setIssue(data);
                // Set form values
                setValue('title', data.title);
                setValue('description', data.description);
                setValue('status', data.status);
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
    };

        fetchIssue();
    }, [id, setValue]);

    const onSubmit = async (data: EditIssueForm) => {
        try {
            setSubmitting(true);
            const response = await fetch(`/api/issues/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                router.push(`/issues/${id}`);
            } else {
                const errorData = await response.json();
                setError(errorData.error || 'Failed to update issue');
            }
        } catch (error) {
            console.error('Failed to update issue:', error);
            setError('Failed to update issue');
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return <IssueDetailSkeleton />;
    }

    if (error) {
        return (
            <div className="text-center py-8 p-10">
                <Text color="red">{error}</Text>
                <div className="mt-4">
                    <Button onClick={() => router.push('/issues')}>Back to Issues</Button>
                </div>
            </div>
        );
    }

    if (!issue) {
        return (
            <div className="text-center py-8 p-10">
                <Text>Issue not found</Text>
                <div className="mt-4">
                    <Button onClick={() => router.push('/issues')}>Back to Issues</Button>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto space-y-6 p-10">
            <div className="flex items-center justify-between">
                <Button variant="soft" onClick={() => router.push('/issues')}>
                    ← Back to Issues
                </Button>
                <Heading size="6">Edit Issue</Heading>
            </div>

            <Card>
                <div className="p-6">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        {/* Title Field */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Title</label>
                            <TextField.Root
                                {...register('title')}
                                placeholder="Enter issue title"
                            />
                            {errors.title && (
                                <Text color="red" size="2">{errors.title.message}</Text>
                            )}
                        </div>

                        {/* Status Field */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Status</label>
                            <Select.Root
                                value={watch('status')}
                                onValueChange={(value: 'OPEN' | 'IN_PROGRESS' | 'CLOSED') => setValue('status', value)}
                            >
                                <Select.Trigger />
                                <Select.Content>
                                    <Select.Item value="OPEN">Open</Select.Item>
                                    <Select.Item value="IN_PROGRESS">In Progress</Select.Item>
                                    <Select.Item value="CLOSED">Closed</Select.Item>
                                </Select.Content>
                            </Select.Root>
                            {errors.status && (
                                <Text color="red" size="2">{errors.status.message}</Text>
                            )}
                        </div>

                        {/* Description Field */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Description</label>
                            <SimpleMDE
                                value={description}
                                onChange={(value) => setValue('description', value)}
                                options={{
                                    placeholder: 'Enter issue description...',
                                    spellChecker: false,
                                    toolbar: [
                                        'bold', 'italic', 'heading', '|',
                                        'quote', 'unordered-list', 'ordered-list', '|',
                                        'link', 'code', 'table', '|',
                                        'preview', 'side-by-side', 'fullscreen', '|',
                                        'guide'
                                    ]
                                }}
                            />
                            {errors.description && (
                                <Text color="red" size="2">{errors.description.message}</Text>
                            )}
                        </div>

                        {/* Submit Buttons */}
                        <div className="flex gap-3">
                            <Button 
                                type="submit" 
                                disabled={submitting}
                                loading={submitting}
                            >
                                {submitting ? 'Updating...' : 'Update Issue'}
                            </Button>
                            <Button 
                                variant="soft" 
                                type="button" 
                                onClick={() => router.push(`/issues/${id}`)}
                            >
                                Cancel
                            </Button>
                        </div>
                    </form>
                </div>
            </Card>
        </div>
    );
}

export default EditIssuePage;