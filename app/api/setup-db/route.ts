import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import prisma from '@/prisma/client';

export async function POST() {
  try {
    // Only allow this in development or for authenticated admin users
    const session = await getServerSession(authOptions);
    
    // In production, you might want to add additional security checks
    if (process.env.NODE_ENV === 'production' && !session?.user?.email) {
      return NextResponse.json({ 
        error: 'Unauthorized. Please authenticate first.' 
      }, { status: 401 });
    }

    // Check if tables exist by trying to count users
    try {
      const userCount = await prisma.user.count();
      const issueCount = await prisma.issue.count();
      
      return NextResponse.json({ 
        success: true,
        message: 'Database is already set up and working!',
        stats: {
          users: userCount,
          issues: issueCount
        }
      });
    } catch {
      // Tables don't exist, need to run migrations
      return NextResponse.json({ 
        success: false,
        error: 'Database tables not found. Please run migrations.',
        hint: 'Run: npx prisma migrate deploy'
      }, { status: 500 });
    }
    
  } catch (error) {
    console.error('Database setup error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ 
      success: false, 
      error: 'Database connection failed. Check your DATABASE_URL.',
      details: process.env.NODE_ENV === 'development' ? errorMessage : undefined
    }, { status: 500 });
  }
}