import { createFileRoute } from "@tanstack/react-router";

import {
  Zap,
  Server,
  Route as RouteIcon,
  Shield,
  Waves,
  Sparkles,
} from "lucide-react";

export const Route = createFileRoute("/")({
  component: App,
});

function App() {
  const features = [
    {
      icon: <Zap className="w-12 h-12 text-cyan-400" />,
      title: "Quality Software",
      description: "Build robust, scalable applications with ease.",
    },
    {
      icon: <Server className="w-12 h-12 text-cyan-400" />,
      title: "Communication with stakeholders",
      description:
        "We help you bridge the gap between technical and non-technical stakeholders, ensuring everyone is on the same page.",
    },
    {
      icon: <RouteIcon className="w-12 h-12 text-cyan-400" />,
      title: "AI Development Services",
      description:
        "Leverage cutting-edge AI technologies to transform your business processes and drive innovation.",
    },
    {
      icon: <Shield className="w-12 h-12 text-cyan-400" />,
      title: "Data science & Analytics",
      description:
        "Unlock the power of your data with our expert data science and analytics services. Make informed decisions and gain a competitive edge.",
    },
    {
      icon: <Waves className="w-12 h-12 text-cyan-400" />,
      title: "Support 24/7",
      description:
        "Our dedicated support team is available around the clock to assist you with any issues or questions you may have.",
    },
    {
      icon: <Sparkles className="w-12 h-12 text-cyan-400" />,
      title: "Performance software ",
      description:
        "Built from the ground up for modern web applications. Deploy anywhere JavaScript runs.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      <section className="relative py-20 px-6 text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-purple-500/10"></div>
        <div className="relative max-w-5xl mx-auto">
          <div className="flex items-center justify-center gap-6 mb-6">
            <img
              src="/tanstack-circle-logo.png"
              alt="TanStack Logo"
              className="w-24 h-24 md:w-32 md:h-32"
            />
            <h1 className="text-6xl md:text-7xl font-bold text-white">
              <span className="text-gray-300">monii</span>{" "}
              <span className="bg-gradient-to-r text-lg from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Software & AI
              </span>
            </h1>
          </div>
          <p className="text-2xl md:text-3xl text-gray-300 mb-4 font-light">
            Software and AI tools for modern businesses.
          </p>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto mb-8">
            Contact us at{" "}
            <a
              href="mailto:hello@monii.com"
              className="text-cyan-400 hover:underline"
            >
              hello@monii.com
            </a>
          </p>
          <div className="flex flex-col items-center gap-4">
            <a
              href="https://tanstack.com/start"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 bg-cyan-500 hover:bg-cyan-600 text-white font-semibold rounded-lg transition-colors shadow-lg shadow-cyan-500/50"
            >
              Documentation
            </a>
            <p className="text-gray-400 text-sm mt-2">
              Begin your TanStack Start journey by editing{" "}
              <code className="px-2 py-1 bg-slate-700 rounded text-cyan-400">
                /src/routes/index.tsx
              </code>
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/10"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-400 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
