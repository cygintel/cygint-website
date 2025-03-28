import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupAstroDevServer, serveAstroStatic } from "./astro-adapter";
import { spawn, type ChildProcess } from "child_process";

// Simple logging utility
function log(message: string, source = "express") {
  console.log(`[${source}] ${message}`);
}

// Start Astro dev server in development mode
let astroProcess: ChildProcess | null = null;
function startAstroDevServer() {
  if (process.env.NODE_ENV === "development" && !astroProcess) {
    log("Starting Astro dev server...", "astro");
    astroProcess = spawn("npx", ["astro", "dev", "--host", "0.0.0.0", "--port", "4321"], {
      stdio: "inherit",
      shell: true,
      env: {
        ...process.env,
        ASTRO_TELEMETRY_DISABLED: "true", // Disable telemetry for faster startup
      },
    });

    astroProcess.on("close", (code) => {
      log(`Astro dev server exited with code ${code}`, "astro");
      astroProcess = null;
    });

    // Give some time for Astro to start up
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        log("Astro server should be starting up...", "astro");
        resolve();
      }, 2000);
    });
  }
  return Promise.resolve();
}

// Handle process termination
process.on("SIGINT", () => {
  log("Shutting down servers...");
  if (astroProcess) {
    astroProcess.kill();
  }
  process.exit(0);
});

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

(async () => {
  // In development mode, start Astro dev server first
  if (process.env.NODE_ENV !== "production") {
    process.env.NODE_ENV = "development";
    await startAstroDevServer();
  }

  const server = await registerRoutes(app);

  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    res.status(status).json({ message });
    console.error(err);
  });

  // Setup Astro in development or serve static files in production
  // This comes after all other routes so the catch-all doesn't
  // interfere with the API routes
  if (app.get("env") === "development") {
    await setupAstroDevServer(app, server);
  } else {
    serveAstroStatic(app);
  }

  // ALWAYS serve the app on port 5000
  // this serves both the API and the client.
  // It is the only port that is not firewalled.
  const port = 5000;
  server.listen({
    port,
    host: "0.0.0.0",
    reusePort: true,
  }, () => {
    log(`serving on port ${port}`);
  });
})();
