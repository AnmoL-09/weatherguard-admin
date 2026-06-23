export default function Login() {
  const handleLogin = () => {
    window.location.href =
      'http://localhost:3000/auth/google';
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950">
      <div className="bg-slate-900 p-10 rounded-2xl border border-slate-800 text-center">
        <h1 className="text-4xl font-bold mb-4">
          WeatherGuard
        </h1>

        <p className="text-slate-400 mb-8">
          Secure weather alert management
        </p>

        <button
          onClick={handleLogin}
          className="bg-blue-600 px-6 py-3 rounded-lg hover:bg-blue-500"
        >
          Login with Google
        </button>
      </div>
    </div>
  );
}