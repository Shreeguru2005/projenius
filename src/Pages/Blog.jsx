import { useEffect, useMemo, useState } from "react";
import "../index.css";
import "../assets/css/Blog-page.css";

const FALLBACK_POSTS = [
  {
    title: "How AI is Transforming Modern Businesses",
    category: "AI",
    tags: ["AI"],
    excerpt:
      "Practical ways companies are using automation, intelligent workflows, and connected data to improve operations.",
    author: "ProJenius Team",
    role: "Technology Insights",
    image:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Inside ProJenius: Building Practical Technology Solutions",
    category: "Company",
    tags: ["Company"],
    excerpt:
      "A look at how our team approaches client problems, project planning, and long-term digital transformation.",
    author: "ProJenius Team",
    role: "Company Updates",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Top IoT Innovations in 2026",
    category: "IoT",
    tags: ["IoT"],
    excerpt:
      "A business-focused view of connected devices, edge analytics, automation, and smarter infrastructure.",
    author: "Engineering Team",
    role: "IoT Research",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "How Modern Web Development Supports Business Growth",
    category: "Development",
    tags: ["Development"],
    excerpt:
      "Why scalable websites, dashboards, and applications need a thoughtful balance of speed, UX, and maintainability.",
    author: "Development Team",
    role: "Web Engineering",
    image:
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Why UI/UX Design Matters for Startups",
    category: "Design",
    tags: ["Design"],
    excerpt:
      "How clear product experiences help startups build trust, reduce friction, and communicate value faster.",
    author: "Design Team",
    role: "Product Experience",
    image:
      "https://images.unsplash.com/photo-1496171367470-9ed9a91ea931?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Best Technologies for Future Startups",
    category: "Startups",
    tags: ["Startups"],
    excerpt:
      "A practical stack overview for founders planning scalable products, lean teams, and faster market validation.",
    author: "Strategy Team",
    role: "Business Advisory",
    image:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Digital Marketing Priorities for Growing Technology Brands",
    category: "Marketing",
    tags: ["Marketing"],
    excerpt:
      "A practical approach to messaging, content, lead generation, and trust-building for technology companies.",
    author: "Growth Team",
    role: "Digital Marketing",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop",
  },
];

export default function Blog() {
  const POSTS_PER_PAGE = 4;
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";
  const [activeCategory, setActiveCategory] = useState("Latest");
  const [currentPage, setCurrentPage] = useState(1);
  const [apiPosts, setApiPosts] = useState([]);
  const [isLoadingBlogs, setIsLoadingBlogs] = useState(false);
  const [isBlogApiAvailable, setIsBlogApiAvailable] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterStatus, setNewsletterStatus] = useState("");
  const [newsletterPopup, setNewsletterPopup] = useState(null);

  const categories = [
    "Latest",
    "Company",
    "AI",
    "IoT",
    "Development",
    "Design",
    "Startups",
    "Marketing",
  ];

  useEffect(() => {
    const controller = new AbortController();

    async function loadBlogs() {
      setIsLoadingBlogs(true);

      try {
        const response = await fetch(`${API_BASE_URL}/api/blogs?limit=50`, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(`Blog API failed: ${response.status}`);
        }

        const data = await response.json();
        const blogs = Array.isArray(data.items) ? data.items : [];
        setIsBlogApiAvailable(true);

        setApiPosts(
          blogs.map((blog) => ({
            title: blog.title,
            category: blog.tags?.[0] || "Company",
            tags: blog.tags || [],
            excerpt: blog.description,
            author: blog.author?.name || "ProJenius Team",
            role: blog.author?.role || "Technology Insights",
            image: blog.thumbnailUrl,
            galleryImages: blog.galleryImages || [],
            slug: blog.slug,
          })),
        );
      } catch (error) {
        if (error.name !== "AbortError") {
          setIsBlogApiAvailable(false);
          console.warn("Using static blog fallback.", error);
        }
      } finally {
        setIsLoadingBlogs(false);
      }
    }

    loadBlogs();

    return () => controller.abort();
  }, [API_BASE_URL]);

  const posts = useMemo(() => {
    if (!isBlogApiAvailable) {
      return FALLBACK_POSTS;
    }

    return apiPosts;
  }, [apiPosts, isBlogApiAvailable]);

  const filteredPosts = useMemo(() => {
    if (activeCategory === "Latest") {
      return posts;
    }

    return posts.filter((post) =>
      post.category === activeCategory || post.tags?.includes(activeCategory)
    );
  }, [activeCategory, posts]);

  const totalPages = Math.max(1, Math.ceil(filteredPosts.length / POSTS_PER_PAGE));
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const visiblePosts = filteredPosts.slice(
    (safeCurrentPage - 1) * POSTS_PER_PAGE,
    safeCurrentPage * POSTS_PER_PAGE
  );

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(Math.min(Math.max(page, 1), totalPages));
  };

  const handleNewsletterSubmit = async (event) => {
    event.preventDefault();
    setNewsletterStatus("Subscribing...");

    try {
      const response = await fetch(`${API_BASE_URL}/api/newsletter/subscribe`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: newsletterEmail,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Subscription failed.");
      }

      if (data.alreadySubscribed) {
        setNewsletterPopup({
          title: "Already subscribed",
          message:
            "You have already subscribed. Hope you are enjoying the ProJenius newsletter.",
        });
        setNewsletterStatus("Already subscribed.");
      } else {
        setNewsletterPopup({
          title: "Subscription confirmed",
          message: data.emailSent
            ? "You have subscribed to the ProJenius newsletter. A confirmation email has been sent to your inbox."
            : "You have subscribed to the ProJenius newsletter. Email sending is not configured on this local server yet.",
        });
        setNewsletterStatus("Subscribed successfully.");
      }

      setNewsletterEmail("");
    } catch (error) {
      setNewsletterStatus(error.message || "Subscription failed.");
      setNewsletterPopup({
        title: "Subscription failed",
        message: error.message || "Please try again after a moment.",
      });
    }
  };

  return (
    <section className="blog-page-section">
      <div className="container blog-shell">
        <aside className="blog-index">
          <div className="blog-index-inner">
            <h1>Blog</h1>
            <p>
              Thoughts on technology, digital products, and business growth from
              the people building them.
            </p>

            <nav className="blog-category-nav" aria-label="Blog categories">
              {categories.map((category) => (
                <button
                  className={activeCategory === category ? "active" : ""}
                  key={category}
                  onClick={() => handleCategoryChange(category)}
                  type="button"
                >
                  {category}
                </button>
              ))}
            </nav>

            <div className="blog-sidebar-card" aria-label="Featured blog focus">
              <span>Featured Focus</span>
              <h2>Practical technology for growing teams</h2>
              <p>
                Explore insights on automation, connected products, and digital
                systems built for real business outcomes.
              </p>
              <div className="blog-sidebar-topics">
                <small>AI workflows</small>
                <small>IoT strategy</small>
                <small>Product design</small>
              </div>
            </div>
          </div>
        </aside>

        <main className="blog-feed">
          {isLoadingBlogs && (
            <div className="blog-status" role="status">
              Loading latest articles...
            </div>
          )}

          {!isLoadingBlogs && visiblePosts.length === 0 && (
            <div className="blog-status" role="status">
              No articles found in this category yet.
            </div>
          )}

          {visiblePosts.map((post) => (
            <article className="blog-post-card" key={post.title}>
              <button className="blog-post-image" type="button" aria-label={post.title}>
                <img src={post.image} alt={post.title} />
              </button>

              <div className="blog-post-body">
                <span className="blog-post-category">{post.category}</span>
                <h2>
                  <button type="button">{post.title}</button>
                </h2>
                <p>{post.excerpt}</p>

                <div className="blog-author">
                  <span>{post.author.charAt(0)}</span>
                  <div>
                    <strong>{post.author}</strong>
                    <small>{post.role}</small>
                  </div>
                </div>
              </div>
            </article>
          ))}

          <div className="blog-pagination" aria-label="Blog pagination">
            {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
              <button
                className={safeCurrentPage === page ? "active" : ""}
                key={page}
                onClick={() => handlePageChange(page)}
                type="button"
              >
                {page}
              </button>
            ))}
            <button
              aria-label="Next page"
              disabled={safeCurrentPage === totalPages}
              onClick={() => handlePageChange(safeCurrentPage + 1)}
              type="button"
            >
              <i className="bi bi-arrow-right"></i>
            </button>
          </div>

        </main>
      </div>

      <footer className="blog-updates-footer">
        <div className="container">
          <section className="blog-subscribe-benefits" aria-labelledby="blog-subscribe-benefits-title">
            <div className="blog-subscribe-benefits-heading">
              <span>What subscribers get</span>
              <h2 id="blog-subscribe-benefits-title">A sharper view of what ProJenius is building</h2>
            </div>
            <div className="blog-subscribe-benefits-grid">
              <article>
                <i className="bi bi-lightning-charge"></i>
                <h3>Fresh technology reads</h3>
                <p>New blogs on AI, IoT, product development, and digital growth without hunting for updates.</p>
              </article>
              <article>
                <i className="bi bi-kanban"></i>
                <h3>Project and company notes</h3>
                <p>Behind-the-scenes updates from ProJenius, including launches, experiments, and service improvements.</p>
              </article>
              <article>
                <i className="bi bi-mortarboard"></i>
                <h3>Learning opportunities</h3>
                <p>Early updates about workshops, internships, courses, and practical sessions for students and teams.</p>
              </article>
            </div>
          </section>

          <form className="blog-newsletter" onSubmit={handleNewsletterSubmit}>
            <div>
              <span>ProJenius Updates</span>
              <h2>Get ProJenius updates in your inbox</h2>
              <p>Subscribe for useful ideas, product thinking, and company news from the ProJenius team.</p>
            </div>
            <div className="blog-newsletter-fields">
              <input
                required
                type="email"
                placeholder="Email address"
                value={newsletterEmail}
                onChange={(event) => setNewsletterEmail(event.target.value)}
              />
              <button type="submit">Subscribe</button>
            </div>
            {newsletterStatus && <small>{newsletterStatus}</small>}
          </form>
        </div>
      </footer>

      {newsletterPopup && (
        <div className="newsletter-popup-backdrop" role="presentation">
          <div
            aria-labelledby="newsletter-popup-title"
            aria-modal="true"
            className="newsletter-popup"
            role="dialog"
          >
            <button
              aria-label="Close popup"
              className="newsletter-popup-close"
              onClick={() => setNewsletterPopup(null)}
              type="button"
            >
              <i className="bi bi-x-lg"></i>
            </button>
            <div className="newsletter-popup-icon">
              <i className="bi bi-envelope-check"></i>
            </div>
            <h2 id="newsletter-popup-title">{newsletterPopup.title}</h2>
            <p>{newsletterPopup.message}</p>
            <button
              className="newsletter-popup-action"
              onClick={() => setNewsletterPopup(null)}
              type="button"
            >
              Continue Reading
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
