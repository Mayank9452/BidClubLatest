import dayjs from "dayjs";

/**
 * Interface for Subscription UI State
 */
export interface SubscriptionUIState {
  hasAccess: boolean;
  showButton: "unsubscribe" | "subscribe";
  popupToShow: "none" | "lowBalance" | "unsubscribe";
}

/**
 * Checks if the user has active subscription access based on their status and validity period.
 * 
 * Rules:
 * 1. user_is_subscribed = 1 -> Full access
 * 2. status = "renew": Access if dValidTill > current date/time
 * 3. status = "grace": Access if dValidTill is null OR dValidTill > current date/time
 * 
 * @param userInfo The userInfo object from the API response
 * @param dValidTill The dValidTill string from the API response (Format: 2026-05-19 09:00:58)
 * @returns boolean True if the user has access, false otherwise
 */
export const hasSubscriptionAccess = (userInfo: any, dValidTill: string | null | undefined): boolean => {
  const isSubscribed = userInfo?.user_is_subscribed === "1" || userInfo?.user_is_subscribed === 1;

  // Rule 1: user_is_subscribed = 1, full access
  if (isSubscribed) {
    return true;
  }

  const status = userInfo?.user_subscription_status?.toLowerCase();

  // Rule 2: status = "renew"
  if (status === "renew") {
    if (dValidTill) {
      return dayjs(dValidTill).isAfter(dayjs());
    }
    return false;
  }

  // Rule 3: status = "grace"
  if (status === "grace") {
    if (!dValidTill) {
      return true;
    }
    return dayjs(dValidTill).isAfter(dayjs());
  }

  return false;
};

/**
 * Determines the UI state (which button to show, which popup to trigger) based on subscription status.
 * 
 * @param userInfo The userInfo object from the API response
 * @param dValidTill The dValidTill string from the API response
 * @param portalAccessAllowed Optional flag indicating if portal access is allowed
 * @returns SubscriptionUIState
 */
export const getSubscriptionUIState = (
  userInfo: any,
  dValidTill: string | null | undefined,
  portalAccessAllowed?: number | string | null
): SubscriptionUIState => {
  const hasAccess = hasSubscriptionAccess(userInfo, dValidTill);
  const status = userInfo?.user_subscription_status?.toLowerCase();

  // Resolve portalAccessAllowed: parameter -> sessionStorage -> userInfo
  const sessionPortalAccess = typeof window !== "undefined" ? sessionStorage.getItem("portal_access_allowed") : null;
  const resolvedPortalAccess = portalAccessAllowed !== undefined && portalAccessAllowed !== null
    ? portalAccessAllowed
    : (sessionPortalAccess !== null ? sessionPortalAccess : userInfo?.portal_access_allowed);

  const portalAccess = resolvedPortalAccess !== undefined && resolvedPortalAccess !== null
    ? Number(resolvedPortalAccess)
    : null;

  // Rule: If portal_access_allowed = 1, they don't get blocked and don't see any popups
  if (portalAccess === 1) {
    return {
      hasAccess: true,
      showButton: status === "unsub" ? "subscribe" : "unsubscribe",
      popupToShow: "none"
    };
  }

  if (hasAccess) {
    return {
      hasAccess: true,
      showButton: "unsubscribe",
      popupToShow: "none"
    };
  }

  // If no access, determine which popup and button to show
  if (status === "suspend") {
    return {
      hasAccess: false,
      showButton: "subscribe",
      popupToShow: "lowBalance"
    };
  }

  // Only show unsubscribe popup if portal_access_allowed is 0 and status is unsub
  if (portalAccess === 0 && status === "unsub") {
    return {
      hasAccess: false,
      showButton: "subscribe",
      popupToShow: "unsubscribe"
    };
  }

  // Default fallback for other unsubbed / no access cases
  return {
    hasAccess: false,
    showButton: "subscribe",
    popupToShow: "unsubscribe"
  };
};
