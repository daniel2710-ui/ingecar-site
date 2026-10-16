import {
  Zap,
  Cpu,
  Building2,
  Hammer,
  Radio,
  Leaf,
  Droplet,
  Factory,
  type LucideIcon,
} from "lucide-react";

export const serviceIcons: Record<string, LucideIcon> = {
  "electricidad-mantenimiento": Zap,
  "automatizacion-industrial": Cpu,
  "obras-civiles": Building2,
  remodelaciones: Hammer,
  telecomunicaciones: Radio,
  "proteccion-ambiental": Leaf,
  "pozos-aguas-subterraneas": Droplet,
  "estructuras-metalicas": Factory,
};
