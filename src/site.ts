// Site name and tagline are placeholders until Rohit settles them (plan: "Decisions only Rohit can settle").
export const SITE_TITLE = 'Rohit';
export const SITE_TAGLINE = 'Travel, writing and notes.';
export const SECTIONS = {
  travel: 'Travel',
  writing: 'Writing',
  notes: 'Notes',
} as const;
export type Section = keyof typeof SECTIONS;
