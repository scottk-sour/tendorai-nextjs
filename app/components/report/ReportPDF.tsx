/* PDF mirror of the AI Visibility Intelligence Report.
 * Rendered client-side via @react-pdf/renderer's pdf() — see DownloadPdfButton.
 * Charts are represented as text/tables; @react-pdf cannot render Recharts. */
import {
  Document,
  Page,
  View,
  Text,
  Image,
  StyleSheet,
} from '@react-pdf/renderer';
import {
  type WeeklyReport,
  formatWeekRange,
  formatGBPRange,
} from './types';

const PURPLE = '#7c3aed';
const INK = '#1e293b';
const MUTED = '#64748b';
const LINE = '#e2e8f0';

const s = StyleSheet.create({
  page: {
    paddingTop: 88,
    paddingBottom: 56,
    paddingHorizontal: 40,
    fontSize: 10,
    color: INK,
    fontFamily: 'Helvetica',
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 64,
    paddingHorizontal: 40,
    paddingTop: 18,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: PURPLE,
  },
  logo: { width: 110 },
  headerMeta: { textAlign: 'right' },
  headerFirm: { fontSize: 12, fontFamily: 'Helvetica-Bold', color: INK },
  headerSub: { fontSize: 8, color: MUTED, marginTop: 2 },
  footer: {
    position: 'absolute',
    bottom: 24,
    left: 40,
    right: 40,
    fontSize: 8,
    color: MUTED,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: LINE,
    paddingTop: 6,
  },
  section: { marginBottom: 16 },
  sectionEyebrow: {
    fontSize: 7,
    color: PURPLE,
    fontFamily: 'Helvetica-Bold',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  sectionTitle: {
    fontSize: 13,
    fontFamily: 'Helvetica-Bold',
    color: INK,
    marginTop: 2,
    marginBottom: 6,
  },
  para: { lineHeight: 1.5, color: '#334155' },
  bigScore: { fontSize: 32, fontFamily: 'Helvetica-Bold', color: PURPLE },
  statRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 6 },
  stat: {
    borderWidth: 1,
    borderColor: LINE,
    borderRadius: 4,
    padding: 6,
    minWidth: 120,
  },
  statLabel: { fontSize: 7, color: MUTED, textTransform: 'uppercase' },
  statValue: { fontSize: 12, fontFamily: 'Helvetica-Bold', marginTop: 2 },
  tableHeadRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#cbd5e1',
    paddingBottom: 3,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: LINE,
    paddingVertical: 3,
  },
  th: { fontSize: 8, color: MUTED, fontFamily: 'Helvetica-Bold' },
  td: { fontSize: 9, color: '#334155' },
  bullet: { flexDirection: 'row', marginBottom: 2 },
  bulletDot: { width: 8, color: PURPLE },
  badge: {
    fontSize: 7,
    fontFamily: 'Helvetica-Bold',
    color: '#b91c1c',
  },
});

function SectionTitle({ index, title }: { index: number; title: string }) {
  return (
    <View>
      <Text style={s.sectionEyebrow}>Section {index}</Text>
      <Text style={s.sectionTitle}>{title}</Text>
    </View>
  );
}

interface Props {
  report: WeeklyReport;
  firmName: string;
  logoUrl: string;
}

export default function ReportPDF({ report, firmName, logoUrl }: Props) {
  const sh = report.scoreHeader;
  const live = (report.shareOfVoice ?? []).filter(
    (p) => p.platformStatus === 'live',
  );
  const claims = report.perceptionAnalysis?.inaccurateClaimsDetected ?? [];

  return (
    <Document
      title={`AI Visibility Intelligence Report — ${report.reportNumber}`}
      author="TendorAI"
    >
      <Page size="A4" style={s.page}>
        {/* Branded header */}
        <View style={s.header} fixed>
          {/* eslint-disable-next-line jsx-a11y/alt-text */}
          <Image style={s.logo} src={logoUrl} />
          <View style={s.headerMeta}>
            <Text style={s.headerFirm}>{firmName}</Text>
            <Text style={s.headerSub}>
              {formatWeekRange(report.weekStartDate, report.weekEndDate)} ·{' '}
              {report.reportNumber}
            </Text>
          </View>
        </View>

        {/* Footer with report number + page numbers */}
        <View style={s.footer} fixed>
          <Text>TendorAI · AI Visibility Intelligence Report</Text>
          <Text
            render={({ pageNumber, totalPages }) =>
              `${report.reportNumber} · Page ${pageNumber} of ${totalPages}`
            }
          />
        </View>

        {/* 1 — Score */}
        <View style={s.section}>
          <SectionTitle index={1} title="AI Visibility Score" />
          <Text style={s.bigScore}>
            {typeof sh?.currentScore === 'number' ? sh.currentScore : '—'}
            <Text style={{ fontSize: 12, color: MUTED }}> /100</Text>
          </Text>
          <View style={s.statRow}>
            <View style={s.stat}>
              <Text style={s.statLabel}>Weekly change</Text>
              <Text style={s.statValue}>
                {typeof sh?.weeklyChange === 'number'
                  ? `${sh.weeklyChange > 0 ? '+' : ''}${sh.weeklyChange}`
                  : '—'}
              </Text>
            </View>
            <View style={s.stat}>
              <Text style={s.statLabel}>Rank in city</Text>
              <Text style={s.statValue}>
                {typeof sh?.rankInCity === 'number'
                  ? `#${sh.rankInCity}${
                      sh?.totalFirmsInCity ? ` of ${sh.totalFirmsInCity}` : ''
                    }`
                  : '—'}
              </Text>
            </View>
            <View style={s.stat}>
              <Text style={s.statLabel}>Monthly opportunity loss</Text>
              <Text style={s.statValue}>
                {formatGBPRange(
                  sh?.monthlyOpportunityLoss?.min,
                  sh?.monthlyOpportunityLoss?.max,
                )}
              </Text>
            </View>
          </View>
        </View>

        {/* 2 — Board summary */}
        <View style={s.section}>
          <SectionTitle index={2} title="Board Summary" />
          <Text style={s.para}>
            {report.boardSummary?.trim() || 'No board summary this week.'}
          </Text>
        </View>

        {/* 3 — Share of voice */}
        <View style={s.section}>
          <SectionTitle index={3} title="Share of Voice" />
          <View style={s.tableHeadRow}>
            <Text style={[s.th, { flex: 2 }]}>Platform</Text>
            <Text style={[s.th, { flex: 1 }]}>You</Text>
            <Text style={[s.th, { flex: 1 }]}>Competitor avg</Text>
            <Text style={[s.th, { flex: 1 }]}>Gap</Text>
          </View>
          {live.map((p) => (
            <View style={s.tableRow} key={p.platform}>
              <Text style={[s.td, { flex: 2 }]}>{p.platform}</Text>
              <Text style={[s.td, { flex: 1 }]}>
                {p.yourSharePercent ?? '—'}%
              </Text>
              <Text style={[s.td, { flex: 1 }]}>
                {p.competitorAvgPercent ?? '—'}%
              </Text>
              <Text style={[s.td, { flex: 1 }]}>{p.gap ?? '—'}%</Text>
            </View>
          ))}
        </View>

        {/* 4 — Competitor positioning */}
        <View style={s.section}>
          <SectionTitle index={4} title="Competitor Positioning" />
          {report.competitorHeadline ? (
            <Text style={[s.para, { fontFamily: 'Helvetica-Bold', marginBottom: 4 }]}>
              {report.competitorHeadline}
            </Text>
          ) : null}
          <View style={s.tableHeadRow}>
            <Text style={[s.th, { flex: 2 }]}>Firm</Text>
            <Text style={[s.th, { flex: 1 }]}>Score</Text>
            <Text style={[s.th, { flex: 1 }]}>Change</Text>
            <Text style={[s.th, { flex: 1 }]}>Citations</Text>
          </View>
          {(report.competitors ?? []).map((c, i) => (
            <View style={s.tableRow} key={`${c.firmName}-${i}`}>
              <Text style={[s.td, { flex: 2 }]}>
                {c.firmName}
                {c.isYou ? ' (You)' : ''}
              </Text>
              <Text style={[s.td, { flex: 1 }]}>{c.visibilityScore ?? '—'}</Text>
              <Text style={[s.td, { flex: 1 }]}>
                {typeof c.weeklyChange === 'number'
                  ? `${c.weeklyChange > 0 ? '+' : ''}${c.weeklyChange}`
                  : '—'}
              </Text>
              <Text style={[s.td, { flex: 1 }]}>{c.citationCount ?? '—'}</Text>
            </View>
          ))}
        </View>

        {/* 5 — Revenue exposure */}
        <View style={s.section}>
          <SectionTitle index={5} title="Revenue Exposure" />
          <Text style={s.bigScore}>
            {formatGBPRange(
              report.revenueExposure?.monthlyMin,
              report.revenueExposure?.monthlyMax,
            )}
          </Text>
          <Text style={[s.para, { fontSize: 8, color: MUTED, marginTop: 2 }]}>
            Estimated monthly revenue at risk.
          </Text>
        </View>

        {/* 6 — Citation intelligence */}
        <View style={s.section} wrap={false}>
          <SectionTitle index={6} title="Citation Intelligence" />
          <View style={s.tableHeadRow}>
            <Text style={[s.th, { flex: 3 }]}>Prompt</Text>
            <Text style={[s.th, { flex: 2 }]}>Engines</Text>
            <Text style={[s.th, { flex: 1 }]}>You</Text>
          </View>
          {(report.promptAnalysis ?? []).map((p, i) => (
            <View style={s.tableRow} key={`${p.prompt}-${i}`}>
              <Text style={[s.td, { flex: 3 }]}>{p.prompt}</Text>
              <Text style={[s.td, { flex: 2 }]}>
                {(p.enginesCited ?? []).join(', ') || '—'}
              </Text>
              <Text style={[s.td, { flex: 1 }]}>
                {p.youCited ? 'Cited' : 'Missed'}
              </Text>
            </View>
          ))}
        </View>

        {/* 7 — Authority graph */}
        <View style={s.section}>
          <SectionTitle index={7} title="Authority Graph" />
          <Text style={s.para}>
            Authority score: {report.authorityGraph?.authorityScore ?? '—'} ·
            Schema {report.authorityGraph?.schemaCoverage?.connected ?? '—'}/
            {report.authorityGraph?.schemaCoverage?.total ?? '—'} · Content
            footprint {report.authorityGraph?.contentFootprintPages ?? '—'} pages
          </Text>
          <Text style={[s.para, { marginTop: 3 }]}>
            Directories missing:{' '}
            {(report.authorityGraph?.directoriesMissing ?? []).join(', ') ||
              'none'}
          </Text>
        </View>

        {/* 8 — Perception analysis */}
        <View style={s.section}>
          <SectionTitle index={8} title="Perception Analysis" />
          <Text style={s.para}>
            Positive:{' '}
            {(report.perceptionAnalysis?.positiveAssociations ?? []).join(
              ', ',
            ) || '—'}
          </Text>
          {claims.length > 0 && (
            <View style={{ marginTop: 4 }}>
              <Text style={s.badge}>
                {claims.length} inaccurate claim
                {claims.length === 1 ? '' : 's'} detected
              </Text>
              {claims.map((c, i) => (
                <Text key={i} style={[s.para, { fontSize: 8, marginTop: 2 }]}>
                  • [{c.severity}] {c.claim} — on {c.sourceEngine}. Truth:{' '}
                  {c.truth}
                </Text>
              ))}
            </View>
          )}
        </View>

        {/* 9 — Projections */}
        <View style={s.section}>
          <SectionTitle index={9} title="Projections" />
          <Text style={s.para}>
            Historical:{' '}
            {(report.projections?.historicalScores ?? []).join(', ') || '—'}
          </Text>
          <Text style={[s.para, { marginTop: 2 }]}>
            Projected:{' '}
            {(report.projections?.projectedScores ?? []).join(', ') || '—'}
          </Text>
        </View>

        {/* 10 — Opportunity feed */}
        <View style={s.section}>
          <SectionTitle index={10} title="Opportunity Feed" />
          {(report.opportunityFeed ?? []).map((o, i) => (
            <View key={i} style={s.bullet}>
              <Text style={s.bulletDot}>•</Text>
              <Text style={[s.para, { flex: 1 }]}>
                &ldquo;{o.detectedQuery}&rdquo;
                {o.suggestedAction ? ` — ${o.suggestedAction}` : ''}
              </Text>
            </View>
          ))}
        </View>

        {/* 11 — Recommended actions */}
        <View style={s.section}>
          <SectionTitle index={11} title="Recommended Actions" />
          {(report.recommendedActions ?? []).map((a, i) => (
            <View key={i} style={s.bullet}>
              <Text style={s.bulletDot}>{i + 1}.</Text>
              <Text style={[s.para, { flex: 1 }]}>
                [{a.severity}] {a.title}
                {a.description ? ` — ${a.description}` : ''}
              </Text>
            </View>
          ))}
        </View>

        {/* 12 — What's next */}
        <View style={s.section}>
          <SectionTitle index={12} title="What's Next" />
          {(report.whatsNext ?? []).map((w, i) => (
            <View key={i} style={s.bullet}>
              <Text style={s.bulletDot}>•</Text>
              <Text style={[s.para, { flex: 1 }]}>
                {w.dayLabel}: {w.eventLabel}
                {w.vendorImpact ? ` — ${w.vendorImpact}` : ''}
              </Text>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
}
