import { client } from '../../sanity/client'
import { SANDBOX_PROJECTS } from '../../sanity/queries'
import SndbxContent from '../../components/SndbxContent'

export const metadata = {
  title: 'Sandbox',
  description:
    'Self-initiated work by Tobiloba Odu, from an Android theme to an invoice generator and a typeface. Ideas and tools tested without a client brief.',
}

export default async function SndbxPage() {
  const projects = await client.fetch(SANDBOX_PROJECTS)
  return <SndbxContent projects={projects} />
}
