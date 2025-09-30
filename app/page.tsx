import { Heading, Text } from '@radix-ui/themes';
import LatestIssues from './latestIssues';
import IssueStats from './components/IssueStats';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Overview of your project issues, statistics, and recent activity.",
  openGraph: {
    title: "Dashboard - Issue Tracker",
    description: "Get an overview of your project issues, view statistics, and see recent activity.",
  },
};

export default function Home() {
  return (
    <div className="p-10 space-y-8">
      <div>
        <Heading size="6" className="mb-2">Dashboard</Heading>
        <Text color="gray">Welcome to your issue tracking dashboard</Text>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Latest Issues Section */}
        <div className="lg:col-span-1">
          <LatestIssues />
        </div>
        
        {/* Issue Statistics */}
        <div className="lg:col-span-1">
          <IssueStats />
        </div>
      </div>
    </div>
  );
}
