import { Home, Users, BookOpen, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useApp } from '@/context/AppContext';
import { TabType } from '@/types/reddit';

const navItems: { id: TabType; label: string; icon: React.ElementType; isNew?: boolean }[] = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'communities', label: 'Communities', icon: Users },
  { id: 'reads', label: 'Reads', icon: BookOpen, isNew: true },
  { id: 'chat', label: 'Chat', icon: MessageCircle },
];

export function BottomNav() {
  const { activeTab, setActiveTab } = useApp();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-card">
      <div className="flex items-center justify-around py-2">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          const Icon = item.icon;

          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className="relative flex flex-col items-center gap-1 px-4 py-1"
            >
              <div className="relative">
                <Icon
                  size={24}
                  className={isActive ? 'text-primary' : 'text-muted-foreground'}
                />
                {item.isNew && (
                  <span className="absolute -right-2 -top-1 rounded-full bg-primary px-1.5 text-[8px] font-bold text-primary-foreground">
                    NEW
                  </span>
                )}
              </div>
              <span
                className={`text-[10px] font-medium ${
                  isActive ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                {item.label}
              </span>
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute -bottom-2 h-0.5 w-8 rounded-full bg-primary"
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
