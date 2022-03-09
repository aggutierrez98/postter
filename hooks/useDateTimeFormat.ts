const DEFAULT_LANGUAGE = "en";

const isDateTimeFormatSupported =
  typeof Intl !== "undefined" && Intl.DateTimeFormat;

export const formatDate = (
  timestamp: number | Date = 0,
  { language }: { language: string } = { language: DEFAULT_LANGUAGE }
) => {
  const date = new Date(timestamp);

  if (!isDateTimeFormatSupported) {
    const options: any = {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    };

    return date.toLocaleDateString(language, options);
  }

  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  };

  return new Intl.DateTimeFormat(language, options).format(date);
};

export const useDateTimeFormat = (timestamp: number | Date) => {
  return formatDate(timestamp, { language: DEFAULT_LANGUAGE });
};
