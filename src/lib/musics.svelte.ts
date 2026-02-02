// src/lib/player.svelte.ts
import { browser } from '$app/environment';

export type Track = {
	id: string;
	title: string;
	artist: string;
	url: string;
	cover?: string;
	// Agrega aquí cualquier otra propiedad que necesites (album, duration, etc.)
};

class MusicPlayer {
	// --- ESTADO REACTIVO (RUNES) ---
	tracks = $state<Track[]>([]);
	currentIndex = $state(0);
	isPlaying = $state(false);
	currentTime = $state(0);
	duration = $state(0);
	
	// Estado privado para el volumen (backing field)
	#volume = $state(1);

	// Elemento de audio nativo (puede ser undefined en el servidor)
	#audio: HTMLAudioElement | undefined;

	constructor() {
		// Inicialización solo en el navegador
		if (browser) {
			this.#audio = new Audio();
			
			// Cargar volumen guardado o defecto al 100%
			const savedVol = localStorage.getItem('player_volume');
			if (savedVol) {
				this.#volume = parseFloat(savedVol);
			}
			
			// Aplicar volumen inicial
			this.#audio.volume = this.#volume;

			// Configurar eventos
			this.#initListeners();
		}
	}

	// --- CONFIGURACIÓN DE EVENTOS ---
	#initListeners() {
		if (!this.#audio) return;

		// Sincronizar tiempo actual
		this.#audio.ontimeupdate = () => {
			if (this.#audio) this.currentTime = this.#audio.currentTime;
		};

		// Sincronizar duración total cuando cargan los metadatos
		this.#audio.ondurationchange = () => {
			if (this.#audio) this.duration = this.#audio.duration || 0;
		};

		// Sincronizar estado real de reproducción
		this.#audio.onplay = () => this.isPlaying = true;
		this.#audio.onpause = () => this.isPlaying = false;

		// Manejar fin de canción
		this.#audio.onended = () => {
			this.next();
		};

		// Manejo de errores básico
		this.#audio.onerror = (e) => {
			console.error("Error en el reproductor:", e, this.#audio?.error);
			this.isPlaying = false;
		};
	}

	// --- GETTERS ---
	get currentTrack() {
		return this.tracks[this.currentIndex];
	}

	// Getter y Setter para Volumen (Mágicos)
	get volume() {
		return this.#volume;
	}

	set volume(value: number) {
		// Limitar entre 0 y 1
		const clamped = Math.max(0, Math.min(1, value));
		
		this.#volume = clamped; // Actualiza UI

		if (this.#audio) {
			this.#audio.volume = clamped; // Actualiza Audio real
		}

		if (browser) {
			localStorage.setItem('player_volume', clamped.toString()); // Guarda preferencia
		}
	}

	// --- ACCIONES ---

	setPlaylist(tracks: Track[]) {
		this.tracks = tracks;
        this.play(0)

		// Opcional: reiniciar índice si cambias de playlist completamente
		// this.currentIndex = 0; 
	}

	async play(index?: number) {
		if (!this.#audio) return;

		// Si pasamos un índice, cambiamos de canción
		if (typeof index === 'number') {
			this.currentIndex = index;
			this.#audio.src = this.currentTrack.url;
			this.#audio.currentTime = 0;
		} 
		// Si no hay source cargado pero tenemos tracks
		else if (!this.#audio.src && this.currentTrack) {
			this.#audio.src = this.currentTrack.url;
		}

		try {
			await this.#audio.play();
		} catch (error) {
			console.warn("Autoplay bloqueado o error de carga:", error);
			this.isPlaying = false;
		}
	}

	pause() {
		if (this.#audio) this.#audio.pause();
	}

	toggle() {
		if (this.isPlaying) this.pause();
		else this.play();
	}

	next() {
		if (!this.#audio) return;

		if (this.currentIndex < this.tracks.length - 1) {
			this.play(this.currentIndex + 1);
		} else {
			// Comportamiento al final de la lista: Loop o Stop
			// Aquí hacemos Stop y volvemos al principio
            this.play(0)
			// this.pause();
			// this.currentIndex = 0;
			// this.#audio.currentTime = 0;
		}
	}

	prev() {
		if (!this.#audio) return;

		// Si llevamos más de 3 segundos, reiniciar canción actual
		if (this.#audio.currentTime > 3) {
			this.#audio.currentTime = 0;
			return;
		}

		// Si no, ir a la anterior
		if (this.currentIndex > 0) {
			this.play(this.currentIndex - 1);
		} else {
            // Si es la primera, reiniciar
            this.#audio.currentTime = 0;
        }
	}

	seek(seconds: number) {
		if (this.#audio) {
			this.#audio.currentTime = seconds;
			this.currentTime = seconds;
		}
	}

	toggleMute() {
		if (this.volume > 0) {
			// Guardar el volumen actual en una propiedad temporal si quisieras restaurarlo exacto
			// Por simplicidad, aquí lo bajamos a 0
            // Nota: Podrías añadir una propiedad `lastVolume` si quieres UX avanzada
			this.volume = 0;
		} else {
			// Restaurar a un nivel audible (o al 100%)
			this.volume = 1;
		}
	}
}

// Exportamos la instancia única (Singleton)
export const player = new MusicPlayer();