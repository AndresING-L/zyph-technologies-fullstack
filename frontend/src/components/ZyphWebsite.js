import React, { useState, useEffect } from "react";
import {
  Menu,
  X,
  ChevronRight,
  Brain,
  Cog,
  BarChart3,
  Users,
  Mail,
  Phone,
  MapPin,
  CheckCircle,
  ArrowRight,
  Zap,
  Loader2,
  Code,
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

  const API_URL =
    "https://zyph-technologies-fullstack-production.up.railway.app/api";

  useEffect(() => {
    const handleScroll = () => {
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
        "Diagnóstico y plan de adopción de IA a medida de tu negocio.",
    },
    {
      icon: Cog,
      title: "Automatización",
      description:
        "Chatbots inteligentes, flujos automatizados y RPA para procesos eficientes.",
    },
    {
      icon: BarChart3,
      title: "Análisis de Datos",
      description:
        "Dashboards inteligentes y modelos predictivos para decisiones basadas en datos.",
    },
    {
      icon: Code,
      title: "Desarrollo Web",
      description:
        "Soluciones digitales personalizadas optimizadas para tu negocio.",
    },
  ];

  const projects = [
    {
      title: "Automatización E-commerce",
      metric: "35% ↑ Conversiones",
      detail: "Chatbot inteligente",
    },
    {
      title: "Dashboard Predictivo",
      metric: "92% Precisión",
      detail: "Predicción de ventas",
    },
    {
      title: "Automatización RRHH",
      metric: "80% ↓ Tiempo",
      detail: "Procesamiento de candidatos",
    },
  ];

  const navItems = [
    { id: "home", label: "Inicio" },
    { id: "services", label: "Servicios" },
    { id: "projects", label: "Casos de Éxito" },
    { id: "about", label: "Nosotros" },
    { id: "contact", label: "Contacto" },
  ];

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <button
              onClick={() => scrollToSection("home")}
              className="flex items-center gap-2 group"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-lg flex items-center justify-center group-hover:shadow-lg transition-shadow">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <span className="font-bold text-lg hidden sm:inline">Zyph</span>
            </button>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`text-sm font-medium transition-colors ${
                    activeSection === item.id
                      ? "text-blue-600"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* CTA Button */}
            <button
              onClick={() => scrollToSection("contact")}
              className="hidden md:block bg-blue-600 text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
            >
              Contacto
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-gray-600 hover:text-gray-900"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden mt-4 space-y-3 pb-4">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  {item.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center space-y-6">
            <h1 className="text-5xl md:text-6xl font-bold leading-tight">
              Transforma tu negocio con{" "}
              <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                IA y automatización
              </span>
            </h1>

            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Impulsamos empresas mediante inteligencia artificial, automatización
              de procesos y análisis de datos para el crecimiento sostenible.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <button
                onClick={() => scrollToSection("services")}
                className="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors inline-flex items-center justify-center gap-2"
              >
                Explorar Servicios
                <ArrowRight className="h-4 w-4" />
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="border border-gray-300 text-gray-900 px-8 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors"
              >
                Consulta Gratuita
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-12 max-w-2xl mx-auto">
              <div>
                <div className="text-3xl font-bold">50+</div>
                <div className="text-sm text-gray-600">Procesos Automatizados</div>
              </div>
              <div>
                <div className="text-3xl font-bold">30+</div>
                <div className="text-sm text-gray-600">Empresas Transformadas</div>
              </div>
              <div>
                <div className="text-3xl font-bold">95%</div>
                <div className="text-sm text-gray-600">Eficiencia Mejorada</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 px-6 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Nuestros Servicios</h2>
            <p className="text-xl text-gray-600">
              Soluciones integrales diseñadas para tu éxito
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all group"
              >
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-600 transition-colors">
                  <service.icon className="h-6 w-6 text-blue-600 group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-lg font-bold mb-2">{service.title}</h3>
                <p className="text-gray-600 text-sm">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Casos de Éxito</h2>
            <p className="text-xl text-gray-600">
              Proyectos que demuestran nuestro impacto
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow"
              >
                <div className="mb-4">
                  <h3 className="text-lg font-bold mb-1">{project.title}</h3>
                  <p className="text-sm text-gray-600">{project.detail}</p>
                </div>
                <div className="pt-4 border-t border-gray-100">
                  <div className="text-2xl font-bold text-blue-600">
                    {project.metric}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Sobre Zyph Technologies</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Creemos que la IA y la automatización son herramientas clave para
              el futuro de los negocios. Nuestro equipo de expertos transforma
              empresas en soluciones innovadoras y sostenibles.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mt-12">
            <div className="space-y-4">
              {[
                "Experiencia Comprobada",
                "Soluciones Personalizadas",
                "Soporte 24/7",
                "ROI Garantizado",
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                  <span className="text-gray-700">{item}</span>
                </div>
              ))}
            </div>
            <div className="bg-white rounded-xl p-8 border border-gray-200">
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">
                  10+
                </div>
                <p className="text-gray-600">Años de experiencia en transformación digital</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              ¿Listo para transformar tu negocio?
            </h2>
            <p className="text-xl text-gray-600">
              Contáctanos y descubre cómo podemos ayudarte
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Form */}
            <div className="bg-white border border-gray-200 rounded-xl p-8">
              <h3 className="text-xl font-bold mb-6">Envíanos un mensaje</h3>

              {submitStatus && (
                <div
                  className={`mb-6 p-4 rounded-lg text-sm ${
                    submitStatus.type === "success"
                      ? "bg-green-50 text-green-800 border border-green-200"
                      : "bg-red-50 text-red-800 border border-red-200"
                  }`}
                >
                  {submitStatus.message}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Nombre"
                    value={formData.nombre}
                    onChange={(e) => handleInputChange("nombre", e.target.value)}
                    className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    disabled={isSubmitting}
                  />
                  <input
                    type="text"
                    placeholder="Empresa"
                    value={formData.empresa}
                    onChange={(e) => handleInputChange("empresa", e.target.value)}
                    className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    disabled={isSubmitting}
                  />
                </div>

                <input
                  type="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  disabled={isSubmitting}
                />

                <input
                  type="tel"
                  placeholder="Teléfono"
                  value={formData.telefono}
                  onChange={(e) => handleInputChange("telefono", e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  disabled={isSubmitting}
                />

                <textarea
                  rows={4}
                  placeholder="Tu mensaje"
                  value={formData.mensaje}
                  onChange={(e) => handleInputChange("mensaje", e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                  disabled={isSubmitting}
                />

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Enviando...
                    </>
                  ) : (
                    "Enviar Mensaje"
                  )}
                </button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="space-y-6">
              <div className="bg-white border border-gray-200 rounded-xl p-8">
                <h3 className="text-xl font-bold mb-6">Información de Contacto</h3>
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <Mail className="h-5 w-5 text-blue-600 flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-medium">Email</p>
                      <p className="text-gray-600">contacto@zyphtech.tech</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <Phone className="h-5 w-5 text-blue-600 flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-medium">Teléfono</p>
                      <p className="text-gray-600">+595 992 941 392</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <MapPin className="h-5 w-5 text-blue-600 flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-medium">Ubicación</p>
                      <p className="text-gray-600">Asunción, Paraguay</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-blue-600 text-white rounded-xl p-8">
                <h3 className="text-xl font-bold mb-3">Consulta Gratuita</h3>
                <p className="mb-4 text-blue-100">
                  Agenda 30 minutos con nuestros expertos
                </p>
                <button className="w-full bg-white text-blue-600 font-medium py-2 rounded-lg hover:bg-gray-100 transition-colors">
                  Agendar Llamada
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Zap className="h-6 w-6 text-blue-400" />
                <span className="font-bold">Zyph Technologies</span>
              </div>
              <p className="text-gray-400 text-sm">
                Transformamos negocios mediante IA y automatización.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-3 text-sm">Servicios</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>Transformación Digital</li>
                <li>Automatización RPA</li>
                <li>Análisis de Datos</li>
                <li>Business Intelligence</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-3 text-sm">Contacto</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>contacto@zyphtech.tech</li>
                <li>+595 992 941 392</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center text-gray-400 text-sm">
            <p>&copy; 2025 Zyph Technologies. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ZyphWebsite;
