export interface OrgTrendPoint {
  date: string;
  avgScore: number;
}

// Aggregate, anonymized sample data — no individual records, consistent with
// the institutional mode requirement (no exposure of individual entries).
const RAW_AVG = [3.1, 3.3, 3.0, 2.8, 3.2, 3.6, 3.5, 3.4, 3.1, 3.3, 3.7, 3.8, 3.6, 3.5];

export const ORG_TREND: OrgTrendPoint[] = RAW_AVG.map((avgScore, i) => {
  const date = new Date();
  date.setDate(date.getDate() - (RAW_AVG.length - 1 - i));
  return { date: date.toISOString().slice(0, 10), avgScore };
});

export const ORG_DISTRIBUTION = [
  { mood: "Great", count: 34 },
  { mood: "Good", count: 52 },
  { mood: "Okay", count: 28 },
  { mood: "Low", count: 11 },
  { mood: "Rough", count: 3 },
];

export const ORG_STATS = {
  organizationName: "Sample Organization",
  totalParticipants: 128,
  activeThisWeek: 96,
};
