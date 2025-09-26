'use client';
import React, { useState } from 'react'
import { TextField, Button } from '@radix-ui/themes';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import "easymde/dist/easymde.min.css"
import axios from 'axios';
import {zodResolver} from '@hookform/resolvers/zod';
import Spinner from '@/app/components/Spinner';

const SimpleMDE = dynamic(
  () => import("react-simplemde-editor"),
  { ssr: false }
);

const NewIssuePage = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            console.log('Submitting:', { title, description });
            
            const response = await axios.post('/api/issues', {
                title,
                description
            });

            console.log('Response:', response.data);
            
            if (response.status === 200 || response.status === 201) {
                router.push('/issues');
            } else {
                console.error('Failed to create issue - Status:', response.status);
            }
        } catch (error: unknown) {
            console.error('Error creating issue:', error);
            
            // Type guard for axios error
            if (axios.isAxiosError(error)) {
                console.error('Error details:', error.response?.data);
                console.error('Error status:', error.response?.status);
                
                if (error.code === 'ERR_NETWORK') {
                    alert('Network error: Please check if the server is running on localhost:3001');
                } else if (error.response?.status === 400) {
                    alert('Validation error: Please check your input');
                } else {
                    alert('Failed to create issue. Please try again.');
                }
            } else {
                alert('An unexpected error occurred. Please try again.');
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="max-w-xl">
            <form onSubmit={handleSubmit} className="space-y-3 pl-5">
                <TextField.Root
                    placeholder="Title" 
                    value={title}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
                    required
                />
                

                <SimpleMDE
                    placeholder="Description"
                    value={description}
                    onChange={(value: string) => setDescription(value)}
                />
                <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting && <Spinner />}
                    {isSubmitting ? 'Creating...' : 'Submit New Issue'}
                </Button>
            </form>
        </div>
    );
};

export default NewIssuePage
