import type { SchemaTypeDefinition } from "sanity";
import { postType } from "./postType";
import { productType } from "./productType";
import { seoType } from "./seoType";
import { siteSettingsType } from "./siteSettingsType";

// Reviews and the activity log live under private ids and are managed only
// in the separate admin panel (E:\Web Dev\msl_biotech-admin).
export const schema: { types: SchemaTypeDefinition[] } = {
  types: [productType, postType, siteSettingsType, seoType],
};
