"use client";

import { motion } from "framer-motion";

const MotionWrapper = ({ children }: { children: React.ReactNode }) => {
    return (
        <motion.div
            initial={{ y: 0 }}
            whileHover={{ y: -10 }}
            transition={{ type: "tween", duration: 0.3, ease: "easeInOut" }}
        >
            {children}
        </motion.div>
    );
};

export default MotionWrapper;
