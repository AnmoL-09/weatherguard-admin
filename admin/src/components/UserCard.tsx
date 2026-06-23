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
    <div className="bg-white/80 backdrop-blur-xl border border-slate-200/60 rounded-[1.5rem] p-6 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] transition-all duration-300">
      <div className="flex items-start justify-between mb-2">
        <div className="overflow-hidden">
          <h2 className="font-bold text-lg text-slate-900 tracking-tight truncate">
            {user.name}
          </h2>
          <p className="text-sm font-medium text-slate-500 truncate">
            {user.email}
          </p>
        </div>
        <div className="inline-flex shrink-0 items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 border border-amber-100 text-amber-600 text-xs font-semibold ml-3">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse-dot" />
          {user.status}
        </div>
      </div>

      <div className="flex gap-3 mt-8">
        <button
          onClick={() => onApprove(user._id)}
          className="flex-1 bg-slate-900 text-white font-medium px-4 py-2.5 rounded-xl hover:bg-slate-800 transition-all duration-200 shadow-sm hover:shadow-md active:translate-y-0 hover:-translate-y-0.5 text-sm cursor-pointer"
        >
          Approve
        </button>

        <button
          onClick={() => onReject(user._id)}
          className="flex-1 bg-white border border-red-200 text-red-600 font-medium px-4 py-2.5 rounded-xl hover:bg-red-50 transition-all duration-200 shadow-sm hover:shadow-md active:translate-y-0 hover:-translate-y-0.5 text-sm cursor-pointer"
        >
          Reject
        </button>
      </div>
    </div>
  );
}