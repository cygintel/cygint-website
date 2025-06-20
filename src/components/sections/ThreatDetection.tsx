import React from "react";
import ThreatRadar from "../ThreatRadar";
import { motion } from "framer-motion";

// Define animation variants inline since we can't import from client
const fadeIn = (
  direction: "left" | "right" | "up" | "down" | "none",
  type: "tween" | "spring",
  delay: number,
  duration: number,
) => {
  return {
    hidden: {
      x: direction === "left" ? 100 : direction === "right" ? -100 : 0,
      y: direction === "up" ? 100 : direction === "down" ? -100 : 0,
      opacity: 0,
    },
    show: {
      x: 0,
      y: 0,
      opacity: 1,
      transition: {
        type,
        delay,
        duration,
        ease: "easeOut",
      },
    },
  };
};

const slideIn = (
  direction: "left" | "right" | "up" | "down",
  type: "tween" | "spring",
  delay: number,
  duration: number,
) => {
  return {
    hidden: {
      x: direction === "left" ? "-100%" : direction === "right" ? "100%" : 0,
      y: direction === "up" ? "100%" : direction === "down" ? "100%" : 0,
    },
    show: {
      x: 0,
      y: 0,
      transition: {
        type,
        delay,
        duration,
        ease: "easeOut",
      },
    },
  };
};

const ThreatDetection: React.FC = () => {
  return (
    <section className="py-24 bg-muted/30" id="threat-detection">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <motion.div
            className="text-center mb-12"
            variants={fadeIn("up", "spring", 0.2, 1)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Real-Time Threat Detection
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our advanced analytics engine continuously monitors your attack
              surface to detect and prioritize threats before they can be
              exploited.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-center">
            <motion.div
              className="lg:col-span-3 order-2 lg:order-1"
              variants={slideIn("left", "tween", 0.2, 1)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.25 }}
            >
              <div className="space-y-6">
                <div className="bg-card rounded-lg p-6 border border-border/50 shadow-sm">
                  <div className="flex items-start">
                    <div className="bg-primary/10 p-3 rounded-full mr-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-primary"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">
                        Comprehensive Detection
                      </h3>
                      <p className="text-muted-foreground">
                        Our platform detects vulnerabilities across your entire
                        infrastructure, including misconfigurations, exposed
                        credentials, and zero-day exploits.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-card rounded-lg p-6 border border-border/50 shadow-sm">
                  <div className="flex items-start">
                    <div className="bg-primary/10 p-3 rounded-full mr-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-primary"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 10V3L4 14h7v7l9-11h-7z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">
                        Intelligent Prioritization
                      </h3>
                      <p className="text-muted-foreground">
                        Not all threats are equal. Our AI-driven risk scoring
                        ensures you focus on the vulnerabilities that pose the
                        greatest risk to your business.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-card rounded-lg p-6 border border-border/50 shadow-sm">
                  <div className="flex items-start">
                    <div className="bg-primary/10 p-3 rounded-full mr-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-primary"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">
                        Real-Time Alerting
                      </h3>
                      <p className="text-muted-foreground">
                        Receive instant notifications through your preferred
                        channels when critical threats are detected, allowing
                        for rapid response.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="lg:col-span-2 order-1 lg:order-2 flex justify-center"
              variants={slideIn("right", "tween", 0.2, 1)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.25 }}
            >
              <div className="relative">
                <ThreatRadar width={400} height={400} className="mx-auto" />
                <div className="absolute top-1/2 left-1/2 w-96 h-96 -translate-x-1/2 -translate-y-1/2 bg-primary/5 rounded-full blur-3xl -z-10"></div>
              </div>
            </motion.div>
          </div>

          <motion.div
            className="mt-12 text-center"
            variants={fadeIn("up", "spring", 0.5, 1)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
          >
            <a
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              Book a Demo
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </a>
            <p className="mt-4 text-sm text-muted-foreground">
              See our advanced threat detection in action with a personalized
              demo.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ThreatDetection;
