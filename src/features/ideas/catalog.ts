import type { Idea } from './model';

export const ideas: readonly Idea[] = [
  {
    id: 'release-receipt',
    name: 'Release receipt',
    category: 'Developer tools',
    problem: 'Release notes miss the small changes that matter to customers.',
    audience: 'Solo developers who ship from Git.',
    solution:
      'Paste commit logs, group changes with simple rules, and export a polished markdown changelog.',
    difficulty: 'Beginner',
    hours: 8,
    monetization: 'Sell branded export templates as a one time upgrade.',
    dependencies: 'None',
    budget: [0, 0],
    stack: ['TypeScript', 'React', 'IndexedDB']
  },
  {
    id: 'json-pocket',
    name: 'JSON pocket',
    category: 'Developer tools',
    problem: 'Large API responses are hard to share when only a few nested fields matter.',
    audience: 'Developers writing bug reports and API docs.',
    solution:
      'Drop in JSON, click paths in a tree, and copy a smaller fixture that preserves the selected shape.',
    difficulty: 'Beginner',
    hours: 4,
    monetization:
      'Sell a browser extension that clips responses straight from the network inspector.',
    dependencies: 'None',
    budget: [0, 0],
    stack: ['TypeScript', 'React']
  },
  {
    id: 'schema-drift',
    name: 'Schema drift',
    category: 'Developer tools',
    problem: 'Teams discover breaking schema changes after a mobile client has already shipped.',
    audience: 'Small teams that publish OpenAPI specs.',
    solution:
      'Compare two OpenAPI files and post a pull request summary for removed paths, renamed fields, and stricter types.',
    difficulty: 'Intermediate',
    hours: 16,
    monetization: 'Charge per repository for hosted checks and policy presets.',
    dependencies: 'One integration',
    budget: [0, 20],
    stack: ['Node.js', 'OpenAPI', 'GitHub Actions']
  },
  {
    id: 'fixture-foundry',
    name: 'Fixture foundry',
    category: 'Developer tools',
    problem: 'New contributors waste time creating believable local test records.',
    audience: 'Developers onboarding to existing TypeScript apps.',
    solution:
      'Read a schema and generate seeded fixtures with overrides for edge cases like missing addresses or expired trials.',
    difficulty: 'Intermediate',
    hours: 12,
    monetization: 'Sell domain packs for marketplaces, billing, and booking apps.',
    dependencies: 'None',
    budget: [0, 0],
    stack: ['TypeScript', 'Zod', 'Faker']
  },
  {
    id: 'dependency-notebook',
    name: 'Dependency notebook',
    category: 'Developer tools',
    problem: 'Upgrade decisions disappear into chat and have to be researched again each quarter.',
    audience: 'Maintainers of small JavaScript projects.',
    solution:
      'Import a lockfile, annotate upgrade blockers by package, and export a dependency review as markdown.',
    difficulty: 'Beginner',
    hours: 7,
    monetization: 'Offer a paid shared workspace for teams managing several repositories.',
    dependencies: 'None',
    budget: [0, 0],
    stack: ['React', 'TypeScript', 'IndexedDB']
  },
  {
    id: 'preview-quota',
    name: 'Preview quota',
    category: 'Developer tools',
    problem:
      'Old preview deployments clutter small teams’ accounts and silently consume build minutes.',
    audience: 'Agencies that review multiple pull requests a day.',
    solution:
      'List preview deployments across two providers, flag stale builds, and let maintainers archive each one with a confirmation.',
    difficulty: 'Advanced',
    hours: 36,
    monetization: 'Charge a monthly fee per connected organization.',
    dependencies: 'Multiple integrations',
    budget: [20, 65],
    stack: ['Next.js', 'SQLite', 'Provider APIs']
  },
  {
    id: 'handoff-board',
    name: 'Handoff board',
    category: 'Productivity',
    problem: 'Work gets reopened because the next owner cannot find the decision or current draft.',
    audience: 'Two person product and design teams.',
    solution:
      'Turn notes and links into a handoff card with a named owner, acceptance checklist, and shareable export.',
    difficulty: 'Beginner',
    hours: 7,
    monetization: 'Sell workspace templates for design reviews and production handoffs.',
    dependencies: 'None',
    budget: [0, 0],
    stack: ['React', 'IndexedDB']
  },
  {
    id: 'calendar-buffer',
    name: 'Calendar buffer',
    category: 'Productivity',
    problem: 'Back to back meetings leave no time for the work agreed in them.',
    audience: 'Freelancers and consultants with stacked calendars.',
    solution:
      'Import a calendar file and highlight meeting runs that need a prep block or notes break.',
    difficulty: 'Intermediate',
    hours: 12,
    monetization: 'Sell a desktop version with automatic calendar refresh.',
    dependencies: 'None',
    budget: [0, 0],
    stack: ['TypeScript', 'ical.js', 'Tauri']
  },
  {
    id: 'renewal-radar',
    name: 'Renewal radar',
    category: 'Productivity',
    problem: 'Annual subscriptions renew before freelancers remember to review them.',
    audience: 'Independent workers with many software subscriptions.',
    solution:
      'Record renewal dates and owners, show upcoming charges, and export reminder events to a calendar.',
    difficulty: 'Beginner',
    hours: 6,
    monetization: 'Sell receipt import and accountant ready exports.',
    dependencies: 'None',
    budget: [0, 15],
    stack: ['React', 'IndexedDB', 'Calendar feeds']
  },
  {
    id: 'inbox-to-agenda',
    name: 'Inbox to agenda',
    category: 'Productivity',
    problem: 'Recurring check ins start with five minutes of searching for open email threads.',
    audience: 'Account managers at small service companies.',
    solution:
      'Let users label threads inside their inbox and turn the latest flagged messages into a client agenda draft.',
    difficulty: 'Advanced',
    hours: 32,
    monetization: 'Charge per mailbox for shared agenda templates and history.',
    dependencies: 'One integration',
    budget: [15, 45],
    stack: ['Next.js', 'Gmail API', 'SQLite']
  },
  {
    id: 'focus-ledger',
    name: 'Focus ledger',
    category: 'Productivity',
    problem: 'A timer reports hours without showing what interrupted a work session.',
    audience: 'Remote workers tracking deep work.',
    solution:
      'Start a timed session, log interruptions with one key, and review the patterns on a weekly timeline.',
    difficulty: 'Beginner',
    hours: 4,
    monetization: 'Sell searchable exports and a desktop menu bar companion.',
    dependencies: 'None',
    budget: [0, 0],
    stack: ['TypeScript', 'React', 'IndexedDB']
  },
  {
    id: 'decision-docket',
    name: 'Decision docket',
    category: 'Productivity',
    problem: 'Nobody can tell whether an old decision needs revisiting or was already settled.',
    audience: 'Small teams keeping their decision records in shared folders.',
    solution:
      'Create decision records with a review date, reasons, and a one click export to a markdown folder.',
    difficulty: 'Intermediate',
    hours: 10,
    monetization: 'Offer bulk import and searchable team history as a paid upgrade.',
    dependencies: 'None',
    budget: [0, 25],
    stack: ['Next.js', 'SQLite', 'Markdown']
  },
  {
    id: 'caption-cue',
    name: 'Caption cue',
    category: 'Creator tools',
    problem: 'Readable subtitles take longer to clean than the short clip they accompany.',
    audience: 'Independent video editors and educators.',
    solution:
      'Import an SRT, flag lines that read too fast, and split or retime captions before exporting.',
    difficulty: 'Intermediate',
    hours: 14,
    monetization: 'Sell reusable caption rules for different clients and platforms.',
    dependencies: 'None',
    budget: [0, 15],
    stack: ['TypeScript', 'React', 'WebVTT']
  },
  {
    id: 'shot-list',
    name: 'Shot list',
    category: 'Creator tools',
    problem: 'Product photos come back missing the angle the listing needs most.',
    audience: 'Etsy sellers who shoot their own product photos.',
    solution:
      'Create shot checklists by product type and print a contact sheet to track what has already been captured.',
    difficulty: 'Beginner',
    hours: 5,
    monetization: 'Sell shot packs for jewelry, clothing, and ceramics.',
    dependencies: 'None',
    budget: [0, 0],
    stack: ['React', 'Canvas API']
  },
  {
    id: 'episode-kit',
    name: 'Episode kit',
    category: 'Creator tools',
    problem: 'Publishing a podcast means rewriting the same credits and links in several formats.',
    audience: 'Independent podcast producers.',
    solution:
      'Enter episode metadata once and export show notes, a transcript header, and a sponsor mention checklist.',
    difficulty: 'Beginner',
    hours: 8,
    monetization: 'Sell custom output templates and reusable show profiles.',
    dependencies: 'None',
    budget: [0, 0],
    stack: ['TypeScript', 'React', 'Markdown']
  },
  {
    id: 'rights-rolodex',
    name: 'Rights roll call',
    category: 'Creator tools',
    problem: 'A clip made six months ago may contain licensed media that has since expired.',
    audience: 'Freelance editors and small production studios.',
    solution:
      'Track asset licenses and allowed platforms, then generate a clearance sheet for a selected project.',
    difficulty: 'Intermediate',
    hours: 18,
    monetization: 'Charge for studio seats and searchable license history.',
    dependencies: 'None',
    budget: [10, 30],
    stack: ['Next.js', 'SQLite', 'PDF generation']
  },
  {
    id: 'sponsor-pacer',
    name: 'Sponsor pacer',
    category: 'Creator tools',
    problem: 'Newsletters oversell sponsor slots that are already promised in email.',
    audience: 'Newsletter publishers with repeat sponsors.',
    solution:
      'Map bookings onto an issue calendar, mark creative as approved, and produce a clean inventory page.',
    difficulty: 'Intermediate',
    hours: 20,
    monetization: 'Charge monthly for a custom booking URL and scheduled reminders.',
    dependencies: 'None',
    budget: [10, 35],
    stack: ['Next.js', 'SQLite']
  },
  {
    id: 'clip-proxy',
    name: 'Clip proxy',
    category: 'Creator tools',
    problem: 'Collaborators wait for huge video files when they only need low resolution previews.',
    audience: 'Video teams working across slow connections.',
    solution:
      'Convert short clips in a desktop queue into review copies, keeping filenames and timecodes consistent.',
    difficulty: 'Advanced',
    hours: 38,
    monetization: 'Sell batch presets and a studio license for the desktop app.',
    dependencies: 'One integration',
    budget: [25, 80],
    stack: ['Tauri', 'FFmpeg', 'Rust']
  },
  {
    id: 'quote-worksheet',
    name: 'Quote worksheet',
    category: 'Local business',
    problem:
      'Small service jobs are quoted inconsistently when rates and extras live in separate messages.',
    audience: 'Independent cleaners and garden services.',
    solution:
      'Build a one page estimator with minimum charges and line items, then print or save the quote as a PDF.',
    difficulty: 'Beginner',
    hours: 7,
    monetization: 'Sell branded templates with pricing presets for specific trades.',
    dependencies: 'None',
    budget: [0, 0],
    stack: ['React', 'TypeScript', 'Print CSS']
  },
  {
    id: 'opening-check',
    name: 'Opening check',
    category: 'Local business',
    problem:
      'Shift leads discover inventory or safety checks were skipped only after customers arrive.',
    audience: 'Owners of single location cafés and bakeries.',
    solution:
      'Give staff a daily opening checklist and a place to record exceptions for the next shift.',
    difficulty: 'Intermediate',
    hours: 16,
    monetization: 'Charge per location for schedule templates and printable audit reports.',
    dependencies: 'None',
    budget: [10, 35],
    stack: ['Next.js', 'SQLite']
  },
  {
    id: 'repair-ticket',
    name: 'Repair ticket',
    category: 'Local business',
    problem: 'Repair shops spend time answering status calls for jobs already waiting on parts.',
    audience: 'Independent bike repair shops.',
    solution:
      'Generate a private status link per repair and let the shop update milestones with one click.',
    difficulty: 'Intermediate',
    hours: 22,
    monetization: 'Charge a monthly fee for shop branding and receipt printing.',
    dependencies: 'None',
    budget: [15, 50],
    stack: ['Next.js', 'SQLite', 'QR codes']
  },
  {
    id: 'market-stock',
    name: 'Market stock',
    category: 'Local business',
    problem: 'Market vendors forget which products sold out early and overpack for the next stall.',
    audience: 'Weekend food and craft vendors.',
    solution:
      'Log sales by stall and product on a phone, then compare sell through across the last few markets.',
    difficulty: 'Beginner',
    hours: 8,
    monetization: 'Sell CSV export and printable stock sheets as an upgrade.',
    dependencies: 'None',
    budget: [0, 0],
    stack: ['React', 'IndexedDB']
  },
  {
    id: 'appointment-backfill',
    name: 'Appointment backfill',
    category: 'Local business',
    problem:
      'Same day cancellations leave gaps that staff cannot fill by texting everyone manually.',
    audience: 'Barbers and small appointment based studios.',
    solution:
      'Keep an opt in standby list sorted by availability, then send claim links for a newly opened slot.',
    difficulty: 'Advanced',
    hours: 44,
    monetization: 'Charge per location plus a fixed number of messages.',
    dependencies: 'One integration',
    budget: [25, 90],
    stack: ['Next.js', 'SQLite', 'SMS API']
  },
  {
    id: 'price-card-press',
    name: 'Price card press',
    category: 'Local business',
    problem: 'Store owners remake shelf labels every time a product or price changes.',
    audience: 'Shopkeepers with a short and rotating inventory.',
    solution:
      'Upload a simple spreadsheet and generate printable sheets of consistent shelf labels.',
    difficulty: 'Beginner',
    hours: 4,
    monetization: 'Sell shop branding and additional label sizes.',
    dependencies: 'None',
    budget: [0, 0],
    stack: ['TypeScript', 'React', 'Print CSS']
  },
  {
    id: 'lab-log',
    name: 'Lab log',
    category: 'Learning',
    problem: 'Students lose the assumptions and failed steps that make experiments repeatable.',
    audience: 'Undergraduates learning to document experiments.',
    solution:
      'Give each experiment a timeline of observations, parameters, and uploaded photos, then export a printable log.',
    difficulty: 'Intermediate',
    hours: 14,
    monetization: 'Sell instructor templates and group review exports.',
    dependencies: 'None',
    budget: [0, 20],
    stack: ['React', 'IndexedDB', 'Print CSS']
  },
  {
    id: 'recall-prompt',
    name: 'Recall prompt',
    category: 'Learning',
    problem: 'Students reread familiar notes and mistake recognition for recall.',
    audience: 'Self directed learners studying for technical interviews.',
    solution:
      'Turn imported prompts into a spaced review queue and ask learners to type an answer before revealing the original.',
    difficulty: 'Intermediate',
    hours: 16,
    monetization: 'Sell curated decks and a desktop sync add on.',
    dependencies: 'None',
    budget: [0, 0],
    stack: ['TypeScript', 'React', 'IndexedDB']
  },
  {
    id: 'practice-replay',
    name: 'Practice replay',
    category: 'Learning',
    problem: 'Musicians forget which bars were still shaky by the next practice session.',
    audience: 'Adults learning an instrument on their own.',
    solution:
      'Record short clips by section, mark tempo and confidence, and compare this week’s take with the previous one.',
    difficulty: 'Intermediate',
    hours: 18,
    monetization: 'Sell guided practice journals and a private backup option.',
    dependencies: 'None',
    budget: [0, 25],
    stack: ['React', 'MediaRecorder', 'IndexedDB']
  },
  {
    id: 'reading-margin',
    name: 'Reading margin',
    category: 'Learning',
    problem: 'Book club members struggle to find the passages that prompted their comments.',
    audience: 'Facilitators running small reading groups.',
    solution:
      'Capture quotes with page references and export a one page set of discussion questions.',
    difficulty: 'Beginner',
    hours: 5,
    monetization: 'Sell discussion templates for teachers and reading groups.',
    dependencies: 'None',
    budget: [0, 0],
    stack: ['React', 'IndexedDB', 'Markdown']
  },
  {
    id: 'rubric-companion',
    name: 'Rubric companion',
    category: 'Learning',
    problem: 'Frequent feedback on the same rubric takes longer to type than to assess.',
    audience: 'Instructors grading small online cohorts.',
    solution:
      'Build a reusable comment bank, attach comments to rubric criteria, and copy the complete assessment.',
    difficulty: 'Beginner',
    hours: 8,
    monetization: 'Sell rubric packs and a department license.',
    dependencies: 'None',
    budget: [0, 15],
    stack: ['TypeScript', 'React', 'IndexedDB']
  },
  {
    id: 'word-trail',
    name: 'Word trail',
    category: 'Learning',
    problem:
      'Vocabulary apps teach common words while learners forget the words from their own reading.',
    audience: 'Intermediate language learners.',
    solution:
      'Clip a word and its source sentence from a web page, then turn the clips into local review cards.',
    difficulty: 'Advanced',
    hours: 34,
    monetization: 'Sell a browser extension with bilingual export and deck rules.',
    dependencies: 'None',
    budget: [5, 35],
    stack: ['WebExtensions', 'TypeScript', 'IndexedDB']
  },
  {
    id: 'pantry-first',
    name: 'Pantry first',
    category: 'Personal life',
    problem: 'People plan meals around new groceries while open ingredients go to waste.',
    audience: 'Households that cook several nights a week.',
    solution:
      'Tag pantry items with best by dates and sort a personal recipe list by what needs using soon.',
    difficulty: 'Beginner',
    hours: 8,
    monetization: 'Sell downloadable meal plans and a shared household edition.',
    dependencies: 'None',
    budget: [0, 0],
    stack: ['React', 'IndexedDB']
  },
  {
    id: 'trip-envelope',
    name: 'Trip envelope',
    category: 'Personal life',
    problem: 'Travel budgets show total spending without revealing how much is left per day.',
    audience: 'Friends planning low cost trips together.',
    solution:
      'Allocate spending envelopes by category and day, log purchases in trip currency, and export a settlement summary.',
    difficulty: 'Intermediate',
    hours: 14,
    monetization: 'Sell offline currency presets and group PDF summaries.',
    dependencies: 'None',
    budget: [0, 20],
    stack: ['TypeScript', 'React', 'IndexedDB']
  },
  {
    id: 'care-calendar',
    name: 'Care calendar',
    category: 'Personal life',
    problem: 'Relatives alternate errands and visits without a reliable view of who volunteered.',
    audience: 'Families sharing recurring care tasks.',
    solution:
      'Publish a private weekly rota with named owners and let invited relatives claim uncovered tasks.',
    difficulty: 'Advanced',
    hours: 32,
    monetization: 'Sell a household plan with printed summaries and calendar updates.',
    dependencies: 'One integration',
    budget: [15, 45],
    stack: ['Next.js', 'SQLite', 'Email API']
  },
  {
    id: 'bike-notes',
    name: 'Bike notes',
    category: 'Personal life',
    problem: 'Last service dates and part sizes disappear between trips to the repair shop.',
    audience: 'Cyclists who maintain one or two bikes at home.',
    solution:
      'Record components, mileage, and service intervals, then export a printable card for each bicycle.',
    difficulty: 'Beginner',
    hours: 6,
    monetization: 'Sell schedule packs for common drivetrain and brake setups.',
    dependencies: 'None',
    budget: [0, 0],
    stack: ['TypeScript', 'React', 'IndexedDB']
  },
  {
    id: 'move-box',
    name: 'Move box',
    category: 'Personal life',
    problem: 'Unpacking takes longer when nobody remembers which box holds the everyday items.',
    audience: 'Renters coordinating a household move.',
    solution:
      'Create numbered box labels with printable QR codes and keep a searchable local list of contents by room.',
    difficulty: 'Beginner',
    hours: 7,
    monetization: 'Sell editable label sheets and multi household inventory exports.',
    dependencies: 'None',
    budget: [0, 15],
    stack: ['React', 'QR codes', 'IndexedDB']
  },
  {
    id: 'recurring-receipts',
    name: 'Recurring receipts',
    category: 'Personal life',
    problem: 'Bank exports bury repetitive spending under inconsistent merchant descriptions.',
    audience: 'Households doing their own monthly budget review.',
    solution:
      'Normalize merchants from a CSV, suggest recurring charges, and let users approve or dismiss each grouping.',
    difficulty: 'Intermediate',
    hours: 20,
    monetization: 'Sell customizable importer profiles and desktop export tools.',
    dependencies: 'None',
    budget: [0, 0],
    stack: ['TypeScript', 'React', 'CSV parsing']
  },
  {
    id: 'volunteer-coverage',
    name: 'Volunteer coverage',
    category: 'Community',
    problem: 'Organizers learn which shifts are thin only after making several calls.',
    audience: 'Volunteer leaders at neighborhood festivals.',
    solution:
      'Share a claimable shift grid, show coverage by role, and export a day sheet for check in.',
    difficulty: 'Intermediate',
    hours: 22,
    monetization: 'Offer an event pass with role templates and calendar exports.',
    dependencies: 'None',
    budget: [15, 40],
    stack: ['Next.js', 'SQLite']
  },
  {
    id: 'seed-swap',
    name: 'Seed swap',
    category: 'Community',
    problem: 'Seed swaps are full of duplicates while requested varieties go unfilled.',
    audience: 'Local gardeners organizing seasonal meetups.',
    solution:
      'List what participants can bring and what they want, then suggest matches organizers can review.',
    difficulty: 'Intermediate',
    hours: 16,
    monetization: 'Sell print packs with tray labels and event inventories.',
    dependencies: 'None',
    budget: [0, 25],
    stack: ['Next.js', 'SQLite']
  },
  {
    id: 'neighborhood-kit',
    name: 'Neighborhood kit',
    category: 'Community',
    problem: 'Loaned tools disappear when return dates are arranged in chat threads.',
    audience: 'Neighbors running an informal tool library.',
    solution:
      'Catalog tools, record who borrowed each one, and export a list of overdue returns for the coordinator.',
    difficulty: 'Beginner',
    hours: 8,
    monetization: 'Sell printable labels and a hosted version for larger groups.',
    dependencies: 'None',
    budget: [0, 15],
    stack: ['React', 'IndexedDB', 'Print CSS']
  },
  {
    id: 'open-hours',
    name: 'Open hours',
    category: 'Community',
    problem: 'Members arrive at a shared workshop when nobody qualified is available to open it.',
    audience: 'Volunteer stewards at small makerspaces.',
    solution:
      'Publish weekly open hours and let trained stewards claim a window before the schedule is shared.',
    difficulty: 'Intermediate',
    hours: 20,
    monetization: 'Offer calendar feeds and backup steward reminders on a paid plan.',
    dependencies: 'None',
    budget: [10, 30],
    stack: ['Next.js', 'SQLite', 'Calendar feeds']
  },
  {
    id: 'mutual-aid-batch',
    name: 'Pickup batch',
    category: 'Community',
    problem: 'Volunteer drivers receive overlapping grocery pickups across scattered messages.',
    audience: 'Food pantry coordinators serving a few neighborhoods.',
    solution:
      'Group confirmed pickups by neighborhood and time window, then share stop lists with assigned drivers.',
    difficulty: 'Advanced',
    hours: 42,
    monetization: 'Offer a managed subscription to organizations coordinating several routes.',
    dependencies: 'Multiple integrations',
    budget: [35, 100],
    stack: ['Next.js', 'SQLite', 'Maps API', 'SMS API']
  },
  {
    id: 'club-minutes',
    name: 'Club minutes',
    category: 'Community',
    problem: 'Committee action items get buried in documents that change hands each year.',
    audience: 'Local club secretaries and committee leads.',
    solution:
      'Convert a meeting note into dated action items, track ownership, and export agreed minutes.',
    difficulty: 'Beginner',
    hours: 6,
    monetization: 'Sell templates for committees, sports clubs, and resident associations.',
    dependencies: 'None',
    budget: [0, 0],
    stack: ['React', 'Markdown', 'IndexedDB']
  }
];

export const ideaById = new Map(ideas.map((idea) => [idea.id, idea]));
export const starterIdea = ideas[0];
