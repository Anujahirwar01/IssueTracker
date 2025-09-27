import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { createIssueSchema } from "../../ValidationSchema";

export async function GET() {
    try {
        const issues = await prisma.issue.findMany({
            orderBy: { createdAt: 'desc' }
        });
        return NextResponse.json(issues);
    } catch (error) {
        console.error('Failed to fetch issues:', error);
        return NextResponse.json({ error: 'Failed to fetch issues' }, { status: 500 });
    }
}

export async function POST(request: NextRequest){
    const body = await request.json();
    const validation = createIssueSchema.safeParse(body);
    if(!validation.success){
        return NextResponse.json({error: validation.error}, {status: 400});
    }
    const newIssue = await prisma.issue.create({
        data: {title: body.title, description: body.description}
    })

    return NextResponse.json(newIssue, {status: 201});
}