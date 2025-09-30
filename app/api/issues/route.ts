import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import prisma from "@/prisma/client";
import { createIssueSchema } from "../../ValidationSchema";
import { authOptions } from "@/lib/auth";

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const page = parseInt(searchParams.get('page') || '1');
        const limit = parseInt(searchParams.get('limit') || '10');
        const status = searchParams.get('status');
        
        // Calculate offset for pagination
        const skip = (page - 1) * limit;
        
        // Build where condition for status filter
        const whereCondition: { status?: 'OPEN' | 'IN_PROGRESS' | 'CLOSED' } = {};
        if (status && status !== 'ALL' && ['OPEN', 'IN_PROGRESS', 'CLOSED'].includes(status)) {
            whereCondition.status = status as 'OPEN' | 'IN_PROGRESS' | 'CLOSED';
        }
        
        // Get total count for pagination metadata
        const totalCount = await prisma.issue.count({
            where: whereCondition
        });
        
        // Get paginated issues
        const issues = await prisma.issue.findMany({
            where: whereCondition,
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
            },
            orderBy: { createdAt: 'desc' },
            skip,
            take: limit
        });
        
        // Calculate pagination metadata
        const totalPages = Math.ceil(totalCount / limit);
        const hasNextPage = page < totalPages;
        const hasPreviousPage = page > 1;
        
        return NextResponse.json({
            issues,
            pagination: {
                page,
                limit,
                totalCount,
                totalPages,
                hasNextPage,
                hasPreviousPage
            }
        });
    } catch (error) {
        console.error('Failed to fetch issues:', error);
        return NextResponse.json({ error: 'Failed to fetch issues' }, { status: 500 });
    }
}

export async function POST(request: NextRequest){
    // Check authentication
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.email) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get user from database
    const user = await prisma.user.findUnique({
        where: { email: session.user.email }
    });

    if (!user) {
        return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const body = await request.json();
    const validation = createIssueSchema.safeParse(body);
    if(!validation.success){
        return NextResponse.json({error: validation.error}, {status: 400});
    }
    
    const newIssue = await prisma.issue.create({
        data: {
            title: body.title, 
            description: body.description,
            authorId: user.id
        }
    })

    return NextResponse.json(newIssue, {status: 201});
}