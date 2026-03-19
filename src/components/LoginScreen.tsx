import { motion } from 'framer-motion';
import { LogIn, KeyRound } from 'lucide-react';
import { useState } from 'react';

interface LoginScreenProps {
  onLogin: () => void;
}

const CREDENTIALS = [
  { email: 'newuser@reddit.com', pass: 'demo', desc: 'New User (Experiences Demo)' },
  { email: 'reader@reddit.com', pass: 'demo', desc: 'Returning user (No Demo)' }
];

export function LoginScreen({ onLogin }: LoginScreenProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e?: React.FormEvent) => {
    e?.preventDefault();
    
    // Check credentials
    const user = CREDENTIALS.find(c => c.email === email && c.pass === password);
    
    if (!user) {
      setError('Invalid email or password');
      return;
    }

    if (user.email === 'newuser@reddit.com') {
      // Clear all local storage to mimic a completely new user
      localStorage.clear();
    } else {
      // Returning user, just mark them as having seen the demo so it skips FTUE
      localStorage.setItem('ftue_reads_completed', 'true');
      localStorage.setItem('nudge_shown_this_session', 'true');
    }
    
    onLogin();
  };

  const useCredential = (cred: typeof CREDENTIALS[0]) => {
    setEmail(cred.email);
    setPassword(cred.pass);
    setError('');
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-sm rounded-[24px] border border-border bg-card p-8 shadow-2xl"
      >
        <div className="mb-8 flex justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-orange-600 shadow-lg">
            <span className="text-3xl font-bold text-white">r</span>
          </div>
        </div>
        
        <h1 className="mb-2 text-center text-3xl font-bold tracking-tight text-foreground">
          Welcome back
        </h1>
        <p className="mb-6 text-center text-sm text-muted-foreground">
          Log in to continue to Reddit Reads
        </p>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <input 
              type="email" 
              placeholder="Email address"
              value={email}
              onChange={e => { setEmail(e.target.value); setError(''); }}
              className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
          <div>
            <input 
              type="password" 
              placeholder="Password"
              value={password}
              onChange={e => { setPassword(e.target.value); setError(''); }}
              className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
          
          {error && <p className="text-xs text-red-500">{error}</p>}

          <button
            type="submit"
            className="mt-2 flex w-full items-center justify-center gap-2 rounded-full bg-primary py-3.5 text-sm font-bold text-primary-foreground transition-all hover:bg-primary/90 active:scale-[0.98]"
          >
            <LogIn size={18} />
            Login
          </button>
        </form>
        
        {/* Credential Locker */}
        <div className="mt-8 rounded-xl border border-dashed border-border bg-muted/50 p-4">
          <div className="mb-3 flex items-center gap-2 text-xs font-semibold text-muted-foreground uppercase tracking-widest">
            <KeyRound size={14} />
            Credential Locker
          </div>
          <div className="space-y-2">
            {CREDENTIALS.map((cred, idx) => (
              <button 
                key={idx}
                type="button"
                onClick={() => useCredential(cred)}
                className="w-full text-left rounded-lg bg-background p-2.5 text-xs border border-border transition-colors hover:border-primary/50"
              >
                <div className="font-semibold text-foreground">{cred.desc}</div>
                <div className="text-muted-foreground mt-0.5 font-mono">
                  {cred.email} / {cred.pass}
                </div>
              </button>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
