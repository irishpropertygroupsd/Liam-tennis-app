"use client";

import { useMemo, useState } from "react";

type Workout = {
  id: string;
  name: string;
  focus: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  minutes: number;
};

type WorkoutTab = {
  id: string;
  name: string;
  description: string;
  workouts: Workout[];
};

type MatchEntry = {
  id: string;
  tournament: string;
  opponent: string;
  result: "Win" | "Loss" | "Draw" | "Practice";
  date: string;
  matchDayMeals: string;
  weatherDescription: string;
  forehandErrors: number;
  backhandErrors: number;
  forehandWinners: number;
  backhandWinners: number;
  firstServesIn: number;
  doubleFaults: number;
  notes: string;
};

const starterTabs: WorkoutTab[] = [
  {
    id: "serves",
    name: "Serves",
    description:
      "First serves, second serves, kick serves, slice serves, body serves, wide serves, T serves, and pressure serving.",
    workouts: [
      {
        id: "first-serve-power",
        name: "First Serve Power",
        focus: "Power, racquet speed, and explosive contact",
        level: "Advanced",
        minutes: 20,
      },
      {
        id: "first-serve-placement",
        name: "First Serve Placement",
        focus: "Wide, body, and T targets",
        level: "Intermediate",
        minutes: 20,
      },
      {
        id: "second-serve-consistency",
        name: "Second Serve Consistency",
        focus: "High margin, spin, and no double faults",
        level: "Beginner",
        minutes: 25,
      },
      {
        id: "kick-serve",
        name: "Kick Serve",
        focus: "High bounce and safe net clearance",
        level: "Advanced",
        minutes: 25,
      },
      {
        id: "slice-serve",
        name: "Slice Serve",
        focus: "Wide angle and court opening",
        level: "Intermediate",
        minutes: 20,
      },
      {
        id: "serve-plus-one",
        name: "Serve + One",
        focus: "Serve, recover, and attack the next ball",
        level: "Advanced",
        minutes: 30,
      },
    ],
  },
  {
    id: "returns",
    name: "Returns",
    description:
      "Block returns, chip returns, aggressive returns, second-serve attacks, and return plus one.",
    workouts: [
      {
        id: "block-return",
        name: "Block Return",
        focus: "Compact swing against pace",
        level: "Beginner",
        minutes: 15,
      },
      {
        id: "chip-return",
        name: "Chip Return",
        focus: "Low slice return with depth",
        level: "Intermediate",
        minutes: 20,
      },
      {
        id: "aggressive-return",
        name: "Aggressive Return",
        focus: "Step in and attack second serves",
        level: "Advanced",
        minutes: 25,
      },
      {
        id: "crosscourt-return",
        name: "Cross-Court Return",
        focus: "Safe direction and recovery",
        level: "Intermediate",
        minutes: 20,
      },
      {
        id: "return-plus-one",
        name: "Return + One",
        focus: "Return, recover, and control the next ball",
        level: "Advanced",
        minutes: 30,
      },
    ],
  },
  {
    id: "forehands",
    name: "Forehands",
    description:
      "Cross-court, down-the-line, inside-out, inside-in, topspin, flat, and kill forehands.",
    workouts: [
      {
        id: "fh-crosscourt",
        name: "Forehand Cross-Court",
        focus: "Heavy rally ball and margin",
        level: "Beginner",
        minutes: 20,
      },
      {
        id: "fh-dtl",
        name: "Forehand Down The Line",
        focus: "Change direction with control",
        level: "Intermediate",
        minutes: 20,
      },
      {
        id: "fh-inside-out",
        name: "Inside-Out Forehand",
        focus: "Run around backhand and control pattern",
        level: "Advanced",
        minutes: 25,
      },
      {
        id: "fh-inside-in",
        name: "Inside-In Forehand",
        focus: "Open court attack",
        level: "Advanced",
        minutes: 25,
      },
      {
        id: "fh-kill-ball",
        name: "Forehand Kill Ball",
        focus: "Short ball put-away",
        level: "Advanced",
        minutes: 20,
      },
      {
        id: "short-ball-attack",
        name: "Short Ball Attack",
        focus: "Step in and finish",
        level: "Intermediate",
        minutes: 25,
      },
    ],
  },
  {
    id: "backhands",
    name: "Backhands",
    description:
      "Cross-court backhands, down-the-line backhands, slice, drive, defense, and passing shots.",
    workouts: [
      {
        id: "bh-crosscourt",
        name: "Backhand Cross-Court",
        focus: "Consistency and depth",
        level: "Beginner",
        minutes: 20,
      },
      {
        id: "bh-dtl",
        name: "Backhand Down The Line",
        focus: "Redirect with balance",
        level: "Advanced",
        minutes: 25,
      },
      {
        id: "bh-slice",
        name: "Backhand Slice",
        focus: "Low skid ball and control",
        level: "Intermediate",
        minutes: 20,
      },
      {
        id: "bh-defense",
        name: "Defensive Backhand",
        focus: "Stay alive under pressure",
        level: "Beginner",
        minutes: 20,
      },
      {
        id: "bh-pass",
        name: "Backhand Passing Shot",
        focus: "Beat the net player",
        level: "Advanced",
        minutes: 25,
      },
    ],
  },
  {
    id: "volleys",
    name: "Volleys",
    description:
      "Forehand volleys, backhand volleys, punch volleys, drop volleys, half volleys, and reaction volleys.",
    workouts: [
      {
        id: "fh-volley",
        name: "Forehand Volley",
        focus: "Punch and close",
        level: "Beginner",
        minutes: 15,
      },
      {
        id: "bh-volley",
        name: "Backhand Volley",
        focus: "Stable wrist and compact punch",
        level: "Beginner",
        minutes: 15,
      },
      {
        id: "half-volley",
        name: "Half Volley",
        focus: "Low pickup and balance",
        level: "Advanced",
        minutes: 20,
      },
      {
        id: "reaction-volley",
        name: "Reaction Volley",
        focus: "Fast hands at net",
        level: "Intermediate",
        minutes: 20,
      },
      {
        id: "drop-volley",
        name: "Drop Volley",
        focus: "Touch and soft hands",
        level: "Advanced",
        minutes: 20,
      },
    ],
  },
  {
    id: "footwork",
    name: "Footwork",
    description:
      "Split step, lateral movement, crossover steps, short-ball movement, and recovery patterns.",
    workouts: [
      {
        id: "split-step",
        name: "Split Step Timing",
        focus: "Explode when opponent makes contact",
        level: "Beginner",
        minutes: 15,
      },
      {
        id: "lateral-shuffle",
        name: "Lateral Shuffle",
        focus: "Side-to-side baseline movement",
        level: "Beginner",
        minutes: 15,
      },
      {
        id: "crossover-step",
        name: "Crossover Step",
        focus: "Cover more court efficiently",
        level: "Intermediate",
        minutes: 20,
      },
      {
        id: "short-ball-footwork",
        name: "Short Ball Footwork",
        focus: "Move forward fast and balanced",
        level: "Intermediate",
        minutes: 20,
      },
      {
        id: "recovery-pattern",
        name: "Recovery Pattern",
        focus: "Return to base after contact",
        level: "Advanced",
        minutes: 25,
      },
    ],
  },
  {
    id: "point-play",
    name: "Point Play",
    description:
      "Cross-court rallies, down-the-line changes, serve plus one, return plus one, pressure points, and tiebreaks.",
    workouts: [
      {
        id: "crosscourt-rally-game",
        name: "Cross-Court Rally Game",
        focus: "Consistency under pressure",
        level: "Beginner",
        minutes: 25,
      },
      {
        id: "dtl-change",
        name: "Down-The-Line Change",
        focus: "Pattern change at the right time",
        level: "Intermediate",
        minutes: 25,
      },
      {
        id: "defense-to-offense",
        name: "Defense To Offense",
        focus: "Turn the point around",
        level: "Advanced",
        minutes: 30,
      },
      {
        id: "tiebreak-simulation",
        name: "Tiebreak Simulation",
        focus: "Pressure scoring",
        level: "Advanced",
        minutes: 30,
      },
      {
        id: "serve-return-game",
        name: "Serve / Return Game",
        focus: "Real point starts",
        level: "Intermediate",
        minutes: 30,
      },
    ],
  },
];

export default function Page() {
  const [view, setView] = useState<"workouts" | "analysis">("workouts");

  const [tabs, setTabs] = useState<WorkoutTab[]>(starterTabs);
  const [activeTabId, setActiveTabId] = useState(starterTabs[0].id);
  const [selectedWorkoutIds, setSelectedWorkoutIds] = useState<string[]>([]);

  const [newTabName, setNewTabName] = useState("");
  const [newWorkoutName, setNewWorkoutName] = useState("");
  const [newWorkoutFocus, setNewWorkoutFocus] = useState("");
  const [newWorkoutMinutes, setNewWorkoutMinutes] = useState(20);
  const [newWorkoutLevel, setNewWorkoutLevel] =
    useState<Workout["level"]>("Intermediate");

  const [searchTerm, setSearchTerm] = useState("");
  const [matchEntries, setMatchEntries] = useState<MatchEntry[]>([]);

  const [currentMatch, setCurrentMatch] = useState<MatchEntry>({
    id: "live-match",
    tournament: "",
    opponent: "",
    result: "Practice",
    date: new Date().toISOString().slice(0, 10),
    matchDayMeals: "",
    weatherDescription: "",
    forehandErrors: 0,
    backhandErrors: 0,
    forehandWinners: 0,
    backhandWinners: 0,
    firstServesIn: 0,
    doubleFaults: 0,
    notes: "",
  });

  const activeTab = tabs.find((tab) => tab.id === activeTabId) || tabs[0];

  const allWorkouts = tabs.flatMap((tab) =>
    tab.workouts.map((workout) => ({
      ...workout,
      tabName: tab.name,
    }))
  );

  const selectedWorkouts = allWorkouts.filter((workout) =>
    selectedWorkoutIds.includes(workout.id)
  );

  const totalMinutes = selectedWorkouts.reduce(
    (sum, workout) => sum + workout.minutes,
    0
  );

  const filteredMatches = useMemo(() => {
    const search = searchTerm.toLowerCase().trim();

    if (!search) return matchEntries;

    return matchEntries.filter((entry) =>
      [
        entry.tournament,
        entry.opponent,
        entry.result,
        entry.date,
        entry.matchDayMeals,
        entry.weatherDescription,
        entry.notes,
      ]
        .join(" ")
        .toLowerCase()
        .includes(search)
    );
  }, [matchEntries, searchTerm]);

  const dashboardStats = useMemo(() => {
    const forehandErrors = filteredMatches.reduce(
      (sum, entry) => sum + entry.forehandErrors,
      0
    );
    const backhandErrors = filteredMatches.reduce(
      (sum, entry) => sum + entry.backhandErrors,
      0
    );
    const forehandWinners = filteredMatches.reduce(
      (sum, entry) => sum + entry.forehandWinners,
      0
    );
    const backhandWinners = filteredMatches.reduce(
      (sum, entry) => sum + entry.backhandWinners,
      0
    );
    const firstServesIn = filteredMatches.reduce(
      (sum, entry) => sum + entry.firstServesIn,
      0
    );
    const doubleFaults = filteredMatches.reduce(
      (sum, entry) => sum + entry.doubleFaults,
      0
    );
    const wins = filteredMatches.filter((entry) => entry.result === "Win").length;
    const losses = filteredMatches.filter(
      (entry) => entry.result === "Loss"
    ).length;

    return {
      matches: filteredMatches.length,
      wins,
      losses,
      totalErrors: forehandErrors + backhandErrors,
      forehandErrors,
      backhandErrors,
      totalWinners: forehandWinners + backhandWinners,
      forehandWinners,
      backhandWinners,
      firstServesIn,
      doubleFaults,
    };
  }, [filteredMatches]);

  const liveTotalErrors =
    currentMatch.forehandErrors + currentMatch.backhandErrors;

  const liveTotalWinners =
    currentMatch.forehandWinners + currentMatch.backhandWinners;

  function toggleWorkout(id: string) {
    setSelectedWorkoutIds((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );
  }

  function addTab() {
    const cleanName = newTabName.trim();
    if (!cleanName) return;

    const newTab: WorkoutTab = {
      id: cleanName.toLowerCase().replaceAll(" ", "-") + "-" + Date.now(),
      name: cleanName,
      description: "Custom tennis workout category.",
      workouts: [],
    };

    setTabs((current) => [...current, newTab]);
    setActiveTabId(newTab.id);
    setNewTabName("");
  }

  function deleteActiveTab() {
    if (tabs.length === 1) return;

    const deletedWorkoutIds = activeTab.workouts.map((workout) => workout.id);
    const remainingTabs = tabs.filter((tab) => tab.id !== activeTabId);

    setTabs(remainingTabs);
    setActiveTabId(remainingTabs[0].id);
    setSelectedWorkoutIds((current) =>
      current.filter((id) => !deletedWorkoutIds.includes(id))
    );
  }

  function addWorkout() {
    const cleanName = newWorkoutName.trim();
    if (!cleanName) return;

    const newWorkout: Workout = {
      id: cleanName.toLowerCase().replaceAll(" ", "-") + "-" + Date.now(),
      name: cleanName,
      focus: newWorkoutFocus.trim() || "Custom focus",
      level: newWorkoutLevel,
      minutes: newWorkoutMinutes,
    };

    setTabs((current) =>
      current.map((tab) =>
        tab.id === activeTabId
          ? { ...tab, workouts: [...tab.workouts, newWorkout] }
          : tab
      )
    );

    setNewWorkoutName("");
    setNewWorkoutFocus("");
    setNewWorkoutMinutes(20);
    setNewWorkoutLevel("Intermediate");
  }

  function deleteWorkout(id: string) {
    setTabs((current) =>
      current.map((tab) =>
        tab.id === activeTabId
          ? {
              ...tab,
              workouts: tab.workouts.filter((workout) => workout.id !== id),
            }
          : tab
      )
    );

    setSelectedWorkoutIds((current) => current.filter((item) => item !== id));
  }

  function updateCurrentMatch(field: keyof MatchEntry, value: string | number) {
    setCurrentMatch((current) => ({
      ...current,
      [field]: value,
    }));
  }

  function saveMatchEntry() {
    const savedMatch: MatchEntry = {
      ...currentMatch,
      id: "match-" + Date.now(),
      tournament: currentMatch.tournament.trim() || "Practice Session",
      opponent: currentMatch.opponent.trim() || "Unknown Opponent",
    };

    setMatchEntries((current) => [savedMatch, ...current]);

    setCurrentMatch({
      id: "live-match",
      tournament: "",
      opponent: "",
      result: "Practice",
      date: new Date().toISOString().slice(0, 10),
      matchDayMeals: "",
      weatherDescription: "",
      forehandErrors: 0,
      backhandErrors: 0,
      forehandWinners: 0,
      backhandWinners: 0,
      firstServesIn: 0,
      doubleFaults: 0,
      notes: "",
    });
  }

  return (
    <main
      className="min-h-screen bg-cover bg-center bg-fixed bg-no-repeat text-white"
      style={{ backgroundImage: "url('/tennis-bg.png')" }}
    >
      <div className="min-h-screen bg-gradient-to-b from-black/80 via-black/45 to-black/90 px-5 py-8 backdrop-blur-[2px]">
        <section className="mx-auto max-w-7xl">
          <header className="mb-8 rounded-[2.5rem] border border-white/15 bg-white/10 p-8 shadow-2xl backdrop-blur-2xl">
            <p className="mb-3 text-sm font-black uppercase tracking-[0.4em] text-lime-300">
              Liam’s Tennis Program
            </p>

            <h1 className="text-5xl font-black tracking-tight md:text-7xl">
              Tennis Performance App
            </h1>

            <p className="mt-4 max-w-3xl text-lg text-slate-200">
              Build custom workouts, track match stats, save performance
              history, and search by tournament, opponent, result, meals,
              weather, or notes.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <button
                onClick={() => setView("workouts")}
                className={`rounded-2xl px-5 py-3 font-black transition ${
                  view === "workouts"
                    ? "bg-lime-300 text-slate-950 shadow-xl shadow-lime-300/20"
                    : "bg-white/10 text-white hover:bg-white/20"
                }`}
              >
                Workout Builder
              </button>

              <button
                onClick={() => setView("analysis")}
                className={`rounded-2xl px-5 py-3 font-black transition ${
                  view === "analysis"
                    ? "bg-lime-300 text-slate-950 shadow-xl shadow-lime-300/20"
                    : "bg-white/10 text-white hover:bg-white/20"
                }`}
              >
                Match Analysis
              </button>
            </div>
          </header>

          {view === "workouts" && (
            <div className="grid gap-6 lg:grid-cols-[260px_1fr_360px]">
              <aside className="rounded-[2.5rem] border border-white/15 bg-white/10 p-5 shadow-2xl backdrop-blur-2xl">
                <h2 className="mb-4 text-xl font-black">Workout Tabs</h2>

                <div className="space-y-2">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTabId(tab.id)}
                      className={`w-full rounded-2xl px-4 py-3 text-left font-bold transition ${
                        activeTabId === tab.id
                          ? "bg-lime-300 text-slate-950"
                          : "bg-black/35 hover:bg-white/20"
                      }`}
                    >
                      {tab.name}
                    </button>
                  ))}
                </div>

                <div className="mt-5 rounded-2xl bg-black/35 p-4">
                  <p className="mb-2 text-sm font-bold text-slate-300">
                    Add New Tab
                  </p>

                  <input
                    value={newTabName}
                    onChange={(event) => setNewTabName(event.target.value)}
                    placeholder="Example: Strategy"
                    className="w-full rounded-xl border border-white/15 bg-black/40 px-3 py-3 outline-none focus:border-lime-300"
                  />

                  <button
                    onClick={addTab}
                    className="mt-3 w-full rounded-xl bg-lime-300 px-4 py-3 font-black text-slate-950 hover:bg-lime-200"
                  >
                    Add Tab
                  </button>
                </div>
              </aside>

              <section className="rounded-[2.5rem] border border-white/15 bg-white/10 p-6 shadow-2xl backdrop-blur-2xl">
                <div className="mb-6 grid gap-4 md:grid-cols-[1fr_auto] md:items-start">
                  <div>
                    <label className="text-sm font-black uppercase tracking-widest text-lime-300">
                      Edit Active Tab
                    </label>

                    <input
                      value={activeTab.name}
                      onChange={(event) =>
                        setTabs((current) =>
                          current.map((tab) =>
                            tab.id === activeTabId
                              ? { ...tab, name: event.target.value }
                              : tab
                          )
                        )
                      }
                      className="mt-2 w-full rounded-2xl border border-white/15 bg-black/35 px-4 py-4 text-3xl font-black outline-none focus:border-lime-300"
                    />

                    <textarea
                      value={activeTab.description}
                      onChange={(event) =>
                        setTabs((current) =>
                          current.map((tab) =>
                            tab.id === activeTabId
                              ? { ...tab, description: event.target.value }
                              : tab
                          )
                        )
                      }
                      className="mt-3 min-h-[80px] w-full rounded-2xl border border-white/15 bg-black/35 px-4 py-3 text-slate-200 outline-none focus:border-lime-300"
                    />
                  </div>

                  <button
                    onClick={deleteActiveTab}
                    className="rounded-2xl border border-red-400/40 bg-red-500/10 px-4 py-3 font-black text-red-200 hover:bg-red-500/20"
                  >
                    Delete Tab
                  </button>
                </div>

                <div className="mb-6 rounded-3xl bg-black/35 p-5">
                  <h3 className="mb-4 text-xl font-black">Add Workout</h3>

                  <div className="grid gap-3 md:grid-cols-2">
                    <input
                      value={newWorkoutName}
                      onChange={(event) =>
                        setNewWorkoutName(event.target.value)
                      }
                      placeholder="Workout name"
                      className="rounded-xl border border-white/15 bg-black/40 px-3 py-3 outline-none focus:border-lime-300"
                    />

                    <input
                      value={newWorkoutFocus}
                      onChange={(event) =>
                        setNewWorkoutFocus(event.target.value)
                      }
                      placeholder="Focus"
                      className="rounded-xl border border-white/15 bg-black/40 px-3 py-3 outline-none focus:border-lime-300"
                    />

                    <select
                      value={newWorkoutLevel}
                      onChange={(event) =>
                        setNewWorkoutLevel(
                          event.target.value as Workout["level"]
                        )
                      }
                      className="rounded-xl border border-white/15 bg-black/40 px-3 py-3 outline-none focus:border-lime-300"
                    >
                      <option>Beginner</option>
                      <option>Intermediate</option>
                      <option>Advanced</option>
                    </select>

                    <input
                      type="number"
                      value={newWorkoutMinutes}
                      onChange={(event) =>
                        setNewWorkoutMinutes(Number(event.target.value))
                      }
                      className="rounded-xl border border-white/15 bg-black/40 px-3 py-3 outline-none focus:border-lime-300"
                    />
                  </div>

                  <button
                    onClick={addWorkout}
                    className="mt-4 rounded-xl bg-lime-300 px-5 py-3 font-black text-slate-950 hover:bg-lime-200"
                  >
                    Add Workout
                  </button>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  {activeTab.workouts.map((workout) => {
                    const selected = selectedWorkoutIds.includes(workout.id);

                    return (
                      <div
                        key={workout.id}
                        className={`rounded-3xl border p-5 shadow-xl transition ${
                          selected
                            ? "border-lime-300 bg-lime-300 text-slate-950"
                            : "border-white/10 bg-black/35 backdrop-blur-xl"
                        }`}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <h3 className="text-xl font-black">
                              {workout.name}
                            </h3>
                            <p className="mt-1 text-sm opacity-80">
                              {workout.focus}
                            </p>
                          </div>

                          <button
                            onClick={() => deleteWorkout(workout.id)}
                            className={`rounded-xl px-3 py-2 text-sm font-black ${
                              selected
                                ? "bg-slate-950 text-white"
                                : "bg-red-500/20 text-red-200"
                            }`}
                          >
                            Delete
                          </button>
                        </div>

                        <div className="mt-5 flex items-center justify-between">
                          <div className="flex gap-2">
                            <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-black">
                              {workout.level}
                            </span>
                            <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-black">
                              {workout.minutes} min
                            </span>
                          </div>

                          <button
                            onClick={() => toggleWorkout(workout.id)}
                            className={`rounded-xl px-4 py-2 font-black ${
                              selected
                                ? "bg-slate-950 text-white"
                                : "bg-lime-300 text-slate-950"
                            }`}
                          >
                            {selected ? "Selected" : "Add"}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>

              <aside className="rounded-[2.5rem] border border-white/15 bg-white/10 p-6 shadow-2xl backdrop-blur-2xl">
                <h2 className="text-2xl font-black">Today’s Plan</h2>
                <p className="mt-2 text-sm text-slate-300">
                  Selected workouts populate here.
                </p>

                <div className="my-5 rounded-3xl border border-white/10 bg-black/35 p-5 shadow-xl backdrop-blur-xl">
                  <p className="text-sm uppercase tracking-widest text-slate-400">
                    Total Time
                  </p>
                  <p className="text-5xl font-black text-lime-300">
                    {totalMinutes}
                    <span className="text-lg text-slate-300"> min</span>
                  </p>
                </div>

                <div className="space-y-3">
                  {selectedWorkouts.length === 0 ? (
                    <p className="rounded-2xl bg-black/35 p-4 text-slate-300">
                      No workouts selected yet.
                    </p>
                  ) : (
                    selectedWorkouts.map((workout, index) => (
                      <div
                        key={workout.id}
                        className="rounded-2xl border border-white/10 bg-black/35 p-4 shadow-xl backdrop-blur-xl"
                      >
                        <p className="text-xs font-black uppercase tracking-widest text-lime-300">
                          {index + 1}. {workout.tabName}
                        </p>
                        <p className="mt-1 font-black">{workout.name}</p>
                        <p className="text-sm text-slate-300">
                          {workout.minutes} min · {workout.level}
                        </p>
                      </div>
                    ))
                  )}
                </div>

                <button
                  onClick={() => setSelectedWorkoutIds([])}
                  className="mt-5 w-full rounded-2xl bg-white/10 px-5 py-4 font-black hover:bg-white/20"
                >
                  Clear Plan
                </button>
              </aside>
            </div>
          )}

          {view === "analysis" && (
            <div className="grid gap-6 lg:grid-cols-[1fr_470px]">
              <section className="rounded-[2.5rem] border border-white/15 bg-white/10 p-6 shadow-2xl backdrop-blur-2xl">
                <h2 className="text-3xl font-black">Match Entry</h2>
                <p className="mt-2 text-slate-300">
                  Enter match data. The live cards update immediately.
                </p>

                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  <TextInput
                    label="Tournament Name"
                    value={currentMatch.tournament}
                    onChange={(value) =>
                      updateCurrentMatch("tournament", value)
                    }
                    placeholder="Example: Boca Open"
                  />

                  <TextInput
                    label="Opponent Name"
                    value={currentMatch.opponent}
                    onChange={(value) => updateCurrentMatch("opponent", value)}
                    placeholder="Opponent name"
                  />

                  <div>
                    <label className="mb-2 block text-sm font-black text-lime-300">
                      Result
                    </label>
                    <select
                      value={currentMatch.result}
                      onChange={(event) =>
                        updateCurrentMatch(
                          "result",
                          event.target.value as MatchEntry["result"]
                        )
                      }
                      className="w-full rounded-2xl border border-white/15 bg-black/40 px-4 py-4 outline-none focus:border-lime-300"
                    >
                      <option>Win</option>
                      <option>Loss</option>
                      <option>Draw</option>
                      <option>Practice</option>
                    </select>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-black text-lime-300">
                      Date
                    </label>
                    <input
                      type="date"
                      value={currentMatch.date}
                      onChange={(event) =>
                        updateCurrentMatch("date", event.target.value)
                      }
                      className="w-full rounded-2xl border border-white/15 bg-black/40 px-4 py-4 outline-none focus:border-lime-300"
                    />
                  </div>

                  <TextArea
                    label="Match Day Meals"
                    value={currentMatch.matchDayMeals}
                    onChange={(value) =>
                      updateCurrentMatch("matchDayMeals", value)
                    }
                    placeholder="Example: eggs, banana, electrolytes, chicken and rice..."
                  />

                  <TextArea
                    label="Weather Description"
                    value={currentMatch.weatherDescription}
                    onChange={(value) =>
                      updateCurrentMatch("weatherDescription", value)
                    }
                    placeholder="Example: hot, humid, windy, sunny, heavy court..."
                  />

                  <StatInput
                    label="Forehand Unforced Errors"
                    value={currentMatch.forehandErrors}
                    onChange={(value) =>
                      updateCurrentMatch("forehandErrors", value)
                    }
                  />

                  <StatInput
                    label="Backhand Unforced Errors"
                    value={currentMatch.backhandErrors}
                    onChange={(value) =>
                      updateCurrentMatch("backhandErrors", value)
                    }
                  />

                  <StatInput
                    label="Forehand Winners"
                    value={currentMatch.forehandWinners}
                    onChange={(value) =>
                      updateCurrentMatch("forehandWinners", value)
                    }
                  />

                  <StatInput
                    label="Backhand Winners"
                    value={currentMatch.backhandWinners}
                    onChange={(value) =>
                      updateCurrentMatch("backhandWinners", value)
                    }
                  />

                  <StatInput
                    label="First Serves In"
                    value={currentMatch.firstServesIn}
                    onChange={(value) =>
                      updateCurrentMatch("firstServesIn", value)
                    }
                  />

                  <StatInput
                    label="Double Faults"
                    value={currentMatch.doubleFaults}
                    onChange={(value) =>
                      updateCurrentMatch("doubleFaults", value)
                    }
                  />

                  <TextArea
                    label="Match Notes"
                    value={currentMatch.notes}
                    onChange={(value) => updateCurrentMatch("notes", value)}
                    placeholder="What happened in the match?"
                  />
                </div>

                <div className="mt-6 grid gap-4 md:grid-cols-4">
                  <LiveCard title="Errors" value={liveTotalErrors} />
                  <LiveCard title="Winners" value={liveTotalWinners} />
                  <LiveCard
                    title="1st Serves In"
                    value={currentMatch.firstServesIn}
                  />
                  <LiveCard
                    title="Double Faults"
                    value={currentMatch.doubleFaults}
                  />
                </div>

                <button
                  onClick={saveMatchEntry}
                  className="mt-6 rounded-2xl bg-lime-300 px-6 py-4 font-black text-slate-950 shadow-xl shadow-lime-300/20 hover:bg-lime-200"
                >
                  Save Match To Dashboard
                </button>
              </section>

              <aside className="rounded-[2.5rem] border border-white/15 bg-white/10 p-6 shadow-2xl backdrop-blur-2xl">
                <h2 className="text-2xl font-black">Performance Dashboard</h2>

                <input
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                  placeholder="Search opponent, tournament, result, meals, weather..."
                  className="mt-4 w-full rounded-2xl border border-white/15 bg-black/40 px-4 py-4 outline-none focus:border-lime-300"
                />

                <div className="mt-5 grid grid-cols-2 gap-3">
                  <LiveCard title="Matches" value={dashboardStats.matches} />
                  <LiveCard
                    title="Wins/Losses"
                    value={`${dashboardStats.wins}-${dashboardStats.losses}`}
                  />
                  <LiveCard title="Errors" value={dashboardStats.totalErrors} />
                  <LiveCard
                    title="Winners"
                    value={dashboardStats.totalWinners}
                  />
                  <LiveCard title="FH UE" value={dashboardStats.forehandErrors} />
                  <LiveCard title="BH UE" value={dashboardStats.backhandErrors} />
                  <LiveCard
                    title="FH Winners"
                    value={dashboardStats.forehandWinners}
                  />
                  <LiveCard
                    title="BH Winners"
                    value={dashboardStats.backhandWinners}
                  />
                  <LiveCard
                    title="1st Serves In"
                    value={dashboardStats.firstServesIn}
                  />
                  <LiveCard
                    title="Double Faults"
                    value={dashboardStats.doubleFaults}
                  />
                </div>

                <div className="mt-6 space-y-3">
                  {filteredMatches.length === 0 ? (
                    <p className="rounded-2xl bg-black/35 p-4 text-slate-300">
                      No matches saved yet.
                    </p>
                  ) : (
                    filteredMatches.map((entry) => {
                      const totalErrors =
                        entry.forehandErrors + entry.backhandErrors;
                      const totalWinners =
                        entry.forehandWinners + entry.backhandWinners;

                      return (
                        <div
                          key={entry.id}
                          className="rounded-3xl border border-white/10 bg-black/35 p-4 shadow-xl backdrop-blur-xl"
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div>
                              <p className="text-xs font-black uppercase tracking-widest text-lime-300">
                                {entry.tournament}
                              </p>
                              <p className="text-lg font-black">
                                {entry.opponent}
                              </p>
                              <p className="text-sm text-slate-400">
                                {entry.date} · {entry.result}
                              </p>
                            </div>

                            <button
                              onClick={() =>
                                setMatchEntries((current) =>
                                  current.filter((item) => item.id !== entry.id)
                                )
                              }
                              className="rounded-xl bg-red-500/20 px-3 py-2 text-sm font-black text-red-200"
                            >
                              Delete
                            </button>
                          </div>

                          <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
                            <p>Errors: {totalErrors}</p>
                            <p>Winners: {totalWinners}</p>
                            <p>FH UE: {entry.forehandErrors}</p>
                            <p>BH UE: {entry.backhandErrors}</p>
                            <p>FH Winners: {entry.forehandWinners}</p>
                            <p>BH Winners: {entry.backhandWinners}</p>
                            <p>1st Serves In: {entry.firstServesIn}</p>
                            <p>DF: {entry.doubleFaults}</p>
                          </div>

                          {entry.matchDayMeals && (
                            <p className="mt-3 rounded-xl bg-white/10 p-3 text-sm text-slate-300">
                              <b>Meals:</b> {entry.matchDayMeals}
                            </p>
                          )}

                          {entry.weatherDescription && (
                            <p className="mt-2 rounded-xl bg-white/10 p-3 text-sm text-slate-300">
                              <b>Weather:</b> {entry.weatherDescription}
                            </p>
                          )}

                          {entry.notes && (
                            <p className="mt-2 rounded-xl bg-white/10 p-3 text-sm text-slate-300">
                              <b>Notes:</b> {entry.notes}
                            </p>
                          )}
                        </div>
                      );
                    })
                  )}
                </div>
              </aside>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

function TextInput({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-black text-lime-300">
        {label}
      </label>
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="w-full rounded-2xl border border-white/15 bg-black/40 px-4 py-4 outline-none focus:border-lime-300"
      />
    </div>
  );
}

function TextArea({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-black text-lime-300">
        {label}
      </label>
      <textarea
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="min-h-[120px] w-full rounded-2xl border border-white/15 bg-black/40 px-4 py-4 outline-none focus:border-lime-300"
      />
    </div>
  );
}

function StatInput({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-black text-lime-300">
        {label}
      </label>

      <div className="flex overflow-hidden rounded-2xl border border-white/15 bg-black/40">
        <button
          onClick={() => onChange(Math.max(0, value - 1))}
          className="w-14 bg-white/10 text-2xl font-black hover:bg-white/20"
        >
          -
        </button>

        <input
          type="number"
          value={value}
          onChange={(event) =>
            onChange(Math.max(0, Number(event.target.value)))
          }
          className="w-full bg-transparent px-4 py-4 text-center text-2xl font-black outline-none"
        />

        <button
          onClick={() => onChange(value + 1)}
          className="w-14 bg-lime-300 text-2xl font-black text-slate-950 hover:bg-lime-200"
        >
          +
        </button>
      </div>
    </div>
  );
}

function LiveCard({ title, value }: { title: string; value: string | number }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-black/35 p-4 shadow-xl backdrop-blur-xl">
      <p className="text-xs font-black uppercase tracking-widest text-slate-400">
        {title}
      </p>
      <p className="mt-2 text-3xl font-black text-lime-300">{value}</p>
    </div>
  );
}