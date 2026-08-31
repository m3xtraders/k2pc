interface RateLimitRecord {
  timestamps: number[];
}

// In-memory IP tracking cache
const ipCache = new Map<string, RateLimitRecord>();

// Cleanup stale records periodically (every 5 minutes)
if (typeof setInterval !== "undefined") {
  setInterval(() => {
    const now = Date.now();
    for (const [ip, record] of ipCache.entries()) {
      // Retain only timestamps within the last 1 hour
      const recent = record.timestamps.filter((ts) => now - ts < 3600000);
      if (recent.length === 0) {
        ipCache.delete(ip);
      } else {
        record.timestamps = recent;
      }
    }
  }, 300000);
}

export interface RateLimitOptions {
  /** Maximum requests allowed in the short window (e.g. 1 minute) */
  maxPerMinute?: number;
  /** Maximum requests allowed in the long window (e.g. 1 hour) */
  maxPerHour?: number;
  /** Minimum delay between consecutive requests in milliseconds (burst protection) */
  minDelayMs?: number;
}

export interface RateLimitResult {
  allowed: boolean;
  reason?: string;
  retryAfterSeconds?: number;
}

/**
 * Checks if a given IP address exceeds the allowed request thresholds.
 */
export function checkRateLimit(
  ip: string,
  options: RateLimitOptions = {}
): RateLimitResult {
  const {
    maxPerMinute = 12,
    maxPerHour = 60,
    minDelayMs = 1200,
  } = options;

  const now = Date.now();
  let record = ipCache.get(ip);

  if (!record) {
    record = { timestamps: [] };
    ipCache.set(ip, record);
  }

  // Filter timestamps within the last hour
  record.timestamps = record.timestamps.filter((ts) => now - ts < 3600000);

  const lastTimestamp = record.timestamps[record.timestamps.length - 1];

  // 1. Burst Protection: Minimum gap between requests (e.g. 1.2s)
  if (lastTimestamp && now - lastTimestamp < minDelayMs) {
    return {
      allowed: false,
      reason: "Please wait a moment before sending another message.",
      retryAfterSeconds: Math.ceil((minDelayMs - (now - lastTimestamp)) / 1000),
    };
  }

  // 2. Minute Window Check: Max 12 requests in 60 seconds
  const requestsInLastMinute = record.timestamps.filter((ts) => now - ts < 60000).length;
  if (requestsInLastMinute >= maxPerMinute) {
    return {
      allowed: false,
      reason: "You have sent several messages in a short time. Please wait a minute or call our 24/7 hotline directly.",
      retryAfterSeconds: 60,
    };
  }

  // 3. Hour Window Check: Max 60 requests in 3600 seconds
  if (record.timestamps.length >= maxPerHour) {
    return {
      allowed: false,
      reason: "Chat limit reached for this session. Please call our 24/7 emergency dispatch at (306) 407-0007 for assistance.",
      retryAfterSeconds: 300,
    };
  }

  // Allow request and record timestamp
  record.timestamps.push(now);

  return { allowed: true };
}
