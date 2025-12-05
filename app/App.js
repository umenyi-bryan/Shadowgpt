import UltimateChat from './components/UltimateChat';

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-100 via-dark-200 to-dark-300 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-neon-green mb-2">
                Shadow<span className="text-neon-blue">GPT</span>
              </h1>
              <p className="text-lg text-neon-green/80">
                Ultimate AI Assistant • Cybersecurity Expert • Real-time Intelligence
              </p>
            </div>
            <div className="bg-dark-400/50 backdrop-blur-sm rounded-2xl p-4 border border-neon-green/20">
              <div className="flex items-center gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-neon-green">100%</div>
                  <div className="text-xs text-neon-green/70">Free</div>
                </div>
                <div className="h-8 w-px bg-neon-green/30"></div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-neon-purple">∞</div>
                  <div className="text-xs text-neon-purple/70">Unlimited</div>
                </div>
                <div className="h-8 w-px bg-neon-green/30"></div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-neon-blue">24/7</div>
                  <div className="text-xs text-neon-blue/70">Online</div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Feature Badges */}
          <div className="flex flex-wrap gap-3 mt-6">
            <div className="px-3 py-1.5 bg-neon-green/10 text-neon-green rounded-full text-sm font-medium flex items-center gap-1">
              <div className="w-2 h-2 bg-neon-green rounded-full animate-pulse"></div>
              AI-Powered Cybersecurity
            </div>
            <div className="px-3 py-1.5 bg-neon-blue/10 text-neon-blue rounded-full text-sm font-medium flex items-center gap-1">
              <div className="w-2 h-2 bg-neon-blue rounded-full animate-pulse"></div>
              Real-time Information
            </div>
            <div className="px-3 py-1.5 bg-neon-purple/10 text-neon-purple rounded-full text-sm font-medium flex items-center gap-1">
              <div className="w-2 h-2 bg-neon-purple rounded-full animate-pulse"></div>
              Advanced Local Intelligence
            </div>
            <div className="px-3 py-1.5 bg-neon-yellow/10 text-neon-yellow rounded-full text-sm font-medium flex items-center gap-1">
              <div className="w-2 h-2 bg-neon-yellow rounded-full animate-pulse"></div>
              No API Keys Required
            </div>
            <div className="px-3 py-1.5 bg-gradient-to-r from-neon-green/10 to-neon-blue/10 text-neon-green rounded-full text-sm font-medium flex items-center gap-1">
              <div className="w-2 h-2 bg-gradient-to-r from-neon-green to-neon-blue rounded-full animate-pulse"></div>
              100% Open Source
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1">
          <div className="h-[calc(100vh-200px)] min-h-[600px]">
            <UltimateChat />
          </div>
        </main>

        {/* Footer */}
        <footer className="mt-8 pt-6 border-t border-neon-green/20">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-neon-green/60">
              <p>ShadowGPT v6.0 • Ultimate AI Assistant</p>
              <p className="mt-1">Specialized in cybersecurity, technology, and intelligent conversations</p>
            </div>
            <div className="flex gap-4">
              <a href="#" className="text-sm text-neon-green hover:text-neon-blue transition-colors">
                Documentation
              </a>
              <a href="#" className="text-sm text-neon-green hover:text-neon-blue transition-colors">
                GitHub
              </a>
              <a href="#" className="text-sm text-neon-green hover:text-neon-blue transition-colors">
                Report Issue
              </a>
            </div>
          </div>
          <div className="mt-4 text-center text-xs text-neon-green/40">
            <p>Always use AI responsibly. Cybersecurity knowledge should be used for ethical purposes only.</p>
          </div>
        </footer>
      </div>
    </div>
  );
}
