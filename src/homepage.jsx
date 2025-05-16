import React, { useState, useEffect } from 'react';
import './App.css';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { FaEnvelope } from 'react-icons/fa';
import { FaPhoneAlt } from 'react-icons/fa';
import emailjs from 'emailjs-com';
function HomePage() {
  const [formData, setFormData] = useState({
    first: '',
    last: '',
    email: '',
    phone: '',
    requirement: ''
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const sections = document.querySelectorAll('.fade-in-section');
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target); // only once
          }
        });
      },
      { threshold: 0.1 }
    );

    sections.forEach(section => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  function scrollCarousel(direction) {
    const carousel = document.getElementById('productCarousel');
    const scrollAmount = carousel.offsetWidth;
    carousel.scrollBy({ left: direction * scrollAmount, behavior: 'smooth' });
  }

  const validate = () => {
    const newErrors = {};

    if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = 'Enter a valid 10-digit mobile number';
    }

    if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Enter a valid email address';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);

    emailjs.send(
      'service_y7y3jj4',
      'template_wbcjjqu',
      {
        first_name: formData.first,
        last_name: formData.last,
        email: formData.email,
        phone: formData.phone,
        requirement: formData.requirement,
      },
      'iRVbhpxvvh10lyLhg'
    ).then(() => {
      setLoading(false);
      alert('Form submitted successfully!');
      setFormData({ first: '', last: '', email: '', phone: '', requirement: '' });
    }).catch(() => {
      setLoading(false);
      alert('Error sending message. Try again.');
    });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="homepage font-sans">
      <header className="header">
        <div className="logo">Goods al Mundo</div>
        <nav className="nav">
          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#products">Products</a>
        </nav>
        <a href="#contact" className="contact-btn">Contact Us</a>
      </header>

      <section id="home" className="hero">
        <div className="hero-text">
          <h1>RELIABLE SOLUTIONS TAILORED TO YOUR NEEDS</h1>
        </div>
      </section>

      <section id="about" className="about fade-in-section">
        <h1>About us</h1>
        <div className="about-grid">
          <div className='about-grid-1'>
            <p>
              Enterprise is a trusted supplier of premium packing materials, waste
              cutting solutions, stationery, housekeeping supplies, machining tools, and
              industrial lubricants. We provide reliable solutions tailored to your needs,
              offering high-quality products at cost-effective rates with dependable logistics
              and timely delivery—making us a preferred partner across industries.
            </p>
            <img src="/aboutusimg2.jpg" alt="Truck on highway" className="rounded-img" />
          </div>
          <img src="/aboutusimg1.jpg" alt="Driver inside truck" className="rounded-img" />
        </div>
      </section>

      <section id="hrabovecontact">
        <hr />
      </section>

      <section id="products" className="products fade-in-section">
        <h2>Products</h2>
        <div className="carousel-container">
          <button className="arrow left" onClick={() => scrollCarousel(-1)}><HiChevronLeft /></button>
          <div className="carousel" id="productCarousel">
            {[
              {
                img: '/cotton waste.jpg',
                title: 'Cotton Waste',
                desc: 'Highly absorbent, durable, and eco-friendly nature...'
              },
              {
                img: '/package material.jpg',
                title: 'Packaging Materials',
                desc: 'Comprehensive range of heavy-duty packaging solutions...'
              },
              {
                img: '/stationery.jpg',
                title: 'Stationery',
                desc: 'From pens to file organizers, supports productivity...'
              },
              {
                img: '/Oils01.jpg',
                title: 'Industrial Oils',
                desc: 'Lubricants formulated to minimize friction and maximize longevity...'
              },
              {
                img: '/steelimg.jpg',
                title: 'Industrial Tools',
                desc: 'Durable and efficient for demanding industrial tasks...'
              },
              {
                img: '/washing.jpg',
                title: 'Housekeeping Materials',
                desc: 'Mops, sweepers, and cleaning agents for safe environments...'
              }
            ].map((item, index) => (
              <div className="product-item" key={index}>
                <img src={item.img} alt={item.title} className="rounded-img" />
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
          <button className="arrow right" onClick={() => scrollCarousel(1)}><HiChevronRight /></button>
        </div>
      </section>

      <section id="hrabovecontact">
        <hr />
      </section>

      <section id="contact" className="contact fade-in-section">
        <h2>Contact Us</h2>
        <p>Get in Touch</p>
        <form className="contact-form" onSubmit={handleSubmit}>
          <div>
            <label>First Name*</label>
            <input name="first" value={formData.first} onChange={handleChange} type="text" required />
          </div>
          <div>
            <label>Last Name*</label>
            <input name="last" value={formData.last} onChange={handleChange} type="text" required />
          </div>
          <div>
            <label>Email*</label>
            <input name="email" value={formData.email} onChange={handleChange} type="email" required />
            {errors.email && <small style={{ color: 'red' }}>{errors.email}</small>}
          </div>
          <div>
            <label>Phone*</label>
            <input name="phone" value={formData.phone} onChange={handleChange} type="text" required />
            {errors.phone && <small style={{ color: 'red' }}>{errors.phone}</small>}
          </div>
          <div>
            <label>Requirement*</label>
            <textarea name="requirement" value={formData.requirement} onChange={handleChange} rows="4" required />
          </div>
          <button type="submit" disabled={loading}>
            {loading ? 'Sending...' : 'Submit'}
          </button>
        </form>
      </section>

      <footer className="footer">
       <div class = "fotter-cont">
        <div class = "comp-name">
          <h2>IYAL</h2>
          <div className = "fotter-contact-cont">
            <div className="flex items-center gap-2">
              <FaPhoneAlt className="text-green-600" />
              <span> +91 9944745312, +91 936060310</span>
            </div>
            <div className="flex items-center gap-2">
              <FaEnvelope className="text-blue-600" />
              <span> admin@enterprisesin.com </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <FaMapMarkerAlt className="text-red-600" />
            <span> Address: No.17/8, pillaiyar koil street, kachinangkuppam, Ambattur Estate, SIDCO, chennai– 600098</span>
          </div>
        </div>
        <div  className = "contact-details">
          <div>© {new Date().getFullYear()} Goods al Mundo. All rights reserved.</div>
        </div>
       </div>
        
      </footer>

      {loading && (
        <div className="spinner-overlay">
          <div className="spinner"></div>
        </div>
      )}
    </div>
  );
}

export default HomePage;