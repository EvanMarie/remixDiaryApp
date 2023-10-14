export default function FormatDate(dateString: string): string {
  // Remove the space before the timezone offset
  const adjustedBirthday = dateString.replace(/(\d{2}:\d{2}:\d{2}) /, "$1");

  const date = new Date(adjustedBirthday);

  // Check if date is valid
  if (isNaN(date.getTime())) {
    return "Invalid Date";
  }

  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const year = date.getFullYear();

  // Extract the hours and convert to 12-hour format
  let hours = date.getHours();
  const amOrPm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  // if hours equals 0, set it to 12
  hours = hours || 12;

  // Pad single digit minutes with an extra zero
  const minutes = date.getMinutes().toString().padStart(2, "0");

  return `${month}/${day}/${year} @ ${hours}:${minutes} ${amOrPm}`;
}
