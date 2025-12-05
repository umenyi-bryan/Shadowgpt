'use client';
import { useState, useEffect } from 'react';
import { Search, Globe, Shield, Zap, ExternalLink, Wifi, WifiOff, RefreshCw, Lock, Download, Cpu } from 'lucide-react';

export default function WebSearch({ onSearchResult, onModeChange }) {
  const [query, setQuery] = useState('');
  const [searching, setSearching] = useState(false);
  const [searchMode, setSearchMode] = useState('smart'); // smart, cybersecurity, general, news
  const [searchHistory, setSearchHistory] = useState([]);
  const [connectionStatus, setConnectionStatus] = useState('checking');
  const [results, setResults] = useState(null);

  // Check internet connection
  useEffect(() => {
    checkConnection();
  }, []);

  const checkConnection = async () => {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3000);
      
      const response = await fetch('https://httpbin.org/get', {
        signal: controller.signal,
        mode: 'no-cors'
      });
      clearTimeout(timeoutId);
      setConnectionStatus('online');
    } catch (error) {
      setConnectionStatus('offline');
    }
  };

  const searchSources = [
    {
      id: 'duckduckgo',
      name: 'DuckDuckGo',
      icon: '🦆',
      description: 'Privacy-focused search',
      url: (q) => `https://duckduckgo.com/?q=${encodeURIComponent(q)}`,
      api: true
    },
    {
      id: 'wikipedia',
      name: 'Wikipedia',
      icon: '📚',
      description: 'Free encyclopedia',
      url: (q) => `https://en.wikipedia.org/wiki/Special:Search?search=${encodeURIComponent(q)}`,
      api: true
    },
    {
      id: 'hackernews',
      name: 'Hacker News',
      icon: '⚡',
      description: 'Tech & security news',
      url: () => 'https://news.ycombinator.com/',
      api: true
    },
    {
      id: 'exploitdb',
      name: 'Exploit-DB',
      icon: '🔓',
      description: 'Security vulnerabilities',
      url: (q) => `https://www.exploit-db.com/search?q=${encodeURIComponent(q)}`,
      api: false
    },
    {
      id: 'github',
      name: 'GitHub',
      icon: '🐙',
      description: 'Code repositories',
      url: (q) => `https://github.com/search?q=${encodeURIComponent(q)}`,
      api: false
    },
    {
      id: 'stackoverflow',
      name: 'Stack Overflow',
      icon: '📖',
      description: 'Programming Q&A',
      url: (q) => `https://stackoverflow.com/search?q=${encodeURIComponent(q)}`,
      api: false
    }
  ];

  const performSearch = async () => {
    if (!query.trim()) return;
    
    setSearching(true);
    setResults(null);
    
    // Add to search history
    const newSearch = {
      query,
      mode: searchMode,
      timestamp: new Date(),
      id: Date.now()
    };
    setSearchHistory(prev => [newSearch, ...prev.slice(0, 9)]);
    
    try {
      let searchResults;
      
      switch(searchMode) {
        case 'cybersecurity':
          searchResults = await searchCybersecurity(query);
          break;
        case 'news':
          searchResults = await searchNews(query);
          break;
        case 'general':
          searchResults = await searchGeneral(query);
          break;
        default: // smart
          searchResults = await searchSmart(query);
      }
      
      setResults(searchResults);
      if (onSearchResult) {
        onSearchResult(searchResults);
      }
      
    } catch (error) {
      console.error('Search error:', error);
      setResults({
        error: true,
        message: 'Search failed. Please try again or check your connection.',
        query
      });
    } finally {
      setSearching(false);
    }
  };

  const searchSmart = async (q) => {
    // Try multiple sources
    const sourcesToTry = ['duckduckgo', 'wikipedia'];
    if (q.includes('hack') || q.includes('security') || q.includes('exploit')) {
      sourcesToTry.push('hackernews');
    }
    
    for (const sourceId of sourcesToTry) {
      const source = searchSources.find(s => s.id === sourceId);
      if (source?.api) {
        try {
          const result = await fetchFromSource(sourceId, q);
          if (result) {
            return {
              ...result,
              source: source.name,
              query: q,
              mode: 'smart'
            };
          }
        } catch (error) {
          continue;
        }
      }
    }
    
    throw new Error('No results found');
  };

  const searchCybersecurity = async (q) => {
    // Try cybersecurity-specific sources
    const sources = ['duckduckgo', 'hackernews'];
    
    for (const sourceId of sources) {
      try {
        const result = await fetchFromSource(sourceId, q + ' cybersecurity');
        if (result) {
          return {
            ...result,
            source: searchSources.find(s => s.id === sourceId).name,
            query: q,
            mode: 'cybersecurity',
            category: 'security'
          };
        }
      } catch (error) {
        continue;
      }
    }
    
    throw new Error('No cybersecurity results found');
  };

  const searchNews = async (q) => {
    // For news, use Hacker News or general search
    try {
      const result = await fetchFromSource('hackernews', q);
      if (result) {
        return {
          ...result,
          source: 'Hacker News',
          query: q,
          mode: 'news',
          category: 'technology'
        };
      }
    } catch (error) {
      // Fallback to DuckDuckGo
      const ddgResult = await fetchFromSource('duckduckgo', q + ' news');
      return {
        ...ddgResult,
        source: 'DuckDuckGo',
        query: q,
        mode: 'news',
        category: 'general'
      };
    }
  };

  const searchGeneral = async (q) => {
    const result = await fetchFromSource('duckduckgo', q);
    return {
      ...result,
      source: 'DuckDuckGo',
      query: q,
      mode: 'general'
    };
  };

  const fetchFromSource = async (sourceId, query) => {
    switch(sourceId) {
      case 'duckduckgo':
        return fetchDuckDuckGo(query);
      case 'wikipedia':
        return fetchWikipedia(query);
      case 'hackernews':
        return fetchHackerNews(query);
      default:
        return null;
    }
  };

  const fetchDuckDuckGo = async (q) => {
    const response = await fetch(`https://api.duckduckgo.com/?q=${encodeURIComponent(q)}&format=json&no_html=1`);
    const data = await response.json();
    
    return {
      title: data.Heading || data.AbstractText || 'Search Results',
      content: data.Abstract || 'No abstract available',
      url: data.AbstractURL || `https://duckduckgo.com/?q=${encodeURIComponent(q)}`,
      related: data.RelatedTopics?.slice(0, 5) || [],
      type: 'instant_answer'
    };
  };

  const fetchWikipedia = async (q) => {
    const searchResponse = await fetch(
      `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(q)}&format=json&origin=*`
    );
    const searchData = await searchResponse.json();
    
    if (searchData.query.search.length > 0) {
      const firstResult = searchData.query.search[0];
      const pageResponse = await fetch(
        `https://en.wikipedia.org/w/api.php?action=query&prop=extracts&exintro=true&explaintext=true&pageids=${firstResult.pageid}&format=json&origin=*`
      );
      const pageData = await pageResponse.json();
      const page = pageData.query.pages[firstResult.pageid];
      
      return {
        title: page.title,
        content: page.extract?.substring(0, 400) + '...' || 'No content available',
        url: `https://en.wikipedia.org/wiki/${encodeURIComponent(page.title.replace(/ /g, '_'))}`,
        related: searchData.query.search.slice(1, 4),
        type: 'encyclopedia'
      };
    }
    return null;
  };

  const fetchHackerNews = async (q) => {
    // Get top stories
    const storyIdsResponse = await fetch('https://hacker-news.firebaseio.com/v0/topstories.json');
    const storyIds = await storyIdsResponse.json();
    
    // Get first few stories
    const stories = [];
    for (let i = 0; i < Math.min(8, storyIds.length); i++) {
      const storyResponse = await fetch(`https://hacker-news.firebaseio.com/v0/item/${storyIds[i]}.json`);
      const story = await storyResponse.json();
      if (story && story.title) {
        stories.push({
          title: story.title,
          url: story.url || `https://news.ycombinator.com/item?id=${story.id}`,
          score: story.score || 0,
          time: new Date(story.time * 1000).toLocaleDateString()
        });
      }
    }
    
    // Filter by query if provided
    const filteredStories = q ? 
      stories.filter(story => 
        story.title.toLowerCase().includes(q.toLowerCase())
      ) : stories;
    
    return {
      title: 'Hacker News Top Stories',
      content: filteredStories.length > 0 ? 
        `${filteredStories.length} relevant stories found` : 
        'No matching stories found',
      stories: filteredStories.slice(0, 5),
      url: 'https://news.ycombinator.com/',
      type: 'news'
    };
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      performSearch();
    }
  };

  const clearSearch = () => {
    setQuery('');
    setResults(null);
  };

  const openInBrowser = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const quickSearches = [
    { query: 'latest cybersecurity news', icon: '🛡️' },
    { query: 'nmap tutorial 2024', icon: '🔍' },
    { query: 'python security libraries', icon: '🐍' },
    { query: 'what is blockchain', icon: '🔗' },
    { query: 'metasploit commands', icon: '⚡' },
    { query: 'free hacking tools', icon: '🛠️' }
  ];

  return (
    <div className="bg-gradient-to-b from-dark-200 to-dark-300 border border-neon-green/30 rounded-2xl p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-neon-green/20 rounded-lg">
            <Globe className="text-neon-green" size={24} />
          </div>
          <div>
            <h3 className="text-xl font-bold text-neon-green">Web Search</h3>
            <div className="flex items-center gap-2 text-sm">
              <div className={`flex items-center gap-1 ${connectionStatus === 'online' ? 'text-neon-green' : 'text-neon-red'}`}>
                {connectionStatus === 'online' ? <Wifi size={12} /> : <WifiOff size={12} />}
                <span>{connectionStatus === 'online' ? 'Online' : 'Offline'}</span>
              </div>
              <span className="text-neon-green/50">•</span>
              <span className="text-neon-green/70">Free APIs • No keys required</span>
            </div>
          </div>
        </div>
        
        <button
          onClick={checkConnection}
          className="px-3 py-1.5 bg-dark-400 border border-neon-green/30 rounded-lg text-sm hover:bg-dark-500 transition-colors flex items-center gap-2"
        >
          <RefreshCw size={14} />
          Check Connection
        </button>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Search the web for anything..."
            className="w-full bg-dark-400 border-2 border-neon-green/30 rounded-xl px-5 py-4 pr-12 text-sm focus:outline-none focus:border-neon-green"
          />
          <button
            onClick={performSearch}
            disabled={searching || !query.trim()}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 p-2 bg-neon-green text-dark-200 rounded-lg hover:bg-neon-green/90 disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <Search size={20} />
          </button>
        </div>
        
        <div className="flex flex-wrap items-center justify-between mt-3 gap-3">
          <div className="flex flex-wrap gap-2">
            {['smart', 'cybersecurity', 'general', 'news'].map((mode) => (
              <button
                key={mode}
                onClick={() => setSearchMode(mode)}
                className={`px-3 py-1.5 text-xs rounded-lg transition-all ${
                  searchMode === mode
                    ? 'bg-neon-green text-dark-200 font-bold'
                    : 'bg-dark-400 text-neon-green/60 hover:text-neon-green'
                }`}
              >
                {mode.charAt(0).toUpperCase() + mode.slice(1)}
              </button>
            ))}
          </div>
          
          {query && (
            <button
              onClick={clearSearch}
              className="text-xs text-neon-green/60 hover:text-neon-green"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Quick Searches */}
      <div className="mb-6">
        <div className="text-sm text-neon-green/80 mb-3">Quick Searches:</div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {quickSearches.map((quick, index) => (
            <button
              key={index}
              onClick={() => {
                setQuery(quick.query);
                setTimeout(() => performSearch(), 100);
              }}
              className="flex items-center gap-2 px-3 py-2.5 bg-dark-400 border border-neon-green/10 rounded-lg hover:border-neon-green/30 transition-colors text-sm text-left"
            >
              <span className="text-lg">{quick.icon}</span>
              <span className="flex-1 text-xs">{quick.query}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Search Sources */}
      <div className="mb-6">
        <div className="text-sm text-neon-green/80 mb-3">Available Sources:</div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {searchSources.map((source) => (
            <div
              key={source.id}
              className="p-3 bg-dark-400 border border-neon-green/10 rounded-lg hover:border-neon-green/30 transition-colors"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xl">{source.icon}</span>
                <div>
                  <div className="text-sm font-medium">{source.name}</div>
                  <div className="text-xs text-neon-green/60">{source.description}</div>
                </div>
              </div>
              <div className="flex justify-between items-center mt-2">
                <span className={`text-xs px-2 py-1 rounded ${source.api ? 'bg-neon-green/20 text-neon-green' : 'bg-neon-blue/20 text-neon-blue'}`}>
                  {source.api ? 'API Available' : 'Web Only'}
                </span>
                <button
                  onClick={() => openInBrowser(source.url(query || 'cybersecurity'))}
                  className="text-xs px-2 py-1 bg-dark-500 border border-neon-green/20 rounded hover:bg-dark-600"
                >
                  Open
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Search Results */}
      {searching && (
        <div className="border border-neon-green/30 rounded-xl p-6 text-center">
          <div className="flex justify-center mb-4">
            <div className="relative">
              <Globe className="text-neon-green animate-pulse" size={48} />
              <div className="absolute inset-0 bg-neon-green/20 rounded-full animate-ping"></div>
            </div>
          </div>
          <div className="text-neon-green font-medium mb-2">Searching the web...</div>
          <div className="text-sm text-neon-green/60">
            Query: "{query}" • Mode: {searchMode} • Source: {searchSources.find(s => s.id === 'duckduckgo')?.name}
          </div>
          <div className="mt-4 flex justify-center space-x-2">
            <div className="w-2 h-2 bg-neon-green rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-neon-green rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-2 h-2 bg-neon-green rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
        </div>
      )}

      {results && !searching && (
        <div className="border border-neon-green/30 rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h4 className="text-lg font-bold text-neon-green flex items-center gap-2">
                <Search size={18} />
                Search Results
              </h4>
              <div className="text-sm text-neon-green/60">
                Source: {results.source} • Mode: {results.mode}
              </div>
            </div>
            <button
              onClick={() => setResults(null)}
              className="text-xs px-3 py-1.5 bg-dark-400 border border-neon-green/20 rounded-lg"
            >
              Clear Results
            </button>
          </div>
          
          {results.error ? (
            <div className="text-center p-4 border border-neon-red/30 rounded-lg bg-neon-red/10">
              <div className="text-neon-red font-medium mb-2">Search Failed</div>
              <div className="text-sm text-neon-red/70">{results.message}</div>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Main Result */}
              <div className="bg-dark-400 border border-neon-green/20 rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="text-lg font-bold text-neon-green">{results.title}</div>
                    <div className="text-xs text-neon-green/60 mt-1">
                      From {results.source} • {results.type?.toUpperCase()}
                    </div>
                  </div>
                  <button
                    onClick={() => openInBrowser(results.url)}
                    className="flex items-center gap-1 px-3 py-1.5 bg-neon-green/20 text-neon-green rounded-lg hover:bg-neon-green/30 text-sm"
                  >
                    <ExternalLink size={14} />
                    Visit
                  </button>
                </div>
                
                <div className="text-sm text-neon-green/80 mb-4">
                  {results.content}
                </div>
                
                {/* Stories (for Hacker News) */}
                {results.stories && results.stories.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-neon-green/20">
                    <div className="text-sm font-medium text-neon-green mb-2">Top Stories:</div>
                    <div className="space-y-2">
                      {results.stories.map((story, index) => (
                        <div key={index} className="flex items-start gap-2 p-2 bg-dark-500 rounded hover:bg-dark-600">
                          <span className="text-xs text-neon-green/60 mt-1">{index + 1}.</span>
                          <div className="flex-1">
                            <div className="text-sm">{story.title}</div>
                            <div className="flex items-center gap-3 text-xs text-neon-green/60 mt-1">
                              {story.score && <span>⭐ {story.score}</span>}
                              {story.time && <span>📅 {story.time}</span>}
                            </div>
                          </div>
                          <button
                            onClick={() => openInBrowser(story.url)}
                            className="text-xs px-2 py-1 bg-dark-600 rounded"
                          >
                            Open
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Related Topics */}
                {results.related && results.related.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-neon-green/20">
                    <div className="text-sm font-medium text-neon-green mb-2">Related Topics:</div>
                    <div className="flex flex-wrap gap-2">
                      {results.related.map((topic, index) => (
                        <button
                          key={index}
                          onClick={() => {
                            setQuery(topic.Text || topic.title || '');
                            setTimeout(() => performSearch(), 100);
                          }}
                          className="text-xs px-3 py-1.5 bg-dark-500 border border-neon-green/10 rounded-lg hover:border-neon-green/30"
                        >
                          {topic.Text || topic.title}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              
              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => {
                    if (onSearchResult) {
                      onSearchResult(results);
                    }
                  }}
                  className="px-4 py-2 bg-neon-green text-dark-200 rounded-lg font-medium hover:bg-neon-green/90 flex items-center gap-2"
                >
                  <Download size={16} />
                  Use in Chat
                </button>
                <button
                  onClick={() => openInBrowser(results.url)}
                  className="px-4 py-2 bg-dark-400 border border-neon-green/30 rounded-lg hover:bg-dark-500 flex items-center gap-2"
                >
                  <ExternalLink size={16} />
                  Open Full Results
                </button>
                <button
                  onClick={() => setQuery('')}
                  className="px-4 py-2 bg-dark-400 border border-neon-green/30 rounded-lg hover:bg-dark-500"
                >
                  New Search
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Search History */}
      {searchHistory.length > 0 && !results && !searching && (
        <div className="mt-6 pt-6 border-t border-neon-green/20">
          <div className="text-sm text-neon-green/80 mb-3">Recent Searches:</div>
          <div className="space-y-2">
            {searchHistory.slice(0, 5).map((search) => (
              <div
                key={search.id}
                className="flex items-center justify-between p-3 bg-dark-400 border border-neon-green/10 rounded-lg hover:border-neon-green/30 cursor-pointer group"
                onClick={() => {
                  setQuery(search.query);
                  setTimeout(() => performSearch(), 100);
                }}
              >
                <div className="flex items-center gap-3">
                  <div className="p-1.5 bg-neon-green/10 rounded">
                    <Search size={14} className="text-neon-green" />
                  </div>
                  <div>
                    <div className="text-sm">{search.query}</div>
                    <div className="text-xs text-neon-green/60">
                      {search.mode} • {new Date(search.timestamp).toLocaleTimeString()}
                    </div>
                  </div>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSearchHistory(prev => prev.filter(s => s.id !== search.id));
                  }}
                  className="text-xs px-2 py-1 opacity-0 group-hover:opacity-100 hover:bg-dark-500 rounded"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="mt-6 pt-6 border-t border-neon-green/20 text-center">
        <div className="text-xs text-neon-green/60 mb-2">
          <Lock size={12} className="inline mr-1" />
          Privacy-focused search • No tracking • Free APIs
        </div>
        <div className="text-[10px] text-neon-green/40">
          Uses DuckDuckGo, Wikipedia, Hacker News APIs • No API keys required
        </div>
      </div>
    </div>
  );
}
