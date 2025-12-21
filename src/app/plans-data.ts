export type Plan = {
  id: string;
  name: string;
  price: string;
  maxProfessionals?: number;
  pricePerProText?: string;
  features: string[];
  description: string;
  extrasHtml: string;
  whatsappUrl: string;
  badge?: string;
  highlight?: boolean;
};

export const defaultPlans: Plan[] = [
  {
    id: "consultorio",
    name: "Plan Consultorio",
    price: "$25.000 / mes",
    maxProfessionals: 1,
    pricePerProText: "$25.000 por profesional (1 incluido)",
    features: [
      "Agenda online para tus turnos",
      "1 centro de atención incluido",
      "1 asistente administrativo incluido",
      "Estados y tipos de turno (nuevo, control, urgencia)",
    ],
    description:
      "Para médicos que atienden en su propio consultorio y quieren dejar atrás las hojas de cálculo y los cuadernos, sin meterse en sistemas complicados.",
    extrasHtml:
      "Centro de atención adicional: <strong>$7.000</strong> / mes<br />Asistente administrativo adicional: <strong>$1.500</strong> / mes",
    whatsappUrl:
      "https://wa.me/541138492392?text=Hola%2C%20quisiera%20recibir%20informaci%C3%B3n%20sobre%20el%20Plan%20Consultorio%20de%20EG%20Health%20Solutions.",
  },
  {
    id: "equipo",
    name: "Plan Equipo",
    price: "$80.000 / mes",
    maxProfessionals: 4,
    pricePerProText: "$20.000 por profesional usando las 4 licencias",
    features: [
      "Agenda compartida para varios profesionales",
      "Configuración de múltiples consultorios o sedes",
      "Perfiles diferenciados para secretaría y médicos",
      "Estados y tipos de turno para todo el equipo",
    ],
    description:
      "Para médicos que comparten secretaria o consultorio con otros colegas y necesitan ver todos los turnos en una sola agenda.",
    extrasHtml:
      "Centro de atención adicional: <strong>$7.000</strong> / mes<br />Asistente administrativo adicional: <strong>$1.500</strong> / mes",
    whatsappUrl:
      "https://wa.me/541138492392?text=Hola%2C%20quisiera%20recibir%20informaci%C3%B3n%20sobre%20el%20Plan%20Equipo%20de%20EG%20Health%20Solutions.",
    badge: "Más elegido",
    highlight: true,
  },
  {
    id: "red",
    name: "Plan Red de Profesionales",
    price: "$150.000 / mes",
    maxProfessionals: 10,
    pricePerProText: "$15.000 por profesional con las 10 licencias incluidas",
    features: [
      "Soporte para agendas en varios lugares de atención",
      "Coordinación de múltiples profesionales",
      "Tipos de turno personalizados y huecos para urgencias",
      "Acompañamiento cercano al inicio",
    ],
    description:
      "Para médicos que atienden en varios lugares o con varios profesionales y necesitan coordinar muchas agendas sin usar mil planillas.",
    extrasHtml:
      "Centro de atención adicional: <strong>$7.000</strong> / mes<br />Asistente administrativo adicional: <strong>$1.500</strong> / mes",
    whatsappUrl:
      "https://wa.me/541138492392?text=Hola%2C%20quisiera%20recibir%20informaci%C3%B3n%20sobre%20el%20Plan%20Red%20de%20Profesionales%20de%20EG%20Health%20Solutions.",
  },
];
    