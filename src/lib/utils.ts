import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const shortenEthereumAddress = (
  address: string,
  prefixLength: number = 6,
  suffixLength: number = 4,
): string => {
  if (!address || address.length !== 42) {
    throw new Error("Invalid Ethereum address");
  }

  const prefix = address.substring(0, prefixLength);
  const suffix = address.substring(address.length - suffixLength);

  return `${prefix}...${suffix}`;
};
