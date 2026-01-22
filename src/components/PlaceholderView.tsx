import { Users, MessageCircle } from 'lucide-react';

interface PlaceholderViewProps {
  type: 'communities' | 'chat';
}

export function PlaceholderView({ type }: PlaceholderViewProps) {
  const config = {
    communities: {
      icon: Users,
      title: 'Communities',
      description: 'Discover and join communities that match your interests',
    },
    chat: {
      icon: MessageCircle,
      title: 'Chat',
      description: 'Connect with other Redditors in real-time',
    },
  };

  const { icon: Icon, title, description } = config[type];

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-8 pb-20 text-center">
      <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-muted">
        <Icon size={40} className="text-muted-foreground" />
      </div>
      <h1 className="mb-2 text-2xl font-bold">{title}</h1>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
}
