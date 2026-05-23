import NodeCache from "node-cache";

export const orderCache =
  global.orderCache ||
  new NodeCache({
    stdTTL: 600,
  });

if (process.env.NODE_ENV !== "production") {
  global.orderCache = orderCache;
}