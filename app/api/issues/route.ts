import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import prisma from "@/prisma/client";
import { createIssueSchema } from "../../ValidationSchema";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET() {
    try {
        const issues = await prisma.issue.findMany({
            include: {
                author: {
                    select: {
                        id: true,
                        name: true,
                        email: true
                    }
                }
            },
            orderBy: { createdAt: 'desc' }
        });
        return NextResponse.json(issues);
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