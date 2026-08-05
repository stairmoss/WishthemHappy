// Wish Storage — preset wishes only, no localStorage persistence for user-created cards.
// User cards are generated entirely through encoded share URLs.

const SAMPLE_PHOTOS = [
  'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=300&q=80',
  'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=300&q=80',
  'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=300&q=80'
];

const PRESET_WISHES = [
  {
    id: 'mom',
    recipientName: 'Mom',
    age: '50',
    senderName: 'Your Loving Family',
    message: 'Happy Birthday, Mom! Thank you for always being our guiding light, our biggest supporter, and the warmest heart in our lives. We love you more than words can say. May this year bring you as much happiness as you bring to everyone else.',
    theme: 'pastel',
    mascotAction: 'celebrate',
    stickers: ['cake', 'balloon', 'gift', 'star'],
    polaroidPhotos: [SAMPLE_PHOTOS[0], SAMPLE_PHOTOS[1]],
    polaroidCaptions: ['Best Mom Ever!', 'Birthday Cheers!'],
    createdAt: new Date().toISOString()
  },
  {
    id: 'dad-60th',
    recipientName: 'Dad',
    age: '60',
    senderName: 'Your Kids',
    message: "Happy 60th Birthday, Dad! Thank you for the endless support, the quiet strength, and all the wisdom you've shared with us. Here is to celebrating a truly legendary milestone. May your day be filled with relaxation and joy.",
    theme: 'vintage',
    mascotAction: 'wave',
    stickers: ['cake', 'balloon', 'gift', 'star'],
    polaroidPhotos: [SAMPLE_PHOTOS[0], SAMPLE_PHOTOS[2]],
    polaroidCaptions: ['Happy 60th, Dad!', 'Generations of wisdom.'],
    createdAt: new Date().toISOString()
  },
  {
    id: 'sister',
    recipientName: 'Sister',
    age: '18',
    senderName: 'Your Brother',
    message: 'Happy 18th Birthday to the most amazing sister! Thank you for the endless laughs, the late-night chats, and always being there for me. Wishing you a year ahead filled with love, joy, and success.',
    theme: 'royal',
    mascotAction: 'celebrate',
    stickers: ['cake', 'balloon', 'gift', 'star'],
    polaroidPhotos: [SAMPLE_PHOTOS[1]],
    polaroidCaptions: ['Sweet 18!'],
    createdAt: new Date().toISOString()
  },
  {
    id: 'brother',
    recipientName: 'Brother',
    age: '21',
    senderName: 'Your Sister',
    message: "Happy 21st Birthday to my awesome brother! Cheers to another year of adventures, laughter, and epic gaming sessions. You've always got my back, and I hope your day is as legendary as you are.",
    theme: 'neon',
    mascotAction: 'dance',
    stickers: ['cake', 'balloon', 'gift', 'star'],
    polaroidPhotos: [SAMPLE_PHOTOS[2]],
    polaroidCaptions: ['Cheers to 21!'],
    createdAt: new Date().toISOString()
  },
  {
    id: 'best-friend',
    recipientName: 'Best Friend',
    age: '25',
    senderName: 'Your Buddy',
    message: 'Happy Birthday to my best friend! Thank you for always being there, through every laugh, adventure, and late-night conversation. Cheers to another year of making unforgettable memories together!',
    theme: 'pastel',
    mascotAction: 'celebrate',
    stickers: ['cake', 'balloon', 'gift', 'star'],
    polaroidPhotos: [SAMPLE_PHOTOS[0], SAMPLE_PHOTOS[1], SAMPLE_PHOTOS[2]],
    polaroidCaptions: ['Partners in crime!', 'Fun times!', 'Forever Friends!'],
    createdAt: new Date().toISOString()
  }
];

// No-op save — cards are NOT stored to browser database/localStorage, only shared via URL
export const saveWish = (_wishData) => {
  return null;
};

// Returns the ready-made preset wishes for display in the dashboard and home page
export const getSavedWishes = () => PRESET_WISHES;

// Lookup a wish by its slug/id
export const getWishBySlug = (slug) => {
  return PRESET_WISHES.find(w => w.id === slug) || null;
};
