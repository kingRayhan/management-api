import { randomBytes } from 'crypto';

export function slugify(plain_text, is_unique = false) {
  const random = randomBytes(4).toString('hex');
  const slug = plain_text.split(' ').join('_').toLowerCase();
  return is_unique ? `${slug}_${random}` : slug;
}
