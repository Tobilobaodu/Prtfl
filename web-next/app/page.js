import { client } from '../sanity/client'
import { HOME_PROJECTS } from '../sanity/queries'
import Layout from '../components/Layout'
import HomeProjects from '../components/HomeProjects'

export const metadata = { title: 'Home' }

/**
 * Server component. It fetches on the server and hands plain data to a client
 * child, which is the pattern the whole port follows: data stays on the server,
 * `'use client'` lives on the interactive leaf.
 *
 * The equivalent Gatsby file combined the page query, the markup and the
 * useState for the hover reel and the locked-project modal into one module,
 * which is why every byte of it shipped to the browser.
 */
export default async function HomePage() {
  const projects = await client.fetch(HOME_PROJECTS)

  // Layout supplies the <main> element, matching the Gatsby structure — pages
  // must not add their own or the document ends up with nested <main>.
  return (
    <Layout>
      <HomeProjects projects={projects} />
    </Layout>
  )
}
