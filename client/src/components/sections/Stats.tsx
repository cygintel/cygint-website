import { motion } from "framer-motion";
import { fadeIn } from "@/lib/motion";

const stats = [
  { value: "98%", label: "Threat Detection Rate" },
  { value: "500+", label: "Enterprise Clients" },
  { value: "30min", label: "Average Response Time" },
];

export default function Stats() {
  return (
    <section className="py-12 bg-neutral-100">
      <div className="container mx-auto px-4">
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          variants={fadeIn("up", "tween", 0.2, 1)}
        >
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <p className="text-4xl font-bold text-primary mb-2">{stat.value}</p>
              <p className="text-neutral-600">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
