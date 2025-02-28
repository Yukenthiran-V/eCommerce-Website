import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import SlideBanner from "./BannerSlide";
const Categories = () => {
  return (
    <>
      {/* Horizontal navigation bar */}
      <div className="container-fluid" style={{ backgroundColor: "rgb(224, 227, 235) ", padding: "1%" }}>
        <div className="d-flex flex-column flex-md-row  justify-content-between">
          {/* All link */}
          <a href="*" className="d-flex text-decoration-none text-dark py-2 py-md-0">
            <i className="bi bi-list"></i>
            <span>&nbsp;All</span>
          </a>

          {/* Dropdown menu container */}

          <ul className="d-flex list-unstyled w-100 flex-column flex-md-row justify-content-around py-2 py-md-0 m-0">
            {/* Beauty Dropdown */}
            <li className="dropdown">
              <a className="d-flex  text-decoration-none text-dark" href="*" id="beautyDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Beauty &nbsp;
                <i className="bi bi-caret-down-fill" style={{ marginTop: "2px", color: "rgb(82, 91, 105)", fontSize: "15px" }}></i>
              </a>
              <ul className="dropdown-menu" aria-labelledby="beautyDropdown">
                <li>
                  <a className="dropdown-item" href="*">
                    Beauty
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="*">
                    Fragrances
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="*">
                    Skin Care
                  </a>
                </li>
              </ul>
            </li>

            {/* Fashion & Accessories Dropdown */}
            <li className="dropdown">
              <a className="d-flex  text-decoration-none text-dark" href="*" id="fashionDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Fashion & Accessories &nbsp;
                <i className="bi bi-caret-down-fill" style={{ marginTop: "2px", color: "rgb(82, 91, 105)", fontSize: "15px" }}></i>
              </a>
              <ul className="dropdown-menu" aria-labelledby="fashionDropdown">
                <li>
                  <a className="dropdown-item" href="*">
                    Mens Shirts
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="*">
                    Mens Shoes
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="*">
                    Men Watches
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="*">
                    Women Bags
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="*">
                    Women Dresses
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="*">
                    Women Jewellery
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="*">
                    Women Shoes
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="*">
                    Women Watches
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="*">
                    Sunglasses
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="*">
                    Tops
                  </a>
                </li>
              </ul>
            </li>

            {/* Home & Living Dropdown */}
            <li className="dropdown">
              <a className="d-flex text-decoration-none text-dark" href="*" id="homeLivingDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Home & Living &nbsp;
                <i className="bi bi-caret-down-fill" style={{ marginTop: "2px", color: "rgb(82, 91, 105)", fontSize: "15px" }}></i>
              </a>
              <ul className="dropdown-menu" aria-labelledby="homeLivingDropdown">
                <li>
                  <a className="dropdown-item" href="*">
                    Furniture
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="*">
                    Home Decoration
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="*">
                    Kitchen Accessories
                  </a>
                </li>
              </ul>
            </li>

            {/* Electronics & Gadgets Dropdown */}
            <li className="dropdown">
              <a className="d-flex  text-decoration-none text-dark" href="*" id="electronicsDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Electronics & Gadgets &nbsp;
                <i className="bi bi-caret-down-fill " style={{ marginTop: "2px", color: "rgb(82, 91, 105)", fontSize: "15px" }}></i>
              </a>
              <ul className="dropdown-menu" aria-labelledby="electronicsDropdown">
                <li>
                  <a className="dropdown-item" href="*">
                    Smartphones
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="*">
                    Laptop
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="*">
                    Tablets
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="*">
                    Mobile Accessories
                  </a>
                </li>
              </ul>
            </li>

            {/* Groceries & Essentials Link */}
            <li>
              <a className="text-decoration-none text-dark py-2 py-md-0" href="*">
                Groceries & Essentials &nbsp;
              </a>
            </li>
          </ul>
        </div>
      </div>
      {/* <hr style={{ margin: 0, padding: 0 }} /> */}
      <SlideBanner />
    </>
  );
};

export default Categories;
