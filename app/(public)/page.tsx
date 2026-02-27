import { PublicMenu } from "./_components/menu";
import { publicMenuLinks } from "./layout";

export default function LandingPage() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&display=swap');

        :root {
          --green: #0F7F49;
          --green-light: #e8f5ee;
          --green-mid: #d0edde;
          --dark: #0d1f15;
          --muted: #4a7060;
          --bg: #f7fcf9;
        }

        .lp {
          font-family: 'DM Sans', sans-serif;
          background: var(--bg);
          min-height: 100vh;
          color: var(--dark);
        }

        /* HERO */
        .lp-hero {
          min-height: 100vh;
          display: flex;
          align-items: center;
          padding: 7rem 2.5rem 4rem;
          position: relative;
          overflow: hidden;
        }

        .lp-hero-inner {
          max-width: 1100px;
          margin: 0 auto;
          width: 100%;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: center;
        }

        .lp-tag {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.75rem;
          font-weight: 500;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--green);
          margin-bottom: 1.5rem;
        }

        .lp-tag-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: var(--green);
        }

        .lp-title {
          font-family: 'DM Serif Display', serif;
          font-size: clamp(2.6rem, 5.5vw, 4.5rem);
          line-height: 1.06;
          letter-spacing: -0.025em;
          color: var(--dark);
          margin: 0 0 1.5rem;
        }

        .lp-title em {
          font-style: italic;
          color: var(--green);
        }

        .lp-sub {
          font-size: 1.05rem;
          font-weight: 300;
          color: var(--muted);
          line-height: 1.75;
          max-width: 400px;
          margin: 0 0 2.5rem;
        }

        .lp-actions {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          flex-wrap: wrap;
        }

        .lp-btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: var(--green);
          color: white;
          padding: 0.875rem 2rem;
          border-radius: 100px;
          font-size: 0.9rem;
          font-weight: 500;
          text-decoration: none;
          transition: opacity 0.2s, transform 0.2s;
          box-shadow: 0 4px 20px rgba(15,127,73,0.25);
        }

        .lp-btn-primary:hover { opacity: 0.9; transform: translateY(-2px); }

        .lp-btn-ghost {
          font-size: 0.875rem;
          color: var(--muted);
          text-decoration: none;
          display: flex;
          align-items: center;
          gap: 0.3rem;
          transition: color 0.2s;
        }

        .lp-btn-ghost:hover { color: var(--dark); }

        /* MOCK */
        .lp-mock {
          position: relative;
          display: flex;
          justify-content: center;
        }

        .lp-card {
          background: white;
          border: 1px solid var(--green-mid);
          border-radius: 20px;
          padding: 1.5rem;
          width: 100%;
          max-width: 320px;
          box-shadow: 0 8px 40px rgba(15,127,73,0.1);
        }

        .lp-card-label {
          font-size: 0.7rem;
          font-weight: 500;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--muted);
          margin-bottom: 1rem;
        }

        .lp-card-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.6rem 0;
          border-bottom: 1px solid var(--green-light);
        }

        .lp-card-item:last-of-type { border-bottom: none; }

        .lp-card-left {
          display: flex;
          align-items: center;
          gap: 0.6rem;
        }

        .lp-card-icon {
          width: 28px; height: 28px;
          border-radius: 8px;
          background: var(--green-light);
          display: flex; align-items: center; justify-content: center;
          font-size: 0.75rem;
        }

        .lp-card-name {
          font-size: 0.85rem;
          color: var(--dark);
        }

        .lp-card-store {
          font-size: 0.7rem;
          color: var(--muted);
        }

        .lp-card-price-best {
          font-size: 0.8rem;
          font-weight: 500;
          color: var(--green);
          background: var(--green-light);
          padding: 0.2rem 0.6rem;
          border-radius: 100px;
        }

        .lp-card-savings {
          margin-top: 1rem;
          padding: 0.75rem;
          background: var(--green-light);
          border-radius: 12px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .lp-card-savings-label { font-size: 0.75rem; color: var(--muted); }

        .lp-card-savings-value {
          font-size: 1rem;
          font-weight: 500;
          color: var(--green);
        }

        .lp-badge {
          position: absolute;
          bottom: -16px;
          right: -8px;
          background: var(--dark);
          color: white;
          border-radius: 14px;
          padding: 0.75rem 1rem;
          font-size: 0.75rem;
          line-height: 1.4;
          box-shadow: 0 4px 20px rgba(0,0,0,0.15);
        }

        .lp-badge strong {
          display: block;
          font-size: 1.1rem;
          font-weight: 600;
          color: #6effa8;
        }

        /* FEATURES */
        .lp-features {
          padding: 6rem 2.5rem;
          max-width: 1100px;
          margin: 0 auto;
        }

        .lp-features-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
          margin-top: 3rem;
        }

        .lp-feature-card {
          background: white;
          border: 1px solid var(--green-mid);
          border-radius: 16px;
          padding: 1.75rem;
          transition: box-shadow 0.2s;
        }

        .lp-feature-card:hover {
          box-shadow: 0 4px 24px rgba(15,127,73,0.08);
        }

        .lp-feature-icon {
          width: 40px; height: 40px;
          background: var(--green-light);
          border-radius: 12px;
          display: flex; align-items: center; justify-content: center;
          font-size: 1.1rem;
          margin-bottom: 1rem;
        }

        .lp-feature-title {
          font-size: 1rem;
          font-weight: 500;
          margin-bottom: 0.5rem;
        }

        .lp-feature-desc {
          font-size: 0.875rem;
          font-weight: 300;
          color: var(--muted);
          line-height: 1.65;
        }

        /* CTA */
        .lp-cta-section {
          padding: 6rem 2.5rem;
          text-align: center;
        }

        .lp-cta-inner {
          max-width: 520px;
          margin: 0 auto;
        }

        .lp-cta-title {
          font-family: 'DM Serif Display', serif;
          font-size: clamp(2rem, 4vw, 3rem);
          line-height: 1.1;
          letter-spacing: -0.02em;
          margin-bottom: 1rem;
        }

        .lp-cta-sub {
          font-size: 1rem;
          font-weight: 300;
          color: var(--muted);
          margin-bottom: 2rem;
          line-height: 1.7;
        }

        /* FOOTER */
        .lp-footer {
          border-top: 1px solid var(--green-mid);
          padding: 1.5rem 2.5rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 0.8rem;
          color: var(--muted);
        }

        /* BG DECO */
        .lp-bg-circle {
          position: absolute;
          border-radius: 50%;
          background: var(--green);
          opacity: 0.04;
          pointer-events: none;
        }

        @media (max-width: 768px) {
          .lp-hero-inner { grid-template-columns: 1fr; }
          .lp-mock { display: none; }
          .lp-nav { padding: 1rem 1.25rem; }
          .lp-hero { padding: 6rem 1.25rem 3rem; }
          .lp-features { padding: 4rem 1.25rem; }
          .lp-features-grid { grid-template-columns: 1fr; }
          .lp-cta-section { padding: 4rem 1.25rem; }
          .lp-footer { flex-direction: column; gap: 0.5rem; text-align: center; }
        }
      `}</style>

      <div className="lp">
        {/* NAV */}
        <PublicMenu links={publicMenuLinks} triggerColors="transparent" disableMd={false} />

        {/* HERO */}
        <section className="lp-hero">
          <div className="lp-bg-circle" style={{width:600,height:600,right:-200,top:-100}} />
          <div className="lp-bg-circle" style={{width:300,height:300,left:-100,bottom:0}} />

          <div className="lp-hero-inner">
            <div>
              <div className="lp-tag">
                <span className="lp-tag-dot" />
                Smart shopping
              </div>
              <h1 className="lp-title">
                Save more,<br />
                <em>without</em> the<br />
                math.
              </h1>
              <p className="lp-sub">
                Add items to your list, compare prices across stores, and always know where to buy smarter.
              </p>
              <div className="lp-actions">
                <a href="/sing-up" className="lp-btn-primary">
                  Create free account
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </a>
                <a href="/sing-in" className="lp-btn-ghost">
                  Already have an account
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* FEATURES */}
        <section className="lp-features" id="features">
          <div className="lp-tag">
            <span className="lp-tag-dot" />
            How it works
          </div>
          <h2 className="lp-title" style={{fontSize:'clamp(1.8rem, 3.5vw, 2.8rem)', marginTop:'0.5rem'}}>
            Three steps to <em>smarter</em> shopping
          </h2>
          <div className="lp-features-grid">
            {[
              {icon:'📝', title:'Build your list', desc:'Add the items you buy regularly. Organize by category or keep it simple — it\'s your list.'},
              {icon:'⚖️', title:'Compare options', desc:'See prices across stores side by side. No more mental math or second-guessing at checkout.'},
              {icon:'💚', title:'Shop with confidence', desc:'Always know you\'re getting the best deal. Watch your savings grow over time.'},
            ].map((f, i) => (
              <div className="lp-feature-card" key={i}>
                <div className="lp-feature-icon">{f.icon}</div>
                <div className="lp-feature-title">{f.title}</div>
                <div className="lp-feature-desc">{f.desc}</div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="lp-cta-section">
          <div className="lp-cta-inner">
            <h2 className="lp-cta-title">
              Ready to spend <em style={{fontFamily:'DM Serif Display, serif', fontStyle:'italic', color:'var(--green)'}}>wisely</em>?
            </h2>
            <p className="lp-cta-sub">
              Join thousands of people who stopped overpaying for groceries.
            </p>
            <a href="/sing-up" className="lp-btn-primary" style={{display:'inline-flex'}}>
              Create free account
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </a>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="lp-footer">
          <span>© 2025 WiseSpend</span>
          <span>Save more without worrying about numbers.</span>
        </footer>
      </div>
    </>
  );
}
