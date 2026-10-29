export interface ClubConfig {
  id: string;
  name: string;
  shortName: string;
  type: "multiple-district" | "district" | "club";
  district: string;
  multipleDistrict: string;
  country: string;
  charterYear: number;
  sponsoringLionsClub?: string;
  tagline: string;
  motto: string;
  description: string;
  logos: {
    main: string;
    lion: string;
    leo: string;
    district?: string;
  };
  contact: {
    email: string;
    phone: string;
    address: string;
    meetingSchedule: string;
    socials: {
      facebook?: string;
      instagram?: string;
      linkedin?: string;
      youtube?: string;
      twitter?: string;
    };
  };
  impactStats: {
    stat1: { value: string; label: string };
    stat2: { value: string; label: string };
    stat3: { value: string; label: string };
    stat4: { value: string; label: string };
    description: string;
  };
  affiliationDetails: {
    lciTitle: string;
    lciDescription: string;
    card1: {
      title: string;
      subtitle: string;
      linkText: string;
      linkUrl: string;
    };
    card2: {
      title: string;
      subtitle: string;
    };
    card3: {
      title: string;
      subtitle: string;
    };
  };
  pillars: {
    id: string;
    title: string;
    tagline: string;
    description: string;
    icon: string;
    color: string;
  }[];
  featuredProjects: {
    id: string;
    slug: string;
    title: string;
    category: string;
    categoryColor: string;
    image: string;
    summary: string;
    impactMetric: string;
    date: string;
    location: string;
    status: "Completed" | "Ongoing" | "Upcoming";
  }[];
  upcomingEvents: {
    id: string;
    title: string;
    date: string;
    day: string;
    month: string;
    time: string;
    venue: string;
    category: string;
    description: string;
  }[];
  boardMembers: {
    id: string;
    name: string;
    designation: string;
    roleCategory: "top-table" | "director" | "advisor";
    photo: string;
    motto?: string;
    email?: string;
    linkedin?: string;
  }[];
  testimonials: {
    id: string;
    quote: string;
    author: string;
    role: string;
    avatar: string;
    tag?: string;
    faculty?: string;
  }[];
}

export const CLUBS_DATA: Record<string, ClubConfig> = {
  "leo-uwu": {
    id: "leo-uwu",
    name: "Leo Club of Uva Wellassa University",
    shortName: "UWU Leos",
    type: "club",
    district: "District 306 D10",
    multipleDistrict: "Multiple District 306",
    country: "Sri Lanka",
    charterYear: 2018,
    sponsoringLionsClub: "Lions Club of Uva Capital",
    tagline: "Value Addition • Youth Leadership • Community Service",
    motto: "Leadership, Experience, Opportunity",
    description:
      "The premier youth service organization of Uva Wellassa University of Sri Lanka (District 306 D10), empowering undergraduates to lead meaningful humanitarian projects, foster fellowship, and uplift communities across Uva Province and beyond.",
    logos: {
      main: "/logos/uwu-leo-logo.png",
      lion: "/logos/lions-international.png",
      leo: "/logos/uwu-leo-seal.png",
      district: "/logos/district-306c2.png",
    },
    contact: {
      email: "leoclub@uwu.ac.lk",
      phone: "+94 55 222 6580",
      address: "Uva Wellassa University, Passara Road, Badulla 90000, Sri Lanka",
      meetingSchedule: "Bi-weekly General Meeting - Alternate Wednesdays at 4:30 PM (UWU Campus / Hybrid)",
      socials: {
        facebook: "https://facebook.com/uwuleos",
        instagram: "https://instagram.com/uwuleos",
        linkedin: "https://linkedin.com/company/leo-club-of-uva-wellassa-university",
        youtube: "https://youtube.com/@uwuleos",
      },
    },
    impactStats: {
      stat1: { value: "1", label: "University Club" },
      stat2: { value: "150+", label: "Active Undergraduates" },
      stat3: { value: "6,500+", label: "Volunteer Hours" },
      stat4: { value: "60+", label: "Signature Projects" },
      description:
        "Where the Leo Club of Uva Wellassa University stands today in our mission of service and youth empowerment.",
    },
    affiliationDetails: {
      lciTitle: "Lions Clubs International",
      lciDescription:
        "Sponsored by the Lions Club of Uva Capital under Leo District 306 D10, our club unites undergraduates from Uva Wellassa University in global humanitarian service, fostering leadership and community development.",
      card1: {
        title: "Lions International",
        subtitle: "Since 1917. 1.4M+ members worldwide serving communities.",
        linkText: "Read the history",
        linkUrl: "/about#lions-history",
      },
      card2: {
        title: "Leo Movement",
        subtitle: "Leadership. Experience. Opportunity. Empowering university youth since 1957.",
      },
      card3: {
        title: "District 306 D10",
        subtitle: "Uva Wellassa University Leos serving under District 306 D10, Sri Lanka.",
      },
    },
    pillars: [
      {
        id: "education",
        title: "Educational Upliftment & STEM",
        tagline: "Empowering rural schools and students across Uva",
        description: "Annual school book donation drives, rural school library renovations, and STEM workshops for schoolchildren in Badulla and Monaragala.",
        icon: "GraduationCap",
        color: "blue",
      },
      {
        id: "environment",
        title: "Environment & Green Uva",
        tagline: "Preserving Central Highlands biodiversity",
        description: "Reforestation drives, university campus sustainability initiatives, plastic-free campaigns, and nature trail preservation in Uva Province.",
        icon: "TreePine",
        color: "emerald",
      },
      {
        id: "healthcare",
        title: "Community Health & Blood Aid",
        tagline: "Saving lives and promoting rural wellbeing",
        description: "Annual university mega blood donation campaign, rural medical and eye screening camps, and mental health awareness programs.",
        icon: "HeartHandshake",
        color: "rose",
      },
      {
        id: "youth-empowerment",
        title: "Undergraduate Leadership & Skills",
        tagline: "Developing next-generation leaders",
        description: "Professional development workshops, public speaking bootcamps, executive training, and inter-university fellowship events.",
        icon: "Users",
        color: "indigo",
      },
      {
        id: "community-relief",
        title: "Community Support & Relief",
        tagline: "Standing with local families in need",
        description: "Dry ration distributions, flood and landslide emergency relief in the Uva region, and elder home welfare visits.",
        icon: "ShieldAlert",
        color: "amber",
      },
    ],
    featuredProjects: [
      {
        id: "proj-uwu-1",
        slug: "project-sipnana-badulla",
        title: "Project Sipnana: Rural School Educational Aid Drive",
        category: "Education",
        categoryColor: "bg-indigo-100 text-indigo-800 border-indigo-200",
        image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=1200&q=80",
        summary: "Providing comprehensive book sets, essential stationery, and classroom equipment to underprivileged primary schools across the Passara and Badulla education zones.",
        impactMetric: "450+ Students Supported",
        date: "December 2024",
        location: "Passara, Badulla",
        status: "Completed",
      },
      {
        id: "proj-uwu-2",
        slug: "uwu-annual-blood-donation",
        title: "UWU Annual Mega Blood & Health Camp",
        category: "Healthcare",
        categoryColor: "bg-rose-100 text-rose-800 border-rose-200",
        image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1200&q=80",
        summary: "Organized in collaboration with the Badulla Teaching Hospital Blood Bank, collecting vital blood units from university undergraduates and staff.",
        impactMetric: "220+ Blood Units Collected",
        date: "November 2024",
        location: "UWU Main Auditorium, Badulla",
        status: "Completed",
      },
      {
        id: "proj-uwu-3",
        slug: "green-uva-reforestation",
        title: "Project Green Uva: Central Highlands Tree Planting",
        category: "Environment",
        categoryColor: "bg-emerald-100 text-emerald-800 border-emerald-200",
        image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1200&q=80",
        summary: "Planting native forest trees and medicinal plants in catchment areas around Namunukula and Badulla to combat soil erosion and support biodiversity.",
        impactMetric: "1,500+ Saplings Planted",
        date: "October 2024",
        location: "Namunukula Catchment, Badulla",
        status: "Completed",
      },
    ],
    upcomingEvents: [
      {
        id: "ev-uwu-1",
        title: "UWU Leos Annual Leadership Training & Induction 2025",
        date: "March 28, 2025",
        day: "28",
        month: "MAR",
        time: "03:30 PM - 06:30 PM",
        venue: "Management Auditorium, UWU Campus, Badulla",
        category: "Leadership",
        description: "Induction of prospective undergraduate members, executive skill development, and team building workshop.",
      },
      {
        id: "ev-uwu-2",
        title: "Project Sipnana Phase II - Monaragala School Upliftment",
        date: "April 19, 2025",
        day: "19",
        month: "APR",
        time: "08:00 AM - 04:00 PM",
        venue: "Monaragala Rural Primary School",
        category: "Community",
        description: "Delivering school essentials, conducting art workshops, and painting library facilities for rural students.",
      },
      {
        id: "ev-uwu-3",
        title: "Uva Youth Clean-Up & Environmental Trek",
        date: "May 10, 2025",
        day: "10",
        month: "MAY",
        time: "07:00 AM - 02:00 PM",
        venue: "Ella & Dunhinda Conservation Area",
        category: "Environment",
        description: "Promoting sustainable tourism, cleaning plastic waste, and installing waste bins along eco-trails.",
      },
    ],
    boardMembers: [
      {
        id: "bm-uwu-1",
        name: "Leo Duvidu Bandara",
        designation: "Club President",
        roleCategory: "top-table",
        photo: "/Leo Board 26-27/President/df2aa047-ca6c-45ec-928d-769430b9d241.jpg",
        motto: "Leading with passion, serving with purpose for Uva Wellassa and beyond.",
        email: "president.uwuleos@gmail.com",
      },
      {
        id: "bm-uwu-2",
        name: "Leo Lasitha Rajapaksha",
        designation: "1st Vice President",
        roleCategory: "top-table",
        photo: "/Leo Board 26-27/1 st Vice President/Lasitha Rajapaksha.jpg",
        motto: "Dedication, collaboration, and continuous community service.",
        email: "vp1.uwuleos@gmail.com",
      },
      {
        id: "bm-uwu-3",
        name: "Leo Amaya Nethmini",
        designation: "2nd Vice President",
        roleCategory: "top-table",
        photo: "/Leo Board 26-27/2nd Vice President/Amaya Nethmini.jpg",
        motto: "Empowering fellow undergraduates to realize their full potential.",
        email: "vp2.uwuleos@gmail.com",
      },
      {
        id: "bm-uwu-4",
        name: "Leo Shehara Bandarathilaka",
        designation: "Club Treasurer",
        roleCategory: "top-table",
        photo: "/Leo Board 26-27/Treasure/Shehara Bandarathilaka_.png",
        motto: "Transparency, accountability, and efficiency in every initiative.",
        email: "treasurer.uwuleos@gmail.com",
      },
      {
        id: "bm-uwu-5",
        name: "Leo Deshan Thilakarathna",
        designation: "Immediate Past President",
        roleCategory: "top-table",
        photo: "/Leo Board 26-27/Immediate Past President/Deshan Thilakarathna_.jpg",
        motto: "Sustaining a legacy of youth excellence and impactful community service.",
        email: "ipp.uwuleos@gmail.com",
      },
    ],
    testimonials: [
      {
        id: "t-uwu-1",
        quote: "Leading the club as President has taught me that real leadership is service. Every project we run across Uva brings undergraduates from all faculties together for a common purpose.",
        author: "Leo Duvidu Bandara",
        role: "Club President",
        faculty: "Faculty of Applied Sciences • UWU",
        tag: "Youth Leadership",
        avatar: "/Leo Board 26-27/President/df2aa047-ca6c-45ec-928d-769430b9d241.jpg",
      },
      {
        id: "t-uwu-2",
        quote: "Being part of UWU Leos connected me with passionate peers across faculties. Working with the executive board has transformed my university journey.",
        author: "Leo Lasitha Rajapaksha",
        role: "1st Vice President",
        faculty: "Faculty of Management • UWU",
        tag: "Campus Experience",
        avatar: "/Leo Board 26-27/1 st Vice President/Lasitha Rajapaksha.jpg",
      },
      {
        id: "t-uwu-3",
        quote: "Leo service gives young people a real platform to learn, lead and uplift others. Empowering students through education is what motivates me every day.",
        author: "Leo K. Kawya Manushi",
        role: "Director in Youth Empowerment & Education",
        faculty: "Faculty of Science & Technology • UWU",
        tag: "Service & Education",
        avatar: "/Leo Board 26-27/Director in Youth Empowerment and Education/K.Kawya Manushi_.jpg",
      },
    ],
  },
  "leo-md-306": {
    id: "leo-md-306",
    name: "Leos of Sri Lanka & Maldives (Leo MD 306)",
    shortName: "Leo MD 306",
    type: "multiple-district",
    district: "Multiple District 306",
    multipleDistrict: "MD 306",
    country: "Sri Lanka & Maldives",
    charterYear: 1969,
    tagline: "Inspiring Lives • Empowering Youth • Leading Change",
    motto: "Leadership, Experience, Opportunity",
    description:
      "Multiple District 306 unites young change-makers across Sri Lanka and the Maldives to create meaningful humanitarian impact, foster executive leadership skills, and serve vulnerable communities.",
    logos: {
      main: "/logos/leo-md306.png",
      lion: "/logos/lions-international.png",
      leo: "/logos/leo-emblem.png",
      district: "/logos/md306-emblem.png",
    },
    contact: {
      email: "secretariat@leomd306.org",
      phone: "+94 11 258 4567",
      address: "Lions Activity Centre, Vidya Mawatha, Colombo 07, Sri Lanka",
      meetingSchedule: "Monthly Council Meeting - 1st Saturday at 4:00 PM",
      socials: {
        facebook: "https://facebook.com/LeoMultipleDistrict306",
        instagram: "https://instagram.com/leomd306",
        linkedin: "https://linkedin.com/company/leo-md-306",
        youtube: "https://youtube.com/@leomd306",
      },
    },
    impactStats: {
      stat1: { value: "12", label: "Districts" },
      stat2: { value: "210+", label: "Clubs" },
      stat3: { value: "10,000+", label: "Members" },
      stat4: { value: "5,000+", label: "Projects" },
      description:
        "Where Multiple District 306 stands today, across Sri Lanka and the Maldives.",
    },
    affiliationDetails: {
      lciTitle: "Lions Clubs International",
      lciDescription:
        "Lions Clubs International (LCI), founded by Melvin Jones in 1917, is the largest service organization in the world with 1.4 million members. The organization is dedicated to humanitarian efforts, promoting peace, and fostering cross-cultural understanding through its global network of over 46,000 clubs. LCI's motto, 'We Serve,' reflects its commitment to helping communities in need, regardless of language, religion, or politics.",
      card1: {
        title: "Lions International",
        subtitle: "Since 1917. The largest service organization in the world.",
        linkText: "Read the history",
        linkUrl: "/about#lions-history",
      },
      card2: {
        title: "Leo",
        subtitle: "Leadership. Experience. Opportunity. Since 1957.",
      },
      card3: {
        title: "Leo MD 306",
        subtitle: "Sri Lanka and the Maldives. Led by young people.",
      },
    },
    pillars: [
      {
        id: "environment",
        title: "Environment & Green Earth",
        tagline: "Preserving biodiversity and climate action",
        description: "Large-scale tree plantation, beach cleanup drives, coral restoration, and zero-waste awareness across island nations.",
        icon: "TreePine",
        color: "emerald",
      },
      {
        id: "hunger",
        title: "Hunger Relief & Nutrition",
        tagline: "Combating food insecurity with compassion",
        description: "Community soup kitchens, dry ration distribution for low-income families, and school nutritional lunch programs.",
        icon: "Utensils",
        color: "amber",
      },
      {
        id: "vision-health",
        title: "Vision & Healthcare",
        tagline: "Restoring sight and essential health screenings",
        description: "Free pediatric eye screening camps, spectacle donations, mobile medical clinics, and blood donation drives.",
        icon: "Eye",
        color: "blue",
      },
      {
        id: "youth-empowerment",
        title: "Youth Leadership & Education",
        tagline: "Equipping next-generation leaders",
        description: "Public speaking academies, career mentorship summits, STEM workshops, and rural school infrastructure upgrades.",
        icon: "GraduationCap",
        color: "indigo",
      },
      {
        id: "childhood-cancer",
        title: "Childhood Cancer Support",
        tagline: "Standing with courageous young fighters",
        description: "Pediatric oncology ward upliftment, medicinal funding, and happiness campaigns for recovering children.",
        icon: "Ribbon",
        color: "rose",
      },
      {
        id: "disaster-relief",
        title: "Disaster Relief & Aid",
        tagline: "Rapid emergency response when disaster strikes",
        description: "Immediate relief package distribution during floods, landslides, and economic emergencies.",
        icon: "ShieldAlert",
        color: "cyan",
      },
    ],
    featuredProjects: [
      {
        id: "proj-1",
        slug: "haritha-dharani-island-green",
        title: "Project Haritha Dharani: 50,000 Mangrove & Forest Restoration",
        category: "Environment",
        categoryColor: "bg-emerald-100 text-emerald-800 border-emerald-200",
        image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1200&q=80",
        summary: "A nationwide coastal mangrove conservation drive restoring over 25 hectares of critical wetland ecosystems across Kalpitiya, Negombo, and Mannar.",
        impactMetric: "52,400 Trees Planted",
        date: "August 2024",
        location: "Coastal Belt, Sri Lanka",
        status: "Completed",
      },
      {
        id: "proj-2",
        slug: "sight-first-schools",
        title: "Sight For Youth: Nationwide School Vision & Spectacle Drive",
        category: "Vision Care",
        categoryColor: "bg-blue-100 text-blue-800 border-blue-200",
        image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1200&q=80",
        summary: "Screening over 15,000 rural primary school students and providing high-quality custom prescription spectacles free of charge.",
        impactMetric: "3,200 Free Glasses Donated",
        date: "October 2024",
        location: "Central & Uva Provinces",
        status: "Ongoing",
      },
      {
        id: "proj-3",
        slug: "suwa-diviya-hunger-relief",
        title: "Project Suwa Diviya: Zero-Hunger Community Kitchens",
        category: "Hunger Relief",
        categoryColor: "bg-amber-100 text-amber-800 border-amber-200",
        image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1200&q=80",
        summary: "Delivering wholesome nutritious meals and dry ration packs to underserved urban families and elder care centers.",
        impactMetric: "28,000+ Hot Meals Served",
        date: "September 2024",
        location: "Western & Southern Districts",
        status: "Completed",
      },
    ],
    upcomingEvents: [
      {
        id: "ev-1",
        title: "Leo Multiple District Annual Youth Leadership Summit 2025",
        date: "March 22, 2025",
        day: "22",
        month: "MAR",
        time: "09:00 AM - 05:00 PM",
        venue: "BMICH Main Hall, Colombo",
        category: "Conferences",
        description: "The flagship leadership conference gathering over 800 young delegates for workshops, keynote panels, and national project awards.",
      },
      {
        id: "ev-2",
        title: "Island-Wide Mega Blood & Plasma Donation Drive",
        date: "April 12, 2025",
        day: "12",
        month: "APR",
        time: "08:30 AM - 03:30 PM",
        venue: "National Blood Center, Narahenpita & Regional Centers",
        category: "Healthcare",
        description: "Join hands with 50+ Leo clubs across all districts to replenish critical blood reserves for national hospitals.",
      },
      {
        id: "ev-3",
        title: "Maldives Coral Restoration & Marine Fellowship Camp",
        date: "May 18, 2025",
        day: "18",
        month: "MAY",
        time: "Full Weekend Program",
        venue: "Kaafu Atoll, Maldives",
        category: "Environment",
        description: "Cross-border fellowship event featuring underwater coral nursery transplantation and beach cleanup with local youth councils.",
      },
    ],
    boardMembers: [
      {
        id: "bm-1",
        name: "Leo Senura Jayasinghe",
        designation: "Multiple District President",
        roleCategory: "top-table",
        photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
        motto: "Leadership is not a title, it's the courage to serve and empower others.",
        email: "president@leomd306.org",
        linkedin: "https://linkedin.com",
      },
      {
        id: "bm-2",
        name: "Leo Dilani Perera",
        designation: "Multiple District Vice President",
        roleCategory: "top-table",
        photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80",
        motto: "When passion meets purpose, extraordinary transformations happen in our communities.",
        email: "vp@leomd306.org",
        linkedin: "https://linkedin.com",
      },
      {
        id: "bm-3",
        name: "Leo Kaveen Fernando",
        designation: "Multiple District Secretary",
        roleCategory: "top-table",
        photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80",
        motto: "Precision in execution, boundless empathy in service.",
        email: "secretary@leomd306.org",
        linkedin: "https://linkedin.com",
      },
      {
        id: "bm-4",
        name: "Leo Thisuri Ranasinghe",
        designation: "Multiple District Treasurer",
        roleCategory: "top-table",
        photo: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80",
        motto: "Integrity and transparency are the pillars of sustainable humanitarian impact.",
        email: "treasurer@leomd306.org",
        linkedin: "https://linkedin.com",
      },
      {
        id: "bm-5",
        name: "Leo Rashmika Bandara",
        designation: "Director of Community Service",
        roleCategory: "director",
        photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80",
        motto: "Hands to serve, hearts to care.",
        email: "service@leomd306.org",
        linkedin: "https://linkedin.com",
      },
      {
        id: "bm-6",
        name: "Leo Amanda De Silva",
        designation: "Director of Public Relations & Media",
        roleCategory: "director",
        photo: "https://images.unsplash.com/photo-1534751516642-a1714f5a5078?auto=format&fit=crop&w=600&q=80",
        motto: "Amplifying voices of change across every platform.",
        email: "pr@leomd306.org",
        linkedin: "https://linkedin.com",
      },
    ],
    testimonials: [
      {
        id: "t-1",
        quote:
          "Joining Leos MD 306 gave me the platform to lead national-scale community initiatives, collaborate with international youth leaders, and gain confidence I never knew I had.",
        author: "Leo Minoli Wickremasinghe",
        role: "District 306 A1 • Past Club President",
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80",
      },
      {
        id: "t-2",
        quote:
          "The Leo movement is the world's greatest training ground for young humanitarians. Watching our youth lead 5,000+ impactful projects across Sri Lanka and the Maldives is truly inspiring.",
        author: "Lion Rohantha Samaraweera PMJF",
        role: "Council Chairperson • Lions Multiple District 306",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80",
      },
    ],
  },
  "leo-colombo-millennium": {
    id: "leo-colombo-millennium",
    name: "Leo Club of Colombo Millennium",
    shortName: "Leo Colombo Millennium",
    type: "club",
    district: "District 306 A2",
    multipleDistrict: "Multiple District 306",
    country: "Sri Lanka",
    charterYear: 2008,
    sponsoringLionsClub: "Lions Club of Colombo Millennium",
    tagline: "United in Service • Driven by Purpose",
    motto: "Leadership, Experience, Opportunity",
    description:
      "A vibrant, award-winning premier Leo Club in District 306 A2 dedicated to community upliftment, educational scholarships, and environmental sustainability.",
    logos: {
      main: "/logos/leo-colombo.png",
      lion: "/logos/lions-international.png",
      leo: "/logos/leo-emblem.png",
      district: "/logos/district-306a2.png",
    },
    contact: {
      email: "contact@leocolombomillennium.org",
      phone: "+94 77 345 6789",
      address: "Colombo 03, Sri Lanka",
      meetingSchedule: "2nd & 4th Sunday at 4:30 PM (Physical/Hybrid)",
      socials: {
        facebook: "https://facebook.com/LeoColomboMillennium",
        instagram: "https://instagram.com/leocolombomillennium",
        linkedin: "https://linkedin.com/company/leo-colombo-millennium",
      },
    },
    impactStats: {
      stat1: { value: "1", label: "Chartered Club" },
      stat2: { value: "65+", label: "Active Leos" },
      stat3: { value: "12,500+", label: "Volunteer Hours" },
      stat4: { value: "180+", label: "Projects Done" },
      description: "Where Leo Club of Colombo Millennium stands today in our journey of service.",
    },
    affiliationDetails: {
      lciTitle: "Lions Clubs International",
      lciDescription:
        "Sponsored by the Lions Club of Colombo Millennium under District 306 A2, our club is part of the world's largest humanitarian service network.",
      card1: {
        title: "Lions International",
        subtitle: "Since 1917. 1.4M+ members worldwide serving communities.",
        linkText: "Read the history",
        linkUrl: "/about#lions-history",
      },
      card2: {
        title: "Leo Movement",
        subtitle: "Leadership. Experience. Opportunity. Since 1957.",
      },
      card3: {
        title: "District 306 A2",
        subtitle: "Committed to excellence, fellowship, and service.",
      },
    },
    pillars: [
      {
        id: "education",
        title: "Sipnana Educational Aid",
        tagline: "Empowering rural students with books and lab equipment",
        description: "Annual school book donation drives, scholarship stipends, and smart classroom setups in rural schools.",
        icon: "GraduationCap",
        color: "blue",
      },
      {
        id: "green-future",
        title: "Eco-Future & Green Cities",
        tagline: "Urban reforestation and clean water filtration",
        description: "Community compost projects, public park revamps, and clean drinking water purification filters for schools.",
        icon: "TreePine",
        color: "emerald",
      },
      {
        id: "health-care",
        title: "Elder Care & Health Camps",
        tagline: "Dignity and comfort for senior citizens",
        description: "Regular medical checkups, cataract surgeries sponsorship, and recreational fellowship days for elder care homes.",
        icon: "HeartHandshake",
        color: "rose",
      },
    ],
    featuredProjects: [
      {
        id: "p-col-1",
        slug: "sipnana-scholarships",
        title: "Project Sipnana: 500 Rural Student Educational Packs",
        category: "Education",
        categoryColor: "bg-indigo-100 text-indigo-800 border-indigo-200",
        image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=1200&q=80",
        summary: "Provided complete annual book bundles, school bags, and stationery sets to 500 underprivileged primary school children in Monaragala.",
        impactMetric: "500 Students Supported",
        date: "January 2025",
        location: "Monaragala District",
        status: "Completed",
      },
      {
        id: "p-col-2",
        slug: "clean-water-schools",
        title: "Project Jeevithaya: Clean Water RO Filtration in 5 Schools",
        category: "Healthcare",
        categoryColor: "bg-cyan-100 text-cyan-800 border-cyan-200",
        image: "https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&w=1200&q=80",
        summary: "Installed commercial-grade Reverse Osmosis water purification filtration systems to safeguard rural kids against Chronic Kidney Disease.",
        impactMetric: "2,400+ Daily Beneficiaries",
        date: "November 2024",
        location: "Anuradhapura",
        status: "Completed",
      },
    ],
    upcomingEvents: [
      {
        id: "ev-col-1",
        title: "16th Annual Installation Ceremony of Club Officers",
        date: "July 15, 2025",
        day: "15",
        month: "JUL",
        time: "05:30 PM",
        venue: "Cinnamon Grand, Colombo",
        category: "Ceremony",
        description: "Induction of the incoming executive board for the Leistic Year 2025/2026 and celebration of past accomplishments.",
      },
    ],
    boardMembers: [
      {
        id: "bm-col-1",
        name: "Leo Dineth Gunasekara",
        designation: "Club President",
        roleCategory: "top-table",
        photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80",
        motto: "Lead with empathy, execute with passion.",
        email: "president@leocolombomillennium.org",
      },
      {
        id: "bm-col-2",
        name: "Leo Shenali Silva",
        designation: "Club Secretary",
        roleCategory: "top-table",
        photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
        motto: "Organized action creates boundless social good.",
        email: "secretary@leocolombomillennium.org",
      },
    ],
    testimonials: [
      {
        id: "t-col-1",
        quote: "Being in Colombo Millennium has shaped my professional career and taught me true project management through service.",
        author: "Leo Pravin S.",
        role: "Club Member • 3 Years in Service",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
      },
    ],
  },
};
