import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";

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
            where: { id: issueId }
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