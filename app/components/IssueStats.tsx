'use client';
import React, { useEffect, useState } from 'react';
import { Card, Heading, Text } from '@radix-ui/themes';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

interface IssueStats {
  total: number;
  open: number;
  inProgress: number;
  closed: number;
}

const IssueStats = () => {
  const [stats, setStats] = useState<IssueStats>({ total: 0, open: 0, inProgress: 0, closed: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      // Fetch all issues to calculate stats
      const response = await fetch('/api/issues?limit=1000'); // High limit to get all issues
      if (response.ok) {
        const data = await response.json();
        const issues = data.issues || data;
        
        if (Array.isArray(issues)) {
          const stats = {
            total: issues.length,
            open: issues.filter(issue => issue.status === 'OPEN').length,
            inProgress: issues.filter(issue => issue.status === 'IN_PROGRESS').length,
            closed: issues.filter(issue => issue.status === 'CLOSED').length,
          };
          setStats(stats);
        }
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  // Prepare data for charts
  const pieData = [
    { name: 'Open', value: stats.open, color: '#ef4444' },
    { name: 'In Progress', value: stats.inProgress, color: '#f59e0b' },
    { name: 'Closed', value: stats.closed, color: '#10b981' },
  ].filter(item => item.value > 0); // Only show segments with data

  const barData = [
    { name: 'Open', value: stats.open, fill: '#ef4444' },
    { name: 'In Progress', value: stats.inProgress, fill: '#f59e0b' },
    { name: 'Closed', value: stats.closed, fill: '#10b981' },
  ];

  if (loading) {
    return (
      <Card>
        <div className="p-6">
          <Heading size="4" className="mb-4">Issue Statistics</Heading>
          <div className="h-64 flex items-center justify-center">
            <Text color="gray">Loading chart...</Text>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card>
      <div className="p-6">
        <Heading size="4" className="mb-4">Issue Statistics</Heading>
        
        {stats.total === 0 ? (
          <div className="h-64 flex items-center justify-center">
            <Text color="gray">No issues to display</Text>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Summary Numbers */}
            <div className="grid grid-cols-4 gap-4 text-center">
              <div>
                <Text size="5" weight="bold" className="block">{stats.total}</Text>
                <Text size="1" color="gray">Total</Text>
              </div>
              <div>
                <Text size="5" weight="bold" className="block" style={{ color: '#ef4444' }}>{stats.open}</Text>
                <Text size="1" color="gray">Open</Text>
              </div>
              <div>
                <Text size="5" weight="bold" className="block" style={{ color: '#f59e0b' }}>{stats.inProgress}</Text>
                <Text size="1" color="gray">In Progress</Text>
              </div>
              <div>
                <Text size="5" weight="bold" className="block" style={{ color: '#10b981' }}>{stats.closed}</Text>
                <Text size="1" color="gray">Closed</Text>
              </div>
            </div>

            {/* Pie Chart */}
            <div>
              <Text size="2" weight="medium" className="mb-2 block">Issue Distribution</Text>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    outerRadius={60}
                    dataKey="value"
                    label={({ name, value, percent }: { name: string; value: number; percent: number }) => 
                      `${name}: ${value} (${(percent * 100).toFixed(0)}%)`
                    }
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Bar Chart */}
            <div>
              <Text size="2" weight="medium" className="mb-2 block">Status Breakdown</Text>
              <ResponsiveContainer width="100%" height={150}>
                <BarChart data={barData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};

export default IssueStats;