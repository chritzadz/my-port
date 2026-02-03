// Tailwind utilities for React Native
export const tw = (className: string) => {
  const colorMap: Record<string, string> = {
    "text-primary-red": "#ef4444",
    "text-gray-900": "#111827",
    "text-white": "#ffffff",
  };

  return {
    color: colorMap[className] || "#000000",
  };
};
