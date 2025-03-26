import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { fadeIn, slideIn } from "@/lib/motion";

export default function Hero() {
  return (
    <section className="pt-28 pb-16 bg-gradient-to-r from-primary to-blue-500">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          <motion.div 
            className="md:w-1/2 mb-10 md:mb-0 text-white"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeIn("right", "tween", 0.2, 1)}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Secure Your Digital Perimeter</h1>
            <p className="text-xl mb-8">
              Comprehensive attack surface management and IoT security solutions to protect your organization from evolving cyber threats.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Button 
                asChild
                size="lg"
                variant="secondary"
                className="bg-white text-primary hover:bg-neutral-100 py-6"
              >
                <a href="#contact">Request Demo</a>
              </Button>
              <Button 
                asChild
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-primary py-6"
              >
                <a href="#features">Learn More</a>
              </Button>
            </div>
          </motion.div>
          
          <motion.div 
            className="md:w-1/2"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={slideIn("right", "tween", 0.2, 1)}
          >
            <img 
              src="https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
              alt="Network security visualization" 
              className="rounded-lg shadow-xl"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
