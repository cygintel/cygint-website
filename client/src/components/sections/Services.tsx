import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { fadeIn, staggerContainer } from "@/lib/motion";
import { Check } from "lucide-react";

const assessmentItems = [
  "Device firmware analysis",
  "Network communication security",
  "Authentication and access control review",
  "Data protection evaluation"
];

const strategyItems = [
  "Security architecture design",
  "Secure development lifecycle guidance",
  "Vendor security assessment",
  "Incident response planning"
];

const trainingItems = [
  "Secure coding practices",
  "Threat modeling techniques",
  "Security testing methodologies",
  "Incident response procedures"
];

export default function Services() {
  return (
    <section id="services" className="py-16">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          variants={fadeIn("up", "tween", 0.2, 1)}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-800 mb-4">
            IoT Security Consulting Services
          </h2>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
            Our team of security experts provides specialized consulting services to secure your IoT ecosystem.
          </p>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          variants={staggerContainer(0.1, 0.1)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
        >
          <motion.div variants={fadeIn("up", "tween", 0.2, 1)}>
            <Card className="h-full overflow-hidden">
              <div 
                className="h-56 bg-cover bg-center" 
                style={{ backgroundImage: "url('https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80')" }}
              ></div>
              <CardContent className="p-6">
                <h3 className="text-2xl font-semibold mb-3">IoT Security Assessment</h3>
                <p className="text-neutral-600 mb-4">
                  Comprehensive security assessment of your IoT devices, infrastructure, and deployment practices to identify vulnerabilities and risks.
                </p>
                <ul className="mb-6 space-y-2">
                  {assessmentItems.map((item, index) => (
                    <li key={index} className="flex items-center">
                      <Check className="text-primary mr-2" size={18} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <Button asChild>
                  <a href="#contact">Learn More</a>
                </Button>
              </CardContent>
            </Card>
          </motion.div>
          
          <motion.div variants={fadeIn("up", "tween", 0.3, 1)}>
            <Card className="h-full overflow-hidden">
              <div 
                className="h-56 bg-cover bg-center" 
                style={{ backgroundImage: "url('https://images.unsplash.com/photo-1563453392212-326f5e854473?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80')" }}
              ></div>
              <CardContent className="p-6">
                <h3 className="text-2xl font-semibold mb-3">IoT Security Strategy & Implementation</h3>
                <p className="text-neutral-600 mb-4">
                  Strategic consulting to develop and implement a comprehensive IoT security program tailored to your organization's needs.
                </p>
                <ul className="mb-6 space-y-2">
                  {strategyItems.map((item, index) => (
                    <li key={index} className="flex items-center">
                      <Check className="text-primary mr-2" size={18} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <Button asChild>
                  <a href="#contact">Learn More</a>
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
        
        <motion.div 
          className="mt-12 bg-gradient-to-r from-blue-600 to-primary rounded-lg shadow-lg p-8 text-white"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          variants={fadeIn("up", "tween", 0.4, 1)}
        >
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-2/3 mb-6 md:mb-0">
              <h3 className="text-2xl font-semibold mb-3">Custom IoT Security Training</h3>
              <p className="mb-4">
                Specialized training programs for your development, operations, and security teams to build and maintain secure IoT systems.
              </p>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-4 mb-0">
                {trainingItems.map((item, index) => (
                  <li key={index} className="flex items-center">
                    <Check className="mr-2" size={18} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="md:w-1/3 md:text-right">
              <Button asChild variant="secondary" className="bg-white text-primary hover:bg-neutral-100">
                <a href="#contact">Contact Us</a>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
