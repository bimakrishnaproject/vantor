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
          className="group relative glass-panel overflow-hidden card-3d min-h-[280px] sm:min-h-[320px] md:aspect-[3/4]"
        >
          {/* Ambient glow on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-vantor-blue/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {/* Default State: Photo & Basic Info */}
          <div className="absolute inset-0 p-6 flex flex-col justify-end z-10 transition-transform duration-500 group-hover:-translate-y-4">
            <div className="card-3d-inner">
              <h4 className="font-display text-lg font-bold text-vantor-white mb-1">
                {member.name}
              </h4>
              <p className="text-vantor-blue text-xs uppercase tracking-widest font-medium mb-3">
                {member.role}
              </p>
            </div>
          </div>

          {/* Bio — positioned inside the card, visible on hover */}
          {member.bio && (
            <div className="absolute inset-x-0 bottom-0 p-6 pt-0 z-10">
              <p className="text-vantor-muted text-sm leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                {member.bio}
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
