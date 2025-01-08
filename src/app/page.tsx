"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { ChevronDown, Menu, X, ChevronUp } from "lucide-react"
import Link from "next/link"

export default function Home() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [openFaq, setOpenFaq] = useState<number | null>(null)

    const fadeIn = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
    }

    const testimonials = [
        {
            name: "John Doe",
            role: "CEO, TechCorp",
            content:
                "This SaaS platform has revolutionized our workflow. Highly recommended!",
        },
        {
            name: "Jane Smith",
            role: "CTO, InnovateCo",
            content:
                "The features and ease of use are unmatched. It's a game-changer for our team.",
        },
        {
            name: "Alex Johnson",
            role: "Founder, StartupX",
            content:
                "I can't imagine running my business without this platform. It's simply amazing.",
        },
    ]

    const faqs = [
        {
            question: "What is this SaaS platform?",
            answer: "Our SaaS platform is an all-in-one solution that combines authentication, efficient routing, modern styling, robust ORM, serverless database, and real-time event handling to streamline your development process.",
        },
        {
            question: "How does the pricing work?",
            answer: "We offer flexible pricing tiers based on your needs. Contact our sales team for a customized quote that fits your business requirements.",
        },
        {
            question: "Is there a free trial available?",
            answer: "Yes, we offer a 14-day free trial so you can experience the full power of our platform before making a commitment.",
        },
        {
            question: "What kind of support do you offer?",
            answer: "We provide 24/7 customer support through email and chat. Our dedicated team is always ready to assist you with any questions or issues.",
        },
    ]

    return (
        <div className="min-h-screen bg-black text-white">
            {/* Navigation */}
            <nav className="fixed top-0 left-0 right-0 z-50 bg-zinc-900 bg-opacity-90 backdrop-blur-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center">
                            <a href="#" className="text-xl font-bold">
                                SaaSPlatform
                            </a>
                        </div>
                        <div className="hidden md:block">
                            <div className="ml-10 flex items-baseline space-x-4">
                                <a
                                    href="#features"
                                    className="text-zinc-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                                >
                                    Features
                                </a>
                                <a
                                    href="#testimonials"
                                    className="text-zinc-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                                >
                                    Testimonials
                                </a>
                                <a
                                    href="#faq"
                                    className="text-zinc-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                                >
                                    FAQ
                                </a>
                                <a
                                    href="#cta"
                                    className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:from-purple-700 hover:to-indigo-700 transition duration-300"
                                >
                                    Sign Up
                                </a>
                            </div>
                        </div>
                        <div className="md:hidden">
                            <button
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className="text-zinc-300 hover:text-white"
                            >
                                {isMenuOpen ? (
                                    <X size={24} />
                                ) : (
                                    <Menu size={24} />
                                )}
                            </button>
                        </div>
                    </div>
                </div>
                {isMenuOpen && (
                    <div className="md:hidden">
                        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                            <a
                                href="#features"
                                className="text-zinc-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                            >
                                Features
                            </a>
                            <a
                                href="#testimonials"
                                className="text-zinc-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                            >
                                Testimonials
                            </a>
                            <a
                                href="#faq"
                                className="text-zinc-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                            >
                                FAQ
                            </a>
                            <a
                                href="#cta"
                                className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white block px-3 py-2 rounded-md text-base font-medium hover:from-purple-700 hover:to-indigo-700 transition duration-300"
                            >
                                Sign Up
                            </a>
                        </div>
                    </div>
                )}
            </nav>

            {/* Hero Section */}
            <section className="relative h-screen flex items-center justify-center overflow-hidden pt-16 bg-gradient-to-b from-black to-zinc-900">
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={fadeIn}
                    transition={{ duration: 0.6 }}
                    className="text-center z-10"
                >
                    <h1 className="text-5xl md:text-7xl font-bold mb-6">
                        Your All-in-One SaaS Solution
                    </h1>
                    <p className="text-xl md:text-2xl mb-8 text-zinc-300">
                        Streamline your workflow and boost productivity
                    </p>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:from-purple-700 hover:to-indigo-700 transition duration-300"
                    >
                        Get Started
                    </motion.button>
                </motion.div>
                <motion.div
                    animate={{
                        y: [0, 10, 0],
                    }}
                    transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        repeatType: "reverse",
                    }}
                    className="absolute bottom-10"
                >
                    <ChevronDown size={32} />
                </motion.div>
            </section>

            {/* Features Section */}
            <section id="features" className="py-20 px-4">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeIn}
                    transition={{ duration: 0.6 }}
                    className="max-w-6xl mx-auto"
                >
                    <h2 className="text-4xl font-bold mb-12 text-center">
                        Features
                    </h2>
                    <div className="grid md:grid-cols-2 gap-8">
                        {[
                            {
                                title: "Clerk Authentication",
                                description:
                                    "Secure and easy-to-implement user authentication.",
                                icon: "🔐",
                            },
                            {
                                title: "Next.js App Router",
                                description:
                                    "Fast and efficient routing for your web application.",
                                icon: "🚀",
                            },
                            {
                                title: "Tailwind CSS",
                                description:
                                    "Rapidly build custom user interfaces with utility classes.",
                                icon: "🎨",
                            },
                            {
                                title: "Drizzle ORM",
                                description:
                                    "Type-safe and intuitive database toolkit for TypeScript.",
                                icon: "🗃️",
                            },
                            {
                                title: "NeonDB Integration",
                                description:
                                    "Serverless Postgres for modern, scalable applications.",
                                icon: "☁️",
                            },
                            {
                                title: "Webhooks",
                                description:
                                    "Real-time event handling for authentication maintenance.",
                                icon: "🔗",
                            },
                        ].map((feature, index) => (
                            <motion.div
                                key={index}
                                whileHover={{ scale: 1.05 }}
                                className="bg-zinc-900 backdrop-filter backdrop-blur-lg bg-opacity-80 p-6 rounded-lg flex items-start space-x-4"
                            >
                                <div className="text-4xl">{feature.icon}</div>
                                <div>
                                    <h3 className="text-xl font-semibold mb-2">
                                        {feature.title}
                                    </h3>
                                    <p className="text-zinc-400">
                                        {feature.description}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </section>

            {/* Testimonials Section */}
            <section
                id="testimonials"
                className="py-20 px-4 bg-gradient-to-r from-zinc-900 to-black"
            >
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeIn}
                    transition={{ duration: 0.6 }}
                    className="max-w-6xl mx-auto"
                >
                    <h2 className="text-4xl font-bold mb-12 text-center">
                        What Our Clients Say
                    </h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {testimonials.map((testimonial, index) => (
                            <motion.div
                                key={index}
                                whileHover={{ scale: 1.05 }}
                                className="bg-zinc-800 backdrop-filter backdrop-blur-lg bg-opacity-80 p-6 rounded-lg"
                            >
                                <p className="text-lg mb-4">
                                    "{testimonial.content}"
                                </p>
                                <div className="font-semibold">
                                    {testimonial.name}
                                </div>
                                <div className="text-zinc-400">
                                    {testimonial.role}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </section>

            {/* FAQ Section */}
            <section id="faq" className="py-20 px-4">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeIn}
                    transition={{ duration: 0.6 }}
                    className="max-w-3xl mx-auto"
                >
                    <h2 className="text-4xl font-bold mb-12 text-center">
                        Frequently Asked Questions
                    </h2>
                    {faqs.map((faq, index) => (
                        <div key={index} className="mb-4">
                            <button
                                onClick={() =>
                                    setOpenFaq(openFaq === index ? null : index)
                                }
                                className="flex justify-between items-center w-full text-left p-4 bg-zinc-900 rounded-lg focus:outline-none"
                            >
                                <span className="font-semibold">
                                    {faq.question}
                                </span>
                                {openFaq === index ? (
                                    <ChevronUp size={20} />
                                ) : (
                                    <ChevronDown size={20} />
                                )}
                            </button>
                            {openFaq === index && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="p-4 bg-zinc-800 rounded-b-lg"
                                >
                                    {faq.answer}
                                </motion.div>
                            )}
                        </div>
                    ))}
                </motion.div>
            </section>

            {/* CTA Section */}
            <section
                id="cta"
                className="py-20 px-4 bg-gradient-to-br from-purple-900 to-indigo-900"
            >
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeIn}
                    transition={{ duration: 0.6 }}
                    className="max-w-3xl mx-auto text-center"
                >
                    <h2 className="text-4xl font-bold mb-6">
                        Ready to Get Started?
                    </h2>
                    <p className="text-xl mb-8 text-zinc-300">
                        Sign up now and transform your workflow
                    </p>
                    <form
                        onSubmit={e => e.preventDefault()}
                        className="flex flex-col md:flex-row gap-4 justify-center"
                    >
                        <Link href="/sign-up">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:from-purple-700 hover:to-indigo-700 transition duration-300"
                            >
                                Sign Up
                            </motion.button>
                        </Link>
                    </form>
                </motion.div>
            </section>

            {/* Footer */}
            <footer className="bg-black py-8 px-4">
                <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
                    <div className="text-center md:text-left mb-4 md:mb-0">
                        <h3 className="text-xl font-bold">SaaSPlatform</h3>
                        <p className="text-zinc-400">
                            © 2023 All rights reserved
                        </p>
                    </div>
                    <div className="flex space-x-4">
                        <a
                            href="#"
                            className="text-zinc-400 hover:text-white transition duration-300"
                        >
                            Privacy Policy
                        </a>
                        <a
                            href="#"
                            className="text-zinc-400 hover:text-white transition duration-300"
                        >
                            Terms of Service
                        </a>
                        <a
                            href="#"
                            className="text-zinc-400 hover:text-white transition duration-300"
                        >
                            Contact Us
                        </a>
                    </div>
                </div>
            </footer>
        </div>
    )
}
