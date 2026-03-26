function getDay(strDate) {
  date = new Date(strDate);
  day = date.getDay();

  days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return days[day];
}

console.log(getDay("2026-1-4"));
