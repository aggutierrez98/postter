import { useEffect, useState } from "react";
import { formatDate } from "./useDateTimeFormat";

const DEFAULT_LANGUAGE = "en";
const ISSERVER = typeof window === "undefined";

const isRelativeTimeFormatSupported =
  typeof Intl !== "undefined" && Intl.RelativeTimeFormat;

const DATE_UNITS: (string | number)[][] = [
  ["day", 86400],
  ["hour", 3600],
  ["minute", 60],
  ["second", 1],
];

const getDateDiffs = (
  timestamp: Date
): { value: number; unit: string | number } => {
  const now = Date.now();
  const elapsed = (Number(timestamp) - now) / 1000;

  for (const [unit, secondsInUnit] of DATE_UNITS) {
    if (Math.abs(elapsed) > secondsInUnit || unit === "second") {
      // const value = Math.round(elapsed / (secondsInUnit));
      const value = Math.round(elapsed / Number(secondsInUnit));
      return { value, unit };
    }
  }
};

export const useTimeAgo = (timestamp: Date): string | Date => {
  let lang = DEFAULT_LANGUAGE;

  // // if (!timestamp) {
  // //   return "";
  // // }

  const [timeago, setTimeago] = useState<{
    value: number;
    unit: string | number;
  }>(() => getDateDiffs(timestamp));

  useEffect(() => {
    if (isRelativeTimeFormatSupported) {
      const interval = setInterval(() => {
        const newTimeAgo = getDateDiffs(timestamp);
        setTimeago(newTimeAgo);
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [timestamp]);

  if (!isRelativeTimeFormatSupported) {
    return formatDate(timestamp);
  }

  if (!ISSERVER) {
    lang = localStorage.getItem("lang") || "en";
  }

  const rtf = new Intl.RelativeTimeFormat(lang, { style: "short" });

  const { value, unit }: { value: any; unit: any } = timeago;

  return rtf.format(value, unit);
};
