import { MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PromotedPostProps {
  company: string;
  tagline: string;
  description: string;
  ctaText: string;
  imageEmoji?: string;
}

export function PromotedPost({ 
  company, 
  tagline, 
  description, 
  ctaText,
  imageEmoji = '🚀' 
}: PromotedPostProps) {
  return (
    <article className="border-b border-border bg-muted/30">
      {/* Header */}
      <div className="flex items-center gap-2 px-4 py-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-blue-600 text-white text-sm font-bold">
          {company.charAt(0)}
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">{company}</span>
            <span className="text-xs font-medium text-blue-500">Promoted</span>
          </div>
          <span className="text-xs text-muted-foreground">@{company.toLowerCase().replace(/\s/g, '')}</span>
        </div>
        <button className="rounded-full p-2 transition-colors hover:bg-muted">
          <MoreHorizontal size={20} className="text-muted-foreground" />
        </button>
      </div>

      {/* Content */}
      <div className="px-4 pb-3">
        <h2 className="mb-2 text-base font-semibold leading-tight">{tagline}</h2>
        <p className="mb-3 text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>
        
        {/* Ad image/banner */}
        <div className="mb-3 flex h-32 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20">
          <span className="text-5xl">{imageEmoji}</span>
        </div>
        
        {/* CTA Button */}
        <Button className="w-full bg-blue-500 text-white hover:bg-blue-600">
          {ctaText}
        </Button>
      </div>
    </article>
  );
}
