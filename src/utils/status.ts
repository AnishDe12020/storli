// Code from [Web3.storage](https://github.com/web3-storage/web3.storage)
// permissively licensed under the MIT and Apache 2.0 licenses.

import { Status, Upload } from "web3.storage";

export const PinStatus = {
  PINNED: "Pinned",
  PINNING: "Pinning",
  PIN_QUEUED: "PinQueued",
  QUEUING: "Queuing...",
};

export const getPinStatus = (item: Upload | Status): string => {
  return (
    Object.values(PinStatus).find(status =>
      item.pins.some(pin => status === pin.status)
    ) || PinStatus.QUEUING
  );
};

export const getStorageProviders = (item: Upload | Status): string[] => {
  return item.deals
    .filter(deal => !!deal.storageProvider)
    .map(deal => deal.storageProvider);
};

export const parseSize = (size: number): string => {
  const units = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
  let i = 0;
  while (size >= 1024) {
    size /= 1024;
    ++i;
  }

  return `${size.toFixed(2)} ${units[i]}`;
};

export const parseDate = (date: string): string => {
  const dateObj = new Date(date);
  return dateObj.toString();
};
