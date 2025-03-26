import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { fadeIn } from "@/lib/motion";

export default function CTA() {
  return (
    <section className="py-16 bg-gradient-to-r from-primary to-blue-500 text-white">
      <div className="container mx-auto px-4 text-center">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          variants={fadeIn("up", "tween", 0.2, 1)}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Secure Your Digital Assets?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Join hundreds of organizations that trust Cygint to protect their attack surface and IoT infrastructure.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Button 
              asChild
              size="lg"
              variant="secondary"
              className="bg-white text-primary hover:bg-neutral-100"
            >
              <a href="#contact">Get Started Today</a>
            </Button>
            <Button 
              asChild
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-primary"
            >
              <a href="#pricing">View Pricing</a>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
