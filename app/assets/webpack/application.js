/* global SENTRY_DSN GITSHA */

// Polyfills.
import "@babel/polyfill";
import "whatwg-fetch";
import * as Sentry from "@sentry/browser";

// Sentry.
if (process.env.NODE_ENV === "production") {
  Sentry.init({
    dsn: SENTRY_DSN,
    release: GITSHA
  });
}

// Components.
import ReactOnRails from "react-on-rails";
import Leaderboard from "components/Leaderboard/Leaderboard";
import Nav from "components/Nav/Nav";
import Submit from "components/Submit/Submit";
import Video from "components/Video/Video";
import Videos from "components/Videos/Videos";

// Register components.
ReactOnRails.register({
  Leaderboard,
  Nav,
  Submit,
  Video,
  Videos
});

// Styles.
import "bootstrap/dist/css/bootstrap";
import "font-awesome/css/font-awesome";
import "react-select/dist/react-select.css";
import "stylesheets/fonts";
import "stylesheets/form";
import "stylesheets/misc";
import "stylesheets/nav";
import "stylesheets/profile";
import "stylesheets/video";
import "stylesheets/videos";
