// Aurora Master Asset Registry & Helper Utility

export const ASSET_REGISTRY = [
  // Textures & Backdrops
  { id: 'paper_texture', name: 'Paper Texture', category: 'textures', format: 'JPG/PNG', transparent: false, source: 'AmbientCG', description: 'Base parchment background' },
  { id: 'vintage_paper', name: 'Vintage Paper', category: 'textures', format: 'PNG', transparent: false, source: 'Freepik', description: 'Scrapbook pages backdrop' },
  { id: 'old_notebook_paper', name: 'Old Notebook Paper', category: 'textures', format: 'PNG', transparent: false, source: 'Freepik', description: 'Diary theme ruled pages' },
  { id: 'watercolor_paper', name: 'Watercolor Paper', category: 'textures', format: 'JPG', transparent: false, source: 'AmbientCG', description: 'Soft painted background blend' },

  // Overlays & Atmosphere
  { id: 'film_grain', name: 'Film Grain', category: 'overlays', format: 'PNG', transparent: true, source: 'ProductionCrate', description: 'Cinematic film texture overlay' },
  { id: 'dust_overlay', name: 'Dust Overlay', category: 'overlays', format: 'PNG', transparent: true, source: 'ProductionCrate', description: 'Floating vintage dust particles' },
  { id: 'light_leak', name: 'Light Leak', category: 'overlays', format: 'MP4/PNG', transparent: true, source: 'Mixkit', description: 'Cinematic camera lens transition' },
  { id: 'bokeh_overlay', name: 'Bokeh Overlay', category: 'overlays', format: 'MP4', transparent: true, source: 'Mixkit', description: 'Dreamy glowing circle highlights' },
  { id: 'smoke_overlay', name: 'Smoke Overlay', category: 'overlays', format: 'MP4', transparent: true, source: 'ProductionCrate', description: 'Soft scene transition fog' },

  // Floating Particles & Animations
  { id: 'sparkle_overlay', name: 'Sparkle Overlay', category: 'particles', format: 'PNG/Lottie', transparent: true, source: 'LottieFiles', description: 'Magical sparkle burst' },
  { id: 'fireflies', name: 'Fireflies', category: 'particles', format: 'Lottie/SVG', transparent: true, source: 'LottieFiles', description: 'Floating night sky bioluminescence' },
  { id: 'butterflies', name: 'Butterflies', category: 'particles', format: 'SVG/Lottie', transparent: true, source: 'SVG Repo', description: 'Floating butterfly motion' },
  { id: 'birds', name: 'Birds', category: 'particles', format: 'SVG', transparent: true, source: 'SVG Repo', description: 'Distant flock flight path' },
  { id: 'clouds', name: 'Clouds', category: 'particles', format: 'PNG/SVG', transparent: true, source: 'SVG Repo', description: 'Drifting painted cloud edges' },
  { id: 'moon', name: 'Moon', category: 'decorations', format: 'SVG', transparent: true, source: 'SVG Repo', description: 'Night theme crescent moon' },
  { id: 'stars', name: 'Stars', category: 'decorations', format: 'SVG', transparent: true, source: 'SVG Repo', description: 'Night sky constellation points' },
  { id: 'sun', name: 'Sun', category: 'decorations', format: 'SVG', transparent: true, source: 'SVG Repo', description: 'Morning theme warm glow' },
  { id: 'sakura_petals', name: 'Sakura Petals', category: 'particles', format: 'PNG', transparent: true, source: 'Freepik', description: 'Drifting cherry blossom petals' },
  { id: 'rose_petals', name: 'Rose Petals', category: 'particles', format: 'PNG', transparent: true, source: 'Freepik', description: 'Floating romantic petals' },
  { id: 'leaves', name: 'Leaves', category: 'particles', format: 'PNG', transparent: true, source: 'PNGWing', description: 'Falling autumn leaves' },
  { id: 'flowers', name: 'Flowers', category: 'decorations', format: 'PNG/SVG', transparent: true, source: 'Freepik', description: 'Pressed floral corner accents' },
  { id: 'vines', name: 'Vines', category: 'decorations', format: 'PNG', transparent: true, source: 'Freepik', description: 'Frame border greenery' },

  // Celebrations & Birthday Elements
  { id: 'hearts', name: 'Hearts', category: 'decorations', format: 'SVG/Lottie', transparent: true, source: 'LottieFiles', description: 'Pulsing heart badges' },
  { id: 'balloons', name: 'Balloons', category: 'decorations', format: 'PNG/Lottie', transparent: true, source: 'Freepik', description: 'Floating party balloons' },
  { id: 'confetti', name: 'Confetti', category: 'particles', format: 'Lottie', transparent: true, source: 'LottieFiles', description: 'Celebration particle burst' },
  { id: 'gift_box', name: 'Gift Box', category: 'decorations', format: 'PNG/GLB', transparent: true, source: 'Poly Pizza', description: '3D interactive gift box' },
  { id: 'cake', name: 'Cake', category: 'decorations', format: 'GLB/PNG', transparent: true, source: 'Poly Pizza', description: '3D birthday cake with candles' },
  { id: 'candles', name: 'Candles', category: 'decorations', format: 'PNG', transparent: true, source: 'Freepik', description: 'Flickering candle flame' },
  { id: 'fireworks', name: 'Fireworks', category: 'particles', format: 'MP4/Lottie', transparent: true, source: 'LottieFiles', description: 'Grand finale sky bursts' },

  // Frames & Photo Layouts
  { id: 'polaroid_frames', name: 'Polaroid Frames', category: 'frames', format: 'PNG', transparent: true, source: 'Freepik', description: 'Instant polaroid borders' },
  { id: 'film_frames', name: 'Film Frames', category: 'frames', format: 'PNG', transparent: true, source: 'Freepik', description: '35mm film roll perforations' },
  { id: 'magazine_frames', name: 'Magazine Frames', category: 'frames', format: 'PNG', transparent: true, source: 'Freepik', description: 'Editorial fashion layout grid' },
  { id: 'museum_frames', name: 'Museum Frames', category: 'frames', format: 'PNG', transparent: true, source: 'Freepik', description: 'Carved gold gallery frames' },
  { id: 'wooden_frames', name: 'Wooden Frames', category: 'frames', format: 'PNG', transparent: true, source: 'Freepik', description: 'Rustic timber picture borders' },

  // Scrapbook & Journal Elements
  { id: 'washi_tape', name: 'Washi Tape', category: 'stickers', format: 'PNG', transparent: true, source: 'Freepik', description: 'Textured masking tape strips' },
  { id: 'paper_clips', name: 'Paper Clips', category: 'stickers', format: 'PNG', transparent: true, source: 'Freepik', description: 'Metallic photo clips' },
  { id: 'binder_clips', name: 'Binder Clips', category: 'stickers', format: 'PNG', transparent: true, source: 'Freepik', description: 'Journal page clips' },
  { id: 'thumb_pins', name: 'Thumb Pins', category: 'stickers', format: 'PNG', transparent: true, source: 'PNGWing', description: 'Board push pins' },
  { id: 'stickers', name: 'Stickers', category: 'stickers', format: 'PNG', transparent: true, source: 'Freepik', description: 'Doodle stamps & illustrations' },
  { id: 'wax_seal', name: 'Wax Seal', category: 'stickers', format: 'PNG', transparent: true, source: 'Freepik', description: 'Vintage red wax seal stamp' },
  { id: 'envelope', name: 'Envelope', category: 'stickers', format: 'PNG', transparent: true, source: 'Freepik', description: 'Folded paper secret letter' },
  { id: 'letter_paper', name: 'Letter Paper', category: 'textures', format: 'PNG', transparent: false, source: 'Freepik', description: 'Handwritten letter parchment' },
  { id: 'notebook', name: 'Notebook', category: 'textures', format: 'PNG', transparent: true, source: 'Freepik', description: 'Spiral bound journal book' },

  // Distresses & Stains
  { id: 'coffee_stains', name: 'Coffee Stains', category: 'overlays', format: 'PNG', transparent: true, source: 'PNGWing', description: 'Circular coffee mug rings' },
  { id: 'ink_splashes', name: 'Ink Splashes', category: 'overlays', format: 'PNG', transparent: true, source: 'Freepik', description: 'Artistic splatter drops' },
  { id: 'torn_paper', name: 'Torn Paper', category: 'overlays', format: 'PNG', transparent: true, source: 'Freepik', description: 'Ripped paper edge dividers' },
  { id: 'paint_brush_strokes', name: 'Paint Brush Strokes', category: 'overlays', format: 'PNG', transparent: true, source: 'Freepik', description: 'Acrylic stroke section dividers' },

  // Icons & Nostalgia
  { id: 'camera_icon', name: 'Camera Icon', category: 'icons', format: 'SVG', transparent: true, source: 'Lucide', description: 'Gallery camera icon' },
  { id: 'music_notes', name: 'Music Notes', category: 'icons', format: 'SVG', transparent: true, source: 'SVG Repo', description: 'Floating melody notes' },
  { id: 'vinyl_record', name: 'Vinyl Record', category: 'icons', format: 'PNG', transparent: true, source: 'Freepik', description: 'Spinning retro LP disc' },
  { id: 'cassette', name: 'Cassette Tape', category: 'icons', format: 'PNG', transparent: true, source: 'Freepik', description: '80s mixtape cassette' },
  { id: 'cd_disc', name: 'CD Disc', category: 'icons', format: 'PNG', transparent: true, source: 'Freepik', description: 'Y2K holographic CD' },
  { id: 'vhs_tape', name: 'VHS Tape', category: 'icons', format: 'PNG', transparent: true, source: 'Freepik', description: 'Retro video tape' },
  { id: 'typewriter', name: 'Typewriter', category: 'icons', format: 'PNG', transparent: true, source: 'Freepik', description: 'Vintage typing machine' },
  { id: 'compass', name: 'Compass', category: 'icons', format: 'SVG', transparent: true, source: 'SVG Repo', description: 'Navigation compass' },
  { id: 'airplane', name: 'Airplane', category: 'icons', format: 'SVG', transparent: true, source: 'SVG Repo', description: 'Paper plane travel vector' },
  { id: 'map', name: 'Map', category: 'textures', format: 'PNG', transparent: false, source: 'Freepik', description: 'Vintage treasure map' },
  { id: 'clock', name: 'Clock', category: 'icons', format: 'SVG', transparent: true, source: 'SVG Repo', description: 'Timeline clock dial' },
  { id: 'calendar', name: 'Calendar', category: 'icons', format: 'SVG', transparent: true, source: 'Lucide', description: 'Birthday date calendar icon' },
  { id: 'ribbon', name: 'Ribbon', category: 'stickers', format: 'PNG', transparent: true, source: 'Freepik', description: 'Satin bookmark ribbon' },
  { id: 'bow', name: 'Bow', category: 'stickers', format: 'PNG', transparent: true, source: 'Freepik', description: 'Gift wrapping bow' },

  // Audio Soundscapes & Effects
  { id: 'ambient_music', name: 'Ambient Music', category: 'audio', format: 'MP3', transparent: null, source: 'Pixabay Music', description: 'Calm background music' },
  { id: 'piano_music', name: 'Piano Music', category: 'audio', format: 'MP3', transparent: null, source: 'Pixabay Music', description: 'Emotional solo piano' },
  { id: 'lofi_music', name: 'Lofi Music', category: 'audio', format: 'MP3', transparent: null, source: 'Pixabay Music', description: 'Relaxed chill beats' },
  { id: 'birds_sound', name: 'Birds Sound', category: 'audio', format: 'MP3', transparent: null, source: 'Freesound', description: 'Morning nature birdsong' },
  { id: 'rain_sound', name: 'Rain Sound', category: 'audio', format: 'MP3', transparent: null, source: 'Freesound', description: 'Cozy rain atmosphere' },
  { id: 'camera_click', name: 'Camera Click', category: 'audio', format: 'MP3', transparent: null, source: 'Freesound', description: 'Shutter click UI sound' },
  { id: 'page_flip', name: 'Page Flip', category: 'audio', format: 'MP3', transparent: null, source: 'Freesound', description: 'Paper page turning sound' },
  { id: 'envelope_open', name: 'Envelope Open', category: 'audio', format: 'MP3', transparent: null, source: 'Freesound', description: 'Letter unsealing sound' },
  { id: 'typing_sound', name: 'Typing Sound', category: 'audio', format: 'MP3', transparent: null, source: 'Freesound', description: 'Typewriter key clack' },
  { id: 'button_click', name: 'Button Click', category: 'audio', format: 'MP3', transparent: null, source: 'Freesound', description: 'Tactile UI click sound' },

  // 3D Objects (GLB / Three.js)
  { id: 'gift_box_3d', name: 'Gift Box 3D', category: 'models', format: 'GLB', transparent: true, source: 'Poly Pizza', description: '3D gift model' },
  { id: 'cake_3d', name: 'Cake 3D', category: 'models', format: 'GLB', transparent: true, source: 'Poly Pizza', description: '3D candle cake' },
  { id: 'bedroom_3d', name: 'Memory Room 3D', category: 'models', format: 'GLB', transparent: true, source: 'Sketchfab', description: 'Cozy interactive room' },
  { id: 'plant_3d', name: 'Plant 3D', category: 'models', format: 'GLB', transparent: true, source: 'Poly Pizza', description: 'Potted desk plant' },
  { id: 'lamp_3d', name: 'Lamp 3D', category: 'models', format: 'GLB', transparent: true, source: 'Poly Pizza', description: 'Warm ambient desk lamp' },
  { id: 'chair_3d', name: 'Chair 3D', category: 'models', format: 'GLB', transparent: true, source: 'Poly Pizza', description: 'Cozy armchair' },
  { id: 'books_3d', name: 'Books 3D', category: 'models', format: 'GLB', transparent: true, source: 'Poly Pizza', description: 'Stack of vintage books' },
  { id: 'teddy_bear_3d', name: 'Teddy Bear 3D', category: 'models', format: 'GLB', transparent: true, source: 'Sketchfab', description: 'Nostalgic teddy bear' }
];

export const getAssetsByCategory = (category) => {
  return ASSET_REGISTRY.filter(a => a.category === category);
};
