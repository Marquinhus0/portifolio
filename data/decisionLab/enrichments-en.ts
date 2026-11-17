import type { ScenarioEnrichment } from "./enrichments-pt";
import type { ScenarioCode } from "./types";

export const ENRICHMENTS_EN: Record<ScenarioCode, ScenarioEnrichment> = {
  "DL-01": {
    domainDisclaimer:
      "Didactic Hypotheses (POS & Fiscal): Decisions here regarding tax rules (NCM/CFOP), invoicing, and offline contingency represent educational UX/architecture exercises—any real-world rollout requires specialized tax, accounting, and legal validation.",
    asIsToBe: {
      asIsTitle: "Current Flow (Blocking Synchronous)",
      asIsSubtitle: "Each step stalls awaiting sequential remote calls with raw errors and lost baskets on drops.",
      asIsNodes: [
        {
          id: "pdv-asis-1",
          step: "01",
          label: "Scan & Basket",
          stateTag: "DRAFT",
          detail: "Cashier scans items with zero upfront fiscal pre-check; unmapped SKUs pass silently.",
        },
        {
          id: "pdv-asis-2",
          step: "02",
          label: "Counter Payment",
          stateTag: "LOCKED",
          isFriction: true,
          detail: "Screen freezes awaiting central inventory + tax gateway sequentially while queue builds.",
        },
        {
          id: "pdv-asis-3",
          step: "03",
          label: "Timeout / Raw Code",
          stateTag: "RAW ERROR",
          isFriction: true,
          detail: "Network drop or missing NCM returns cryptic Error 500/XML causing double submits or manual reload.",
        },
        {
          id: "pdv-asis-4",
          step: "04",
          label: "Manual Cleanup",
          stateTag: "REWORK",
          isFriction: true,
          detail: "Supervisor traces missing receipts, voids duplicates, and adjusts stock at shift close.",
        },
      ],
      toBeTitle: "Target Flow (Resilient Asynchronous)",
      toBeSubtitle: "Pre-flight scan checks, idempotent commit lock, and visible contingency queue.",
      toBeNodes: [
        {
          id: "pdv-tobe-1",
          step: "01",
          label: "Pre-Check on Scan",
          stateTag: "PRE-VALIDATED",
          isImproved: true,
          detail: "Cached fiscal eligibility and low-stock flags surface anomalies before customer pays.",
        },
        {
          id: "pdv-tobe-2",
          step: "02",
          label: "Idempotent Commit",
          stateTag: "PROTECTED",
          isImproved: true,
          detail: "F12 records transaction with unique idempotency key, ignoring frantic double-taps.",
        },
        {
          id: "pdv-tobe-3",
          step: "03",
          label: "Contingency / Clear Copy",
          stateTag: "CONTINGENCY",
          isImproved: true,
          detail: "Timeouts preserve basket in safe queue under amber Contingency banner and actionable guidance.",
        },
        {
          id: "pdv-tobe-4",
          step: "04",
          label: "Back-Office Sync",
          stateTag: "AUDITED",
          isImproved: true,
          detail: "Background worker reconciles queue; isolated fiscal rejections route to back-office.",
        },
      ],
      stateTransitions: [
        {
          from: "DRAFT",
          trigger: "Commit F12 + Payment",
          to: "PROCESSING",
          guardNote: "Locks duplicate keypresses with idempotency key",
        },
        {
          from: "PROCESSING",
          trigger: "Gateway Timeout > Limit",
          to: "LOCAL_CONTINGENCY",
          guardNote: "Didactic hypothesis requiring specialized tax validation",
        },
        {
          from: "LOCAL_CONTINGENCY",
          trigger: "Connectivity Restored",
          to: "SYNCED",
          guardNote: "Idempotent background sync + back-office log",
        },
      ],
      keyDifferences: [
        "Shifts tax detection from post-payment surprise to early item scan",
        "Replaces dead freezes and raw XML errors with safe local queue and plain action guidance",
        "Defends frontline queue velocity while preserving back-office auditability",
      ],
    },
    problemJustifications: {
      "pdv-p1":
        "Hits every checkout at peak store traffic; demands clean architecture so speed does not compromise fiscal consistency.",
      "pdv-p2":
        "High risk of abandoned carts or duplicate commits whenever network drops occur mid-transaction.",
      "pdv-p3":
        "Moderate frequency on final SKU units, yet creates awkward customer refunds after payment.",
      "pdv-p4":
        "Upstream catalog setup gap surfacing at the wrong frontline role (cashiers are not tax specialists).",
      "pdv-p5":
        "Occurs across every operational hiccup and yields high support relief at low front-end implementation effort.",
    },
    extraAlternativesByProblem: {
      "pdv-p3": {
        id: "pdv-p3-c",
        label: "C",
        title: "60s frequent balance sync with final check right before payment",
        description:
          "Keeps basket scanning unrestricted, verifying live central balance right before payment commit on SKUs under 5 units.",
        expectedBenefit: "Avoids tying up stock in abandoned baskets.",
        limitation: "May notify out-of-stock right as customer reaches payment.",
        userImpact: "Cleaner mid-scan cadence with residual risk near checkout end.",
        operationalImpact: "Simpler than real-time TTL locks.",
        estimatedComplexity: "Medium",
        dependencies: ["Frequent stock sync", "Pre-payment check"],
        risks: [
          "Customer taps card moments before final check flags zero stock",
        ],
        consequenceAnalysis:
          "Final balance verification skips reservation expiry overhead while carrying late-checkout out-of-stock risk.",
        tradeOffShift: {
          speedVsValidation: 0,
          flexibilityVsControl: 0,
          simplicityVsDensity: 1,
          autonomyVsGovernance: 0,
          easeVsTraceability: 0,
        },
      },
      "pdv-p4": {
        id: "pdv-p4-c",
        label: "C",
        title: "Provisional category tax default routed for mandatory fiscal review",
        description:
          "Apply category fallback fiscal template to unblock sale and queue document for mandatory back-office review.",
        expectedBenefit: "Avoids freezing physical counter while keeping specialized review.",
        limitation: "Risky didactic hypothesis: provisional tax mismatches can violate local tax statutes.",
        userImpact: "Removes immediate counter stall.",
        operationalImpact: "Adds review load to tax team.",
        estimatedComplexity: "Medium",
        dependencies: ["Category fiscal defaults", "Post-sale fiscal review queue"],
        risks: [
          "Tax compliance penalties if provisional defaults conflict with regional statutes (requires tax specialist review)",
        ],
        consequenceAnalysis:
          "Category fallback keeps lanes unblocked only if tax compliance review validates legal permissibility first.",
        tradeOffShift: {
          speedVsValidation: 1,
          flexibilityVsControl: 1,
          simplicityVsDensity: 0,
          autonomyVsGovernance: -1,
          easeVsTraceability: 0,
        },
      },
      "pdv-p5": {
        id: "pdv-p5-c",
        label: "C",
        title: "Interactive step-by-step error recovery assistant",
        description:
          "Launch guided diagnostic drawer offering auto-checks (ping gateway, verify customer doc, switch tender).",
        expectedBenefit: "Empowers store teams to solve frequent failures without calling IT.",
        limitation: "Higher engineering cost to maintain across external error variations.",
        userImpact: "Adds a few extra clicks under queue pressure.",
        operationalImpact: "Lowers helpdesk escalation.",
        estimatedComplexity: "High",
        dependencies: ["Diagnostic decision trees per error family"],
        risks: [
          "Staff skipping multi-step checklists during physical line stress",
        ],
        consequenceAnalysis:
          "Guided recovery drawers boost store self-reliance while requiring more maintenance than concise message mapping.",
        tradeOffShift: {
          speedVsValidation: -1,
          flexibilityVsControl: 0,
          simplicityVsDensity: -1,
          autonomyVsGovernance: 1,
          easeVsTraceability: -1,
        },
      },
    },
    risksByAlternative: {
      "pdv-p1-a": ["Walkaways during peak lane queues", "Frustrated double keystrokes"],
      "pdv-p1-b": ["Orphaned local queue if hardware dies pre-sync", "Needs back-office exception training"],
      "pdv-p1-c": ["Delayed tax rejection exposure (requires accounting validation)", "Negative stock drift"],
      "pdv-p2-a": ["Contingency expiration window exceeded on multi-hour outages"],
      "pdv-p2-b": ["Total store revenue halt during ISP downtime"],
      "pdv-p2-c": ["Cashier force-reloads tab thinking UI froze, losing cart"],
      "pdv-p3-a": ["Abandoned carts briefly holding scarce last units"],
      "pdv-p3-b": ["Inaccurate restock triggers across procurement"],
      "pdv-p4-a": ["Arriving goods un-sellable until catalog mapping finishes"],
      "pdv-p4-b": ["Wrong tax filings submitted under queue stress"],
      "pdv-p5-a": ["Unmapped vendor error codes losing helpful context"],
      "pdv-p5-b": ["Helpdesk flooded by trivial input mistakes"],
    },
    qaLinkedProblems: {
      "pdv-qa-1": ["P-01"],
      "pdv-qa-2": ["P-04", "P-05"],
      "pdv-qa-3": ["P-02", "P-05"],
      "pdv-qa-4": ["P-03"],
      "pdv-qa-5": ["P-03"],
      "pdv-qa-6": ["P-01", "P-02"],
    },
    extraQaScenario: {
      id: "pdv-qa-7",
      category: "loading_and_error",
      title: "Loading & Error States — Controlled payment latency & non-destructive recovery",
      scenarioDescription:
        "Tax gateway takes 2–4 seconds before succeeding or raising a recoverable validation failure.",
      expectedUiState:
        "Submit button locks cleanly with clear processing copy; on failure, cart remains intact with actionable guidance.",
      givenWhenThen:
        "Given latency > 1.5s followed by recoverable error, Then UI exits loading without clearing items and displays fix prompt.",
      recommendedCriticality: "essential",
      linkedProblemCodes: ["P-01", "P-05"],
    },
  },

  "DL-02": {
    asIsToBe: {
      asIsTitle: "Current Flow (Opaque Balance & Unlinked Edits)",
      asIsSubtitle: "Single blurred count, unconstrained manual overrides, and cryptic DB history codes.",
      asIsNodes: [
        {
          id: "inv-asis-1",
          step: "01",
          label: "Single Count View",
          stateTag: "OPAQUE",
          isFriction: true,
          detail: "Shows flat '10 units' hiding that 7 units are reserved by active customer orders.",
        },
        {
          id: "inv-asis-2",
          step: "02",
          label: "Unconstrained Override",
          stateTag: "NO GUARD",
          isFriction: true,
          detail: "Any operator edits stock freely with no reason code or linked document reference.",
        },
        {
          id: "inv-asis-3",
          step: "03",
          label: "Raw Ledger (`MOV_42`)",
          stateTag: "CRYPTIC",
          isFriction: true,
          detail: "History table prints DB enum strings and shared terminal accounts.",
        },
      ],
      toBeTitle: "Target Flow (Segmented States & Auditable Trail)",
      toBeSubtitle: "Physical vs Free clarity, branch-scoped reason codes, and readable actor-tagged ledger.",
      toBeNodes: [
        {
          id: "inv-tobe-1",
          step: "01",
          label: "Segmented Stock States",
          stateTag: "PHYS / FREE",
          isImproved: true,
          detail: "Displays Physical (10), Reserved (7), and Free (3) cleanly so orders and buyers stay aligned.",
        },
        {
          id: "inv-tobe-2",
          step: "02",
          label: "Tier + Categorized Reason",
          stateTag: "AUDITED",
          isImproved: true,
          detail: "Permissions scope by branch; overrides require reason + doc link or manager sign-off.",
        },
        {
          id: "inv-tobe-3",
          step: "03",
          label: "Human Ledger & Origin",
          stateTag: "TRACEABLE",
          isImproved: true,
          detail: "Timeline surfaces plain event names, +/- delta, running total, named actor, and channel.",
        },
      ],
      stateTransitions: [
        {
          from: "AVAILABLE_FREE",
          trigger: "Sales Order Confirmed",
          to: "RESERVED",
          guardNote: "Prevents concurrent transfer over committed units",
        },
        {
          from: "RESERVED",
          trigger: "Shipment / Invoice Posted",
          to: "DEDUCTED_LOG",
          guardNote: "Appends immutable entry linked to document ID",
        },
        {
          from: "EDIT_REQUESTED",
          trigger: "Delta > Branch Threshold",
          to: "PENDING_APPROVAL",
          guardNote: "Manager confirms reason before modifying inventory value",
        },
      ],
      keyDifferences: [
        "Separates warehouse physical presence from free unreserved availability",
        "Replaces cryptic DB enums with human statement timelines tagged by user and channel",
        "Scales governance by discrepancy size instead of blocking trivial daily count fixes",
      ],
    },
    problemJustifications: {
      "inv-p1":
        "Opaque counts cause bad restock orders and failed order promises every day.",
      "inv-p2":
        "Without typed reasons and source doc links, audits stall unable to trace root causes.",
      "inv-p3":
        "Overly broad permissions let single clicks corrupt remote warehouse inventory.",
      "inv-p4":
        "Impacts support, buyers, and store teams daily while costing very little UI presentation effort.",
      "inv-p5":
        "Separating human actions from background API syncs avoids misplaced blame and speeds bug triage.",
    },
    extraAlternativesByProblem: {
      "inv-p1": {
        id: "inv-p1-c",
        label: "C",
        title: "Show Free-to-Sell in search list + full breakdown in side drawer",
        description:
          "Keep main lookup clean with Free stock count, opening Physical / Reserved / In-Transit inside quick drawer.",
        expectedBenefit: "Clean scanning density without hiding true stock states.",
        limitation: "Requires 1 extra click to inspect reserved order context.",
        userImpact: "Fast lookup for busy sales reps.",
        operationalImpact: "Prevents double allocation with low UI noise.",
        estimatedComplexity: "Medium",
        dependencies: ["Free balance projection", "Breakdown drawer"],
        risks: [
          "Staff misinterpreting drawer-hidden count deltas as lost stock",
        ],
        consequenceAnalysis:
          "Placing multi-state breakdown inside a drawer preserves fast search scanning while keeping precision intact.",
        tradeOffShift: {
          speedVsValidation: 0,
          flexibilityVsControl: -1,
          simplicityVsDensity: 1,
          autonomyVsGovernance: -1,
          easeVsTraceability: -1,
        },
      },
      "inv-p2": {
        id: "inv-p2-c",
        label: "C",
        title: "Require full note + doc above value threshold, quick tag below",
        description:
          "Small variances use a 1-click reason preset; high-value edits require written note and doc ID.",
        expectedBenefit: "Fast frontline adjustments with strict high-value audit.",
        limitation: "Needs careful threshold calibration across SKU prices.",
        userImpact: "Lightweight for minor damage write-offs.",
        operationalImpact: "Focuses audit effort on meaningful variances.",
        estimatedComplexity: "Medium",
        dependencies: ["Value variance threshold rules"],
        risks: [
          "Users splitting large write-offs into several smaller under-limit edits",
        ],
        consequenceAnalysis:
          "Tiered justification balances daily convenience and financial auditability provided anti-splitting alerts exist.",
        tradeOffShift: {
          speedVsValidation: 0,
          flexibilityVsControl: 0,
          simplicityVsDensity: 0,
          autonomyVsGovernance: 0,
          easeVsTraceability: -1,
        },
      },
      "inv-p3": {
        id: "inv-p3-c",
        label: "C",
        title: "Autonomous branch edits + real-time anomaly alerts to manager",
        description:
          "Warehouse staff posts edits immediately within assigned warehouse while unusual deltas trigger live review notifications.",
        expectedBenefit: "Never blocks rush-hour shipping while maintaining same-day oversight.",
        limitation: "Errors update live stock temporarily until manager reviews.",
        userImpact: "High frontline autonomy.",
        operationalImpact: "Requires active daily review habits by store managers.",
        estimatedComplexity: "Medium",
        dependencies: ["Anomaly threshold notifier", "Same-day audit feed"],
        risks: [
          "Unreviewed anomaly alerts leaking bad stock balances into nightly purchasing",
        ],
        consequenceAnalysis:
          "Swapping hard upfront locks for real-time review preserves warehouse speed only if managers act on alerts.",
        tradeOffShift: {
          speedVsValidation: 1,
          flexibilityVsControl: 1,
          simplicityVsDensity: 1,
          autonomyVsGovernance: 1,
          easeVsTraceability: -1,
        },
      },
      "inv-p4": {
        id: "inv-p4-c",
        label: "C",
        title: "Dual view: plain English ledger default + 'Technical Codes' toggle",
        description:
          "Show readable descriptions by default while letting support staff toggle raw DB codes and IDs inline.",
        expectedBenefit: "Serves frontline teams and technical support in one view.",
        limitation: "Slight added toggle control in table header.",
        userImpact: "Clean daily legibility with zero support regression.",
        operationalImpact: "Speeds self-service checks and developer debugging.",
        estimatedComplexity: "Low",
        dependencies: ["Ledger technical view toggle"],
        risks: [
          "Casual user flipping technical mode accidentally if poorly labeled",
        ],
        consequenceAnalysis:
          "A subtle toggle keeps everyday operations simple without stripping technical clues support relies on.",
        tradeOffShift: {
          speedVsValidation: 1,
          flexibilityVsControl: 1,
          simplicityVsDensity: 1,
          autonomyVsGovernance: 0,
          easeVsTraceability: -1,
        },
      },
      "inv-p5": {
        id: "inv-p5-c",
        label: "C",
        title: "Shared terminal lookup + 4-digit individual PIN prompt on edits",
        description:
          "Keep shared kiosk fast for browsing and picking, prompting a 4-digit PIN strictly on stock adjustments and transfers.",
        expectedBenefit: "Low friction on read tasks with named traceability on mutations.",
        limitation: "Automated sales deductions still log shift account unless PIN-bound.",
        userImpact: "Practical balance on shared floor terminals.",
        operationalImpact: "Secures accountability on sensitive inventory changes.",
        estimatedComplexity: "Medium",
        dependencies: ["Quick 4-digit PIN confirm modal"],
        risks: [
          "Clerks sharing PIN numbers during busy floor shifts",
        ],
        consequenceAnalysis:
          "Gating edits via quick PIN cuts login fatigue while protecting mutation audit trails.",
        tradeOffShift: {
          speedVsValidation: 0,
          flexibilityVsControl: 0,
          simplicityVsDensity: 1,
          autonomyVsGovernance: -1,
          easeVsTraceability: -1,
        },
      },
    },
    risksByAlternative: {
      "inv-p1-a": ["Visual clutter if Free vs Physical hierarchy lacks strong contrast"],
      "inv-p1-b": ["Recurring stock discrepancies hidden behind easy manual overwrites"],
      "inv-p2-a": ["Teams defaulting lazily to generic 'Other' reasons if preset list lacks fit"],
      "inv-p2-b": ["Blank or useless adjustment notes ('ok') breaking audit reviews"],
      "inv-p3-a": ["Queue bottlenecks if single manager is away with no delegate"],
      "inv-p3-b": ["Shadow spreadsheets formed outside ERP to bypass single-admin bottleneck"],
      "inv-p4-a": ["New backend movement events left unmapped in dictionary"],
      "inv-p4-b": ["Decisions made off stale exported CSVs hours old"],
      "inv-p5-a": ["Left-open personal sessions on shared floor stations"],
      "inv-p5-b": ["Unclear attribution between rotating shift workers"],
    },
    qaLinkedProblems: {
      "inv-qa-1": ["P-02", "P-04", "P-05"],
      "inv-qa-2": ["P-02"],
      "inv-qa-3": ["P-01", "P-02"],
      "inv-qa-4": ["P-03", "P-05"],
      "inv-qa-5": ["P-01"],
      "inv-qa-6": ["P-01", "P-05"],
    },
    extraQaScenario: {
      id: "inv-qa-7",
      category: "loading_and_error",
      title: "Loading & Error States — Dense ledger skeleton & safe retry on transfer fail",
      scenarioDescription:
        "Opening SKU history with 500+ movements or experiencing API 500 on branch transfer submit.",
      expectedUiState:
        "Proportional skeleton prevents layout shift; failed submit keeps draft quantities ready to retry.",
      givenWhenThen:
        "Given transfer error 500 or load > 800ms, Then draft transfer list remains intact with clear error banner.",
      recommendedCriticality: "essential",
      linkedProblemCodes: ["P-01", "P-04"],
    },
  },

  "DL-03": {
    asIsToBe: {
      asIsTitle: "Current Flow (Passive Pipeline Without Next-Step Cues)",
      asIsSubtitle: "Unowned inbound leads, flat stale cards, and off-system conversations.",
      asIsNodes: [
        {
          id: "crm-asis-1",
          step: "01",
          label: "Shared Unowned Pool",
          stateTag: "UNASSIGNED",
          isFriction: true,
          detail: "Fresh leads wait indefinitely in Stage 1 until someone remembers to pick them up.",
        },
        {
          id: "crm-asis-2",
          step: "02",
          label: "Flat Aged Kanban",
          stateTag: "STALLED",
          isFriction: true,
          detail: "Cards untouched for 10 days look identical to fresh closing quotes.",
        },
        {
          id: "crm-asis-3",
          step: "03",
          label: "Off-CRM Conversations",
          stateTag: "NO HISTORY",
          isFriction: true,
          detail: "Heavy forms drive reps to chat privately without logging interaction or next action.",
        },
      ],
      toBeTitle: "Target Flow (SLA-Aware Pipeline & Lightweight Logging)",
      toBeSubtitle: "Rule-based owner routing, SLA aging indicators, 1-click logging, and visible Next Actions.",
      toBeNodes: [
        {
          id: "crm-tobe-1",
          step: "01",
          label: "Auto-Route + SLA Timer",
          stateTag: "OWNED",
          isImproved: true,
          detail: "Routing assigns named owner immediately with visible response SLA countdown.",
        },
        {
          id: "crm-tobe-2",
          step: "02",
          label: "SLA-Tinted Priority Queue",
          stateTag: "PRIORITIZED",
          isImproved: true,
          detail: "Cards surface Next Action pill cleanly and highlight overdue SLA windows.",
        },
        {
          id: "crm-tobe-3",
          step: "03",
          label: "360° Drawer + Quick Chip",
          stateTag: "IN CADENCE",
          isImproved: true,
          detail: "One-click outcome log followed by +1d/+3d/+7d follow-up chips keeps funnel active.",
        },
      ],
      stateTransitions: [
        {
          from: "NEW_LEAD",
          trigger: "Segment Round-Robin Rule",
          to: "AWAITING_CONTACT",
          guardNote: "Starts rep response timer on intake",
        },
        {
          from: "NEGOTIATION",
          trigger: "Idle Days > Stage SLA",
          to: "SLA_WARNING",
          guardNote: "Surfaces deal in daily rescue queue without closing it",
        },
        {
          from: "OUTCOME_LOGGED",
          trigger: "Click Follow-Up Chip (+2d)",
          to: "NEXT_ACTION_SET",
          guardNote: "Resets SLA aging clock and schedules task",
        },
      ],
      keyDifferences: [
        "Replaces heavy 6-field forms with 1-click Drawer outcomes preserving deal memory",
        "Replaces flat chronological sorting with transparent urgency + stage + value queue",
        "Uses visible progressive aging instead of auto-closing live B2B negotiations",
      ],
    },
    problemJustifications: {
      "crm-p1":
        "Unclaimed inbound leads cool off rapidly and waste demand generation spend.",
      "crm-p2":
        "Mid-funnel stagnation distorts revenue forecasts silently before quota deadlines.",
      "crm-p3":
        "When logging takes more effort than messaging, context vanishes outside the product.",
      "crm-p4":
        "High daily frequency and low implementation cost with strong leverage on follow-up consistency.",
      "crm-p5":
        "Without transparent priority cues, reps burn peak hours on cold prospects.",
    },
    extraAlternativesByProblem: {
      "crm-p1": {
        id: "crm-p1-c",
        label: "C",
        title: "Manager triage queue with 30-min manual assignment SLA",
        description:
          "Inbound leads land with sales manager to match enterprise size cleanly to senior or junior reps.",
        expectedBenefit: "Thoughtful account-to-rep skill matching.",
        limitation: "Entirely dependent on manager staying available continuously.",
        userImpact: "Reps receive well-vetted leads.",
        operationalImpact: "Creates bottlenecks whenever manager joins external meetings.",
        estimatedComplexity: "Low",
        dependencies: ["Manager bulk assignment drawer"],
        risks: [
          "Inbound backlog freezing for hours while manager travels or is busy",
        ],
        consequenceAnalysis:
          "Manual triage increases matching quality at the clear risk of turning managers into response bottlenecks.",
        tradeOffShift: {
          speedVsValidation: -1,
          flexibilityVsControl: -1,
          simplicityVsDensity: 1,
          autonomyVsGovernance: -2,
          easeVsTraceability: -1,
        },
      },
      "crm-p2": {
        id: "crm-p2-c",
        label: "C",
        title: "Discreet idle-day counter + weekly 1:1 pipeline digest",
        description:
          "Avoid visual alert tints on Kanban cards and compile stagnant deals strictly in weekly manager reviews.",
        expectedBenefit: "Calm visual workspace without noisy red badges.",
        limitation: "Deals miss buying windows waiting for weekly review.",
        userImpact: "Zero visual interruption on the board.",
        operationalImpact: "Slow mid-month corrective reaction.",
        estimatedComplexity: "Low",
        dependencies: ["Stage idle counter", "Weekly digest export"],
        risks: [
          "Key deals silently cooling off days before weekly check-in",
        ],
        consequenceAnalysis:
          "Minimalist boards favor calm visual focus while slowing urgent mid-week follow-up cues.",
        tradeOffShift: {
          speedVsValidation: 1,
          flexibilityVsControl: 1,
          simplicityVsDensity: 2,
          autonomyVsGovernance: 1,
          easeVsTraceability: 0,
        },
      },
      "crm-p3": {
        id: "crm-p3-c",
        label: "C",
        title: "Auto-sync email/WhatsApp templates + optional quick manual notes",
        description:
          "Automatically write email/template sends onto deal timeline, keeping handwritten recaps optional.",
        expectedBenefit: "Near-zero manual effort across integrated digital touches.",
        limitation: "Phone calls and in-person visits still leave gaps if skipped manually.",
        userImpact: "Frictionless digital logging.",
        operationalImpact: "Higher integration maintenance across messaging APIs.",
        estimatedComplexity: "High",
        dependencies: ["Email/WhatsApp webhook sync", "Unified timeline ledger"],
        risks: [
          "Broken webhook tokens silently leaving timeline holes across reps",
        ],
        consequenceAnalysis:
          "Automated channel sync dramatically reduces typing overhead while still needing lightweight manual notes after voice calls.",
        tradeOffShift: {
          speedVsValidation: 2,
          flexibilityVsControl: 1,
          simplicityVsDensity: 0,
          autonomyVsGovernance: 0,
          easeVsTraceability: 0,
        },
      },
      "crm-p4": {
        id: "crm-p4-c",
        label: "C",
        title: "External calendar tasks optional without card-level Next Action cues",
        description:
          "Keep Kanban cards minimal (company + value) and let reps track follow-ups in personal calendar view.",
        expectedBenefit: "Minimalist cards and zero UI prompts.",
        limitation: "Overloaded reps easily forget orphaned deals outside calendar reminders.",
        userImpact: "No system prompts or reminders to dismiss.",
        operationalImpact: "Managers lack visibility on active pipeline follow-through.",
        estimatedComplexity: "Low",
        dependencies: ["Basic task calendar tab"],
        risks: [
          "Regression to forgotten deals with no scheduled next step",
        ],
        consequenceAnalysis:
          "Decoupling follow-up visibility from cards maximizes minimalism while leaving abandonment unchecked.",
        tradeOffShift: {
          speedVsValidation: 2,
          flexibilityVsControl: 2,
          simplicityVsDensity: 2,
          autonomyVsGovernance: 2,
          easeVsTraceability: 2,
        },
      },
      "crm-p5": {
        id: "crm-p5-c",
        label: "C",
        title: "Manual rep priority tags (Hot / Warm / Cold)",
        description:
          "Let reps label subjective heat tags directly on deals to arrange their own priority order.",
        expectedBenefit: "Captures qualitative buyer signals hard to automate.",
        limitation: "Subjective tags quickly go stale or over-flag everything as Hot.",
        userImpact: "Personal ownership over queue curation.",
        operationalImpact: "Low consistency across teams.",
        estimatedComplexity: "Low",
        dependencies: ["Manual temperature tag picker"],
        risks: [
          "Half the pipeline stays flagged 'Hot' permanently without reflecting real timing",
        ],
        consequenceAnalysis:
          "Manual temperature tags capture human nuance while risking inconsistent hygiene under quota stress.",
        tradeOffShift: {
          speedVsValidation: 0,
          flexibilityVsControl: 2,
          simplicityVsDensity: 1,
          autonomyVsGovernance: 2,
          easeVsTraceability: 1,
        },
      },
    },
    risksByAlternative: {
      "crm-p1-a": ["Uneven distribution if vacation/out-of-office status lags"],
      "crm-p1-b": ["Complex or lower-initial-value accounts neglected in pool"],
      "crm-p2-a": ["False alerts if consultative stages share aggressive short SLAs"],
      "crm-p2-b": ["Fake 'check-in' logs entered strictly to beat auto-close clock"],
      "crm-p3-a": ["Sparse context if complex enterprise objections stay abbreviated"],
      "crm-p3-b": ["Wholesale CRM abandonment under busy call schedules"],
      "crm-p4-a": ["Occasional unscheduled cards if quick prompt is skipped"],
      "crm-p4-b": ["Junk future task dates created just to unlock column dragging"],
      "crm-p5-a": ["Seller skepticism if priority sort feels opaque"],
      "crm-p5-b": ["Quick mid-size closes neglected behind slow whale deals"],
    },
    qaLinkedProblems: {
      "crm-qa-1": ["P-01", "P-03", "P-04"],
      "crm-qa-2": ["P-02", "P-03"],
      "crm-qa-3": ["P-03"],
      "crm-qa-4": ["P-01"],
      "crm-qa-5": ["P-04"],
      "crm-qa-6": ["P-01", "P-05"],
    },
    extraQaScenario: {
      id: "crm-qa-7",
      category: "loading_and_error",
      title: "Loading & Error States — Kanban skeleton & optimistic rollback on move failure",
      scenarioDescription:
        "Board loads 100+ filtered deals or stage transition API call returns timeout/500.",
      expectedUiState:
        "Proportionate column skeleton prevents layout jump; failed drag reverts card to original column cleanly with error alert.",
      givenWhenThen:
        "Given stage update failure on API, Then optimistic Kanban move reverts cleanly with non-destructive toast.",
      recommendedCriticality: "essential",
      linkedProblemCodes: ["P-02", "P-05"],
    },
  },
};
