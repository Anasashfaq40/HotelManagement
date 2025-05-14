import React from 'react';
import Header from '../Header';
import Footer from '../footer';

function shop() {
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
            <h1 className="page-title wow fadeInUp delay-0-2s">Shop</h1>
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb justify-content-center wow fadeInUp delay-0-4s">
                <li className="breadcrumb-item"><a href="index.js">home</a></li>
                <li className="breadcrumb-item active">Shop</li>
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

      {/* Shop Offer Banner Area start */}
      <section className="offer-banner-area pt-130 rpt-100 rel">
        <div className="container">
          <div
            className="offer-banner-wrap bgs-cover"
            style={{ backgroundImage: "url(theme/assets/images/background/offer-banner.jpg)" }}
          >
            <div className="row">
              <div className="col-xl-5 col-lg-6">
                <div className="offer-banner-content text-white wow fadeInLeft delay-0-2s">
                  <div className="section-title mb-45">
                    <span className="sub-title mb-15 text-white">Weekly Deal</span>
                    <h2>25% Off For All Furniture Products</h2>
                  </div>
                  <a href="shop.js" className="theme-btn">
                    Shop Now <i className="far fa-angle-right"></i>
                  </a>
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
      {/* Shop Offer Banner Area end */}

      {/* Shop Area start */}
      <section className="shop-page-area py-125 rpy-95 rel z-1">
        <div className="container">
          <div className="shop-shorter rel z-3 mb-25 wow fadeInUp delay-0-2s">
            <div className="sort-text">Showing 1–12 of 32 results</div>
            <div className="products-dropdown">
              <select>
                <option value="default" selected>
                  Default Shorting
                </option>
                <option value="New">Sort by Newness</option>
                <option value="old">Sort by Oldest</option>
                <option value="hight-to-low">High To Low</option>
                <option value="low-to-high">Low To High</option>
              </select>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-xl-4 col-md-6">
              <div className="product-item wow fadeInUp delay-0-2s">
                <div className="image">
                  <img src="theme/assets/images/shop/product1.jpg" alt="Product" />
                  <div className="social-style-one">
                    <a href="shop.js#">
                      <i className="far fa-shopping-cart"></i>
                    </a>
                    <a href="shop.js#">
                      <i className="far fa-heart"></i>
                    </a>
                    <a href="shop.js#">
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
                  <img src="theme/assets/images/shop/product2.jpg" alt="Product" />
                  <div className="social-style-one">
                    <a href="shop.js#">
                      <i className="far fa-shopping-cart"></i>
                    </a>
                    <a href="shop.js#">
                      <i className="far fa-heart"></i>
                    </a>
                    <a href="shop.js#">
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
                    <a href="product-details.js">Blue chair made up wooden</a>
                  </h4>
                  <div className="price">$270</div>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-md-6">
              <div className="product-item wow fadeInUp delay-0-6s">
                <div className="image">
                  <img src="theme/assets/images/shop/product3.jpg" alt="Product" />
                  <div className="social-style-one">
                    <a href="shop.js#">
                      <i className="far fa-shopping-cart"></i>
                    </a>
                    <a href="shop.js#">
                      <i className="far fa-heart"></i>
                    </a>
                    <a href="shop.js#">
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
              <div className="product-item wow fadeInUp delay-0-2s">
                <div className="image">
                  <img src="theme/assets/images/shop/product4.jpg" alt="Product" />
                  <div className="social-style-one">
                    <a href="shop.js#">
                      <i className="far fa-shopping-cart"></i>
                    </a>
                    <a href="shop.js#">
                      <i className="far fa-heart"></i>
                    </a>
                    <a href="shop.js#">
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
                    <a href="shop.js#">
                      <i className="far fa-shopping-cart"></i>
                    </a>
                    <a href="shop.js#">
                      <i className="far fa-heart"></i>
                    </a>
                    <a href="shop.js#">
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
                    <a href="shop.js#">
                      <i className="far fa-shopping-cart"></i>
                    </a>
                    <a href="shop.js#">
                      <i className="far fa-heart"></i>
                    </a>
                    <a href="shop.js#">
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
              <div className="product-item wow fadeInUp delay-0-2s">
                <div className="image">
                  <img src="theme/assets/images/shop/product7.jpg" alt="Product" />
                  <div className="social-style-one">
                    <a href="shop.js#">
                      <i className="far fa-shopping-cart"></i>
                    </a>
                    <a href="shop.js#">
                      <i className="far fa-heart"></i>
                    </a>
                    <a href="shop.js#">
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
                  <img src="theme/assets/images/shop/product8.jpg" alt="Product" />
                  <div className="social-style-one">
                    <a href="shop.js#">
                      <i className="far fa-shopping-cart"></i>
                    </a>
                    <a href="shop.js#">
                      <i className="far fa-heart"></i>
                    </a>
                    <a href="shop.js#">
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
                  <img src="theme/assets/images/shop/product9.jpg" alt="Product" />
                  <div className="social-style-one">
                    <a href="shop.js#">
                      <i className="far fa-shopping-cart"></i>
                    </a>
                    <a href="shop.js#">
                      <i className="far fa-heart"></i>
                    </a>
                    <a href="shop.js#">
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
          <ul className="pagination flex-wrap justify-content-center wow fadeInUp delay-0-2s">
            <li className="page-item disabled">
              <span className="page-link"><i className="far fa-arrow-left"></i></span>
            </li>
            <li className="page-item active">
              <span className="page-link">
                1
                <span className="sr-only">(current)</span>
              </span>
            </li>
            <li className="page-item"><a className="page-link" href="shop.js#">2</a></li>
            <li className="page-item"><a className="page-link" href="shop.js#">3</a></li>
            <li className="page-item">
              <a className="page-link" href="shop.js#"><i className="far fa-arrow-right"></i></a>
            </li>
          </ul>
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

<Footer/>

      </div>
    </>
  );
}

export default shop;
