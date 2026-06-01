# Country Relocation Scoring Rubric

This rubric converts the relocation framework into scoreable categories for a dashboard, LLM workflow, or future API-assisted evaluator.

## Core Scoring Scale

Use a 0–10 score for each category.

| Score Range | Meaning |
|---|---|
| 0–2 | Severe weakness, major risk, or functionally unusable for relocation planning. |
| 3–4 | Below average, risky, difficult, or highly conditional. |
| 5–6 | Mixed or acceptable; usable with caveats. |
| 7–8 | Strong; generally favorable with manageable weaknesses. |
| 9–10 | Exceptional; unusually strong, resilient, or strategically valuable. |

## Confidence Scale

Each category score must include a confidence level.

| Confidence | Meaning |
|---|---|
| High | Supported by recent, credible data and consistent qualitative evidence. |
| Medium | Supported by reasonable evidence but with uncertainty, regional variation, or dated data. |
| Low | Sparse data, conflicting evidence, fast-changing conditions, or heavy reliance on subjective judgment. |

## General Scoring Rules

- Do not score from vibes alone.
- Do not use a single statistic as the entire basis for a score.
- Distinguish national-level conditions from city/region-level conditions.
- Mention when a country is good for one profile but bad for another.
- Penalize countries where foreigners cannot practically live, bank, own property, or exit capital.
- Penalize data uncertainty by lowering confidence, not necessarily by lowering the score.
- If current information is required, mark the category as requiring fresh research.

---

# Category Rubrics

## legal_residency — Legal Residency and Immigration

### Purpose
Evaluate whether a well-educated American can legally enter, stay, renew status, and potentially acquire permanent residency or citizenship.

### Suggested Metrics
- Tourist visa length
- Digital nomad visa availability
- Investor or entrepreneur visa availability
- Retirement or passive-income visa availability
- Minimum income or investment requirements
- Renewal complexity
- Permanent residency timeline
- Citizenship timeline
- Dual citizenship rules
- Background check and document burden
- Political direction of immigration rules

### Score Guide
- 0–2: No realistic long-term pathway, hostile rules, or severe administrative barriers.
- 3–4: Possible but expensive, unstable, restrictive, or highly bureaucratic.
- 5–6: Usable pathways exist but require planning, money, or frequent renewals.
- 7–8: Clear, achievable residency pathways for remote workers, investors, retirees, or skilled workers.
- 9–10: Very accessible, stable, and attractive residency/citizenship pathways with low friction.

### Required Notes
- Best pathway for a U.S. citizen
- Renewal risks
- Path to permanent residency or citizenship
- Whether the country is becoming more or less open to foreigners

---

## tax_treatment — Tax System and Wealth Treatment

### Purpose
Evaluate tax predictability, burden, and compatibility with U.S. citizen taxation.

### Suggested Metrics
- Personal income tax
- Capital gains tax
- Wealth tax
- Estate/inheritance tax
- Corporate tax
- VAT/sales tax
- Territorial vs worldwide taxation
- Special expat regimes
- Tax treaty with the U.S.
- Banking difficulty for Americans due to FATCA
- Local reporting complexity

### Score Guide
- 0–2: Confiscatory, unpredictable, highly complex, or hostile to foreign residents/capital.
- 3–4: High taxes or high uncertainty; major compliance burden.
- 5–6: Manageable but requires professional advice and careful structuring.
- 7–8: Favorable or predictable system for foreigners, entrepreneurs, or remote workers.
- 9–10: Very favorable, stable, and low-friction tax environment.

### Required Notes
- Interaction with U.S. worldwide taxation
- Whether local banks work with U.S. citizens
- Risk of future tax increases on foreigners

---

## cost_of_living — Cost of Living vs U.S.

### Purpose
Evaluate quality of life per dollar relative to major U.S. metro areas.

### Suggested Metrics
- Rent for safe, comfortable housing
- Property purchase cost
- Food and groceries
- Utilities
- Internet and mobile data
- Transportation
- Healthcare cost
- Domestic help and services
- Imported goods premium
- Electronics and business supplies
- Schooling or childcare if applicable

### Score Guide
- 0–2: More expensive than the U.S. without compensating quality.
- 3–4: Expensive relative to local wages and not meaningfully cheaper than the U.S.
- 5–6: Mixed; some savings but American comforts may be costly.
- 7–8: Meaningfully cheaper than the U.S. with good lifestyle quality.
- 9–10: Very high quality of life per dollar, especially for USD earners.

### Required Notes
- Whether savings require living outside elite expat areas
- Cost of imported goods
- Currency effect if earning USD

---

## currency_banking — Currency and Banking Stability

### Purpose
Evaluate whether money can be held, converted, transferred, and protected without excessive risk.

### Suggested Metrics
- Inflation
- Currency depreciation history
- Capital controls
- Parallel exchange rates
- Ease of opening bank accounts
- Banking system strength
- Deposit insurance
- Wire transfer reliability
- Card and ATM access
- Foreign exchange availability
- Crypto friendliness or hostility

### Score Guide
- 0–2: Severe monetary instability, capital controls, trapped capital, or unreliable banks.
- 3–4: High inflation, weak currency, difficult banking, or serious transfer risk.
- 5–6: Usable but requires caution, USD buffers, or offshore banking.
- 7–8: Generally stable and functional banking/currency environment.
- 9–10: Highly stable currency, strong banks, easy convertibility, low capital-control risk.

### Required Notes
- Can foreigners open accounts?
- Can Americans open accounts?
- Can capital exit cleanly?
- History of emergency controls

---

## economy_opportunity — Economy and Opportunity

### Purpose
Evaluate whether the country is improving, stagnating, or declining and whether it offers business/investment upside.

### Suggested Metrics
- GDP growth
- Inflation trend
- Debt burden
- Foreign reserves
- Unemployment
- Business formation ease
- Reform momentum
- Foreign direct investment
- Key growth sectors
- Talent availability
- Local purchasing power
- Resource endowment

### Score Guide
- 0–2: Crisis economy, shrinking opportunity, severe instability.
- 3–4: Weak economy with limited opportunity and high risk.
- 5–6: Mixed economy with pockets of opportunity.
- 7–8: Strong or improving economy with meaningful opportunities.
- 9–10: Exceptional growth, reform, investment, or strategic economic upside.

### Required Notes
- Main opportunity thesis
- Main macroeconomic risk
- Whether upside is stable or speculative

---

## income_portability — Employment and Income Portability

### Purpose
Evaluate whether a foreign resident can earn, work remotely, start a business, or access local opportunities.

### Suggested Metrics
- Time zone compatibility with U.S.
- Internet reliability
- Local job market for skilled workers
- Remote-work legality
- Local wage levels
- Business formation ease
- Availability of local talent
- Payment processor access
- Shipping/logistics for online businesses
- English business usability

### Score Guide
- 0–2: Hard to work legally or practically; weak internet or severe business friction.
- 3–4: Possible but constrained by language, laws, local wages, or infrastructure.
- 5–6: Usable for remote income but weaker for local work or business.
- 7–8: Strong for remote workers, entrepreneurs, or skilled professionals.
- 9–10: Excellent income portability, strong digital/business infrastructure, and good legal fit.

### Required Notes
- Best income model: remote job, business, local job, investment, or retirement
- Payment and banking issues
- Time zone fit

---

## climate_resilience — Climate and Climate Change Resilience

### Purpose
Evaluate whether the country is likely to remain livable, productive, insurable, and adaptable over 10–30 years.

### Suggested Metrics
- Heat exposure
- Wet-bulb/humidity risk
- Drought risk
- Flood risk
- Wildfire risk
- Sea-level rise exposure
- Storm/cyclone exposure
- Freshwater availability
- Agricultural resilience
- Grid stress from cooling/heating
- Adaptation capacity

### Score Guide
- 0–2: Severe climate exposure with weak adaptation capacity.
- 3–4: Significant risks that may impair livability or productivity.
- 5–6: Mixed profile with regional variation and manageable risks.
- 7–8: Generally favorable outlook with localized risks.
- 9–10: Strong long-term climate resilience, water security, low disaster risk, and adaptation capacity.

### Required Notes
- Best and worst regions within the country
- 10-year outlook
- 30-year outlook
- Insurance and adaptation caveats

---

## food_water_energy — Food, Water, and Energy Security

### Purpose
Evaluate whether the country can feed, water, and power itself under stress.

### Suggested Metrics
- Food production vs population
- Agricultural land quality
- Water availability
- Aquifers/rivers/lakes
- Drought exposure
- Energy import dependence
- Oil/gas/coal/hydro/nuclear/renewables
- Grid reliability
- Fuel shortage risk
- Strategic minerals

### Score Guide
- 0–2: High dependence on imports and severe water/energy vulnerability.
- 3–4: Meaningful resource constraints or import exposure.
- 5–6: Mixed; secure in some resources but vulnerable in others.
- 7–8: Strong food/water/energy profile with manageable weaknesses.
- 9–10: Highly resource-secure and strategically valuable.

### Required Notes
- Can the country feed itself?
- Can it power itself?
- Are resources exportable and strategically important?

---

## geopolitical_risk — Geopolitical Risk and International Relations

### Purpose
Evaluate exposure to war, sanctions, chokepoints, border disputes, and great-power rivalry.

### Suggested Metrics
- Proximity to conflict zones
- Border disputes
- Great-power rivalry exposure
- Military alliances
- Sanctions exposure
- Trade dependence
- Strategic chokepoints
- Anti-American risk
- Diplomatic flexibility
- Neutrality or alignment

### Score Guide
- 0–2: High risk of war, sanctions, invasion, or severe geopolitical disruption.
- 3–4: Meaningful geopolitical exposure or dangerous neighborhood.
- 5–6: Mixed; some strategic exposure but manageable.
- 7–8: Relatively insulated and diplomatically flexible.
- 9–10: Highly insulated, peaceful, and strategically non-central.

### Required Notes
- External threats
- Sanctions risk
- Relationship with U.S., China, EU, and neighbors

---

## political_stability — Domestic Political Stability

### Purpose
Evaluate whether institutions, policies, and governance are likely to remain stable enough for long-term living and investment.

### Suggested Metrics
- Government turnover
- Protest frequency
- Coup history
- Policy continuity
- Judicial independence
- Corruption
- Institutional trust
- Regulatory predictability
- Treatment of foreigners

### Score Guide
- 0–2: Severe instability, coups, arbitrary policy, or state breakdown risk.
- 3–4: High volatility or weak institutions.
- 5–6: Mixed; generally functional but with policy swings or corruption.
- 7–8: Stable institutions and predictable policy environment.
- 9–10: Very strong, durable, and trusted institutions.

### Required Notes
- Current political direction
- Policy durability beyond current leader
- Risk of abrupt rule changes

---

## safety — Safety and Personal Security

### Purpose
Evaluate whether a foreign resident can live normally without excessive personal security burden.

### Suggested Metrics
- Homicide rate
- Robbery/burglary risk
- Kidnapping risk
- Organized crime
- Scams against foreigners
- Police reliability
- Emergency response
- Road safety
- Urban vs rural variation
- Gender-specific safety

### Score Guide
- 0–2: Severe personal security risk or widespread violence.
- 3–4: Significant crime risk requiring major lifestyle changes.
- 5–6: Mixed; safe in some areas, risky in others.
- 7–8: Generally safe with normal precautions.
- 9–10: Very safe by global standards.

### Required Notes
- Safe regions/cities vs risky regions/cities
- Whether foreigners are targeted
- Whether private security/gated living is common

---

## healthcare — Healthcare Quality and Access

### Purpose
Evaluate medical care quality, affordability, and accessibility for foreigners.

### Suggested Metrics
- Public healthcare quality
- Private healthcare quality
- Private insurance cost
- Specialist availability
- Hospital quality
- Emergency care
- Prescription availability
- English-speaking doctors
- Rural vs urban access
- Medical tourism reputation

### Score Guide
- 0–2: Poor access, unreliable care, or severe shortage of competent providers.
- 3–4: Basic care available but serious limitations.
- 5–6: Adequate in major cities; weaker elsewhere.
- 7–8: Good private/public care at manageable cost.
- 9–10: Excellent healthcare quality and access.

### Required Notes
- Best cities for care
- Private vs public system quality
- Suitability for aging or chronic conditions

---

## infrastructure — Infrastructure and Basic Services

### Purpose
Evaluate whether daily life and business are supported by reliable infrastructure.

### Suggested Metrics
- Internet speed and reliability
- Mobile coverage
- Electricity reliability
- Drinking water safety
- Roads
- Airports
- Ports
- Public transit
- Postal/logistics reliability
- Waste management
- Domestic flights

### Score Guide
- 0–2: Severe infrastructure problems that disrupt life or work.
- 3–4: Frequent outages, poor roads, weak logistics, or unreliable utilities.
- 5–6: Mixed; functional in major cities, weaker elsewhere.
- 7–8: Good infrastructure with manageable gaps.
- 9–10: Excellent infrastructure and reliability.

### Required Notes
- Urban/rural difference
- Internet and grid reliability
- Logistics/import friction

---

## property_rights — Housing, Land, and Property Rights

### Purpose
Evaluate whether foreigners can rent, buy, own, defend, insure, and resell property.

### Suggested Metrics
- Foreign ownership rules
- Land registry quality
- Title reliability
- Squatter risk
- Property taxes
- Foreign buyer taxes
- Coastal/border restrictions
- Insurance availability
- Property liquidity
- Construction quality
- Water/mineral/timber rights

### Score Guide
- 0–2: Foreign ownership is restricted, title insecure, or seizure/squatter risk is severe.
- 3–4: Ownership possible but risky or heavily restricted.
- 5–6: Usable property market with caveats.
- 7–8: Strong ownership rights and functional property market.
- 9–10: Very secure, transparent, and liquid property system.

### Required Notes
- Can foreigners own land directly?
- Title and registry reliability
- Any local backlash or restrictions

---

## demographics — Demographics and Social Trajectory

### Purpose
Evaluate population structure, human capital, and social momentum.

### Suggested Metrics
- Median age
- Fertility rate
- Population growth
- Immigration/emigration
- Brain drain or brain gain
- Education levels
- Technical workforce
- Dependency ratio
- Youth optimism
- Social trust

### Score Guide
- 0–2: Severe demographic decline, brain drain, or social fragmentation.
- 3–4: Weak demographic trajectory or talent loss.
- 5–6: Mixed; manageable demographic pressures.
- 7–8: Healthy demographic profile or strong human capital.
- 9–10: Excellent demographic momentum and talent base.

### Required Notes
- Aging vs youth profile
- Brain drain/gain
- Skilled workforce availability

---

## culture_language — Culture, Language, and Social Fit

### Purpose
Evaluate whether an American could realistically integrate, communicate, and enjoy daily life.

### Suggested Metrics
- English proficiency
- Local language difficulty
- Attitudes toward Americans
- Social openness
- Expat community
- Pace of life
- Religious/secular norms
- Work culture
- Dating/family culture
- Pet friendliness
- Lifestyle fit

### Score Guide
- 0–2: Severe cultural or language barriers for most Americans.
- 3–4: Difficult integration without fluency or local family ties.
- 5–6: Manageable but requires adaptation and language learning.
- 7–8: Relatively easy integration or strong expat/local bridge communities.
- 9–10: Very high cultural accessibility and social fit for Americans.

### Required Notes
- English usability
- Expat bubble risk
- Local resentment or welcome

---

## family_suitability — Education and Family Suitability

### Purpose
Evaluate whether the country works for children, spouses, aging parents, and household stability.

### Suggested Metrics
- Public schools
- Private/international schools
- Child safety
- Childcare cost
- Family healthcare
- Parks/recreation
- Homeschool legality
- Special education support
- Family neighborhoods
- Social life for kids

### Score Guide
- 0–2: Poor family suitability, unsafe, or inadequate schools/healthcare.
- 3–4: Viable only for certain families or high budgets.
- 5–6: Adequate with planning and location selection.
- 7–8: Strong family environment.
- 9–10: Excellent family suitability across education, safety, and community.

### Required Notes
- Best family regions/cities
- Schooling options
- Child safety and healthcare

---

## global_connectivity — Transportation and Global Connectivity

### Purpose
Evaluate whether the country is accessible, connected, and easy to leave or visit.

### Suggested Metrics
- Direct flights to U.S.
- Flight cost
- Airport quality
- Regional travel access
- Domestic transportation
- Road safety
- Public transit
- Visa-free travel from residence/citizenship
- Distance from U.S. family/business

### Score Guide
- 0–2: Isolated, expensive, or difficult to enter/exit.
- 3–4: Limited connectivity or high travel friction.
- 5–6: Usable but inconvenient or expensive.
- 7–8: Good regional/global connectivity.
- 9–10: Excellent international and domestic connectivity.

### Required Notes
- Emergency exit practicality
- U.S. flight access
- Domestic mobility

---

## digital_freedom — Technology, Censorship, and Digital Freedom

### Purpose
Evaluate whether internet-dependent work, speech, and online business are practical and safe.

### Suggested Metrics
- Internet censorship
- VPN legality
- Platform blocking
- Surveillance risk
- Data privacy
- Crypto rules
- Payment processor availability
- Startup ecosystem
- Developer community
- Cloud service access

### Score Guide
- 0–2: Heavy censorship or digital restrictions.
- 3–4: Meaningful restrictions or surveillance concerns.
- 5–6: Mostly usable but with privacy/legal caveats.
- 7–8: Open digital environment with good tech access.
- 9–10: Strong digital freedom and excellent tech ecosystem.

### Required Notes
- Any blocked platforms or VPN issues
- Online business practicality
- Payment processor access

---

## civil_liberties — Personal Freedom and Civil Liberties

### Purpose
Evaluate whether the country respects private life, speech, movement, and personal autonomy.

### Suggested Metrics
- Speech freedom
- Press freedom
- Protest rights
- Religious freedom
- Privacy rights
- Police powers
- Emergency power history
- Medical autonomy
- Self-defense laws
- Exit restrictions
- Conscription risk

### Score Guide
- 0–2: Severe restrictions, surveillance, or arbitrary state power.
- 3–4: Significant constraints on speech, privacy, or autonomy.
- 5–6: Mixed freedoms with some sensitive areas.
- 7–8: Generally strong civil liberties.
- 9–10: Exceptional personal freedom and institutional protection.

### Required Notes
- Rights in law vs rights in practice
- Emergency powers history
- Treatment of foreigners

---

## state_capacity — State Capacity and Public Services

### Purpose
Evaluate whether the government can maintain order, build infrastructure, and respond to crises.

### Suggested Metrics
- Administrative competence
- Disaster response
- Public health capacity
- Crime control
- Border control
- Infrastructure delivery
- Tax collection competence
- Corruption control
- Public service reliability

### Score Guide
- 0–2: Weak or failing state capacity.
- 3–4: Serious administrative dysfunction or corruption.
- 5–6: Functional but uneven.
- 7–8: Competent state with manageable inefficiencies.
- 9–10: Highly capable, responsive, and reliable state.

### Required Notes
- Competent-but-overbearing vs weak-but-free distinction
- Crisis response track record

---

## legal_system — Legal System and Dispute Resolution

### Purpose
Evaluate whether contracts, property, disputes, and personal legal matters can be handled fairly.

### Suggested Metrics
- Court speed
- Court corruption
- Contract enforcement
- Arbitration availability
- Foreigner treatment
- Lawyer quality
- Police report reliability
- Marriage/divorce law
- Inheritance law
- Estate planning

### Score Guide
- 0–2: Courts unreliable, corrupt, or inaccessible.
- 3–4: Legal system works poorly or favors connected locals.
- 5–6: Usable with good counsel and caution.
- 7–8: Reliable legal system with reasonable predictability.
- 9–10: Excellent rule of law and dispute resolution.

### Required Notes
- Foreigner-specific risks
- Contract/property dispute reliability
- Estate/inheritance caveats

---

## community_networks — Community and Network Effects

### Purpose
Evaluate whether the country has useful local, expat, entrepreneurial, and professional networks.

### Suggested Metrics
- American/expat community
- Entrepreneur community
- Tech community
- Investor community
- Family/homeschool community
- Religious/cultural groups
- Local business networking
- Long-term expat retention
- Builder vs tourist composition

### Score Guide
- 0–2: Isolated, little community, hard to build networks.
- 3–4: Small or transient communities.
- 5–6: Some useful networks but fragmented.
- 7–8: Strong communities for target profiles.
- 9–10: Excellent network effects with high-agency residents and builders.

### Required Notes
- Who is moving there and why
- Are people staying or passing through?
- Quality of expat/local integration

---

## daily_friction — Quality of Life and Daily Friction

### Purpose
Evaluate whether daily life is smooth, pleasant, and sustainable.

### Suggested Metrics
- Bureaucracy
- Noise
- Pollution
- Cleanliness
- Customer service
- Availability of goods
- Delivery services
- Repairs/tradespeople
- Walkability
- Fitness/nature access
- Food/restaurants
- Pet ownership
- Hobbies and culture

### Score Guide
- 0–2: Daily life is highly frustrating or unreliable.
- 3–4: Frequent friction that requires major patience or money.
- 5–6: Mixed; workable but annoying.
- 7–8: Comfortable daily life with manageable friction.
- 9–10: Very smooth, pleasant, and convenient lifestyle.

### Required Notes
- Problems solvable by money vs structural problems
- Expat area vs normal local life

---

## exit_optionality — Exit Options and Optionality

### Purpose
Evaluate whether living there increases future options rather than trapping the resident.

### Suggested Metrics
- Permanent residency path
- Citizenship path
- Passport value
- Dual citizenship
- Ability to keep U.S. accounts
- Ability to exit capital
- Property liquidity
- Regional mobility
- Business portability
- Emergency evacuation feasibility

### Score Guide
- 0–2: Moving there narrows options or creates trap risk.
- 3–4: Exit is possible but costly, slow, or uncertain.
- 5–6: Reasonable optionality with caveats.
- 7–8: Strong optionality across residency, banking, and mobility.
- 9–10: Excellent legal, financial, and geographic optionality.

### Required Notes
- Does relocation increase or reduce choices?
- Capital exit risk
- Citizenship/passport upside

---

## time_horizon_fit — Time Horizon Fit

### Purpose
Evaluate whether the country fits short, medium, and long-term relocation goals.

### Suggested Metrics
- 3-month test stay suitability
- 1-year remote work base suitability
- 5-year residency plan suitability
- 10-year family plan suitability
- 30-year retirement/climate suitability
- Multi-generational wealth suitability

### Score Guide
- 0–2: Poor fit across most time horizons.
- 3–4: Useful only for short stays or narrow cases.
- 5–6: Good for some time horizons but not others.
- 7–8: Strong fit across multiple time horizons.
- 9–10: Excellent short, medium, and long-term optionality.

### Required Notes
- Best time horizon
- Worst time horizon
- Whether the country is an arbitrage or a permanent base

---

## risk_tolerance_fit — Risk Tolerance Fit

### Purpose
Evaluate whether the country is stable/polished or volatile/high-upside, and who it fits.

### Suggested Metrics
- Policy volatility
- Currency volatility
- Safety variability
- Bureaucratic unpredictability
- Economic upside
- Reform momentum
- Frontier-market characteristics

### Score Guide
- 0–2: Risk is too high for most profiles without exceptional compensation.
- 3–4: High-risk profile; suitable only for adventurous or well-capitalized people.
- 5–6: Moderate risk with clear tradeoffs.
- 7–8: Risk/reward is favorable for many profiles.
- 9–10: Excellent upside with unusually manageable risk.

### Required Notes
- Best suited for: conservative, balanced, adventurous, frontier investor
- Main stress points

---

## foreigner_backlash — Foreigner Backlash and Local Resentment

### Purpose
Evaluate risk that foreigners become politically or socially unwelcome.

### Suggested Metrics
- Anti-foreigner protests
- Housing backlash
- Airbnb restrictions
- Foreign buyer taxes
- Visa tightening
- Media rhetoric
- Local displacement
- Anti-American sentiment
- Gentrification narratives

### Score Guide
- 0–2: Severe backlash or hostile policy environment.
- 3–4: Meaningful resentment or tightening rules.
- 5–6: Mixed; foreigners accepted but pressure is rising.
- 7–8: Generally welcoming with manageable concerns.
- 9–10: Very welcoming and structurally aligned with foreign residents/investors.

### Required Notes
- Popular vs less popular regions
- Whether backlash is economic, cultural, or political
- How to integrate respectfully

---

## aging_suitability — Health, Aging, and End-of-Life Suitability

### Purpose
Evaluate whether the country remains viable if the resident gets older, sick, or less mobile.

### Suggested Metrics
- Elder care quality
- Home care cost
- Assisted living
- Specialist access
- Prescription reliability
- Disability access
- Walkability
- Climate comfort for aging
- Estate law
- Family visitation logistics

### Score Guide
- 0–2: Poor fit for aging or serious health issues.
- 3–4: Viable only with high budget or strong family support.
- 5–6: Adequate in major cities with planning.
- 7–8: Good aging suitability and affordable support.
- 9–10: Excellent for long-term aging and healthcare needs.

### Required Notes
- Works at age 35 vs 75?
- Works without driving?
- Works with chronic illness?

---

## supply_chain — Import Dependence and Supply Chain Resilience

### Purpose
Evaluate whether residents and businesses can access needed goods, parts, medicines, and tools.

### Suggested Metrics
- Electronics availability
- Medication availability
- Vehicle parts
- Machinery parts
- Business supplies
- Import duties
- Customs delays
- Customs corruption
- Shipping cost
- Local substitutes
- Amazon/local marketplace access

### Score Guide
- 0–2: Severe supply constraints or import friction.
- 3–4: Frequent shortages or high import costs.
- 5–6: Usable with planning and higher costs.
- 7–8: Good availability and manageable logistics.
- 9–10: Excellent supply chain access and resilience.

### Required Notes
- Impact on remote workers, makers, and online businesses
- Medication and tech caveats

---

## insurance_signals — Insurance Availability and Risk Pricing

### Purpose
Evaluate hidden risk through insurance availability, exclusions, and price trends.

### Suggested Metrics
- Health insurance availability
- Property insurance availability
- Car insurance
- Business liability insurance
- Disaster insurance
- Flood/fire/earthquake exclusions
- Premium trend
- Claim reliability
- Insurer withdrawal from regions

### Score Guide
- 0–2: Insurance unavailable or unreliable for major risks.
- 3–4: Insurance exists but with high exclusions or rising premiums.
- 5–6: Mixed insurance market; manageable with caveats.
- 7–8: Good availability and claim reliability.
- 9–10: Strong, affordable, reliable insurance environment.

### Required Notes
- What risks insurers avoid
- Disaster coverage limitations
- Claims reputation

---

## data_quality — Data Quality and Reality Gap

### Purpose
Evaluate how reliable country data and online narratives are.

### Suggested Metrics
- Official statistics credibility
- Crime data reliability
- Inflation data reliability
- Property listing accuracy
- Healthcare ranking usefulness
- Expat forum bias
- Influencer conflict of interest
- Recentness of available data

### Score Guide
- 0–2: Very unreliable data and high narrative distortion.
- 3–4: Poor data quality or heavy hype/anecdote dependence.
- 5–6: Mixed; enough data for cautious judgment.
- 7–8: Generally reliable data and transparent conditions.
- 9–10: High-quality data ecosystem and low reality gap.

### Required Notes
- Which categories require fresh research
- Which claims are likely hype
- What must be verified on the ground

---

## tail_risk — Black Swan and Tail Risk

### Purpose
Evaluate how the country behaves under stress: crisis, war, collapse, unrest, shortage, or financial shock.

### Suggested Metrics
- Coup risk
- Banking crisis risk
- Capital controls
- Civil unrest
- War spillover
- Natural disaster
- Pandemic response
- Food/fuel shortage risk
- Grid failure
- Nationalization risk
- Anti-foreigner laws

### Score Guide
- 0–2: Severe crisis vulnerability or history of extreme tail events.
- 3–4: Significant tail risks that could disrupt life or capital.
- 5–6: Mixed; some crisis risks but survivable with preparation.
- 7–8: Resilient under stress with manageable tail risks.
- 9–10: Very low tail risk and strong crisis resilience.

### Required Notes
- Most plausible severe scenario
- Mitigations
- Whether the country is a hedge or a risk amplifier

---

## psychological_fit — Moral and Psychological Fit

### Purpose
Evaluate whether a person could feel grounded, ethical, and emotionally stable living there.

### Suggested Metrics
- Outsider stress
- Distance from family
- Language isolation
- Inequality discomfort
- Cultural loneliness
- Local contribution opportunities
- Integration ability
- Alignment with personal values
- Whether move is toward something or away from something

### Score Guide
- 0–2: Likely isolating, morally uncomfortable, or psychologically draining.
- 3–4: Difficult fit unless highly motivated or connected.
- 5–6: Manageable with effort and community building.
- 7–8: Strong emotional/lifestyle fit for many Americans.
- 9–10: Excellent psychological fit and durable sense of belonging.

### Required Notes
- Who would thrive there?
- Who would regret moving there?
- Integration requirements
