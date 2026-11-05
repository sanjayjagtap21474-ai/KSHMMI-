import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Flower {
  id: string;
  name: string;
  description: string;
  discovered: boolean;
  discoveredAt?: Date;
}

interface Butterfly {
  id: string;
  name: string;
  description: string;
  discovered: boolean;
  discoveredAt?: Date;
}

interface HiddenObject {
  id: string;
  name: string;
  clue: string;
  discovered: boolean;
  discoveredAt?: Date;
}

interface Letter {
  id: string;
  title: string;
  message: string;
  discovered: boolean;
  discoveredAt?: Date;
}

interface Wish {
  id: string;
  message: string;
  response: string;
  createdAt: Date;
}

interface GameStore {
  // Collections
  flowers: Flower[];
  butterflies: Butterfly[];
  hiddenObjects: HiddenObject[];
  letters: Letter[];
  wishes: Wish[];

  // Puzzle progress
  puzzleCompleted: boolean;
  puzzleCompletedAt?: Date;

  // Game state
  soundEnabled: boolean;
  currentLocation: string | null;

  // Actions
  discoverFlower: (id: string) => void;
  discoverButterfly: (id: string) => void;
  discoverHiddenObject: (id: string) => void;
  discoverLetter: (id: string) => void;
  completePuzzle: () => void;
  addWish: (message: string, response: string) => void;
  deleteWish: (id: string) => void;
  toggleSound: () => void;
  setLocation: (location: string | null) => void;
  resetGame: () => void;
}

const initialFlowers: Flower[] = [
  { id: 'rose-1', name: 'Morning Blush', description: 'A delicate rose that catches the first light of dawn', discovered: false },
  { id: 'rose-2', name: 'Velvet Sunset', description: 'Deep crimson petals like the evening sky', discovered: false },
  { id: 'rose-3', name: 'Garden Whisper', description: 'Soft pink blooms that share secrets with the wind', discovered: false },
  { id: 'rose-4', name: 'Dewdrop Rose', description: 'Each petal holds a tiny world of morning dew', discovered: false },
  { id: 'rose-5', name: 'Eternal Bloom', description: 'A rose that seems to never fade from memory', discovered: false },
];

const initialButterflies: Butterfly[] = [
  { id: 'butterfly-1', name: 'Lavender Dream', description: 'Wings the color of twilight fields', discovered: false },
  { id: 'butterfly-2', name: 'Golden Dawn', description: 'Catches sunlight like captured starlight', discovered: false },
  { id: 'butterfly-3', name: 'Moonlight Dancer', description: 'Dances in the pale glow of evening', discovered: false },
  { id: 'butterfly-4', name: 'Pearl Wing', description: 'Elegant white wings with iridescent edges', discovered: false },
  { id: 'butterfly-5', name: 'Autumn Leaf', description: 'Warm orange like fallen leaves', discovered: false },
];

const initialHiddenObjects: HiddenObject[] = [
  { id: 'object-1', name: 'Ancient Key', clue: 'Something that opens doors to forgotten places', discovered: false },
  { id: 'object-2', name: 'Crystal Bottle', clue: 'A vessel that once held magic potions', discovered: false },
  { id: 'object-3', name: 'Weathered Book', clue: 'Pages filled with stories of old', discovered: false },
];

const initialLetters: Letter[] = [
  {
    id: 'letter-1',
    title: 'To the Garden Visitor',
    message: 'Dear friend,\n\nYou have found your way to this secret corner of the world. Every flower you discover, every butterfly you meet, they were waiting for you.\n\nThe garden remembers those who visit with an open heart.\n\nWith love,\nThe Garden',
    discovered: false,
  },
  {
    id: 'letter-2',
    title: 'A Hidden Note',
    message: 'The wishing well has heard many wishes over the years. Some are for love, some for peace, and some simply for a quiet moment in the sun.\n\nYour wish is safe here.',
    discovered: false,
  },
  {
    id: 'letter-3',
    title: 'From the Cottage',
    message: 'This little cottage has stood for many years. It has watched seasons change and flowers bloom. It remembers every visitor who took a moment to rest by its door.\n\nThank you for visiting.',
    discovered: false,
  },
];

const inspirationalResponses = [
  'Your wish has been planted in the garden of dreams.',
  'The flowers heard your wish and bloomed a little brighter.',
  'A butterfly carried your wish to the stars.',
  'The garden whispers: your wish is already becoming true.',
  'Your wish floats on the wind, finding its way to you.',
  'The wishing well received your wish with grace.',
  'Every flower sends you thanks for your beautiful wish.',
  'Your wish joins the countless others that have made this garden magical.',
];

export const useGameStore = create<GameStore>()(
  persist(
    (set) => ({
      flowers: initialFlowers,
      butterflies: initialButterflies,
      hiddenObjects: initialHiddenObjects,
      letters: initialLetters,
      wishes: [],
      puzzleCompleted: false,
      soundEnabled: true,
      currentLocation: null,

      discoverFlower: (id) =>
        set((state) => ({
          flowers: state.flowers.map((flower) =>
            flower.id === id && !flower.discovered
              ? { ...flower, discovered: true, discoveredAt: new Date() }
              : flower
          ),
        })),

      discoverButterfly: (id) =>
        set((state) => ({
          butterflies: state.butterflies.map((butterfly) =>
            butterfly.id === id && !butterfly.discovered
              ? { ...butterfly, discovered: true, discoveredAt: new Date() }
              : butterfly
          ),
        })),

      discoverHiddenObject: (id) =>
        set((state) => ({
          hiddenObjects: state.hiddenObjects.map((obj) =>
            obj.id === id && !obj.discovered
              ? { ...obj, discovered: true, discoveredAt: new Date() }
              : obj
          ),
        })),

      discoverLetter: (id) =>
        set((state) => ({
          letters: state.letters.map((letter) =>
            letter.id === id && !letter.discovered
              ? { ...letter, discovered: true, discoveredAt: new Date() }
              : letter
          ),
        })),

      completePuzzle: () =>
        set({
          puzzleCompleted: true,
          puzzleCompletedAt: new Date(),
        }),

      addWish: (message, response) =>
        set((state) => ({
          wishes: [
            ...state.wishes,
            {
              id: `wish-${Date.now()}`,
              message,
              response,
              createdAt: new Date(),
            },
          ],
        })),

      deleteWish: (id) =>
        set((state) => ({
          wishes: state.wishes.filter((wish) => wish.id !== id),
        })),

      toggleSound: () =>
        set((state) => ({ soundEnabled: !state.soundEnabled })),

      setLocation: (location) =>
        set({ currentLocation: location }),

      resetGame: () =>
        set({
          flowers: initialFlowers,
          butterflies: initialButterflies,
          hiddenObjects: initialHiddenObjects,
          letters: initialLetters,
          wishes: [],
          puzzleCompleted: false,
          puzzleCompletedAt: undefined,
          currentLocation: null,
        }),
    }),
    {
      name: 'kshmmi-secret-garden',
    }
  )
);
