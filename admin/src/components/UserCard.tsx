import type { User } from '../types/user';

interface Props {
  user: User;
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
}

export default function UserCard({
  user,
  onApprove,
  onReject,
}: Props) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
      <h2 className="font-semibold text-lg">
        {user.name}
      </h2>

      <p className="text-slate-400">
        {user.email}
      </p>

      <p className="mt-2 text-yellow-500">
        {user.status}
      </p>

      <div className="flex gap-3 mt-4">
        <button
          onClick={() => onApprove(user._id)}
          className="bg-green-600 px-4 py-2 rounded"
        >
          Approve
        </button>

        <button
          onClick={() => onReject(user._id)}
          className="bg-red-600 px-4 py-2 rounded"
        >
          Reject
        </button>
      </div>
    </div>
  );
}