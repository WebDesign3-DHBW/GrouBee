export const str2bool = (value) => {
  if (value && typeof value === "string") {
    if (value.toLowerCase() === "true") return true;
    if (value.toLowerCase() === "false") return false;
  }
  return value;
};

export const getWeekDay = (date) => {
  return new Date(date).toLocaleDateString("de-DE", {
    weekday: "long",
  });
};

export const getCurrentDay = (date) => {
  return new Date(date).toLocaleDateString("de-DE", {
    day: "numeric",
  });
};
