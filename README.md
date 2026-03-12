# 🗓️ İzinTakip (Absence Tracker)

Premium tasarımlı, gerçek zamanlı senkronize olabilen ve herhangi bir sunucu (backend) yönetimi gerektirmeyen modern bir izin takip uygulaması.

![Premium UI](https://img.shields.io/badge/UI-Glassmorphism-blueviolet)
![React](https://img.shields.io/badge/Frontend-React%20+%20Vite-61DAFB)
![Firebase](https://img.shields.io/badge/Database-Firebase%20Firestore-FFCA28)
![GitHub Pages](https://img.shields.io/badge/Deployment-GitHub%20Actions-2088FF)

## ✨ Özellikler

- **Bulut Senkronizasyonu (Firebase)**: Veriler tüm cihazlar arasında anlık olarak senkronize edilir.
- **Yönetici Modu (Güvenlik)**: İzin eklemek/silmek veya kullanıcı yönetmek için şifre korumalı (varsayılan: `1234`) admin paneli.
- **Dinamik Kullanıcı Yönetimi**: Uygulama içinden yeni kişiler ekleyebilir, renklerini ve isimlerini değiştirebilirsiniz.
- **Resmi Tatil Entegrasyonu**: Türkiye resmi ve dini tatilleri (2024-2026) otomatik olarak takvimde işaretlenir.
- **Premium Tasarım**: Göz yormayan, modern ve şık Glassmorphism teması.
- **Mobil Uyumlu**: Tüm cihazlarda sorunsuz çalışan responsive grid yapısı.

## 🛠️ Teknoloji Yığını

- **React + Vite**: Hızlı ve modern frontend geliştirme.
- **Firebase Firestore**: Gerçek zamanlı NoSQL veritabanı.
- **Firebase Auth**: Anonim oturum açma ile güvenli veri yazma.
- **GitHub Actions**: Otomatik CI/CD (Build & Deploy) süreçleri.

## 🚀 Hızlı Başlangıç

### Yerel Kurulum

1. Depoyu klonlayın:
   ```bash
   git clone https://github.com/Berkawaii/AbsenceApp.git
   cd AbsenceApp
   ```

2. Bağımlılıkları yükleyin:
   ```bash
   npm install
   ```

3. `.env` dosyasını oluşturun:
   `.env.example` dosyasını kopyalayıp `.env` adında yeni bir dosya oluşturun ve Firebase bilgilerinizi girin.

4. Uygulamayı başlatın:
   ```bash
   npm run dev
   ```

## 🔒 Güvenlik Notu

Veritabanı güvenliği için Firebase Firestore kurallarının şu şekilde ayarlanması önerilir:
```javascript
match /databases/{database}/documents {
  match /{document=**} {
    allow read: if true;
    allow write: if request.auth != null;
  }
}
```

## 📄 Lisans

Bu proje kişisel kullanım ve takip amaçlı geliştirilmiştir.

---
© 2026 İzinTakip - Developed with ❤️
