// All stock projects, images and testimonials below are DEMO content, not client work.
// Replace these records with approved client assets and verified statements before launch.
export const siteConfig = {
  name: "Dream Team Editors",
  shortName: "DTE",
  logo: "/media/dte-logo.jpg",
  tagline: "Built to be watched. Made to be remembered.",
  heroLines: ["WE CREATE CONTENT", "WORTH STOPPING FOR."],
  intro:
    "From the first frame to the final cut. Video, photography and content production for creators, brands and businesses worldwide.",
  location: "Punjab, Pakistan — working worldwide.",
  hero: {
    image: "/media/coast.webp",
    video: "/media/hero.mp4",
    alt: "Cinematic aerial view of a rugged coastline",
  },
  about: {
    title: "A small team.\nA bigger picture.",
    body: "We are a creative production team based in Punjab, working with people who care about what they put into the world. From shooting on location to finding the story in your footage, we bring the same attention to every frame.",
    image: "/media/production.webp",
    imageLabel: "Production moodboard · stock image",
    founderName: null,
  },
  comparison: {
    before: "/media/coast.webp",
    after: "/media/coast.webp",
    simulated: true,
  },
  demo: true,
};
export const navigation = [
  { label: "Services", href: "#services" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Achievements", href: "#achievements" },
  { label: "Meet Us", href: "#meet-us" },
  { label: "Contact Us", href: "#contact" },
];
export const contactDetails = {
  email: "editors.dreamteam@gmail.com",
  whatsapp: "923346364200",
  whatsappDisplay: "+92 334 6364200",
  whatsappMessage:
    "Hi Dream Team Editors, I found you through your website and I'd like to discuss a project.",
  isPlaceholder: false,
  enabled: import.meta.env.VITE_CONTACT_ENABLED !== "false",
  formEndpoint: "https://formsubmit.co/ajax/editors.dreamteam@gmail.com",
};
export const whatsappUrl = `https://wa.me/${contactDetails.whatsapp}?text=${encodeURIComponent(contactDetails.whatsappMessage)}`;
export const socialLinks = [
  { label: "Instagram", url: "https://www.instagram.com/dreamteam.editors?xtok=Z3gydWJvcHZicjNq" },
  { label: "Facebook", url: null, placeholder: true },
];
export const marquee = [
  "Video editing",
  "Photography",
  "Short form videos",
  "Videography",
  "Motion graphics",
  "Events",
  "Color grading",
  "Social media content",
  "Commercial shoots",
];
export const projects = [
  {
    id: "beyond",
    title: "Beyond the ordinary",
    category: "Commercial",
    image: "/media/coast.webp",
    video: "/media/hero.mp4",
    format: "Brand film",
    description:
      "A cinematic exploration of wild places. Stock footage used to demonstrate a landscape brand-film presentation.",
  },
  {
    id: "after-hours",
    title: "After hours",
    category: "Reels",
    image: "/media/city.webp",
    video: "/media/city.mp4",
    format: "Social film",
    description:
      "City light, movement and atmosphere. A stock-media short-form concept.",
  },
  {
    id: "quiet-luxury",
    title: "The quieter details",
    category: "Photography",
    image: "/media/product.webp",
    format: "Product study",
    description:
      "A considered look at texture, light and form. Stock product photography for layout demonstration.",
  },
  {
    id: "human-stories",
    title: "Stories, in focus",
    category: "YouTube",
    image: "/media/portrait.webp",
    format: "Creator concept",
    description:
      "A creator-film moodboard. Replace with an approved long-form video and thumbnail.",
  },
  {
    id: "together",
    title: "A day to remember",
    category: "Events",
    image: "/media/wedding.webp",
    format: "Wedding story",
    description:
      "Warm, intimate storytelling for moments that matter. This is a stock wedding moodboard.",
  },
  {
    id: "in-motion",
    title: "The work behind the work",
    category: "Social",
    image: "/media/production.webp",
    video: "/media/lifestyle.mp4",
    format: "Behind the scenes",
    description:
      "A glimpse into the creative process. Demo stock studio footage.",
  },
  {
    id: "night-drive",
    title: "Chasing the light",
    category: "Commercial",
    image: "/media/car.webp",
    format: "Automotive concept",
    description:
      "A bold visual direction for automotive content. Stock photography concept.",
  },
  {
    id: "on-set",
    title: "Behind the frame",
    category: "YouTube",
    image: "/media/production.webp",
    format: "Behind the scenes",
    description:
      "A production moodboard celebrating the work behind the camera. Stock photo study.",
  },
].map((p) => ({ ...p, demo: true }));
export const projectFilters = [
  "All",
  "Reels",
  "YouTube",
  "Commercial",
  "Photography",
  "Events",
  "Social",
];
// Values supplied in the client's annotated screenshot. 160+ is interpreted as clients.
export const stats = [
  { value: 10, suffix: "+", label: "Years creating", caption: "Experience" },
  { value: 750, suffix: "+", label: "Projects delivered", caption: "Creative output" },
  { value: 160, suffix: "+", label: "Clients served", caption: "Collaborations" },
  { value: "Worldwide", label: "Different places. Same vision.", caption: "Our reach" },
];
// Replace placeholder names, roles and image paths with the four approved member profiles.
export const team = [
  { id: "01", name: "Team member 01", role: "Creative Director", image: "/media/team-creative-director.webp", specialty: "Direction & storytelling", bio: "Shapes the creative direction and turns the brief into a story worth telling." },
  { id: "02", name: "Team member 02", role: "Video Editor", image: "/media/team-video-editor.webp", specialty: "Editing & rhythm", bio: "Finds the strongest moments and gives every cut its purpose." },
  { id: "03", name: "Team member 03", role: "Cinematographer", image: "/media/team-cinematographer.webp", specialty: "Camera & light", bio: "Brings the story into focus through thoughtful composition and lighting." },
  { id: "04", name: "Team member 04", role: "Motion Designer", image: "/media/team-motion-designer.webp", specialty: "Motion & finishing", bio: "Adds movement, visual detail and the finishing touches that bring the piece together." },
];
export const services = [
  {
    group: "01",
    title: "Make the cut.",
    description: "Give every frame a reason to be there.",
    image: "/media/production.webp",
    items: [
      "Long-Form Video Editing",
      "Short-Form / Reels / TikTok Editing",
      "Motion Graphics",
      "Color Grading",
      "Sound Design",
      "Thumbnail Design",
    ],
  },
  {
    group: "02",
    title: "Capture the feeling.",
    description: "The right light. The real moment.",
    image: "/media/portrait.webp",
    items: ["Photography", "Product Photography", "Videography"],
  },
  {
    group: "03",
    title: "Think bigger.",
    description: "From intimate stories to full-scale productions.",
    image: "/media/car.webp",
    items: [
      "Commercial Shoots",
      "Event & Wedding Coverage",
      "Drone / Aerial Content",
    ],
  },
];
export const serviceOptions = services.flatMap((s) => s.items);
export const reels = [
  {
    id: "r1",
    title: "Go somewhere.",
    image: "/media/coast.webp",
    video: "/media/hero-vertical.mp4",
    type: "Travel / Lifestyle",
  },
  {
    id: "r2",
    title: "Own the night.",
    image: "/media/city.webp",
    video: "/media/city-vertical.mp4",
    type: "Urban / Social",
  },
  {
    id: "r3",
    title: "Make a little noise.",
    image: "/media/production.webp",
    video: "/media/studio-vertical.mp4",
    type: "Creator / Short form",
  },
  {
    id: "r4",
    title: "Every little detail.",
    image: "/media/product.webp",
    type: "Product / Concept",
  },
  {
    id: "r5",
    title: "Feel everything.",
    image: "/media/wedding.webp",
    type: "Wedding / Concept",
  },
];
export const photos = [
  ["portrait", "Portrait", "An editorial portrait in neon light"],
  ["product", "Product", "Product study in directional light"],
  ["wedding", "Wedding", "A wedding celebration"],
  ["city", "Brand", "A rainy night drive through the city"],
  ["lifestyle", "Lifestyle", "An expressive lifestyle moment"],
  ["coast", "Landscape", "Waves meeting the coastline"],
  ["car", "Brand", "An automotive detail study"],
  ["production", "Behind the scenes", "Camera and production equipment"],
  ["portrait-2", "Portrait", "An editorial portrait"],
  ["product-2", "Product", "A still-life product composition"],
  ["event", "Events", "An atmospheric event scene"],
  ["landscape", "Landscape", "A cinematic natural landscape"],
  ["architecture", "Behind the scenes", "A cinema camera on a film set"],
  ["details", "Portrait", "An editorial portrait in colored light"],
  ["nature", "Landscape", "A quiet moment in nature"],
  ["wedding-2", "Wedding", "Details of a wedding day"],
].map(([id, category, alt]) => ({
  id,
  image: `/media/${id}.webp`,
  title: alt,
  category,
  alt,
  demo: true,
}));
export const process = [
  {
    name: "Discover",
    text: "We get to know your story, your audience and the feeling you want to leave behind.",
    tag: "The brief",
  },
  {
    name: "Shoot / Send",
    text: "We plan the shoot, or you send your footage. One shared direction before we begin.",
    tag: "The footage",
  },
  {
    name: "Create",
    text: "Editing, motion, color and sound. This is where the story finds its rhythm.",
    tag: "The first cut",
  },
  {
    name: "Review",
    text: "You share clear feedback. We refine the details together until the cut feels right.",
    tag: "The fine-tuning",
  },
  {
    name: "Deliver",
    text: "Final files, sized for the places your story will live. Ready to publish and share.",
    tag: "The final frame",
  },
];
export const testimonials = [
  {
    quote:
      "“They found the story in the footage, then made every second count.”",
    name: "Creator collaboration",
    role: "Long-form editing",
    demo: true,
  },
  {
    quote:
      "“From the first conversation to the final cut, everything felt considered.”",
    name: "Brand collaboration",
    role: "Creative production",
    demo: true,
  },
  {
    quote: "“The little moments became the parts we wanted to watch again.”",
    name: "Event collaboration",
    role: "Wedding film",
    demo: true,
  },
];

// Reuse licensed stock inside the illustrative editing workspace.
export const processWorkspace = [
  {label:'01_the_brief',image:'/media/landscape.webp',alt:'Golden desert dunes, a visual moodboard for the initial idea'},
  {label:'02_on_location',image:'/media/production.webp',alt:'Filmmaker operating a camera on location'},
  {label:'03_the_first_cut',image:'/media/coast.webp',alt:'A cinematic coastal frame in the editing monitor'},
  {label:'04_the_details',image:'/media/product.webp',alt:'Product details being reviewed in the editing monitor'},
  {label:'05_the_final_frame',image:'/media/wedding.webp',alt:'A wedding moment in the finished-story preview'},
];
