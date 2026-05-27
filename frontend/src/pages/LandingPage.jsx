import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

const features = [
  { title: 'Short links fast', desc: 'Paste a URL, get a short code in seconds. Optional custom alias.' },
  { title: 'Click analytics', desc: 'See browsers, devices, daily trends, and visit history.' },
  { title: 'QR codes', desc: 'Auto-generated QR for every link — download as PNG.' },
];

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <section className="max-w-5xl mx-auto px-5 pt-14 pb-16">
        <div className="max-w-xl">
          <p className="text-sm text-brand-600 font-medium mb-2">Hackathon project · URL shortener</p>
          <h1 className="text-3xl sm:text-4xl font-semibold text-slate-900 leading-tight">
            Shorten links.
            <br />
            <span className="text-slate-500">Actually see who clicks.</span>
          </h1>
          <p className="text-slate-600 mt-4 text-base leading-relaxed">
            SmartLink is a simple SaaS-style dashboard for creating short URLs, tracking visits, and
            sharing public stats — built with React and Node.
          </p>
          <div className="flex flex-wrap gap-3 mt-7">
            <Link
              to="/signup"
              className="px-5 py-2.5 bg-brand-600 text-white rounded-lg text-sm font-medium hover:bg-brand-700"
            >
              Get started free
            </Link>
            <Link
              to="/login"
              className="px-5 py-2.5 border border-slate-300 rounded-lg text-sm text-slate-700 hover:bg-white"
            >
              Log in
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-white border-y border-slate-200 py-14">
        <div className="max-w-5xl mx-auto px-5">
          <h2 className="text-lg font-semibold mb-8">What you get</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <div
                key={f.title}
                className={`p-5 rounded-xl border border-slate-200 ${
                  i === 1 ? 'md:-mt-2 shadow-soft' : 'shadow-card'
                }`}
              >
                <h3 className="font-medium text-slate-900">{f.title}</h3>
                <p className="text-sm text-slate-500 mt-2 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 px-5">
        <div className="max-w-5xl mx-auto flex flex-col lg:flex-row gap-8 items-start">
          <div className="lg:w-2/5">
            <h2 className="text-lg font-semibold">Analytics preview</h2>
            <p className="text-sm text-slate-500 mt-2">
              Each link gets its own page with charts — daily trends, browser breakdown, and recent clicks.
            </p>
          </div>
          <div className="flex-1 bg-white rounded-xl border border-slate-200 p-5 shadow-card w-full">
            <div className="flex gap-3 mb-4">
              <div className="h-8 w-24 bg-slate-100 rounded animate-pulse" />
              <div className="h-8 flex-1 bg-brand-100/60 rounded" />
            </div>
            <div className="h-32 bg-gradient-to-t from-brand-50 to-transparent rounded-lg border border-slate-100 flex items-end px-2 pb-2 gap-1">
              {[40, 65, 30, 80, 55, 70, 45, 90, 60, 75].map((h, i) => (
                <div
                  key={i}
                  className="flex-1 bg-brand-500/70 rounded-t"
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>
            <p className="text-xs text-slate-400 mt-3 text-center">Mock chart — real data in dashboard</p>
          </div>
        </div>
      </section>

      <section className="bg-slate-800 text-white py-12 px-5">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-lg font-semibold">Ready to try it?</h2>
            <p className="text-slate-300 text-sm mt-1">Seed demo account available after setup.</p>
          </div>
          <Link
            to="/signup"
            className="px-5 py-2.5 bg-white text-slate-900 rounded-lg text-sm font-medium hover:bg-slate-100"
          >
            Create account
          </Link>
        </div>
      </section>

      <footer className="py-8 text-center text-xs text-slate-400 border-t border-slate-200">
        SmartLink · Built for Katomaran hackathon
      </footer>
    </div>
  );
};

export default LandingPage;
