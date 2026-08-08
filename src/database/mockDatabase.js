// Aurora Mock Database & Sample Stories

export const SAMPLE_STORIES = [
  {
    id: "elena-25th-birthday",
    slug: "elena-25th-birthday",
    meta: {
      recipientName: "Elena Rostova",
      senderName: "Lucas & Friends",
      birthdayDate: "2026-08-15",
      age: 25,
      relationship: "Best Friend",
      storyType: "SCRAPBOOK", // SCRAPBOOK, MUSEUM, MOVIE, WRAPPED, DIARY
      themeId: "SOFT_DREAMY", // SOFT_DREAMY, LAVENDER_MINT, COSMIC_STARLIGHT, VINTAGE_SEPIA, CYBER_NEON
      passcode: ""
    },
    audio: {
      backgroundMusicTitle: "Acoustic Sunset Serenade",
      backgroundMusicUrl: "https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=lofi-study-112191.mp3",
      volume: 0.5
    },
    chapters: [
      {
        id: "chap-1",
        type: "PROLOGUE",
        title: "For Someone Extraordinary",
        subtitle: "A digital keepsake crafted with memories, laughter, and endless warmth...",
        coverImage: "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=1200&q=80",
        quote: "Some people make the world brighter just by being in it."
      },
      {
        id: "chap-2",
        type: "TIMELINE",
        title: "The Timeline of Us",
        subtitle: "Stepping back through key chapters of your amazing life...",
        milestones: [
          {
            year: "2019",
            title: "First Met at the Summer Hackathon",
            description: "Spilled coffee on your notebook, but we ended up staying awake for 36 hours building our first app together.",
            image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80"
          },
          {
            year: "2021",
            title: "Spontaneous Coastal Road Trip",
            description: "Drove 600 miles with a broken radio, singing at the top of our lungs until sunrise.",
            image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=800&q=80"
          },
          {
            year: "2023",
            title: "Graduation & Dream Job Launch",
            description: "Watching you walk across that stage and take on the world with fearless ambition.",
            image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80"
          },
          {
            year: "2025",
            title: "Exploring Tokyo Alleyways",
            description: "Getting lost in Shinjuku, eating late-night ramen, and making memories that will last a lifetime.",
            image: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=800&q=80"
          }
        ]
      },
      {
        id: "chap-3",
        type: "MEDIA_VAULT",
        title: "The Memory Vault",
        subtitle: "Tap any polaroid to view the story behind the photo...",
        photos: [
          {
            url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
            caption: "That infectious smile at the beach bonfire.",
            date: "July 2024"
          },
          {
            url: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80",
            caption: "Spontaneous rooftop laughter.",
            date: "Autumn 2024"
          },
          {
            url: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80",
            caption: "Golden hour glow.",
            date: "Spring 2025"
          },
          {
            url: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=800&q=80",
            caption: "Always ready for the next adventure.",
            date: "Winter 2025"
          }
        ]
      },
      {
        id: "chap-4",
        type: "VOICE_NOTES",
        title: "Voices from the Heart",
        subtitle: "Audio notes and wishes recorded by those who cherish you most...",
        audioNotes: [
          {
            sender: "Mom & Dad",
            relation: "Parents",
            duration: "0:42",
            quote: "We are so proud of the radiant, caring person you have become.",
            audioUrl: "https://cdn.pixabay.com/download/audio/2022/03/15/audio_c8c8a81630.mp3?filename=soft-piano-10786.mp3"
          },
          {
            sender: "Lucas",
            relation: "Best Friend",
            duration: "1:15",
            quote: "Thank you for 7 years of laughter, late-night talks, and endless support.",
            audioUrl: "https://cdn.pixabay.com/download/audio/2022/03/15/audio_c8c8a81630.mp3?filename=soft-piano-10786.mp3"
          },
          {
            sender: "Maya & Sam",
            relation: "College Squad",
            duration: "0:58",
            quote: "Happy 25th! May this year bring endless magic and new horizons!",
            audioUrl: "https://cdn.pixabay.com/download/audio/2022/03/15/audio_c8c8a81630.mp3?filename=soft-piano-10786.mp3"
          }
        ]
      },
      {
        id: "chap-5",
        type: "HIDDEN_MEMORIES",
        title: "Secret Letters & Surprises",
        subtitle: "Tap each sealed envelope to unlock secret notes...",
        envelopes: [
          {
            title: "Open When You Need a Smile",
            content: "Remember the time we tried baking a 3-tier cake and ended up creating an edible leaning tower of Pisa? Never stop laughing at life!",
            icon: "Gift"
          },
          {
            title: "A Secret Wish For Your 25th",
            content: "May your 25th year bring you the courage to chase that big dream you've been quietly planning. We believe in you 100%!",
            icon: "Sparkles"
          },
          {
            title: "Favorite Quote About You",
            content: "'There are bright places, even in dark times. And if there aren't, you can be that bright place.' You are ours.",
            icon: "Heart"
          }
        ]
      },
      {
        id: "chap-6",
        type: "CLIMAX_REVEAL",
        headline: "HAPPY 25TH BIRTHDAY, ELENA!",
        subheadline: "Here is to another orbit around the sun filled with joy, health, and unforgettable moments.",
        confettiColors: ["#D96B43", "#D4A373", "#4A7C59", "#818CF8", "#F59E0B"],
        wishes: [
          { name: "Lucas", text: "Best birthday ever! Let's celebrate tonight!", time: "Just now" },
          { name: "Maya", text: "Happy 25th queen!! Love you so much!", time: "10m ago" },
          { name: "Uncle David", text: "Wishing you a wonderful year ahead!", time: "1h ago" }
        ]
      }
    ]
  }
];

export const getStoriesFromStorage = () => {
  const local = localStorage.getItem("aurora_stories");
  if (local) {
    try {
      return JSON.parse(local);
    } catch (e) {
      console.error(e);
    }
  }
  return SAMPLE_STORIES;
};

export const saveStoryToStorage = (newStory) => {
  const stories = getStoriesFromStorage();
  const index = stories.findIndex(s => s.id === newStory.id || s.slug === newStory.slug);
  if (index >= 0) {
    stories[index] = newStory;
  } else {
    stories.unshift(newStory);
  }
  localStorage.setItem("aurora_stories", JSON.stringify(stories));
  return newStory;
};

export const getStoryBySlug = (slug) => {
  const stories = getStoriesFromStorage();
  return stories.find(s => s.slug === slug || s.id === slug) || SAMPLE_STORIES[0];
};
