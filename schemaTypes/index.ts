import caseStudy from './caseStudy'
import {hideable} from './hideable'
import calloutBanner from './calloutBanner'
import beforeAfterSlider from './beforeAfterSlider'
import liveDemoLink from './liveDemoLink'
import phoneDemo from './phoneDemo'
import cardGrid from './cardGrid'
import decisionBlock from './decisionBlock'
import detailsGrid from './detailsGrid'
import findingDecisionMap from './findingDecisionMap'
import hierarchyDiagram from './hierarchyDiagram'
import journeyCards from './journeyCards'
import keyQuestion from './keyQuestion'
import optionsComparison from './optionsComparison'
import roleResults from './roleResults'
import processFlow from './processFlow'
import statsBand from './statsBand'
import experience from './experience'
import finding from './finding'
import heroSection from './heroSection'
import ndaNotice from './ndaNotice'
import iconHeadingBlock from './iconHeadingBlock'
import iconPodGrid from './iconPodGrid'
import iconPod from './iconPod'
import imageComponent from './imageComponent'
import imagePodGrid from './imagePodGrid'
import imagePod from './imagePod'
import numberedFindings from './numberedFindings'
import objectivesList from './objectivesList'
import photography from './photography'
import pullQuote from './pullQuote'
import project from './project'
import sectionDivider from './sectionDivider'
import sectionTitleBlock from './sectionTitleBlock'
import sliderComponent from './sliderComponent'
import slide from './slide'
import splitHero from './splitHero'
import spacer from './spacer'
import tagBlock from './tagBlock'
import textBlock from './textBlock'
import videoComponent from './videoComponent'

// Page components (the case study's `components` array) get a "Hide on site"
// switch via hideable(); see hideable.ts.
export const schemaTypes = [
  hideable(beforeAfterSlider),
  hideable(liveDemoLink),
  hideable(phoneDemo),
  hideable(calloutBanner),
  hideable(cardGrid),
  hideable(decisionBlock),
  hideable(detailsGrid),
  hideable(findingDecisionMap),
  hideable(hierarchyDiagram),
  hideable(journeyCards),
  hideable(keyQuestion),
  hideable(optionsComparison),
  hideable(processFlow),
  hideable(roleResults),
  hideable(statsBand),
  caseStudy,
  experience,
  finding,
  hideable(heroSection),
  hideable(iconHeadingBlock),
  hideable(iconPodGrid),
  iconPod,
  hideable(imageComponent),
  hideable(imagePodGrid),
  imagePod,
  hideable(ndaNotice),
  hideable(numberedFindings),
  hideable(objectivesList),
  photography,
  project,
  hideable(pullQuote),
  hideable(sectionDivider),
  hideable(sectionTitleBlock),
  hideable(sliderComponent),
  slide,
  hideable(splitHero),
  hideable(spacer),
  hideable(tagBlock),
  hideable(textBlock),
  hideable(videoComponent),
]
