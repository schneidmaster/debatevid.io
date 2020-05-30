/* global SENTRY_DSN GITSHA */

import Raven from "raven-js";

if (process.env.NODE_ENV === "production") {
  document.addEventListener("DOMContentLoaded", () => {
    Raven.config(SENTRY_DSN, { release: GITSHA }).install();
  });
}
