/** FAQ content (WEBSITE_BUILD_BRIEF.md §7) - single source for /faq, the
 * homepage preview, and FAQPage JSON-LD. */

export interface FaqEntry {
	id: number;
	question: string;
	answer: string;
}

export interface FaqGroup {
	heading: string;
	entries: FaqEntry[];
}

export const faqGroups: FaqGroup[] = [
	{
		heading: 'For players',
		entries: [
			{
				id: 1,
				question: 'How do I join a competition on Sportykore?',
				answer:
					'Your competition admin shares an invite link or join code, usually in the team WhatsApp. Paste it in the app and you’re in. Join codes expire after 7 days, and you create your own profile in minutes.',
			},
			{
				id: 2,
				question: 'Does it cost me anything?',
				answer: 'No. Sportykore is free for players.',
			},
			{
				id: 3,
				question: 'Do I need a password?',
				answer:
					'No. You sign in with a one-time code sent to you — nothing to remember, nothing to forget.',
			},
			{
				id: 4,
				question: 'What happens to my stats each season?',
				answer:
					'They add up. Your profile keeps per-season numbers and career totals for goals, assists, appearances, cards, highlights, and man of the match awards. It becomes a record you can show anyone.',
			},
			{
				id: 5,
				question: 'What if I delete my account?',
				answer:
					'Your personal details are removed. Match statistics remain as anonymous competition history, no longer linked to you.',
			},
			{
				id: 6,
				question: 'Will it work on my phone and my data plan?',
				answer:
					'Yes. Sportykore is built for ordinary phones and unreliable data. Key match-day actions are offline-friendly and sync when the connection comes back.',
			},
		],
	},
	{
		heading: 'For coaches',
		entries: [
			{
				id: 7,
				question: 'Can I manage my lineup?',
				answer:
					'Yes. Organizers can assign team admins, and team admins can set lineups for their own team. Lineups unlock cleaner substitutions and man of the match selection on match day.',
			},
			{
				id: 8,
				question: 'Can I track my players’ development?',
				answer:
					'Every player’s goals, assists, appearances, cards, highlights, and awards build into their profile. Advanced competitions can also track passes, possession, shots, and shot accuracy from match-day events.',
			},
		],
	},
	{
		heading: 'For organizers',
		entries: [
			{
				id: 9,
				question: 'What does it cost my competition?',
				answer:
					'Nothing right now. Sportykore is free while we grow with our first 100 competitions — early competitions are partners, not customers.',
			},
			{
				id: 10,
				question: 'How much work is setup?',
				answer:
					'Minutes. Create the competition, add teams, assign team admins if needed, and share invite links or codes. Players onboard themselves; you never type a whole roster into a system.',
			},
			{
				id: 11,
				question: 'How does live scoring work?',
				answer:
					'From one phone at the pitch: big score buttons, the live minute, scorers, assists, cards, substitutions, and optional advanced stats. The table and player records update after every result.',
			},
			{
				id: 12,
				question: 'Can we stream our matches?',
				answer:
					'Yes — competitions that stream on YouTube Live can attach the stream so fans watch right inside the match center.',
			},
			{
				id: 13,
				question: 'Who owns our competition’s data?',
				answer:
					'Your competition does. We’re digitizing your history, not taking it. Results and stats remain part of the competition record even if an individual later deletes their account.',
			},
			{
				id: 16,
				question: 'Can fans get notifications for a competition?',
				answer:
					'Yes. Fans can choose the competitions they want notifications for, so updates stay useful instead of noisy.',
			},
		],
	},
	{
		heading: 'General',
		entries: [
			{
				id: 14,
				question: 'Where can I download Sportykore?',
				answer:
					'Sportykore is available on the App Store for iPhone and iPad, and on Google Play for Android.',
			},
			{
				id: 15,
				question: 'Is my data safe?',
				answer:
					'Yes. Sportykore complies with Nigeria’s Data Protection Act (NDPA 2023). See our Privacy Policy for the details.',
			},
		],
	},
];

export const allFaqEntries: FaqEntry[] = faqGroups.flatMap((group) => group.entries);

/** Homepage preview picks (§7): questions 1, 2, 9, 10, 11, 14. */
const homepageIds = [1, 2, 9, 10, 11, 14];

export const homepageFaqEntries: FaqEntry[] = homepageIds.map(
	(id) => allFaqEntries.find((entry) => entry.id === id)!,
);
