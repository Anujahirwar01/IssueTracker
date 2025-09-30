'use client';
import { Select } from '@radix-ui/themes'
import React, { useEffect, useState } from 'react'

interface User {
  id: string;
  name: string | null;
  email: string | null;
  image: string | null;
}

interface AssigneeSelectProps {
  issueId: number;
  currentAssigneeId?: string | null;
  isOwner?: boolean;
  onAssigneeChange?: () => void;
}

const AssigneeSelect = ({ issueId, currentAssigneeId, isOwner = false, onAssigneeChange }: AssigneeSelectProps) => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedUserId, setSelectedUserId] = useState<string | undefined>(currentAssigneeId || undefined);

  // Update selectedUserId when currentAssigneeId prop changes (e.g., on refresh)
  useEffect(() => {
    setSelectedUserId(currentAssigneeId || undefined);
  }, [currentAssigneeId]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('/api/users');
        if (response.ok) {
          const userData = await response.json();
          setUsers(userData);
        } else {
          console.error('Failed to fetch users');
        }
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleAssigneeChange = async (userId: string) => {
    setSelectedUserId(userId);
    
    try {
      const response = await fetch(`/api/issues/${issueId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          assigneeId: userId === 'unassigned' ? null : userId
        }),
      });

      if (!response.ok) {
        console.error('Failed to update assignee');
        // Revert the selection on error
        setSelectedUserId(currentAssigneeId || undefined);
      } else {
        // Notify parent component of successful change
        onAssigneeChange?.();
      }
    } catch (error) {
      console.error('Error updating assignee:', error);
      // Revert the selection on error
      setSelectedUserId(currentAssigneeId || undefined);
    }
  };

  if (loading) {
    return <div>Loading users...</div>;
  }

  // If not owner, show current assignee as read-only text
  if (!isOwner) {
    const currentAssignee = users.find(user => user.id === currentAssigneeId);
    return (
      <span>
        {currentAssignee 
          ? (currentAssignee.name || currentAssignee.email || 'Unknown User')
          : 'Unassigned'
        }
      </span>
    );
  }

  // If owner, show the dropdown selector
  const displayValue = selectedUserId || "unassigned";
  
  return (
    <Select.Root 
      value={displayValue} 
      onValueChange={handleAssigneeChange}
    >
      <Select.Trigger 
        placeholder="Assign to..." 
        style={{ 
          minWidth: '120px',
          height: '32px', // Match button height
          display: 'flex',
          alignItems: 'center'
        }}
      />
      <Select.Content>
        <Select.Group>
          <Select.Label>Available Users</Select.Label>
          <Select.Item value="unassigned">
            <em>Unassigned</em>
          </Select.Item>
          {users.map((user) => (
            <Select.Item key={user.id} value={user.id}>
              {user.name || user.email || 'Unknown User'}
            </Select.Item>
          ))}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  )
}

export default AssigneeSelect
