import React from 'react';
import Header from '../Header';
import Footer from '../footer';

function gallery() {
  return (
    <>
          <div className="page-wrapper">
<Header/>
   
      {/* Page Banner Start */}
      <section
        className="page-banner-area pt-170 rpt-110 pb-190 rpb-125 rel z-1 bgs-cover bgc-black text-center"
        style={{ backgroundImage: "url(theme/assets/images/background/banner-two.jpg)" }}
      >
        <div className="container">
          <div className="banner-inner text-white rpb-25">
            <h1 className="page-title wow fadeInUp delay-0-2s">Product Details</h1>
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb justify-content-center wow fadeInUp delay-0-4s">
                <li className="breadcrumb-item">
                  <a href="index.js">home</a>
                </li>
                <li className="breadcrumb-item active">Product Details</li>
              </ol>
            </nav>
          </div>
        </div>
        <div className="bg-lines">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </section>
      {/* Page Banner End */}

      {/* Product Details Start */}
      <section className="product-details pt-100 rpt-70 rel z-1">
        <div className="container">
          <div className="row gap-90">
            <div className="col-lg-6">
              <div className="product-details-images wow fadeInLeft delay-0-2s">
                <div className="tab-content preview-images">
                  <div className="tab-pane fade preview-item active show" id="preview1">
                    <img src="theme/assets/images/shop/preview1.jpg" alt="Perview" />
                  </div>
                  <div className="tab-pane fade preview-item" id="preview2">
                    <img src="theme/assets/images/shop/preview1.jpg" alt="Perview" />
                  </div>
                  <div className="tab-pane fade preview-item" id="preview3">
                    <img src="theme/assets/images/shop/preview1.jpg" alt="Perview" />
                  </div>
                </div>
                <div className="nav thumb-images rmb-20">
                  <a href="product-details.js#preview1" data-bs-toggle="tab" className="thumb-item active show">
                    <img src="theme/assets/images/shop/thumb1.jpg" alt="Thumb" />
                  </a>
                  <a href="product-details.js#preview2" data-bs-toggle="tab" className="thumb-item">
                    <img src="theme/assets/images/shop/thumb2.jpg" alt="Thumb" />
                  </a>
                  <a href="product-details.js#preview3" data-bs-toggle="tab" className="thumb-item">
                    <img src="theme/assets/images/shop/thumb3.jpg" alt="Thumb" />
                  </a>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="product-details-content mt-35 rmt-55 wow fadeInRight delay-0-2s">
                <div className="ratting-price mb-25">
                  <div className="ratting">
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                  </div>
                </div>
                <div className="section-title">
                  <h2>Minimal wooden decoration</h2>
                </div>
                <span className="price mb-30">$270</span>
                <p>
                  Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium totam rem aperiam eaque ipsa quae abile inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
                </p>
                <form action="product-details.js#" className="add-to-cart pt-5">
                  <input
                    type="number"
                    value="01"
                    min="1"
                    max="20"
                    onChange={(e) => {
                      if (parseInt(e.target.value, 10) < 10)
                        e.target.value = '0' + e.target.value;
                    }}
                    required
                  />
                  <button type="submit" className="theme-btn">
                    Add to Cart
                  </button>
                </form>
                <ul className="category-tags pt-55 pb-40">
                  <li>
                    <b>Category</b>
                    <span>:</span>
                    <a href="product-details.js#">Home Décor</a>
                    <a href="product-details.js#">Wall Baskets</a>
                  </li>
                  <li>
                    <b>Tags</b>
                    <span>:</span>
                    <a href="product-details.js#">Furniture</a>
                    <a href="product-details.js#">Hand Made</a>
                    <a href="product-details.js#">Wood</a>
                    <a href="product-details.js#">Chair</a>
                    <a href="product-details.js#">Table</a>
                  </li>
                </ul>
                <div className="social-style-three">
                  <a href="product-details.js#">
                    <i className="fab fa-facebook-f"></i>
                  </a>
                  <a href="product-details.js#">
                    <i className="fab fa-twitter"></i>
                  </a>
                  <a href="product-details.js#">
                    <i className="fab fa-linkedin-in"></i>
                  </a>
                  <a href="product-details.js#">
                    <i className="fab fa-youtube"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <ul className="nav product-information-tab mt-100 mb-40 wow fadeInUp delay-0-2s">
            <li>
              <a href="product-details.js#details" data-bs-toggle="tab" className="active show">
                Descrptions
              </a>
            </li>
            <li>
              <a href="product-details.js#reviews" data-bs-toggle="tab">
                Reviews (3)
              </a>
            </li>
          </ul>
          <div className="tab-content pb-30 wow fadeInUp delay-0-2s">
            <div className="tab-pane fade active show" id="details">
              <p>
                At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti
                atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident,
                similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem
                rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil
                impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus.
                Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates
              </p>
              <br />
              <h4>100% Eco-friendly & Sustainable</h4>
              <p>
                We denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of
                pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to
                ensue; and equal blame belongs to those who fail in their duty through weakness
              </p>
              <br />
              <h4>Multi-functional design</h4>
              <p>
                We denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of
                pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to
                ensue; and equal blame belongs to those who fail in their duty through weakness
              </p>
            </div>
            <div className="tab-pane fade" id="reviews">
              <div className="comment-body">
                <div className="author-thumb">
                  <img src="theme/assets/images/blog/comment-author1.jpg" alt="Author" />
                </div>
                <div className="content">
                  <ul className="blog-meta">
                    <li>
                      <h6>William L. Jackson</h6>
                    </li>
                    <li>
                      <a href="product-details.js#">May 25, 2023</a>
                    </li>
                  </ul>
                  <p>
                    Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihile molestiae consequatur,
                    vel illum qui dolorem eum fugiat voluptas
                  </p>
                  <div className="ratting">
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                  </div>
                </div>
              </div>
              <div className="comment-body">
                <div className="author-thumb">
                  <img src="theme/assets/images/blog/comment-author2.jpg" alt="Author" />
                </div>
                <div className="content">
                  <ul className="blog-meta">
                    <li>
                      <h6>James M. Stovall</h6>
                    </li>
                    <li>
                      <a href="product-details.js#">May 25, 2023</a>
                    </li>
                  </ul>
                  <p>
                    At vero eos et accusamus et iusto dignissimos ducimus blanditiis sapiente praesentium voluptatum
                    deleniti atque corrupti quos dolores
                  </p>
                  <div className="ratting">
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                  </div>
                </div>
              </div>
              <div className="comment-body">
                <div className="author-thumb">
                  <img src="theme/assets/images/blog/comment-author3.jpg" alt="Author" />
                </div>
                <div className="content">
                  <ul className="blog-meta">
                    <li>
                      <h6>Lee M. Moreno</h6>
                    </li>
                    <li>
                      <a href="product-details.js#">May 25, 2023</a>
                    </li>
                  </ul>
                  <p>
                    Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex
                    ea commodi consequatur
                  </p>
                  <div className="ratting">
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-lines for-bg-white">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </section>
      {/* Product Details End */}

      {/* Shop Area start */}
      <section className="shop-page-area pt-70 rpt-40 pb-70 rpb-40 rel z-1">
        <div className="container">
          <div className="section-title text-center mb-55">
            <h2>Related Products</h2>
          </div>
          <div className="row justify-content-center">
            <div className="col-xl-4 col-md-6">
              <div className="product-item wow fadeInUp delay-0-2s">
                <div className="image">
                  <img src="theme/assets/images/shop/product4.jpg" alt="Product" />
                  <div className="social-style-one">
                    <a href="product-details.js#">
                      <i className="far fa-shopping-cart"></i>
                    </a>
                    <a href="product-details.js#">
                      <i className="far fa-heart"></i>
                    </a>
                    <a href="product-details.js#">
                      <i className="far fa-eye"></i>
                    </a>
                  </div>
                </div>
                <div className="content">
                  <div className="ratting">
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                  </div>
                  <h4>
                    <a href="product-details.js">Minimal wooden decoration</a>
                  </h4>
                  <div className="price">$270</div>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-md-6">
              <div className="product-item wow fadeInUp delay-0-4s">
                <div className="image">
                  <img src="theme/assets/images/shop/product5.jpg" alt="Product" />
                  <div className="social-style-one">
                    <a href="product-details.js#">
                      <i className="far fa-shopping-cart"></i>
                    </a>
                    <a href="product-details.js#">
                      <i className="far fa-heart"></i>
                    </a>
                    <a href="product-details.js#">
                      <i className="far fa-eye"></i>
                    </a>
                  </div>
                </div>
                <div className="content">
                  <div className="ratting">
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                  </div>
                  <h4>
                    <a href="product-details.js">Minimal wooden decoration</a>
                  </h4>
                  <div className="price">$270</div>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-md-6">
              <div className="product-item wow fadeInUp delay-0-6s">
                <div className="image">
                  <img src="theme/assets/images/shop/product6.jpg" alt="Product" />
                  <div className="social-style-one">
                    <a href="product-details.js#">
                      <i className="far fa-shopping-cart"></i>
                    </a>
                    <a href="product-details.js#">
                      <i className="far fa-heart"></i>
                    </a>
                    <a href="product-details.js#">
                      <i className="far fa-eye"></i>
                    </a>
                  </div>
                </div>
                <div className="content">
                  <div className="ratting">
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                  </div>
                  <h4>
                    <a href="product-details.js">Minimal wooden decoration</a>
                  </h4>
                  <div className="price">$270</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-lines for-bg-white">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </section>
      {/* Shop Area end */}

      {/* Instagram Area start */}
      <section className="instagram-area">
        <div className="instagram-item wow fadeInUp delay-0-2s">
          <a className="instagram-gallery" href="theme/assets/images/instagrams/instagram1.jpg">
            <img src="theme/assets/images/instagrams/instagram1.jpg" alt="instagram" />
          </a>
        </div>
        <div className="instagram-item wow fadeInUp delay-0-3s">
          <a className="instagram-gallery" href="theme/assets/images/instagrams/instagram2.jpg">
            <img src="theme/assets/images/instagrams/instagram2.jpg" alt="instagram" />
          </a>
        </div>
        <div className="instagram-item wow fadeInUp delay-0-4s">
          <div className="content text-white">
            <div className="icon">
              <i className="fab fa-instagram"></i>
            </div>
            <h2>
              <a href="https://www.instagram.com">Follow Our Instagram</a>
            </h2>
            <hr />
            <div className="call-text">Make A Call</div>
            <a className="h2" href="callto:+000(123)45688">
              +000 (123) 456 88
            </a>
          </div>
        </div>
        <div className="instagram-item wow fadeInUp delay-0-5s">
          <a className="instagram-gallery" href="theme/assets/images/instagrams/instagram3.jpg">
            <img src="theme/assets/images/instagrams/instagram3.jpg" alt="instagram" />
          </a>
        </div>
        <div className="instagram-item wow fadeInUp delay-0-6s">
          <a className="instagram-gallery" href="theme/assets/images/instagrams/instagram4.jpg">
            <img src="theme/assets/images/instagrams/instagram4.jpg" alt="instagram" />
          </a>
        </div>
      </section>
      {/* Instagram Area end */}

<Footer/>
  
      </div>

    </>
  );
}

export default gallery;
