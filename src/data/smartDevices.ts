export type DeviceType = "light" | "thermostat" | "blind" | "lock" | "camera";

export interface SmartDevice {
  id: number;
  type: DeviceType;
  name: string;
  room: string;
  isActive: boolean;
  brightness?: number;
  color?: string;
  value?: number;
  unit?: string;
  lastActivity?: string;
  status?: string;
}

export const smartDevices: SmartDevice[] = [
  {
    id: 1,
    type: "light",
    name: "Lampa pri gauči",
    room: "Obývačka",
    isActive: true,
    brightness: 100,
    color: "#FFD166",
  },
  {
    id: 2,
    type: "thermostat",
    name: "Kúrenie",
    room: "Obývačka",
    isActive: true,
    value: 21.5,
    unit: "°C",
  },
  {
    id: 3,
    type: "blind",
    name: "Veľké okno",
    room: "Spálňa",
    isActive: false,
    value: 0,
  },
  {
    id: 4,
    type: "light",
    name: "Nočné svetlo",
    room: "Detská izba",
    isActive: false,
    brightness: 30,
    color: "#6A0572",
  },
  {
    id: 5,
    type: "lock",
    name: "Vchodové dvere",
    room: "Chodba",
    isActive: true,
    lastActivity: "Dnes, 14:30",
  },
  {
    id: 6,
    type: "camera",
    name: "Bezpečnostná kamera",
    room: "Záhrada",
    isActive: true,
    status: "Recording",
  },
];
