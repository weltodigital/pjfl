import { Link } from "react-router-dom";
import {
  Building,
  Calculator,
  Clock,
  FileText,
  MonitorSmartphone,
  PieChart,
  Shield,
  TrendingUp,
  Users,
} from "lucide-react";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const services = [
  {
    icon: Calculator,
    title: "Tax Planning & Preparation",
    description:
      "Comprehensive tax services including personal and corporate tax returns, tax planning strategies, and HMRC compliance.",
    features: [
      "Personal Tax Returns",
      "Corporate Tax Planning",
      "Capital Gains Tax",
      "Inheritance Tax Planning",
      "VAT Registration & Returns",
      "HMRC Investigations Support",
    ],
  },
  {
    icon: MonitorSmartphone,
    title: "Making Tax Digital (MTD)",
    description:
      "Get set up for HMRC's Making Tax Digital regime and stay compliant, from digital record keeping through to quarterly submissions.",
    features: [
      "MTD for VAT Compliance",
      "MTD for Income Tax Self Assessment",
      "Compatible Software Setup",
      "Digital Record Keeping",
      "Quarterly Update Submissions",
      "Bridging Software for Spreadsheets",
    ],
  },
  {
    icon: FileText,
    title: "Bookkeeping Services",
    description:
      "Accurate and timely bookkeeping to keep your financial records in perfect order.",
    features: [
      "Daily Transaction Recording",
      "Bank Reconciliation",
      "Purchase & Sales Ledgers",
      "Credit Control",
      "Management Accounts",
      "Cloud-based Solutions",
    ],
  },
  {
    icon: TrendingUp,
    title: "Business Advisory",
    description: "Strategic business advice to help your company grow and prosper.",
    features: [
      "Business Planning",
      "Cash Flow Forecasting",
      "Performance Analysis",
      "Growth Strategies",
      "Financial Modelling",
      "Investment Advice",
    ],
  },
  {
    icon: Users,
    title: "Payroll Services",
    description:
      "Complete payroll management ensuring compliance with all employment regulations.",
    features: [
      "Monthly Payroll Processing",
      "RTI Submissions",
      "Auto Enrolment Pensions",
      "P11D Preparation",
      "Employment Status Reviews",
      "Payroll Software Setup",
    ],
  },
  {
    icon: Building,
    title: "Company Formation",
    description: "Complete company formation services with ongoing compliance support.",
    features: [
      "Company Registration",
      "Articles of Association",
      "Share Capital Structure",
      "Directors' Duties Guidance",
      "Company Secretarial Services",
      "Annual Returns Filing",
    ],
  },
  {
    icon: PieChart,
    title: "Management Accounts",
    description: "Regular financial reporting to help you make informed business decisions.",
    features: [
      "Monthly Management Reports",
      "Budget vs Actual Analysis",
      "Key Performance Indicators",
      "Dashboard Reporting",
      "Variance Analysis",
      "Board Report Preparation",
    ],
  },
  {
    icon: Shield,
    title: "Audit & Assurance",
    description: "Independent audit services providing assurance to stakeholders.",
    features: [
      "Statutory Audits",
      "Management Letter Reports",
      "Internal Audit Services",
      "Due Diligence Reviews",
      "Compliance Audits",
      "Risk Assessment",
    ],
  },
  {
    icon: Clock,
    title: "Year-End Accounts",
    description: "Professional preparation of annual accounts and statutory filings.",
    features: [
      "Annual Account Preparation",
      "Companies House Filing",
      "Corporation Tax Returns",
      "Dividend Planning",
      "Directors' Loans Review",
      "Statutory Compliance",
    ],
  },
];

const process = [
  {
    step: 1,
    title: "Initial Consultation",
    description: "We start with a free consultation to understand your needs and challenges",
  },
  {
    step: 2,
    title: "Tailored Proposal",
    description: "We create a customised service package with transparent pricing",
  },
  {
    step: 3,
    title: "Ongoing Support",
    description: "Regular communication and proactive advice to keep you on track",
  },
];

const Services = () => {
  return (
    <div className="min-h-screen bg-[#fcfef1]">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-[#345e7d] py-16 text-white">
        <div className="container px-4">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="mb-6 text-4xl font-bold">Our Services</h1>
            <p className="text-lg opacity-90 sm:text-xl">
              Comprehensive accounting and financial services tailored to your needs
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16">
        <div className="container px-4">
          <div className="grid gap-8 md:grid-cols-2">
            {services.map((service) => (
              <Card key={service.title} className="h-full transition-shadow hover:shadow-lg">
                <CardHeader>
                  <div className="mb-4 flex items-center gap-4">
                    <div className="rounded-lg bg-[#345e7d] p-3 text-white">
                      <service.icon className="h-8 w-8" />
                    </div>
                    <CardTitle className="text-xl text-[#345e7d]">{service.title}</CardTitle>
                  </div>
                  <p className="text-gray-600">{service.description}</p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2 text-sm">
                        <div className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-[#bc1823]" />
                        <span className="text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="bg-white py-16">
        <div className="container px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-[#345e7d]">How We Work</h2>
            <p className="mx-auto max-w-2xl text-gray-600">
              Our proven process ensures you receive the best possible service
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {process.map((item) => (
              <div key={item.step} className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#345e7d] text-2xl font-bold text-white">
                  {item.step}
                </div>
                <h3 className="mb-3 text-xl font-semibold text-[#345e7d]">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-[#345e7d] py-16 text-white">
        <div className="container px-4 text-center">
          <h2 className="mb-4 text-3xl font-bold">Ready to Get Started?</h2>
          <p className="mb-8 text-lg opacity-90 sm:text-xl">
            Contact us today for a free consultation to discuss your requirements
          </p>
          <Button asChild size="lg" variant="destructive">
            <Link to="/contact">Get Free Consultation</Link>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Services;
