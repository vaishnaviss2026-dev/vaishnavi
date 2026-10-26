import { defineType, defineField, defineArrayMember } from "sanity";
import { CogIcon } from "@sanity/icons/Cog";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  icon: CogIcon,
  groups: [
    { name: "hero", title: "Hero", default: true },
    { name: "about", title: "About" },
    { name: "tools", title: "Tools" },
    { name: "contact", title: "Contact" },
  ],
  fields: [
    // HERO
    defineField({ name: "heroHeadline", type: "string", group: "hero", initialValue: "Crafting" }),
    defineField({
      name: "heroHighlight",
      type: "string",
      title: "Hero Highlight (shown in red)",
      group: "hero",
      initialValue: "Visual Stories.",
    }),
    defineField({ name: "heroTagline", type: "string", group: "hero" }),
    defineField({ name: "heroIntro", type: "text", rows: 4, group: "hero" }),
    defineField({ name: "heroImage", type: "image", options: { hotspot: true }, group: "hero" }),

    // ABOUT
    defineField({ name: "aboutHeading", type: "string", group: "about", initialValue: "About Me" }),
    defineField({ name: "aboutBody", type: "text", rows: 6, group: "about" }),
    defineField({ name: "aboutImage", title: "About Image", type: "image", options: { hotspot: true }, group: "about" }),

    // TOOLS
    defineField({
      name: "tools",
      title: "Tools strip",
      type: "array",
      group: "tools",
      of: [
        defineArrayMember({
          type: "object",
          name: "tool",
          fields: [
            defineField({ name: "name", type: "string", validation: (r) => r.required() }),
            defineField({
              name: "iconSlug",
              title: "Icon",
              type: "string",
              description:
                "Brand icon slug. Known: premierepro, aftereffects, photoshop, chatgpt, runway, canva, higgsfield.",
              options: {
                list: [
                  { title: "Premiere Pro", value: "premierepro" },
                  { title: "After Effects", value: "aftereffects" },
                  { title: "Photoshop", value: "photoshop" },
                  { title: "ChatGPT", value: "chatgpt" },
                  { title: "Higgsfield AI", value: "higgsfield" },
                  { title: "Runway", value: "runway" },
                  { title: "Canva", value: "canva" },
                ],
              },
            }),
            defineField({ name: "color", type: "string", description: "Hex colour, e.g. #9999FF" }),
          ],
          preview: { select: { title: "name", subtitle: "iconSlug" } },
        }),
      ],
    }),

    // CONTACT
    defineField({ name: "contactHeading", type: "string", group: "contact", initialValue: "Ready to" }),
    defineField({
      name: "contactHighlight",
      type: "string",
      title: "Contact Highlight (shown in red)",
      group: "contact",
      initialValue: "create?",
    }),
    defineField({ name: "contactLead", type: "text", rows: 2, group: "contact" }),
    defineField({ name: "email", type: "string", group: "contact" }),
    defineField({
      name: "whatsapp",
      title: "WhatsApp number",
      type: "string",
      description: "Full number with country code, e.g. 919981783744",
      group: "contact",
    }),
    defineField({ name: "calLink", title: "Book-a-call link", type: "url", group: "contact" }),
  ],
  preview: {
    prepare: () => ({ title: "Site Settings" }),
  },
});
