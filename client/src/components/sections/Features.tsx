import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { fadeIn } from "@/lib/motion";
import { 
  Search, 
  ShieldCheck, 
  Network, 
  Monitor, 
  Bot, 
  FileText 
} from "lucide-react";

const features = [
  {
    icon: Search,
    title: "Asset Discovery",
    description: "Automatically identify and inventory all internet-facing assets across your attack surface."
  },
  {
    icon: ShieldCheck,
    title: "Vulnerability Assessment",
    description: "Continuous scanning and prioritization of vulnerabilities based on risk and exploitability."
  },
  {
    icon: Network,
    title: "Attack Path Analysis",
    description: "Visualize potential attack paths through your infrastructure to prioritize remediation efforts."
  },
  {
    icon: Monitor,
    title: "Monitoring & Alerts",
    description: "Real-time monitoring and alerts for new vulnerabilities, exposures, and configuration issues."
  },
  {
    icon: Bot,
    title: "IoT Security Testing",
    description: "Specialized testing and monitoring for Internet of Things devices in your environment."
  },
  {
    icon: FileText,
    title: "Compliance Reporting",
    description: "Automated reporting for compliance with standards like NIST, ISO 27001, PCI DSS, and HIPAA."
  }
];

export default function Features() {
  return (
    <section id="features" className="py-16">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          variants={fadeIn("up", "tween", 0.2, 1)}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-800 mb-4">Platform Features</h2>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
            Our attack surface management platform provides comprehensive visibility and protection for your entire digital ecosystem.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.25 }}
              variants={fadeIn("up", "tween", 0.2 + index * 0.1, 1)}
            >
              <Card className="h-full transition duration-300 hover:shadow-xl">
                <CardContent className="p-6 flex flex-col h-full">
                  <div className="text-primary mb-4">
                    <feature.icon size={32} />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-neutral-600">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
