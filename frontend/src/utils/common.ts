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
