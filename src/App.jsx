import { useState } from 'react'
import { fmtN, fmtD } from './utils/format'
import ProgressBar from './components/ProgressBar'
import Hero from './components/Hero'
import StorySection from './components/StorySection'
import InputCard from './components/InputCard'
import ResultsSection from './components/ResultsSection'
import Footer from './components/Footer'

export default function App() {
  const [candidates, setCandidates] = useState('')
  const [hoursPerAssessment, setHoursPerAssessment] = useState('')
  const [engineerRate, setEngineerRate] = useState('')

  const c = parseFloat(candidates) || 0
  const h = parseFloat(hoursPerAssessment) || 3
  const r = parseFloat(engineerRate) || 0

  const hrs = c * h
  const dlr = hrs * r
  const ann = dlr * 4
  const pct = c > 0 ? (hrs / 2200) * 100 : 0

  const computed = { hrs, dlr, ann, pct }

  return (
    <>
      <ProgressBar />

      <Hero />

      {/* 01 — Challenge */}
      <StorySection
        id="s1"
        sectionNum="01"
        label="The Challenge"
        title={<>A Process <em>Overdue</em><br />for Change</>}
        paragraphs={[
          "Unity's engineering org spanned R&D, graphics, AR/VR, security, and more — each running their own ad-hoc technical assessments. Some teams used take-home tests. Others ran bug hunts. The result was a fragmented process that burned engineering bandwidth and left candidates with wildly different experiences.",
          "Between delays getting completed tests back and limited engineer time to review them, every open role took longer than it should have.",
        ]}
        statValue={35}
        statSuffix="+"
        statLabel={<>recruiting professionals<br />managing fragmented processes</>}
      >
        <InputCard
          icon="users"
          label="Your candidate volume"
          sub="How many engineering candidates does your team assess each quarter?"
          value={candidates}
          onChange={e => setCandidates(e.target.value)}
          placeholder="0"
          min={0}
          step={1}
          hint="Unity benchmark: ~250 candidates / quarter"
          runningShow={c > 0}
          runningLabel="Assessments to optimize"
          runningValue={c > 0 ? fmtN(c) + ' candidates' : '—'}
        />
      </StorySection>

      {/* 02 — Solution */}
      <StorySection
        id="s2"
        flip
        sectionNum="02"
        label="The Solution"
        title={<>Standardized.<br />Scalable. <em>Smart.</em></>}
        paragraphs={[
          "Unity turned to Codility — starting with the Montreal-based AI and Monetization team. Within months, adoption spread across every region and business unit through word of mouth alone. What started as one team's tool quickly became company infrastructure.",
          "CodeCheck replaced the patchwork of take-home tests with a consistent, unbiased environment. Engineers stopped losing afternoons to manual reviews. Candidates got a far cleaner, faster experience.",
        ]}
        statValue={3}
        statSuffix=" hrs"
        statLabel={<>of engineering time<br />recovered per assessment</>}
      >
        <InputCard
          icon="clock"
          label="Review time per assessment"
          sub="How many hours does your engineering team currently spend reviewing each technical assessment today?"
          value={hoursPerAssessment}
          onChange={e => setHoursPerAssessment(e.target.value)}
          placeholder="3"
          min={0}
          step={0.5}
          hint="Unity benchmark: 3 hrs per candidate"
          runningShow={c > 0 && hrs > 0}
          runningLabel="Projected hours recovered"
          runningValue={c > 0 && hrs > 0 ? fmtN(hrs) + ' hrs' : '—'}
        />
      </StorySection>

      {/* 03 — Impact */}
      <StorySection
        id="s3"
        sectionNum="03"
        label="The Impact"
        title={<>Time Back Means<br /><em>Revenue</em> Forward</>}
        paragraphs={[
          "The results were immediate. Unity ran 750 candidate tests in a 90-day window, and the time savings cascaded across teams. Engineers returned to product work. Hiring managers got faster, cleaner signal on candidates.",
          "When 2020 forced a rapid pivot to fully remote hiring, Unity's investment in standardized processes paid off — they went fully remote globally in under a week, with Codility absorbing the transition seamlessly.",
        ]}
        statValue={2200}
        statSuffix=""
        statLabel={<>total hours saved<br />across all departments</>}
      >
        <InputCard
          icon="dollar"
          label="Engineer hourly cost"
          sub="What's your average software engineer's fully-loaded hourly rate? Used to calculate your dollar-value ROI."
          value={engineerRate}
          onChange={e => setEngineerRate(e.target.value)}
          placeholder="75"
          min={0}
          step={1}
          prefix="$"
          hint="US avg. fully-loaded eng. rate: ~$75–$125/hr"
          runningShow={c > 0 && hrs > 0 && dlr > 0}
          runningLabel="Estimated dollar value saved"
          runningValue={c > 0 && hrs > 0 && dlr > 0 ? fmtD(dlr) : '—'}
        />
      </StorySection>

      <ResultsSection computed={computed} />

      <Footer />
    </>
  )
}
