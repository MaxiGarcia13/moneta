export {};

declare module 'vue-router' {
  interface RouteMeta {
    public?: boolean;
    isNavigable?: boolean;
  }
}
