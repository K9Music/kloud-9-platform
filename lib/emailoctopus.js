// Lightweight EmailOctopus client used to subscribe creators on signup
// Env vars required:
// - EMAILOCTOPUS_API_KEY
// - EMAILOCTOPUS_LIST_ID
// Optional:
// - EMAILOCTOPUS_DOUBLE_OPT_IN = "true" to send confirmation email (status=PENDING)

function splitNameIntoFirstAndLast(fullName) {
  if (!fullName || typeof fullName !== 'string') {
    return { firstName: undefined, lastName: undefined };
  }
  const parts = fullName.trim().split(/\s+/);
  if (parts.length === 0) return { firstName: undefined, lastName: undefined };
  if (parts.length === 1) return { firstName: parts[0], lastName: '' };
  return { firstName: parts[0], lastName: parts.slice(1).join(' ') };
}

export async function subscribeToEmailOctopus({
  email,
  name,
  firstName,
  lastName,
  tags,
}) {
  const apiKey = process.env.EMAILOCTOPUS_API_KEY;
  const listId = process.env.EMAILOCTOPUS_LIST_ID;
  // true => send confirmation (PENDING), false/blank => subscribe immediately (SUBSCRIBED)
  const useDoubleOptIn = (process.env.EMAILOCTOPUS_DOUBLE_OPT_IN || '').toLowerCase() === 'true';

  if (!apiKey || !listId) {
    console.warn('[EmailOctopus] Missing EMAILOCTOPUS_API_KEY or EMAILOCTOPUS_LIST_ID. Skipping subscribe.');
    return { ok: false, skipped: true, reason: 'missing_env' };
  }
  if (!email) {
    console.warn('[EmailOctopus] Missing email. Skipping subscribe.');
    return { ok: false, skipped: true, reason: 'missing_email' };
  }

  // Resolve names
  let resolvedFirst = firstName;
  let resolvedLast = lastName;
  if ((!resolvedFirst || typeof resolvedFirst !== 'string') && name) {
    const split = splitNameIntoFirstAndLast(name);
    resolvedFirst = split.firstName;
    resolvedLast = split.lastName;
  }

  const baseUrl = `https://emailoctopus.com/api/1.6/lists/${encodeURIComponent(listId)}/contacts`;
  const url = `${baseUrl}?api_key=${encodeURIComponent(apiKey)}`;

  const payload = {
    email_address: email,
    status: useDoubleOptIn ? 'PENDING' : 'SUBSCRIBED',
    fields: {},
  };

  if (resolvedFirst) payload.fields.FirstName = resolvedFirst;
  if (resolvedLast) payload.fields.LastName = resolvedLast;
  if (Array.isArray(tags) && tags.length > 0) payload.tags = tags;

  try {
    let response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    let data = await response.json().catch(() => ({}));

    // If tags are rejected by the API, retry without tags
    if (!response.ok && Array.isArray(payload.tags) && payload.tags.length > 0) {
      const message = data && data.error && data.error.message ? data.error.message : response.statusText;
      if (response.status === 400 && typeof message === 'string' && message.toUpperCase() === 'PARAMETERS ARE MISSING OR INVALID.') {
        const { tags, ...withoutTags } = payload;
        console.warn('[EmailOctopus] Retrying subscribe without tags due to INVALID_PARAMETERS');
        response = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(withoutTags),
        });
        data = await response.json().catch(() => ({}));
      }
    }

    if (!response.ok) {
      const message = data && data.error && data.error.message ? data.error.message : response.statusText;
      console.warn('[EmailOctopus] Failed to subscribe:', message, data);
      return { ok: false, skipped: false, status: response.status, data };
    }

    return { ok: true, data };
  } catch (err) {
    console.warn('[EmailOctopus] Exception while subscribing:', err);
    return { ok: false, error: String(err) };
  }
}

// Subscribe to a specific EmailOctopus list (useful for newsletter vs creators)
export async function subscribeToEmailOctopusWithList(listIdOverride, {
  email,
  name,
  firstName,
  lastName,
  tags,
}) {
  const apiKey = process.env.EMAILOCTOPUS_API_KEY;
  const listId = listIdOverride || process.env.EMAILOCTOPUS_LIST_ID;
  const useDoubleOptIn = (process.env.EMAILOCTOPUS_DOUBLE_OPT_IN || '').toLowerCase() === 'true';

  if (!apiKey || !listId) {
    console.warn('[EmailOctopus] Missing EMAILOCTOPUS_API_KEY or listIdOverride. Skipping subscribe.');
    return { ok: false, skipped: true, reason: 'missing_env' };
  }
  if (!email) {
    console.warn('[EmailOctopus] Missing email. Skipping subscribe.');
    return { ok: false, skipped: true, reason: 'missing_email' };
  }

  let resolvedFirst = firstName;
  let resolvedLast = lastName;
  if ((!resolvedFirst || typeof resolvedFirst !== 'string') && name) {
    const split = splitNameIntoFirstAndLast(name);
    resolvedFirst = split.firstName;
    resolvedLast = split.lastName;
  }

  const baseUrl = `https://emailoctopus.com/api/1.6/lists/${encodeURIComponent(listId)}/contacts`;
  const url = `${baseUrl}?api_key=${encodeURIComponent(apiKey)}`;

  const payload = {
    email_address: email,
    status: useDoubleOptIn ? 'PENDING' : 'SUBSCRIBED',
    fields: {},
  };

  if (resolvedFirst) payload.fields.FirstName = resolvedFirst;
  if (resolvedLast) payload.fields.LastName = resolvedLast;
  if (Array.isArray(tags) && tags.length > 0) payload.tags = tags;

  try {
    let response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    let data = await response.json().catch(() => ({}));

    if (!response.ok && Array.isArray(payload.tags) && payload.tags.length > 0) {
      const message = data && data.error && data.error.message ? data.error.message : response.statusText;
      if (response.status === 400 && typeof message === 'string' && message.toUpperCase() === 'PARAMETERS ARE MISSING OR INVALID.') {
        const { tags, ...withoutTags } = payload;
        console.warn('[EmailOctopus] Retrying subscribe without tags due to INVALID_PARAMETERS');
        response = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(withoutTags),
        });
        data = await response.json().catch(() => ({}));
      }
    }

    if (!response.ok) {
      const message = data && data.error && data.error.message ? data.error.message : response.statusText;
      console.warn('[EmailOctopus] Failed to subscribe (override):', message, data);
      return { ok: false, skipped: false, status: response.status, data };
    }

    return { ok: true, data };
  } catch (err) {
    console.warn('[EmailOctopus] Exception while subscribing (override):', err);
    return { ok: false, error: String(err) };
  }
}


