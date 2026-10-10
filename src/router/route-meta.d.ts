export {};

declare module 'vue-router' {
  interface RouteMeta {
    /** When true, the route is reachable without a session. */
    public?: boolean;
  }
}
