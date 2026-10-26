import { defineQuery } from "next-sanity";

export const SITE_SETTINGS_QUERY = defineQuery(`
  *[_type == "siteSettings"][0]{
    heroHeadline,
    heroHighlight,
    heroTagline,
    heroIntro,
    heroImage,
    aboutHeading,
    aboutBody,
    aboutImage,
    tools[]{ _key, name, iconSlug, color },
    contactHeading,
    contactHighlight,
    contactLead,
    email,
    whatsapp,
    calLink
  }
`);

export const PROJECTS_QUERY = defineQuery(`
  *[_type == "project"] | order(order asc, _createdAt asc){
    _id,
    title,
    category,
    section,
    order,
    ratio,
    "videoUrl": coalesce(videoFile.asset->url, videoUrl),
    color,
    thumbnail
  }
`);
