export function shortenAddress(address: string | undefined, chars = 4): string {
  if (!address) return "";
  return `${address.substring(0, 6)}...${address.substring(
    address.length - 4
  )}`;
}
