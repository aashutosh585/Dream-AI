import React from 'react';
import { ArrowRight, Code2, Zap, Layout, Terminal, Github, Twitter, Linkedin, MessageSquare, Download, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { images } from '../assets/assests';

export const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-x-hidden">
      {/* Navbar */}
      <nav className="border-b border-slate-800/50 backdrop-blur-sm fixed w-full z-50 bg-slate-950/80">
  <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
    <div className="flex items-center gap-3">
      <img
        src={images.logo}
        alt="Dream AI Logo"
        className="h-40 w-auto object-contain"
      />
    </div>

    <Link
      to="/builder"
      className="px-5 py-2 bg-white text-slate-950 rounded-full font-medium hover:bg-slate-100 transition-colors"
    >
      Start Building
    </Link>
  </div>
</nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 relative">
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-brand-500/20 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/50 border border-slate-700 text-brand-400 text-xs font-semibold uppercase tracking-wider mb-6">
            <Zap size={12} className="fill-current" />
            Powered by Gemini 2.5 Flash
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 leading-tight">
            Turn text into a <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-indigo-400">
              functional website.
            </span>
          </h1>
          <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            Describe your dream website and let our AI generate the HTML, CSS, and JavaScript in seconds. No coding required.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              to="/builder"
              className="group px-8 py-4 bg-brand-600 hover:bg-brand-500 text-white rounded-full font-semibold text-lg transition-all flex items-center gap-2 shadow-lg shadow-brand-900/50"
            >
              Start Generating Free
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* NEW: How It Works Section */}
      <section className="py-24 bg-slate-900 border-y border-slate-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How it works</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">Three simple steps to generate your perfect website.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-12 relative">
            {/* Connector Line (Desktop) */}
            <div className="hidden md:block absolute top-12 left-1/6 right-1/6 h-0.5 bg-gradient-to-r from-brand-900 via-brand-500 to-brand-900 opacity-20 z-0" />

            <StepCard 
              number="01"
              title="Describe"
              desc="Enter a prompt describing your website idea, style, and features."
              icon={<MessageSquare className="text-brand-400" />}
            />
            <StepCard 
              number="02"
              title="Generate"
              desc="Our AI builds the HTML, CSS, and JS structure instantly."
              icon={<Zap className="text-indigo-400" />}
            />
            <StepCard 
              number="03"
              title="Download"
              desc="Export your clean code and deploy it to your favorite host."
              icon={<Download className="text-purple-400" />}
            />
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-slate-950">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<Terminal className="text-brand-400" />}
              title="Clean Code"
              description="Get semantic HTML, modern CSS, and vanilla JavaScript that is ready to deploy."
            />
            <FeatureCard 
              icon={<Layout className="text-indigo-400" />}
              title="Instant Preview"
              description="Watch your website come to life in real-time as the AI generates it."
            />
             <FeatureCard 
              icon={<Code2 className="text-purple-400" />}
              title="Full Control"
              description="Download the source files as a bundle and edit them in your favorite IDE."
            />
          </div>
        </div>
      </section>

      {/* NEW: Testimonials Section */}
      <section className="py-24 relative overflow-hidden bg-slate-900/30">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-800 to-transparent" />
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">Built for builders</h2>
          <div className="grid md:grid-cols-2 gap-6">
              <TestimonialCard 
                quote="I used to spend hours setting up boilerplate code. Dream AI handles the structure so I can focus on the logic. Ideal for rapid prototyping."
                author="Sarah Chen"
                role="Frontend Developer"
              />
              <TestimonialCard 
                quote="The quality of the CSS is impressive. It uses modern Flexbox and Grid layouts by default, which is a huge time saver."
                author="Mark Davis"
                role="UX Designer"
              />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 pt-20 pb-10 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 md:col-span-1">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 bg-gradient-to-tr from-brand-500 to-indigo-600 rounded-lg flex items-center justify-center">
                  <Code2 size={20} className="text-white" />
                </div>
                <span className="font-bold text-xl tracking-tight text-white">Dream AI</span>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">
                Empowering everyone to build the web, one prompt at a time. Built with the latest AI technology.
              </p>
              <div className="flex gap-4">
                <a href="#" className="text-slate-400 hover:text-white transition-colors"><Twitter size={20} /></a>
                <a href="#" className="text-slate-400 hover:text-white transition-colors"><Github size={20} /></a>
                <a href="#" className="text-slate-400 hover:text-white transition-colors"><Linkedin size={20} /></a>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold text-white mb-6">Product</h4>
              <ul className="space-y-4 text-sm text-slate-400">
                <li><Link to="/builder" className="hover:text-brand-400 transition-colors">Website Builder</Link></li>
                <li><a href="#" className="hover:text-brand-400 transition-colors">Templates</a></li>
                <li><a href="#" className="hover:text-brand-400 transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-brand-400 transition-colors">Showcase</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-6">Resources</h4>
              <ul className="space-y-4 text-sm text-slate-400">
                <li><a href="#" className="hover:text-brand-400 transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-brand-400 transition-colors">API Reference</a></li>
                <li><a href="#" className="hover:text-brand-400 transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-brand-400 transition-colors">Community</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-6">Legal</h4>
              <ul className="space-y-4 text-sm text-slate-400">
                <li><a href="#" className="hover:text-brand-400 transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-brand-400 transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-brand-400 transition-colors">Cookie Policy</a></li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-slate-800 text-center md:text-left flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-500 text-sm">© {new Date().getFullYear()} Dream AI. All rights reserved.</p>
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <span>Built with</span>
              <Zap size={14} className="text-yellow-500 fill-current" />
              <span>Google Gemini</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

const FeatureCard: React.FC<{icon: React.ReactNode, title: string, description: string}> = ({ icon, title, description }) => (
  <div className="p-8 rounded-2xl bg-slate-800/50 border border-slate-700/50 hover:bg-slate-800 transition-colors">
    <div className="w-12 h-12 bg-slate-900 rounded-xl flex items-center justify-center mb-6 border border-slate-700">
      {icon}
    </div>
    <h3 className="text-xl font-bold mb-3">{title}</h3>
    <p className="text-slate-400 leading-relaxed">{description}</p>
  </div>
);

const StepCard: React.FC<{number: string, title: string, desc: string, icon: React.ReactNode}> = ({ number, title, desc, icon }) => (
  <div className="relative z-10 flex flex-col items-center text-center">
    <div className="w-16 h-16 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center mb-6 shadow-xl relative group">
       <div className="absolute inset-0 bg-brand-500/10 rounded-2xl blur-lg group-hover:bg-brand-500/20 transition-all" />
       {icon}
       <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center text-sm font-bold text-slate-500">
         {number}
       </div>
    </div>
    <h3 className="text-xl font-bold mb-3">{title}</h3>
    <p className="text-slate-400 leading-relaxed max-w-xs">{desc}</p>
  </div>
);

const TestimonialCard: React.FC<{quote: string, author: string, role: string}> = ({ quote, author, role }) => (
  <div className="p-8 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-slate-700 transition-all">
    <div className="flex gap-1 mb-4">
      {[1,2,3,4,5].map(i => <Star key={i} size={16} className="text-yellow-500 fill-current" />)}
    </div>
    <p className="text-lg text-slate-300 mb-6 italic">"{quote}"</p>
    <div>
      <div className="font-semibold text-white">{author}</div>
      <div className="text-sm text-slate-500">{role}</div>
    </div>
  </div>
);
