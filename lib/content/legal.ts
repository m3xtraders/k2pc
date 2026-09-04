export interface LegalPageData {
  slug: string;
  title: string;
  subtitle: string;
  content: string;
  metaTitle: string;
  metaDescription: string;
  lastUpdated?: string;
}

export const DEFAULT_PRIVACY_POLICY: LegalPageData = {
  slug: "privacy",
  title: "Privacy Policy",
  subtitle: "At K2 Pest Control, we take your privacy and data security seriously. This policy explains how we collect, handle, and safeguard your personal information in compliance with PIPEDA and Saskatchewan regulations.",
  metaTitle: "Privacy Policy | K2 Pest Control Saskatoon & Area",
  metaDescription: "Review K2 Pest Control's Privacy Policy. Learn how we collect, use, and protect your personal information in compliance with PIPEDA and Saskatchewan regulations.",
  lastUpdated: "February 24, 2025",
  content: `<h2>1. Introduction &amp; Scope</h2>
<p>This Privacy Policy applies to personal information collected by <strong>K2 Pest Control</strong> (&ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;us&rdquo;) when you visit our website (<strong>k2pc.ca</strong>), request an inspection estimate, contact our dispatch team, or utilize our residential and commercial pest management services across Saskatoon and surrounding Saskatchewan communities.</p>

<h2>2. Information We Collect</h2>
<p>To provide professional pest inspection, extermination, and pest exclusion services, we collect relevant information that you provide voluntarily or through automated website interactions:</p>
<ul>
  <li><strong>Contact Details:</strong> Full name, telephone number, email address, and physical service address (including unit or suite numbers).</li>
  <li><strong>Property &amp; Pest Profile:</strong> Type of dwelling or commercial facility, square footage, observed pest activity (e.g., bed bugs, rodents, cockroaches, carpenter ants), previous treatment history, and presence of children or pets.</li>
  <li><strong>Billing &amp; Payment Data:</strong> Payment method details, billing addresses, and transaction histories. Credit card payments are securely tokenized through PCI-DSS compliant payment gateways; we do not store raw card numbers.</li>
  <li><strong>Technical &amp; Usage Data:</strong> IP address, browser type, device information, operating system, and pages visited on our website to optimize service responsiveness and user experience.</li>
</ul>

<h2>3. How We Use Your Information</h2>
<p>We use your personal data strictly for legitimate operational purposes, including:</p>
<ul>
  <li>Preparing and delivering free inspection estimates and service quotes.</li>
  <li>Scheduling and routing Saskatchewan-licensed pest control technicians to your location.</li>
  <li>Providing pre-treatment preparation checklists, post-treatment safety instructions, and re-entry guidelines.</li>
  <li>Maintaining warranty records for our 6-month re-treatment guarantee.</li>
  <li>Meeting statutory reporting and safety record-keeping mandated by the Saskatchewan Ministry of Environment.</li>
  <li>Responding to customer inquiries, complaints, or emergency dispatch requests.</li>
</ul>

<h2>4. Sharing &amp; Disclosure</h2>
<p>We strictly respect your privacy. <strong>We do not sell, rent, or lease your personal information to third parties.</strong> We disclose personal data only under specific circumstances:</p>
<ul>
  <li><strong>Service Providers:</strong> Trusted third-party technology providers (such as hosting partners, SMS notification services, and email dispatch tools) bound by confidentiality agreements.</li>
  <li><strong>Regulatory Authorities:</strong> Where required by law, court subpoena, or to comply with official environmental reporting guidelines.</li>
  <li><strong>Safety &amp; Emergency:</strong> When necessary to prevent imminent harm to individuals, pets, or property.</li>
</ul>

<h2>5. Data Security &amp; Retention</h2>
<p>We implement robust technical and organizational security measures to protect your personal data against unauthorized access, disclosure, alteration, or destruction. All web traffic is encrypted via HTTPS (SSL/TLS).</p>
<p>We retain personal information only for as long as necessary to fulfill the purposes for which it was collected, enforce warranty coverage, or comply with applicable legal, accounting, and Saskatchewan environmental regulations.</p>

<h2>6. Cookies &amp; Analytics</h2>
<p>Our website uses standard cookies and browser storage to optimize site functionality, preserve session preferences, and gather aggregate traffic analytics. You can adjust your browser settings to decline cookies, although some website features may not operate as intended.</p>

<h2>7. Your Rights Under PIPEDA</h2>
<p>Under Canadian privacy laws, you possess specific rights regarding your personal information, including:</p>
<ul>
  <li>Requesting access to the personal data we hold about you.</li>
  <li>Requesting correction or update of inaccurate or outdated details.</li>
  <li>Withdrawing consent for non-essential communications at any time.</li>
  <li>Requesting deletion of your data, subject to regulatory record-keeping obligations.</li>
</ul>

<h2>8. Contact Our Privacy Officer</h2>
<p>If you have questions, concerns, or requests regarding this Privacy Policy or our data management practices, please reach out to our team:</p>
<p><strong>K2 Pest Control &ndash; Privacy Inquiries</strong><br/>Email: info@k2pc.ca<br/>Phone: (306) 880-8686<br/>Address: Saskatoon, Saskatchewan, Canada</p>`,
};

export const DEFAULT_TERMS_OF_SERVICE: LegalPageData = {
  slug: "terms",
  title: "Terms of Service & Warranty Policy",
  subtitle: "These terms govern all pest inspection, extermination, wildlife management, and integrated pest management services provided by K2 Pest Control.",
  metaTitle: "Terms of Service & Warranty Policy | K2 Pest Control Saskatoon",
  metaDescription: "Read the Terms of Service for K2 Pest Control. Understand our service agreements, 6-month warranty, customer prep requirements, and payment policies.",
  lastUpdated: "February 24, 2025",
  content: `<h2>1. Acceptance of Terms</h2>
<p>By booking an inspection, confirming a service quote, scheduling an extermination appointment, or utilizing our website, you (&ldquo;Client&rdquo;, &ldquo;Customer&rdquo;, &ldquo;you&rdquo;) agree to be legally bound by these Terms of Service. If you are entering into this agreement on behalf of a business, corporation, or property management entity, you represent that you have the authority to bind that entity.</p>

<h2>2. Estimates, Inspections &amp; Pricing</h2>
<ul>
  <li><strong>Initial Estimates:</strong> Phone or online estimates are based on customer-provided descriptions of the infestation and property layout. Final pricing may be adjusted if on-site conditions or pest severity significantly differ from the initial description.</li>
  <li><strong>Diagnostic Inspections:</strong> On-site diagnostic inspections may carry an agreed-upon inspection fee, which is credited toward the service cost if the customer proceeds with the recommended treatment plan.</li>
  <li><strong>Written Quotes:</strong> All final service recommendations and pricing will be provided in writing before chemical or physical treatments commence.</li>
</ul>

<h2>3. 6-Month Re-Treatment Guarantee &amp; Warranty Policy</h2>
<p>K2 Pest Control provides a <strong>6-month warranty</strong> for qualifying residential treatments (including bed bugs, cockroaches, carpenter ants, and mice/rats), subject to the following criteria:</p>
<ul>
  <li><strong>Full Scope Completion:</strong> The warranty requires completion of all recommended initial and follow-up treatment rounds as specified in your service agreement.</li>
  <li><strong>Preparation Adherence:</strong> The client must execute all required pre-treatment preparation checklists provided prior to technician arrival.</li>
  <li><strong>Conducive Conditions:</strong> The client must address structural and sanitation recommendations identified by the technician (e.g., sealing exterior holes, fixing plumbing leaks, storing food in airtight containers).</li>
  <li><strong>Multi-Unit Properties:</strong> In attached townhomes or multi-unit buildings, warranty coverage is contingent upon adjoining units not harboring untreated active infestations.</li>
</ul>

<h2>4. Customer Responsibilities &amp; Treatment Preparation</h2>
<p>Safe and effective pest eradication requires active cooperation from property occupants:</p>
<ul>
  <li><strong>Preparation Checklists:</strong> Clients must complete all specific preparation steps provided before technician dispatch (e.g., laundering bedding at high heat, removing clutter from baseboards, vacating premises during residual chemical applications).</li>
  <li><strong>Re-Entry Timelines:</strong> For chemical treatments requiring premises evacuation, occupants (including children and domestic pets) must remain off-site for the full re-entry interval specified by the licensed technician (typically 4 hours).</li>
  <li><strong>Access &amp; Pets:</strong> Safe, unimpeded access to all inspection areas (attics, basements, utility rooms) must be provided. All domestic pets and aquariums must be safely secured or covered.</li>
</ul>

<h2>5. Payment Terms, Cancellations &amp; Rescheduling</h2>
<ul>
  <li><strong>Payment Schedule:</strong> Residential services are payable upon completion of service via credit card, Interac e-Transfer, debit, or approved digital methods. Commercial accounts are invoiced under Net 15 or Net 30 terms upon approved credit.</li>
  <li><strong>Cancellation Notice:</strong> We request at least 24 hours advance notice for appointment rescheduling or cancellation.</li>
</ul>

<h2>6. Safety, Environmental Compliance &amp; Materials</h2>
<p>All treatments utilize pesticides and integrated pest management products approved by <strong>Health Canada&apos;s Pest Management Regulatory Agency (PMRA)</strong> and are applied in strict compliance with the <strong>Saskatchewan Ministry of Environment</strong> regulations. Safety Data Sheets (SDS) are available upon request for every compound used.</p>

<h2>7. Limitation of Liability</h2>
<p>While our technicians apply utmost professional diligence, K2 Pest Control shall not be held liable for incidental damage resulting from concealed structural defects, pre-existing insect wood rot, or tenant non-compliance with post-treatment ventilation guidelines. Total aggregate liability under any claim shall not exceed the amount paid by the customer for the specific service.</p>

<h2>8. Governing Law &amp; Contact</h2>
<p>These terms shall be governed by and construed in accordance with the laws of the Province of Saskatchewan and Canada. For questions regarding service agreements or warranties:</p>
<p><strong>K2 Pest Control Dispatch &amp; Support</strong><br/>Phone: (306) 880-8686<br/>Email: info@k2pc.ca<br/>Address: Saskatoon, SK, Canada</p>`,
};
