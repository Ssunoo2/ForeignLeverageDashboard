# Data Sources Guide

This file lists potential sources for scoring countries. It is not exhaustive. The goal is to help the LLM, Python scripts, and human reviewer use consistent source quality standards.

---

# Source Reliability Tiers

## Tier 1 — Primary / Institutional Sources
Use these whenever possible.

- National government websites
- Immigration ministry websites
- Tax authority websites
- Central bank websites
- National statistics offices
- World Bank
- IMF
- OECD
- United Nations agencies
- WHO
- IEA
- FAO
- IPCC
- Official climate filings and national adaptation plans

## Tier 2 — Reputable Research / Index Sources
Good for comparative rankings and context.

- World Bank Governance Indicators
- Transparency International
- Freedom House
- Reporters Without Borders
- ND-GAIN Country Index
- World Justice Project
- Global Peace Index
- UNODC
- International SOS or similar risk maps if available
- Reputable university/research institute reports

## Tier 3 — Reputable Media / Analyst Sources
Useful for current events, reform momentum, political risk, and local developments.

- Reuters
- Associated Press
- Financial Times
- The Economist
- Bloomberg
- Local reputable newspapers
- Major consulting or risk firms, clearly labeled

## Tier 4 — Soft Sentiment / Anecdotal Sources
Useful but should not drive scores alone.

- Numbeo
- Expatistan
- Expat forums
- Reddit
- YouTube relocation channels
- Real estate agent blogs
- Nomad blogs
- Personal trip reports

---

# Category-to-Source Mapping

## Legal Residency and Immigration
Preferred sources:
- Official immigration ministry
- Embassy/consulate websites
- Official visa portals
- Government gazettes or legal updates

Soft sources:
- Immigration law firms
- Expat forums
- Relocation consultants

Caution:
- Visa rules change frequently. Always verify against official sources.

## Tax System and Wealth Treatment
Preferred sources:
- National tax authority
- Tax treaty documents
- Official expat tax guides
- Big Four accounting summaries, if recent

Soft sources:
- Tax attorney blogs
- Expat tax firms

Caution:
- U.S. citizens have special reporting and taxation issues. Local tax friendliness does not eliminate U.S. obligations.

## Cost of Living
Preferred sources:
- Local rental listings
- Grocery chain websites
- Utility providers
- Local transport agencies

Soft sources:
- Numbeo
- Expatistan
- Reddit/expat forums

Caution:
- Cost varies massively by city, lifestyle, and imported-good dependence.

## Currency and Banking
Preferred sources:
- Central bank
- IMF
- World Bank
- Inflation data from national statistics office
- Major bank reports

Soft sources:
- Local financial press
- Expat banking experiences

Caution:
- Capital controls and bank access can change quickly during crises.

## Economy and Opportunity
Preferred sources:
- World Bank
- IMF
- OECD
- National statistics office
- Central bank
- Trade ministry

Soft sources:
- Reputable analyst reports
- Local business press

Caution:
- High GDP growth does not automatically mean good personal opportunity.

## Climate Resilience
Preferred sources:
- World Bank Climate Knowledge Portal
- IPCC regional reports
- ND-GAIN
- National adaptation plans
- National meteorological agencies

Soft sources:
- Insurance trends
- Local reporting on drought/flood/fire

Caution:
- Climate varies regionally. Country-level averages can mislead.

## Food, Water, and Energy Security
Preferred sources:
- FAO
- IEA
- World Bank
- National energy ministry
- Agriculture ministry
- Water agencies

Soft sources:
- Commodity analyst reports
- Local press on shortages

Caution:
- Resource production does not always mean domestic affordability or equitable access.

## Safety and Crime
Preferred sources:
- UNODC
- National crime statistics
- Local police data
- U.S. State Department advisories

Soft sources:
- Expat forums
- Local city groups
- Numbeo safety data

Caution:
- Crime statistics may be underreported or politically manipulated.

## Healthcare
Preferred sources:
- WHO
- OECD health data
- National health ministry
- Private hospital networks
- Insurance provider data

Soft sources:
- Medical tourism guides
- Expat reports

Caution:
- National healthcare rankings may not reflect access for foreigners.

## Infrastructure
Preferred sources:
- World Bank infrastructure indicators
- Speedtest/global internet reports
- National utility providers
- Airport and transport authorities

Soft sources:
- Local forums and user reports

Caution:
- Major cities may be excellent while rural areas are weak.

## Property Rights
Preferred sources:
- Land registry
- Foreign ownership laws
- World Justice Project
- World Bank property/business indicators
- Local legal firms

Soft sources:
- Real estate brokers
- Expat property forums

Caution:
- Real estate agents have a conflict of interest.

## Civil Liberties and Digital Freedom
Preferred sources:
- Freedom House
- Reporters Without Borders
- Access Now
- Electronic Frontier Foundation where applicable
- Local legislation

Soft sources:
- Local journalist reports
- VPN and digital rights communities

Caution:
- Formal rights may not match enforcement.

---

# Data Freshness Rules

Use these rough freshness expectations:

| Data Type | Freshness Target |
|---|---|
| Immigration rules | 0–6 months |
| Tax rules | 0–12 months |
| Inflation/currency | 0–3 months |
| Political risk | 0–6 months |
| Crime | 0–24 months |
| Climate projections | 0–5 years |
| Healthcare system structure | 0–3 years |
| Cost of living | 0–6 months |
| Property law | 0–12 months |
| Infrastructure | 0–24 months |

---

# Source Notes Format

When adding sources to country JSON files, use this shape:

```json
{
  "label": "Inflation rate",
  "value": "Approximate value or qualitative summary",
  "source": "IMF World Economic Outlook",
  "source_tier": "Tier 1",
  "date_accessed": "2026-06-01",
  "notes": "Use latest available estimate; verify before publishing."
}
```

---

# Red Flags

Be skeptical when:

- A country is promoted mostly by relocation influencers.
- Real estate agents are the main source of optimism.
- Residency is described as easy but official sources are unclear.
- Cost-of-living claims ignore imported goods and healthcare.
- Political reform depends entirely on one leader.
- The country has a history of capital controls but people say “this time is different.”
- Foreigners are rapidly pricing locals out of housing.
- A country is framed as a climate haven without discussing water, fire, insurance, or grid stress.
