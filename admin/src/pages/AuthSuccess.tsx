import { useEffect, useRef } from 'react';
import {
  useNavigate,
  useSearchParams,
} from 'react-router-dom';

export default function AuthSuccess() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const hasRun = useRef(false);

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;

    const token = searchParams.get('token');
    const role = searchParams.get('role');
    const status = searchParams.get('status');

    console.log({ token, role, status });

    if (!token) {
      navigate('/', { replace: true });
      return;
    }

    localStorage.setItem('token', token);
    localStorage.setItem('role', role || '');
    localStorage.setItem('status', status || '');

    console.log(
      'Redirecting to:',
      role === 'ADMIN' ? '/dashboard' : '/pending',
    );

    if (role === 'ADMIN') {
      navigate('/dashboard', { replace: true });
    } else {
      navigate('/pending', { replace: true });
    }
  }, [navigate, searchParams]);

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center gap-4">
      <div className="animate-spin-slow w-8 h-8 border-2 border-slate-800 border-t-indigo-500 rounded-full" />
      <p className="text-slate-500 text-sm animate-fade-in-d1">
        Authenticating...
      </p>
    </div>
  );
}