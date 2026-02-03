'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import styles from './Navbar.module.css';
import { CATEGORIES } from '@/lib/api';

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const router = useRouter();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (isMobileMenuOpen && !target.closest(`.${styles.navbar}`)) {
                setIsMobileMenuOpen(false);
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, [isMobileMenuOpen]);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
            setSearchQuery('');
            setIsSearchOpen(false);
        }
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
        setIsSearchOpen(false);
    };

    const toggleSearch = () => {
        setIsSearchOpen(!isSearchOpen);
        setIsMobileMenuOpen(false);
    };

    return (
        <>
            <nav className={`${styles.navbar} ${isScrolled ? styles.scrolled : ''}`}>
                <div className={styles.container}>
                    {/* Logo */}
                    <Link href="/" className={styles.logo}>
                        <span className={styles.logoIcon}>▶</span>
                        <span className={styles.logoText}>Zan<span className={styles.logoAccent}>Stream</span></span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className={styles.desktopNav}>
                        {CATEGORIES.slice(0, 6).map((category) => (
                            <Link
                                key={category.id}
                                href={`/category/${category.id}`}
                                className={styles.navLink}
                            >
                                {category.title}
                            </Link>
                        ))}
                    </div>

                    {/* Desktop Search Bar */}
                    <form onSubmit={handleSearch} className={styles.desktopSearch}>
                        <svg className={styles.searchIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <circle cx="11" cy="11" r="8" strokeWidth="2" />
                            <path d="m21 21-4.35-4.35" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                        <input
                            type="text"
                            placeholder="Cari film atau series..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className={styles.searchInput}
                        />
                    </form>

                    {/* Mobile Actions */}
                    <div className={styles.mobileActions}>
                        {/* Search Toggle Button (Mobile) */}
                        <button
                            className={styles.iconBtn}
                            onClick={toggleSearch}
                            aria-label="Search"
                        >
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="11" cy="11" r="8" />
                                <path d="m21 21-4.35-4.35" strokeLinecap="round" />
                            </svg>
                        </button>

                        {/* Menu Toggle Button (Mobile) */}
                        <button
                            className={`${styles.menuBtn} ${isMobileMenuOpen ? styles.menuOpen : ''}`}
                            onClick={toggleMobileMenu}
                            aria-label="Toggle menu"
                        >
                            <span className={styles.menuIcon}>
                                <span></span>
                                <span></span>
                                <span></span>
                            </span>
                        </button>
                    </div>
                </div>

                {/* Mobile Search Bar (Dropdown) */}
                <div className={`${styles.mobileSearchBar} ${isSearchOpen ? styles.show : ''}`}>
                    <form onSubmit={handleSearch} className={styles.mobileSearchForm}>
                        <input
                            type="text"
                            placeholder="Cari film atau series..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className={styles.mobileSearchInput}
                            autoFocus={isSearchOpen}
                        />
                        <button type="submit" className={styles.searchSubmit}>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="11" cy="11" r="8" />
                                <path d="m21 21-4.35-4.35" strokeLinecap="round" />
                            </svg>
                        </button>
                    </form>
                </div>
            </nav>

            {/* Mobile Menu (Full Screen Overlay) */}
            <div className={`${styles.mobileMenuOverlay} ${isMobileMenuOpen ? styles.show : ''}`}>
                <div className={styles.mobileMenuContent}>
                    <div className={styles.mobileMenuHeader}>
                        <span className={styles.mobileMenuTitle}>Menu</span>
                        <button className={styles.closeBtn} onClick={() => setIsMobileMenuOpen(false)}>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
                            </svg>
                        </button>
                    </div>
                    <div className={styles.mobileMenuLinks}>
                        {CATEGORIES.map((category, index) => (
                            <Link
                                key={category.id}
                                href={`/category/${category.id}`}
                                className={styles.mobileNavLink}
                                onClick={() => setIsMobileMenuOpen(false)}
                                style={{ animationDelay: `${index * 50}ms` }}
                            >
                                {category.title}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}
