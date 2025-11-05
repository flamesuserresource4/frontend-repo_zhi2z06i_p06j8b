import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GlassCard from './GlassCard';
import { Play, Flame, Droplet, Moon, Footprints, HeartPulse } from 'lucide-react';

// Small, reusable widget: metric pill
const MetricPill = ({ icon: Icon, label, value, accent = 'from-cyan-400 to-blue-500' }) => (
  <div className="flex items-center gap-2 rounded-full bg-white/10 border border-white/10 px-3 py-2">
    <div className={`h-8 w-8 rounded-full bg-gradient-to-br ${accent} flex items-center justify-center text-white`}>
      <Icon size={16} />
    </div>
    <div className="text-xs">
      <div className="text-white/70">{label}</div>
      <div className="text-white font-semibold">{value}</div>
    </div>
  </div>
);

// Lightweight SVG micro chart (no external deps)
const LineChart = ({ values = [20, 50, 30, 70, 60, 90, 80] }) => {
  const max = Math.max(...values, 100);
  const pts = values
    .map((v, i) => {
      const x = (i / (values.length - 1)) * 100;
      const y = 100 - (v / max) * 100;
      return `${x},${y}`;
    })
    .join(' ');
  return (
    <svg viewBox="0 0 100 100" className="w-full h-20">
      <polyline points={pts} fill="none" stroke="url(#g)" strokeWidth="3" strokeLinecap="round" />
      <defs>
        <linearGradient id="g" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0%" stopColor="#22d3ee" />
          <stop offset="100%" stopColor="#3b82f6" />
        </linearGradient>
      </defs>
    </svg>
  );
};

const SectionTitle = ({ title, subtitle }) => (
  <div className="mb-3">
    <h3 className="text-white text-lg font-semibold">{title}</h3>
    {subtitle && <p className="text-white/60 text-sm">{subtitle}</p>}
  </div>
);

// Pages
const Home = () => (
  <div className="pb-28">
    <div className="mb-4">
      <h1 className="text-2xl font-semibold text-white">FitForge</h1>
      <p className="text-white/70 text-sm">Your daily snapshot</p>
    </div>

    <div className="flex gap-3 overflow-x-auto no-scrollbar mb-4">
      <MetricPill icon={Flame} label="Calories" value="620 kcal" />
      <MetricPill icon={Droplet} label="Water" value="1.8 L" accent="from-indigo-500 to-cyan-400" />
      <MetricPill icon={Moon} label="Sleep" value="7.4 h" accent="from-violet-500 to-indigo-500" />
    </div>

    <GlassCard className="p-4 mb-4">
      <SectionTitle title="Activity" subtitle="Weekly overview" />
      <LineChart values={[30, 60, 40, 80, 70, 90, 75]} />
      <div className="mt-3 grid grid-cols-3 gap-3 text-center">
        <div>
          <div className="text-white text-lg font-semibold">4</div>
          <div className="text-white/60 text-xs">Workouts</div>
        </div>
        <div>
          <div className="text-white text-lg font-semibold">12.4k</div>
          <div className="text-white/60 text-xs">Steps</div>
        </div>
        <div>
          <div className="text-white text-lg font-semibold">82</div>
          <div className="text-white/60 text-xs">Avg HR</div>
        </div>
      </div>
    </GlassCard>

    <GlassCard className="p-4">
      <SectionTitle title="Today" subtitle="Quick actions" />
      <div className="grid grid-cols-2 gap-3">
        {["Full Body Burn", "Core Crush", "HIIT Express", "Yoga Flow"].map((w, i) => (
          <div key={w} className="rounded-xl p-3 bg-gradient-to-br from-white/5 to-white/0 border border-white/10">
            <div className="text-white font-medium mb-2">{w}</div>
            <button className="flex items-center gap-2 text-xs px-3 py-2 rounded-lg bg-gradient-to-r from-cyan-400 to-blue-500 text-white shadow-md">
              <Play size={14} /> Start
            </button>
          </div>
        ))}
      </div>
    </GlassCard>
  </div>
);

const Workouts = () => (
  <div className="pb-28">
    <div className="mb-4">
      <h1 className="text-2xl font-semibold text-white">Workouts</h1>
      <p className="text-white/70 text-sm">Curated for your goals</p>
    </div>
    <div className="grid grid-cols-1 gap-4">
      {[{
        title: 'HIIT Inferno', duration: '20 min', calories: '220 kcal', gradient: 'from-cyan-400/30 to-blue-500/20'
      },{
        title: 'Strength Circuit', duration: '35 min', calories: '340 kcal', gradient: 'from-indigo-500/30 to-cyan-400/20'
      },{
        title: 'Mobility Flow', duration: '25 min', calories: '150 kcal', gradient: 'from-violet-500/30 to-indigo-500/20'
      }].map((w, idx) => (
        <motion.div
          key={w.title}
          whileHover={{ y: -4, scale: 1.01 }}
          className={`rounded-2xl p-4 border border-white/10 bg-gradient-to-br ${w.gradient}`}
        >
          <div className="flex items-center justify-between">
            <div>
              <div className="text-white font-semibold text-lg">{w.title}</div>
              <div className="text-white/70 text-sm">{w.duration} • {w.calories}</div>
            </div>
            <button className="px-4 py-2 rounded-xl bg-white/10 border border-white/10 text-white hover:bg-white/20 transition">Start Workout</button>
          </div>
        </motion.div>
      ))}
    </div>
  </div>
);

const DietHealth = () => (
  <div className="pb-28">
    <div className="mb-4">
      <h1 className="text-2xl font-semibold text-white">Diet & Health</h1>
      <p className="text-white/70 text-sm">Plan meals and track vitals</p>
    </div>

    <GlassCard className="p-4 mb-4">
      <SectionTitle title="Meal Planner" subtitle="Calories per meal" />
      <div className="space-y-3">
        {[{ name: 'Breakfast', kcal: 380 }, { name: 'Lunch', kcal: 620 }, { name: 'Dinner', kcal: 540 }, { name: 'Snacks', kcal: 180 }].map((m) => (
          <div key={m.name} className="">
            <div className="flex justify-between text-white text-sm">
              <span>{m.name}</span>
              <span className="text-white/70">{m.kcal} kcal</span>
            </div>
            <div className="h-2 mt-2 rounded-full bg-white/10">
              <div className="h-2 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500" style={{ width: `${Math.min(100, (m.kcal/700)*100)}%` }} />
            </div>
          </div>
        ))}
      </div>
    </GlassCard>

    <GlassCard className="p-4">
      <SectionTitle title="Health" subtitle="Live trends" />
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-xl p-3 bg-white/5 border border-white/10">
          <div className="flex items-center gap-2 text-white/80 text-sm mb-2"><HeartPulse size={16}/> Heart Rate</div>
          <LineChart values={[72, 80, 76, 88, 84, 92, 86]} />
        </div>
        <div className="rounded-xl p-3 bg-white/5 border border-white/10">
          <div className="flex items-center gap-2 text-white/80 text-sm mb-2"><Droplet size={16}/> Water</div>
          <LineChart values={[0.6, 0.9, 1.2, 1.5, 1.6, 1.8, 2.0].map(v=>v*40)} />
        </div>
        <div className="rounded-xl p-3 bg-white/5 border border-white/10">
          <div className="flex items-center gap-2 text-white/80 text-sm mb-2"><Moon size={16}/> Sleep</div>
          <LineChart values={[6.5, 7.2, 7.8, 6.9, 7.4, 7.1, 7.6].map(v=>v*10)} />
        </div>
        <div className="rounded-xl p-3 bg-white/5 border border-white/10">
          <div className="flex items-center gap-2 text-white/80 text-sm mb-2"><Footprints size={16}/> Steps</div>
          <LineChart values={[8, 10, 12, 9, 11, 13, 12].map(v=>v*8)} />
        </div>
      </div>
    </GlassCard>
  </div>
);

const Profile = () => (
  <div className="pb-28">
    <div className="flex items-center gap-4 mb-6">
      <img src="https://i.pravatar.cc/100?img=13" alt="avatar" className="h-16 w-16 rounded-2xl border border-white/20" />
      <div>
        <h1 className="text-white text-xl font-semibold">Alex Morgan</h1>
        <p className="text-white/70 text-sm">Premium Member</p>
      </div>
    </div>

    <GlassCard className="p-4 mb-4">
      <SectionTitle title="Profile" subtitle="Manage your account" />
      <div className="grid grid-cols-2 gap-3">
        <button className="px-4 py-3 rounded-xl bg-white/10 border border-white/10 text-white hover:bg-white/20 transition">Edit Profile</button>
        <button className="px-4 py-3 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 text-white">Sign Out</button>
      </div>
    </GlassCard>

    <GlassCard className="p-4">
      <SectionTitle title="Connected Apps" subtitle="Integrations" />
      <div className="flex gap-3">
        {['Apple Health', 'Fitbit', 'Strava'].map((n) => (
          <div key={n} className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white/80 text-sm">{n}</div>
        ))}
      </div>
    </GlassCard>
  </div>
);

const pageMap = {
  home: Home,
  workout: Workouts,
  diet: DietHealth,
  health: DietHealth,
  profile: Profile,
};

const Pages = ({ current }) => {
  const Active = pageMap[current] || Home;
  return (
    <div className="pt-5 px-4 pb-28">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.3 }}
        >
          <Active />
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default Pages;
