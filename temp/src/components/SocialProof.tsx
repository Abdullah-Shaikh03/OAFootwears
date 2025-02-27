import { motion } from "framer-motion";

export function SocialProof() {
  const stats = [
    { label: "Happy Customers", value: "10,000+" },
    { label: "Products Sold", value: "50,000+" },
    { label: "Years in Business", value: "15+" },
  ];

  return (
    <section className="my-16 w-full max-w-4xl">
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="text-center"
          >
            <h3 className="text-3xl font-bold text-primary">{stat.value}</h3>
            <p className="text-gray-400">{stat.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

