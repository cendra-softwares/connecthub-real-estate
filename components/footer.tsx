import Link from "next/link"
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react"

export function Footer() {
    return (
        <footer className="bg-gray-900 text-gray-300">
            <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
                    {/* Company Info */}
                    <div>
                        <div className="flex items-center space-x-2 mb-4">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-green-500 to-emerald-600">
                                <span className="text-xl font-bold text-white">C</span>
                            </div>
                            <span className="text-xl font-bold text-white">ConnectHub</span>
                        </div>
                        <p className="text-sm text-gray-400 mb-4">
                            Your trusted partner in finding the perfect property. Making real estate simple and accessible for everyone.
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" className="text-gray-400 hover:text-green-500 transition-colors">
                                <Facebook className="h-5 w-5" />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-green-500 transition-colors">
                                <Twitter className="h-5 w-5" />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-green-500 transition-colors">
                                <Instagram className="h-5 w-5" />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-green-500 transition-colors">
                                <Linkedin className="h-5 w-5" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/" className="text-sm hover:text-green-500 transition-colors">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link href="/about" className="text-sm hover:text-green-500 transition-colors">
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link href="/properties" className="text-sm hover:text-green-500 transition-colors">
                                    Properties
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact" className="text-sm hover:text-green-500 transition-colors">
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Property Types */}
                    <div>
                        <h3 className="text-lg font-semibold text-white mb-4">Property Types</h3>
                        <ul className="space-y-2">
                            <li>
                                <a href="#" className="text-sm hover:text-green-500 transition-colors">
                                    Flat / Apartment
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-sm hover:text-green-500 transition-colors">
                                    House / Villa
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-sm hover:text-green-500 transition-colors">
                                    Commercial
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-sm hover:text-green-500 transition-colors">
                                    Residential Land
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-lg font-semibold text-white mb-4">Contact Us</h3>
                        <ul className="space-y-3">
                            <li className="flex items-start gap-3">
                                <MapPin className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                                <span className="text-sm">123 Real Estate Ave, Mumbai, Maharashtra 400001</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone className="h-5 w-5 text-green-500 flex-shrink-0" />
                                <span className="text-sm">+91 98765 43210</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail className="h-5 w-5 text-green-500 flex-shrink-0" />
                                <span className="text-sm">info@connecthub.com</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-12 pt-8 border-t border-gray-800">
                    <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
                        <p className="text-sm text-gray-400">
                            © 2024 ConnectHub. All rights reserved.
                        </p>
                        <div className="flex gap-6">
                            <Link href="/privacy" className="text-sm text-gray-400 hover:text-green-500 transition-colors">
                                Privacy Policy
                            </Link>
                            <Link href="/terms" className="text-sm text-gray-400 hover:text-green-500 transition-colors">
                                Terms of Service
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}
