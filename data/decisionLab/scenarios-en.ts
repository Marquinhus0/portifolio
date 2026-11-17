import type { DecisionScenarioConfig } from "./types";

export const SCENARIOS_EN: DecisionScenarioConfig[] = [
  // =========================================================================
  // SCENARIO 01 — POS: Retail Point-of-Sale Sales Operation
  // =========================================================================
  {
    id: "pdv-sales-operation",
    code: "DL-01",
    domain: "Retail & Point of Sale (POS)",
    originTag: "Didactic Scenario • ERP / POS",
    name: "Sales operation at a retail point of sale",
    dilemma:
      "How can frontline checkout keep moving fast during peak store traffic while protecting inventory accuracy, tax compliance, and clear error recovery?",
    businessContext: {
      overview:
        "A commercial store runs an ERP-integrated POS to scan items, process payments, emit fiscal documents, and deduct inventory. During busy hours, technical latency and rigid synchronous screens disrupt frontline service.",
      operationScale:
        "Concurrent checkout terminals • Peak window 11am–6pm • Live integration with central inventory and tax gateway",
      stakeholders: [
        "POS Cashier / Operator",
        "Store Supervisor",
        "Tax & Finance Team",
        "In-Store Customer",
      ],
      constraints: [
        "Every completed sale must map to valid tax classification and auditable stock deduction",
        "Keyboard-first cashier ergonomics cannot rely on multi-step mouse dialogs during queue pressure",
        "Network hiccups must never double-deduct stock or create unrecorded sales",
      ],
      keyMetricsWatch: [
        "Checkout completion latency",
        "Physical vs system stock discrepancy",
        "Post-sale fiscal rejections",
      ],
    },
    problems: [
      {
        id: "pdv-p1",
        code: "P-01",
        title: "Slowness during sale closing",
        symptom:
          "After payment confirmation, UI freezes awaiting chained synchronous calls (central stock, tax API, receipt), stalling physical queues.",
        userImpactDetail:
          "Operators do not know whether their commit succeeded, causing repeated Enter/F12 presses.",
        operationalImpactDetail:
          "Halts lane throughput during peak store revenue hours.",
        evidenceCue: "Wait latency concentrates right after payment confirmation.",
        scores: {
          userImpact: 5,
          operationalImpact: 5,
          frequency: 5,
          businessRisk: 4,
          implementationEffort: 4,
        },
        alternatives: [
          {
            id: "pdv-p1-a",
            label: "A",
            title: "Keep full synchronous lock with an explicit step-by-step spinner",
            description:
              "Terminal continues blocking until all remote services respond, adding granular loading states.",
            expectedBenefit: "Low risk of out-of-sync commit since everything completes inline.",
            limitation: "Does not reduce queue wait time during external slowdowns.",
            userImpact: "Reduces click uncertainty, yet cashier still waits idly.",
            operationalImpact: "Physical queues still build up whenever remote latency spikes.",
            estimatedComplexity: "Low",
            dependencies: ["Light UI loading state copy"],
            consequenceAnalysis:
              "Improving loading copy calms operator anxiety, but leaves store queue delays unresolved.",
            tradeOffShift: {
              speedVsValidation: -2,
              flexibilityVsControl: -1,
              simplicityVsDensity: 1,
              autonomyVsGovernance: -1,
              easeVsTraceability: -1,
            },
          },
          {
            id: "pdv-p1-b",
            label: "B",
            title: "Asynchronous local commit queue with idempotency key",
            description:
              "Pre-validate cached tax rules on item scan, finalize checkout immediately with double-submit lock, and sync tax authorization asynchronously.",
            expectedBenefit:
              "Unblocks the next customer in under a second while preserving auditability.",
            limitation:
              "Requires local transactional persistence and a back-office exception reconciliation queue.",
            userImpact: "Smooth keyboard cadence without dead waits at payment time.",
            operationalImpact: "Prevents lane stalls during intermittent gateway slowness.",
            estimatedComplexity: "High",
            dependencies: ["Local commit queue", "Idempotency API key", "Back-office exception monitor"],
            consequenceAnalysis:
              "You prioritized frontline continuity at higher engineering effort: lanes keep moving, supported by an auditable sync queue.",
            tradeOffShift: {
              speedVsValidation: 1,
              flexibilityVsControl: 1,
              simplicityVsDensity: 0,
              autonomyVsGovernance: 1,
              easeVsTraceability: 0,
            },
            isReferenceChoice: true,
          },
          {
            id: "pdv-p1-c",
            label: "C",
            title: "Strip tax and stock checks from POS checkout completely",
            description:
              "Cashier captures payment only and batches all fiscal and stock checks overnight.",
            expectedBenefit: "Near-instant UI commit and minimal client code.",
            limitation: "Exposes store to severe next-day tax rejections and oversold last units.",
            userImpact: "Fast today, heavy clean-up work tomorrow.",
            operationalImpact: "Shifts queue bottlenecks into manual accounting rework.",
            estimatedComplexity: "Medium",
            dependencies: ["Nightly batch reconciliation"],
            consequenceAnalysis:
              "Sacrificing safeguards for raw speed creates serious tax and inventory discrepancy exposure.",
            tradeOffShift: {
              speedVsValidation: 2,
              flexibilityVsControl: 2,
              simplicityVsDensity: 2,
              autonomyVsGovernance: 2,
              easeVsTraceability: -2,
            },
          },
        ],
      },
      {
        id: "pdv-p2",
        code: "P-02",
        title: "Temporary communication failures",
        symptom:
          "Internet drops or gateway timeouts reset checkout state mid-basket.",
        userImpactDetail:
          "Operators must re-scan an entire cart manually after brief network drops.",
        operationalImpactDetail:
          "Causes abandoned carts, manual paper receipts, and duplicate retries.",
        evidenceCue: "Brief disconnects prompt staff to refresh terminals mid-transaction.",
        scores: {
          userImpact: 5,
          operationalImpact: 5,
          frequency: 4,
          businessRisk: 5,
          implementationEffort: 4,
        },
        alternatives: [
          {
            id: "pdv-p2-a",
            label: "A",
            title: "Explicit contingency mode preserving basket + idempotent retry queue",
            description:
              "On timeout/offline detection, keep all scanned items, show amber 'Contingency Active' status, and commit safely for auto-sync.",
            expectedBenefit: "Zero lost baskets and continuous operations with clear supervisor visibility.",
            limitation: "Requires contingency expiration rules and reliable retry scheduling.",
            userImpact: "Eliminates painful cart re-entry under customer pressure.",
            operationalImpact: "Keeps checkout open without side spreadsheets.",
            estimatedComplexity: "High",
            dependencies: ["Local basket persistence", "Idempotent retry worker"],
            consequenceAnalysis:
              "Controlled contingency safeguards both operator flow and back-office integrity during brief outages.",
            tradeOffShift: {
              speedVsValidation: 1,
              flexibilityVsControl: 0,
              simplicityVsDensity: -1,
              autonomyVsGovernance: 0,
              easeVsTraceability: 0,
            },
            isReferenceChoice: true,
          },
          {
            id: "pdv-p2-b",
            label: "B",
            title: "Save draft locally only and lock sale completion until network returns",
            description:
              "Basket remains on screen, but Commit button stays disabled during network outage.",
            expectedBenefit: "Prevents offline queue reconciliation complexity.",
            limitation: "A 20-minute ISP outage stalls physical checkouts completely.",
            userImpact: "Avoids rescanning, but leaves customers stranded at the counter.",
            operationalImpact: "Halts in-store revenue during prolonged disconnects.",
            estimatedComplexity: "Medium",
            dependencies: ["Local session draft"],
            consequenceAnalysis:
              "Strict online-only locking protects sync simplicity at the expense of business continuity.",
            tradeOffShift: {
              speedVsValidation: -2,
              flexibilityVsControl: -2,
              simplicityVsDensity: 1,
              autonomyVsGovernance: -2,
              easeVsTraceability: -1,
            },
          },
          {
            id: "pdv-p2-c",
            label: "C",
            title: "Silent background infinite retries with no UI notice",
            description:
              "Retry silently without changing UI feedback during timeouts.",
            expectedBenefit: "No extra UI alert states needed.",
            limitation: "Cashier thinks terminal crashed, force-reloads tab, and loses cart.",
            userImpact: "High frustration from lack of actionable error clarity.",
            operationalImpact: "Spikes urgent support calls.",
            estimatedComplexity: "Low",
            dependencies: ["Existing retry loop"],
            consequenceAnalysis:
              "Silent retries look invisible to users and often trigger manual reloads that worsen data loss.",
            tradeOffShift: {
              speedVsValidation: 0,
              flexibilityVsControl: 1,
              simplicityVsDensity: 2,
              autonomyVsGovernance: 1,
              easeVsTraceability: -2,
            },
          },
        ],
      },
      {
        id: "pdv-p3",
        code: "P-03",
        title: "Inventory vs sales discrepancies",
        symptom:
          "Concurrent terminals sell the last remaining unit or canceled tickets delay restocking available quantity.",
        userImpactDetail:
          "Staff promises items shown in ERP that are already sold or missing on the shelf.",
        operationalImpactDetail:
          "Causes awkward post-payment refunds and inaccurate restock triggers.",
        evidenceCue: "Weekend peaks reveal negative stock counts on high-turn SKUs.",
        scores: {
          userImpact: 4,
          operationalImpact: 4,
          frequency: 3,
          businessRisk: 5,
          implementationEffort: 4,
        },
        alternatives: [
          {
            id: "pdv-p3-a",
            label: "A",
            title: "Short-lived cart reservation + low-stock warning across terminals",
            description:
              "Flag SKUs <= 3 units at scan time and hold a TTL-expiring reservation while basket is active.",
            expectedBenefit:
              "Prevents two adjacent lanes from selling the identical last unit simultaneously.",
            limitation: "Needs automatic TTL expiry so abandoned baskets release units cleanly.",
            userImpact: "Builds confidence before charging the customer.",
            operationalImpact: "Reduces post-payment cancellations and shelf discrepancies.",
            estimatedComplexity: "High",
            dependencies: ["Reservation TTL service", "Low-stock terminal badge"],
            consequenceAnalysis:
              "Preventing conflicts early via expiring reservations avoids painful post-payment refunds.",
            tradeOffShift: {
              speedVsValidation: -1,
              flexibilityVsControl: -1,
              simplicityVsDensity: 0,
              autonomyVsGovernance: -1,
              easeVsTraceability: -1,
            },
            isReferenceChoice: true,
          },
          {
            id: "pdv-p3-b",
            label: "B",
            title: "Allow negative stock freely and reconcile weekly",
            description:
              "Permit checkout regardless of stock level and resolve discrepancies in weekly audits.",
            expectedBenefit: "Zero blocks when physical goods arrive ahead of invoice posting.",
            limitation: "Propagates phantom stock errors across purchasing and online channels.",
            userImpact: "Unrestricted speed at checkout.",
            operationalImpact: "Compounds inventory audit debt.",
            estimatedComplexity: "Low",
            dependencies: ["Weekly negative stock report"],
            consequenceAnalysis:
              "Unrestricted negative stock prioritizes checkout speed while eroding inventory reliability.",
            tradeOffShift: {
              speedVsValidation: 2,
              flexibilityVsControl: 2,
              simplicityVsDensity: 2,
              autonomyVsGovernance: 2,
              easeVsTraceability: -2,
            },
          },
        ],
      },
      {
        id: "pdv-p4",
        code: "P-04",
        title: "Incomplete fiscal data",
        symptom:
          "Newly added SKUs reach the counter missing NCM/CFOP tax mapping, failing only at payment commit.",
        userImpactDetail:
          "Cashiers lack tax expertise to resolve missing fiscal classifications mid-checkout.",
        operationalImpactDetail:
          "Checkout lane freezes waiting on tax staff via phone.",
        evidenceCue: "Tax errors only surface on final commit click.",
        scores: {
          userImpact: 4,
          operationalImpact: 4,
          frequency: 3,
          businessRisk: 5,
          implementationEffort: 3,
        },
        alternatives: [
          {
            id: "pdv-p4-a",
            label: "A",
            title: "Pre-flight tax check at item scan + catalog completeness gate",
            description:
              "Require valid tax mapping at item onboarding and verify eligibility right on scan rather than final payment.",
            expectedBenefit: "Catches missing rules before charging the customer.",
            limitation: "Requires clean catalog hygiene on goods intake.",
            userImpact: "Clear early alert instead of surprise lock after payment.",
            operationalImpact: "Routes fiscal setup back to qualified back-office staff.",
            estimatedComplexity: "Medium",
            dependencies: ["Catalog readiness validation", "Early scan warning"],
            consequenceAnalysis:
              "Shifting validation upstream keeps frontline checkouts shielded from complex tax setup.",
            tradeOffShift: {
              speedVsValidation: -1,
              flexibilityVsControl: -2,
              simplicityVsDensity: 1,
              autonomyVsGovernance: -2,
              easeVsTraceability: -1,
            },
            isReferenceChoice: true,
          },
          {
            id: "pdv-p4-b",
            label: "B",
            title: "Let cashiers pick tax codes manually in a POS modal",
            description:
              "Show an inline tax rule dropdown directly inside POS when mapping is incomplete.",
            expectedBenefit: "Unblocks immediate sale without escalating.",
            limitation: "Severe risk of wrong tax filings made under queue stress.",
            userImpact: "Forces high-stakes accounting guesses onto retail staff.",
            operationalImpact: "Generates tax corrections and compliance risk.",
            estimatedComplexity: "Low",
            dependencies: ["POS tax rule selector"],
            consequenceAnalysis:
              "Handing tax classification to cashiers trades immediate checkout speed for compliance liability.",
            tradeOffShift: {
              speedVsValidation: 1,
              flexibilityVsControl: 2,
              simplicityVsDensity: -2,
              autonomyVsGovernance: 2,
              easeVsTraceability: -1,
            },
          },
        ],
      },
      {
        id: "pdv-p5",
        code: "P-05",
        title: "Difficulty identifying operation errors",
        symptom:
          "Failures return cryptic messages ('Error 500' or raw XML) with no guidance on next action.",
        userImpactDetail:
          "Staff cannot tell if they should retry, check customer tax ID, or call supervisor.",
        operationalImpactDetail:
          "Inflates support call volume and blind duplicate submissions.",
        evidenceCue: "Raw API error payloads shown verbatim in alert boxes.",
        scores: {
          userImpact: 5,
          operationalImpact: 4,
          frequency: 4,
          businessRisk: 3,
          implementationEffort: 2,
        },
        alternatives: [
          {
            id: "pdv-p5-a",
            label: "A",
            title: "Human-readable action copy + collapsible technical payload",
            description:
              "Map critical error codes into plain explanation, next safe step, and an expandable technical drawer for support.",
            expectedBenefit: "High operational relief with low engineering effort.",
            limitation: "Requires curating copy for top rejection reasons.",
            userImpact: "Lets staff act calmly and distinguish data fixes from network drops.",
            operationalImpact: "Shortens support triage by giving support exact context in one click.",
            estimatedComplexity: "Low",
            dependencies: ["Error-to-action dictionary"],
            consequenceAnalysis:
              "Clear recovery wording paired with collapsible logs delivers fast clarity with low implementation cost.",
            tradeOffShift: {
              speedVsValidation: 1,
              flexibilityVsControl: 0,
              simplicityVsDensity: 1,
              autonomyVsGovernance: 0,
              easeVsTraceability: -1,
            },
            isReferenceChoice: true,
          },
          {
            id: "pdv-p5-b",
            label: "B",
            title: "Replace every error with one generic 'Contact IT Support' popup",
            description:
              "Hide all technical variation behind one static support message.",
            expectedBenefit: "Fastest implementation and zero technical jargon.",
            limitation: "Simple typos like an invalid customer document still trigger support escalation.",
            userImpact: "Leaves cashier helpless even on minor input errors.",
            operationalImpact: "Floods helpdesk with trivial issues.",
            estimatedComplexity: "Low",
            dependencies: ["None"],
            consequenceAnalysis:
              "Over-simplifying errors hides actionable context and slows trivial self-recovery.",
            tradeOffShift: {
              speedVsValidation: -1,
              flexibilityVsControl: -1,
              simplicityVsDensity: 2,
              autonomyVsGovernance: -2,
              easeVsTraceability: -2,
            },
          },
        ],
      },
    ],
    tradeOffAxes: [
      {
        id: "speedVsValidation",
        leftPole: "Strict Synchronous Check",
        rightPole: "Counter Speed",
        criteriaNote: "Whether tax and stock rules block checkout or execute resiliently.",
      },
      {
        id: "flexibilityVsControl",
        leftPole: "Preventive Control",
        rightPole: "Operational Flexibility",
        criteriaNote: "How much exception handling the lane allows without halting sales.",
      },
      {
        id: "simplicityVsDensity",
        leftPole: "Diagnostic Detail",
        rightPole: "Visual Simplicity",
        criteriaNote: "Balances clean cashier focus with actionable context during outages.",
      },
      {
        id: "autonomyVsGovernance",
        leftPole: "Fiscal & Stock Governance",
        rightPole: "Operator Autonomy",
        criteriaNote: "Who holds authority on stock conflicts and tax exceptions.",
      },
      {
        id: "easeVsTraceability",
        leftPole: "Full Auditability",
        rightPole: "Fast Shortcut",
        criteriaNote: "Auditable reconciliation versus instant unlogged steps.",
      },
    ],
    qaScenarios: [
      {
        id: "pdv-qa-1",
        category: "normal_operation",
        title: "Normal Operation — Multi-item checkout committed via keyboard",
        scenarioDescription:
          "Operator scans in-stock products, picks payment, and commits checkout via shortcut cleanly.",
        expectedUiState: "Receipt prints, stock updates once, lane resets ready for the next customer.",
        givenWhenThen: "Given valid stock and online sync, When F12 commits checkout, Then sale completes without mouse input.",
        recommendedCriticality: "essential",
      },
      {
        id: "pdv-qa-2",
        category: "missing_required",
        title: "Missing Required Data — Incomplete fiscal rule or missing payment selection",
        scenarioDescription:
          "Attempt to sell a product missing tax codes or submit without payment method.",
        expectedUiState: "Explicit pre-payment warning highlights missing item/field before charging.",
        givenWhenThen: "Given SKU missing fiscal mapping, When scanned or pre-checked, Then UI prevents charge and names exact gap.",
        recommendedCriticality: "essential",
      },
      {
        id: "pdv-qa-3",
        category: "communication_failure",
        title: "Communication Failure — Tax gateway timeout at checkout commit",
        scenarioDescription:
          "Network drops or external API exceeds timeout right after payment authorization.",
        expectedUiState: "Basket preserved, 'Contingency Active' indicator shown, safe sync queue created.",
        givenWhenThen: "Given timeout > threshold, When payment confirms, Then sale enters SYNC_PENDING queue without losing cart.",
        recommendedCriticality: "essential",
      },
      {
        id: "pdv-qa-4",
        category: "unauthorized_user",
        title: "Unauthorized User — Discount or void above operator tier",
        scenarioDescription:
          "Cashier attempts discount beyond profile limit or receipt cancellation.",
        expectedUiState: "Supervisor credential modal appears while keeping current basket intact.",
        givenWhenThen: "Given discount > operator threshold, When triggered, Then audited manager override is required.",
        recommendedCriticality: "recommended",
      },
      {
        id: "pdv-qa-5",
        category: "inconsistent_data",
        title: "Inconsistent Data — Last unit sold simultaneously by two terminals",
        scenarioDescription:
          "Two operators ring up the same SKU with only 1 unit remaining.",
        expectedUiState: "Second lane displays clear reservation conflict before charging.",
        givenWhenThen: "When Terminal A reserves last unit, Then Terminal B alerts operator prior to payment step.",
        recommendedCriticality: "recommended",
      },
      {
        id: "pdv-qa-6",
        category: "duplicate_operation",
        title: "Duplicate Operation — Rapid double-tap on Enter / F12",
        scenarioDescription:
          "Operator presses commit shortcut twice within 300ms while waiting.",
        expectedUiState: "Processing state locks duplicate click and idempotency returns original commit.",
        givenWhenThen: "Given in-flight commit sharing idempotencyKey, When F12 fires twice, Then zero double stock deduction occurs.",
        recommendedCriticality: "essential",
      },
    ],
    referenceStrategy: {
      recommendedProblemIds: ["pdv-p1", "pdv-p2", "pdv-p5"],
      title: "Stabilize Lane Continuity and Actionable Error Feedback First",
      summary:
        "In queue-sensitive POS checkouts, stopping commit freezes (P-01), preserving carts across disconnects (P-02), and clarifying recovery messages (P-05) protects immediate store flow ahead of multi-terminal locking refinements.",
      reasoning: [
        "P-01 and P-02 strike at peak frequency and defend both store throughput and transaction safety.",
        "P-05 cuts helpdesk reliance quickly at low implementation cost.",
        "P-03 and P-04 anchor wave-two preventive integrity across inventory and product catalog setup.",
      ],
    },
    relatedCaseSlug: "erp-enterprise-redesign",
    relatedCaseLabel: "Open Real ERP Case [01] (NDA-Safe)",
  },

  // =========================================================================
  // SCENARIO 02 — INVENTORY ERP: Inventory movement discrepancies
  // =========================================================================
  {
    id: "erp-inventory-traceability",
    code: "DL-02",
    domain: "Enterprise ERP & Logistics",
    originTag: "Didactic Scenario • ERP / Inventory",
    name: "Inventory movement discrepancies",
    dilemma:
      "How to give warehouse and store teams fast daily execution without sacrificing permission boundaries, legible movement logs, and auditable traceability?",
    businessContext: {
      overview:
        "An enterprise operates multiple warehouses and stores where staff post purchase receipts, sales deductions, inter-branch transfers, and manual stock adjustments. Ongoing balance mismatches erode trust across teams.",
      operationScale:
        "Multi-branch warehouses & shifts • Hundreds of SKU movements daily • Direct impact on purchasing & order fulfillment",
      stakeholders: [
        "Warehouse Clerk",
        "Procurement Buyer",
        "Operations Auditor / Manager",
        "Sales & Billing Team",
      ],
      constraints: [
        "Unexplained manual stock overrides distort average cost, margins, and automated restock suggestions",
        "Checking or adjusting items cannot require navigating five separate forms",
        "Critical balance edits must tie back to actor, timestamp, and source document",
      ],
      keyMetricsWatch: [
        "Physical vs system inventory variance",
        "Time spent tracing discrepancy root causes",
        "Percentage of uncategorized manual adjustments",
      ],
    },
    problems: [
      {
        id: "inv-p1",
        code: "P-01",
        title: "Discrepancy between physical and system inventory",
        symptom:
          "System displays stock that is missing on shelves or blocks orders due to unchecked incoming transfers.",
        userImpactDetail:
          "Sales and purchasing distrust ERP stock counts and walk shelves manually.",
        operationalImpactDetail:
          "Causes unnecessary emergency buys and unexpected stockouts.",
        evidenceCue: "Cycle counts reveal persistent deltas vs digital numbers.",
        scores: {
          userImpact: 5,
          operationalImpact: 5,
          frequency: 4,
          businessRisk: 5,
          implementationEffort: 4,
        },
        alternatives: [
          {
            id: "inv-p1-a",
            label: "A",
            title: "Separate stock states (Physical, Reserved, In-Transit, Pending Inspection)",
            description:
              "Break opaque total count into clear buckets so teams see available stock vs committed/in-transit units.",
            expectedBenefit:
              "Removes confusion over why items exist physically yet cannot ship right now.",
            limitation: "Higher screen density requiring strong visual hierarchy.",
            userImpact: "Buyers and reps immediately trust stock availability states.",
            operationalImpact: "Prevents double-promising committed units.",
            estimatedComplexity: "High",
            dependencies: ["Composite inventory state ledger", "Compact UI stock badge readout"],
            consequenceAnalysis:
              "You prioritized structural stock clarity, accepting tighter visual layout care so multiple balances remain scannable.",
            tradeOffShift: {
              speedVsValidation: -1,
              flexibilityVsControl: -1,
              simplicityVsDensity: -2,
              autonomyVsGovernance: -1,
              easeVsTraceability: -2,
            },
            isReferenceChoice: true,
          },
          {
            id: "inv-p1-b",
            label: "B",
            title: "Quick 'Instant Override' button right on inventory lookup",
            description:
              "Let any operator type the shelf count and overwrite system balance instantly.",
            expectedBenefit: "Fast one-step numeric fix with no workflow friction.",
            limitation: "Hides root operational errors (unposted invoices, shrink, picking mistakes).",
            userImpact: "Feels effortless upfront while worsening confusion across shifts.",
            operationalImpact: "Corrupts cost history and procurement signals.",
            estimatedComplexity: "Low",
            dependencies: ["Direct overwrite endpoint"],
            consequenceAnalysis:
              "Unrestricted overrides turn the ERP stock ledger into an untrusted scratchpad.",
            tradeOffShift: {
              speedVsValidation: 2,
              flexibilityVsControl: 2,
              simplicityVsDensity: 2,
              autonomyVsGovernance: 2,
              easeVsTraceability: 2,
            },
          },
        ],
      },
      {
        id: "inv-p2",
        code: "P-02",
        title: "Lack of traceability",
        symptom:
          "When stock drops unexpectedly, no link connects adjustments to an order, branch transfer, or count sheet.",
        userImpactDetail:
          "Managers spend hours cross-referencing disconnected reports.",
        operationalImpactDetail:
          "Fails compliance audits and delays monthly close.",
        evidenceCue: "Entries show up simply as 'Manual Adjustment' with no document reference.",
        scores: {
          userImpact: 4,
          operationalImpact: 5,
          frequency: 4,
          businessRisk: 5,
          implementationEffort: 3,
        },
        alternatives: [
          {
            id: "inv-p2-a",
            label: "A",
            title: "Immutable audit trail requiring typed reason + linked document",
            description:
              "Every manual adjustment or transfer requires selecting a standard reason code and linking invoice/order when applicable.",
            expectedBenefit: "Full root-cause history without slowing standard PO/sales automation.",
            limitation: "Adds one categorization click during manual overrides.",
            userImpact: "Cuts manager investigation time dramatically.",
            operationalImpact: "Builds actionable data on recurring shrink or picking flaws.",
            estimatedComplexity: "Medium",
            dependencies: ["Reason taxonomy", "Append-only ledger log"],
            consequenceAnalysis:
              "Structured reasons add tiny friction only on manual overrides while making every discrepancy traceable.",
            tradeOffShift: {
              speedVsValidation: -1,
              flexibilityVsControl: -2,
              simplicityVsDensity: 0,
              autonomyVsGovernance: -2,
              easeVsTraceability: -2,
            },
            isReferenceChoice: true,
          },
          {
            id: "inv-p2-b",
            label: "B",
            title: "Optional free-text notes field",
            description:
              "Offer an optional comment box for operators who want to leave context.",
            expectedBenefit: "Zero resistance from busy warehouse staff.",
            limitation: "Optional notes almost always stay blank or contain 'ok'.",
            userImpact: "Fast entry, blind follow-up.",
            operationalImpact: "Leaves audit gaps unresolved.",
            estimatedComplexity: "Low",
            dependencies: ["Optional string field"],
            consequenceAnalysis:
              "Optional reason fields preserve speed at the price of unreliable operational auditing.",
            tradeOffShift: {
              speedVsValidation: 1,
              flexibilityVsControl: 2,
              simplicityVsDensity: 1,
              autonomyVsGovernance: 2,
              easeVsTraceability: 2,
            },
          },
        ],
      },
      {
        id: "inv-p3",
        code: "P-03",
        title: "Inadequate permissions",
        symptom:
          "Broad module access allows staff to edit stock counts across unrelated warehouses without approval thresholds.",
        userImpactDetail:
          "Clerks fear clicking dangerous actions because UI exposes every admin operation.",
        operationalImpactDetail:
          "High risk of accidental edits across branches.",
        evidenceCue: "Store staff inadvertently posting adjustments against central DC stock.",
        scores: {
          userImpact: 3,
          operationalImpact: 4,
          frequency: 3,
          businessRisk: 5,
          implementationEffort: 3,
        },
        alternatives: [
          {
            id: "inv-p3-a",
            label: "A",
            title: "Branch-scoped roles + manager approval above threshold",
            description:
              "Scope actions to assigned warehouses; minor routine variances pass with reason codes, large edits route to approval.",
            expectedBenefit: "Prevents cross-branch accidents without bottling up minor daily fixes.",
            limitation: "Needs branch role setup and lightweight approval queue UI.",
            userImpact: "Shows only relevant warehouse actions per role.",
            operationalImpact: "Eliminates accidental edits to remote warehouses.",
            estimatedComplexity: "Medium",
            dependencies: ["Warehouse RBAC matrix", "Threshold approval workflow"],
            consequenceAnalysis:
              "Role-based warehouse scoping balances operational throughput with protective governance.",
            tradeOffShift: {
              speedVsValidation: -1,
              flexibilityVsControl: -2,
              simplicityVsDensity: 1,
              autonomyVsGovernance: -2,
              easeVsTraceability: -1,
            },
            isReferenceChoice: true,
          },
          {
            id: "inv-p3-b",
            label: "B",
            title: "Lock all adjustments exclusively to one central admin",
            description:
              "Restrict every inventory adjustment globally to one central supervisor.",
            expectedBenefit: "Maximum centralized oversight.",
            limitation: "Turns one manager into a bottleneck and pushes teams into informal workarounds.",
            userImpact: "Hours of waiting to write off one damaged box.",
            operationalImpact: "Slows fulfillment and cycle counts across branches.",
            estimatedComplexity: "Low",
            dependencies: ["Single admin boolean gate"],
            consequenceAnalysis:
              "Absolute centralization achieves theoretical control while creating severe daily friction.",
            tradeOffShift: {
              speedVsValidation: -2,
              flexibilityVsControl: -2,
              simplicityVsDensity: 1,
              autonomyVsGovernance: -2,
              easeVsTraceability: -1,
            },
          },
        ],
      },
      {
        id: "inv-p4",
        code: "P-04",
        title: "Hard-to-read movement history",
        symptom:
          "Stock history renders raw database codes ('MOV_TYP_42', numeric IDs) unreadable to store teams.",
        userImpactDetail:
          "Staff calls support just to translate what each table line means.",
        operationalImpactDetail:
          "Slows inventory reconciliation meetings and causes reading errors.",
        evidenceCue: "Raw DB enum labels exposed verbatim in UI.",
        scores: {
          userImpact: 5,
          operationalImpact: 4,
          frequency: 5,
          businessRisk: 3,
          implementationEffort: 2,
        },
        alternatives: [
          {
            id: "inv-p4-a",
            label: "A",
            title: "Human-readable bank-statement ledger (+ / -, running balance, linked doc)",
            description:
              "Render human labels ('Invoice #402 Intake', 'Transfer DC -> Store 2'), delta sign, running balance, and clickable link to document.",
            expectedBenefit: "Immediate comprehension across roles with low engineering effort.",
            limitation: "Needs consistent label mapping per event type.",
            userImpact: "Cuts recurring interpretation questions dramatically.",
            operationalImpact: "Enables self-service daily stock verification.",
            estimatedComplexity: "Low",
            dependencies: ["Event label dictionary", "Running balance projection"],
            consequenceAnalysis:
              "Presenting SKU movements like a clean financial statement delivers rapid clarity at low cost.",
            tradeOffShift: {
              speedVsValidation: 1,
              flexibilityVsControl: 0,
              simplicityVsDensity: 1,
              autonomyVsGovernance: 0,
              easeVsTraceability: -1,
            },
            isReferenceChoice: true,
          },
          {
            id: "inv-p4-b",
            label: "B",
            title: "Keep raw table and add 'Export CSV' for Excel filtering",
            description:
              "Add spreadsheet export so managers analyze history outside the ERP.",
            expectedBenefit: "Familiar Excel formulas for power analysts.",
            limitation: "Leaves live warehouse UI unreadable during active picking.",
            userImpact: "Forces tool-switching for routine lookups.",
            operationalImpact: "Encourages disconnected side spreadsheets.",
            estimatedComplexity: "Low",
            dependencies: ["CSV generator"],
            consequenceAnalysis:
              "CSV export supplements analysis but leaves core in-product readability unaddressed.",
            tradeOffShift: {
              speedVsValidation: 0,
              flexibilityVsControl: 1,
              simplicityVsDensity: 0,
              autonomyVsGovernance: 1,
              easeVsTraceability: 0,
            },
          },
        ],
      },
      {
        id: "inv-p5",
        code: "P-05",
        title: "Difficulty tracing origin of edits",
        symptom:
          "Shared terminal logins and background integrations mix human edits with automated API syncs.",
        userImpactDetail:
          "Teams cannot separate integration sync bugs from operator entry errors.",
        operationalImpactDetail:
          "Delays bug isolation and creates unfair blame across shifts.",
        evidenceCue: "Movements attributed to shared station user IDs.",
        scores: {
          userImpact: 3,
          operationalImpact: 4,
          frequency: 3,
          businessRisk: 4,
          implementationEffort: 3,
        },
        alternatives: [
          {
            id: "inv-p5-a",
            label: "A",
            title: "Mandatory origin signature (User + Channel/API + Terminal)",
            description:
              "Tag every movement with named user/service, channel (POS, Warehouse, E-commerce API), and timestamp.",
            expectedBenefit: "Instantly distinguishes sync bugs from manual warehouse actions.",
            limitation: "Requires fast individual badge/PIN switch on shared terminals.",
            userImpact: "Protects operators from false blame while speeding support diagnostics.",
            operationalImpact: "Accelerates omnichannel bug resolution.",
            estimatedComplexity: "Medium",
            dependencies: ["Quick operator PIN switch", "Origin metadata columns"],
            consequenceAnalysis:
              "Recording both channel and individual actor resolves accountability gaps across humans and APIs.",
            tradeOffShift: {
              speedVsValidation: -1,
              flexibilityVsControl: -1,
              simplicityVsDensity: 0,
              autonomyVsGovernance: -1,
              easeVsTraceability: -2,
            },
            isReferenceChoice: true,
          },
          {
            id: "inv-p5-b",
            label: "B",
            title: "Log only workstation IP under one shared warehouse login",
            description:
              "Capture terminal IP while keeping one shared account per floor area.",
            expectedBenefit: "Zero login switching overhead for rotating clerks.",
            limitation: "IP alone cannot identify who acted across shifts.",
            userImpact: "Fast login reuse.",
            operationalImpact: "Preserves attribution blind spots.",
            estimatedComplexity: "Low",
            dependencies: ["IP logging"],
            consequenceAnalysis:
              "Shared accounts favor zero-friction logins while leaving shift accountability opaque.",
            tradeOffShift: {
              speedVsValidation: 1,
              flexibilityVsControl: 2,
              simplicityVsDensity: 2,
              autonomyVsGovernance: 2,
              easeVsTraceability: 2,
            },
          },
        ],
      },
    ],
    tradeOffAxes: [
      {
        id: "easeVsTraceability",
        leftPole: "Full Auditability",
        rightPole: "Immediate Convenience",
        criteriaNote: "How much structured input (reasons, docs) is requested to protect audit trails.",
      },
      {
        id: "autonomyVsGovernance",
        leftPole: "Governance & Tiers",
        rightPole: "Team Autonomy",
        criteriaNote: "Direct frontline posting versus threshold manager approval.",
      },
      {
        id: "simplicityVsDensity",
        leftPole: "Multi-State Breakdown",
        rightPole: "Lean Readout",
        criteriaNote: "One combined number versus Physical / Reserved / In-Transit visibility.",
      },
      {
        id: "flexibilityVsControl",
        leftPole: "Branch Isolation",
        rightPole: "Cross-Store Access",
        criteriaNote: "Scoping permissions to assigned warehouses.",
      },
      {
        id: "speedVsValidation",
        leftPole: "Upfront Check",
        rightPole: "Rapid Entry",
        criteriaNote: "Pre-flight bounds validation against fast manual overrides.",
      },
    ],
    qaScenarios: [
      {
        id: "inv-qa-1",
        category: "normal_operation",
        title: "Normal Operation — PO intake reflected cleanly in SKU ledger",
        scenarioDescription:
          "Authorized clerk posts incoming invoice and reviews SKU movement timeline.",
        expectedUiState: "Ledger displays readable intake label, positive delta, new balance, and linked invoice.",
        givenWhenThen: "Given valid permission, When PO intake confirms, Then movement logs actor, doc link, and balance.",
        recommendedCriticality: "essential",
      },
      {
        id: "inv-qa-2",
        category: "missing_required",
        title: "Missing Required Field — Manual write-off without reason code",
        scenarioDescription:
          "User attempts damage adjustment without picking a categorized reason.",
        expectedUiState: "Form flags required reason dropdown while preserving entered quantities.",
        givenWhenThen: "Given adjustment without reason, When submitted, Then UI blocks save and focuses reason selector.",
        recommendedCriticality: "essential",
      },
      {
        id: "inv-qa-3",
        category: "communication_failure",
        title: "Communication Failure — Timeout during inter-branch stock transfer",
        scenarioDescription:
          "Network drops while transferring 20 units from Central DC to Store 02.",
        expectedUiState: "Recoverable error preserves transfer list; atomic lock prevents source deduction without destination credit.",
        givenWhenThen: "Given network failure mid-transfer, Then atomic rollback preserves source stock and lets user retry.",
        recommendedCriticality: "essential",
      },
      {
        id: "inv-qa-4",
        category: "unauthorized_user",
        title: "Unauthorized User — Branch 01 user editing Branch 02 warehouse",
        scenarioDescription:
          "Operator tries adjusting stock in an unassigned branch or above tier ceiling.",
        expectedUiState: "Blocked cleanly or routed to approval queue explaining permission boundary.",
        givenWhenThen: "Given user outside target branch scope, When editing balance, Then API returns 403 and UI surfaces rule.",
        recommendedCriticality: "essential",
      },
      {
        id: "inv-qa-5",
        category: "inconsistent_data",
        title: "Inconsistent Data — Transfer exceeding unreserved free stock",
        scenarioDescription:
          "Physical stock is 10, 7 reserved in sales orders; clerk requests transferring 6.",
        expectedUiState: "UI reveals breakdown '10 Physical / 7 Reserved = 3 Free' explaining why 6 cannot leave.",
        givenWhenThen: "When requested transfer > free balance, Then UI displays reservation conflict clearly.",
        recommendedCriticality: "recommended",
      },
      {
        id: "inv-qa-6",
        category: "duplicate_operation",
        title: "Duplicate Operation — Re-submitting identical cycle count batch",
        scenarioDescription:
          "Same count sheet submitted twice consecutively.",
        expectedUiState: "Idempotent batch key prevents double variance posting.",
        givenWhenThen: "Given already-committed sheet ID, When posted twice, Then duplicate delta is rejected safely.",
        recommendedCriticality: "recommended",
      },
    ],
    referenceStrategy: {
      recommendedProblemIds: ["inv-p1", "inv-p2", "inv-p4"],
      title: "Clear Balance States, Mandatory Links, and Legible Movement History",
      summary:
        "Separating stock states (P-01), enforcing auditable document links/reasons (P-02), and humanizing the movement timeline (P-04) restores daily trust rapidly before deeper permission hardening.",
      reasoning: [
        "P-04 brings immediate comprehension gains across store and warehouse staff at low cost.",
        "P-01 and P-02 attack core inventory trust and compliance exposure.",
        "P-03 and P-05 harden branch governance and omnichannel origin tracing.",
      ],
    },
    relatedCaseSlug: "erp-enterprise-redesign",
    relatedCaseLabel: "Open Real ERP Case [01] (NDA-Safe)",
  },

  // =========================================================================
  // SCENARIO 03 — COMMERCIAL CRM: Unfollowed B2B opportunities
  // =========================================================================
  {
    id: "crm-stalled-opportunities",
    code: "DL-03",
    domain: "B2B SaaS & Commercial CRM",
    originTag: "Didactic Scenario • B2B CRM",
    name: "Unfollowed sales opportunities in B2B CRM",
    dilemma:
      "How to give B2B reps fast daily momentum while ensuring leads have owners, interactions stay recorded, and opportunities maintain next actions without bureaucratic bloat?",
    businessContext: {
      overview:
        "A B2B sales team uses a CRM across Kanban pipelines, inbound leads, and follow-up tasks. Without clear ownership rules and next-step cues, active deals go cold quietly.",
      operationScale:
        "Consultative B2B sales org • Multi-channel intake (Inbound, WhatsApp, Outbound) • Multi-touch deal cycles",
      stakeholders: [
        "Consultative Sales Rep / Inside Sales",
        "Sales Manager",
        "Marketing / SDR",
        "B2B Buyer",
      ],
      constraints: [
        "Heavy post-call forms push reps back to personal spreadsheets and private chat apps",
        "Managers need reliable forecast health before end-of-month surprises",
        "Opening the CRM must answer who to contact next in seconds",
      ],
      keyMetricsWatch: [
        "Active deals missing a next action",
        "Days stagnant per pipeline stage",
        "Time from inbound lead to first contact",
      ],
    },
    problems: [
      {
        id: "crm-p1",
        code: "P-01",
        title: "Leads with no assigned owner",
        symptom:
          "Inbound leads land in a shared pool without clear owner assignment or first-response SLA.",
        userImpactDetail:
          "Reps assume someone else grabbed the lead or accidentally double-call prospects.",
        operationalImpactDetail:
          "Warm B2B inquiries cool off before receiving a reply.",
        evidenceCue: "New leads wait hours in Stage 1 without named ownership.",
        scores: {
          userImpact: 4,
          operationalImpact: 5,
          frequency: 4,
          businessRisk: 5,
          implementationEffort: 3,
        },
        alternatives: [
          {
            id: "crm-p1-a",
            label: "A",
            title: "Rule-based round-robin assignment + SLA timer with reassignment fallback",
            description:
              "Auto-assign leads by segment/availability with a response timer; untouched leads reroute automatically.",
            expectedBenefit:
              "Eliminates orphan leads immediately without requiring manual manager sorting.",
            limitation: "Needs clean out-of-office / availability flags per rep.",
            userImpact: "Rep receives actionable alert with one-click call/message start.",
            operationalImpact: "Closes dead windows on fresh inbound demand.",
            estimatedComplexity: "Medium",
            dependencies: ["Round-robin routing rules", "SLA timer"],
            consequenceAnalysis:
              "Automated routing paired with timeout rerouting secures response speed cleanly once team availability rules exist.",
            tradeOffShift: {
              speedVsValidation: 1,
              flexibilityVsControl: -1,
              simplicityVsDensity: 1,
              autonomyVsGovernance: -1,
              easeVsTraceability: -1,
            },
            isReferenceChoice: true,
          },
          {
            id: "crm-p1-b",
            label: "B",
            title: "Open claim pool ('First to click wins')",
            description:
              "Dump leads into a common feed where whoever claims first owns the account.",
            expectedBenefit: "Simple setup and fast reactions on easy leads.",
            limitation: "Complex or smaller accounts get ignored while easy leads spark cherry-picking.",
            userImpact: "Rewards constant page refreshing rather than balanced prep.",
            operationalImpact: "Leaves less obvious accounts uncontacted.",
            estimatedComplexity: "Low",
            dependencies: ["Unassigned queue filter"],
            consequenceAnalysis:
              "Open queues look lightweight yet consistently produce cherry-picking and forgotten segments.",
            tradeOffShift: {
              speedVsValidation: 2,
              flexibilityVsControl: 2,
              simplicityVsDensity: 2,
              autonomyVsGovernance: 2,
              easeVsTraceability: 1,
            },
          },
        ],
      },
      {
        id: "crm-p2",
        code: "P-02",
        title: "Stalled opportunities",
        symptom:
          "Deals sit untouched for weeks in Proposal or Negotiation stages with no SLA warning.",
        userImpactDetail:
          "Silent aged cards blend seamlessly with active deals.",
        operationalImpactDetail:
          "Inflates pipeline forecast with dead opportunities.",
        evidenceCue: "Cards untouched > 5–7 days show identical visual priority to fresh leads.",
        scores: {
          userImpact: 4,
          operationalImpact: 5,
          frequency: 5,
          businessRisk: 5,
          implementationEffort: 2,
        },
        alternatives: [
          {
            id: "crm-p2-a",
            label: "A",
            title: "Stage-aware SLA aging indicators + daily rescue queue",
            description:
              "Track idle days per stage expectations, tint aging cards amber/red, and surface overdue follow-ups in the daily agenda.",
            expectedBenefit:
              "Makes stagnation unmistakable without blocking Kanban flexibility.",
            limitation: "Requires tuning distinct SLA windows for fast vs consultative stages.",
            userImpact: "Highlights deals needing attention in a glance.",
            operationalImpact: "Grounds sales forecasts in real activity.",
            estimatedComplexity: "Low",
            dependencies: ["Stage idle timer", "Visual warning badge"],
            consequenceAnalysis:
              "Gradual aging indicators surface real risk early without forcing unnatural automations.",
            tradeOffShift: {
              speedVsValidation: 0,
              flexibilityVsControl: -1,
              simplicityVsDensity: 0,
              autonomyVsGovernance: -1,
              easeVsTraceability: -1,
            },
            isReferenceChoice: true,
          },
          {
            id: "crm-p2-b",
            label: "B",
            title: "Auto-close any untouched deal as 'Lost' after 7 days",
            description:
              "Automatically archive deals lacking logged activity within one week.",
            expectedBenefit: "Enforces a mathematically tidy pipeline.",
            limitation: "Real B2B procurement approvals often take over 7 days between touches.",
            userImpact: "Frustrates reps when active deals disappear mid-negotiation.",
            operationalImpact: "Encourages fake 'ping' logs to beat the timer.",
            estimatedComplexity: "Medium",
            dependencies: ["Scheduled auto-close job"],
            consequenceAnalysis:
              "Punitive auto-closing often prompts gaming the metric rather than genuine follow-up.",
            tradeOffShift: {
              speedVsValidation: -2,
              flexibilityVsControl: -2,
              simplicityVsDensity: 1,
              autonomyVsGovernance: -2,
              easeVsTraceability: -1,
            },
          },
        ],
      },
      {
        id: "crm-p3",
        code: "P-03",
        title: "Missing interaction history",
        symptom:
          "Calls and WhatsApp negotiations stay outside the CRM timeline, causing context loss.",
        userImpactDetail:
          "Handing over accounts or resuming stalled deals forces reps to dig through old chat threads.",
        operationalImpactDetail:
          "Makes the company appear disorganized to repeat enterprise buyers.",
        evidenceCue: "Late-stage cards have empty chronological timelines.",
        scores: {
          userImpact: 4,
          operationalImpact: 4,
          frequency: 5,
          businessRisk: 4,
          implementationEffort: 3,
        },
        alternatives: [
          {
            id: "crm-p3-a",
            label: "A",
            title: "Side 360° Drawer with 1-click outcome log + message templates",
            description:
              "Let reps log call/WhatsApp outcomes via quick buttons directly inside the drawer without leaving the pipeline view.",
            expectedBenefit:
              "Minimizes logging friction enough to sustain real daily adoption.",
            limitation: "External personal chats still rely on rep habit unless synced.",
            userImpact: "Logs key context in seconds without context switching.",
            operationalImpact: "Preserves institutional account memory.",
            estimatedComplexity: "Medium",
            dependencies: ["360° contextual drawer", "Quick outcome logger"],
            consequenceAnalysis:
              "Making logging effortless preserves real timeline context far better than punitive long forms.",
            tradeOffShift: {
              speedVsValidation: 1,
              flexibilityVsControl: 0,
              simplicityVsDensity: 0,
              autonomyVsGovernance: 0,
              easeVsTraceability: -1,
            },
            isReferenceChoice: true,
          },
          {
            id: "crm-p3-b",
            label: "B",
            title: "Mandatory 6-field recap form after every interaction",
            description:
              "Force full competitor, objection, summary, and next-step forms on every call.",
            expectedBenefit: "Rich structured fields whenever completed.",
            limitation: "Busy reps stop logging calls inside the CRM altogether.",
            userImpact: "Feels punitive after back-to-back calls.",
            operationalImpact: "Drives data into private notes.",
            estimatedComplexity: "Low",
            dependencies: ["Blocking recap dialog"],
            consequenceAnalysis:
              "Heavy mandatory forms typically backfire by lowering total logged engagement.",
            tradeOffShift: {
              speedVsValidation: -2,
              flexibilityVsControl: -2,
              simplicityVsDensity: -1,
              autonomyVsGovernance: -2,
              easeVsTraceability: -1,
            },
          },
        ],
      },
      {
        id: "crm-p4",
        code: "P-04",
        title: "Missing next action",
        symptom:
          "Deals move forward without scheduling what happens next or when to follow up.",
        userImpactDetail:
          "Each morning starts with manual scanning across dozens of cards.",
        operationalImpactDetail:
          "Opportunities drop passively instead of closing win or loss cleanly.",
        evidenceCue: "Active cards frequently lack a future dated task.",
        scores: {
          userImpact: 5,
          operationalImpact: 5,
          frequency: 5,
          businessRisk: 5,
          implementationEffort: 2,
        },
        alternatives: [
          {
            id: "crm-p4-a",
            label: "A",
            title: "Visible 'Next Action' badge + 1-click follow-up chips (+1d, +3d, +7d)",
            description:
              "Surface next step prominently on every Kanban card and prompt quick scheduling right after logging an interaction.",
            expectedBenefit:
              "Turns open pipelines into clear daily execution with under-3-second scheduling.",
            limitation: "Needs lightweight weekly cleanup for occasional skipped cards.",
            userImpact: "Clear daily checklist without annoying drag-and-drop locks.",
            operationalImpact: "Sustains continuous deal momentum.",
            estimatedComplexity: "Low",
            dependencies: ["Kanban NextAction pill", "Quick follow-up date chips"],
            consequenceAnalysis:
              "Combining clear visual cues with one-click scheduling preserves speed while eliminating forgotten deals.",
            tradeOffShift: {
              speedVsValidation: 0,
              flexibilityVsControl: -1,
              simplicityVsDensity: 0,
              autonomyVsGovernance: -1,
              easeVsTraceability: -1,
            },
            isReferenceChoice: true,
          },
          {
            id: "crm-p4-b",
            label: "B",
            title: "Hard-lock Kanban drag-and-drop until a calendar event is created",
            description:
              "Prevent moving cards between columns unless a future task is stored first.",
            expectedBenefit: "100% of moved cards carry a scheduled task.",
            limitation: "Triggers fake placeholder dates during quick pipeline cleanups.",
            userImpact: "Interrupts fast pipeline triage.",
            operationalImpact: "Clutters calendars with artificial tasks.",
            estimatedComplexity: "Low",
            dependencies: ["Drag guard"],
            consequenceAnalysis:
              "Hard drag locks optimize formal compliance at the cost of noisy placeholder dates.",
            tradeOffShift: {
              speedVsValidation: -2,
              flexibilityVsControl: -2,
              simplicityVsDensity: 1,
              autonomyVsGovernance: -2,
              easeVsTraceability: -1,
            },
          },
        ],
      },
      {
        id: "crm-p5",
        code: "P-05",
        title: "Prioritization difficulty",
        symptom:
          "Flat 40-deal lists treat cold leads and late-stage closing quotes identically.",
        userImpactDetail:
          "Reps burn morning hours on low-yield inquiries while closing quotes wait.",
        operationalImpactDetail:
          "Reduces overall win efficiency across the pipeline.",
        evidenceCue: "Cards ordered strictly by creation timestamp.",
        scores: {
          userImpact: 4,
          operationalImpact: 4,
          frequency: 4,
          businessRisk: 4,
          implementationEffort: 3,
        },
        alternatives: [
          {
            id: "crm-p5-a",
            label: "A",
            title: "'My Day / Priority' view combining SLA urgency, stage, and deal value",
            description:
              "Add an explainable daily priority queue sorting overdue follow-ups and late-stage deals with visible reason tags.",
            expectedBenefit: "Guides daily call sequences transparently alongside Kanban.",
            limitation: "Sorting criteria must remain visible so reps trust why deals rank first.",
            userImpact: "Removes guesswork on who to call first every morning.",
            operationalImpact: "Protects high-probability closing opportunities.",
            estimatedComplexity: "Medium",
            dependencies: ["Transparent priority sort presets"],
            consequenceAnalysis:
              "Transparent priority criteria empower reps without creating an opaque black-box score.",
            tradeOffShift: {
              speedVsValidation: 1,
              flexibilityVsControl: 0,
              simplicityVsDensity: 0,
              autonomyVsGovernance: 0,
              easeVsTraceability: -1,
            },
            isReferenceChoice: true,
          },
          {
            id: "crm-p5-b",
            label: "B",
            title: "Sort strictly by deal monetary value",
            description:
              "Pin largest deals at the top of every list regardless of stage or timing.",
            expectedBenefit: "Focuses attention on big contracts.",
            limitation: "Fast-closing mid-tier deals or urgent SLA deadlines sink out of view.",
            userImpact: "Misses timing urgency.",
            operationalImpact: "Hurts steady monthly conversion velocity.",
            estimatedComplexity: "Low",
            dependencies: ["Sort by value desc"],
            consequenceAnalysis:
              "Sorting solely by deal size overlooks readiness-to-buy and SLA urgency.",
            tradeOffShift: {
              speedVsValidation: 1,
              flexibilityVsControl: 1,
              simplicityVsDensity: 2,
              autonomyVsGovernance: 1,
              easeVsTraceability: 1,
            },
          },
        ],
      },
    ],
    tradeOffAxes: [
      {
        id: "speedVsValidation",
        leftPole: "Mandatory Data Entry",
        rightPole: "Rep Selling Speed",
        criteriaNote: "Balancing structured CRM data with frictionless daily execution.",
      },
      {
        id: "flexibilityVsControl",
        leftPole: "Hard Pipeline Locks",
        rightPole: "Kanban Flexibility",
        criteriaNote: "Whether stage moves require hard gates or light prompts.",
      },
      {
        id: "simplicityVsDensity",
        leftPole: "Signal-Rich Cards",
        rightPole: "Minimal Card UI",
        criteriaNote: "Displaying SLA, next action, and value without clutter.",
      },
      {
        id: "autonomyVsGovernance",
        leftPole: "Automated SLA Routing",
        rightPole: "Rep Autonomy",
        criteriaNote: "Auto-rerouting untouched leads vs free queue management.",
      },
      {
        id: "easeVsTraceability",
        leftPole: "Complete 360° Timeline",
        rightPole: "Zero-Log Shortcut",
        criteriaNote: "Preserving account memory with minimal click overhead.",
      },
    ],
    qaScenarios: [
      {
        id: "crm-qa-1",
        category: "normal_operation",
        title: "Normal Operation — Owner assigned, call logged, next action scheduled",
        scenarioDescription:
          "Rep picks up assigned lead, logs call outcome in 360° drawer, and sets +2d follow-up.",
        expectedUiState: "Timeline updates immediately and Kanban card highlights next action date.",
        givenWhenThen: "Given owned lead, When outcome logged and follow-up picked, Then SLA resets cleanly.",
        recommendedCriticality: "essential",
      },
      {
        id: "crm-qa-2",
        category: "missing_required",
        title: "Missing Required Field — Moving deal to Lost without categorized reason",
        scenarioDescription:
          "Rep moves card to Lost without choosing Price, Competitor, or Timing reason.",
        expectedUiState: "Loss modal blocks submit and returns card cleanly if canceled.",
        givenWhenThen: "When deal enters Lost without reason, Then confirmation stays locked until reason chosen.",
        recommendedCriticality: "essential",
      },
      {
        id: "crm-qa-3",
        category: "communication_failure",
        title: "Communication Failure — Network timeout while saving meeting notes",
        scenarioDescription:
          "Connection drops as rep saves detailed notes inside Drawer 360°.",
        expectedUiState: "Typed note content remains intact with clear Retry button.",
        givenWhenThen: "Given API error saving note, Then UI preserves draft text and offers manual retry.",
        recommendedCriticality: "essential",
      },
      {
        id: "crm-qa-4",
        category: "unauthorized_user",
        title: "Unauthorized User — Non-manager reassigning colleague deal",
        scenarioDescription:
          "Standard rep attempts deleting timeline entries or transferring colleague opportunities.",
        expectedUiState: "Restricted controls hidden/guarded cleanly preserving audit trail.",
        givenWhenThen: "Given standard rep role, When deleting audit log, Then action is blocked.",
        recommendedCriticality: "recommended",
      },
      {
        id: "crm-qa-5",
        category: "inconsistent_data",
        title: "Inconsistent Data — Follow-up scheduled on a past date",
        scenarioDescription:
          "User accidentally picks yesterday while scheduling next step.",
        expectedUiState: "Inline validation warns before creating overdue task.",
        givenWhenThen: "When follow-up date < today, Then inline hint prevents invalid save.",
        recommendedCriticality: "recommended",
      },
      {
        id: "crm-qa-6",
        category: "duplicate_operation",
        title: "Duplicate Operation — Creating lead for already-active company",
        scenarioDescription:
          "Second inbound submission shares email/Tax ID of an active deal.",
        expectedUiState: "System flags active match and links directly to the ongoing opportunity.",
        givenWhenThen: "Given active deal sharing email/tax ID, Then UI offers jump to existing record.",
        recommendedCriticality: "essential",
      },
    ],
    referenceStrategy: {
      recommendedProblemIds: ["crm-p4", "crm-p2", "crm-p3"],
      title: "Clear Next Actions, Stage SLA Aging, and Low-Friction Logging",
      summary:
        "Pairing prominent Next Action prompts (P-04), stage SLA indicators (P-02), and fast 360° Drawer logging (P-03) addresses deal abandonment directly without bogging down sellers.",
      reasoning: [
        "P-04 and P-02 turn the Kanban board into an active daily execution surface.",
        "P-03 preserves timeline continuity through minimal-click logging.",
        "P-01 and P-05 scale fairness and focus as inbound lead volume expands.",
      ],
    },
    relatedCaseSlug: "flow-crm-b2b",
    relatedCaseLabel: "Open Authorial Study: Case 02 Flow CRM",
  },
];
