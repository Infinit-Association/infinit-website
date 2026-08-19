"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Crown, Mail } from "lucide-react";
import { FaLinkedinIn, FaInstagram, FaGithub, FaXTwitter } from "react-icons/fa6";

// Define the types so TypeScript knows we can use either a simple link OR a custom label
type SocialLink = string | { href: string; label: string };

type Member = {
  name: string;
  role: string;
  dept: string;
  bio: string;
  img: string;
  socials: Record<string, SocialLink>;
  color: string;
};

const coreCommittee: Member[] = [
  {
    name: "Monisha BR",
    role: "President",
    dept: "IT – 4th Year",
    bio: "Steering the overarching mission and representing the collective voice.",
    img: "/Monisha BR.jpg",
    socials: { email: "mailto:[monishabr2006@gmail.com]", linkedin: "https://www.linkedin.com/in/monisha-br-934058305/", instagram: "https://www.instagram.com/monu_br_23?igsh=MWo2Mm1hbHd3M2I3bQ==" },
    color: "#E60000",
  },
  {
    name: "Guruprasanth B",
    role: "Vice President",
    dept: "IT – 3rd Year",
    bio: "Supporting leadership and driving key administrative initiatives.",
    img: "/Guruprasanth B.jpg",
    socials: { email: "mailto:[prasanthguru659@gmail.com]", linkedin: "https://www.linkedin.com/in/guru-prasanth-7bbabb37b/", instagram: "https://www.instagram.com/guru_prasanth17?igsh=dXlra3c3c3M2ZXlz" },
    color: "#FFD700",
  },
  {
    name: "Natchathira Mala V",
    role: "General Secretary",
    dept: "IT – 4th Year",
    bio: "The administrative backbone ensuring seamless communication and operations.",
    img: "/Natchathira Mala V.jpg",
    socials: { email: "mailto:[natchathiramala@gmail.com]", linkedin: "https://www.linkedin.com/in/natchathira-mala-v/", instagram: "https://www.instagram.com/nakshuuu.__?igsh=MXhrcTVnOHNzZ2x4eg==&igsi=MXhrcTVnOHNzZ2x4eg==" },
    color: "#E60000",
  },
  {
    name: "Sandhiya P",
    role: "Deputy Secretary",
    dept: "IT – 3rd Year",
    bio: "Assisting core administration and bridging leadership with the student body.",
    img: "/Sandhiya P.jpg",
    socials: { email: "mailto:[sandhiyadeepa313@gmail.com]", linkedin: "https://www.linkedin.com/in/sandhiya-palanisamy-9a2b0237b/", instagram: "https://www.instagram.com/sandhya__era?igsh=cDMwM3hwb3lmd2oy" },
    color: "#FFD700",
  },
  {
    name: "Kuttymadheshwaran M",
    role: "Joint Secretary",
    dept: "IT – 2nd Year",
    bio: "Facilitating day-to-day coordination and supporting executive tasks.",
    img: "/Kutty Madeshwaran M.jpg",
    socials: { email: "mailto:[kuttymadheshwaran@gmail.com]", linkedin: "https://www.linkedin.com/in/kutty-madheshwaran-1700b442a/", instagram: "https://www.instagram.com/kuttymadheshwaran/" },
    color: "#E60000",
  },
  {
    name: "Sree Varshini S",
    role: "Treasurer",
    dept: "IT – 3rd Year",
    bio: "Managing finances, budgeting resources, and ensuring sustainable growth.",
    img: "/Sree Varshini S.jpg",
    socials: { email: "mailto:[sreevarshinisreevarshini111@gmail.com]", linkedin: "https://www.linkedin.com/in/sree-varshini-s-473b5b3a0/", instagram: "https://www.instagram.com/_mizz_420?igsh=MW9vYjB5aTRnZ2Q0ZQ==" },
    color: "#FFD700",
  },
  {
    name: "Yazhini S",
    role: "Joint Treasurer",
    dept: "IT – 2nd Year",
    bio: "Assisting in financial tracking, resource allocation, and record keeping.",
    img: "/Yazhini S.jpg",
    socials: { email: "mailto:[yazhinisaravanan025@gmail.com]", linkedin: "https://www.linkedin.com/in/yazhini-s-1270a942a/", instagram: "https://www.instagram.com/_glitter._.heart_/" },
    color: "#E60000",
  },
  {
    name: "Elavarasan R V",
    role: "Event Coordinator Head",
    dept: "IT – 4th Year",
    bio: "Masterminding impactful events from initial concept to flawless execution.",
    img: "/Elavarasan R V.jpg",
    socials: { email: "mailto:[elavarasan5949@gmail.com]", linkedin: "https://www.linkedin.com/in/elavarasan-r-v-1a68072a3/", instagram: "https://www.instagram.com/call_me_arasan__?igsh=dzloM3czZHQ2bTZ2" },
    color: "#FFD700",
  },
  {
    name: "Disokumari R",
    role: "Event Coordinator Head",
    dept: "IT – 4th Year",
    bio: "Masterminding impactful events from initial concept to flawless execution.",
    img: "/Disokumari R.jpg",
    socials: { email: "mailto:[disokumari22@gmail.com]", linkedin: "https://www.linkedin.com/in/disokumari-r/", instagram: "https://www.instagram.com/dishooo._/" },
    color: "#E60000",
  },
  {
    name: "Dhanya S",
    role: "Event Coordinator",
    dept: "IT – 3rd Year",
    bio: "Managing on-the-ground logistics and ensuring every event runs smoothly.",
    img: "/Dhanya S.jpg",
    socials: { email: "mailto:[dhanyaselvaraj45@gmail.com]", linkedin: "https://www.linkedin.com/in/dhanya-s-2ba3a838b/", instagram: "https://www.instagram.com/_dhanya__29?igsh=MWw1cDE0ZGJpNXkzeg==" },
    color: "#FFD700",
  },
  {
    name: "Jothipriya P",
    role: "Event Coordinator",
    dept: "IT – 2nd Year",
    bio: "Managing on-the-ground logistics and ensuring every event runs smoothly.",
    img: "/Jothipriya P.jpg",
    socials: { email: "mailto:[jothipriyaprabhu007@gmail.com]", linkedin: "https://www.linkedin.com/in/p-jothipriya-prabu-574967429/", instagram: "https://www.instagram.com/priyaprabu_07/" },
    color: "#E60000",
  },
  {
    name: "Jogesh Joshua S",
    role: "Technical Head",
    dept: "IT – 4th Year",
    bio: "Directing technological innovation and overseeing project architectures.",
    img: "/Jogesh Joshua S.jpg",
    socials: { email: "mailto:[jogeshjoshua01@gmail.com]", linkedin: "https://www.linkedin.com/in/jogesh-joshua-603598267/", instagram: "https://www.instagram.com/__x.__joe__.x__/" },
    color: "#FFD700",
  },
  {
    name: "Dheebak B",
    role: "Technical Head",
    dept: "IT – 4th Year",
    bio: "Directing technological innovation and overseeing project architectures.",
    img: "/Dheebak B.jpg",
    socials: { email: "mailto:[b.dheebak143@gmail.com]", linkedin: "https://www.linkedin.com/in/deepak-deepak-7089902a2/", instagram: "https://www.instagram.com/dheebak_143/" },
    color: "#E60000",
  },
  {
    name: "Yashika P",
    role: "Technical Lead",
    dept: "IT – 3rd Year",
    bio: "Guiding the development team and executing the core technical vision.",
    img: "/Yashika P.jpg",
    socials: { email: "mailto:[yashikaperiyasamy196@gmail.com]", linkedin: "https://www.linkedin.com/in/yashika-p-741172380/", instagram: "https://www.instagram.com/purple_heart_1111?utm_source=qr&igsh=YjJjdG9mdG9qdGo1" },
    color: "#FFD700",
  },
  {
    name: "Gowrisan B",
    role: "Technical Lead",
    dept: "IT – 2nd Year",
    bio: "Guiding the development team and executing the core technical vision.",
    img: "/Gowrisan B.jpg",
    socials: { email: "mailto:[gowrisan006@gmail.com]", linkedin: "https://www.linkedin.com/in/gowrisan-b-b33367402/", instagram: "https://www.instagram.com/alone_my_favorite/" },
    color: "#E60000",
  },
  {
    name: "Manoharan M",
    role: "Designing Head",
    dept: "IT – 4th Year",
    bio: "Shaping the visual identity and leading the overall creative direction.",
    img: "/Manoharan M.jpg",
    socials: { email: "mailto:[manoharan.m.designing@gmail.com]", linkedin: "https://www.linkedin.com/in/manoharanin/", instagram: "https://www.instagram.com/sad_boy_fx?igsh=cDVvZm4yaTdnZjRq" },
    color: "#FFD700",
  },
  {
    name: "Poovarasan R",
    role: "Designing Lead",
    dept: "IT – 3rd Year",
    bio: "Directing the narrative and visual flow of all media productions.",
    img: "/Poovarasan R.jpg",
    socials: { email: "mailto:[sanjayram5957@gmail.com]", linkedin: "https://www.linkedin.com/in/poovarasan-r-845b0137b/", instagram: "https://www.instagram.com/sxnjuz.offixl?igsh=bjBrMTg1eXFlNTdm&utm_source=qr" },
    color: "#E60000",
  },
  {
    name: "Benial Jayapandiyan J",
    role: "Designing Lead",
    dept: "IT – 3rd Year",
    bio: "Crafting stunning visual assets and guiding the design workflow.",
    img: "/Benial Jayapandiyan J.jpg",
    socials: { email: "mailto:[benialbenial7@gmail.com]", linkedin: "https://www.linkedin.com/in/benial-j-18917b358/", instagram: "https://www.instagram.com/nason____?igsh=OGt1NWVza2dzaGM2&igsi=OGt1NWVza2dzaGM2" },
    color: "#FFD700",
  },
  {
    name: "Ragulan B",
    role: "Designing Lead",
    dept: "IT – 2nd Year",
    bio: "Crafting stunning visual assets and guiding the design workflow.",
    img: "/Ragulan B.jpg",
    socials: { email: "mailto:[ragulanb569@gmail.com]", linkedin: "https://www.linkedin.com/in/ragulan-b-060474402/", instagram: "https://www.instagram.com/.kiss_me_physco.?igsh=b2wxaTh5OXQ4MW5i&igsi=b2wxaTh5OXQ4MW5i" },
    color: "#E60000",
  },
  {
    name: "Nikish M",
    role: "Designing Lead",
    dept: "IT – 2nd Year",
    bio: "Crafting stunning visual assets and guiding the design workflow.",
    img: "/Nikish M.jpg",
    socials: { email: "mailto:[nikimohan12@gmail.com]", linkedin: "https://www.linkedin.com/in/nikish-m/", instagram: "https://www.instagram.com/nikix__12?igsh=MTVhMXB2OXluNDVtbA==" },
    color: "#FFD700",
  },
  {
    name: "Amarnath K",
    role: "Video Editing Head",
    dept: "IT – 3rd Year",
    bio: "Directing the narrative and visual flow of all media productions.",
    img: "/Amarnath K.jpg",
    socials: { email: "mailto:[kamarnath2007@gmail.com]", linkedin: "#", instagram: "https://www.instagram.com/_.sparkyy.___/" },
    color: "#E60000",
  },
  {
    name: "Sambathkumar C",
    role: "Video Editing Head",
    dept: "IT – 3rd Year",
    bio: "Crafting stunning visual assets and guiding the design workflow.",
    img: "/Sambathkumar C.jpg",
    socials: { email: "mailto:[sambathsambath09262@gmail.com]", linkedin: "#", instagram: "https://www.instagram.com/csk_kabaddi._.03/" },
    color: "#FFD700",
  },
  {
    name: "Tamil Selvan N",
    role: "Video Editing Lead",
    dept: "IT – 2nd Year",
    bio: "Producing polished, high-impact video content and motion graphics.",
    img: "/Tamil Selvan N.jpg",
    socials: { email: "mailto:[tamilsachin1435@gmail.com]", linkedin: "#", instagram: "https://www.instagram.com/tamilsachin___1435?igsh=MWZjNGM3OGE2Zno5ZQ==" },
    color: "#E60000",
  },
  {
    name: "Sanjai V A",
    role: "Video Editing Lead",
    dept: "IT – 2nd Year",
    bio: "Producing polished, high-impact video content and motion graphics.",
    img: "/Sanjay V A.jpg",
    socials: { email: "mailto:[sanjaianna2007@gmail.com]", linkedin: "https://www.linkedin.com/in/sanjai-v-a-3230383a9/", instagram: "https://www.instagram.com/sanxjai_?igsh=ZDltNG55ZGM3Y25s" },
    color: "#FFD700",
  },
  {
    name: "Yogesh Lal S J",
    role: "PRO Head",
    dept: "IT – 3rd Year",
    bio: "Leading public relations and shaping the organization's external voice.",
    img: "/Yogesh Lal S J.jpg",
    socials: { email: "mailto:[yogeshlalsj@gmail.com]", linkedin: "https://www.linkedin.com/in/yogesh-lal-s-j-329171380/", instagram: "https://www.instagram.com/its_me._.kalki?igsh=MTYxdTZhYmh1d2hhZQ==" },
    color: "#E60000",
  },
  {
    name: "Sakthi Sri Devi T",
    role: "PRO Lead",
    dept: "IT – 2nd Year",
    bio: "Driving outreach, engagement, and active community relations.",
    img: "/Sakthi Sri Devi T.jpg",
    socials: { email: "mailto:[sakthisridevithankavel@gmail.com]", linkedin: "https://www.linkedin.com/in/sakthi-sridevi-thankavel-6a44b4387/", instagram: "https://www.instagram.com/call_me_as_sakthi_papa/" },
    color: "#FFD700",
  },
  {
    name: "Kiruthika P",
    role: "Alumni Head",
    dept: "IT – 4th Year",
    bio: "Building lifelong connections and leveraging the alumni network.",
    img: "/Kiruthika P.jpg",
    socials: { email: "mailto:[kiruthika12027@gmail.com]", linkedin: "https://www.linkedin.com/in/kiruthikapalani/", instagram: "https://www.instagram.com/_.itzz_.lunazz/" },
    color: "#E60000",
  },
  {
    name: "Siva Guru R",
    role: "Alumni Lead",
    dept: "IT – 3rd Year",
    bio: "Engaging past members and fostering continuous community support.",
    img: "/Siva Guru R.jpg",
    socials: { email: "mailto:[sivagururama2006@gmail.com]", linkedin: "https://www.linkedin.com/in/guru-guru-a090a742a/", instagram: "https://www.instagram.com/2k__sivaguru._420?igsh=YWxrc21icGxvOW90&igsi=YWxrc21icGxvOW90&utm_so" },
    color: "#FFD700",
  },
  {
    name: "Saranya M",
    role: "Alumni Lead",
    dept: "IT – 2nd Year",
    bio: "Engaging past members and fostering continuous community support.",
    img: "/Saranya M.jpg",
    socials: { email: "mailto:[saranyamuniraj1409@gmail.com]", linkedin: "https://www.linkedin.com/in/saranya-saran-6b3a21390/", instagram: "https://www.instagram.com/_sarxnx.__/" },
    color: "#E60000",
  },
  {
    name: "Harilatha K",
    role: "Documentation Head",
    dept: "IT – 3rd Year",
    bio: "Archiving achievements and maintaining official institutional records.",
    img: "/Harilatha K.jpg",
    socials: { email: "mailto:[harilathak408@gmail.com]", linkedin: "https://www.linkedin.com/in/harilatha-k-66184a429/", instagram: "https://www.instagram.com/harilatha_3101?igsh=MWk5OXdnbTVpNHExbA==" },
    color: "#FFD700",
  },
  {
    name: "Kaviya M",
    role: "Documentation Lead",
    dept: "IT – 3rd Year",
    bio: "Capturing the journey through meticulous reporting and data tracking.",
    img: "/Kaviya M.jpg",
    socials: { email: "mailto:[mkaviya903@gmail.com]", linkedin: "https://www.linkedin.com/in/kaviya-m-92864b381/", instagram: "https://www.instagram.com/_kaavizz_006?igsh=MTAyNjZyYmdoc3YzMw==" },
    color: "#E60000",
  },
  {
    name: "Anagha U",
    role: "Documentation Lead",
    dept: "IT – 2nd Year",
    bio: "Capturing the journey through meticulous reporting and data tracking.",
    img: "/Anagha U.jpg",
    socials: { email: "mailto:[anaghaunnikrishnan32@gmail.com]", linkedin: "https://www.linkedin.com/in/anaghaunnikrishnan-undefined-960b5540a/", instagram: "#" },
    color: "#FFD700",
  },
  {
    name: "Hemavathi G",
    role: "Documentation Lead",
    dept: "IT – 2nd Year",
    bio: "Capturing the journey through meticulous reporting and data tracking.",
    img: "/Hemavathi G.jpg",
    socials: { email: "mailto:[hemavathi.h1811@gmail.com]", linkedin: "https://www.linkedin.com/in/hemavathi-hemavathi-355850429/", instagram: "https://www.instagram.com/hema_dhakshu/" },
    color: "#E60000",
  },
  {
    name: "Aathinath M",
    role: "Student Executive",
    dept: "IT – 4th Year",
    bio: "The dynamic core of the team, executing tasks and driving initiatives forward.",
    img: "/Aathinath M.jpg",
    socials: { email: "mailto:[aathi4733@gmail.com]", linkedin: "https://www.linkedin.com/in/aathi-aathi-8a19982a2/", instagram: "https://www.instagram.com/___axxdhi_06/" },
    color: "#FFD700",
  },
  {
    name: "Arputhavalli R",
    role: "Student Executive",
    dept: "IT – 4th Year",
    bio: "The dynamic core of the team, executing tasks and driving initiatives forward.",
    img: "/Arputhavalli R.jpg",
    socials: { email: "mailto:[rarputha81@gmail.com]", linkedin: "https://www.linkedin.com/in/arputhavalli-r-70082a2a3/", instagram: "https://www.instagram.com/arputha_ramachandran/" },
    color: "#E60000",
  },
  {
    name: "Naveen Kumar R",
    role: "Student Executive",
    dept: "IT – 3rd Year",
    bio: "The dynamic core of the team, executing tasks and driving initiatives forward.",
    img: "/Naveen Kumar R.jpg",
    socials: { email: "mailto:[naveen17172006@gmail.com]", linkedin: "https://www.linkedin.com/in/naveen-kumar-r-1122702a6/", instagram: "https://www.instagram.com/naveenn__17?igsh=MTg2NTdlOWlldjVrbw==" },
    color: "#FFD700",
  },
  {
    name: "Mahalakshmi R",
    role: "Student Executive",
    dept: "IT – 3rd Year",
    bio: "The dynamic core of the team, executing tasks and driving initiatives forward.",
    img: "/Mahalakshmi R.jpg",
    socials: { email: "mailto:[Lakshmi26092006@gmail.com]", linkedin: "https://www.linkedin.com/public-profile/settings/", instagram: "https://www.instagram.com/maha_stay_with_joy?igsh=MTZiZjYzbzljejNwMg==&igsi=MTZiZjYzbzljejNwMg==" },
    color: "#E60000",
  },
  {
    name: "Gnana Sekaran M",
    role: "Student Executive",
    dept: "IT – 2nd Year",
    bio: "The dynamic core of the team, executing tasks and driving initiatives forward.",
    img: "/Gnana Sekaran M.jpg",
    socials: { email: "mailto:[m.gnanasekaran8043@gmail.com]", linkedin: "https://www.linkedin.com/in/gnana-sekaran-2aa857429/", instagram: "https://www.instagram.com/empire__king__46/" },
    color: "#FFD700",
  },
  {
    name: "Girijeyam M",
    role: "Student Executive",
    dept: "IT – 2nd Year",
    bio: "The dynamic core of the team, executing tasks and driving initiatives forward.",
    img: "/Girijayam M.jpg",
    socials: { email: "mailto:[mveereshwari24@gmail.com]", linkedin: "https://www.linkedin.com/in/girijeyam-m-5130b642a/", instagram: "#" },
    color: "#E60000",
  },
  {
    name: "Dr. Palani K",
    role: "Chief Mentor",
    dept: "HoD/IT",
    bio: "Guiding the vision and nurturing the next generation of leaders.",
    img: "/Dr. Palani K.jpg",
    socials: { email: "mailto:[it.hod.infoengg@gmail.com]", linkedin: "https://www.linkedin.com/in/palani-kannan-m-e-ph-d-5b9a9065/" },
    color: "#FFD700",
  },
  {
    name: "Mr. Raja M",
    role: "Overall Coordinator",
    dept: "AP/IT",
    bio: "The central force aligning teams, operations, and strategic goals.",
    img: "/Mr. Raja M.jpg",
    socials: { email: "mailto:[kingrr20@gmail.com]", linkedin: "https://www.linkedin.com/in/raja-m-57b18b380/" },
    color: "#E60000",
  },
  {
    name: "Mr. Madheswaran K",
    role: "Staff Coordinator",
    dept: "AP/IT",
    bio: "Bridging student initiatives with expert faculty mentorship and institutional support.",
    img: "/Mr. Madheswaran K.jpg",
    socials: { email: "mailto:[Madeswaraninfoit@gmail.com]", linkedin: "https://www.linkedin.com/in/madheswaran-k-8846321a6/" },
    color: "#FFD700",
  },
  {
    name: "Mr. Arockia Selvaraj A",
    role: "Event Coordinator",
    dept: "AP/IT",
    bio: "Managing on-the-ground logistics and ensuring every event runs smoothly.",
    img: "/Mr. Arockia Selvaraj A.jpg",
    socials: { email: "mailto:[selva17.cbe@gmail.com]", linkedin: "https://www.linkedin.com/in/selvaraj17/" },
    color: "#E60000",
  },
  {
    name: "Mrs. Sundari P",
    role: "Technical Coordinator",
    dept: "AP/IT",
    bio: "Orchestrating the tools, technology, and teams to power our initiatives.",
    img: "/Mrs. Sundari P.jpg",
    socials: { email: "mailto:[sundarimuppal@gmail.com]", linkedin: "https://www.linkedin.com/in/sundari-muppal-6b2335225/" },
    color: "#FFD700",
  },
  {
    name: "Ms. Jreeja J",
    role: "Cultural Coordinator",
    dept: "AP/IT",
    bio: "Celebrating diversity and curating unforgettable artistic experiences.",
    img: "/Ms. Jreeja J.jpg",
    socials: { email: "mailto:[2002sreejaj@gmail.com]", linkedin: "https://www.linkedin.com/in/jreeja-j-081b19227/" },
    color: "#E60000",
  },
  {
    name: "Mrs.Swarna S",
    role: "Sports Coordinator",
    dept: "AP/IT",
    bio: "Driving athletic excellence, teamwork, and competitive spirit.",
    img: "/Mrs.Swarna S.jpg",
    socials: { email: "mailto:[swaran.sivakumar@gmail.com]", linkedin: "https://www.linkedin.com/in/swarna-sivakumar-793538356/" },
    color: "#FFD700",
  },
];

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const cardVariant = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

function MemberCard({ member }: { member: typeof coreCommittee[0] }) {
  const icons = {
    email: Mail,
    github: FaGithub,
    linkedin: FaLinkedinIn,
    instagram: FaInstagram,
    twitter: FaXTwitter
  };

  return (
    <div className="flip-card" style={{ height: "340px" }}>
      <div className="flip-card-inner">
        {/* Front */}
        <div className="flip-card-front bg-white/5 backdrop-blur-lg border border-white/10 hover:border-[#FFD700]/50 flex flex-col items-center justify-center p-6 text-center shadow-xl transition-all duration-300">
          <div className="relative w-24 h-24 rounded-full overflow-hidden mb-4 border-2"
            style={{ borderColor: member.color, boxShadow: `0 0 20px ${member.color}50` }}>
            <Image src={member.img} alt={member.name} fill className="object-cover" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
          </div>
          <h3 className="font-[family-name:var(--font-inter)] font-black text-white text-xl mb-1">{member.name}</h3>
          <div className="flex items-center gap-1.5 mb-1">
            <Crown size={12} style={{ color: member.color }} />
            <span className="font-[family-name:var(--font-inter)] font-semibold text-sm" style={{ color: member.color }}>
              {member.role}
            </span>
          </div>
          <span className="text-gray-500 text-xs font-[family-name:var(--font-roboto)]">{member.dept}</span>
          <div className="absolute bottom-3 text-[10px] text-gray-600 font-[family-name:var(--font-roboto)]">
            Hover for bio →
          </div>
        </div>

        {/* Back */}
        <div
          className="flip-card-back flex flex-col justify-start p-6 shadow-xl"
          style={{
            background: `linear-gradient(135deg, ${member.color}15, #050505)`,
            border: `1px solid ${member.color}40`,
          }}
        >
          {/* 1. TEXT SECTION */}
          <div>
            <h4 className="font-[family-name:var(--font-inter)] font-bold text-white text-lg mb-1">{member.name}</h4>
            <span className="text-xs font-semibold font-[family-name:var(--font-inter)]" style={{ color: member.color }}>
              {member.role}
            </span>
            <p className="font-[family-name:var(--font-roboto)] text-gray-300 text-sm leading-relaxed mt-4">{member.bio}</p>
          </div>

          {/* 2. PHYSICAL SPACER (Adjust the minHeight value here to make the gap bigger or smaller!) */}
          <div style={{ minHeight: "40px", width: "100%", flexShrink: 0 }}></div>

          {/* 3. SOCIALS SECTION (Removed the mt-8 so it only relies on the spacer above it) */}
          <div className="flex flex-col gap-5">
            {Object.entries(member.socials).map(([platform, value]) => {
              const Icon = icons[platform as keyof typeof icons];
              if (!Icon) return null;

              // Checks if the link is a simple string (just a URL) or an object with custom text
              const href = typeof value === "string" ? value : value.href;
              const label = typeof value === "string" ? platform.charAt(0).toUpperCase() + platform.slice(1) : value.label;

              return (
                <a
                  key={platform}
                  href={href}
                  className="flex items-center gap-3 text-gray-300 hover:text-[#FFD700] transition-colors duration-300 group w-fit"
                  aria-label={platform}
                >
                  <div className="w-8 h-8 bg-white/5 backdrop-blur-lg rounded-full flex items-center justify-center border border-white/10 group-hover:border-[#FFD700]/40 transition-all shrink-0">
                    <Icon size={14} />
                  </div>
                  <span className="text-xs font-[family-name:var(--font-roboto)] truncate max-w-[160px]">
                    {label}
                  </span>
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function MembersPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="w-full self-stretch"
      style={{ width: "100%", alignSelf: "stretch" }}
    >
      {/* Header */}
      <section style={{ width: "100%", maxWidth: "80rem", margin: "0 auto", padding: "5rem 2rem", display: "flex", flexDirection: "column", alignItems: "center", justifyItems: "center", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div className="absolute inset-0 bg-gradient-to-b from-[#FFD700]/5 to-transparent pointer-events-none" />
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="relative z-10">
          <span className="text-xs font-[family-name:var(--font-inter)] font-semibold tracking-[0.3em] text-[#FFD700] uppercase">
            The People
          </span>
          <h1 className="font-[family-name:var(--font-inter)] font-black text-5xl sm:text-7xl mt-4 mb-6 text-white">
            Meet the <span className="gradient-text">Team</span>
          </h1>
          <p className="font-[family-name:var(--font-roboto)] text-gray-400 max-w-xl mx-auto">
            The passionate individuals who drive InfiniT forward — building, organizing, and inspiring every day.
          </p>
        </motion.div>
      </section>

      {/* Core Committee */}
      <section style={{ width: "100%", maxWidth: "80rem", margin: "0 auto", padding: "3rem 2rem", display: "flex", flexDirection: "column", justifyContent: "center", position: "relative" }}>
        <motion.h2
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="font-[family-name:var(--font-inter)] font-black text-3xl text-white mb-10 flex items-center gap-3"
        >
          <span className="w-1 h-8 bg-gradient-to-b from-[#E60000] to-[#FFD700] rounded-full" />
          Core Committee 26-27
        </motion.h2>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 justify-items-center w-full"
        >
          {coreCommittee.map((member) => (
            <motion.div
              key={member.name}
              variants={cardVariant}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              style={{ filter: "drop-shadow(0 0 0 transparent)" }}
              className="group w-full"
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.filter = `drop-shadow(0 20px 40px ${member.color}30)`;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.filter = "drop-shadow(0 0 0 transparent)";
              }}
            >
              <MemberCard member={member} />
            </motion.div>
          ))}
        </motion.div>
      </section>
    </motion.div>
  );
}