import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const client = createClient({
    projectId: `${process.env.REACT_APP_SANITY_PROJECT_ID}`,
    dataset: `${process.env.REACT_APP_SANITY_DATASET}`,
    useCdn: true,
    apiVersion: '2023-09-30',
    token: `${process.env.REACT_APP_SANITY_TOKEN}`,
    ignoreBrowserTokenWarning: true
});

const builder = imageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);