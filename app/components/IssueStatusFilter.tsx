'use client';
import { Select } from '@radix-ui/themes';
import React from 'react';

interface IssueStatusFilterProps {
  currentStatus: string;
  onStatusChange: (status: string) => void;
}

const IssueStatusFilter = ({ currentStatus, onStatusChange }: IssueStatusFilterProps) => {
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm font-medium text-gray-700">Filter by status:</span>
      <Select.Root value={currentStatus} onValueChange={onStatusChange}>
        <Select.Trigger 
          placeholder="All Issues"
          style={{
            minWidth: '140px',
            height: '36px'
          }}
        />
        <Select.Content>
          <Select.Group>
            <Select.Label>Status Options</Select.Label>
            <Select.Item value="ALL">
              All Issues
            </Select.Item>
            <Select.Item value="OPEN">
              🔴 Open
            </Select.Item>
            <Select.Item value="IN_PROGRESS">
              🟡 In Progress
            </Select.Item>
            <Select.Item value="CLOSED">
              🟢 Closed
            </Select.Item>
          </Select.Group>
        </Select.Content>
      </Select.Root>
    </div>
  );
};

export default IssueStatusFilter;