import { client } from '../../sanity/client'
import { SANDBOX_PROJECTS } from '../../sanity/queries'
import SndbxContent from '../../components/SndbxContent'

export const metadata = { title: 'Sandbox' }

export default async function SndbxPage() {
  const projects = await client.fetch(SANDBOX_PROJECTS)
  return <SndbxContent projects={projects} />
}
