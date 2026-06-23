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
    <div className="min-h-screen flex items-center justify-center">
      Logging in...
    </div>
  );
}