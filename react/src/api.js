import {ApolloClient} from "apollo-client";
import {InMemoryCache} from "apollo-cache-inmemory";
import {HttpLink} from "apollo-link-http";

export const API_SERVER =
  `${process.env.REACT_APP_API_HOST}` || "http://192.168.200.238:8000";

export const API_MEDIA =
  `${process.env.REACT_APP_API_MEDIA}/${process.env.REACT_APP_API_STATIC_BUCKET}/media/` ||
  API_SERVER.concat("/media/");

export const RECAPTCHA_PUBLIC_KEY =
  process.env.REACT_APP_RECAPTCHA_PUBLIC_KEY ||
  "6Left-cZAAAAAEy5TuCT7AGnJ9YPmYqGpAbKAjJH";

const cache = new InMemoryCache();
const link = new HttpLink({
  uri: `${API_SERVER}/graphql/`
});

export const client = new ApolloClient({
  cache,
  link
});
