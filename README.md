# Angular Login Component - Module Federation Remote

Bu proje, Module Federation kullanarak paylaşılabilen bir Angular login component'idir. GitHub Pages üzerinde host edilir ve herhangi bir host uygulamadan (React, Vue, vb.) kullanılabilir.

## 🚀 Canlı Demo

[GitHub Pages'te Demo](https://[username].github.io/[repo-name]/)

## 📦 Kurulum ve Kullanım

### Host Uygulamada Kullanım

1. **Webpack Module Federation Ayarları:**

```javascript
// webpack.config.js
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

module.exports = {
  plugins: [
    new ModuleFederationPlugin({
      name: 'host',
      remotes: {
        angularApp: 'angularApp@https://[username].github.io/[repo-name]/remoteEntry.js',
      },
    }),
  ],
};
```

2. **React'ta Kullanım Örneği:**

```javascript
import React, { useEffect, useRef } from 'react';

const RemoteAngularComponent = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const loadComponent = async () => {
      await import('angularApp/LoginComponent');
      
      const angularElement = document.createElement('angular-login-form');
      containerRef.current.appendChild(angularElement);
    };

    loadComponent();
  }, []);

  return <div ref={containerRef}></div>;
};
```

## 🛠️ Geliştirme

### Gereksinimler

- Node.js (v18+)
- npm veya yarn

### Yerel Geliştirme

```bash
# Bağımlılıkları yükle
npm install

# Development server (Module Federation)
npm run start:mf

# Production build
npm run build:github
```

### GitHub Pages'e Deploy

```bash
# Build for GitHub Pages
npm run build:github

# Commit and push
git add docs/
git commit -m "Update GitHub Pages build"
git push origin main
```

GitHub repository ayarlarından Pages'i aktifleştirin ve source olarak `/docs` klasörünü seçin.

## 📝 API

### Props/Attributes

- `currentTime`: Başlangıç zamanı
- `lastMessage`: Gösterilecek mesaj

### Events

- `loginSubmit`: Form submit edildiğinde tetiklenir
  ```javascript
  element.addEventListener('loginSubmit', (event) => {
    console.log('Login data:', event.detail);
  });
  ```

### Methods

- `sendMessage(message: string)`: Component'e mesaj gönderir

## 🔧 Teknik Detaylar

- Angular 18
- Module Federation
- Angular Elements (Custom Elements)
- TypeScript
- Webpack 5

## 📄 Lisans

MIT
