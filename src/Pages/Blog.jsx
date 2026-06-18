import React from "react";
import "../index.css";
import "../assets/css/Blog-page.css";

export default function Blog() {

  const recentPosts = [
    {
      title: "How AI is Transforming Modern Businesses",
      image:
        "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1200&auto=format&fit=crop",
    },
    {
      title: "Top IoT Innovations in 2026",
      image:
        "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop",
    },
    {
      title: "Why UI/UX Design Matters for Startups",
      image:
        "https://images.unsplash.com/photo-1496171367470-9ed9a91ea931?q=80&w=1200&auto=format&fit=crop",
    },
  ];

  const sidebarPosts = [
    "Best Technologies for Future Startups",
    "AI Automation for Small Businesses",
    "Web Development Trends in 2026",
  ];

  const categories = [
    "Artificial Intelligence",
    "IoT Solutions",
    "Web Development",
    "UI/UX Design",
    "Digital Marketing",
    "Business Strategy",
  ];

  return (
    <>
      <section className="header-wrap" style={{backgroundImage:'linear-gradient(#1219297d), url(/images/projenius-banner.webp)'}}>
        <div className="container title-section">
          <h1 className="page-title">Blog</h1>
        </div>
      </section>

      <section className="blog-page-section">
        <div className="container">
          <div className="row g-5">

            {/* LEFT SIDE BLOGS */}
            <div className="col-lg-8">

              <div className="row g-4 flex-column">

                {recentPosts.map((post, index) => (

                  <div className="col-12" key={index}>

                    <div className="blog-card">

                      <div className="blog-image-wrap">
                        <img src={post.image} alt={post.title} />
                      </div>

                      <div className="blog-card-content">

                        <h3>{post.title}</h3>

                        <button className="blog-read-btn">
                          Read More
                          <i className="bi bi-arrow-up-right"></i>
                        </button>

                      </div>

                    </div>

                  </div>

                ))}

              </div>

            </div>

            {/* RIGHT SIDEBAR */}
            <div className="col-lg-4">

              <div className="blog-sidebar">

                {/* SEARCH */}
                <div className="sidebar-box">

                  <h4>Search</h4>

                  <div className="search-box">

                    <input
                      type="text"
                      placeholder="Search blog..."
                    />

                    <button>
                      <i className="bi bi-search"></i>
                    </button>

                  </div>

                </div>

                {/* RECENT POSTS */}
                <div className="sidebar-box">

                  <h4>Recent Posts</h4>

                  {sidebarPosts.map((item, index) => (

                    <div className="recent-post-item" key={index}>

                      <h5>{item}</h5>

                      <button className="recent-read-btn">
                        Read More
                      </button>

                    </div>

                  ))}

                </div>

                {/* CATEGORIES */}
                <div className="sidebar-box">

                  <h4>Categories</h4>

                  <ul className="category-list">

                    {categories.map((category, index) => (

                      <li key={index}>
                        <a href="/">
                          <i className="bi bi-arrow-right-short"></i>
                          {category}
                        </a>
                      </li>

                    ))}

                  </ul>

                </div>

              </div>

            </div>

          </div>
        </div>
      </section>
    </>
  );
}