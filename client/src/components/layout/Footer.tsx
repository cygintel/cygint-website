import { Link } from "wouter";
import { Separator } from "@/components/ui/separator";
import { 
  FaLinkedinIn, 
  FaTwitter, 
  FaFacebookF, 
  FaGithub 
} from "react-icons/fa";
import logoSvg from "../../assets/logo.svg";

const platformLinks = [
  { name: "Features", href: "#features" },
  { name: "Pricing", href: "#pricing" },
  { name: "API Documentation", href: "#" },
  { name: "Release Notes", href: "#" },
];

const servicesLinks = [
  { name: "IoT Security Assessment", href: "#services" },
  { name: "Security Strategy", href: "#services" },
  { name: "Custom Training", href: "#services" },
  { name: "Consulting", href: "#contact" },
];

const companyLinks = [
  { name: "About Us", href: "#" },
  { name: "Careers", href: "#" },
  { name: "Blog", href: "#" },
  { name: "Contact", href: "#contact" },
];

const policyLinks = [
  { name: "Privacy Policy", href: "#" },
  { name: "Terms of Service", href: "#" },
  { name: "Cookie Policy", href: "#" },
];

const socialLinks = [
  { name: "LinkedIn", icon: FaLinkedinIn, href: "#" },
  { name: "Twitter", icon: FaTwitter, href: "#" },
  { name: "Facebook", icon: FaFacebookF, href: "#" },
  { name: "GitHub", icon: FaGithub, href: "#" },
];

export default function Footer() {
  return (
    <footer className="bg-neutral-800 text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center mb-4">
              <img src={logoSvg} alt="Cygint Logo" className="h-8 w-auto mr-2 brightness-0 invert" />
              <h3 className="text-xl font-bold">Cygint</h3>
            </div>
            <p className="text-neutral-400 mb-4">
              Comprehensive attack surface management and IoT security solutions for organizations of all sizes.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((link) => (
                <a 
                  key={link.name}
                  href={link.href} 
                  className="text-neutral-400 hover:text-white transition"
                  aria-label={link.name}
                >
                  <link.icon size={20} />
                </a>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Platform</h3>
            <ul className="space-y-2">
              {platformLinks.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href} 
                    className="text-neutral-400 hover:text-white transition"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              {servicesLinks.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href} 
                    className="text-neutral-400 hover:text-white transition"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              {companyLinks.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href} 
                    className="text-neutral-400 hover:text-white transition"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <Separator className="bg-neutral-700" />
        
        <div className="pt-6 flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-neutral-400">&copy; {new Date().getFullYear()} Cygint, Inc. All rights reserved.</p>
          </div>
          <div className="flex flex-wrap justify-center gap-6">
            {policyLinks.map((link) => (
              <a 
                key={link.name}
                href={link.href} 
                className="text-neutral-400 hover:text-white transition text-sm"
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
