interface InfographicPanelProps {
  title: string;
  points: string[];
}

export function InfographicPanel({ title, points }: InfographicPanelProps) {
  return (
    <div className="relative" id="infographic-panel">
      <h3 className="font-display text-2xl md:text-3xl font-bold text-vantor-white mb-10 text-center">
        {title}
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {points.map((point, i) => (
          <div
            key={i}
            className="group relative glass-panel p-6 hover:border-vantor-blue/25 transition-all duration-300"
          >
            {/* Number indicator */}
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-vantor-blue/10 border border-vantor-blue/20 flex items-center justify-center">
                <span className="text-vantor-blue text-xs font-bold">{i + 1}</span>
              </div>
              <p className="text-vantor-silver text-sm leading-relaxed pt-1">
                {point}
              </p>
            </div>

            {/* Connection line (not on last item) */}
            {i < points.length - 1 && i % 3 !== 2 && (
              <div className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 w-4 h-px bg-gradient-to-r from-vantor-blue/20 to-transparent" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
