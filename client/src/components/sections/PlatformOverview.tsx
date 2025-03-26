import { motion } from "framer-motion";
import { fadeIn, slideIn } from "@/lib/motion";
import { CheckCircle } from "lucide-react";

const platformFeatures = [
  {
    title: "Real-time Dashboard",
    description: "Monitor your security posture with intuitive visualizations and actionable insights."
  },
  {
    title: "Risk Prioritization",
    description: "Intelligent scoring system helps you focus on the most critical vulnerabilities first."
  },
  {
    title: "Integration Ecosystem",
    description: "Seamlessly integrate with your existing security tools and workflow systems."
  },
  {
    title: "Automated Remediation",
    description: "Actionable remediation guidance and automated workflows to fix vulnerabilities."
  }
];

export default function PlatformOverview() {
  return (
    <section className="py-16 bg-neutral-100">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          <motion.div 
            className="md:w-1/2 mb-10 md:mb-0"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            variants={slideIn("left", "tween", 0.2, 1)}
          >
            <img 
              src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
              alt="Attack surface management dashboard" 
              className="rounded-lg shadow-xl"
            />
          </motion.div>
          
          <motion.div 
            className="md:w-1/2 md:pl-12"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            variants={fadeIn("right", "tween", 0.2, 1)}
          >
            <h2 className="text-3xl font-bold text-neutral-800 mb-6">
              Comprehensive Attack Surface Visibility
            </h2>
            <div className="space-y-4">
              {platformFeatures.map((feature, index) => (
                <motion.div 
                  key={feature.title} 
                  className="flex items-start"
                  variants={fadeIn("right", "tween", 0.2 + index * 0.1, 1)}
                >
                  <div className="text-primary mt-1 mr-4">
                    <CheckCircle size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-1">{feature.title}</h3>
                    <p className="text-neutral-600">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
