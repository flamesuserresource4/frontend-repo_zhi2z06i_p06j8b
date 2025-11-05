import React from 'react';
import { Home, Dumbbell, Utensils, Activity, User } from 'lucide-react';

const tabs = [
  { key: 'home', label: 'Home', icon: Home },
  { key: 'workout', label: 'Workout', icon: Dumbbell },
  { key: 'diet', label: 'Diet', icon: Utensils },
  { key: 'health', label: 'Health', icon: Activity },
  { key: 'profile', label: 'Profile', icon: User },
];

const TabBar = ({ current, onChange }) => {
  return (
    <nav className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-[94%] max-w-xl">
      <div className="grid grid-cols-5 gap-2 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/10 p-2">
        {tabs.map(({ key, label, icon: Icon }) => {
          const active = current === key;
          return (
            <button
              key={key}
              onClick={() => onChange(key)}
              className={`flex flex-col items-center justify-center py-2 rounded-xl transition-all duration-300 ${
                active
                  ? 'bg-gradient-to-br from-cyan-400/30 to-blue-500/30 text-white shadow-inner'
                  : 'text-white/70 hover:text-white hover:bg-white/5'
              }`}
            >
              <Icon size={22} />
              <span className="mt-1 text-[10px] font-medium">{label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default TabBar;
