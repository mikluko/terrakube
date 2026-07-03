import { ComponentType, lazy } from "react";

const RELOAD_FLAG = "terrakube-chunk-reload";

/**
 * Drop-in replacement for React.lazy that survives redeployments.
 *
 * Code-split chunks have hashed filenames, so when a new UI version is
 * deployed the chunks referenced by an already-open session disappear and
 * dynamic import() rejects ("Importing a module script failed"). A single
 * page reload fetches the new index.html and fixes the references, so on
 * the first failure we reload once; if the import still fails after the
 * reload the error is rethrown and surfaces in the route error boundary.
 */
export function lazyRetry<T extends ComponentType<any>>(factory: () => Promise<{ default: T }>) {
  return lazy(async () => {
    try {
      const module = await factory();
      sessionStorage.removeItem(RELOAD_FLAG);
      return module;
    } catch (error) {
      if (!sessionStorage.getItem(RELOAD_FLAG)) {
        sessionStorage.setItem(RELOAD_FLAG, "1");
        window.location.reload();
        // The page is reloading; keep Suspense pending instead of erroring.
        return new Promise<never>(() => {});
      }
      throw error;
    }
  });
}

export default lazyRetry;
