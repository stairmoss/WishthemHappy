import React, { useState, useEffect } from 'react';
import { HomePage } from './pages/HomePage';
import { DashboardPage } from './pages/DashboardPage';
import { StoryBuilderPage } from './pages/StoryBuilderPage';
import { StoryViewerPage } from './pages/StoryViewerPage';
import './styles/globals.css';

// Clear any previously seeded demo/sample wish cards from localStorage
localStorage.removeItem('hmm_birthday_wishes');

export default function App() {
  const [route, setRoute] = useState('home'); // home, dashboard, create, story-viewer
  const [viewerSlug, setViewerSlug] = useState('elena-25th-birthday');

  useEffect(() => {
    const handleHashChange = () => {
      const fullHash = window.location.hash.replace('#', '');
      // e.g. "story/john-1234" or "story/shared?data=abc123"
      if (fullHash.startsWith('story/')) {
        const slug = fullHash.replace('story/', '');
        setViewerSlug(slug);
        setRoute('story-viewer');
      } else if (fullHash === 'dashboard') {
        setRoute('dashboard');
      } else if (fullHash === 'create') {
        setRoute('create');
      } else {
        setRoute('home');
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [route]);

  const navigateTo = (page, slug) => {
    if (page === 'story-viewer' && slug) {
      window.location.hash = `story/${slug}`;
      setViewerSlug(slug);
      setRoute('story-viewer');
    } else if (page === 'dashboard') {
      window.location.hash = 'dashboard';
      setRoute('dashboard');
    } else if (page === 'create') {
      window.location.hash = 'create';
      setRoute('create');
    } else {
      window.location.hash = '';
      setRoute('home');
    }
  };

  switch (route) {
    case 'dashboard':
      return <DashboardPage onNavigate={navigateTo} />;
    case 'create':
      return <StoryBuilderPage onNavigate={navigateTo} />;
    case 'story-viewer':
      return <StoryViewerPage slug={viewerSlug} onNavigate={navigateTo} />;
    case 'home':
    default:
      return <HomePage onNavigate={navigateTo} />;
  }
}
