import type { CategoryDefinition, CategoryId } from "../types/scoring";

export const categoryDefinitions: CategoryDefinition[] = [
  { id: "legal_residency", label: "Legal Residency and Immigration", group: "Access", shortDescription: "Entry, renewals, residency, citizenship, and immigration durability." },
  { id: "tax_treatment", label: "Tax System and Wealth Treatment", group: "Money", shortDescription: "Tax predictability, burden, and compatibility with U.S. citizen taxation." },
  { id: "cost_of_living", label: "Cost of Living vs U.S.", group: "Money", shortDescription: "Quality of life per dollar relative to major U.S. metro areas." },
  { id: "currency_banking", label: "Currency and Banking Stability", group: "Money", shortDescription: "Currency stability, banking access, convertibility, and capital mobility." },
  { id: "economy_opportunity", label: "Economy and Opportunity", group: "Opportunity", shortDescription: "Economic trajectory, reform momentum, talent, and investment upside." },
  { id: "income_portability", label: "Employment and Income Portability", group: "Opportunity", shortDescription: "Remote work, entrepreneurship, business infrastructure, and time-zone fit." },
  { id: "climate_resilience", label: "Climate and Climate Change Resilience", group: "Resilience", shortDescription: "Long-term livability under heat, drought, flood, fire, and adaptation stress." },
  { id: "food_water_energy", label: "Food, Water, and Energy Security", group: "Resilience", shortDescription: "Domestic resource security under stress." },
  { id: "geopolitical_risk", label: "Geopolitical Risk and International Relations", group: "Stability", shortDescription: "Exposure to war, sanctions, chokepoints, and great-power rivalry." },
  { id: "political_stability", label: "Domestic Political Stability", group: "Stability", shortDescription: "Institutional strength, policy continuity, corruption, and regulatory predictability." },
  { id: "safety", label: "Safety and Personal Security", group: "Livability", shortDescription: "Crime, scams, emergency response, and normal-life security burden." },
  { id: "healthcare", label: "Healthcare Quality and Access", group: "Livability", shortDescription: "Care quality, affordability, specialists, prescriptions, and foreigner access." },
  { id: "infrastructure", label: "Infrastructure and Basic Services", group: "Livability", shortDescription: "Internet, electricity, transport, water, logistics, and public services." },
  { id: "property_rights", label: "Housing, Land, and Property Rights", group: "Money", shortDescription: "Ability to rent, buy, defend, insure, and resell property." },
  { id: "demographics", label: "Demographics and Social Trajectory", group: "Opportunity", shortDescription: "Population structure, human capital, and social momentum." },
  { id: "culture_language", label: "Culture, Language, and Social Fit", group: "Fit", shortDescription: "Communication, integration, expat/local bridges, and lifestyle fit." },
  { id: "family_suitability", label: "Education and Family Suitability", group: "Livability", shortDescription: "Schools, childcare, child safety, family healthcare, and household stability." },
  { id: "global_connectivity", label: "Transportation and Global Connectivity", group: "Access", shortDescription: "International access, domestic mobility, and emergency exit practicality." },
  { id: "digital_freedom", label: "Technology, Censorship, and Digital Freedom", group: "Freedom", shortDescription: "Open internet, platform access, privacy, and online business practicality." },
  { id: "civil_liberties", label: "Personal Freedom and Civil Liberties", group: "Freedom", shortDescription: "Speech, privacy, movement, autonomy, and emergency-power risk." },
  { id: "state_capacity", label: "State Capacity and Public Services", group: "Stability", shortDescription: "Administrative competence, crisis response, service delivery, and order." },
  { id: "legal_system", label: "Legal System and Dispute Resolution", group: "Stability", shortDescription: "Courts, contracts, arbitration, police process, and foreigner treatment." },
  { id: "community_networks", label: "Community and Network Effects", group: "Fit", shortDescription: "Expat, entrepreneurial, professional, and long-term community depth." },
  { id: "daily_friction", label: "Quality of Life and Daily Friction", group: "Livability", shortDescription: "Bureaucracy, noise, goods availability, repairs, walkability, and convenience." },
  { id: "exit_optionality", label: "Exit Options and Optionality", group: "Access", shortDescription: "Capital exit, property liquidity, regional mobility, and citizenship/passport upside." },
  { id: "time_horizon_fit", label: "Time Horizon Fit", group: "Fit", shortDescription: "Fit across test stays, remote-base years, family plans, and retirement horizons." },
  { id: "risk_tolerance_fit", label: "Risk Tolerance Fit", group: "Fit", shortDescription: "Whether the risk/reward profile fits conservative, balanced, or frontier users." },
  { id: "foreigner_backlash", label: "Foreigner Backlash and Local Resentment", group: "Stability", shortDescription: "Risk of visa tightening, housing backlash, anti-foreigner sentiment, or restrictions." },
  { id: "aging_suitability", label: "Health, Aging, and End-of-Life Suitability", group: "Livability", shortDescription: "Elder care, mobility, chronic-care suitability, and family visitation logistics." },
  { id: "supply_chain", label: "Import Dependence and Supply Chain Resilience", group: "Resilience", shortDescription: "Access to goods, medicines, parts, business supplies, and local substitutes." },
  { id: "insurance_signals", label: "Insurance Availability and Risk Pricing", group: "Resilience", shortDescription: "Insurance availability, exclusions, premium trends, and claims reliability." },
  { id: "data_quality", label: "Data Quality and Reality Gap", group: "Fit", shortDescription: "Reliability of official data, narratives, listings, and fresh research signals." },
  { id: "tail_risk", label: "Black Swan and Tail Risk", group: "Resilience", shortDescription: "Crisis behavior under unrest, banking shock, shortage, disaster, or nationalization." },
  { id: "psychological_fit", label: "Moral and Psychological Fit", group: "Fit", shortDescription: "Belonging, outsider stress, value fit, and whether the move is toward something." }
];

export const categoryIds = categoryDefinitions.map((category) => category.id);
export const categoryIdSet = new Set<CategoryId>(categoryIds);

export function getCategoryDefinition(categoryId: string) {
  return categoryDefinitions.find((category) => category.id === categoryId);
}
