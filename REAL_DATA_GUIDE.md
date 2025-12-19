# Gerçek Veri Entegrasyonu Rehberi / Real Data Integration Guide

## 🌍 Genel Bakış / Overview

Bu platform **gerçek tarımsal veri** entegrasyonu için hazırlanmıştır. Şu anda **mock veriler** kullanılmaktadır, ancak API anahtarları eklenerek gerçek verilerle çalışabilir.

The platform is prepared for **real agricultural data** integration. Currently using **mock data**, but can work with real data by adding API keys.

---

## 📊 Mevcut API Entegrasyonları / Current API Integrations

### 1. ☁️ Hava Durumu / Weather Data

**API**: OpenWeatherMap  
**Dosya / File**: `/app/api/weather/route.ts`  
**Durum / Status**: ✅ Hazır / Ready

**Nasıl Kullanılır / How to Use**:

```bash
# 1. API anahtarı edinin / Get API key
# https://openweathermap.org/api

# 2. .env.local dosyası oluşturun / Create .env.local file
echo "NEXT_PUBLIC_OPENWEATHER_API_KEY=your_key_here" >> .env.local

# 3. Restart dev server
npm run dev
```

**Sağlanan Veriler / Provided Data**:
- ✅ Gerçek zamanlı sıcaklık / Real-time temperature
- ✅ Nem oranı / Humidity
- ✅ Rüzgar hızı ve yönü / Wind speed & direction
- ✅ 5 günlük hava tahmini / 5-day forecast
- ✅ Basınç ve görüş mesafesi / Pressure & visibility

**Maliyet / Cost**: ÜCRETSİZ (1000 çağrı/gün) / FREE (1000 calls/day)

---

### 2. 🛰️ Uydu Verileri / Satellite Data (NDVI)

**API**: Farmonaut  
**Dosya / File**: `/app/api/satellite/route.ts`  
**Durum / Status**: ✅ Hazır / Ready

**Nasıl Kullanılır / How to Use**:

```bash
# 1. Farmonaut hesabı oluşturun / Create Farmonaut account
# https://farmonaut.com/api

# 2. API anahtarı alın / Get API key
# Developer Portal -> API Keys

# 3. .env.local'a ekleyin / Add to .env.local
echo "FARMONAUT_API_KEY=your_key_here" >> .env.local
```

**Sağlanan Veriler / Provided Data**:
- ✅ NDVI (Normalized Difference Vegetation Index)
- ✅ EVI (Enhanced Vegetation Index)
- ✅ SAVI (Soil Adjusted Vegetation Index)
- ✅ Toprak nemi tahmini / Soil moisture estimate
- ✅ Klorofil içeriği / Chlorophyll content
- ✅ Biyokütle tahmini / Biomass estimation

**Uydu Kaynakları / Satellite Sources**:
- 🛰️ Sentinel-2 (10m çözünürlük / 10m resolution)
- 🛰️ Landsat-8 (30m çözünürlük / 30m resolution)

**Maliyet / Cost**: Ücretli / Paid (API key gerekli / API key required)

---

### 3. 🚁 Drone Telemetri / Drone Telemetry

**API**: DJI Cloud API / Parrot SDK  
**Dosya / File**: `/app/api/drone-telemetry/route.ts`  
**Durum / Status**: ✅ Hazır (Mock veri ile / Ready with mock data)

**Desteklenen Drone'lar / Supported Drones**:
- ✈️ DJI Mavic 3 Multispectral
- ✈️ DJI Agras T40
- ✈️ DJI Phantom 4 Multispectral  
- ✈️ AgEagle RX60

**Nasıl Kullanılır / How to Use**:

```bash
# DJI için / For DJI:
# 1. DJI Developer hesabı oluşturun / Create DJI Developer account
# https://developer.dji.com/

# 2. Cloud API anahtarı alın / Get Cloud API key
# DJI Developer Console -> Cloud API

# 3. .env.local'a ekleyin / Add to .env.local
echo "DJI_API_KEY=your_key_here" >> .env.local
echo "DJI_API_BASE=https://api.dji.com/v1" >> .env.local

# Parrot için / For Parrot:
# https://developer.parrot.com/
echo "PARROT_API_KEY=your_key_here" >> .env.local
```

**Sağlanan Telemetri Verileri / Provided Telemetry Data**:
- ✅ **Pozisyon**: GPS (RTK doğruluk / RTK accuracy), irtifa / altitude
- ✅ **Batarya**: Seviye, voltaj, akım, sıcaklık / Level, voltage, current, temp
- ✅ **Uçuş**: Hız, süre, kapsanan alan / Speed, duration, area covered
- ✅ **Sensörler**: NDVI, multispektral bantlar / NDVI, multispectral bands
- ✅ **Hava Durumu**: Sıcaklık, nem, rüzgar / Temperature, humidity, wind
- ✅ **Kamera**: Kayıt durumu, çekilen fotoğraflar / Recording status, photos taken
- ✅ **İlaçlama** (T40): Tank seviyesi, akış hızı / Tank level, flow rate
- ✅ **Sağlık**: Motor durumu, engel tespiti / Motor status, obstacle detection

**Gerçek Zamanlı Güncelleme / Real-Time Updates**: Her 10 saniye / Every 10 seconds

---

### 4. 🌾 USDA Tarım İstatistikleri / USDA Agricultural Statistics

**API**: USDA NASS QuickStats  
**Dosya / File**: `/app/api/usda-nass/route.ts`  
**Durum / Status**: ✅ Hazır / Ready

**Nasıl Kullanılır / How to Use**:

```bash
# 1. API anahtarı alın (ÜCRETSİZ) / Get API key (FREE)
# https://quickstats.nass.usda.gov/api

# 2. .env.local'a ekleyin / Add to .env.local
echo "USDA_API_KEY=your_key_here" >> .env.local
```

**Sağlanan Veriler / Provided Data**:
- ✅ Ürün fiyatları / Crop prices
- ✅ Verim istatistikleri / Yield statistics
- ✅ Ekim alanları / Planted acres
- ✅ Üretim tahminleri / Production forecasts

**Maliyet / Cost**: ÜCRETSİZ / FREE

---

### 5. 🛡️ EPA Pestisit Verileri / EPA Pesticides Data

**API**: EPA ChemView  
**Dosya / File**: `/app/api/epa-pesticides/route.ts`  
**Durum / Status**: ✅ Hazır / Ready

**Sağlanan Veriler / Provided Data**:
- ✅ Onaylı pestisitler / Approved pesticides
- ✅ Güvenlik bilgileri / Safety information
- ✅ Uygulama kılavuzları / Application guidelines

**Maliyet / Cost**: ÜCRETSİZ / FREE

---

## 🔄 API Client Kullanımı / API Client Usage

Platform, tüm API'leri tek bir client'tan kullanmanızı sağlar:

```typescript
import { fetchDroneTelemetry, fetchWeather, fetchSatelliteData } from '@/lib/api-client';

// Drone telemetri çek / Fetch drone telemetry
const droneData = await fetchDroneTelemetry();

// Hava durumu çek / Fetch weather
const weather = await fetchWeather(39.9334, 32.8597); // Ankara

// Uydu verileri çek / Fetch satellite data
const satellite = await fetchSatelliteData(39.9334, 32.8597, 30); // Son 30 gün / Last 30 days
```

---

## 🎯 Gerçek Verilerle Çalışma Adımları / Steps to Work with Real Data

### Adım 1: API Anahtarlarını Edinin / Step 1: Get API Keys

1. **OpenWeatherMap** (Ücretsiz / Free)
   - https://openweathermap.org/api
   - 1000 call/day ücretsiz / 1000 calls/day free

2. **Farmonaut** (Ücretli / Paid)
   - https://farmonaut.com/api
   - Uydu görüntüleme için gerekli / Required for satellite imagery

3. **DJI Developer** (Gerçek drone kullanıyorsanız / If using real drones)
   - https://developer.dji.com/
   - Cloud API erişimi / Cloud API access

4. **USDA NASS** (Ücretsiz / Free)
   - https://quickstats.nass.usda.gov/api
   - Tarım istatistikleri / Agricultural statistics

### Adım 2: .env.local Dosyası Oluşturun / Step 2: Create .env.local File

```bash
cp .env.example .env.local
```

Ardından API anahtarlarınızı ekleyin:

```env
NEXT_PUBLIC_OPENWEATHER_API_KEY=your_actual_key_here
FARMONAUT_API_KEY=your_actual_key_here
DJI_API_KEY=your_actual_key_here
USDA_API_KEY=your_actual_key_here
```

### Adım 3: Sunucuyu Yeniden Başlatın / Step 3: Restart Server

```bash
npm run dev
```

### Adım 4: Gerçek Verileri Kontrol Edin / Step 4: Check Real Data

Dashboard'da:
1. **Drone Management** sekmesine gidin / Go to Drone Management tab
2. **Real-Time Data** butonunun yeşil olduğunu doğrulayın / Verify Real-Time Data button is green
3. Veri kaynaklarını kontrol edin / Check data sources:
   - Console'da "Mock Data" yerine "API" görmelisiniz / You should see "API" instead of "Mock Data" in console

---

## 🚀 İleri Seviye Entegrasyonlar / Advanced Integrations

### 1. Veritabanı (Vercel Postgres)

```bash
# 1. Vercel Postgres ekle / Add Vercel Postgres
vercel postgres create

# 2. Prisma kur / Install Prisma
npm install @prisma/client
npm install -D prisma

# 3. Prisma başlat / Initialize Prisma
npx prisma init

# 4. Schema tanımla / Define schema
# prisma/schema.prisma dosyasını düzenle / Edit prisma/schema.prisma

# 5. Migration çalıştır / Run migration
npx prisma migrate dev
```

### 2. WebSocket (Gerçek Zamanlı İletişim / Real-Time Communication)

```bash
# Socket.IO kur / Install Socket.IO
npm install socket.io socket.io-client

# Server oluştur / Create server
# pages/api/socket.ts
```

### 3. Drone Komut Gönderme / Send Drone Commands

```typescript
import { controlDrone } from '@/lib/api-client';

// Drone'u başlat / Start drone
await controlDrone('DJI-M3M-001', 'start', { 
  altitude: 120, 
  speed: 15 
});

// Drone'u duraklat / Pause drone
await controlDrone('DJI-M3M-001', 'pause');

// Eve dön / Return home
await controlDrone('DJI-M3M-001', 'return');
```

---

## 📈 Veri Akışı / Data Flow

```
┌─────────────────┐
│  Drone/Sensor   │  ──► DJI/Parrot API
└─────────────────┘
         │
         ▼
┌─────────────────┐
│  API Routes     │  ──► /api/drone-telemetry
└─────────────────┘
         │
         ▼
┌─────────────────┐
│  API Client     │  ──► lib/api-client.ts
└─────────────────┘
         │
         ▼
┌─────────────────┐
│  Components     │  ──► DroneManagement.tsx
└─────────────────┘
         │
         ▼
┌─────────────────┐
│  Dashboard UI   │  ──► Kullanıcı görür / User sees
└─────────────────┘
```

---

## ⚡ Performans Optimizasyonu / Performance Optimization

1. **API Önbellekleme / API Caching**: 
   - 10 saniyelik aralıklarla veri güncelleme / Update data every 10 seconds
   - Gereksiz API çağrılarını önleme / Prevent unnecessary API calls

2. **Batching**:
   - Birden fazla drone için tek API çağrısı / Single API call for multiple drones

3. **Error Handling**:
   - API hatalarında mock veriye geri dön / Fallback to mock data on API errors
   - Kullanıcıya bilgilendirme göster / Show notification to user

---

## 🔒 Güvenlik / Security

1. **API Anahtarları**:
   - ❌ Asla git'e commit etmeyin / Never commit to git
   - ✅ `.env.local` kullanın / Use .env.local
   - ✅ Vercel'da Environment Variables olarak ekleyin / Add as Environment Variables in Vercel

2. **Rate Limiting**:
   - API limitlerini aşmamak için önlem alınmıştır / Measures taken to not exceed API limits

3. **CORS**:
   - API route'lar backend'de çalışır / API routes run on backend
   - CORS sorunları yok / No CORS issues

---

## 📊 Maliyet Tahmini / Cost Estimation

| API | Ücretsiz Limit / Free Tier | Ücretli Plan / Paid Plan |
|-----|---------------------------|------------------------|
| OpenWeather | 1000 call/gün / day | $40/ay (60,000 call/gün / day) |
| Farmonaut | - | $99-299/ay / month |
| DJI Cloud | Drone sahipleri için ücretsiz / Free for drone owners | - |
| USDA NASS | Sınırsız / Unlimited | Ücretsiz / Free |
| EPA | Sınırsız / Unlimited | Ücretsiz / Free |

**Tahmini Aylık Maliyet / Estimated Monthly Cost**: $0-400

---

## 🎓 Eğitim Kaynakları / Learning Resources

1. **DJI SDK**:
   - https://developer.dji.com/doc/mobile-sdk/en/
   - https://developer.dji.com/doc/cloud-api/en/

2. **Farmonaut API**:
   - https://farmonaut.com/api-documentation
   - https://github.com/Farmonaut

3. **OpenWeather**:
   - https://openweathermap.org/api/agro
   - https://openweathermap.org/guide

4. **USDA NASS**:
   - https://quickstats.nass.usda.gov/api
   - https://www.nass.usda.gov/

---

## ✅ Test Checklist

- [ ] OpenWeather API anahtarı eklendi ve çalışıyor / OpenWeather API key added and working
- [ ] Farmonaut API anahtarı eklendi ve NDVI verileri geliyor / Farmonaut API key added and NDVI data received
- [ ] Drone telemetri verileri görüntüleniyor / Drone telemetry data displaying
- [ ] Gerçek zamanlı güncellemeler çalışıyor / Real-time updates working
- [ ] Hava durumu verileri doğru / Weather data accurate
- [ ] Console'da hata yok / No errors in console
- [ ] Tüm API'ler 200 OK dönüyor / All APIs returning 200 OK

---

## 🆘 Sorun Giderme / Troubleshooting

### API Anahtarı Çalışmıyor / API Key Not Working

```bash
# 1. .env.local dosyasını kontrol edin / Check .env.local file
cat .env.local

# 2. Sunucuyu yeniden başlatın / Restart server
npm run dev

# 3. Console'u kontrol edin / Check console
# Browser DevTools -> Console -> Ağ / Network sekmesi
```

### Mock Veri Görünüyor / Seeing Mock Data

API anahtarı yoksa veya hatalıysa, sistem otomatik olarak mock veriye döner. Console'da şu mesajı görürsünüz:

```
Using mock data. Add API_KEY to .env for real data
```

---

## 🎯 Sonuç / Conclusion

Platform **tamamen gerçek veri entegrasyonuna hazır**. API anahtarlarını ekleyerek production'da gerçek verilerle çalışabilir. Mock veriler, API'ler olmadan da sistemi test etmenizi sağlar.

The platform is **fully ready for real data integration**. By adding API keys, you can work with real data in production. Mock data allows you to test the system even without APIs.

**İletişim / Contact**: Sorularınız için issue açın / Open an issue for questions
