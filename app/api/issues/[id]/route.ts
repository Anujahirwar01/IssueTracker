import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import prisma from "@/prisma/client";
import { z } from "zod";
import { authOptions } from "@/lib/auth";

interface Props {
    params: Promise<{ id: string }>;
}

export async function GET(request: NextRequest, { params }: Props) {
    try {
        const { id } = await params;
        const issueId = parseInt(id);
        
        if (isNaN(issueId)) {
            return NextResponse.json({ error: 'Invalid issue ID' }, { status: 400 });
        }

        const issue = await prisma.issue.findUnique({
            where: { id: issueId },
            include: {
                author: {
                    select: {
                        id: true,
                        name: true,
                        email: true
                    }
                },
                assignee: {
                    select: {
                        id: true,
                        name: true,
                        email: true
                    }
                }
            }
        });

        if (!issue) {
            return NextResponse.json({ error: 'Issue not found' }, { status: 404 });
        }

        return NextResponse.json(issue);
    } catch (error) {
        console.error('Failed to fetch issue:', error);
        return NextResponse.json({ error: 'Failed to fetch issue' }, { status: 500 });
    }
}

// Validation schema for updating issues
const updateIssueSchema = z.object({
    title: z.string().min(1, "Title is required").max(255, "Title must be less than 255 characters"),
    description: z.string().min(1, "Description is required"),
    status: z.enum(['OPEN', 'IN_PROGRESS', 'CLOSED']).optional(),
});

// Validation schema for assigning users
const assignIssueSchema = z.object({
    assigneeId: z.string().nullable(),
});

export async function PUT(request: NextRequest, { params }: Props) {
    try {
        // Check authentication
        const session = await getServerSession(authOptions);
        if (!session || !session.user?.email) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { id } = await params;
        const issueId = parseInt(id);
        
        if (isNaN(issueId)) {
            return NextResponse.json({ error: 'Invalid issue ID' }, { status: 400 });
        }

        // Check if issue exists and get author info
        const existingIssue = await prisma.issue.findUnique({
            where: { id: issueId },
            include: {
                author: true
            }
        });

        if (!existingIssue) {
            return NextResponse.json({ error: 'Issue not found' }, { status: 404 });
        }

        // Check ownership - only the author can edit
        if (existingIssue.author?.email !== session.user.email) {
            return NextResponse.json({ error: 'Forbidden - You can only edit your own issues' }, { status: 403 });
        }

        const body = await request.json();
        
        // Validate the request body
        const validation = updateIssueSchema.safeParse(body);
        if (!validation.success) {
            return NextResponse.json({ 
                error: 'Validation failed', 
                details: validation.error.issues 
            }, { status: 400 });
        }

        const { title, description, status } = validation.data;

        // Update the issue
        const updatedIssue = await prisma.issue.update({
            where: { id: issueId },
            data: {
                title,
                description,
                ...(status && { status }),
                updatedAt: new Date(),
            }
        });

        return NextResponse.json(updatedIssue);
    } catch (error) {
        console.error('Failed to update issue:', error);
        return NextResponse.json({ error: 'Failed to update issue' }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest, { params }: Props) {
    try {
        // Check authentication
        const session = await getServerSession(authOptions);
        if (!session || !session.user?.email) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { id } = await params;
        const issueId = parseInt(id);
        
        if (isNaN(issueId)) {
            return NextResponse.json({ error: 'Invalid issue ID' }, { status: 400 });
        }

        // Check if issue exists and get author info
        const existingIssue = await prisma.issue.findUnique({
            where: { id: issueId },
            include: {
                author: true
            }
        });

        if (!existingIssue) {
            return NextResponse.json({ error: 'Issue not found' }, { status: 404 });
        }

        // Check ownership - only the author can delete
        if (existingIssue.author?.email !== session.user.email) {
            return NextResponse.json({ error: 'Forbidden - You can only delete your own issues' }, { status: 403 });
        }

        // Delete the issue
        await prisma.issue.delete({
            where: { id: issueId }
        });

        return NextResponse.json({ message: 'Issue deleted successfully' });
    } catch (error) {
        console.error('Failed to delete issue:', error);
        return NextResponse.json({ error: 'Failed to delete issue' }, { status: 500 });
    }
}

export async function PATCH(request: NextRequest, { params }: Props) {
    try {
        // Check authentication
        const session = await getServerSession(authOptions);
        if (!session || !session.user?.email) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { id } = await params;
        const issueId = parseInt(id);
        
        if (isNaN(issueId)) {
            return NextResponse.json({ error: 'Invalid issue ID' }, { status: 400 });
        }

        // Check if issue exists
        const existingIssue = await prisma.issue.findUnique({
            where: { id: issueId },
        });

        if (!existingIssue) {
            return NextResponse.json({ error: 'Issue not found' }, { status: 404 });
        }

        const body = await request.json();
        
        // Validate the request body
        const validation = assignIssueSchema.safeParse(body);
        if (!validation.success) {
            return NextResponse.json({ 
                error: 'Validation failed', 
                details: validation.error.issues 
            }, { status: 400 });
        }

        const { assigneeId } = validation.data;

        // If assigneeId is provided, verify the user exists
        if (assigneeId) {
            const assigneeExists = await prisma.user.findUnique({
                where: { id: assigneeId }
            });
            
            if (!assigneeExists) {
                return NextResponse.json({ error: 'Assignee not found' }, { status: 400 });
            }
        }

        // Update the issue assignee
        const updatedIssue = await prisma.issue.update({
            where: { id: issueId },
            data: {
                assigneeId: assigneeId,
                updatedAt: new Date(),
            },
            include: {
                author: {
                    select: {
                        id: true,
                        name: true,
                        email: true
                    }
                },
                assignee: {
                    select: {
                        id: true,
                        name: true,
                        email: true
                    }
                }
            }
        });

        return NextResponse.json(updatedIssue);
    } catch (error) {
        console.error('Failed to update assignee:', error);
        return NextResponse.json({ error: 'Failed to update assignee' }, { status: 500 });
    }
}