/**
 * Pure Frontend Lead Service
 * Note: All backend communication has been completely removed as requested.
 * When you build your backend, you can hook your API endpoint into this handler.
 */

export async function submitLead(formData) {
  // Pure client-side simulation - no network/backend calls made
  await new Promise((resolve) => setTimeout(resolve, 300));

  return {
    success: true,
    message: 'Your registration was recorded successfully!',
    lead: {
      id: 'DHYEYA-' + Date.now().toString().slice(-6),
      ...formData,
      timestamp: new Date().toISOString(),
    },
  };
}

