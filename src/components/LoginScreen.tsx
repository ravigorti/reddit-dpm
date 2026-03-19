import { motion } from 'framer-motion';
import { LogIn } from 'lucide-react';

interface LoginScreenProps {
  onLogin: () => void;
}

export function LoginScreen({ onLogin }: LoginScreenProps) {
  const handleLogin = () => {
    // Clear all local storage to mimic a completely new user
    localStorage.clear();
    onLogin();
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
        <p className="mb-8 text-center text-sm text-muted-foreground">
          Log in to continue to Reddit Reads
        </p>

        <button
          onClick={handleLogin}
          className="flex w-full items-center justify-center gap-2 rounded-full bg-primary py-3.5 text-sm font-bold text-primary-foreground transition-all hover:bg-primary/90 hover:shadow-md active:scale-[0.98]"
        >
          <LogIn size={18} />
          Login as New User
        </button>
        
        <p className="mt-4 text-center text-xs text-muted-foreground">
          This will reset the demo state (like reading goals and walkthroughs) so you can experience it as a new user.
        </p>
      </motion.div>
    </div>
  );
}
