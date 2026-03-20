import React, { useState, useEffect } from "react";
import {
  Menu,
  X,
  Brain,
  Cog,
  BarChart3,
  Code,
  Mail,
  Phone,
  MapPin,
  CheckCircle,
  ArrowRight,
  Zap,
  Loader2,
  Star,
  TrendingUp,
  Lightbulb,
  Users2,
  Github,
  Linkedin,
  Twitter,
  ArrowUpRight,
} from "lucide-react";

const ZyphWebsite = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [formData, setFormData] = useState({
    nombre: "",
    empresa: "",
    email: "",
    telefono: "",
    mensaje: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [scrollY, setScrollY] = useState(0);
  const [hoveredService, setHoveredService] = useState(null);

  const API_URL =
    "https://zyph-technologies-fullstack-production.up.railway.app/api";

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);

      const sections = ["home", "services", "projects", "about", "contact"];
      const currentSection = sections.find((section) => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false);
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    if (submitStatus) {
      setSubmitStatus(null);
    }
  };

  const validateForm = () => {
    const errors = [];

    if (!formData.nombre.trim() || formData.nombre.length < 2) {
      errors.push("El nombre debe tener al menos 2 caracteres");
    }

    if (!formData.empresa.trim()) {
      errors.push("La empresa es obligatoria");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      errors.push("Email inválido");
    }

    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    if (!phoneRegex.test(formData.telefono.replace(/[\s\-\(\)]/g, ""))) {
      errors.push("Teléfono inválido");
    }

    if (!formData.mensaje.trim() || formData.mensaje.length < 10) {
      errors.push("El mensaje debe tener al menos 10 caracteres");
    }

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm();
    if (validationErrors.length > 0) {
      setSubmitStatus({
        type: "error",
        message: validationErrors[0],
      });
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch(`${API_URL}/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setSubmitStatus({
          type: "success",
          message: "¡Mensaje enviado correctamente! Te contactaremos pronto.",
        });
        setFormData({
          nombre: "",
          empresa: "",
          email: "",
          telefono: "",
          mensaje: "",
        });
      } else {
        setSubmitStatus({
          type: "error",
          message:
            result.error || "Error al enviar el mensaje. Intenta nuevamente.",
        });
      }
    } catch (error) {
      console.error("Error al enviar formulario:", error);
      setSubmitStatus({
        type: "error",
        message:
          "Error de conexión. Verifica tu internet e intenta nuevamente.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const services = [
    {
      icon: Brain,
      title: "Transformación Digital",
      description:
        "Diagnóstico y plan de adopción de IA a medida para tu negocio.",
      color: "from-blue-500 to-blue-600",
      lightBg: "bg-blue-50",
      iconColor: "text-blue-600",
    },
    {
      icon: Zap,
      title: "Automatización RPA",
      description:
        "Chatbots inteligentes, flujos automatizados y RPA de procesos.",
      color: "from-purple-500 to-purple-600",
      lightBg: "bg-purple-50",
      iconColor: "text-purple-600",
    },
    {
      icon: BarChart3,
      title: "Análisis de Datos",
      description:
        "Dashboards inteligentes y modelos predictivos con BI avanzado.",
      color: "from-emerald-500 to-emerald-600",
      lightBg: "bg-emerald-50",
      iconColor: "text-emerald-600",
    },
    {
      icon: Code,
      title: "Desarrollo Web",
      description:
        "Aplicaciones modernas optimizadas y escalables para tu negocio.",
      color: "from-orange-500 to-orange-600",
      lightBg: "bg-orange-50",
      iconColor: "text-orange-600",
    },
  ];

  const projects = [
    {
      title: "Automatización E-commerce",
      metric: "35%",
      metricLabel: "↑ Conversiones",
      detail: "Chatbot inteligente con NLP",
      impact: "Alto",
    },
    {
      title: "Dashboard Predictivo",
      metric: "92%",
      metricLabel: "Precisión",
      detail: "Predicción de ventas con ML",
      impact: "Alto",
    },
    {
      title: "Automatización RRHH",
      metric: "80%",
      metricLabel: "↓ Tiempo",
      detail: "Procesamiento automático de candidatos",
      impact: "Muy Alto",
    },
  ];

  const testimonials = [
    {
      name: "Carlos López",
      company: "TechCorp",
      comment:
        "Excelente equipo, implementaron nuestra solución en tiempo récord.",
      rating: 5,
    },
    {
      name: "María García",
      company: "Global Business",
      comment:
        "ROI positivo desde el primer mes. Muy profesionales y atentos.",
      rating: 5,
    },
    {
      name: "Juan Pérez",
      company: "E-Solutions",
      comment:
        "La mejor inversión en tecnología que hemos hecho. Muy recomendados.",
      rating: 5,
    },
  ];

  const navItems = [
    { id: "home", label: "Inicio" },
    { id: "services", label: "Servicios" },
    { id: "projects", label: "Casos" },
    { id: "about", label: "Nosotros" },
    { id: "contact", label: "Contacto" },
  ];

  const styles = `
    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(30px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    @keyframes fadeInDown {
      from {
        opacity: 0;
        transform: translateY(-20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    @keyframes slideInRight {
      from {
        opacity: 0;
        transform: translateX(30px);
      }
      to {
        opacity: 1;
        transform: translateX(0);
      }
    }

    @keyframes slideInLeft {
      from {
        opacity: 0;
        transform: translateX(-30px);
      }
      to {
        opacity: 1;
        transform: translateX(0);
      }
    }

    @keyframes float {
      0%, 100% {
        transform: translateY(0px);
      }
      50% {
        transform: translateY(-10px);
      }
    }

    @keyframes glow {
      0%, 100% {
        box-shadow: 0 0 20px rgba(59, 130, 246, 0.3);
      }
      50% {
        box-shadow: 0 0 30px rgba(59, 130, 246, 0.5);
      }
    }

    @keyframes shimmer {
      0% {
        background-position: -1000px 0;
      }
      100% {
        background-position: 1000px 0;
      }
    }

    .animate-fadeInUp {
      animation: fadeInUp 0.6s ease-out forwards;
    }

    .animate-fadeInDown {
      animation: fadeInDown 0.6s ease-out forwards;
    }

    .animate-slideInRight {
      animation: slideInRight 0.6s ease-out forwards;
    }

    .animate-slideInLeft {
      animation: slideInLeft 0.6s ease-out forwards;
    }

    .animate-float {
      animation: float 3s ease-in-out infinite;
    }

    .animate-glow {
      animation: glow 3s ease-in-out infinite;
    }

    .delay-100 { animation-delay: 0.1s; }
    .delay-200 { animation-delay: 0.2s; }
    .delay-300 { animation-delay: 0.3s; }
    .delay-400 { animation-delay: 0.4s; }
    .delay-500 { animation-delay: 0.5s; }

    .transition-smooth {
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .glass-effect {
      background: rgba(255, 255, 255, 0.7);
      backdrop-filter: blur(10px);
    }

    .gradient-text {
      background: linear-gradient(135deg, #3b82f6, #06b6d4);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .card-hover {
      position: relative;
      overflow: hidden;
    }

    .card-hover::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
      transition: left 0.5s ease;
    }

    .card-hover:hover::before {
      left: 100%;
    }
  `;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50 text-gray-900">
      <style>{styles}</style>

      {/* Navigation */}
      <nav
        className={`fixed top-0 w-full z-50 transition-smooth ${
          scrollY > 50
            ? "bg-white/90 backdrop-blur-lg shadow-lg"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <button
              onClick={() => scrollToSection("home")}
              className="flex items-center gap-3 group"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-xl flex items-center justify-center group-hover:shadow-lg group-hover:scale-110 transition-smooth">
                <Zap className="h-6 w-6 text-white animate-float" />
              </div>
              <span className="font-bold text-lg hidden sm:inline bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                Zyph
              </span>
            </button>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-smooth relative ${
                    activeSection === item.id
                      ? "text-blue-600 bg-blue-50"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* CTA Button */}
            <button
              onClick={() => scrollToSection("contact")}
              className="hidden md:flex items-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-6 py-2 rounded-lg text-sm font-medium hover:shadow-lg hover:scale-105 transition-smooth group"
            >
              Contacto
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-smooth" />
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-gray-600 hover:text-gray-900 transition-smooth"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden mt-4 space-y-3 pb-4 animate-slideInRight glass-effect rounded-lg p-4">
              {navItems.map((item, idx) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-smooth animate-fadeInUp"
                  style={{ animationDelay: `${idx * 0.05}s` }}
                >
                  {item.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen pt-20 px-6 overflow-hidden flex items-center">
        {/* Background Elements */}
        <div className="absolute top-20 right-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float" />
        <div className="absolute bottom-20 left-10 w-72 h-72 bg-cyan-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float" style={{ animationDelay: "1s" }} />

        <div className="max-w-7xl mx-auto relative z-10 w-full">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Column - Content */}
            <div className="space-y-8">
              <div className="inline-block">
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-blue-600 text-sm font-semibold border border-blue-200 animate-fadeInUp">
                  <Star className="h-4 w-4" />
                  Transformación Digital Inteligente
                </span>
              </div>

              <h1 className="text-5xl md:text-6xl font-bold leading-tight animate-fadeInUp delay-100">
                Impulsa tu negocio con{" "}
                <span className="gradient-text">IA y automatización</span>
              </h1>

              <p className="text-lg md:text-xl text-gray-600 animate-fadeInUp delay-200 leading-relaxed max-w-xl">
                Transformamos procesos empresariales con inteligencia artificial,
                automatización avanzada y análisis de datos en tiempo real.
              </p>

              {/* Key Features */}
              <div className="space-y-3 py-4 animate-fadeInUp delay-300">
                {[
                  "Implementación rápida y sin complicaciones",
                  "ROI garantizado en 90 días",
                  "Soporte técnico 24/7 dedicado",
                ].map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-6 animate-fadeInUp delay-400">
                <button
                  onClick={() => scrollToSection("services")}
                  className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-8 py-4 rounded-lg font-semibold hover:shadow-lg hover:scale-105 transition-smooth inline-flex items-center justify-center gap-2 group text-lg"
                >
                  Explorar Soluciones
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-smooth" />
                </button>
                <button
                  onClick={() => scrollToSection("contact")}
                  className="border-2 border-gray-300 text-gray-900 px-8 py-4 rounded-lg font-semibold hover:border-blue-300 hover:bg-blue-50 hover:shadow-md transition-smooth text-lg"
                >
                  Agendar Consulta
                </button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 pt-8 animate-fadeInUp delay-500">
                {[
                  { num: "50+", text: "Proyectos" },
                  { num: "30+", text: "Clientes" },
                  { num: "95%", text: "Satisfacción" },
                ].map((stat, idx) => (
                  <div
                    key={idx}
                    className="text-center hover:scale-110 transition-smooth cursor-pointer"
                  >
                    <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                      {stat.num}
                    </div>
                    <div className="text-xs md:text-sm text-gray-600 mt-2">{stat.text}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column - Visual Elements */}
            <div className="relative hidden md:flex items-center justify-center animate-slideInRight">
              {/* Main Card */}
              <div className="relative w-full max-w-md">
                {/* Floating Background Blur */}
                <div className="absolute -inset-4 bg-gradient-to-br from-blue-300 to-cyan-300 rounded-3xl blur-2xl opacity-20 animate-float" />

                {/* Main Container */}
                <div className="relative bg-white rounded-3xl p-8 border border-gray-200 shadow-2xl">
                  {/* Card Header */}
                  <div className="mb-8">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold border border-emerald-200 mb-4">
                      <CheckCircle className="h-3 w-3" />
                      En ejecución
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      Dashboard de IA
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Análisis inteligente en tiempo real
                    </p>
                  </div>

                  {/* Feature Boxes */}
                  <div className="space-y-4 mb-8">
                    {[
                      { icon: Brain, label: "IA Avanzada", value: "GPT-4" },
                      { icon: Zap, label: "Velocidad", value: "<100ms" },
                      { icon: BarChart3, label: "Precisión", value: "99.8%" },
                    ].map((feature, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-blue-50 transition-smooth"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                            <feature.icon className="h-5 w-5 text-blue-600" />
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900 text-sm">
                              {feature.label}
                            </p>
                          </div>
                        </div>
                        <span className="text-blue-600 font-bold text-sm">
                          {feature.value}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-6">
                    <div className="flex justify-between items-center mb-2">
                      <p className="text-sm font-semibold text-gray-700">
                        Automatización completada
                      </p>
                      <span className="text-sm font-bold text-blue-600">85%</span>
                    </div>
                    <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full" style={{ width: "85%" }} />
                    </div>
                  </div>

                  {/* Footer Info */}
                  <div className="border-t border-gray-100 pt-6">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-xs text-gray-600 mb-1">ROI Proyectado</p>
                        <p className="text-2xl font-bold text-green-600">+340%</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-gray-600 mb-1">Tiempo implementación</p>
                        <p className="text-2xl font-bold text-blue-600">45 días</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating Elements */}
                <div className="absolute -top-6 -right-6 w-24 h-24 bg-blue-400 rounded-2xl opacity-10 blur-xl animate-float" />
                <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-cyan-400 rounded-full opacity-10 blur-2xl animate-float" style={{ animationDelay: "2s" }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-28 px-6 relative">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20 animate-fadeInUp">
            <span className="inline-block px-4 py-2 rounded-full bg-blue-50 text-blue-600 text-sm font-semibold mb-4 border border-blue-200">
              Nuestros Servicios
            </span>
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              Soluciones que impulsan{" "}
              <span className="gradient-text">resultados</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Cada servicio está diseñado para resolver desafíos específicos de tu negocio
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="card-hover group bg-white rounded-2xl border border-gray-200 p-8 hover:border-transparent hover:shadow-2xl transition-smooth cursor-pointer animate-fadeInUp"
                style={{ animationDelay: `${index * 0.1}s` }}
                onMouseEnter={() => setHoveredService(index)}
                onMouseLeave={() => setHoveredService(null)}
              >
                <div
                  className={`w-16 h-16 rounded-xl ${service.lightBg} flex items-center justify-center mb-6 group-hover:scale-110 transition-smooth`}
                >
                  <service.icon className={`h-8 w-8 ${service.iconColor}`} />
                </div>

                <h3 className="text-2xl font-bold mb-3 group-hover:gradient-text transition-smooth">
                  {service.title}
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {service.description}
                </p>

                <div className="flex items-center text-blue-600 font-semibold group-hover:translate-x-2 transition-smooth">
                  Conocer más
                  <ArrowUpRight className="h-4 w-4 ml-2" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-28 px-6 bg-gradient-to-b from-white to-slate-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20 animate-fadeInUp">
            <span className="inline-block px-4 py-2 rounded-full bg-emerald-50 text-emerald-600 text-sm font-semibold mb-4 border border-emerald-200">
              Casos de Éxito
            </span>
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              Resultados que hablan{" "}
              <span className="gradient-text">por sí solos</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Empresas líderes confían en nuestras soluciones
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div
                key={index}
                className="card-hover group bg-white rounded-2xl border border-gray-200 p-8 hover:border-blue-300 hover:shadow-2xl transition-smooth animate-fadeInUp"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h3 className="text-xl font-bold mb-2 group-hover:text-blue-600 transition-smooth">
                      {project.title}
                    </h3>
                    <p className="text-gray-600 text-sm">{project.detail}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    project.impact === "Muy Alto"
                      ? "bg-red-50 text-red-600"
                      : "bg-yellow-50 text-yellow-600"
                  }`}>
                    {project.impact}
                  </span>
                </div>

                <div className="pt-6 border-t border-gray-100">
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-bold text-blue-600 group-hover:scale-110 transition-smooth origin-left">
                      {project.metric}
                    </span>
                    <span className="text-gray-600 text-sm">{project.metricLabel}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-28 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20 animate-fadeInUp">
            <span className="inline-block px-4 py-2 rounded-full bg-purple-50 text-purple-600 text-sm font-semibold mb-4 border border-purple-200">
              Testimonios
            </span>
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              Lo que dicen nuestros{" "}
              <span className="gradient-text">clientes</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl border border-gray-200 p-8 hover:shadow-xl hover:border-blue-300 transition-smooth animate-fadeInUp"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-600 mb-6 leading-relaxed italic">
                  "{testimonial.comment}"
                </p>
                <div className="border-t border-gray-100 pt-4">
                  <p className="font-semibold text-gray-900">{testimonial.name}</p>
                  <p className="text-sm text-gray-600">{testimonial.company}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-28 px-6 bg-gradient-to-r from-blue-50 to-cyan-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="animate-slideInLeft">
              <span className="inline-block px-4 py-2 rounded-full bg-white text-blue-600 text-sm font-semibold mb-6 border border-blue-200">
                Sobre Zyph
              </span>
              <h2 className="text-5xl font-bold mb-6 leading-tight">
                Transformamos empresas mediante{" "}
                <span className="gradient-text">tecnología inteligente</span>
              </h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Con más de 10 años de experiencia, nuestro equipo de expertos ha
                transformado más de 30 empresas a través de soluciones innovadoras
                en IA, automatización y análisis de datos.
              </p>

              <div className="grid grid-cols-2 gap-6">
                {[
                  { icon: Lightbulb, label: "Innovación", value: "Constante" },
                  { icon: Users2, label: "Equipo", value: "Experto" },
                  { icon: TrendingUp, label: "ROI", value: "Garantizado" },
                  { icon: CheckCircle, label: "Soporte", value: "24/7" },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="bg-white rounded-xl p-4 hover:shadow-lg transition-smooth animate-fadeInUp"
                    style={{ animationDelay: `${idx * 0.08}s` }}
                  >
                    <item.icon className="h-6 w-6 text-blue-600 mb-2" />
                    <p className="text-sm text-gray-600">{item.label}</p>
                    <p className="font-bold text-gray-900">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="animate-slideInRight relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-200 to-cyan-200 rounded-3xl blur-2xl opacity-30" />
              <div className="relative bg-white rounded-3xl p-12 border border-gray-200 shadow-xl">
                <div className="aspect-video bg-gradient-to-br from-blue-400 to-cyan-400 rounded-2xl mb-8 flex items-center justify-center">
                  <Zap className="h-20 w-20 text-white" />
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-2 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full" />
                    <span className="text-sm font-semibold text-gray-600">100%</span>
                  </div>
                  <p className="text-gray-600">Implementaciones exitosas</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-28 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20 animate-fadeInUp">
            <span className="inline-block px-4 py-2 rounded-full bg-orange-50 text-orange-600 text-sm font-semibold mb-4 border border-orange-200">
              Contacto
            </span>
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              ¿Listo para transformar tu
              <span className="gradient-text"> empresa</span>?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Agenda una consulta gratuita con nuestros expertos
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-12">
            {/* Form */}
            <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-200 p-10 hover:shadow-2xl transition-smooth animate-slideInLeft">
              <h3 className="text-2xl font-bold mb-8">Envíanos un mensaje</h3>

              {submitStatus && (
                <div
                  className={`mb-6 p-4 rounded-xl text-sm font-medium animate-fadeInDown ${
                    submitStatus.type === "success"
                      ? "bg-green-50 text-green-800 border border-green-300"
                      : "bg-red-50 text-red-800 border border-red-300"
                  }`}
                >
                  {submitStatus.message}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <input
                    type="text"
                    placeholder="Tu nombre"
                    value={formData.nombre}
                    onChange={(e) => handleInputChange("nombre", e.target.value)}
                    className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:shadow-lg transition-smooth placeholder-gray-400"
                    disabled={isSubmitting}
                  />
                  <input
                    type="text"
                    placeholder="Nombre de empresa"
                    value={formData.empresa}
                    onChange={(e) => handleInputChange("empresa", e.target.value)}
                    className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:shadow-lg transition-smooth placeholder-gray-400"
                    disabled={isSubmitting}
                  />
                </div>

                <input
                  type="email"
                  placeholder="tu@email.com"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:shadow-lg transition-smooth placeholder-gray-400"
                  disabled={isSubmitting}
                />

                <input
                  type="tel"
                  placeholder="+595 XXX XXX XXX"
                  value={formData.telefono}
                  onChange={(e) => handleInputChange("telefono", e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:shadow-lg transition-smooth placeholder-gray-400"
                  disabled={isSubmitting}
                />

                <textarea
                  rows={5}
                  placeholder="Cuéntanos sobre tu proyecto..."
                  value={formData.mensaje}
                  onChange={(e) => handleInputChange("mensaje", e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:shadow-lg transition-smooth resize-none placeholder-gray-400"
                  disabled={isSubmitting}
                />

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-4 rounded-xl font-bold hover:shadow-lg transition-smooth disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group text-lg"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Enviando...
                    </>
                  ) : (
                    <>
                      Enviar Mensaje
                      <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-smooth" />
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="space-y-6 animate-slideInRight">
              <div className="bg-white rounded-2xl border border-gray-200 p-8 hover:shadow-xl transition-smooth">
                <h3 className="text-xl font-bold mb-6">Contacto directo</h3>
                <div className="space-y-6">
                  {[
                    { icon: Mail, label: "Email", value: "contacto@zyphtech.tech" },
                    { icon: Phone, label: "Teléfono", value: "+595 992 941 392" },
                    { icon: MapPin, label: "Ubicación", value: "Asunción, Paraguay" },
                  ].map((contact, idx) => (
                    <div
                      key={idx}
                      className="flex gap-4 group cursor-pointer animate-fadeInUp"
                      style={{ animationDelay: `${idx * 0.08}s` }}
                    >
                      <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center group-hover:scale-110 transition-smooth">
                        <contact.icon className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{contact.label}</p>
                        <p className="text-gray-600 text-sm">{contact.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-600 to-cyan-600 rounded-2xl p-8 text-white hover:shadow-2xl hover:scale-105 transition-smooth group">
                <Zap className="h-8 w-8 mb-4" />
                <h3 className="text-xl font-bold mb-3">Consulta Gratuita</h3>
                <p className="mb-6 text-blue-100">
                  30 minutos con nuestros expertos sin compromisos
                </p>
                <button className="w-full bg-white text-blue-600 font-bold py-3 rounded-xl hover:bg-gray-100 hover:shadow-lg transition-smooth group-hover:scale-105">
                  Agendar Ahora
                </button>
              </div>

              {/* Social Links */}
              <div className="bg-white rounded-2xl border border-gray-200 p-8">
                <p className="text-sm text-gray-600 mb-4 font-semibold">Síguenos</p>
                <div className="flex gap-3">
                  {[
                    { icon: Linkedin, label: "LinkedIn" },
                    { icon: Twitter, label: "Twitter" },
                    { icon: Github, label: "GitHub" },
                  ].map((social, idx) => (
                    <button
                      key={idx}
                      className="w-10 h-10 rounded-lg bg-gray-50 text-gray-600 hover:bg-blue-600 hover:text-white transition-smooth flex items-center justify-center"
                      title={social.label}
                    >
                      <social.icon className="h-5 w-5" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16 px-6 border-t border-gray-800">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div className="animate-fadeInUp">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-xl flex items-center justify-center">
                  <Zap className="h-6 w-6" />
                </div>
                <span className="font-bold text-lg">Zyph</span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                Transformamos empresas mediante IA, automatización y análisis de datos.
              </p>
            </div>

            <div className="animate-fadeInUp delay-100">
              <h4 className="font-semibold mb-4 text-white">Servicios</h4>
              <ul className="space-y-3 text-gray-400 text-sm">
                {[
                  "Transformación Digital",
                  "Automatización RPA",
                  "Análisis de Datos",
                  "Desarrollo Web",
                ].map((service, idx) => (
                  <li
                    key={idx}
                    className="hover:text-blue-400 transition-smooth cursor-pointer"
                  >
                    {service}
                  </li>
                ))}
              </ul>
            </div>

            <div className="animate-fadeInUp delay-200">
              <h4 className="font-semibold mb-4 text-white">Empresa</h4>
              <ul className="space-y-3 text-gray-400 text-sm">
                {["Sobre Nosotros", "Casos de Éxito", "Blog", "Contacto"].map(
                  (link, idx) => (
                    <li
                      key={idx}
                      className="hover:text-blue-400 transition-smooth cursor-pointer"
                    >
                      {link}
                    </li>
                  )
                )}
              </ul>
            </div>

            <div className="animate-fadeInUp delay-300">
              <h4 className="font-semibold mb-4 text-white">Legal</h4>
              <ul className="space-y-3 text-gray-400 text-sm">
                {["Privacidad", "Términos", "Cookies", "Licencias"].map(
                  (link, idx) => (
                    <li
                      key={idx}
                      className="hover:text-blue-400 transition-smooth cursor-pointer"
                    >
                      {link}
                    </li>
                  )
                )}
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-gray-400 text-sm">
                &copy; 2025 Zyph Technologies. Todos los derechos reservados.
              </p>
              <div className="flex gap-6">
                {["Política de Privacidad", "Términos de Servicio"].map(
                  (link, idx) => (
                    <button
                      key={idx}
                      className="text-gray-400 text-sm hover:text-blue-400 transition-smooth"
                    >
                      {link}
                    </button>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ZyphWebsite;
