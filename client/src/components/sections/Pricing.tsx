import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { fadeIn } from "@/lib/motion";
import { Check } from "lucide-react";

const pricingTiers = [
  {
    name: "Standard",
    description: "For small organizations with limited assets",
    price: "$499",
    period: "/month",
    featured: false,
    color: "border-blue-500",
    buttonVariant: "secondary" as const,
    buttonText: "Get Started",
    features: [
      "Up to 100 assets",
      "Weekly vulnerability scanning",
      "Basic asset discovery",
      "Email alerts",
      "Standard support (business hours)"
    ]
  },
  {
    name: "Professional",
    description: "For mid-sized organizations with growing infrastructure",
    price: "$1,499",
    period: "/month",
    featured: true,
    color: "border-primary",
    buttonVariant: "default" as const,
    buttonText: "Get Started",
    features: [
      "Up to 500 assets",
      "Daily vulnerability scanning",
      "Advanced asset discovery",
      "API access",
      "Priority support (extended hours)",
      "Quarterly security review"
    ]
  },
  {
    name: "Enterprise",
    description: "For large organizations with complex environments",
    price: "Custom",
    period: "",
    featured: false,
    color: "border-neutral-800",
    buttonVariant: "outline" as const,
    buttonText: "Contact Sales",
    features: [
      "Unlimited assets",
      "Continuous vulnerability monitoring",
      "Custom integrations",
      "Dedicated security engineer",
      "24/7 premium support",
      "Monthly executive reporting"
    ]
  }
];

export default function Pricing() {
  return (
    <section id="pricing" className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          variants={fadeIn("up", "tween", 0.2, 1)}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Flexible Pricing for Every Organization
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Choose the plan that fits your organization's needs and scale as you grow.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pricingTiers.map((tier, index) => (
            <motion.div
              key={tier.name}
              className={`${tier.featured ? "lg:-mt-4 lg:mb-4" : ""}`}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.25 }}
              variants={fadeIn("up", "tween", 0.2 + index * 0.1, 1)}
            >
              <Card 
                className={`h-full transform transition duration-300 hover:-translate-y-1 hover:shadow-xl relative ${
                  tier.featured ? "z-10 shadow-xl" : "shadow-lg"
                }`}
              >
                <div className={`w-full h-1 ${tier.color}`} />
                {tier.featured && (
                  <div className="absolute top-0 right-0 bg-amber-500 text-white text-xs font-bold py-1 px-4 rounded-bl-lg">
                    MOST POPULAR
                  </div>
                )}
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-2">{tier.name}</h3>
                  <p className="text-muted-foreground mb-6">{tier.description}</p>
                  <div className="mb-6">
                    <span className="text-4xl font-bold">{tier.price}</span>
                    <span className="text-muted-foreground">{tier.period}</span>
                  </div>
                  
                  <p className="mb-2 font-medium">
                    {index === 0 ? "Includes:" : `Everything in ${pricingTiers[index - 1].name}, plus:`}
                  </p>
                  
                  <ul className="mb-8 space-y-3">
                    {tier.features.map((feature, i) => (
                      <li key={i} className="flex items-start">
                        <Check className="text-green-500 mt-1 mr-3" size={18} />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button 
                    asChild 
                    variant={tier.buttonVariant}
                    className="w-full"
                  >
                    <a href="#contact">{tier.buttonText}</a>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          className="mt-12 text-center"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          variants={fadeIn("up", "tween", 0.5, 1)}
        >
          <p className="text-muted-foreground mb-6">Need a custom solution? Contact our sales team for personalized pricing.</p>
          <Button asChild>
            <a href="#contact">Contact Sales</a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
