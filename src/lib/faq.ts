/** FAQ content (WEBSITE_BUILD_BRIEF.md §7) — single source for /faq, the
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
					'Your competition admin shares an invite link or code — usually in the team WhatsApp. Paste it in the app and you’re in. You create your own profile in minutes.',
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
					'They add up. Your profile keeps per-season numbers and career totals — goals, assists, fixtures, cards. A record you can show anyone.',
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
					'Yes — it’s built for ordinary phones and unreliable data. The app is offline-friendly and syncs when you’re back online.',
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
					'Yes — formation-aware lineups with proper positions, and substitutions that keep the pitch view accurate.',
			},
			{
				id: 8,
				question: 'Can I track my players’ development?',
				answer:
					'Every player’s goals, assists, and appearances are recorded automatically from live matches — per season and across their career.',
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
					'Minutes. Create the competition, add teams, share invite links. Players onboard themselves; you never type a roster into a system.',
			},
			{
				id: 11,
				question: 'How does live scoring work?',
				answer:
					'From one phone at the pitch: big +/− score buttons, the live minute, and logging scorers and assists as they happen. The table updates itself after every result.',
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
				answer: 'Your competition does. We’re digitizing your history, not taking it.',
			},
		],
	},
	{
		heading: 'General',
		entries: [
			{
				id: 14,
				question: 'When does the app launch?',
				answer:
					'Soon — we’re onboarding early competitions now. Join the waitlist and you’ll be first to know when early access opens.',
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
