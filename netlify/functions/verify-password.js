const { createClient } = require('@sanity/client')

const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID || 'bhfv0qe4',
  dataset: process.env.SANITY_DATASET || 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_READ_TOKEN,
})

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' }
  }

  let slug, password
  try {
    ;({ slug, password } = JSON.parse(event.body))
  } catch {
    return { statusCode: 400, body: JSON.stringify({ error: 'Invalid request body' }) }
  }

  if (!slug || !password) {
    return { statusCode: 400, body: JSON.stringify({ error: 'Missing slug or password' }) }
  }

  const project = await client.fetch(
    `*[_type == "project" && slug.current == $slug][0]{ password }`,
    { slug }
  )

  if (!project) {
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ success: false }),
    }
  }

  return {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ success: project.password === password }),
  }
}
