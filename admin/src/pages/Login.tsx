export default function Login() {
  const handleLogin = () => {
    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';
    window.location.href = `${apiUrl}/auth/google`;
  };

  return (
    <div className="min-h-screen bg-[#FEFEFA] flex items-center justify-center relative overflow-hidden px-4">
      {/* Geometrical Grid Background Overlay */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)',
          backgroundSize: '32px 32px'
        }}
      />
      {/* Radial gradient mask to make the grid fade out at the edges */}
      <div className="absolute inset-0 z-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,#FEFEFA_100%)]" />

      <div className="relative z-10 w-full max-w-4xl animate-fade-in p-4">
        <div className="flex flex-col md:flex-row bg-white/80 backdrop-blur-xl rounded-[2rem] shadow-2xl overflow-hidden border border-slate-200/60 min-h-[500px]">
          
          {/* Left Side: Login Form */}
          <div className="w-full md:w-1/2 p-10 md:p-14 flex flex-col justify-center text-center relative z-10">
            {/* Title */}
            <h1 className="text-4xl font-bold tracking-tight text-slate-900 mb-3">
              Weather Guard
            </h1>

            <p className="text-slate-500 text-sm mb-10 font-medium">
              Secure weather alert management
            </p>

            {/* Logo */}
            <img src="/logo2.png" alt="Logo" className="w-50 h-50 mx-auto mb-4" />
            {/* Google Login Button */}
            <button
              onClick={handleLogin}
              className="w-full flex items-center justify-center gap-3 bg-white border border-slate-200 text-slate-900 font-medium px-6 py-4 rounded-xl hover:bg-slate-50 transition-all duration-200 shadow-[0_2px_10px_-3px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_20px_-4px_rgba(0,0,0,0.1)] hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
              Continue with Google
            </button>

            <p className="text-slate-400 text-xs mt-8 font-medium">
              Protected by enterprise-grade security
            </p>
          </div>

          {/* Right Side: Video Block */}
          <div className="hidden md:block w-full md:w-1/2 relative bg-slate-100">
            <video 
              autoPlay 
              loop 
              muted 
              playsInline 
              className="absolute inset-0 w-full h-full object-cover"
            >
              <source src="/login-page-asset.mp4" type="video/mp4" />
            </video>
            {/* Subtle inner shadow overlay to give depth between the white card and video */}
            <div className="absolute inset-0 shadow-[inset_10px_0_20px_-10px_rgba(0,0,0,0.1)] pointer-events-none" />
          </div>

        </div>
      </div>
    </div>
  );
}