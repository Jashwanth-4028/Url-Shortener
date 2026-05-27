import { NavLink } from 'react-router-dom';

const links = [
  { to: '/dashboard', label: 'My Links', end: true },
];

const Sidebar = () => {
  return (
    <aside className="w-56 shrink-0 bg-white border-r border-slate-200 hidden md:flex flex-col py-5 px-3">
      <p className="text-xs uppercase tracking-wide text-slate-400 px-3 mb-3">Menu</p>
      <nav className="space-y-1">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.end}
            className={({ isActive }) =>
              `block px-3 py-2 rounded-lg text-sm transition-colors ${
                isActive
                  ? 'bg-slate-100 text-slate-900 font-medium'
                  : 'text-slate-600 hover:bg-slate-50'
              }`
            }
          >
            {link.label}
          </NavLink>
        ))}
      </nav>

      <div className="mt-auto px-3 pt-6">
        <div className="text-xs text-slate-400 leading-relaxed">
          Tip: use custom aliases for portfolio links
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
