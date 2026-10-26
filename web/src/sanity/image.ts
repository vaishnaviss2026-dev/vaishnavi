import { createImageUrlBuilder } from "@sanity/image-url";
import { dataset, projectId } from "./env";

const builder = createImageUrlBuilder({ projectId, dataset });

// Derive the accepted source type straight from the builder so we don't depend
// on an internal type subpath that varies between versions.
type ImageSource = Parameters<typeof builder.image>[0];

export function urlFor(source: ImageSource) {
  return builder.image(source);
}
