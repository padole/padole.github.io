/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  ALL SITE CONTENT LIVES IN THIS FILE.
 *  Edit the values below; the components pick them up automatically.
 *
 *  Anything wrapped in [square brackets] is a placeholder that still needs
 *  your real details. Search this file for "[" to find every one.
 *  Nothing here claims a qualification, employer or result you have not
 *  supplied — please keep it that way.
 * ─────────────────────────────────────────────────────────────────────────────
 */

export const profile = {
  name: 'Peter Adole',
  role: 'IT Infrastructure Professional and Software Developer',
  shortRole: 'IT Professional & Software Developer',
  location: '[City, Country]',
  availability: 'Open to full-time roles and consulting work',
  email: 'inas4wealth@gmail.com',
  // Portrait in /public as profile.jpg (4:5, e.g. 800×1000; face in the upper third).
  // If it is missing, an initials monogram is shown automatically.
  photo: '/profile.jpg',
  social: {
    linkedin: 'https://www.linkedin.com/in/[your-linkedin-handle]',
    github: 'https://github.com/[your-github-username]',
  },
}

export const hero = {
  headline: 'I keep business IT secure and running, and build the software that makes it better.',
  // Part of the headline drawn in the gradient accent (must appear in `headline` exactly)
  highlight: 'secure and running',
  // Card beside the portrait, linking to the Projects section
  latest: { title: 'LADOL Meal Ticketing', detail: 'React · Flask · MySQL' },
  // Text running around the spinning badge
  badge: 'Infrastructure · Security · Software · ',
  // Scrolling strip under the hero
  stack: ['Windows Server', 'Active Directory', 'Microsoft 365', 'Sophos Firewall', 'UniFi', 'Python', 'Flask', 'MySQL', 'React', 'JavaScript', 'Group Policy', 'VPN'],
  intro:
    'IT professional working across infrastructure, systems and network administration, cybersecurity and Microsoft 365, with a growing focus on building web applications in Python, Flask and JavaScript.',
}

export const about = {
  paragraphs: [
    'I work at the point where infrastructure meets the people who rely on it. My day-to-day spans Windows Server and Active Directory, Microsoft 365 administration, network and firewall management with Sophos and UniFi, and keeping users productive and secure.',
    'Alongside operations, I build software. Many IT problems are process problems — access requests in email threads, support tickets in spreadsheets — so I write web applications in Python, Flask, MySQL and JavaScript that turn those processes into clear, trackable workflows.',
    'Most recently I have been building internal systems for LADOL, the Lagos Deep Offshore Logistics Base — site access, material movement approvals, attendance registers and staff dining — replacing paper forms and email chains with auditable digital workflows, alongside websites and online ordering platforms for other businesses.',
  ],
  goals:
    'I am growing toward roles that combine infrastructure and security ownership with software development: designing reliable systems, automating the routine, and building internal tools that teams actually use.',
  focus: [
    { title: 'Infrastructure', text: 'Windows Server, Active Directory, identity and endpoint management.' },
    { title: 'Networks & security', text: 'Firewall policy, segmentation, Wi‑Fi and secure remote access.' },
    { title: 'Microsoft 365', text: 'Tenant administration, Exchange Online, Teams, SharePoint and licensing.' },
    { title: 'Software', text: 'Internal web apps and automation with Python, Flask, MySQL and JavaScript.' },
  ],
}

/**
 * Skills are grouped as layers of the stack, from the network up to the
 * applications. `items` are shown as chips; keep names short.
 */
export const skillLayers = [
  {
    id: 'apps',
    title: 'Software development',
    summary: 'Web applications and internal tools',
    icon: 'code',
    items: ['Python', 'Flask', 'React', 'TypeScript', 'JavaScript', 'MySQL', 'HTML & CSS', 'AI', 'Web development'],
  },
  {
    id: 'cloud',
    title: 'Cloud & productivity',
    summary: 'Collaboration, identity and email in the cloud',
    icon: 'cloud',
    items: ['Microsoft 365', 'Exchange Online', 'Teams', 'SharePoint', 'OneDrive'],
  },
  {
    id: 'systems',
    title: 'Systems administration',
    summary: 'Servers, directory services and user management',
    icon: 'server',
    items: ['Windows Server', 'Active Directory', 'Group Policy', 'DNS & DHCP', 'User & access management'],
  },
  {
    id: 'network',
    title: 'Networking & security',
    summary: 'The network edge, switching and wireless',
    icon: 'shield',
    items: ['Networking (TCP/IP)', 'Sophos Firewall', 'UniFi', 'VLANs', 'VPN', 'Cybersecurity practices'],
  },
]

/**
 * Projects.
 *  - `art` picks the built-in illustration. Replace it with a real screenshot
 *    by adding `image: '/projects/your-file.png'` (put the file in /public/projects).
 *  - Leave `github` or `demo` as an empty string '' to hide that button.
 */
export const projects = [
  {
    title: 'Access Request Portal',
    category: 'Web application',
    description:
      'A site-access system for the LADOL Free Zone. Staff sign in with their Microsoft 365 account or a portal login, then draft and submit a request for each visitor with visit dates, purpose and supporting documents. Access Controllers approve, reject, terminate or reopen requests and manage users and roles, while gate staff get a read-only view with an entry check at the gate. Every request and decision is emailed to the people involved, giving the zone one auditable record of who is cleared to enter and when.',
    stack: ['React', 'TypeScript', 'Python', 'Flask', 'MySQL', 'Microsoft 365'],
    art: 'access',
    image: '/projects/access-request-portal.jpg',
    github: 'https://github.com/padole/ladolaccessrequestportal',
    demo: 'https://adolepeter411.pythonanywhere.com/',
    featured: true,
  },
  {
    title: 'Tixera',
    category: 'Web application',
    description:
      'An event ticketing platform: visitors browse events, pick seats on a live seat map that holds their choice while they pay, apply promo codes, and receive a QR e-ticket. Organisers manage their events and export attendee lists, door staff check tickets in by scanning the QR code, and admins get a dashboard with revenue, sales by event, refunds and user roles.',
    stack: ['React', 'TypeScript', 'Tailwind', 'Python', 'Flask', 'MySQL'],
    art: 'web',
    image: '/projects/tixera.jpg',
    github: '',
    demo: '',
    featured: true,
  },
  {
    title: 'LADOL Material Form',
    category: 'Web application',
    description:
      'The digital version of LADOL’s paper Material Form for moving material in and out of the Free Zone. Requesters raise receipts, requisitions, delivery notes and removal notes with item lines and invoices. Each form then passes through Department, Agency, NEPZA, Customs and LADOL Security approval, with email at every step, and once cleared it prints on one A4 page laid out like the original form.',
    stack: ['React', 'TypeScript', 'Python', 'Flask', 'MySQL'],
    art: 'access',
    image: '/projects/ladol-material-form.jpg',
    github: '',
    demo: '',
  },
  {
    title: 'LADOL Attendance Register',
    category: 'Web application',
    description:
      'A digital attendance register for meetings, safety inductions, toolbox talks and training. Attendees sign in under a minute by entering or scanning a session code, with no account needed. Officers open sessions, watch the register fill in, correct entries, then close, print or export it, with phone numbers masked in lists and every change written to an audit log.',
    stack: ['React', 'TypeScript', 'Python', 'Flask', 'MySQL'],
    art: 'helpdesk',
    image: '/projects/ladol-attendance-register.jpg',
    github: 'https://github.com/padole/ladolgenericattendance',
    demo: '',
  },
  {
    title: 'LADOL Meal Ticketing',
    category: 'Web application',
    description:
      'A staff dining system for LADOL: employees sign in with their employee number, top up a meal wallet and view the day’s menu, while catering staff serve meals at the counter within set serving times, bill contractors to their companies and manage client dining requests, with role-based access for HR, Finance and admins.',
    stack: ['React', 'Python', 'Flask', 'MySQL'],
    art: 'helpdesk',
    image: '/projects/ladol-meal-ticketing.jpg',
    github: '',
    demo: '',
  },
  {
    title: 'Corporate Websites',
    category: 'Web development',
    description:
      'Responsive websites built for organisations, focused on clear structure, fast loading and content that is easy for the client to keep up to date.',
    stack: ['HTML & CSS', 'JavaScript'],
    art: 'web',
    image: '/projects/corporate-website-ladol.jpg',
    github: '',
    demo: 'https://www.ladol.com',
  },
  {
    title: 'Sisiana’s Treat',
    category: 'Web application',
    description:
      'An online food ordering system: customers browse the menu by category, build a cart, check out and pay through Paystack, and track their order history, while an admin dashboard manages orders, menu items, categories and customers.',
    stack: ['Python', 'Flask', 'MySQL', 'Bootstrap'],
    art: 'web',
    image: '/projects/sisianas-treat.jpg',
    github: 'https://github.com/padole/sisianatreat',
    demo: 'https://sisiana.pythonanywhere.com/',
  },
]

export const navLinks = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
]
