import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { motion } from "framer-motion";
import { fadeIn, staggerContainer } from "@/lib/motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    quote: "Cygint's platform completely transformed our security operations. We now have full visibility of our attack surface and can proactively address vulnerabilities before they become problems.",
    name: "Sarah Johnson",
    title: "CISO, TechCorp Inc.",
    initials: "SJ"
  },
  {
    quote: "The IoT security consulting team at Cygint provided invaluable guidance for our smart building initiative. Their expertise helped us avoid potential security pitfalls and implement best practices from day one.",
    name: "Michael Rodriguez",
    title: "IT Director, Global Properties",
    initials: "MR"
  },
  {
    quote: "What sets Cygint apart is their deep understanding of both security principles and business objectives. They don't just identify problems; they provide practical, risk-based solutions that work for our organization.",
    name: "Jennifer Lee",
    title: "Security Operations Manager, HealthFirst",
    initials: "JL"
  }
];

export default function Testimonials() {
  return (
    <section className="py-16 bg-muted/50">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-12"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          variants={fadeIn("up", "tween", 0.2, 1)}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Trusted by Security Leaders
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Hear what our clients have to say about our platform and services.
          </p>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={staggerContainer(0.1, 0.1)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              variants={fadeIn("up", "tween", 0.2 + index * 0.1, 1)}
            >
              <Card className="h-full">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="text-amber-500 flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={18} fill="currentColor" />
                      ))}
                    </div>
                  </div>
                  <p className="text-muted-foreground mb-6">"{testimonial.quote}"</p>
                  <div className="flex items-center">
                    <Avatar className="mr-4">
                      <AvatarFallback className="bg-primary/10 text-primary">
                        {testimonial.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.title}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
