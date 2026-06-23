import { useEffect, useState } from 'react';

import { api } from '../services/api';
import UserCard from '../components/UserCard';

import type { User } from '../types/user';

export default function Dashboard() {
  const [users, setUsers] = useState<User[]>([]);

  const fetchUsers = async () => {
    const token = localStorage.getItem('token');

    const response = await api.get(
      '/admin/pending-users',
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    setUsers(response.data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const approveUser = async (
    id: string,
  ) => {
    const token = localStorage.getItem('token');

    await api.patch(
      `/admin/approve/${id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    fetchUsers();
  };

  const rejectUser = async (
    id: string,
  ) => {
    const token = localStorage.getItem('token');

    await api.patch(
      `/admin/reject/${id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    fetchUsers();
  };

  return (
    <div className="min-h-screen bg-slate-950 p-10">
      <h1 className="text-4xl font-bold mb-8">
        Pending Users
      </h1>

      <div className="grid gap-4">
        {users.map((user) => (
          <UserCard
            key={user._id}
            user={user}
            onApprove={approveUser}
            onReject={rejectUser}
          />
        ))}
      </div>
    </div>
  );
}