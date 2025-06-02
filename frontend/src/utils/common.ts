export function copyToClipboard(text: string) {
  navigator.clipboard.writeText(text);
}
export function openSolscan(signature: string) {
  window.open(
    `https://solscan.io/tx/${signature}`,
    "_blank",
    "noopener,noreferrer"
  );
}

export function formatUnixTimestamp(unix: number) {
  const date = new Date(unix * 1000); // Convert seconds to milliseconds
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Month is 0-based
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

export function getEnvironmentBaseApi() {
  return import.meta.env.VITE_ENVIRONMENT === "PROD"
    ? ""
    : "http://localhost:3000";
}
