import {createIcons, icons, VolumeX, Volume2} from 'lucide';

document.addEventListener('DOMContentLoaded', () => {
	/*-- Element | Cover --*/

	const cover = document.querySelector(".cover");
	const cover_sleeves = document.querySelector(".cover-sleeves");
	const cover_hint = document.querySelector(".cover-hint");

	/*-- Element | Card --*/

	const wedding_card = document.querySelector(".wedding-card");
	const card_content = document.querySelector(".card-content");
	const card_background = document.getElementById("card-background");
	const card_background_src = card_background?.dataset.src;
	const card_background_music = document.getElementById("background-music");
	const card_background_music_toggle = document.getElementById("music-toggle");

	/*-- Element | Card | Section --*/

	const section_main_card = document.querySelector(".section-main-card");
	const section_detail_countdown = new Date(
		"2026-10-31T00:00:00+08:00"
	).getTime();
	const photo_stack = document.getElementById("photo-stack");

	/*-- Element | Card | Modal --*/

	const modal_overlay = document.getElementById("modal-overlay");
	const modal_content = document.getElementById("modal-content");
	const modal_close = document.getElementById("modal-close");

	/*-- Card | Config --*/

	const card_config = {
		title: "Majlis Perkahwinan Putra & Laila",
		venue: "Asiana Grand Hall Petaling Jaya, Petaling Jaya, Selangor",
		date: "2026-10-31",
		start: "2026-10-31T11:00:00+08:00",
		end: "2026-10-31T15:30:00+08:00",
		latitude: 3.101402420208492,
		longitude: 101.64211506430325,
		contacts: {
			juliana: "60122124687",
			shah: "60129719772",
			amin: "60133454658",
			iffa: "60122124662",
		},
	};

	/*-- Cover --*/

	let cover_opened = false;
	let cover_hint_timer = null;

	/*-- Cover | Sleeve --*/

	/*
|--------------------------------------------------------------------------
| Cover Sleeve Configuration
|--------------------------------------------------------------------------
|
| The sleeve size is calculated ONCE when the invitation loads.
|
| This is intentional.
|
| Mobile browser address bars can change the visual viewport height while
| scrolling. We do NOT want that to resize the cover.
|
|--------------------------------------------------------------------------
*/

	let cover_scale = 1;
	let cover_design_width = 0;
	let cover_design_height = 0;

	/*
|--------------------------------------------------------------------------
| Initialise Cover Sleeves
|--------------------------------------------------------------------------
*/

	function initialiseCoverSleeves() {
		if (!cover_sleeves) {
			return;
		}

		const sleeves = cover_sleeves.querySelectorAll(".sleeve");

		if (!sleeves.length) {
			return;
		}

		let initialised = false;

		function calculateCover() {
			if (initialised) {
				return;
			}

			cover_design_width = 0;
			cover_design_height = 0;

			sleeves.forEach((sleeve) => {
				let media_width = 0;
				let media_height = 0;

				if (sleeve.tagName === "VIDEO") {
					media_width = sleeve.videoWidth;
					media_height = sleeve.videoHeight;
				} else {
					media_width = sleeve.naturalWidth;
					media_height = sleeve.naturalHeight;
				}

				if (!media_width || !media_height) {
					return;
				}

				cover_design_width += media_width;

				cover_design_height = Math.max(cover_design_height, media_height);
			});

			if (!cover_design_width || !cover_design_height) {
				return;
			}

			/*
		|--------------------------------------------------------------------------
		| Initial viewport
		|--------------------------------------------------------------------------
		*/

			const viewport_width = document.documentElement.clientWidth;

			const viewport_height = window.innerHeight;

			/*
		|--------------------------------------------------------------------------
		| Cover calculation
		|--------------------------------------------------------------------------
		*/

			const scale_by_width = viewport_width / cover_design_width;

			const scale_by_height = viewport_height / cover_design_height;

			cover_scale = Math.max(scale_by_width, scale_by_height);

			/*
		|--------------------------------------------------------------------------
		| Apply
		|--------------------------------------------------------------------------
		*/

			cover_sleeves.style.setProperty("--cover-scale", cover_scale);

			cover_sleeves.style.transform = `translate(-50%, -50%) scale(${cover_scale})`;

			initialised = true;
		}

		/*
	|--------------------------------------------------------------------------
	| Check media readiness
	|--------------------------------------------------------------------------
	*/

		let media_ready = true;

		sleeves.forEach((sleeve) => {
			if (sleeve.tagName === "VIDEO") {
				if (!sleeve.videoWidth || !sleeve.videoHeight) {
					media_ready = false;

					sleeve.addEventListener("loadedmetadata", calculateCover, {
						once: true,
					});
				}
			} else {
				if (!sleeve.complete || !sleeve.naturalWidth || !sleeve.naturalHeight) {
					media_ready = false;

					sleeve.addEventListener("load", calculateCover, { once: true });
				}
			}
		});

		/*
	|--------------------------------------------------------------------------
	| Calculate immediately if everything is ready
	|--------------------------------------------------------------------------
	*/

		if (media_ready) {
			calculateCover();
		}
	}

	/*
|--------------------------------------------------------------------------
| Initialise Once
|--------------------------------------------------------------------------
*/

	initialiseCoverSleeves();

	/*-- Cover | Hint --*/

	function showCoverHint() {
		if (cover_opened || !cover_hint) {
			return;
		}

		cover_hint.classList.add("visible");
	}

	cover_hint_timer = setTimeout(showCoverHint, 3000);

	/*-- Cover | Open --*/

	function openInvitation() {
		if (cover_opened) {
			return;
		}

		cover_opened = true;

		clearTimeout(cover_hint_timer);

		cover_hint.classList.remove("visible");
		document.body.classList.add("invitation-opening");
		cover.classList.add("opened");

		playBackgroundMusic();

		setTimeout(() => {
			document.body.classList.remove("invitation-opening");

			document.body.classList.add("invitation-opened");

			cover.hidden = true;
		}, 1500);
	}

	cover.addEventListener("click", openInvitation);

	/*-- Card | Dimensions --*/

	function getWeddingCardMediaDimensions() {
		if (!section_main_card) {
			return null;
		}

		let width = 0;
		let height = 0;

		if (section_main_card.tagName === "VIDEO") {
			width = section_main_card.videoWidth;
			height = section_main_card.videoHeight;
		} else {
			width = section_main_card.naturalWidth;
			height = section_main_card.naturalHeight;
		}

		if (!width || !height) {
			return null;
		}

		return {
			width,
			height,
		};
	}

	/*-- Card | Width --*/

	function initialiseWeddingCard() {
		if (!wedding_card) {
			return;
		}

		const viewportWidth = document.documentElement.clientWidth;

		/*
	|--------------------------------------------------------------------------
	| Mobile
	|--------------------------------------------------------------------------
	|
	| The wedding card follows the viewport width.
	|
	*/

		if (viewportWidth <= 768) {
			wedding_card.style.width = `${viewportWidth}px`;

			return;
		}

		/*
	|--------------------------------------------------------------------------
	| Desktop
	|--------------------------------------------------------------------------
	*/

		const media = getWeddingCardMediaDimensions();

		if (!media) {
			return;
		}

		const viewportHeight = window.innerHeight;

		const mediaRatio = media.width / media.height;

		const cardWidth = viewportHeight * mediaRatio;

		wedding_card.style.width = `${cardWidth}px`;
	}

	/*-- Card | Floating UI --*/

	function syncFloatingUIWidth() {
		if (!wedding_card) {
			return;
		}

		const cardWidth = wedding_card.getBoundingClientRect().width;

		if (!cardWidth) {
			return;
		}

		document.documentElement.style.setProperty(
			"--wedding-card-width",
			`${cardWidth}px`
		);
	}

	/*-- Card | Initialise --*/

	function initialiseCardDimensions() {
		initialiseWeddingCard();

		syncFloatingUIWidth();
	}

	initialiseCardDimensions();

	/*
|--------------------------------------------------------------------------
| Wait For Main Card Media
|--------------------------------------------------------------------------
*/

	if (section_main_card) {
		if (section_main_card.tagName === "VIDEO") {
			section_main_card.addEventListener(
				"loadedmetadata",
				initialiseCardDimensions,
				{ once: true }
			);
		} else if (!section_main_card.complete) {
			section_main_card.addEventListener("load", initialiseCardDimensions, {
				once: true,
			});
		}
	}

	/*
|--------------------------------------------------------------------------
| Resize
|--------------------------------------------------------------------------
|
| We recalculate the card width and floating UI position when the
| viewport changes.
|
*/

	window.addEventListener("resize", () => {
		initialiseCardDimensions();
	});

	/*-- Card | Background --*/

	/*
|--------------------------------------------------------------------------
| Background Video Configuration
|--------------------------------------------------------------------------
*/

	const BACKGROUND_TILE_OVERLAP = 2;

	/*
|--------------------------------------------------------------------------
| Create Background Video Tile
|--------------------------------------------------------------------------
*/

	function createBackgroundVideoTile(top, height) {
		const tile = document.createElement("div");

		tile.className = "card-background-tile";

		tile.style.top = `${top}px`;

		tile.style.height = `${height + BACKGROUND_TILE_OVERLAP}px`;

		const video = document.createElement("video");

		video.src = card_background_src;

		video.autoplay = true;

		video.loop = true;

		video.muted = true;

		video.playsInline = true;

		video.preload = "auto";

		video.setAttribute("aria-hidden", "true");

		tile.appendChild(video);

		card_background.appendChild(tile);

		video.play().catch(() => {
			/*
        | Browser may delay autoplay until interaction.
        */
		});

		return tile;
	}

	/*
|--------------------------------------------------------------------------
| Create Background Video Tiles
|--------------------------------------------------------------------------
*/

	function createBackgroundVideoTiles() {
		if (!card_content || !card_background || !card_background_src) {
			return;
		}

		/*
    |--------------------------------------------------------------------------
    | Clear Existing Tiles
    |--------------------------------------------------------------------------
    */

		card_background.innerHTML = "";

		/*
    |--------------------------------------------------------------------------
    | Determine Video Dimensions
    |--------------------------------------------------------------------------
    */

		const sourceVideo = document.createElement("video");

		sourceVideo.src = card_background_src;

		sourceVideo.preload = "metadata";

		sourceVideo.muted = true;

		sourceVideo.playsInline = true;

		sourceVideo.addEventListener("loadedmetadata", () => {
			const videoWidth = sourceVideo.videoWidth;

			const videoHeight = sourceVideo.videoHeight;

			if (!videoWidth || !videoHeight) {
				return;
			}

			/*
            |--------------------------------------------------------------------------
            | Card Dimensions
            |--------------------------------------------------------------------------
            */

			const cardWidth = card_content.clientWidth;

			const cardHeight = card_content.scrollHeight;

			/*
            |--------------------------------------------------------------------------
            | Calculate Tile Height
            |--------------------------------------------------------------------------
            |
            | Scale the video proportionally so that its width matches
            | the card width.
            |
            */

			const scale = cardWidth / videoWidth;

			const tileHeight = videoHeight * scale;

			/*
            |--------------------------------------------------------------------------
            | Calculate Tile Count
            |--------------------------------------------------------------------------
            */

			const tileCount = Math.ceil(cardHeight / tileHeight);

			/*
            |--------------------------------------------------------------------------
            | Create Tiles
            |--------------------------------------------------------------------------
            */

			for (let index = 0; index < tileCount; index++) {
				createBackgroundVideoTile(index * tileHeight, tileHeight);
			}
		});
	}

	/*
|--------------------------------------------------------------------------
| Initialise Background
|--------------------------------------------------------------------------
*/

	createBackgroundVideoTiles();

	/*-- Card | Background | Music --*/

	let musicPlaying = false;

	function setMusicIcon(playing) {
		card_background_music_toggle.innerHTML = playing
			? `<i data-lucide="volume-2"></i>`
			: `<i data-lucide="volume-x"></i>`;

		createIcons({
			icons: {
				VolumeX,
				Volume2,
			},
		});
	}

	function playBackgroundMusic() {
		card_background_music
			.play()
			.then(() => {
				musicPlaying = true;
				setMusicIcon(true);
			})
			.catch(() => {
				musicPlaying = false;
				setMusicIcon(false);
			});
	}

	function toggleBackgroundMusic() {
		if (musicPlaying) {
			card_background_music.pause();
			musicPlaying = false;
			setMusicIcon(false);

			return;
		}

		playBackgroundMusic();
	}

	card_background_music_toggle.addEventListener("click", toggleBackgroundMusic);

	/*-- Card | Countdown --*/

	const countdownDays = document.getElementById("countdown-days");
	const countdownHours = document.getElementById("countdown-hours");
	const countdownMinutes = document.getElementById("countdown-minutes");
	const countdownSeconds = document.getElementById("countdown-seconds");

	function updateCountdown() {
		if (
			!countdownDays ||
			!countdownHours ||
			!countdownMinutes ||
			!countdownSeconds
		) {
			return;
		}

		const now = Date.now();
		const difference = section_detail_countdown - now;

		if (difference <= 0) {
			countdownDays.textContent = "00";
			countdownHours.textContent = "00";
			countdownMinutes.textContent = "00";
			countdownSeconds.textContent = "00";

			return;
		}

		const days = Math.floor(difference / (1000 * 60 * 60 * 24));
		const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
		const minutes = Math.floor((difference / (1000 * 60)) % 60);
		const seconds = Math.floor((difference / 1000) % 60);

		countdownDays.textContent = String(days).padStart(2, "0");
		countdownHours.textContent = String(hours).padStart(2, "0");
		countdownMinutes.textContent = String(minutes).padStart(2, "0");
		countdownSeconds.textContent = String(seconds).padStart(2, "0");
	}

	updateCountdown();

	setInterval(updateCountdown, 1000);

	/*-- Card | Section | Gallery --*/

	function initialisePhotoStack() {
		if (!photo_stack) {
			return;
		}

		let images = [];

		try {
			images = JSON.parse(photo_stack.dataset.images || "[]");
		} catch (error) {
			console.error("Gallery images could not be loaded:", error);

			return;
		}

		if (!Array.isArray(images) || !images.length) {
			return;
		}

		/*
        |--------------------------------------------------------------------------
        | Create Photo Cards
        |--------------------------------------------------------------------------
        */

		const cards = [];

		images.forEach((src, index) => {
			if (!src) {
				return;
			}

			const card = document.createElement("div");

			card.className = "photo-card";

			const image = document.createElement("img");

			image.src = src;
			image.alt = `Galeri ${index + 1}`;
			image.loading = "lazy";
			image.draggable = false;

			card.appendChild(image);

			photo_stack.appendChild(card);

			cards.push(card);
		});

		if (!cards.length) {
			return;
		}

		/*
        |--------------------------------------------------------------------------
        | Stack Configuration
        |--------------------------------------------------------------------------
        */

		const stack_positions = [
			{
				rotation: -1,
				x: 0,
				y: 0,
			},
			{
				rotation: 6,
				x: 10,
				y: 3,
			},
			{
				rotation: -8,
				x: -10,
				y: 8,
			},
			{
				rotation: 5,
				x: 12,
				y: 11,
			},
			{
				rotation: -5,
				x: -12,
				y: 14,
			},
		];

		/*
        |--------------------------------------------------------------------------
        | Apply Stack Position
        |--------------------------------------------------------------------------
        */

		function updatePhotoStack() {
			cards.forEach((card, index) => {
				const position = stack_positions[index % stack_positions.length];

				const isFront = index === 0;

				card.style.setProperty("--rotation", `${position.rotation}deg`);

				card.style.setProperty("--offset-x", `${position.x}px`);

				card.style.setProperty("--offset-y", `${position.y}px`);

				card.style.setProperty("--stack-index", cards.length - index);

				card.classList.toggle("is-front", isFront);
			});
		}

		/*
        |--------------------------------------------------------------------------
        | Move Front Photo To Back
        |--------------------------------------------------------------------------
        */

		function cyclePhotoStack() {
			if (cards.length <= 1) {
				return;
			}

			const front = cards.shift();

			cards.push(front);

			updatePhotoStack();
		}

		/*
        |--------------------------------------------------------------------------
        | Click
        |--------------------------------------------------------------------------
        */

		photo_stack.addEventListener("click", (event) => {
			const front = cards[0];

			if (!front) {
				return;
			}

			/*
                | Only the current front photo
                | should respond to the click.
                */

			if (event.target === front || front.contains(event.target)) {
				cyclePhotoStack();
			}
		});

		/*
        |--------------------------------------------------------------------------
        | Initial Render
        |--------------------------------------------------------------------------
        */

		updatePhotoStack();
	}

	initialisePhotoStack();

	/*-- Card | Modal --*/

	const modal_templates = {
		calendar: `
            <div class="modal-header">
                <div class="modal-icon">
                    <i data-lucide="calendar-check-2"></i>
                </div>

                <h2 class="modal-title">
                    Kalendar
                </h2>

                <p class="modal-description">
                    Simpan tarikh majlis ke kalendar anda.
                </p>
            </div>

            <div class="modal-body">
                <div class="modal-info">
                    <div class="modal-info-item">
                        <div class="modal-info-title">
                            <i data-lucide="calendar-days"></i>
                        </div>

                        <strong>
                            Sabtu, 31 Oktober 2026
                        </strong>

                        <span>
                            28 Jamadil Awal 1448H
                        </span>
                    </div>

                    <div class="modal-info-item">
                        <div class="modal-info-title">
                            <i data-lucide="clock-3"></i>
                        </div>

                        <strong>
                            11:00 Pagi – 3:30 Petang
                        </strong>

                        <span>
                            Majlis Perkahwinan
                        </span>
                    </div>
                </div>
            </div>

            <div class="modal-actions">
                <button type="button" class="modal-button" data-action="google-calendar">
                    <i data-lucide="calendar-plus"></i>

                    <span>
                        Google Calendar
                    </span>
                </button>

                <button type="button" class="modal-button" data-action="apple-calendar">
                    <i data-lucide="calendar-plus"></i>

                    <span>
                        Apple Calendar
                    </span>
                </button>
            </div>
        `,

		contact: `
            <div class="modal-header">
                <div class="modal-icon">
                    <i data-lucide="phone-call"></i>
                </div>
                
                <h2 class="modal-title">
                    Hubungi
                </h2>

                <p class="modal-description">
                    Hubungi wakil keluarga sekiranya mempunyai
                    sebarang pertanyaan.
                </p>
            </div>

            <div class="modal-body">
                <div class="modal-info" data-phone="60122124687">
                    <div class="modal-info-item">
                        <div class="modal-info-title">
                            <i data-lucide="user"></i>
                        </div>

                        <strong>
                            012-2124 687
                        </strong>

                        <span>
                            Juliana
                        </span>
                    </div>

                    <div class="modal-actions">
                        <button type="button" class="modal-button" data-action="call">
                            <i data-lucide="phone"></i>

                            <span>
                                Call
                            </span>
                        </button>


                        <button type="button" class="modal-button modal-button-secondary" data-action="whatsapp">
                            <i data-lucide="message-circle"></i>

                            <span>
                                WhatsApp
                            </span>
                        </button>
                    </div>
                </div>

                <div class="modal-info" data-phone="60129719772">
                    <div class="modal-info-item">
                        <div class="modal-info-title">
                            <i data-lucide="user"></i>
                        </div>

                        <strong>
                            013-971 9772
                        </strong>

                        <span>
                            Shah
                        </span>
                    </div>

                    <div class="modal-actions">
                        <button type="button" class="modal-button" data-action="call">
                            <i data-lucide="phone"></i>

                            <span>
                                Call
                            </span>
                        </button>


                        <button type="button" class="modal-button modal-button-secondary" data-action="whatsapp">
                            <i data-lucide="message-circle"></i>

                            <span>
                                WhatsApp
                            </span>
                        </button>
                    </div>
                </div>

                <div class="modal-info" data-phone="60133454658">
                    <div class="modal-info-item">
                        <div class="modal-info-title">
                            <i data-lucide="user"></i>
                        </div>

                        <strong>
                            013-345 4658
                        </strong>

                        <span>
                            Amin
                        </span>
                    </div>

                    <div class="modal-actions">
                        <button type="button" class="modal-button" data-action="call">
                            <i data-lucide="phone"></i>

                            <span>
                                Call
                            </span>
                        </button>


                        <button type="button" class="modal-button modal-button-secondary" data-action="whatsapp">
                            <i data-lucide="message-circle"></i>

                            <span>
                                WhatsApp
                            </span>
                        </button>
                    </div>
                </div>

                <div class="modal-info" data-phone="60122124662">
                    <div class="modal-info-item">
                        <div class="modal-info-title">
                            <i data-lucide="user"></i>
                        </div>

                        <strong>
                            012-2124 662
                        </strong>

                        <span>
                            Iffa
                        </span>
                    </div>

                    <div class="modal-actions">
                        <button type="button" class="modal-button" data-action="call">
                            <i data-lucide="phone"></i>

                            <span>
                                Call
                            </span>
                        </button>


                        <button type="button" class="modal-button modal-button-secondary" data-action="whatsapp">
                            <i data-lucide="message-circle"></i>

                            <span>
                                WhatsApp
                            </span>
                        </button>
                    </div>
                </div>
            </div>
        `,

		location: `
            <div class="modal-header">
                <div class="modal-icon">
                    <i data-lucide="map-pinned"></i>
                </div>
                
                <h2 class="modal-title">
                    Lokasi
                </h2>

                <p class="modal-description">
                    Dapatkan arah ke lokasi majlis.
                </p>
            </div>

            <div class="modal-body">
                <div class="modal-info">
                    <div class="modal-info-item">
                        <div class="modal-info-title">
                            <i data-lucide="map-pin"></i>
                        </div>

                        <strong>
                            Asiana Grand Hall PJ
                        </strong>

                        <span>
                            Petaling Jaya, Selangor
                        </span>
                    </div>
                </div>
            </div>

            <div class="modal-actions">
                <button type="button" class="modal-button" data-action="google-maps">
                    <i data-lucide="map"></i>

                    <span>
                        Google Maps
                    </span>
                </button>

                <button type="button" class="modal-button modal-button-secondary" data-action="waze">
                    <i data-lucide="navigation"></i>

                    <span>
                        Waze
                    </span>
                </button>
            </div>
        `,

		rsvp: `
            <div class="modal-header">
                <div class="modal-icon">
                    <i data-lucide="mail-check"></i>
                </div>

                <h2 class="modal-title" id="modal-title">
                    Maklumat Kehadiran
                </h2>

                <p class="modal-description">
                    Sila maklumkan kehadiran anda ke majlis kami.
                </p>
            </div>

            <div class="modal-body">
                <form id="rsvp-form" novalidate>
                    <div class="row">
                        <div class="col-12">
                            <label class="form-control">
                                <div class="label">
                                    <span class="label-text">
                                        Nama
                                    </span>
                                </div>

                                <input type="text" class="form-input" id="rsvp-name" name="name" placeholder="Masukkan nama anda">

                                <div class="label">
                                    <span class="label-text-alt label-error" id="rsvp-name-error"></span>
                                </div>
                            </label>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-12">
                            <label class="form-control">
                                <div class="label">
                                    <span class="label-text">
                                        Kehadiran
                                    </span>
                                </div>

                                <select class="form-select" id="rsvp-attendance" name="attendance">
                                    <option selected disabled value="">Sila Pilih</option>
                                    <option value="Yes">Hadir</option>
                                    <option value="No">Tidak Hadir</option>
                                </select>

                                <div class="label">
                                    <span class="label-text-alt label-error" id="rsvp-attendance-error"></span>
                                </div>
                            </label>
                        </div>
                    </div>

                    <div class="dynamic-form-fields" id="rsvp-fields"></div>

                    <div class="label-error" id="rsvp-form-error"role="alert"></div>

                    <div class="modal-actions">
                        <button type="submit" class="modal-button" id="rsvp-submit">
                            <i data-lucide="send"></i>

                            <span>
                                Hantar RSVP
                            </span>
                        </button>
                    </div>
                </form>
            </div>
        `,

		"salam-kaut": `
            <div class="modal-header">
                <h2 class="modal-title">
                    Salam Kaut
                </h2>

                <p class="modal-description">
                    Sekiranya ingin memberikan tanda ingatan, boleh disalurkan melalui akaun berikut.
                </p>
            </div>

            <div class="modal-body">
                <div class="modal-info">
                    <div class="modal-info-item">
                        <div class="modal-info-title">
                            <i data-lucide="heart-handshake"></i>
                        </div>

                        <span>
                            <strong>
                                Nama Bank: 
                            </strong>
                            RHB
                        </span>

                        <span>
                            <strong>
                                Pemegang Akaun: 
                            </strong>
                            Lailatul Mashitah Binti Mohd Zaki
                        </span>

                        <span>
                            <strong>
                                No. Akaun: 
                            </strong>
                            16304200124860
                        </span>
                    </div>
                </div>
            </div>

            <button type="button" class="modal-button" data-action="copy-account" data-account="16304200124860">
                <i data-lucide="copy"></i>

                <span>
                    Salin No. Akaun
                </span>
            </button>
        `,

		live: `
            <div class="modal-header">
                <div class="modal-icon">
                    <i data-lucide="radio"></i>
                </div>

                <h2 class="modal-title">
                    Tonton Live
                </h2>

                <p class="modal-description">
                    Saksikan majlis kami secara langsung melalui media sosial.
                </p>

            </div>


            <button type="button" class="modal-button" data-action="social-media">
                <i data-lucide="external-link"></i>

                <span>
                    Tonton di Instagram
                </span>
            </button>
        `,

		guestbook: `
            <div class="modal-header">
                <div class="modal-icon">
                    <i data-lucide="message-square-heart"></i>
                </div>

                <h2 class="modal-title">
                    Berikan Ucapan
                </h2>

                <p class="modal-description">
                    Titipkan ucapan dan doa buat kami.
                </p>
            </div>

            <div class="modal-body">
                <form id="guestbook-form">
                    <div class="row">
                        <div class="col-12">
                            <label class="form-control">
                                <div class="label">
                                    <span class="label-text">
                                        Nama
                                    </span>
                                </div>

                                <input type="text" class="form-input" id="guestbook-name" name="name" placeholder="Masukkan nama anda">

                                <div class="label">
                                    <span class="label-text-alt label-error" id="guestbook-name-error"></span>
                                </div>
                            </label>
                        </div>

                        <div class="col-12">
                            <label class="form-control">
                                <div class="label">
                                    <span class="label-text">
                                        Ucapan
                                    </span>
                                </div>

                                <textarea class="form-textarea" id="guestbook-message" name="message" rows="5" placeholder="Tuliskan ucapan dan doa anda..."></textarea>

                                <div class="label">
                                    <span class="label-text-alt label-error" id="guestbook-message-error"></span>
                                </div>
                            </label>
                        </div>
                    </div>

                    <div class="label">
                        <span class="label-text-alt label-error" id="guestbook-form-error"></span>
                    </div>

                    <div class="modal-actions">
                        <button type="submit" class="modal-button" id="guestbook-submit">
                            <i data-lucide="send"></i>

                            <span>
                                Hantar Ucapan
                            </span>
                        </button>
                    </div>
                </form>
            </div>
        `,
	};

	function openModal(type) {
		const content = modal_templates[type];

		if (!content) {
			return;
		}

		modal_content.innerHTML = content;

		if (typeof Alpine !== "undefined") {
			Alpine.initTree(modal_content);
		}

		modal_overlay.classList.add("active");
		modal_overlay.setAttribute("aria-hidden", "false");

		document.body.classList.add("modal-open");

		createIcons({ icons });
		initialiseModal(type);

		requestAnimationFrame(() => {
			const firstInput = modal_content.querySelector(
				"input, select, textarea, button"
			);

			if (firstInput) {
				firstInput.focus();
			}
		});
	}

	function closeModal() {
		modal_overlay.classList.remove("active");
		modal_overlay.setAttribute("aria-hidden", "true");

		document.body.classList.remove("modal-open");
	}

	function initialiseModal(type) {
		if (type === "rsvp") {
			initialiseRSVP();
		}
		if (type === "guestbook") {
			initialiseGuestbook();
		}

		initialiseModalActions();
	}

	/* =========================================================
  RSVP
  ========================================================= */

	function initialiseRSVP() {
		/*
    |--------------------------------------------------------------------------
    | Elements
    |--------------------------------------------------------------------------
    */

		const form = document.getElementById("rsvp-form");

		const name = document.getElementById("rsvp-name");

		const attendance = document.getElementById("rsvp-attendance");

		const fields = document.getElementById("rsvp-fields");

		const nameError = document.getElementById("rsvp-name-error");

		const attendanceError = document.getElementById("rsvp-attendance-error");

		const formError = document.getElementById("rsvp-form-error");

		const submitButton = document.getElementById("rsvp-submit");

		/*
    |--------------------------------------------------------------------------
    | RSVP URL
    |--------------------------------------------------------------------------
    */

		const rsvpUrl = document
			.querySelector('meta[name="url-rsvp"]')
			?.getAttribute("content");

		/*
    |--------------------------------------------------------------------------
    | CSRF Token
    |--------------------------------------------------------------------------
    */

		const csrfToken = document
			.querySelector('meta[name="csrf-token"]')
			?.getAttribute("content");

		/*
    |--------------------------------------------------------------------------
    | Safety check
    |--------------------------------------------------------------------------
    */

		if (!form || !name || !attendance || !fields || !rsvpUrl || !csrfToken) {
			console.error("RSVP form could not be initialised.");

			return;
		}

		/*
    |--------------------------------------------------------------------------
    | Clear Errors
    |--------------------------------------------------------------------------
    */

		function clearErrors() {
			/*
        | Name
        */

			name.classList.remove("error");

			if (nameError) {
				nameError.textContent = "";
			}

			/*
        | Attendance
        */

			attendance.classList.remove("error");

			if (attendanceError) {
				attendanceError.textContent = "";
			}

			/*
        | Pax
        */

			const pax = document.getElementById("rsvp-pax");

			const paxError = document.getElementById("rsvp-pax-error");

			if (pax) {
				pax.classList.remove("error");
			}

			if (paxError) {
				paxError.textContent = "";
			}

			/*
        | General error
        */

			if (formError) {
				formError.textContent = "";
			}
		}

		/*
    |--------------------------------------------------------------------------
    | Display Validation Errors
    |--------------------------------------------------------------------------
    */

		function displayErrors(errors) {
			/*
        |--------------------------------------------------------------
        | Name
        |--------------------------------------------------------------
        */

			if (errors.name) {
				name.classList.add("error");

				if (nameError) {
					nameError.textContent = errors.name[0];
				}
			}

			/*
        |--------------------------------------------------------------
        | Attendance
        |--------------------------------------------------------------
        */

			if (errors.attendance) {
				attendance.classList.add("error");

				if (attendanceError) {
					attendanceError.textContent = errors.attendance[0];
				}
			}

			/*
        |--------------------------------------------------------------
        | Pax
        |--------------------------------------------------------------
        */

			if (errors.pax) {
				const pax = document.getElementById("rsvp-pax");

				const paxError = document.getElementById("rsvp-pax-error");

				if (pax) {
					pax.classList.add("error");
				}

				if (paxError) {
					paxError.textContent = errors.pax[0];
				}
			}

			/*
        |--------------------------------------------------------------
        | Focus first invalid field
        |--------------------------------------------------------------
        */

			if (errors.name) {
				name.focus();
			} else if (errors.attendance) {
				attendance.focus();
			} else if (errors.pax) {
				const pax = document.getElementById("rsvp-pax");

				if (pax) {
					pax.focus();
				}
			}
		}

		/*
    |--------------------------------------------------------------------------
    | Attendance Change
    |--------------------------------------------------------------------------
    */

		attendance.addEventListener("change", () => {
			/*
            | Clear attendance error
            */

			attendance.classList.remove("error");

			if (attendanceError) {
				attendanceError.textContent = "";
			}

			/*
            | Clear general form error
            */

			if (formError) {
				formError.textContent = "";
			}

			/*
            |--------------------------------------------------------------------------
            | Hadir
            |--------------------------------------------------------------------------
            */

			if (attendance.value === "Yes") {
				fields.innerHTML = `

                    <div class="row">

                        <div class="col-12">

                            <label class="form-control">

                                <div class="label">

                                    <span class="label-text">
                                        Bilangan Pax
                                    </span>

                                </div>


                                <input
                                    id="rsvp-pax"
                                    class="form-input"
                                    type="number"
                                    name="pax"
                                    min="1"
                                    placeholder="Contoh: 2"
                                    aria-describedby="rsvp-pax-error"
                                >


                                <div class="label">

                                    <span
                                        class="label-text-alt label-error"
                                        id="rsvp-pax-error"
                                    ></span>

                                </div>

                            </label>

                        </div>

                    </div>

                `;
			} else {
				/*
            |--------------------------------------------------------------------------
            | Tidak Hadir
            |--------------------------------------------------------------------------
            */
				/*
                | Remove Pax completely
                */

				fields.innerHTML = "";
			}

			/*
            |--------------------------------------------------------------------------
            | Re-render Lucide
            |--------------------------------------------------------------------------
            */

			createIcons({ icons });
		});

		/*
    |--------------------------------------------------------------------------
    | RSVP Submit
    |--------------------------------------------------------------------------
    */

		form.addEventListener("submit", async (event) => {
			event.preventDefault();

			/*
            |--------------------------------------------------------------------------
            | Clear previous errors
            |--------------------------------------------------------------------------
            */

			clearErrors();

			/*
            |--------------------------------------------------------------------------
            | Disable submit button
            |--------------------------------------------------------------------------
            */

			if (submitButton) {
				submitButton.disabled = true;

				submitButton.classList.add("loading");

				submitButton.innerHTML = `

                    <span class="d-loading d-loading-spinner"></span>

                    <span>
                        Menghantar...
                    </span>

                `;
			}

			/*
            |--------------------------------------------------------------------------
            | Form Data
            |--------------------------------------------------------------------------
            */

			const formData = new FormData(form);

			/*
            |--------------------------------------------------------------------------
            | AJAX Request
            |--------------------------------------------------------------------------
            */

			try {
				const response = await fetch(rsvpUrl, {
					method: "POST",

					headers: {
						"X-CSRF-TOKEN": csrfToken,

						Accept: "application/json",

						"X-Requested-With": "XMLHttpRequest",
					},

					body: formData,
				});

				/*
                |--------------------------------------------------------------------------
                | Validation Error
                |--------------------------------------------------------------------------
                */

				if (response.status === 422) {
					const data = await response.json();

					displayErrors(data.errors || {});

					return;
				}

				/*
                |--------------------------------------------------------------------------
                | Other HTTP Errors
                |--------------------------------------------------------------------------
                */

				if (!response.ok) {
					throw new Error(`HTTP ${response.status}`);
				}

				/*
                |--------------------------------------------------------------------------
                | Success
                |--------------------------------------------------------------------------
                */

				const data = await response.json();

				if (data.success) {
					showRSVPSuccess(data.message);
				}
			} catch (error) {
				console.error("RSVP submission failed:", error);

				if (formError) {
					formError.textContent =
						"Maaf, RSVP tidak dapat dihantar buat masa ini. Sila cuba lagi.";
				}
			} finally {
				/*
                |--------------------------------------------------------------------------
                | Restore submit button
                |--------------------------------------------------------------------------
                */

				if (submitButton && document.body.contains(submitButton)) {
					submitButton.disabled = false;

					submitButton.classList.remove("loading");

					submitButton.innerHTML = `

                        <i data-lucide="send"></i>

                        <span>
                            Hantar RSVP
                        </span>

                    `;

					createIcons({ icons });
				}
			}
		});
	}

	function showRSVPSuccess(message) {
		const modalContent = document.getElementById("modal-content");

		if (!modalContent) {
			return;
		}

		modalContent.innerHTML = `

        <div class="modal-header">

            <div class="modal-icon">
                <i data-lucide="circle-check"></i>
            </div>

            <h2 class="modal-title">
                RSVP Berjaya
            </h2>

            <p class="modal-description">
                ${message}
            </p>

        </div>


        <div class="modal-body">

            <div class="modal-info">

                <div class="modal-info-item">

                    <div class="modal-info-title">

                        <i data-lucide="heart"></i>

                    </div>

                    <span>
                        Terima kasih atas maklum balas
                        dan kesudian anda untuk hadir
                        ke majlis kami.
                    </span>

                </div>

            </div>

        </div>


        <div class="modal-actions">

            <button
                type="button"
                class="modal-button"
                id="rsvp-success-close"
            >

                <i data-lucide="check"></i>

                <span>
                    Tutup
                </span>

            </button>

        </div>

    `;

		/*
    |--------------------------------------------------------------------------
    | Re-render Lucide
    |--------------------------------------------------------------------------
    */

		createIcons({ icons });

		/*
    |--------------------------------------------------------------------------
    | Close button
    |--------------------------------------------------------------------------
    */

		const closeButton = document.getElementById("rsvp-success-close");

		if (closeButton) {
			closeButton.addEventListener("click", closeModal);
		}
	}

	/* =========================================================
  GUESTBOOK
  ========================================================= */

	function initialiseGuestbook() {
		/*
    |--------------------------------------------------------------------------
    | Elements
    |--------------------------------------------------------------------------
    */

		const form = document.getElementById("guestbook-form");

		const name = document.getElementById("guestbook-name");

		const message = document.getElementById("guestbook-message");

		const nameError = document.getElementById("guestbook-name-error");

		const messageError = document.getElementById("guestbook-message-error");

		const formError = document.getElementById("guestbook-form-error");

		const submitButton = document.getElementById("guestbook-submit");

		/*
    |--------------------------------------------------------------------------
    | Guestbook URL
    |--------------------------------------------------------------------------
    */

		const guestbookUrl = document
			.querySelector('meta[name="url-guestbook"]')
			?.getAttribute("content");

		/*
    |--------------------------------------------------------------------------
    | CSRF Token
    |--------------------------------------------------------------------------
    */

		const csrfToken = document
			.querySelector('meta[name="csrf-token"]')
			?.getAttribute("content");

		/*
    |--------------------------------------------------------------------------
    | Safety Check
    |--------------------------------------------------------------------------
    */

		if (!form || !name || !message || !guestbookUrl || !csrfToken) {
			console.error("Guestbook form could not be initialised.");

			return;
		}

		/*
    |--------------------------------------------------------------------------
    | Clear Errors
    |--------------------------------------------------------------------------
    */

		function clearErrors() {
			/*
        | Name
        */

			name.classList.remove("error");

			if (nameError) {
				nameError.textContent = "";
			}

			/*
        | Message
        */

			message.classList.remove("error");

			if (messageError) {
				messageError.textContent = "";
			}

			/*
        | General Error
        */

			if (formError) {
				formError.textContent = "";
			}
		}

		/*
    |--------------------------------------------------------------------------
    | Display Validation Errors
    |--------------------------------------------------------------------------
    */

		function displayErrors(errors) {
			/*
        |----------------------------------------------------------------------
        | Name
        |----------------------------------------------------------------------
        */

			if (errors.name) {
				name.classList.add("error");

				if (nameError) {
					nameError.textContent = errors.name[0];
				}
			}

			/*
        |----------------------------------------------------------------------
        | Message
        |----------------------------------------------------------------------
        */

			if (errors.message) {
				message.classList.add("error");

				if (messageError) {
					messageError.textContent = errors.message[0];
				}
			}

			/*
        |----------------------------------------------------------------------
        | Focus first invalid field
        |----------------------------------------------------------------------
        */

			if (errors.name) {
				name.focus();
			} else if (errors.message) {
				message.focus();
			}
		}

		/*
    |--------------------------------------------------------------------------
    | Clear Individual Error While Typing
    |--------------------------------------------------------------------------
    */

		name.addEventListener("input", () => {
			name.classList.remove("error");

			if (nameError) {
				nameError.textContent = "";
			}

			if (formError) {
				formError.textContent = "";
			}
		});

		message.addEventListener("input", () => {
			message.classList.remove("error");

			if (messageError) {
				messageError.textContent = "";
			}

			if (formError) {
				formError.textContent = "";
			}
		});

		/*
    |--------------------------------------------------------------------------
    | Guestbook Submit
    |--------------------------------------------------------------------------
    */

		form.addEventListener("submit", async (event) => {
			event.preventDefault();

			/*
            |------------------------------------------------------------------
            | Clear previous errors
            |------------------------------------------------------------------
            */

			clearErrors();

			/*
            |------------------------------------------------------------------
            | Disable submit button
            |------------------------------------------------------------------
            */

			if (submitButton) {
				submitButton.disabled = true;

				submitButton.classList.add("loading");

				submitButton.innerHTML = `

                    <span class="d-loading d-loading-spinner"></span>

                    <span>
                        Menghantar...
                    </span>

                `;
			}

			/*
            |------------------------------------------------------------------
            | Form Data
            |------------------------------------------------------------------
            */

			const formData = new FormData(form);

			/*
            |------------------------------------------------------------------
            | AJAX Request
            |------------------------------------------------------------------
            */

			try {
				const response = await fetch(guestbookUrl, {
					method: "POST",

					headers: {
						"X-CSRF-TOKEN": csrfToken,

						Accept: "application/json",

						"X-Requested-With": "XMLHttpRequest",
					},

					body: formData,
				});

				/*
                |------------------------------------------------------------------
                | Validation Error
                |------------------------------------------------------------------
                */

				if (response.status === 422) {
					const data = await response.json();

					displayErrors(data.errors || {});

					return;
				}

				/*
                |------------------------------------------------------------------
                | Other HTTP Errors
                |------------------------------------------------------------------
                */

				if (!response.ok) {
					throw new Error(`HTTP ${response.status}`);
				}

				/*
                |------------------------------------------------------------------
                | Success
                |------------------------------------------------------------------
                */

				const data = await response.json();

				if (data.success) {
					if (data.data) {
						addWishToCard(data.data);
					}

					showGuestbookSuccess(data.message);
				}
			} catch (error) {
				console.error("Guestbook submission failed:", error);

				if (formError) {
					formError.textContent =
						"Maaf, ucapan tidak dapat dihantar buat masa ini. Sila cuba lagi.";
				}
			} finally {
				/*
                |------------------------------------------------------------------
                | Restore submit button
                |------------------------------------------------------------------
                */

				if (submitButton && document.body.contains(submitButton)) {
					submitButton.disabled = false;

					submitButton.classList.remove("loading");

					submitButton.innerHTML = `

                        <i data-lucide="send"></i>

                        <span>
                            Hantar Ucapan
                        </span>

                    `;

					/*
                    |----------------------------------------------------------------
                    | Re-render Lucide
                    |----------------------------------------------------------------
                    */

					createIcons({ icons });
				}
			}
		});
	}

	function showGuestbookSuccess(message) {
		const modalContent = document.getElementById("modal-content");

		if (!modalContent) {
			return;
		}

		modalContent.innerHTML = `

        <div class="modal-header">

            <div class="modal-icon">
                <i data-lucide="circle-check"></i>
            </div>

            <h2 class="modal-title">
                Ucapan Berjaya
            </h2>

            <p class="modal-description">
                ${message}
            </p>

        </div>


        <div class="modal-body">

            <div class="modal-info">

                <div class="modal-info-item">

                    <div class="modal-info-title">

                        <i data-lucide="heart"></i>

                    </div>

                    <span>
                        Terima kasih atas ucapan dan
                        doa yang telah diberikan buat
                        kami.
                    </span>

                </div>

            </div>

        </div>


        <div class="modal-actions">

            <button
                type="button"
                class="modal-button"
                id="guestbook-success-close"
            >

                <i data-lucide="check"></i>

                <span>
                    Tutup
                </span>

            </button>

        </div>

    `;

		/*
    |--------------------------------------------------------------------------
    | Re-render Lucide
    |--------------------------------------------------------------------------
    */

		createIcons({ icons });

		/*
    |--------------------------------------------------------------------------
    | Close Button
    |--------------------------------------------------------------------------
    */

		const closeButton = document.getElementById("guestbook-success-close");

		if (closeButton) {
			closeButton.addEventListener("click", closeModal);
		}
	}

	function addWishToCard(wish) {
		const wishesList = document.getElementById("guestbook-list");

		if (!wishesList || !wish) {
			return;
		}

		/*
    |--------------------------------------------------------------------------
    | Create wish element
    |--------------------------------------------------------------------------
    */

		const wishElement = document.createElement("div");

		wishElement.className = "guestbook-entry";

		/*
    |--------------------------------------------------------------------------
    | Escape HTML
    |--------------------------------------------------------------------------
    |
    | Important:
    | The user's name/message comes from the server.
    | We should not insert it directly using innerHTML.
    |
    */

		const name = document.createElement("div");

		name.className = "guestbook-entry-name";

		name.textContent = wish.name;

		const message = document.createElement("div");

		message.className = "guestbook-entry-message";

		message.textContent = wish.message;

		/*
    |--------------------------------------------------------------------------
    | Build wish
    |--------------------------------------------------------------------------
    */

		wishElement.appendChild(name);

		wishElement.appendChild(message);

		/*
    |--------------------------------------------------------------------------
    | Add to top of list
    |--------------------------------------------------------------------------
    */

		wishesList.prepend(wishElement);
	}

	function initialiseModalActions() {
		const actions = modal_content.querySelectorAll("[data-action]");

		actions.forEach((action) => {
			action.addEventListener("click", () => {
				const actionType = action.dataset.action;

				switch (actionType) {
					case "google-calendar":
						addToGoogleCalendar();
						break;

					case "apple-calendar":
						addToAppleCalendar();
						break;

					case "call":
						callContact(action);
						break;

					case "whatsapp":
						whatsappContact(action);
						break;

					case "google-maps":
						openGoogleMaps();
						break;

					case "waze":
						openWaze();
						break;

					case "copy-account":
						copyBankAccount(action);
						break;

					case "social-media":
						openSocialMedia();
						break;
				}
			});
		});
	}

	function addToGoogleCalendar() {
		const title = encodeURIComponent("Majlis Perkahwinan Putra & Laila");
		const details = encodeURIComponent("Majlis Perkahwinan Putra & Laila");
		const location = encodeURIComponent(
			"Asiana Grand Hall Petaling Jaya, Petaling Jaya, Selangor"
		);
		const start = "20261031T030000Z";
		const end = "20261031T080000Z";
		const url =
			`https://calendar.google.com/calendar/render?action=TEMPLATE` +
			`&text=${title}` +
			`&dates=${start}/${end}` +
			`&details=${details}` +
			`&location=${location}`;

		window.open(url, "_blank");
	}

	function addToAppleCalendar() {
		const ics = `BEGIN:VCALENDAR
            VERSION:2.0
            PRODID:-//Putra & Laila//Wedding Invitation//EN
            BEGIN:VEVENT
            UID:putra-laila-wedding-20261031@eweddingcard.com
            DTSTAMP:20260827T000000Z
            DTSTART:20261031T030000Z
            DTEND:20261031T080000Z
            SUMMARY:Majlis Perkahwinan Putra & Laila
            LOCATION:Asiana Grand Hall Petaling Jaya\\, Petaling Jaya\\, Selangor
            DESCRIPTION:Majlis Perkahwinan Putra & Laila
            END:VEVENT
            END:VCALENDAR`;

		const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
		const url = URL.createObjectURL(blob);
		const link = document.createElement("a");

		link.href = url;
		link.download = "Putra-Laila-Wedding.ics";

		document.body.appendChild(link);

		link.click();

		document.body.removeChild(link);

		URL.revokeObjectURL(url);
	}

	function callContact(button) {
		const contact = button.closest(".modal-info");

		if (!contact) {
			return;
		}

		const phone = contact.dataset.phone;

		if (!phone) {
			return;
		}

		window.location.href = `tel:+${phone}`;
	}

	function whatsappContact(button) {
		const contact = button.closest(".modal-info");

		if (!contact) {
			return;
		}

		const phone = contact.dataset.phone;

		if (!phone) {
			return;
		}

		const message = encodeURIComponent(
			"Assalamualaikum, saya ingin bertanya mengenai majlis perkahwinan Putra & Laila."
		);

		window.open(`https://wa.me/${phone}?text=${message}`, "_blank");
	}

	function openGoogleMaps() {
		const destination = encodeURIComponent(
			"Asiana Grand Hall Petaling Jaya, Petaling Jaya, Selangor"
		);

		window.open(
			`https://www.google.com/maps/dir/?api=1&destination=${destination}`,
			"_blank"
		);
	}

	function openWaze() {
		const latitude = "5.123456";
		const longitude = "102.123456";

		window.open(`https://waze.com/ul/hw2838uq24`, "_blank");
	}

	function openSocialMedia() {
		window.open("https://www.instagram.com/YOUR_ACCOUNT", "_blank");
	}

	function copyBankAccount(button) {
		const account = button.dataset.account;

		if (!account) {
			return;
		}

		const accountNumber = account.trim();

		if (!accountNumber) {
			return;
		}

		navigator.clipboard
			.writeText(accountNumber)
			.then(() => {
				const originalHTML = button.innerHTML;

				button.innerHTML = `
                    <i data-lucide="check"></i>
                    <span>
                        Berjaya Disalin
                    </span>
                `;

				createIcons({ icons });

				setTimeout(() => {
					button.innerHTML = originalHTML;

					createIcons({ icons });
				}, 2000);
			})
			.catch(() => {
				alert("Tidak dapat menyalin nombor akaun.");
			});
	}

	document.querySelectorAll("[data-modal]").forEach((button) => {
		button.addEventListener("click", () => {
			openModal(button.dataset.modal);
		});
	});

	if (modal_close) {
		modal_close.addEventListener("click", closeModal);
	}

	if (modal_overlay) {
		modal_overlay.addEventListener("click", (event) => {
			if (event.target === modal_overlay) {
				closeModal();
			}
		});
	}

	document.addEventListener("keydown", (event) => {
		if (event.key === "Escape" && modal_overlay.classList.contains("active")) {
			closeModal();
		}
	});

	/*-- Card | Icons --*/

	createIcons({ icons, VolumeX, Volume2 });
});