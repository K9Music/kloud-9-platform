// lib/validation.js

export function sanitizeObject(obj) {
  for (const key in obj) {
    if (typeof obj[key] === 'string') {
      obj[key] = obj[key].replace(/\u0000/g, '');
    }
  }
  return obj;
}

export function isValidProfileInput(data) {
  // Username: 3-30 chars, alphanumeric, underscores, no spaces
  if (data.username !== undefined && !/^[a-zA-Z0-9_]{3,30}$/.test(data.username)) return false;
  // Name: 1-100 chars, no control chars
  if (data.name !== undefined && (data.name.length > 100 || /[\x00-\x1F]/.test(data.name))) return false;
  // Bio: up to 1000 chars, allow newlines, but not other control chars
  if (data.bio !== undefined && (data.bio.length > 1000 || /[\x00-\x08\x0B\x0C\x0E-\x1F]/.test(data.bio))) return false;
  // photoUrl/bannerUrl: must be a valid URL if present
  if (data.photoUrl !== undefined && data.photoUrl && !/^https?:\/\//.test(data.photoUrl)) return false;
  if (data.bannerUrl !== undefined && data.bannerUrl && !/^https?:\/\//.test(data.bannerUrl)) return false;
  // No field should contain <script>
  for (const key in data) {
    if (typeof data[key] === 'string' && /<script/i.test(data[key])) return false;
  }
  return true;
} 