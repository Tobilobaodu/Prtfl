# Headless CMS Comparison and Recommendation

## Evaluation Criteria
We compared four popular headless CMS platforms—Contentful, Sanity, Strapi, and Hygraph—against the project requirements for hosting model, editor experience, pricing, and media handling.

## Comparison Summary
| CMS | Hosting Model | Editor UX | Pricing | Media Handling |
| --- | ------------- | --------- | ------- | -------------- |
| **Contentful** | Fully managed SaaS. Self-hosting not available. | Mature web app with structured content modeling, entry versioning, collaborative editing, editorial apps/marketplace. Rich-text field with inline media, live preview via extensions. | Generous free tier (up to 5 users, 25K records, ~100K monthly API calls). Usage-based pricing scales quickly; enterprise tiers pricey. | Built-in asset pipeline with CDN, image transformations (resize, crop, format). 1&nbsp;GB per user on free tier; higher tiers expand quotas. |
| **Sanity** | Managed SaaS backend with optional self-hosting of the Studio (React app) and APIs via managed service. | Customizable Sanity Studio, real-time collaborative editing, portable text editor with block-based content. Requires developer setup but highly extensible. | Free tier with 3 users, ~100K monthly API requests and 10GB bandwidth; pay-as-you-go for overages. Reasonable scaling via metered pricing. | Asset CDN with on-the-fly image transformations, video via Mux integration. Unlimited assets with metered usage. |
| **Strapi** | Self-hosted by default (Node.js). Cloud SaaS option (Strapi Cloud) for managed hosting. | Admin panel is functional but less polished; role-based access, content builder, drafts/publish workflow. Rich text via plugins; no native real-time collaboration. | Community edition free to self-host (API throughput bound only by your infrastructure). Strapi Cloud pricing starts at ~$99/month for pro projects with metered API requests. | Handles file uploads via local or external providers (S3, Cloudinary). No built-in CDN; relies on configured provider for optimization. |
| **Hygraph (GraphCMS)** | Fully managed SaaS only; no self-hosted option. | Intuitive UI with visual schema builder, GraphQL playground, collaborative comments, granular permissions. Rich-text with embedded media and references. | Free developer tier (3 users, 2 environments, ~500K monthly API operations). Paid tiers start around $299/month with usage limits (content items, API ops). Enterprise pricing negotiable. | Global CDN with image transformations, asset management, video via integrations. Generous bandwidth on paid tiers. |

### API Request Limits Overview
- **Contentful:** Community (free) plan includes roughly 100K combined Delivery and Preview API calls per month; higher tiers bundle more calls and charge overages per 1K requests.
- **Sanity:** Free plan includes 100K monthly API requests, 10GB of CDN bandwidth, and 50GB of asset storage with additional usage billed pay-as-you-go; higher plans raise the included quotas.
- **Strapi:** Self-hosted deployments have no vendor-imposed API caps beyond the capacity of your infrastructure. Strapi Cloud tiers meter API requests (e.g., Pro includes 600K monthly requests with paid overages) in addition to storage and bandwidth.
- **Hygraph:** Developer plan includes 500K monthly API operations (queries/mutations). Growth and enterprise tiers scale the included operations and allow purchasing additional blocks if necessary.

## Decision
Sanity offers the best balance for the project constraints:
- **Flexible hosting posture.** The managed SaaS backend removes infrastructure burden while still allowing the Sanity Studio to be self-hosted or embedded, giving us control over deployment, customization, and authentication when needed.
- **Strong editor experience.** Real-time collaborative editing, customizable Studio workflows, and the block-based Portable Text editor provide a polished authoring experience that can be tailored to the design system.
- **Cost-effective scaling.** The free tier covers initial needs with room to grow, and usage-based pricing stays predictable compared with steep jumps in Contentful or Hygraph plans. Self-hosting remains an option if costs need to be minimized later.
- **Robust media handling.** Sanity’s asset pipeline, CDN-backed transformations, and Mux integration meet media requirements without additional services.

Contentful and Hygraph deliver excellent managed experiences but become expensive quickly, while Strapi’s self-hosting requirement increases operational overhead. Sanity’s hybrid model, developer-friendly customization, and balanced pricing make it the most suitable choice.

## Next Steps
1. Provision a Sanity project under the team account and configure environments for staging/production.
2. Customize Sanity Studio for the project’s content model and editorial workflows.
3. Integrate Sanity’s content API into the Gatsby front end, leveraging Portable Text serializers for rich content.
4. Configure image and video pipelines (Sanity CDN and Mux) and document media guidelines for editors.
