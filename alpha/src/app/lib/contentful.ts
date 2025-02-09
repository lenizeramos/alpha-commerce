import { createClient } from "contentful";
console.log("Access Token:", process.env.CONTENTFUL_ACCESS_TOKEN);

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID || "",
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN || "",
});

export default client