import { client } from '../../sanity/client'
import { PORTFOLIO_PROJECTS } from '../../sanity/queries'
import PortfolioContent from '../../components/PortfolioContent'

export const metadata = { title: 'Portfolio' }

/**
 * Server component: fetches, then hands plain data to the client half.
 * The GROQ and the Sanity token never reach the browser.
 */
export default async function PortfolioPage() {
  const projects = await client.fetch(PORTFOLIO_PROJECTS)
  return <PortfolioContent projects={projects} />
}
