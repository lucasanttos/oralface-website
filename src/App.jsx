import React, { useState, useEffect, useRef } from 'react';
import { 
  Phone, 
  MapPin, 
  Clock, 
  Menu, 
  X, 
  Stethoscope, 
  Smile, 
  HeartPulse, 
  Brain, 
  Activity, 
  CheckCircle,
  ArrowRight,
  Star,
  ShieldCheck,
  Zap,
  Code,
  Instagram,
  MessageCircle,
  Minimize2,
  ExternalLink,
  CreditCard,
  User,
  Info
} from 'lucide-react';

/**
 * ==================================================================================
 * [1] HOOKS E COMPONENTES VISUAIS (LÓGICA DE ANIMAÇÃO)
 * ==================================================================================
 */

// Hook para animar números
const useCounter = (end, duration = 2000, start = 0) => {
  const [count, setCount] = useState(start);
  const countRef = useRef(start);
  const [hasStarted, setHasStarted] = useState(false);

  const startCount = () => {
    if (hasStarted) return;
    setHasStarted(true);
    let startTime = null;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const currentCount = Math.floor(progress * (end - start) + start);
      setCount(currentCount);
      if (progress < 1) window.requestAnimationFrame(step);
    };
    window.requestAnimationFrame(step);
  };
  return { count, startCount };
};

// Componente: Revelar ao Rolar
const Reveal = ({ children, delay = 0, direction = 'up', className = "", fullWidth = false }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  const getTransform = () => {
    if (!isVisible) {
      switch (direction) {
        case 'up': return 'translate-y-16 opacity-0';
        case 'down': return '-translate-y-16 opacity-0';
        case 'left': return '-translate-x-16 opacity-0';
        case 'right': return 'translate-x-16 opacity-0';
        case 'zoom': return 'scale-90 opacity-0';
        default: return 'translate-y-16 opacity-0';
      }
    }
    return 'translate-x-0 translate-y-0 scale-100 opacity-100';
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -50px 0px" }
    );
    if (ref.current) observer.observe(ref.current);
    return () => ref.current && observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`transition-all duration-1000 cubic-bezier(0.17, 0.55, 0.55, 1) ${getTransform()} ${className} ${fullWidth ? 'w-full' : ''}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
};

// Componente: Estatística Animada
const AnimatedStat = ({ end, label, suffix = "" }) => {
  const { count, startCount } = useCounter(end);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) startCount();
    }, { threshold: 0.5 });
    if (ref.current) observer.observe(ref.current);
    return () => ref.current && observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="text-center group">
      <div className="text-4xl lg:text-5xl font-extrabold text-blue-900 mb-2 group-hover:scale-110 transition-transform duration-300">{count}{suffix}</div>
      <div className="text-sm text-slate-500 font-medium uppercase tracking-wider">{label}</div>
    </div>
  );
};

// Componente: Botão Premium
const PremiumButton = ({ children, variant = 'primary', icon: Icon, onClick, className = "" }) => {
  const baseStyle = "relative overflow-hidden px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-2 group";
  const variants = {
    primary: "bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 ring-1 ring-blue-400/20",
    secondary: "bg-white text-blue-900 border border-slate-200 shadow-lg hover:shadow-xl hover:border-blue-200",
    urgent: "bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg shadow-red-500/30 hover:shadow-red-500/50"
  };

  return (
    <button onClick={onClick} className={`${baseStyle} ${variants[variant]} ${className}`}>
      <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmer" />
      <span className="relative z-10 flex items-center gap-2">{children}{Icon && <Icon size={20} className="group-hover:translate-x-1 transition-transform" />}</span>
    </button>
  );
};

// Componente: Popup do Desenvolvedor
const DeveloperPopup = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  useEffect(() => {
    const showTimer = setTimeout(() => setIsVisible(true), 4000);
    const minimizeTimer = setTimeout(() => setIsMinimized(true), 9000);
    return () => { clearTimeout(showTimer); clearTimeout(minimizeTimer); };
  }, []);

  if (!isVisible) return null;
  if (isMinimized) return <div onClick={() => setIsMinimized(false)} className="fixed bottom-4 right-4 z-[100] bg-slate-900 text-white p-3 rounded-full shadow-2xl cursor-pointer hover:scale-110 transition-transform animate-bounce-slow border border-slate-700" title="Desenvolvido por UiCode.dev"><Code size={20} className="text-blue-400" /></div>;

  return (
    <div className="fixed bottom-4 right-4 z-[100] animate-slideUp">
      <div className="bg-slate-900/95 backdrop-blur-md text-white p-5 rounded-2xl shadow-2xl border border-slate-700 max-w-sm w-full relative group">
        <div className="flex justify-between items-start mb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-tr from-blue-600 to-purple-600 rounded-lg flex items-center justify-center font-bold font-mono text-xs">Ui</div>
            <div><p className="font-bold text-sm">Desenvolvido por UiCode.dev</p><p className="text-[10px] text-slate-400">Soluções Digitais Premium</p></div>
          </div>
          <button onClick={(e) => { e.stopPropagation(); setIsMinimized(true); }} className="text-slate-400 hover:text-white transition-colors bg-white/5 p-1 rounded hover:bg-white/10"><Minimize2 size={14} /></button>
        </div>
        <p className="text-xs text-slate-300 mb-4 leading-relaxed border-t border-slate-800 pt-2">Gostou deste site? Crie uma presença digital profissional para o seu negócio hoje mesmo.</p>
        <div className="flex gap-2">
          <a href="https://instagram.com/uicode.dev" target="_blank" rel="noopener noreferrer" className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-bold py-2 rounded-lg flex items-center justify-center gap-1.5 hover:opacity-90 transition-opacity"><Instagram size={14} /> @uicode.dev</a>
          <a href="https://wa.me/5511916474626" target="_blank" rel="noopener noreferrer" className="flex-1 bg-green-600 text-white text-xs font-bold py-2 rounded-lg flex items-center justify-center gap-1.5 hover:bg-green-500 transition-colors"><MessageCircle size={14} /> WhatsApp</a>
        </div>
      </div>
    </div>
  );
};

// Componente: Modal de Detalhes do Serviço
const ServiceModal = ({ service, onClose }) => {
  if (!service) return null;
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-fadeIn" onClick={onClose}>
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden animate-scaleIn relative" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 bg-white/50 hover:bg-white p-2 rounded-full text-slate-600 hover:text-slate-900 transition-all z-20 shadow-sm backdrop-blur-sm"><X size={24} /></button>
        <div className={`${service.bg} p-8 relative overflow-hidden`}>
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          <div className="flex items-center gap-4 relative z-10">
            <div className={`w-16 h-16 rounded-2xl bg-white shadow-lg flex items-center justify-center ${service.color}`}>{service.icon}</div>
            <div><h3 className="text-2xl md:text-3xl font-bold text-slate-800">{service.title}</h3>{service.urgent && <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full uppercase font-bold tracking-wide mt-2 inline-block">Atendimento 24h</span>}</div>
          </div>
        </div>
        <div className="p-8 max-h-[60vh] overflow-y-auto">
          <div className="mb-8"><h4 className="flex items-center gap-2 text-lg font-bold text-slate-800 mb-3"><Info size={20} className="text-blue-500" /> Como Funciona</h4><p className="text-slate-600 leading-relaxed text-justify">{service.longDescription}</p></div>
          <div>
            <h4 className="flex items-center gap-2 text-lg font-bold text-slate-800 mb-4"><CheckCircle size={20} className="text-green-500" /> Principais Benefícios</h4>
            <div className="grid md:grid-cols-2 gap-3">{service.benefits.map((benefit, idx) => <div key={idx} className="flex items-start gap-3 bg-slate-50 p-3 rounded-xl border border-slate-100"><div className={`w-2 h-2 rounded-full mt-2 shrink-0 ${service.bg.replace('bg-', 'bg-')}-500 bg-blue-500`}></div><span className="text-sm text-slate-700 font-medium">{benefit}</span></div>)}</div>
          </div>
          <div className="mt-8 pt-6 border-t border-slate-100 flex justify-end"><a href={`https://wa.me/5584996333183?text=${encodeURIComponent(`Olá, gostaria de saber mais sobre ${service.title}.`)}`} target="_blank" rel="noopener noreferrer" className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-green-500/30 transition-all flex items-center gap-2"><MessageCircle size={18} /> Agendar Avaliação</a></div>
        </div>
      </div>
    </div>
  );
};

/**
 * ==================================================================================
 * [2] DADOS DO SITE
 * ==================================================================================
 */

const services = [
  {
    title: "Urgência 24h",
    description: "Atendimento imediato para dor, traumas e fraturas. Equipe sempre de prontidão.",
    longDescription: "Nosso serviço de urgência funciona ininterruptamente para garantir que você nunca fique desamparado em momentos de dor aguda. Realizamos desde drenagem de abcessos, reimplantes dentários após traumas, até o alívio imediato de dores de dente intensas. A triagem é rápida e prioriza casos de maior gravidade.",
    benefits: ["Alívio imediato da dor", "Prevenção de infecções graves", "Equipe multidisciplinar de plantão", "Estrutura completa de raio-x no local"],
    icon: <Zap className="w-8 h-8" />,
    color: "text-red-500",
    bg: "bg-red-50",
    urgent: true
  },
  {
    title: "Odontologia",
    description: "Estética, implantes e clínica geral com equipamentos de última geração.",
    longDescription: "Oferecemos um cuidado odontológico completo, focado não apenas na estética, mas na saúde funcional da sua boca. Utilizamos materiais de alta durabilidade para restaurações e tecnologias digitais para planejamento de sorrisos e implantes, garantindo precisão e conforto.",
    benefits: ["Sorriso estético e harmonioso", "Materiais de última geração", "Tratamentos menos invasivos", "Saúde gengival e prevenção de cáries"],
    icon: <Smile className="w-8 h-8" />,
    color: "text-blue-500",
    bg: "bg-blue-50",
    urgent: false
  },
  {
    title: "Medicina Clínica",
    description: "Diagnósticos precisos e encaminhamentos com médicos experientes.",
    longDescription: "Nossa clínica médica atua como o pilar central da sua saúde. Realizamos consultas detalhadas para entender seu histórico, exames físicos completos e, quando necessário, encaminhamento para especialistas. O foco é no diagnóstico precoce e na manutenção da saúde preventiva.",
    benefits: ["Olhar integral sobre o paciente", "Diagnósticos rápidos e precisos", "Acompanhamento de doenças crônicas", "Prevenção e promoção de saúde"],
    icon: <Stethoscope className="w-8 h-8" />,
    color: "text-teal-500",
    bg: "bg-teal-50",
    urgent: false
  },
  {
    title: "Enfermagem",
    description: "Cuidados pós-operatórios, vacinas e procedimentos ambulatoriais.",
    longDescription: "O setor de enfermagem oferece suporte essencial com procedimentos seguros e humanizados. Desde a aplicação de injetáveis e vacinas até a realização de curativos complexos e retirada de pontos, nossa equipe garante que sua recuperação seja tranquila e livre de infecções.",
    benefits: ["Procedimentos com biossegurança total", "Mãos leves e cuidado humanizado", "Monitoramento de sinais vitais", "Orientações claras para cuidados em casa"],
    icon: <HeartPulse className="w-8 h-8" />,
    color: "text-rose-500",
    bg: "bg-rose-50",
    urgent: false
  },
  {
    title: "Saúde Mental",
    description: "Psicologia e terapia integrativa para o seu bem-estar emocional.",
    longDescription: "Acreditamos que a saúde mental é inseparável da saúde física. Nossos psicólogos utilizam abordagens como a TCC (Terapia Cognitivo Comportamental) para ajudar no tratamento de ansiedade, depressão, fobias e no desenvolvimento de inteligência emocional, tanto para adultos quanto para crianças.",
    benefits: ["Autoconhecimento e equilíbrio", "Ferramentas para lidar com ansiedade", "Melhora nos relacionamentos interpessoais", "Espaço seguro e sigiloso"],
    icon: <Brain className="w-8 h-8" />,
    color: "text-violet-500",
    bg: "bg-violet-50",
    urgent: false
  },
  {
    title: "Reabilitação",
    description: "Fisioterapia especializada para recuperação de movimentos e dores.",
    longDescription: "Nossa fisioterapia foca na recuperação funcional e no alívio da dor sem uso excessivo de medicamentos. Tratamos desde lesões esportivas e dores nas costas até reabilitação pós-cirúrgica, utilizando terapia manual, exercícios assistidos e equipamentos de eletroterapia.",
    benefits: ["Alívio de dores crônicas e agudas", "Recuperação da mobilidade", "Fortalecimento muscular direcionado", "Prevenção de novas lesões"],
    icon: <Activity className="w-8 h-8" />,
    color: "text-orange-500",
    bg: "bg-orange-50",
    urgent: false
  }
];

const teamMembers = [
  {
    name: "Ana Kaelina",
    role: "Enfermeira",
    specialty: "Especialista em Saúde da Mulher",
    details: ["Consulta Ginecológica", "Preventivo (Papanicolau)", "Testes Rápidos", "Beta HCG", "PH Vaginal"],
    color: "text-pink-500",
    bg: "bg-pink-50",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=2070&auto=format&fit=crop"
  },
  {
    name: "Mikeronne Filho",
    role: "Fisioterapeuta",
    specialty: "Reabilitação da Coluna Vertebral",
    details: ["Traumato-ortopédica", "Geriatria", "Fisioterapia Esportiva", "Neurológica", "Terapia Manual"],
    color: "text-emerald-600",
    bg: "bg-emerald-50",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=2070&auto=format&fit=crop"
  },
  {
    name: "Juliana Maurício",
    role: "Enfermeira",
    specialty: "Consultora Materno Infantil",
    details: ["Furo de Orelha Humanizado", "Consultoria em Amamentação", "Lobuloplastia sem cortes"],
    color: "text-rose-500",
    bg: "bg-rose-50",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1976&auto=format&fit=crop"
  },
  {
    name: "Dra. Samily Izídio",
    role: "Cirurgiã-Dentista",
    specialty: "Clínica Geral e Estética",
    details: ["Restaurações", "Limpeza Dental", "Extração Dental", "Clareamento"],
    color: "text-blue-500",
    bg: "bg-blue-50",
    image: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=2068&auto=format&fit=crop"
  },
  {
    name: "Layanna Fernandes",
    role: "Psicóloga Clínica",
    specialty: "Terapia Cognitivo Comportamental",
    details: ["Atendimento Infantil", "Atendimento Adulto", "Abordagem TCC"],
    color: "text-violet-500",
    bg: "bg-violet-50",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1976&auto=format&fit=crop"
  },
  {
    name: "Dra. Maria Eduarda",
    role: "Médica Generalista",
    specialty: "Clínica Médica",
    details: ["Consultas de Rotina", "Visita Domiciliar", "Doenças Agudas e Crônicas", "Prevenção em Saúde"],
    color: "text-teal-600",
    bg: "bg-teal-50",
    image: "public/dr.jpeg"
  },
  {
    name: "Dr. Caio Trindade",
    role: "Cirurgião-Dentista",
    specialty: "Endodontia e Reabilitação Oral",
    details: ["Tratamento de Canal", "Prótese Dentária", "Facetas em Resina", "Lentes de Contato"],
    color: "text-cyan-600",
    bg: "bg-cyan-50",
    image: "https://images.unsplash.com/photo-1612349316228-5942a9b489c2?q=80&w=2070&auto=format&fit=crop"
  }
];

const insurances = [
  { name: "Brasildental", bg: "bg-yellow-400", text: "text-blue-900", border: "border-yellow-500", hover: "group-hover:shadow-yellow-200" },
  { name: "Odontoprev", bg: "bg-blue-700", text: "text-white", border: "border-blue-800", hover: "group-hover:shadow-blue-200" },
  { name: "Humana Odonto", bg: "bg-white", text: "text-blue-600", border: "border-blue-200", hover: "group-hover:shadow-blue-100", extraClasses: "ring-1 ring-blue-100" },
  { name: "Bradesco Dental", bg: "bg-red-600", text: "text-white", border: "border-red-700", hover: "group-hover:shadow-red-200" }
];

const navLinks = [
  { label: 'Início', id: 'home' },
  { label: 'A Clínica', id: 'about' },
  { label: 'Especialidades', id: 'services' },
  { label: 'Equipe', id: 'team' },
  { label: 'Contato', id: 'contact' }
];

/**
 * ==================================================================================
 * [3] COMPONENTE PRINCIPAL
 * ==================================================================================
 */
export default function OralFaceWebsite() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [selectedService, setSelectedService] = useState(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({
        x: (e.clientX / window.innerWidth) * 20 - 10,
        y: (e.clientY / window.innerHeight) * 20 - 10
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const smoothScrollTo = (targetPosition, duration) => {
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;
    const easeInOutQuad = (t, b, c, d) => {
      t /= d / 2;
      if (t < 1) return c / 2 * t * t + b;
      t--;
      return -c / 2 * (t * (t - 2) - 1) + b;
    };
    const animation = (currentTime) => {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const run = easeInOutQuad(timeElapsed, startPosition, distance, duration);
      window.scrollTo(0, run);
      if (timeElapsed < duration) requestAnimationFrame(animation);
    };
    requestAnimationFrame(animation);
  };

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 90;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      smoothScrollTo(offsetPosition, 1000);
    }
    setIsMobileMenuOpen(false);
  };

  const getButtonName = (name) => {
    const parts = name.split(" ");
    if (parts[0].toLowerCase().includes("dr")) return `${parts[0]} ${parts[1]}`;
    return parts[0];
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 overflow-x-hidden selection:bg-blue-200 selection:text-blue-900">
      
      <DeveloperPopup />
      <ServiceModal service={selectedService} onClose={() => setSelectedService(null)} />

      {/* TOP BAR */}
      <div className={`bg-slate-900 text-slate-300 transition-all duration-500 hidden md:block border-b border-slate-800 overflow-hidden ${scrolled ? 'h-0 py-0 opacity-0' : 'h-auto py-2.5 opacity-100'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center text-xs md:text-sm">
          <div className="flex items-center space-x-8">
            <span className="flex items-center gap-2 hover:text-white transition-colors cursor-pointer group"><Phone size={14} className="text-blue-400 group-hover:animate-pulse" /> (84) 99633-3183</span>
            <span className="flex items-center gap-2 hover:text-white transition-colors cursor-pointer"><MapPin size={14} className="text-blue-400" /> Rua Otávio Lamartine, 138, SP do Potengi/RN</span>
          </div>
          <div className="flex items-center gap-2 font-bold text-emerald-400 bg-emerald-500/10 px-3 py-0.5 rounded-full animate-pulse"><Clock size={14} /> Plantão 24 Horas</div>
        </div>
      </div>

      {/* NAVBAR */}
      <header className={`fixed w-full top-0 z-50 transition-all duration-500 border-b ease-in-out ${scrolled ? 'bg-white/80 backdrop-blur-md py-2 shadow-lg border-slate-200/50' : 'bg-white py-6 border-transparent'} ${!scrolled && 'md:mt-[40px]'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className={`flex items-center gap-2.5 cursor-pointer group transition-transform duration-500 origin-left ${scrolled ? 'scale-90' : 'scale-100'}`} onClick={() => scrollToSection('home')}>
            <div className="relative">
              <div className="w-10 h-10 bg-blue-00 rounded-xl flex items-center justify-center text-white font-bold text-xl relative z-10 transition-transform group-hover:scale-110"><img src="public/logo-fotor-20251207154553.png" alt="" /></div>
              <div className="absolute inset-0 bg-blue-400 blur-lg opacity-40 group-hover:opacity-70 transition-opacity"></div>
            </div>
            <div><h1 className="text-2xl font-bold text-slate-800 leading-none tracking-tight">OralFace</h1><p className="text-[10px] text-blue-600 font-bold tracking-[0.3em] uppercase">Premium Care</p></div>
          </div>
          <nav className="hidden md:flex items-center space-x-1 text-sm font-semibold text-slate-600">
            {navLinks.map((item) => (
              <button key={item.label} onClick={() => scrollToSection(item.id)} className="px-4 py-2 rounded-lg hover:bg-slate-50 hover:text-blue-600 transition-all relative group overflow-hidden">
                <span className="relative z-10">{item.label}</span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
              </button>
            ))}
            <div className={`pl-4 transition-all duration-500 ${scrolled ? 'scale-90' : 'scale-100'}`}>
              <button className="bg-red-500 hover:bg-red-600 text-white px-6 py-2.5 rounded-full font-bold shadow-lg shadow-red-500/30 hover:shadow-red-500/50 transition-all transform hover:-translate-y-0.5 flex items-center gap-2 text-sm group"><Phone size={16} className="group-hover:rotate-12 transition-transform" /> Urgência</button>
            </div>
          </nav>
          <button className="md:hidden p-2 text-slate-800" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}><X /> : <Menu /></button>
        </div>
        <div className={`md:hidden absolute w-full bg-white border-t transition-all duration-300 overflow-hidden ${isMobileMenuOpen ? 'max-h-96 opacity-100 shadow-xl' : 'max-h-0 opacity-0'}`}>
          <div className="flex flex-col p-6 space-y-4 font-medium text-slate-600">
            {navLinks.map((item) => <button key={item.label} onClick={() => scrollToSection(item.id)} className="text-left p-2 hover:bg-slate-50 rounded">{item.label}</button>)}
            <div className="p-2 border-t border-slate-100 mt-2"><p className="text-xs text-slate-400 font-bold uppercase mb-2">Convênios Aceitos</p><div className="flex flex-wrap gap-2">{insurances.map((item, index) => <span key={index} className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded border border-slate-200">{item.name}</span>)}</div></div>
            <button className="bg-red-50 text-red-600 font-bold p-3 rounded-lg text-center border border-red-100">Ligar para Urgência</button>
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section id="home" className="relative pt-40 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-slate-900">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-900 via-slate-900 to-slate-950"></div>
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none transition-transform duration-100 ease-out" style={{ transform: `translate(${mousePos.x * -2}px, ${mousePos.y * -2}px)` }}></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-teal-500/10 rounded-full blur-[100px] pointer-events-none transition-transform duration-100 ease-out" style={{ transform: `translate(${mousePos.x * 2}px, ${mousePos.y * 2}px)` }}></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <Reveal direction="down" delay={100}>
                <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/10 px-4 py-1.5 rounded-full text-sm font-semibold text-blue-200 shadow-xl">
                  <Star size={14} className="text-yellow-400 fill-yellow-400" /> <span>Clínica Integrada Premium</span>
                </div>
              </Reveal>
              <Reveal direction="left" delay={300}>
                <h2 className="text-5xl lg:text-7xl font-extrabold text-white leading-[1.1] tracking-tight">Saúde e Sorriso <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-400">Em Perfeita Sintonia</span></h2>
              </Reveal>
              <Reveal direction="up" delay={500}>
                <p className="text-lg text-slate-300 max-w-lg leading-relaxed border-l-4 border-blue-500 pl-6">Experimente o novo padrão em cuidados integrados. Odontologia, Medicina e Bem-estar com tecnologia de ponta e o conforto que você merece.</p>
              </Reveal>
              <Reveal direction="up" delay={700}>
                <div className="flex flex-col sm:flex-row gap-4 pt-2">
                  <PremiumButton variant="primary" icon={ArrowRight}>Agendar Consulta</PremiumButton>
                  <PremiumButton variant="secondary" onClick={() => scrollToSection('services')}>Conhecer Serviços</PremiumButton>
                </div>
              </Reveal>
            </div>
            
            <Reveal direction="right" delay={400}>
              <div className="relative hidden lg:block perspective-1000">
                <div className="relative z-20 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 p-2 rounded-3xl shadow-2xl transform transition-transform duration-200 ease-out hover:rotate-y-2 hover:rotate-x-2" style={{ transform: `rotateY(${mousePos.x * 0.5}deg) rotateX(${mousePos.y * -0.5}deg)` }}>
                  <div className="aspect-[4/3] bg-slate-800 rounded-2xl overflow-hidden relative">
                    <div className="absolute inset-0 bg-gradient-to-tr from-blue-600 to-teal-600 opacity-20"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                        
                        {/* --- FOTO DE DESTAQUE (HERO) --- 
                            Substitua a URL abaixo pela imagem principal da clínica ou de uma modelo sorrindo.
                        */}
                        <img 
                          src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=2080&auto=format&fit=crop" 
                          alt="Profissional OralFace" 
                          className="w-full h-full object-cover"
                        />

                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="py-20 bg-white relative z-20 -mt-10 rounded-t-[3rem] shadow-[0_-20px_40px_rgba(0,0,0,0.05)]">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-slate-100">
            <AnimatedStat end={12} label="Anos de História" suffix="+" />
            <AnimatedStat end={50} label="Especialistas" suffix="" />
            <AnimatedStat end={15} label="Mil Pacientes" suffix="k" />
            <AnimatedStat end={100} label="Satisfação" suffix="%" />
          </div>
        </div>
      </section>

      {/* SERVICES SECTION */}
      <section id="services" className="py-24 bg-slate-50">
        <div className="container mx-auto px-6">
          <Reveal direction="up">
            <div className="text-center max-w-3xl mx-auto mb-20">
              <span className="text-blue-600 font-bold tracking-widest uppercase text-sm mb-3 block">Nossa Expertise</span>
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight">Soluções Completas de Saúde</h2>
              <p className="text-slate-600 text-lg leading-relaxed">Uma abordagem 360º que une tecnologia avançada e humanização para resultados superiores.</p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Reveal key={index} delay={index * 100} direction="up">
                <div className="group relative bg-white rounded-3xl p-8 shadow-sm hover:shadow-2xl hover:shadow-blue-900/10 transition-all duration-500 border border-slate-100 h-full overflow-hidden hover:-translate-y-2">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700"></div>
                  <div className={`w-16 h-16 rounded-2xl ${service.bg} ${service.color} flex items-center justify-center mb-6 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3`}>
                    {service.icon}
                  </div>
                  <h4 className="text-2xl font-bold mb-3 text-slate-800 flex items-center justify-between">
                    {service.title}
                    {service.urgent && <span className="bg-red-500 text-white text-[10px] px-2 py-1 rounded-full uppercase font-bold tracking-wide shadow-red-200 shadow-md animate-pulse">24h</span>}
                  </h4>
                  <p className="text-slate-600 leading-relaxed mb-8">{service.description}</p>
                  
                  <button onClick={() => setSelectedService(service)} className="flex items-center text-sm font-bold text-slate-400 group-hover:text-blue-600 transition-colors cursor-pointer gap-2">
                    Saiba mais <ArrowRight size={16} className="transform group-hover:translate-x-2 transition-transform" />
                  </button>
                  <div className={`absolute -bottom-8 -right-8 w-32 h-32 rounded-full opacity-0 group-hover:opacity-10 transition-opacity duration-500 ${service.bg}`}></div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* TEAM SECTION */}
      <section id="team" className="py-24 bg-white border-t border-slate-100">
        <div className="container mx-auto px-6">
          <Reveal direction="up">
            <div className="text-center max-w-3xl mx-auto mb-20">
              <span className="text-blue-600 font-bold tracking-widest uppercase text-sm mb-3 block">Nosso Time</span>
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight">Especialistas de Alta Performance</h2>
              <p className="text-slate-600 text-lg leading-relaxed">Conheça os profissionais que dedicam conhecimento e cuidado para transformar sua saúde.</p>
            </div>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <Reveal key={index} delay={index * 100} direction="up">
                <div className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-blue-900/10 transition-all duration-500 border border-slate-100 flex flex-col h-full hover:-translate-y-2">
                  <div className={`aspect-[3/4] w-full ${member.bg} flex items-center justify-center relative overflow-hidden`}>
                    {member.image ? <img src={member.image} alt={member.name} className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105" /> : <div className={`w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg ${member.color}`}><User size={40} /></div>}
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="mb-4 text-center">
                      <h4 className="text-xl font-bold text-slate-800 mb-1">{member.name}</h4>
                      <p className={`text-sm font-bold uppercase tracking-wide ${member.color}`}>{member.role}</p>
                      <p className="text-xs text-slate-400 mt-1 font-medium">{member.specialty}</p>
                    </div>
                    <div className="mt-auto pt-4 border-t border-slate-100">
                      <p className="text-xs font-bold text-slate-400 mb-3 uppercase tracking-wider">Procedimentos:</p>
                      <ul className="space-y-2 mb-4">
                        {member.details.slice(0, 4).map((detail, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm text-slate-600"><CheckCircle size={14} className={`shrink-0 mt-0.5 ${member.color}`} /><span className="leading-tight">{detail}</span></li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <a href={`https://wa.me/5584996333183?text=${encodeURIComponent(`Olá, gostaria de agendar uma consulta com ${member.name}.`)}`} target="_blank" rel="noopener noreferrer" className="bg-green-500 hover:bg-green-600 text-white p-4 text-center text-sm font-bold transition-all duration-300 flex items-center justify-center gap-2">
                    <MessageCircle size={18} /> Agendar com {getButtonName(member.name)}
                  </a>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section id="about" className="py-24 bg-slate-50 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/graphy.png')]"></div>
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <Reveal direction="right">
              <div className="relative">
                <div className="absolute inset-0 bg-blue-600 rounded-[3rem] rotate-3 opacity-10"></div>
                <div className="bg-slate-200 rounded-[3rem] h-[500px] w-full relative overflow-hidden shadow-2xl z-10 group">
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent z-10"></div>
                  <div className="absolute bottom-8 left-8 z-20 text-white"><p className="font-bold text-xl">Estrutura Moderna</p><p className="text-slate-200 text-sm">Equipamentos de Tomografia 3D</p></div>
                  
                  <div className="w-full h-full bg-slate-300 flex items-center justify-center text-slate-500 group-hover:scale-105 transition-transform duration-700">
                    {/* --- FOTO DA ESTRUTURA (SOBRE NÓS) --- 
                        Substitua a URL abaixo pela foto da fachada ou da recepção da clínica.
                    */}
                    <img 
                      src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=2053&auto=format&fit=crop" 
                      alt="Estrutura da Clínica OralFace" 
                      className="w-full h-full object-cover"
                    />
                  </div>

                </div>
              </div>
            </Reveal>
            <Reveal direction="left" delay={200}>
              <div className="space-y-8">
                <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 leading-tight">Um novo conceito de <span className="text-blue-600">cuidado integrado</span>.</h2>
                <p className="text-slate-600 text-lg leading-relaxed">A OralFace rompe as barreiras entre as especialidades. Nossa equipe discute cada caso em conjunto, garantindo que sua saúde bucal, física e mental sejam tratadas como um todo indissociável.</p>
                <div className="space-y-4">
                  {["Centro Cirúrgico Próprio", "Acessibilidade Total", "Estacionamento Conveniado", "Protocolos de Biossegurança Hospitalar"].map((item, i) => (
                    <div key={i} className="flex items-center gap-4 bg-white p-4 rounded-xl border border-slate-100 hover:border-blue-200 transition-colors shadow-sm"><div className="bg-green-100 p-2 rounded-full text-green-600"><CheckCircle size={20} /></div><span className="font-medium text-slate-700">{item}</span></div>
                  ))}
                </div>
                <div className="pt-4"><PremiumButton variant="primary">Agendar Visita Técnica</PremiumButton></div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* CONVÊNIOS SECTION */}
      <section className="py-24 bg-white border-t border-slate-100 relative">
        <div className="container mx-auto px-6">
          <Reveal direction="up">
            <div className="text-center mb-16"><h3 className="flex items-center justify-center gap-2 text-sm font-bold text-blue-600 uppercase tracking-widest mb-4"><CreditCard size={18} /> Facilidades</h3><h2 className="text-3xl md:text-4xl font-bold text-slate-900">Convênios Aceitos</h2></div>
            <div className="flex flex-wrap justify-center gap-6">
              {insurances.map((item, index) => (
                <div key={index} className={`group relative overflow-hidden rounded-2xl border-2 ${item.border} ${item.bg} p-6 w-full md:w-64 text-center shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${item.hover || ''} ${item.extraClasses || ''}`}>
                  <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <h4 className={`text-xl font-extrabold tracking-tight ${item.text} relative z-10`}>{item.name}</h4>
                  <div className={`mt-2 h-1 w-8 mx-auto bg-current opacity-30 rounded-full ${item.text}`}></div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* FOOTER */}
      <footer id="contact" className="bg-slate-950 text-slate-400 py-20 relative overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="container mx-auto px-6 relative z-10">
          <Reveal direction="up">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
              <div className="space-y-6">
                <h3 className="text-3xl font-bold text-white tracking-tight">OralFace</h3>
                <p className="text-sm leading-relaxed max-w-xs">Redefinindo a experiência de saúde com tecnologia, conforto e uma equipe apaixonada pelo que faz.</p>
                <div className="flex gap-4">{[1, 2, 3].map((i) => <div key={i} className="w-10 h-10 bg-slate-900 rounded-full flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all cursor-pointer border border-slate-800"><ArrowRight size={14} className="-rotate-45" /></div>)}</div>
              </div>
              <div><h4 className="text-white font-bold mb-6">Navegação</h4><ul className="space-y-3 text-sm">{['Início', 'Sobre', 'Especialidades', 'Blog', 'Carreiras'].map(item => <li key={item}><a href="#" className="hover:text-blue-400 transition-colors flex items-center gap-2 hover:translate-x-1 duration-300">› {item}</a></li>)}</ul></div>
              <div><h4 className="text-white font-bold mb-6">Fale Conosco</h4><ul className="space-y-4 text-sm"><li className="flex items-start gap-3"><MapPin size={18} className="text-blue-500 shrink-0 mt-1" /><span>Rua Otávio Lamartine, 138<br/>Centro, São Paulo do Potengi/RN</span></li><li className="flex items-center gap-3"><Phone size={18} className="text-blue-500 shrink-0" /><span className="text-white font-medium">(84) 99633-3183</span></li><li className="flex items-center gap-3"><div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_#22c55e]"></div><span className="text-green-400">WhatsApp 24h</span></li></ul></div>
              <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800"><h4 className="text-white font-bold mb-4 flex items-center gap-2"><Clock size={18} className="text-blue-500" /> Horários</h4><ul className="space-y-2 text-sm mb-4"><li className="flex justify-between"><span>Seg-Sex</span> <span className="text-white">08h - 20h</span></li><li className="flex justify-between"><span>Sáb</span> <span className="text-white">08h - 14h</span></li></ul><div className="pt-4 border-t border-slate-800"><span className="block text-xs font-bold text-red-400 uppercase tracking-widest mb-1">Urgência</span><span className="text-white font-bold text-lg">24 Horas / 7 Dias</span></div></div>
            </div>
          </Reveal>
          <div className="border-t border-slate-900 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-slate-600">
            <p>© {new Date().getFullYear()} OralFace Clínica Integrada. Todos os direitos reservados.</p>
            <div className="flex gap-4 mt-4 md:mt-0 items-center"><a href="#" className="hover:text-slate-400">Privacidade</a><a href="https://uicode-dev.netlify.app/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 flex items-center gap-1 transition-colors"><Code size={12} /> Desenvolvido por UiCode.dev</a></div>
          </div>
        </div>
      </footer>
    </div>
  );
}