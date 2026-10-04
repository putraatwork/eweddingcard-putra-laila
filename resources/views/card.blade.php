<!DOCTYPE html>
<html lang="ms">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>Digital Invitation | Laila & Putra</title>

    <meta name="url-rsvp" content="{{ route('card.rsvp.store') }}">
    <meta name="url-guestbook" content="{{ route('card.guestbook.store') }}">

    @vite(['resources/css/card.css','resources/js/card.js'])
</head>

<body>
    <section class="cover">
        <div class="cover-sleeves">
            <img class="sleeve sleeve-left" src="{{ asset('assets/cards/laila-putra/image/cover/cover-left.png') }}">

            <img class="sleeve sleeve-right" src="{{ asset('assets/cards/laila-putra/image/cover/cover-right.png') }}">
        </div>

        <div class="cover-content">
            <div class="cover-hint">
                <i class="cover-hint-icon" data-lucide="mouse-pointer-click"></i>
    
                <span>
                    Sentuh skrin untuk masuk
                </span>
            </div>
        </div>
    </section>

    <div class="wedding-card">
        <main class="card-content">
            <div class="card-background" id="card-background" data-src="{{ asset('assets/cards/laila-putra/video/background.mp4') }}"></div>
            
            <div class="card-sections">
                {{-- Main --}}

                <section class="wedding-card-section section-main">
                    <video class="section-main-card" autoplay loop muted playsinline preload="auto">
                        <source src="{{ asset('assets/cards/laila-putra/video/main-invitation.mp4') }}" type="video/mp4">
                    </video>
                </section>

                {{-- Invitation --}}

                <section class="wedding-card-section section-invitation">
                    <div class="section-content">
                        <img class="invitation-bismillah" src="{{ asset('assets/cards/laila-putra/image/other/bismillah.png') }}">
                        
                        <p>
                            Dengan penuh kesyukuran dan rendah diri, kami
                        </p>

                        <div class="invitation-names">
                            <div class="invitation-name">
                                <p class="name">
                                    Mohd Zaki Bin Harun
                                </p>

                                <p class="relation">
                                    Bapa Pengantin Perempuan
                                </p>
                            </div>
                            
                            <div class="invitation-name">
                                <p class="name">
                                    &
                                </p>
                            </div>

                            <div class="invitation-name">
                                <p class="name">
                                    Zainab Binti Mat Ghani
                                </p>

                                <p class="relation">
                                    Ibu Pengantin Perempuan
                                </p>
                            </div>
                        </div>

                        <p>
                            Menjemput Tuan/Puan/Encik/Cik ke majlis perkahwinan anakanda kami
                        </p>

                        <div class="invitation-names">
                            <div class="invitation-name">
                                <p class="name">
                                    Lailatul Mashitah Binti Mohd Zaki
                                </p>

                                <p class="name">
                                    &
                                </p>

                                <p class="name">
                                    Putra Nor Hakimi Bin Jajiman
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {{-- Event Details --}}

                <section class="wedding-card-section section-details">
                    <div class="section-content">
                        <p class="section-title">
                            Maklumat Majlis
                        </p>

                        <div class="detail-item">
                            <i class="detail-icon" data-lucide="calendar-days"></i>

                            <div class="detail-text">
                                <p class="detail-main">
                                    Sabtu, 10 Oktober 2026
                                </p>

                                <p class="detail-sub">
                                    28 Rabiul Akhir 1448H
                                </p>
                            </div>
                        </div>

                        <div class="detail-item">
                            <i class="detail-icon" data-lucide="clock-3"></i>

                            <div class="detail-text">
                                <p class="detail-main">
                                    11:00 Pagi – 4:00 Petang
                                </p>
                            </div>
                        </div>

                        <div class="detail-item">
                            <i class="detail-icon" data-lucide="map-pin"></i>

                            <div class="detail-text">
                                <p class="detail-main">
                                    Kemasik, Terengganu
                                </p>
                            </div>
                        </div>

                        <div class="countdown-container">
                            <div id="countdown" class="countdown">
                                <div class="countdown-item">
                                    <span class="countdown-number" id="countdown-days">
                                        00
                                    </span>

                                    <span class="countdown-label">
                                        Hari
                                    </span>
                                </div>

                                <div class="countdown-separator">
                                    :
                                </div>

                                <div class="countdown-item">
                                    <span class="countdown-number" id="countdown-hours">
                                        00
                                    </span>

                                    <span class="countdown-label">
                                        Jam
                                    </span>
                                </div>

                                <div class="countdown-separator">
                                    :
                                </div>

                                <div class="countdown-item">
                                    <span class="countdown-number" id="countdown-minutes">
                                        00
                                    </span>

                                    <span class="countdown-label">
                                        Minit
                                    </span>
                                </div>

                                <div class="countdown-separator">
                                    :
                                </div>

                                <div class="countdown-item">
                                    <span class="countdown-number" id="countdown-seconds">
                                        00
                                    </span>

                                    <span class="countdown-label">
                                        Saat
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {{-- Doa --}}

                <section class="wedding-card-section section-doa">
                    <div class="section-content">
                        <img class="doa-bismillah" src="{{ asset('assets/cards/laila-putra/image/other/bismillah.png') }}">
                        
                        <p class="font-semibold">
                            Ya Allah Ya Rahim
                        </p>

                        <p>
                            Dari setinggi dan seluas kasih sayangMu,
                            Kau limpahkanlah rahmat juga keampunanMu kepada pengantin suami isteri ini,
                            dan berkatilah majlis yang diadakan dengan keberkatan dari permulaan hingga pengakhirannya.
                        </p>
                    </div>
                </section>

                {{-- Aturcara --}}

                <section class="wedding-card-section section-aturcara">
                    <div class="section-content">
                        <p class="section-title">
                            Aturcara Majlis
                        </p>

                        <div class="event-timeline">
                            <div class="timeline-item">
                                <div class="timeline-marker"></div>

                                <div class="timeline-content">
                                    <div class="timeline-time">
                                        11:00 Pagi
                                    </div>

                                    <div class="timeline-event">
                                        Ketibaan Tetamu
                                    </div>
                                </div>
                            </div>

                            <div class="timeline-item">
                                <div class="timeline-marker"></div>

                                <div class="timeline-content">
                                    <div class="timeline-time">
                                        12:00 Tengah Hari
                                    </div>

                                    <div class="timeline-event">
                                        Majlis Bermula
                                    </div>
                                </div>
                            </div>

                            <div class="timeline-item">
                                <div class="timeline-marker"></div>

                                <div class="timeline-content">
                                    <div class="timeline-time">
                                        2:00 Petang
                                    </div>

                                    <div class="timeline-event">
                                        Majlis Bersanding
                                    </div>
                                </div>
                            </div>

                            <div class="timeline-item">
                                <div class="timeline-marker"></div>

                                <div class="timeline-content">
                                    <div class="timeline-time">
                                        4:00 Petang
                                    </div>

                                    <div class="timeline-event">
                                        Majlis Bersurai
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {{-- RSVP --}}

                <section class="wedding-card-section section-rsvp">
                    <div class="section-content">
                        <p class="section-title">
                            Maklumat Kehadiran
                        </p>

                        <div class="section-note">
                            <div class="section-note-content">
                                <span>
                                    Sila maklumkan kehadiran melalui butang RSVP di bawah
                                </span>
                            </div>
                        </div>

                        <button type="button" class="section-button" data-modal="rsvp">
                            RSVP
                        </button>
                    </div>
                </section>

                {{-- Gallery --}}

                @php
                    $galleryImages = [
                        asset('assets/cards/laila-putra/image/gallery/image_1.jpeg'),
                        asset('assets/cards/laila-putra/image/gallery/image_2.jpeg'),
                        asset('assets/cards/laila-putra/image/gallery/image_3.jpeg'),
                    ];
                @endphp

                <section class="wedding-card-section section-gallery">
                    <div class="section-content">
                        <div
                            id="photo-stack"
                            class="photo-stack"
                            data-images="{{ json_encode($galleryImages) }}"
                        ></div>
                    </div>
                </section>

                {{-- Guestbook --}}

                <section class="wedding-card-section section-guestbook">
                    <div class="section-content">
                        <p class="section-title">
                            Ucapan Tetamu
                        </p>

                        <p>
                            Titipkan ucapan dan doa buat kami.
                        </p>

                        <div class="guestbook-list" id="guestbook-list">
                            @foreach ($guestbook as $entries)
                                <div class="guestbook-entry">
                                    <div class="guestbook-entry-name">
                                        {{ $entries->name }}
                                    </div>

                                    <div class="guestbook-entry-message">
                                        {{ $entries->message }}
                                    </div>
                                </div>
                            @endforeach
                        </div>

                        <button type="button" class="section-button" data-modal="guestbook">
                            Berikan Ucapan
                        </button>
                    </div>
                </section>

                {{-- Others --}}

                <section class="wedding-card-section section-others">
                    <div class="section-content">
                        <div class="section-note">
                            <div class="section-note-title">
                                NOTA
                            </div>

                            <div class="section-note-content">
                                <div class="section-note-item">
                                    <p class="section-note-item-title">Tema Pakaian:</p>
                                    
                                    <p class="section-note-item-description">Tradisional</p>
                                </div>
                            </div>
                        </div>

                        <button type="button" class="section-button" data-modal="live">
                            Tonton Live
                        </button>
                        
                        <p>
                            Terima kasih diatas kehadiran Tuan/Puan yang telah menyerikan majlis perkahwinan ini, 
                            semoga kita semua diberkati Allah SWT.
                        </p>
                    </div>
                </section>

                <section class="wedding-card-section">
                    <div class="section-content">
                    </div>
                </section>
            </div>
        </main>
    </div>

    {{-- Navigation --}}

    <nav class="navbar">
        <button type="button" data-modal="calendar">
            <i data-lucide="calendar-days"></i>
            <small>Kalendar</small>
        </button>
    
        <button type="button" data-modal="contact">
            <i data-lucide="phone"></i>
            <small>Hubungi</small>
        </button>
    
        <button type="button" data-modal="location">
            <i data-lucide="map-pin"></i>
            <small>Lokasi</small>
        </button>
    
        <button type="button" data-modal="rsvp">
            <i data-lucide="mail"></i>
            <small>RSVP</small>
        </button>
    
        <button type="button" data-modal="salam-kaut">
            <i data-lucide="heart-handshake"></i>
            <small>Salam Kaut</small>
        </button>
    </nav>

    {{-- Music --}}

    <button type="button" id="music-toggle">
        <i data-lucide="volume-off"></i>
    </button>

    <audio id="background-music" src="{{ asset('assets/cards/laila-putra/audio/background.mp3') }}" loop preload="auto"></audio>

    {{-- Modal --}}

    <div class="modal-overlay" id="modal-overlay">
        <div class="modal" role="dialog">
            <button type="button" class="modal-close" id="modal-close">
                <i data-lucide="x"></i>
            </button>

            <div id="modal-content"></div>
        </div>
    </div>
</body>
</html>