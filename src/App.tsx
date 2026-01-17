import { useEffect, useState } from "react";
import {
  smartDevices as defaultDevices,
  type SmartDevice,
} from "./data/smartDevices";
import "./App.css";
import { Header } from "./components/Header";
import { DeviceCard } from "./components/DeviceCard";

function App() {
  //const [devices, setDevices] = useState<SmartDevice[]>(defaultDevices);
  const [devices, setDevices] = useState<SmartDevice[]>(() => {
    try {
      const saved = localStorage.getItem("smartDevices");
      if (saved) return JSON.parse(saved);
    } catch (err) {
      console.error("Chyba pri načítaní zo storage", err);
    }
    return defaultDevices;
  });
  const [filter, setFilter] = useState<"all" | "on" | "off">("all");

  // useEffect(() => {
  //   const saved = localStorage.getItem("smartDevices");
  //   if (saved) setDevices(JSON.parse(saved));
  // }, []);

  useEffect(() => {
    try {
      localStorage.setItem("smartDevices", JSON.stringify(devices));
    } catch (err) {
      console.error("Chyba pri ukladaní do storage", err);
    }
  }, [devices]);

  const toggleDevice = (id: number) => {
    setDevices((prevDevices) =>
      prevDevices.map((dev) =>
        dev.id === id ? { ...dev, isActive: !dev.isActive } : dev
      )
    );
  };

  const changeDeviceValue = (id: number, newValue: number) => {
    setDevices((prevDev) =>
      prevDev.map((dev) =>
        dev.id == id && dev.value !== undefined
          ? { ...dev, value: dev.value + newValue }
          : dev
      )
    );
  };

  const changeBlinds = (id: number, newValue: number) => {
    setDevices((prevDev) =>
      prevDev.map((dev) => (dev.id == id ? { ...dev, value: newValue } : dev))
    );
  };

  const changeBrightness = (id: number, newValue: number) => {
    setDevices((prevDev) =>
      prevDev.map((dev) =>
        dev.id == id && dev.brightness !== undefined
          ? { ...dev, brightness: newValue }
          : dev
      )
    );
  };

  const changeColor = (id: number, color: string) => {
    setDevices((prev) =>
      prev.map((dev) => (dev.id === id && dev.color ? { ...dev, color } : dev))
    );
  };

  const stopRecording = (id: number) => {
    setDevices((prev) =>
      prev.map((dev) =>
        dev.id === id && dev.status === "Recording"
          ? { ...dev, status: "Paused" }
          : dev.id === id && dev.status === "Paused"
          ? { ...dev, status: "Recording" }
          : dev
      )
    );
  };

  const filteredDevices = devices.filter((device) =>
    filter === "all"
      ? true
      : filter === "on"
      ? device.isActive
      : !device.isActive
  );

  return (
    <div className="min-h-screen p-8">
      <Header
        onAllOn={() =>
          setDevices((d) => d.map((dev) => ({ ...dev, isActive: true })))
        }
        onAllOff={() =>
          setDevices((d) => d.map((dev) => ({ ...dev, isActive: false })))
        }
        onReset={() => setDevices(defaultDevices)}
        onFilter={setFilter}
      />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredDevices.map((device) => (
          <DeviceCard
            key={device.id}
            device={device}
            onToggle={toggleDevice}
            onChangeValue={changeDeviceValue}
            onChangeBrightness={changeBrightness}
            onChangeColor={changeColor}
            onStopRecording={stopRecording}
            onChangeBlinds={changeBlinds}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
