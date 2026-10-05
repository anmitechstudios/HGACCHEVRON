"use client";

import { useEffect, useState } from "react";
import { Radio } from "lucide-react";
import { getServiceStatus } from "@/lib/service-schedule";

function splitDuration(ms: number) {
  const totalSeconds = Math.max(0, Math.floor(ms / 1000));
  return {
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
  };
}

export function Countdown() {
  const [status, setStatus] = useState<{ isLive: boolean; nextServiceStart: Date } | null>(
    null
  );
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    const tick = () => {
      setStatus(getServiceStatus());
      setNow(Date.now());
    };
    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, []);

  if (!status || now === null) {
    return <div className="h-24" aria-hidden="true" />;
  }

  if (status.isLive) {
    return (
      <div className="flex items-center gap-3 rounded-2xl border border-red-400/30 bg-red-500/10 px-6 py-4">
        <span className="relative flex size-3">
          <span className="absolute inline-flex size-full animate-ping rounded-full bg-red-400 opacity-75" />
          <span className="relative inline-flex size-3 rounded-full bg-red-500" />
        </span>
        <p className="font-heading text-lg font-semibold text-white">
          We&apos;re live now, join the service
        </p>
      </div>
    );
  }

  const { days, hours, minutes, seconds } = splitDuration(
    status.nextServiceStart.getTime() - now
  );
  const units = [
    { label: "Days", value: days },
    { label: "Hours", value: hours },
    { label: "Minutes", value: minutes },
    { label: "Seconds", value: seconds },
  ];

  return (
    <div>
      <p className="flex items-center gap-2 text-sm font-medium text-white/70">
        <Radio className="size-4" />
        Next service starts in
      </p>
      <div className="mt-3 flex gap-4">
        {units.map((unit) => (
          <div key={unit.label} className="text-center">
            <div className="w-16 rounded-xl border border-white/15 bg-white/5 py-3 font-heading text-2xl font-semibold text-white tabular-nums">
              {String(unit.value).padStart(2, "0")}
            </div>
            <p className="mt-1.5 text-[11px] uppercase tracking-wide text-white/50">
              {unit.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
