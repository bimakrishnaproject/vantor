import type { TeamMember } from '@/types';

interface TeamGridProps {
  team: TeamMember[];
}

export function TeamGrid({ team }: TeamGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6" id="team-grid">
      {team.map((member, i) => (
        <div
          key={i}
          className="group glass-panel p-6 md:p-8 hover:border-vantor-blue/25 transition-all duration-300"
        >
          {/* Avatar placeholder */}
          <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-vantor-charcoal to-vantor-navy border border-vantor-blue/10 flex items-center justify-center mb-5 group-hover:border-vantor-blue/30 transition-colors duration-300">
            <span className="text-vantor-blue font-display text-xl md:text-2xl font-bold">
              {member.name
                .split(' ')
                .map((n) => n[0])
                .join('')
                .slice(0, 2)}
            </span>
          </div>

          {/* Name & Role */}
          <h4 className="font-display text-lg font-bold text-vantor-white mb-1">
            {member.name}
          </h4>
          <p className="text-vantor-blue text-xs uppercase tracking-widest font-medium mb-3">
            {member.role}
          </p>

          {/* Bio */}
          {member.bio && (
            <p className="text-vantor-muted text-sm leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {member.bio}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}
