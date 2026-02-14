
# Hoshi-Day.IO

![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat&logo=tailwind-css&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat&logo=vite&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green)

## 🖼️ Preview

<p align="center">
    <table>
        <tr>
            <td><img src="public/screenshot/Screenshot%202026-02-15%20023604.png" alt="Hoshi-Day.IO Screenshot 1" width="300" /></td>
            <td><img src="public/screenshot/Screenshot%202026-02-15%20023613.png" alt="Hoshi-Day.IO Screenshot 2" width="300" /></td>
            <td><img src="public/screenshot/Screenshot%202026-02-15%20023636.png" alt="Hoshi-Day.IO Screenshot 3" width="300" /></td>
        </tr>
    </table>
</p>


**Hoshi-Day.IO** adalah aplikasi web interaktif bertema "Phantom Thieves" untuk merayakan ulang tahun karakter anime & game favorit. Fitur utama: hitung mundur real-time, database karakter, QR Code share, dan UI stylish ala Persona 5.


## 📌 Deskripsi Project
Hoshi-Day.IO adalah "kalender hidup" untuk para fans pop-culture:
- **Mission Briefing:** Intro animasi dengan video & efek chroma key.
- **Target Details Form:** Input nama target, tanggal lahir, dan pilih karakter pengantar.
- **Character Roster:** Database karakter dari anime/game populer (Attack on Titan, Jujutsu Kaisen, Resident Evil, Love and Deepspace, dll).
- **Countdown Real-Time:** Hitung mundur presisi (hari, jam, menit, detik) dengan status fase (calm, intense, critical, imminent).
- **QR Code Share:** Bagikan link countdown via QR Code unik.
- **Custom Toast & Loading:** Notifikasi error/sukses dan loading screen dengan efek video.


## 🛠️ Tech Stack
- **React.js** (SPA, komponen modular)
- **Tailwind CSS** (utility-first styling)
- **Framer Motion** (animasi & transisi)
- **React Router DOM** (navigasi halaman)
- **qrcode.react** (QR Code generator)
- **Custom Hooks** (`useCountdown`)


## 🚀 Fitur Utama

### 🕵️ Mission Briefing & Form
- Intro animasi video dengan efek green screen.
- Form input: nama target, tanggal lahir, pilih karakter pengantar.

### 📅 Character Roster & Search
- Grid avatar karakter, search bar real-time.
- Pilihan karakter dari berbagai universe (Gojo, Levi, Eren, Leon, Caleb, dll).

### ⏱️ Countdown Real-Time
- Hitung mundur presisi (hari, jam, menit, detik).
- Fase status: Calm, Intense, Critical, Imminent.
- Visual dinamis sesuai karakter.

### 📱 QR Code & Share
- Generate QR Code unik untuk setiap countdown.
- Modal share dengan copy link otomatis.

### 🎨 UI/UX
- Tema Persona 5: font Bangers, efek comic, animasi, loading screen video, toast notifikasi custom.


## 📁 Struktur Folder (Ringkas)

```text
hoshi-day.io/
├── public/
│   ├── avatar/      # Gambar karakter utama
│   ├── chibi/       # Gambar chibi karakter
│   ├── voices/      # (Kosong, untuk future voice asset)
│   └── screenshot/  # Screenshot aplikasi
├── src/
│   ├── components/
│   │   ├── features/  # QRCodeModal
│   │   ├── layout/    # Layout utama
│   │   └── ui/        # Komponen UI: Button, SearchBar, Loader, Toast, DatePicker, Footer
│   ├── data/          # characters.js (database karakter)
│   ├── hooks/         # useCountdown
│   ├── pages/         # Home, CharacterRoster, Countdown
│   ├── services/      # CountdownService (localStorage)
│   ├── utils/         # dateHelpers, dateUtils
│   └── App.js, index.js/css
└── package.json
```


## ⚙️ Instalasi & Setup

1. **Clone repository & install dependensi**
    ```bash
    git clone https://github.com/username/hoshi-day.io.git
    cd hoshi-day.io
    pnpm install # atau npm install
    ```
2. **Jalankan mode development**
    ```bash
    pnpm start # atau npm start
    ```
3. Buka di browser: `http://localhost:3000`


## 🤝 Kontribusi

Ingin menambah karakter, fitur, atau memperbaiki bug?
1. Fork repo ini
2. Tambahkan karakter di `src/data/characters.js` & gambar di `public/avatar/`
3. Pull Request


## 📄 Lisensi
MIT License

---

*Hak cipta sepenuhnya milik pengembang Kanjirouu.*
