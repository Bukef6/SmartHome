import { Card, CardContent, IconButton, Slider, Switch } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import type { SmartDevice } from "../data/smartDevices";
import EmojiObjectsIcon from "@mui/icons-material/EmojiObjects";
import ContinuousSlider from "./ContinuousSlider";
import { HexColorPicker } from "react-colorful";
import { useEffect, useRef, useState } from "react";
import { IconCircle } from "./IconCircle";
import PauseIcon from "@mui/icons-material/Pause";
import PhotoCameraFrontIcon from "@mui/icons-material/PhotoCameraFront";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import KeyIcon from "@mui/icons-material/Key";
import { BlindPreview } from "./BlindPreview";

interface DeviceProps {
  device: SmartDevice;
  onToggle: (id: number) => void;
  onChangeValue: (id: number, value: number) => void;
  onChangeBrightness: (id: number, brightness: number) => void;
  onChangeColor: (id: number, color: string) => void;
  onStopRecording?: (id: number) => void;
  onChangeBlinds?: (id: number, value: number) => void;
}

export const DeviceCard = ({
  device,
  onToggle,
  onChangeValue,
  onChangeBrightness,
  onChangeColor,
  onStopRecording,
  onChangeBlinds,
}: DeviceProps) => {
  const [showColorPicker, setShowColorPicker] = useState<boolean>(false);
  const pickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        pickerRef.current &&
        !pickerRef.current.contains(event.target as Node)
      ) {
        setShowColorPicker(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <Card className="!bg-neutral-700/60 text-white backdrop-blur !rounded-[15px] ">
      <CardContent className="space-y-3">
        <div className="flex justify-between items-center w-full">
          <div className="flex flex-col items-start">
            <h2 className="text-[25px]  text-white/80 ">{device.name}</h2>
            <p className="text-[20px] text-neutral-400">{device.room}</p>
          </div>
          <Switch
            checked={device.isActive}
            onChange={() => onToggle(device.id)}
          />
        </div>

        {device.type === "thermostat" && device.isActive && (
          <div className="flex flex-col items-center gap-2">
            <span className="text-[var(--white-muted)] text-[74px] text-nowrap font-extrabold">
              {device.value} {device.unit}
            </span>
            <div className="flex flex-row gap-4">
              <IconCircle size={50}>
                <IconButton onClick={() => onChangeValue(device.id, -1)}>
                  <RemoveIcon className="text-[var(--white-muted)] text-3xl" />
                </IconButton>
              </IconCircle>
              <IconCircle size={50}>
                <IconButton onClick={() => onChangeValue(device.id, 1)}>
                  <AddIcon className="text-[var(--white-muted)] text-3xl" />
                </IconButton>
              </IconCircle>
            </div>
          </div>
        )}

        {device.type === "light" && device.isActive && (
          <>
            {showColorPicker && (
              <div
                className="absolute z-10 mt-0 rounded-xl bg-neutral-900/90 p-3 shadow-lg"
                style={{ marginTop: "-25px" }}
                ref={pickerRef}
              >
                <HexColorPicker
                  color={device.color!}
                  onChange={(color) => onChangeColor(device.id, color)}
                />
              </div>
            )}
            <div className="flex flex-col items-center justify-center w-full">
              <IconCircle size={110}>
                <EmojiObjectsIcon
                  className="!text-[102px] cursor-pointer"
                  style={{
                    color: device.color,
                    opacity: device.brightness! / 100,
                  }}
                  onClick={() => setShowColorPicker(!showColorPicker)}
                />
              </IconCircle>

              <ContinuousSlider
                value={device.brightness!}
                handleChange={(_, value) =>
                  onChangeBrightness(device.id, value as number)
                }
              />
            </div>
          </>
        )}

        {device.type === "camera" && device.isActive && (
          <div className="flex flex-col items-center gap-2">
            <span className="text-[var(--white-muted)] text-[74px] text-nowrap font-extrabold">
              {device.value} {device.unit}
            </span>
            <div className="relative flex items-center justify-center">
              <PhotoCameraFrontIcon className="!text-[52px] text-white/80" />

              <div className="ms-5 flex items-center gap-2 animate-pulse">
                {device.status === "Recording" && (
                  <span
                    className="w-5 h-5 bg-red-500 rounded-full inline-block"
                    style={{ boxShadow: "0 0 6px rgba(255,0,0,0.6)" }}
                  ></span>
                )}

                <span className="text-[var(--white-muted)] text-sm font-medium">
                  {device.status}
                </span>
              </div>
            </div>
            <IconCircle size={50}>
              <IconButton onClick={() => onStopRecording!(device.id)}>
                {device.status === "Recording" ? (
                  <PauseIcon className="text-[var(--white-muted)] text-3xl" />
                ) : (
                  <PlayArrowIcon className="text-[var(--white-muted)] text-3xl" />
                )}
              </IconButton>
            </IconCircle>
          </div>
        )}

        {device.type === "lock" && device.isActive && (
          <>
            <div className="flex flex-col items-center justify-center w-full">
              <IconCircle size={110}>
                <KeyIcon className="!text-[102px] text-[var(--white-muted)] " />
              </IconCircle>
              <span className="text-[var(--white-muted)] text-[34px] text-nowrap font-extrabold">
                {device.lastActivity}
              </span>
            </div>
          </>
        )}

        {device.type === "blind" && device.isActive && (
          <div className="space-y-4 w-full">
            <BlindPreview value={device.value!} />

            <Slider
              min={0}
              max={100}
              value={device.value}
              onChange={(_, v) => onChangeBlinds!(device.id, v as number)}
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
};
